<script lang="ts">
	import { setContext } from 'svelte';
	import { displayNavbar } from '$lib/stores/ui';
	import { Navbar } from '$lib/components/common';
	import { Modal } from '$lib/components/ui';
</script>

{#if $displayNavbar}
	<Navbar />
{/if}
<slot />
