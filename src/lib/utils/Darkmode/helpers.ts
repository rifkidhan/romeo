/**
 * Helper for get Dakrmode
 */

/**
 * Check themes in local storage
 * @param key
 * @param fallback
 * @returns
 */
export const getTheme = (key: string, fallback?: string): string | undefined => {
	if (typeof window === 'undefined') return undefined;
	let theme;
	try {
		theme = localStorage.getItem(key) || undefined;
	} catch (e) {
		console.error(e);
	}
	return theme || fallback;
};

/**
 * Disable flashing animation
 * @returns
 */
export const disableAnimation = () => {
	const css = document.createElement('style');
	css.appendChild(
		document.createTextNode(
			`*{-webkit-transition:none!important;-moz-transition:none!important;-o-transition:none!important;-ms-transition:none!important;transition:none!important}`
		)
	);
	document.head.appendChild(css);

	return () => {
		(() => window.getComputedStyle(document.body))();

		setTimeout(() => {
			document.head.removeChild(css);
		}, 1);
	};
};

/**
 * Get system theme on device
 * @param e
 * @returns
 */
export const getSystemTheme = (e?: MediaQueryList | MediaQueryListEvent): string => {
	if (!e) {
		e = window.matchMedia('(prefers-color-scheme: dark)');
	}

	const isDark = e.matches;
	const systemTheme = isDark ? 'dark' : 'light';

	return systemTheme;
};
