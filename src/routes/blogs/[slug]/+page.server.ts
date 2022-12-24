import type { PageServerLoad } from './$types';
import type { Blog } from '$lib/types/objects';
import { blogs } from '$lib/server/deta';
import { parser, LexicalHeadless } from '$lib/utils/markdown';

export const prerender = 'auto';
export const load: PageServerLoad = async ({ params }) => {
	const slug = params.slug;
	const getBlog = await blogs.fetch({
		slug
	});
	const resBlog = getBlog.items[0] as unknown as Blog;
	const converter = LexicalHeadless(resBlog.content);
	const mdToHtml = parser(converter);

	return {
		blog: {
			...resBlog,
			content: mdToHtml
		} as Blog
	};
};
