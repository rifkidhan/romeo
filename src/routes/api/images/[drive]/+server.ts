import type { RequestHandler } from './$types';
import { deta, galleries } from '$lib/server/deta';
import type { Galleries } from '$lib/types/objects';
import { error } from '@sveltejs/kit';
import sharp from 'sharp';

export const GET: RequestHandler = async ({ params, url }) => {
	const drivename = params.drive;
	const filename = url.searchParams.get('file') as string;
	const quality = url.searchParams.get('quality');
	const width = url.searchParams.get('w');
	const height = url.searchParams.get('h');
	const list = url.searchParams.get('list');
	const limit = url.searchParams.get('limit');
	const drive = deta.Drive(drivename);

	if (list) {
		const listGalleries = await galleries.fetch(
			{},
			{
				limit: limit ? parseInt(limit) : 100
			}
		);

		const resList = listGalleries.items;
		if (!resList) {
			throw error(400);
		}

		return new Response(JSON.stringify(resList), {
			status: 200,
			headers: {
				'Content-Type': 'application/json'
			}
		});
	}

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
		throw error(500, 'something error when uploading');
	}

	const checkFileIsExist = await galleries.fetch({ bucket: drivename, name: originalImageName });
	const resCheck = checkFileIsExist.count;

	if (resCheck > 0) {
		throw error(400, 'File name is already exists');
	}

	const galleriesDB = await galleries.put({
		bucket: drivename,
		name: originalImageName,
		content_type: contentType,
		uploaded_at: new Date().toISOString()
	});

	if (!galleriesDB) {
		throw error(500, 'something error in writing galleries database');
	}
	return new Response(String('Upload successfully'), {
		status: 200
	});
};
