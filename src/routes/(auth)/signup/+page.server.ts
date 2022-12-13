import { fail } from '@sveltejs/kit';
import { auth } from '$lib/server/lucia';
import { deta } from '$lib/server/deta';
import type { Actions } from './$types';

export const actions: Actions = {
	default: async ({ request, locals }) => {
		const form = await request.formData();
		const username = form.get('username');
		const email = form.get('email');
		const password = form.get('password');

		if (
			!username ||
			!password ||
			!email ||
			typeof username !== 'string' ||
			typeof password !== 'string' ||
			typeof email !== 'string'
		) {
			return fail(400);
		}

		const user = await deta.Base('user').fetch({
			email: email
		});
		const checkEmail = user.count;

		if (checkEmail > 0) {
			return fail(400, { email, username, duplicatedEmail: true });
		}

		try {
			const user = await auth.createUser('username', username, {
				password,
				attributes: {
					username,
					email
				}
			});
			const session = await auth.createSession(user.userId);
			locals.setSession(session);
		} catch {
			return fail(400, { username, email, duplicatedUsername: true });
		}
	}
};
