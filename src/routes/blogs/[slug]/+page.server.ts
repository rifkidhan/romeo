import type { PageServerLoad } from './$types';
import type { Blog } from '$lib/types/objects';
import { blogs } from '$lib/server/deta';

export const prerender = 'auto';
export const load: PageServerLoad = async ({ params }) => {
	const slug = params.slug;
	const getBlog = await blogs.fetch({
		slug
	});
	const blog = getBlog.items[0] as unknown as Blog;

	return {
		blog
	};
};
