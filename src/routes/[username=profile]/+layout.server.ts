import { error, redirect } from '@sveltejs/kit';
import { profile as UserProfile } from '$lib/server/deta';
import type { Profiles } from '$lib/types/objects';
import type { LayoutServerLoad } from './$types';

export const load = (async ({ params, locals }) => {
	const session = await locals.validateUser();
	const username = session.user?.username;
	const routes = params.username;

	const userProfile = await UserProfile.fetch({ userId: session.user?.userId });
	const resProfile = userProfile.items[0];

	if (!session.session) {
		throw redirect(302, '/');
	}
	if (routes !== `@${username}`) {
		throw error(401, 'Not Authorize');
	}

	return {
		user: session.user,
		profile: resProfile as unknown as Profiles
	};
}) satisfies LayoutServerLoad;
