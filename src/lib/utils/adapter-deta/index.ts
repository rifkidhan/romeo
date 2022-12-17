import { LuciaError } from 'lucia-auth';
import type { Adapter } from 'lucia-auth';
import { getUpdateData } from 'lucia-auth/adapter';
import { Deta } from 'deta';
import { convertSession, convertUser, type DetaUser, type DetaSession } from './utils';

/* eslint-disable-next-line */
const adapter = (projectKey: string, errorHandler: (error: any) => void = () => {}): Adapter => {
	const deta = Deta(projectKey);
	const User = deta.Base('user');
	const Session = deta.Base('session');

	return {
		getUser: async (userId) => {
			try {
				const res = await User.get(userId);
				const user = res as unknown as DetaUser;
				if (!user) return null;
				return convertUser(user);
			} catch (e) {
				errorHandler(e as any); //eslint-disable-line @typescript-eslint/no-explicit-any
				throw e;
			}
		},
		getUserByProviderId: async (providerId) => {
			try {
				const res = await User.fetch({ provider_id: providerId }, { limit: 1 });
				const user = res.items[0] as unknown as DetaUser;
				if (!user) return null;
				return convertUser(user);
			} catch (e) {
				errorHandler(e as any); //eslint-disable-line @typescript-eslint/no-explicit-any
				throw e;
			}
		},
		getSessionAndUserBySessionId: async (sessionId) => {
			try {
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
			} catch (e) {
				errorHandler(e as any); //eslint-disable-line @typescript-eslint/no-explicit-any
				throw e;
			}
		},
		getSession: async (sessionId) => {
			try {
				const res = await Session.get(sessionId);
				const session = res;
				if (!session) return null;
				return convertSession(session);
			} catch (e) {
				errorHandler(e as any); //eslint-disable-line @typescript-eslint/no-explicit-any
				throw e;
			}
		},
		getSessionsByUserId: async (userId) => {
			try {
				const res = await Session.fetch({ user_id: userId });
				const sessions = res.items as unknown as DetaSession[];
				return sessions.map((session) => convertSession(session));
			} catch (e) {
				errorHandler(e as any); //eslint-disable-line @typescript-eslint/no-explicit-any
				throw e;
			}
		},
		setUser: async (userId, data) => {
			const checkifProviderExist = await User.fetch({
				provider_id: data.providerId
			});
			if (checkifProviderExist.count > 0) throw new LuciaError('AUTH_DUPLICATE_PROVIDER_ID');
			try {
				if (userId === null) {
					const user = await User.put({
						hashed_password: data.hashedPassword,
						provider_id: data.providerId,
						...data.attributes
					});
					return convertUser(user);
				}
				const user = await User.put(
					{
						hashed_password: data.hashedPassword,
						provider_id: data.providerId,
						...data.attributes
					},
					userId as string
				);
				return convertUser(user);
			} catch (e) {
				errorHandler(e);
				throw e;
			}
		},
		deleteUser: async (userId) => {
			try {
				await User.delete(userId);
				return;
			} catch (e) {
				errorHandler(e);
				throw e;
			}
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
				errorHandler(e);
				throw e;
			}
		},
		deleteSession: async (sessionId) => {
			try {
				await Session.delete(sessionId);
			} catch (e) {
				errorHandler(e);
				throw e;
			}
		},
		deleteSessionsByUserId: async (userId) => {
			const checkSessionByUserId = await Session.fetch({
				key: userId
			});
			const res = checkSessionByUserId.items as unknown as DetaSession[];
			try {
				res.map((item) => {
					Session.delete(item.key);
				});
			} catch (e) {
				errorHandler(e);
				throw e;
			}
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
				errorHandler(e);
				throw e;
			}
		}
	};
};

export default adapter;
