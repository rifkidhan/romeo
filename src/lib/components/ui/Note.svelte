<script lang="ts">
	import cn from 'clsx';
	import { Icons } from '$lib/components/ui';

	/**
	 * Variant for note.
	 * Default is 'outline'
	 */
	export let variant: 'fill' | 'outline' = 'outline';

	/**
	 * Describe for type of Note Component
	 * Default is 'note'
	 */
	export let type: 'note' | 'error' | 'success' | 'warning' | 'custom' = 'note';

	/**
	 * Size Component
	 * Default is 'md'
	 */
	export let size: 'sm' | 'md' | 'lg' = 'md';

	/**
	 * Show label for component
	 * Default is true
	 */
	export let label = true;

	/**
	 * Customize Note Component style and label.
	 */
	export let custom: boolean | undefined = undefined;

	/**
	 * Reference for Note Component
	 */
	export let ref: HTMLDivElement | undefined = undefined;

	$: type = custom ? 'custom' : type;

	$: rootCN = cn(
		'root',
		{
			[`outline-${type}`]: variant === 'outline' && type !== 'custom',
			[`fill-${type}`]: variant === 'fill' && type !== 'custom'
		},
		[`${size}`],
		$$props.class
	);

	$: listLabel = {
		label: type !== 'custom' && type,
		icon:
			type !== 'custom' &&
			((type === 'note' && 'info') ||
				(type === 'error' && 'alert-circle') ||
				(type === 'warning' && 'alert-triangle'))
	};
</script>

<div class={rootCN} bind:this={ref}>
	{#if custom && label}
		<slot name="label" />
	{/if}
	{#if !custom && label}
		<span class="inline-flex gap-x-1">
			{#if listLabel.icon}
				<span>
					<Icons name={listLabel.icon} />
				</span>
			{/if}
			<span class="font-bold capitalize">
				{listLabel.label} :
			</span>
		</span>
	{/if}
	<slot />
	<slot name="actions" />
</div>

<style lang="postcss">
	.root {
		@apply flex w-full items-center gap-2 rounded-lg;
	}
	.outline {
		@apply border-2;
	}
	.outline-note {
		@apply border-2 border-secondary bg-primary text-primary;
	}
	.outline-error {
		@apply border-2 border-red bg-primary text-red;
	}
	.outline-success {
		@apply border-2 border-blue bg-primary text-blue;
	}
	.outline-warning {
		@apply border-2 border-yellow bg-primary text-yellow;
	}
	.fill-note {
		@apply bg-secondary text-secondary;
	}
	.fill-error {
		@apply bg-red text-white;
	}
	.fill-success {
		@apply bg-blue text-white;
	}
	.fill-warning {
		@apply bg-yellow text-black;
	}
	.sm {
		@apply py-1 px-3;
	}
	.md {
		@apply py-3 px-3;
	}
	.lg {
		@apply py-4 px-3;
	}
</style>
