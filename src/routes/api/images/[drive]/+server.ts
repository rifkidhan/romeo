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
