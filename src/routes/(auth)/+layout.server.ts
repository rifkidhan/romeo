import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals }) => {
	const session = await locals.getSessionUser();
	const name = session.user?.username;
	if (session && name) throw redirect(302, `/${name}`);

	return {};
};
