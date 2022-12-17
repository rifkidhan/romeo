<script lang="ts">
	import { Button } from '$lib/components/ui';
	import { draw } from 'svelte/transition';
	import { circInOut } from 'svelte/easing';
	import { displayNavbar } from '$lib/stores/ui';

	let className: string | undefined = undefined;

	export { className as class };

	const showNavbar = () => {
		displayNavbar.update((navbar) => !navbar);
	};

	let open = $displayNavbar;

	const transitioning = {
		easing: circInOut
	};
</script>

<Button
	type="button"
	variant="circle"
	title="menu button"
	class={className}
	on:click={() => showNavbar()}
>
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 24 24"
		stroke="currentColor"
		fill="none"
		stroke-linecap="round"
		stroke-linejoin="round"
		class="w-6 stroke-2"
		aria-hidden="true"
	>
		{#if $displayNavbar && open}
			<line
				x1="18"
				y1="6"
				x2="6"
				y2="18"
				transition:draw={{ ...transitioning }}
				on:outroend={() => {
					open = false;
				}}
			/>
			<line x1="6" y1="6" x2="18" y2="18" transition:draw={{ ...transitioning, delay: 150 }} />
		{:else if !$displayNavbar && !open}
			<line
				x1="4"
				y1="8"
				x2="20"
				y2="8"
				transition:draw={{ ...transitioning }}
				on:outroend={() => {
					open = true;
				}}
			/>
			<line x1="4" y1="16" x2="20" y2="16" transition:draw={{ ...transitioning, delay: 150 }} />
		{/if}
	</svg>
</Button>
