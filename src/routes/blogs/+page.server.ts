import type { PageServerLoad } from './$types';
import type { Blog } from '$lib/types/objects';
import { blogs as detaBlogs } from '$lib/server/deta';

export const load: PageServerLoad = async () => {
	const res = await detaBlogs.fetch();
	const blogs = res.items as unknown as Blog[];

	return { blogs };
};
