import type { ParamMatcher } from '@sveltejs/kit';

export const match = ((param) => {
	const profile = /^\@[a-z0-9\_\-\.]+$/.test(param); // eslint-disable-line no-useless-escape
	return profile;
}) satisfies ParamMatcher;
