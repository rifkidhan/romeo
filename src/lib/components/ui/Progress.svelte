<script lang="ts">
	import cn from 'clsx';
	import { spring } from 'svelte/motion';

	/**
	 * Value for progress bar
	 * Default value is 0
	 */
	export let value = 0;

	/**
	 * Maximal value.
	 * Default max is 100.
	 */
	export let max = 100;

	/**
	 * Size for progress bar.
	 * Default is md.
	 */
	export let size: 'sm' | 'md' | 'lg' = 'md';

	/**
	 * Describe type of progress bar.
	 * Default is undefined.
	 */
	export let type: 'secondary' | 'success' | 'warning' | 'error' | undefined = undefined;

	export let custom: boolean | undefined = undefined;

	const inputValue = spring(0);

	$: calculateValue = (value * 100) / ((max * 100) / 100);

	$: inputValue.set(calculateValue);

	$: wrapperCN = cn('progress', [`${size}`]);

	$: progressCN = cn(
		'progressbar',
		{ [`${type}`]: type && !custom, ['bg-secondary']: !type && !custom, ['custom']: custom },
		$$props.class
	);
</script>

<div class={wrapperCN}>
	<div
		role="progressbar"
		aria-valuenow={value}
		aria-valuemax={max}
		class={progressCN}
		style="width: {$inputValue}%;"
		{...$$restProps}
	/>
</div>

<style lang="postcss">
	.progress {
		@apply block w-full appearance-none overflow-hidden rounded-full bg-accent-3;
	}
	.progressbar {
		@apply h-full;
	}
	.custom {
		background-color: var(--progress-color);
	}
	.secondary {
		@apply bg-primary;
	}
	.success {
		@apply bg-green;
	}
	.warning {
		@apply bg-yellow;
	}
	.error {
		@apply bg-red;
	}
	.sm {
		@apply h-1;
	}
	.md {
		@apply h-2;
	}
	.lg {
		@apply h-3;
	}
</style>
