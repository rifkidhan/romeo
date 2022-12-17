<script lang="ts">
	import type { Writable } from 'svelte/store';
	import { getContext, createEventDispatcher } from 'svelte';
	export let type: 'selection' | 'menu' = 'selection';
	export let value: string | number | undefined = undefined;

	const dispatch = createEventDispatcher();
	const open = getContext<Writable<boolean>>('dropdown');

	const onClick = () => {
		$open = !$open;
		dispatch('itemClick', {
			value
		});
	};
</script>

<div role="listitem" class="dropItem">
	{#if type === 'selection'}
		<button
			type="button"
			class="itemSelection"
			on:click={onClick}
			on:mousedown
			on:mouseenter
			on:mouseover
			on:focus
			on:keydown
			on:change
		>
			<slot />
		</button>
	{:else}
		<slot />
	{/if}
</div>

<style lang="postcss">
	.dropItem {
		@apply flex w-full items-center justify-between border-y-2 border-secondary bg-primary p-3;
	}
	.itemSelection {
		@apply w-full;
	}
</style>
