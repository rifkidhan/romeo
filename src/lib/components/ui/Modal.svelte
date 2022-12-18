<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { scale } from 'svelte/transition';
	import { cubicInOut } from 'svelte/easing';
	import { Button } from '$lib/components/ui';
	import { displayModal, activeModal } from '$lib/stores/ui';
	import {
		disableBodyScroll,
		clearAllBodyScrollLocks,
		enableBodyScroll
	} from '$lib/utils/scroll-lock';

	export let title = '';
	let modalRef: HTMLDivElement;
	let modalInner: HTMLDivElement;

	const closeModal = () => {
		$displayModal = false;
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
		activeModal.set('');
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
		<div class="w-full bg-secondary h-[2px]" />
		<div class="flex flex-col gap-5 p-3">
			<slot />
		</div>
	</div>
</div>

<style lang="postcss">
	.root {
		@apply container fixed inset-0 z-[101] mx-auto flex h-full w-full items-center justify-center overflow-y-auto;
	}
	.top {
		@apply inline-flex w-full items-center justify-between gap-5 p-3;
	}
	.modal {
		@apply relative flex flex-col rounded-xl border-2 border-secondary bg-primary;
	}
</style>
