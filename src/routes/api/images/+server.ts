import type { RequestHandler } from './$types';
import { deta, galleries } from '$lib/server/deta';
import { error } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ url }) => {
	const list = url.searchParams.get('list');
	const limit = url.searchParams.get('limit');

	if (!list) {
		throw error(500);
	}

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
};
