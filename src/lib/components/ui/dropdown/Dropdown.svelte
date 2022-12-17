<script lang="ts">
	import cn from 'clsx';
	import { spring } from 'svelte/motion';
	import { slide } from 'svelte/transition';
	import { circInOut } from 'svelte/easing';
	import { Icons } from '$lib/components/ui';
	import { setContext } from 'svelte';
	import { writable } from 'svelte/store';
	import { createPopperActions } from 'svelte-popperjs';

	export let ref: HTMLElement | undefined = undefined;
	export let title = '';
	export let variant: 'red' | 'yellow' | 'blue' | 'green' | 'pink' = 'yellow';

	const [popperRef, popperContent] = createPopperActions({
		placement: 'bottom'
	});

	const open = writable<boolean>(false);
	setContext('dropdown', open);

	const rotate = spring(0);

	$: $rotate = $open ? 180 : 0;

	$: dropdownCN = cn('dropdown', $$props.class);

	$: iconCN = cn('stroke-2 w-6', {
		['stroke-black']: variant === 'yellow' || variant === 'green' || variant === 'pink',
		['stroke-white']: variant === 'red' || variant === 'blue'
	});
	$: iconWrapper = cn('icon', variant);
	$: itemWrapperCN = cn('itemWrapper', $$props.class);
</script>

<div role="listbox" class={dropdownCN} bind:this={ref}>
	<button
		use:popperRef
		type="button"
		class="head"
		on:click={() => {
			$open = !$open;
		}}
		on:mousedown
		on:mouseenter
		on:mouseover
		on:focus
		on:keydown={(e) => {
			if (e.key === 'Escape') {
				e.preventDefault();
				$open = false;
			}
		}}
	>
		{title}
		<span class={iconWrapper}>
			<Icons name="chevron-down" class={iconCN} style="transform: rotate({$rotate}deg)" />
		</span>
	</button>

	{#if $open}
		<div
			use:popperContent
			class={itemWrapperCN}
			transition:slide={{ easing: circInOut, duration: 200 }}
		>
			<slot />
		</div>
	{/if}
</div>

<style>
	.dropdown {
		@apply relative flex flex-col gap-1 bg-primary;
	}
	.head {
		@apply relative inline-flex w-full items-center justify-between overflow-hidden rounded-xl border-2 border-secondary p-3;
	}
	.itemWrapper {
		@apply z-[102] flex flex-col overflow-hidden rounded-xl border-2 border-secondary;
	}
	.icon {
		@apply absolute right-0 inline-flex h-full w-10 items-center justify-center;
	}
	.yellow {
		@apply bg-yellow;
	}
	.red {
		@apply bg-red;
	}
	.blue {
		@apply bg-blue;
	}
	.green {
		@apply bg-green;
	}
	.pink {
		@apply bg-pink;
	}
</style>
