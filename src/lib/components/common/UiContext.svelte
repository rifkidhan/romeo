<script lang="ts">
	import { setContext } from 'svelte';
	import { displayNavbar } from '$lib/stores/ui';
	import { Navbar } from '$lib/components/common';
	import { Modal } from '$lib/components/ui';
	import { displayModal } from '$lib/stores/ui';
</script>

{#if $displayNavbar}
	<Navbar />
{/if}
<slot />
