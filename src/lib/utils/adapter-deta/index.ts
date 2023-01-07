import type { Adapter, AdapterFunction } from 'lucia-auth';
import { getUpdateData } from 'lucia-auth/adapter';
import { Deta } from 'deta';
import { convertSession, convertUser, type DetaUser, type DetaSession } from './utils';
import { randomUUID as v4 } from 'crypto';

/* eslint-disable-next-line */
const adapter = (projectKey: string): AdapterFunction<Adapter> => {
	const deta = Deta(projectKey);
	const User = deta.Base('user');
	const Session = deta.Base('session');
	const Profile = deta.Base('profile');

	return (LuciaError) => {
		return {
			getUser: async (userId) => {
				const res = await User.get(userId);
				const user = res as unknown as DetaUser;
				if (!user) return null;
				return convertUser(user);
			},
			getUserByProviderId: async (providerId) => {
				const res = await User.fetch({ provider_id: providerId }, { limit: 1 });
				const user = res.items[0] as unknown as DetaUser;
				if (!user) return null;
				return convertUser(user);
			},
			getSessionAndUserBySessionId: async (sessionId) => {
				const resSession = await Session.get(sessionId);
				const session = resSession as unknown as DetaSession;
				if (!session) return null;
				const resUser = await User.get(session.user_id);
				const user = resUser as unknown as DetaUser;
				if (!user) return null;

				return {
					user: convertUser(user),
					session: convertSession(session)
				};
			},
			getSession: async (sessionId) => {
				const res = await Session.get(sessionId);
				const session = res;
				if (!session) return null;
				return convertSession(session);
			},
			getSessionsByUserId: async (userId) => {
				const res = await Session.fetch({ user_id: userId });
				const sessions = res.items as unknown as DetaSession[];
				return sessions.map((session) => convertSession(session));
			},
			setUser: async (userId, data) => {
				const checkifProviderExist = await User.fetch({
					provider_id: data.providerId
				});
				if (checkifProviderExist.count > 0) throw new LuciaError('AUTH_DUPLICATE_PROVIDER_ID');
				try {
					if (userId === null) {
						const key = v4();
						const user = await User.put(
							{
								hashed_password: data.hashedPassword,
								provider_id: data.providerId,
								...data.attributes
							},
							key
						);
						if (user) {
							await Profile.put(
								{
									userId: key,
									...data.attributes
								},
								v4()
							);
						}
						return convertUser(user);
					}
					const user = await User.put(
						{
							hashed_password: data.hashedPassword,
							provider_id: data.providerId,
							...data.attributes
						},
						userId
					);
					if (user) {
						await Profile.put({
							userId: userId,
							...data.attributes
						});
					}

					return convertUser(user);
				} catch (e) {
					throw e;
				}
			},
			deleteUser: async (userId) => {
				await User.delete(userId);
				return;
			},
			setSession: async (sessionId, data) => {
				const checkUserExist = await User.get(data.userId);
				if (!checkUserExist) throw new LuciaError('AUTH_INVALID_USER_ID');

				try {
					const checkSession = await Session.get(sessionId);
					if (checkSession) {
						throw new LuciaError('AUTH_DUPLICATE_SESSION_ID');
					}

					await Session.put(
						{
							user_id: data.userId,
							idle_expires: data.idlePeriodExpires
						},
						sessionId,
						{ expireIn: data.expires }
					);
				} catch (e) {
					throw e;
				}
			},
			deleteSession: async (sessionId) => {
				await Session.delete(sessionId);
			},
			deleteSessionsByUserId: async (userId) => {
				const checkSessionByUserId = await Session.fetch({
					key: userId
				});
				const res = checkSessionByUserId.items as unknown as DetaSession[];

				res.map((item) => {
					Session.delete(item.key);
				});
			},
			updateUser: async (userId, newData) => {
				const newUserData = getUpdateData(newData);
				const checkifProviderExist = await User.fetch({
					key: userId,
					provider_id: newData.providerId
				});
				if (checkifProviderExist.count > 0) throw new LuciaError('AUTH_DUPLICATE_PROVIDER_ID');
				try {
					const user = await User.update(newUserData, userId);
					if (!user) throw new LuciaError('AUTH_INVALID_USER_ID');
					return convertUser(user);
				} catch (e) {
					throw e;
				}
			}
		};
	};
};

export default adapter;
