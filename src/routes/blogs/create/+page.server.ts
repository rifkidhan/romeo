import { fail } from '@sveltejs/kit';
import { blogs, deta } from '$lib/server/deta';
import slugify from '$lib/utils/slugify';
import type { Actions } from './$types';

export const actions: Actions = {
	default: async ({ request }) => {
		const form = await request.formData();
		const title = form.get('title');
		const description = form.get('description');
		const published = form.get('published');
		const slug = form.get('slug');
		const thumbnail = form.get('thumbnail') as File;
		const content = form.get('content');
		const metatitle = form.get('metatitle');
		const metadescription = form.get('metadescription');

		if (
			!title ||
			!description ||
			!content ||
			typeof title !== 'string' ||
			typeof description !== 'string' ||
			typeof content !== 'string' ||
			typeof metatitle !== 'string' ||
			typeof metadescription !== 'string' ||
			typeof slug !== 'string'
		) {
			return fail(400);
		}
		const contentType = thumbnail.type;
		const type = contentType.split('/').pop();
		const file = await thumbnail.arrayBuffer();
		const thumbnailName = `${slug}-${Math.random()}.${type}`;
		const imageUpload = deta.Drive('blogs');

		try {
			const image = await imageUpload.put(thumbnailName, {
				data: Buffer.from(file),
				contentType
			});
			if (!image) {
				return fail(400, { uploadImage: false });
			}
			await blogs.put({
				title,
				description,
				content,
				published: published ? true : false,
				thumbnail: thumbnail ? thumbnailName : null,
				slug: slug ? slug : slugify(title),
				meta_title: metatitle ? metatitle : title,
				meta_description: metadescription ? metadescription : description
			});
			return { success: true };
		} catch {
			return fail(400);
		}
	}
};
