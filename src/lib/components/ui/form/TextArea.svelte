<script lang="ts">
	import cn from 'clsx';

	export let name: string;
	export let id: string | undefined = undefined;
	export let disabled = false;
	export let ref: HTMLTextAreaElement | undefined = undefined;
	export let value: string | number = '';

	$: rootCN = cn('textarea', { ['disabled']: disabled }, $$props.class);
</script>

<textarea
	{name}
	id={id ? id : name}
	class={rootCN}
	{disabled}
	{...$$restProps}
	autoComplete="off"
	autoCorrect="off"
	autoCapitalize="off"
	spellCheck="false"
	bind:this={ref}
	bind:value
	on:change
	on:input
	on:blur
/>

<style lang="postcss">
	.textarea {
		@apply mx-auto min-h-[10rem] w-full whitespace-pre-wrap break-words rounded-lg border-2 border-secondary bg-accent-1 p-5 transition-colors duration-200 ease-in-out focus:bg-primary focus:outline-none;
	}
	.disabled {
		@apply cursor-not-allowed border-accent-5 bg-accent-2 text-accent-2 opacity-50 grayscale;
	}
</style>
