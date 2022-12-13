<script lang="ts">
	import { onMount, createEventDispatcher } from 'svelte';
	import { browser } from '$app/environment';
	import { fade } from 'svelte/transition';

	export let src: string;
	export let alt: string;
	export let loading: 'lazy' | 'eager' = 'lazy';

	let image: HTMLImageElement | null = null;
	let loaded = false;
	let error = false;

	const dispatch = createEventDispatcher();

	const loadImage = () => {
		if (image !== null) image = null;
		loaded = false;
		image = new Image();
		image.src = src;
		image.loading = loading;
		image.decoding = 'async';
		image.onload = () => (loaded = true);
		image.onerror = () => (error = true);
	};

	$: isLoading = !loaded && !error;
	$: if (src && browser) {
		loadImage();
	}
	$: if (loaded) dispatch('load');
	$: if (error) dispatch('error');

	onMount(() => {
		return () => (image = null);
	});
</script>

{#if isLoading}
	<slot name="loading" />
{/if}
{#if loaded}
	<img {src} {alt} {...$$restProps} transition:fade|local />
{/if}
{#if error}
	<slot name="error" />
{/if}
