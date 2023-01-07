import { sveltekit } from '@sveltejs/kit/vite';

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [sveltekit()]
	// ssr: {
	// 	noExternal: [
	// 		'lexical',
	// 		'@lexical/clipboard',
	// 		'@lexical/code',
	// 		'@lexical/headless',
	// 		'@lexical/history',
	// 		'@lexical/link',
	// 		'@lexical/list',
	// 		'@lexical/markdown',
	// 		'@lexical/rich-text',
	// 		'@lexical/selection',
	// 		'@lexical/utils'
	// 	]
	// },
	// optimizeDeps: {
	// 	exclude: [
	// 		'lexical',
	// 		'@lexical/clipboard',
	// 		'@lexical/code',
	// 		'@lexical/headless',
	// 		'@lexical/history',
	// 		'@lexical/link',
	// 		'@lexical/list',
	// 		'@lexical/markdown',
	// 		'@lexical/rich-text',
	// 		'@lexical/selection',
	// 		'@lexical/utils'
	// 	]
	// }
};

export default config;
