<script lang="ts">
	import '../styles/global.css';
	import { page } from '$app/stores';
	import { handleSession } from '@lucia-auth/sveltekit/client';
	import { Footer, Header, BackToTop, UiContext } from '$lib/components/common';
	import Themes from '$lib/utils/Darkmode/Themes.svelte';

	handleSession(page);
</script>

<svelte:head>
	<link
		rel="preload"
		href="/fonts/Epilogue.woff2"
		as="font"
		type="font/woff2"
		crossorigin="anonymous"
	/>
	<link
		rel="preload"
		href="/fonts/Epilogue-Italic.woff2"
		as="font"
		type="font/woff2"
		crossorigin="anonymous"
	/>
</svelte:head>

<Themes attribute="class" />
<Header />
<UiContext>
	<slot />
</UiContext>
<BackToTop />
<Footer />
