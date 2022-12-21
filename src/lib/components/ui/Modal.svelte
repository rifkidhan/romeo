<script lang="ts">
	import { onMount, onDestroy, createEventDispatcher } from 'svelte';
	import { scale } from 'svelte/transition';
	import { cubicInOut } from 'svelte/easing';
	import { Button } from '$lib/components/ui';
	import { activeModal } from '$lib/stores/ui';
	import {
		disableBodyScroll,
		clearAllBodyScrollLocks,
		enableBodyScroll
	} from '$lib/utils/scroll-lock';

	export let title = '';
	let modalRef: HTMLDivElement;
	let modalInner: HTMLDivElement;

	const dispatch = createEventDispatcher();

	const closeModal = () => {
		activeModal.set(null);
		dispatch('closed');
	};

	const onKeydown = (e: KeyboardEvent) => {
		if (e.key === 'Escape') {
			return closeModal();
		}
	};

	onMount(() => {
		enableBodyScroll(modalInner);
		disableBodyScroll(modalRef, { reserveScrollBarGap: true });
	});

	onDestroy(() => {
		clearAllBodyScrollLocks();
	});
</script>

<svelte:window on:keydown={onKeydown} />

<div class="root" bind:this={modalRef} transition:scale={{ easing: cubicInOut, duration: 200 }}>
	<div class="modal" role="dialog" bind:this={modalInner}>
		<div class="top">
			<span>
				<h5>{title}</h5>
			</span>
			<Button type="button" icons="x" variant="circle" on:click={closeModal} />
		</div>
		<div class="divider" />
		<div class="content">
			<slot />
		</div>
	</div>
</div>

<style lang="postcss">
	.root {
		@apply fixed inset-0 z-[101] box-border flex h-full w-full items-center justify-center;
	}
	.modal {
		@apply relative flex max-h-screen flex-col gap-3 rounded-xl border-2 border-secondary bg-primary;
	}
	.top {
		@apply inline-flex w-full items-center justify-between gap-5 p-3;
	}
	.divider {
		@apply h-[2px] w-full bg-secondary;
	}
	.content {
		@apply flex flex-col gap-5 overflow-y-auto p-3;
	}
</style>
