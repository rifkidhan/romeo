<script lang="ts">
	import { displayNavbar } from '$lib/stores/ui';
	import { Navbar } from '$lib/components/common';
</script>

{#if $displayNavbar}
	<Navbar />
{/if}
<slot />
