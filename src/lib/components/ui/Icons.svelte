<script lang="ts">
	import cn from 'clsx';
	import feather from 'feather-icons';

	/**
	 * Name of icons. Reference https://feathericons.com/
	 */
	export let name: string;

	$: icons = feather.icons[name as keyof typeof feather.icons];
</script>

{#if name === 'google'}
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 24 24"
		stroke="currentColor"
		fill="none"
		stroke-linecap="round"
		stroke-linejoin="round"
		class={cn($$props.class ? $$props.class : 'default')}
	>
		<path d="M17.788 5.108a9 9 0 1 0 3.212 6.892h-8" />
	</svg>
{/if}

<svg
	xmlns="http://www.w3.org/2000/svg"
	viewBox="0 0 24 24"
	stroke="currentColor"
	fill="none"
	stroke-linecap="round"
	stroke-linejoin="round"
	class={cn(icons.attrs.class, $$props.class ? $$props.class : 'default')}
	{...$$restProps}
>
	{@html icons.contents}
</svg>

<style lang="postcss">
	.default {
		@apply w-5 stroke-2;
	}
</style>
