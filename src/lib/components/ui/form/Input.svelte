<script lang="ts">
	import cn from 'clsx';
	import { Icons } from '$lib/components/ui';

	/**
	 * Add name for input
	 */
	export let name: string;

	/**
	 * Add id for input. Default same with name input
	 */
	export let id: string | undefined = undefined;

	/**
	 * Add icon for input
	 */
	export let icons: string | undefined = undefined;

	/**
	 * Icon position in input. Default is 'left'
	 */
	export let iconPosition: 'left' | 'right' | undefined = icons ? 'left' : undefined;

	export let disabled = false;

	export let ref: HTMLInputElement | undefined = undefined;
	export let value: string | number = '';

	let rootCN = cn('wrapper', [iconPosition], { ['disabledwrapper']: disabled }, $$props.class);
	let inputCN = cn('input', { ['disabled']: disabled });
</script>

<span class={rootCN}>
	{#if icons}
		<span>
			<Icons name={icons} />
		</span>
	{/if}
	<input
		bind:value
		bind:this={ref}
		class={inputCN}
		id={id ? id : name}
		{disabled}
		{name}
		autoComplete="off"
		autoCorrect="off"
		autoCapitalize="off"
		spellCheck="false"
		{...$$restProps}
		on:change
		on:input
		on:blur
		on:keydown
		on:keypress
	/>
</span>

<style lang="postcss">
	.wrapper {
		@apply inline-flex w-full gap-2 rounded-xl border-2 border-secondary bg-accent-1 py-2 px-3 text-primary transition duration-150 ease-in-out;
	}
	.left {
		@apply flex-row;
	}
	.right {
		@apply flex-row-reverse;
	}
	.input {
		@apply w-full appearance-none bg-accent-1;
	}
	.wrapper:focus-within,
	.input:focus {
		@apply bg-primary outline-none;
	}
	.disabledwrapper,
	.disabled {
		@apply cursor-not-allowed border-accent-5 bg-accent-2 text-accent-2 opacity-50 grayscale;
	}
</style>
