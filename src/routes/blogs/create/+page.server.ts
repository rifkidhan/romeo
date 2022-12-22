import { fail, redirect } from '@sveltejs/kit';
import { blogs, deta, galleries } from '$lib/server/deta';
import slugify from '$lib/utils/slugify';
import type { Actions, PageServerLoad } from './$types';

export const load = (async ({ locals }) => {
	const session = await locals.validate();

	if (!session) {
		throw redirect(302, '/');
	}

	return {};
}) satisfies PageServerLoad;

export const actions: Actions = {
	default: async ({ request }) => {
		const form = await request.formData();
		const title = form.get('title') as string;
		const description = form.get('description') as string;
		const published = form.get('published');
		const slug = form.get('slug') as string;
		const thumbnail = form.get('thumbnail') as File;
		const content = form.get('content') as string;
		const metatitle = form.get('metatitle');
		const metadescription = form.get('metadescription');
		const authorId = form.get('authorId') as string;
		const createdAt = form.get('created_at') as string;
		const updatedAt = form.get('updated_at') as string;

		if (
			typeof metatitle !== 'string' ||
			typeof metadescription !== 'string' ||
			typeof slug !== 'string' ||
			typeof authorId !== 'string'
		) {
			return fail(400);
		}
		const contentType = thumbnail.type;
		const type = contentType.split('/').pop();
		const file = await thumbnail.arrayBuffer();
		const thumbnailName = `${slug ? slug : slugify(title)}-${Math.random()}.${type}`;
		const imageUpload = deta.Drive('blogs');

		try {
			await imageUpload.put(thumbnailName, {
				data: Buffer.from(file),
				contentType
			});
			await galleries.put({
				bucket: 'blogs',
				name: thumbnailName,
				content_type: contentType,
				uploaded_at: createdAt
			});
			const postBlogs = await blogs.put({
				title,
				description,
				content,
				published: published ? true : false,
				thumbnail: thumbnail ? thumbnailName : null,
				slug: slug ? slug : slugify(title),
				meta_title: metatitle ? metatitle : title,
				authorId,
				meta_description: metadescription ? metadescription : description,
				created_at: createdAt,
				updated_at: updatedAt
			});

			if (postBlogs) {
				throw redirect(302, '/blogs');
			}
		} catch {
			throw fail(400);
		}
	}
};
