import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals }) => {
	const { session, user } = await locals.validateUser();
	const name = user?.username;
	if (session && name) throw redirect(302, `/${name}`);

	return {};
};
