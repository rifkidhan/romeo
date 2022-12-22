import type { ParamMatcher } from '@sveltejs/kit';

export const match = ((param) => {
	return /^\@[a-z0-9\_\-\.]+$/.test(param);
}) satisfies ParamMatcher;
