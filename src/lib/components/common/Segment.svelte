<script lang="ts">
	import type { SegmentProps } from '$lib/types/component';

	export let list: SegmentProps[];
</script>

<div class="root">
	{#each list as item}
		<a href={item.url} class="items" class:active={item.active}>
			{item.title}
		</a>
	{/each}
</div>

<style lang="postcss">
	.root {
		@apply flex w-full flex-row overflow-hidden rounded-full border-2 border-secondary shadow-down-2;
	}
	.items {
		@apply w-full rounded-full p-3 text-center font-bold;
	}
	.active {
		@apply bg-green text-white;
	}
</style>
