<script lang="ts">
	import cn from 'clsx';

	/**
	 * Add label for element
	 */
	export let htmlFor: string;

	/**
	 * Add label name
	 */
	export let label: string;

	let rootCN = cn('root', $$props.class);
</script>

<div class={rootCN}>
	<label for={htmlFor} {...$$restProps}>
		{label}
	</label>
	<slot />
</div>

<style lang="postcss">
	.root {
		@apply flex w-full flex-col gap-3;
	}
</style>
