import type { Actions, PageServerLoad } from './$types';
import type { Blog } from '$lib/types/objects';
import { fail, redirect } from '@sveltejs/kit';
import { blogs, deta, galleries } from '$lib/server/deta';
import slugify from '$lib/utils/slugify';

export const prerender = false;

export const load = (async ({ params }) => {
	const slug = params.slug;
	const getBlog = await blogs.fetch({
		slug
	});
	const resBlog = getBlog.items[0] as unknown as Blog;

	return {
		blog: resBlog
	};
}) satisfies PageServerLoad;

export const actions = {
	default: async ({ request }) => {
		const form = await request.formData();
		const key = form.get('key') as string;
		const title = form.get('title') as string;
		const description = form.get('description') as string;
		const published = form.get('published');
		const slug = form.get('slug');
		const thumbnail = form.get('thumbnail') as File;
		const thumbnailName = form.get('thumbnail-name') as string;
		const content = form.get('content') as string;
		const metatitle = form.get('metatitle');
		const metadescription = form.get('metadescription');
		const authorId = form.get('authorId') as string;
		const updatedAt = form.get('updated_at') as string;

		if (
			typeof metatitle !== 'string' ||
			typeof metadescription !== 'string' ||
			typeof slug !== 'string' ||
			typeof authorId !== 'string'
		) {
			return fail(400);
		}

		if (thumbnail.size > 0) {
			const imageUpload = deta.Drive('blogs');
			const contentType = thumbnail.type;
			const file = await thumbnail.arrayBuffer();
			await imageUpload.put(thumbnailName, {
				data: Buffer.from(file),
				contentType
			});
			const searchKey = await galleries.fetch({
				bucket: 'blogs',
				name: thumbnailName,
				content_type: contentType
			});
			const imageKey = searchKey.items[0];
			if (imageKey) {
				await galleries.update(
					{
						name: thumbnailName,
						content_type: contentType,
						uploaded_at: updatedAt
					},
					imageKey.key as string
				);
			}
		}

		try {
			await blogs.update(
				{
					title,
					description,
					content,
					published: published ? true : false,
					slug: slug ? slug : slugify(title),
					meta_title: metatitle ? metatitle : title,
					authorId,
					meta_description: metadescription ? metadescription : description,
					updated_at: updatedAt
				},
				key
			);
			throw redirect(302, `/blogs/${slug}`);
		} catch {
			return fail(400);
		}
	}
} satisfies Actions;
