import type { PageServerLoad } from './$types';
import type { Blog } from '$lib/types/objects';
import { blogs as detaBlogs } from '$lib/server/deta';

export const load = (async ({ locals }) => {
	const session = await locals.validateUser();

	if (!session.session) {
		const res = await detaBlogs.fetch({
			published: true
		});
		const blogs = res.items as unknown as Blog[];

		return { blogs };
	}

	const res = await detaBlogs.fetch({});
	const blogs = res.items as unknown as Blog[];

	return { blogs };
}) satisfies PageServerLoad;
