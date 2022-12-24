import { fail } from '@sveltejs/kit';
import { auth } from '$lib/server/lucia';
import type { Actions } from './$types';

export const actions: Actions = {
	default: async ({ request, locals }) => {
		const form = await request.formData();
		const username = form.get('username');
		const password = form.get('password');

		if (!username || !password || typeof username !== 'string' || typeof password !== 'string') {
			return fail(400);
		}

		try {
			const user = await auth.authenticateUser('username', username, password);
			const session = await auth.createSession(user.userId);
			locals.setSession(session);
		} catch {
			return fail(400, { username, password, invalidcredential: true });
		}
	}
};
