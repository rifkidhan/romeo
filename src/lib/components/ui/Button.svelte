<script lang="ts">
	import cn from 'clsx';
	import Icons from './Icons.svelte';
	import Loading from './Loading.svelte';
	export let href: string | undefined = undefined;
	export let active = false;
	export let type: 'submit' | 'button' | 'reset' | undefined = 'button';
	export let loading = false;
	export let disabled: boolean | undefined = undefined;
	export let variant: 'primary' | 'secondary' | 'naked' | 'circle' | 'color' | string = 'primary';
	export let icons: string | undefined = undefined;
	export let iconPosition: 'left' | 'right' = 'left';

	let component = href ? 'a' : 'button';

	$: buttonProps = {
		href,
		'aria-pressed': active,
		'data-variant': variant,
		disabled,
		type: component === 'button' ? type : undefined
	};

	$: btnClass = cn(
		'root',
		variant,
		{
			['disabled']: disabled,
			['disabledCircle']: disabled && variant === 'circle',
			['loading']: loading
		},

		(icons && iconPosition === 'right' && 'iconRight') ||
			(icons && iconPosition === 'left' && 'iconLeft'),
		$$props.class
	);
</script>

<svelte:element
	this={component}
	{...buttonProps}
	{...$$restProps}
	class={btnClass}
	on:click
	on:mouseenter
	on:mouseleave
	on:mouseover
	on:focus
	on:mousedown
>
	{#if loading}
		<Loading type="dots" />
	{:else}
		{#if icons}
			<Icons name={icons} />
		{/if}
		<span>
			<slot />
		</span>
	{/if}
</svelte:element>

<style lang="postcss">
	.root {
		@apply relative inline-flex cursor-pointer items-center justify-center overflow-hidden
        rounded-xl border-2 border-secondary text-center font-semibold transition-all duration-300
        ease-in-out;
	}
	.icons {
		@apply inline-flex items-start gap-x-2;
	}
	.iconLeft {
		@apply flex-row;
	}
	.iconRight {
		@apply flex-row-reverse;
	}

	.primary {
		@apply bg-primary py-3 px-2 text-primary;
	}
	.primary:hover,
	.primary:focus {
		@apply -translate-y-1 shadow-down-2;
	}
	.secondary {
		@apply bg-secondary py-3 px-2 text-secondary;
	}
	.secondary:hover {
		@apply -translate-y-1 shadow-red-down;
	}
	.naked {
		@apply border-none bg-transparent font-semibold shadow-none outline-none;
	}
	.naked:hover,
	.naked:focus {
		@apply translate-y-0 border-none bg-transparent shadow-none;
	}
	.color {
		@apply py-3 px-2;
	}
	.color:hover {
		@apply -translate-y-1 shadow-down-2;
	}
	.circle {
		@apply rounded-full p-1.5;
	}
	.circle:hover {
		@apply -translate-y-1 shadow-down-1;
	}

	.disabled,
	.disabled:hover,
	.disabled:focus {
		@apply translate-y-0 cursor-not-allowed border-accent-3 bg-accent-4 py-3 px-2 text-secondary shadow-none grayscale;
	}

	.disabledCircle,
	.disabledCircle:hover,
	.disabledCircle:focus {
		@apply translate-y-0 cursor-not-allowed border-accent-3 bg-accent-4 p-1.5 text-secondary shadow-none grayscale;
	}
</style>
