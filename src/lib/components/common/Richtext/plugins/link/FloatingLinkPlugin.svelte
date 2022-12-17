<script lang="ts">
	import { browser } from '$app/environment';
	import { fade } from 'svelte/transition';
	import { circInOut } from 'svelte/easing';
	import { getContext, onMount } from 'svelte';
	import { writable, readable } from 'svelte/store';
	import type { GridSelection, LexicalEditor, NodeSelection, RangeSelection } from 'lexical';
	import {
		$isAutoLinkNode as isAutoLinkNode,
		$isLinkNode as isLinkNode,
		TOGGLE_LINK_COMMAND
	} from '@lexical/link';
	import { $findMatchingParent as findMatchingParent, mergeRegister } from '@lexical/utils';
	import {
		$getSelection as getSelection,
		$isRangeSelection as isRangeSelection,
		COMMAND_PRIORITY_HIGH,
		COMMAND_PRIORITY_LOW,
		KEY_ESCAPE_COMMAND,
		SELECTION_CHANGE_COMMAND
	} from 'lexical';
	import getSelectedNode from '../../utils/getSelectedNode';
	import { sanitizeUrl } from '../../utils/url';
	import { Button, Input } from '$lib/components/ui';
	import { floatingLink } from '../../utils/storeAction';
	import { createPopperActions } from 'svelte-popperjs';
	import type { VirtualElement } from '@popperjs/core';

	export let anchorElement: HTMLElement;
	const editor = getContext<LexicalEditor>('editor');

	const [popperRef, popperContent] = createPopperActions({
		strategy: 'absolute',
		placement: 'auto'
	});

	let editorRef: HTMLDivElement;
	let inputRef: HTMLInputElement;
	let linkUrl = '';
	let editMode = false;
	let lastSelection: RangeSelection | GridSelection | NodeSelection | null = null;

	let boundingRect: DOMRect;

	let getBoundingClientRect = () => boundingRect;
	const refPopper = writable<VirtualElement>({
		getBoundingClientRect
	});

	$: $refPopper = { getBoundingClientRect };

	const virtualElement = readable($refPopper);

	$: updateLinkEditor = () => {
		const selection = getSelection();
		if (isRangeSelection(selection)) {
			const node = getSelectedNode(selection);
			const parent = node.getParent();
			if (isLinkNode(parent)) {
				linkUrl = parent.getURL();
			} else if (isLinkNode(node)) {
				linkUrl = node.getURL();
			} else {
				linkUrl = '';
			}

			const autoLinkParent = findMatchingParent(node, isAutoLinkNode);
			const linkParent = findMatchingParent(node, isLinkNode);

			if (linkParent != null && autoLinkParent == null) {
				$floatingLink = true;
			} else {
				$floatingLink = false;
			}
		}

		const nativeSelection = window.getSelection();
		const activeElement = document.activeElement;

		if (!editorRef || !anchorElement) {
			return;
		}

		const rootElement = editor.getRootElement();

		if (
			selection !== null &&
			nativeSelection !== null &&
			rootElement !== null &&
			rootElement.contains(nativeSelection.anchorNode) &&
			editor.isEditable()
		) {
			const domRange = nativeSelection.getRangeAt(0);
			let rect: DOMRect;
			if (nativeSelection.anchorNode === rootElement) {
				let inner = rootElement;
				while (inner.firstElementChild != null) {
					inner = inner.firstElementChild as HTMLElement;
				}

				rect = inner.getBoundingClientRect();
			} else {
				rect = domRange.getBoundingClientRect();
			}
			boundingRect = rect;

			lastSelection = selection;
		} else if (!activeElement) {
			if (rootElement !== null) {
				$floatingLink = false;
			}

			lastSelection = null;
			editMode = false;
			linkUrl = '';
		}

		return true;
	};

	const update = () => {
		editor.getEditorState().read(() => {
			updateLinkEditor();
		});
	};

	onMount(() => {
		mergeRegister(
			editor.registerUpdateListener(({ editorState }) => {
				editorState.read(() => {
					updateLinkEditor();
				});
			}),

			editor.registerCommand(
				SELECTION_CHANGE_COMMAND,
				() => {
					updateLinkEditor();
					return true;
				},
				COMMAND_PRIORITY_LOW
			),

			editor.registerCommand(
				KEY_ESCAPE_COMMAND,
				() => {
					if ($floatingLink) {
						$floatingLink = false;
						return true;
					}
					return false;
				},
				COMMAND_PRIORITY_HIGH
			)
		);
	});

	$: if (browser) {
		update();
		if (editMode && inputRef) {
			inputRef.focus();
		}
	}
	$: if (boundingRect) {
		popperRef(virtualElement);
	}
</script>

{#if $floatingLink}
	<div
		bind:this={editorRef}
		class="bg-black fixed border-2 rounded-lg"
		use:popperContent
		transition:fade={{ easing: circInOut, duration: 200 }}
	>
		{#if editMode}
			<div class="input">
				<Input
					name="inputlink"
					bind:ref={inputRef}
					bind:value={linkUrl}
					on:keydown={(e) => {
						if (e.key === 'Enter' || e.key === 'Escape') {
							e.preventDefault();
							if (lastSelection !== null) {
								if (linkUrl !== '') {
									editor.dispatchCommand(TOGGLE_LINK_COMMAND, sanitizeUrl(linkUrl));
								}
								editMode = false;
							}
							$floatingLink = false;
						}
					}}
				/>
				<Button
					type="button"
					on:click={() => {
						if (lastSelection !== null) {
							if (linkUrl !== '') {
								editor.dispatchCommand(TOGGLE_LINK_COMMAND, sanitizeUrl(linkUrl));
							}
							editMode = false;
						}
					}}
					icons="edit"
				/>
			</div>
		{:else}
			<div class="input">
				<a
					data-sveltekit-preload-data="off"
					href={linkUrl}
					target="_blank"
					rel="noopener noreferrer"
					class="whitespace-nowrap w-4/5 overflow-hidden text-ellipsis"
				>
					{linkUrl}
				</a>
				<Button
					type="button"
					on:click={() => {
						editMode = true;
					}}
					icons="edit"
				/>
			</div>
		{/if}
	</div>
{/if}

<style lang="postcss">
	.input {
		@apply flex w-64 items-center justify-between gap-1 p-1 md:w-96 md:gap-2 md:p-2;
	}
</style>
