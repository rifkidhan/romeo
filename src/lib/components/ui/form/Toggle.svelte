<script lang="ts">
	import cn from 'clsx';
	import { spring } from 'svelte/motion';

	export let name: string;
	export let id: string | undefined = undefined;
	export let variant: 'yellow' | 'red' | 'blue' | 'pink' | 'green' | string = 'yellow';
	export let size: 'sm' | 'md' | 'lg' = 'sm';
	export let checked: boolean | undefined = false;
	export let value: string | number = '';
	export let group: (string | number)[] = [];

	const isChecked = spring(0);

	$: $isChecked = checked ? 100 : 0;

	$: className = cn('root', { [`${variant}`]: checked }, [`${size}`], $$props.class);
</script>

<span
	class={className}
	on:click={() => {
		checked = !checked;
	}}
	on:keydown
	on:keypress
	on:keyup
>
	<input
		type="checkbox"
		{name}
		id={id ? id : name}
		bind:checked
		{value}
		bind:group
		{...$$restProps}
		class="hidden"
	/>
	<span class={cn('circle', [`circle-${size}`])} style:transform="translateX({$isChecked}%)">
		<span class="inner" />
	</span>
</span>

<style lang="postcss">
	.root {
		@apply cursor-pointer items-stretch justify-start rounded-full border-2 border-secondary bg-accent-2 transition-all duration-300 ease-in-out;
	}
	.circle {
		@apply inline-flex h-full items-center justify-center rounded-full bg-primary ring-2 ring-secondary ring-offset-0;
	}
	.inner {
		@apply inline-block h-1/2 w-1/2 rounded-full border-2 border-secondary;
	}
	.checked {
		@apply translate-x-9;
	}
	.red {
		@apply bg-red;
	}
	.yellow {
		@apply bg-yellow;
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
	.sm {
		@apply h-8 w-16;
	}
	.circle-sm {
		@apply w-8;
	}
	.md {
		@apply h-10 w-20;
	}
	.circle-md {
		@apply w-10;
	}
	.lg {
		@apply h-12 w-24;
	}
	.circle-lg {
		@apply w-12;
	}
</style>
