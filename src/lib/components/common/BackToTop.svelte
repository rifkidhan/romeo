<script lang="ts">
	import { Button } from '$lib/components/ui';

	let scroll = 0;

	const scrollToTop = () => {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	};
</script>

<svelte:window bind:scrollY={scroll} />

{#if scroll > 250}
	<Button
		type="button"
		variant="circle"
		class="!fixed bottom-10 right-10 bg-primary"
		on:click={scrollToTop}
	>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			class="icon"
			viewBox="0 0 24 24"
			stroke="currentColor"
			fill="none"
			stroke-linecap="round"
			stroke-linejoin="round"
		>
			<line x1="12" y1="5" x2="12" y2="19" />
			<line x1="16" y1="9" x2="12" y2="5" />
			<line x1="8" y1="9" x2="12" y2="5" />
		</svg>
	</Button>
{/if}

<style lang="postcss">
	.icon {
		@apply h-6 w-6 stroke-[1.5];
	}
</style>
