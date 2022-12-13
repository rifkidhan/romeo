<script lang="ts">
	import '../styles/global.css';
	import { page } from '$app/stores';
	import { handleSession } from '@lucia-auth/sveltekit/client';
	import { Footer, Header, Navbar, BackToTop } from '$lib/components/common';
	import Themes from '$lib/utils/Darkmode/Themes.svelte';
	import { displayNavbar } from '$lib/utils/store';

	handleSession(page);
</script>

<Themes />
<Header />
{#if $displayNavbar}
	<Navbar />
{/if}

<main class="fit">
	<slot />
</main>
<BackToTop />

<Footer />
