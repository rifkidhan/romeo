<script lang="ts">
	import { fade } from 'svelte/transition';
	import { createEventDispatcher } from 'svelte';
	import cn from 'clsx';

	export let src: string;
	export let alt: string;
	export let loading: 'lazy' | 'eager' = 'lazy';

	const dispatch = createEventDispatcher();

	let loaded = false;

	$: imageClass = cn('transition', loaded ? 'loaded' : 'loading', $$props.class);

	$: if (loaded) dispatch('loadingComplete');
</script>

<img
	{loading}
	{src}
	{alt}
	{...$$restProps}
	class={imageClass}
	on:load={() => {
		loaded = true;
	}}
	on:error
	on:loadstart
	transition:fade|local={{ duration: 150 }}
/>

<style lang="postcss">
	.transition {
		@apply transition-all duration-300 ease-in-out;
	}
	.loading {
		@apply scale-105 blur-lg;
	}
	.loaded {
		@apply scale-100 blur-none;
	}
</style>
