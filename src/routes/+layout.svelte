<script lang="ts">
	import '../styles/global.css';
	import { page } from '$app/stores';
	import { handleSession } from '@lucia-auth/sveltekit/client';
	import { Footer, Header, BackToTop, UiContext } from '$lib/components/common';
	import Themes from '$lib/utils/Darkmode/Themes.svelte';

	handleSession(page);
</script>

<Themes />
<Header />
<UiContext>
	<main class="fit">
		<slot />
	</main>
</UiContext>
<BackToTop />
<Footer />
