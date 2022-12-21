<script lang="ts">
	import type { LexicalEditor, NodeKey } from 'lexical';
	import { onMount } from 'svelte';
	import { mergeRegister } from '@lexical/utils';
	import {
		$getNodeByKey as getNodeByKey,
		$getSelection as getSelection,
		$isNodeSelection as isNodeSelection,
		CLICK_COMMAND,
		COMMAND_PRIORITY_LOW,
		KEY_BACKSPACE_COMMAND,
		KEY_DELETE_COMMAND
	} from 'lexical';
	import useNodeSelection from '../utils/useSelectedNode';
	import { $isImageNode as isImageNode } from './ImageNode';
	import { Loading } from '$lib/components/ui';

	export let editor: LexicalEditor;
	export let nodeKey: NodeKey;
	export let altText: string;
	export let height: 'inherit' | number;
	export let maxWidth: number;
	export let src: string;
	export let width: 'inherit' | number;
	export let title: string | undefined;

	let imageCache = new Set();

	const suspenseImage = new Promise((resolve) => {
		if (imageCache.has(src)) {
			resolve(null);
		} else {
			const img = new Image();
			img.src = src;
			img.onload = () => {
				imageCache.add(src);
				resolve(null);
			};
		}
	});

	const [isSelected, setSelected, clearSelection] = useNodeSelection(editor, nodeKey);

	let imageRef: HTMLImageElement;

	const onDelete = (payload: KeyboardEvent) => {
		if (isSelected && isNodeSelection(getSelection())) {
			const event = payload;
			event.preventDefault();
			const node = getNodeByKey(nodeKey);
			if (isImageNode(node)) {
				node.remove();
			}
			setSelected(false);
		}

		return false;
	};

	onMount(() => {
		mergeRegister(
			editor.registerCommand(
				CLICK_COMMAND,
				(payload) => {
					const event = payload;
					if (event.target === imageRef) {
						if (event.shiftKey) {
							setSelected(!isSelected);
						} else {
							clearSelection();
							setSelected(true);
						}
					}
					return false;
				},
				COMMAND_PRIORITY_LOW
			),
			editor.registerCommand(KEY_DELETE_COMMAND, onDelete, COMMAND_PRIORITY_LOW),
			editor.registerCommand(KEY_BACKSPACE_COMMAND, onDelete, COMMAND_PRIORITY_LOW)
		);
	});
</script>

{#await suspenseImage}
	<Loading type="spinner" />
{:then _}
	<img
		{src}
		alt={altText}
		draggable="false"
		style="height: {height}; width: {width}; max-width: {maxWidth};"
		bind:this={imageRef}
		{title}
	/>
{/await}
