<script lang="ts">
	import cn from 'clsx';
	import { Image } from '$lib/components/ui';

	export let href: string | undefined = undefined;
	export let horizontal = false;
	export let reverse = false;

	export let imageSrc: string | undefined = undefined;
	export let imageAlt = '';

	let loading = true;

	$: cardCN = cn(
		'card',
		reverse ? 'flex-col-reverse' : 'flex-col',
		horizontal && (reverse ? 'md:flex-row-reverse md:max-w-xl' : 'md:flex-row md:max-w-xl'),
		!imageSrc && 'padding',
		href && 'hover',
		$$props.class
	);
</script>

<svelte:element this={href ? 'a' : 'div'} {href} class={cardCN} {...$$restProps}>
	{#if imageSrc}
		<div class="image-wrapper">
			{#if loading}
				<div class="skeleton h-full w-full" />
			{/if}
			<Image
				src={imageSrc}
				alt={imageAlt}
				on:loadstart={() => {
					loading = true;
				}}
				on:loadingComplete={() => {
					loading = false;
				}}
				class="h-full w-full object-cover object-center"
			/>
		</div>

		<div class={cn('padding', 'content')}>
			<slot class="padding" />
		</div>
	{:else}
		<slot />
	{/if}
</svelte:element>

<style lang="postcss">
	.card {
		@apply flex translate-y-0 overflow-hidden rounded-xl border-2 border-secondary
        transition-all duration-200 ease-in-out;
	}
	.padding {
		@apply p-5 md:p-8;
	}
	.hover {
		@apply hover:-translate-y-2 hover:shadow-down-2 md:hover:shadow-down-3;
	}
	.content {
		@apply flex flex-col gap-3;
	}
	.image-wrapper {
		@apply relative h-64 w-full;
	}
	.image {
		@apply h-full w-full object-cover object-center;
	}
</style>
