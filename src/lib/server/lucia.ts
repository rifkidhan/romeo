import lucia from 'lucia-auth';
import Adapter from '$lib/utils/adapter-deta';
import { DETA_PROJECT_KEY } from '$env/static/private';
import { dev } from '$app/environment';

export const auth = lucia({
	adapter: Adapter(DETA_PROJECT_KEY),
	env: dev ? 'DEV' : 'PROD',

	transformUserData: (userData) => {
		return {
			userId: userData.id,
			username: userData.username,
			email: userData.email,
			role: userData.role
		};
	}
});

export type Auth = typeof auth;
