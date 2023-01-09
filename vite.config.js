import { sveltekit } from '@sveltejs/kit/vite';
import nodePolyfills from 'rollup-plugin-polyfill-node';
import { NodeModulesPolyfillPlugin } from '@esbuild-plugins/node-modules-polyfill';

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [sveltekit()],

	optimizeDeps: {
		esbuildOptions: {
			define: {
				global: 'globalThis'
			},
			plugins: [NodeModulesPolyfillPlugin()]
		}
	},
	build: {
		rollupOptions: {
			plugins: [nodePolyfills()]
		}
	}
};

export default config;
