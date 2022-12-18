import type { RequestHandler } from './$types';
import { deta } from '$lib/server/deta';
import { error } from '@sveltejs/kit';
import sharp from 'sharp';

export const GET: RequestHandler = async ({ params, url }) => {
	const drivename = params.drive;
	const filename = url.searchParams.get('file') as string;
	const quality = url.searchParams.get('quality');
	const width = url.searchParams.get('w');
	const height = url.searchParams.get('h');
	const drive = deta.Drive(drivename);

	const files = await drive.get(filename);
	if (!files) {
		throw error(404, `Files doesn't exist`);
	}
	const blob = await files.arrayBuffer();

	const image = await sharp(Buffer.from(blob))
		.resize({
			width: width ? parseInt(width) : undefined,
			height: height ? parseInt(height) : undefined
		})
		.webp({ quality: quality ? parseInt(quality) : 80 })
		.toBuffer();

	return new Response(image, {
		headers: {
			'Content-Type': `image/webp`,
			'Cache-Control': 'public, immutable, no-transform, s-maxage=31536000, max-age=31536000'
		}
	});
};

export const POST: RequestHandler = async ({ params, request }) => {
	const drivename = params.drive;
	const form = await request.formData();
	const image = form.get('image') as File;

	const contentType = image.type;
	const originalImageName = image.name;
	const file = await image.arrayBuffer();
	const imageUpload = deta.Drive(drivename);

	const uploading = await imageUpload.put(originalImageName, {
		data: Buffer.from(file),
		contentType
	});

	if (!uploading) {
		throw error(500, 'something error');
	}
	return new Response(String('test'));
};
