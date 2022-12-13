<script lang="ts">
	import { getContext, onMount } from 'svelte';
	import { Button } from '$lib/components/ui';
	import ToolbarIcons from './ToolbarIcons.svelte';
	import type { LexicalEditor, NodeKey } from 'lexical';
	import {
		$getSelection as getSelection,
		$isRangeSelection as isRangeSelection,
		$createParagraphNode as createParagraphNode,
		$isRootOrShadowRoot as isRootOrShadowRoot,
		FORMAT_TEXT_COMMAND,
		CAN_REDO_COMMAND,
		CAN_UNDO_COMMAND,
		UNDO_COMMAND,
		REDO_COMMAND,
		COMMAND_PRIORITY_CRITICAL
	} from 'lexical';
	import {
		$isHeadingNode as isHeadingNode,
		$createHeadingNode as createHeadingNode,
		$createQuoteNode as createQuoteNode,
		type HeadingTagType
	} from '@lexical/rich-text';
	import {
		$getNearestNodeOfType as getNearestNodeOfType,
		$findMatchingParent as findMatchingParent
	} from '@lexical/utils';
	import {
		ListNode,
		$isListNode as isListNode,
		INSERT_ORDERED_LIST_COMMAND,
		INSERT_UNORDERED_LIST_COMMAND,
		INSERT_CHECK_LIST_COMMAND,
		REMOVE_LIST_COMMAND
	} from '@lexical/list';
	import { $createCodeNode as createCodeNode } from '@lexical/code';
	import { $wrapNodes as wrapNodes } from '@lexical/selection';

	const editor = getContext<LexicalEditor>('editor');

	const blockTypeToBlockName = {
		bullet: 'Bulleted List',
		check: 'Check List',
		code: 'Code Block',
		h2: 'Heading 2',
		h3: 'Heading 3',
		h4: 'Heading 4',
		h5: 'Heading 5',
		h6: 'Heading 6',
		number: 'Numbered List',
		paragraph: 'Normal',
		quote: 'Quote'
	};

	let isBold = false;
	let isItalic = false;
	let isStrikeThrough = false;
	let isUnderline = false;
	let selectedElementKey: null | NodeKey = null;
	let blockType: keyof typeof blockTypeToBlockName = 'paragraph';
	let canUndo = false;
	let canRedo = false;

	const updateState = () => {
		const selection = getSelection();

		if (isRangeSelection(selection)) {
			const anchorNode = selection.anchor.getNode();
			let element =
				anchorNode.getKey() === 'root'
					? anchorNode
					: findMatchingParent(anchorNode, (e) => {
							const parent = e.getParent();
							return parent !== null && isRootOrShadowRoot(parent);
					  });

			if (element === null) {
				element = anchorNode.getTopLevelElementOrThrow();
			}

			const elementKey = element.getKey();
			const elementDom = editor.getElementByKey(elementKey);

			isBold = selection.hasFormat('bold');
			isItalic = selection.hasFormat('italic');
			isStrikeThrough = selection.hasFormat('strikethrough');
			isUnderline = selection.hasFormat('underline');

			if (elementDom !== null) {
				selectedElementKey = elementKey;
				if (isListNode(element)) {
					const parentList = getNearestNodeOfType(anchorNode, ListNode);
					const type = parentList ? parentList.getListType() : element.getListType();
					blockType = type;
				} else {
					const type = isHeadingNode(element) ? element.getTag() : element.getType();
					blockType = type as keyof typeof blockTypeToBlockName;
				}
			}
		}
	};
	const formatParagraph = () => {
		if (blockType !== 'paragraph') {
			editor.update(() => {
				const selection = getSelection();
				if (isRangeSelection(selection)) {
					wrapNodes(selection, () => createParagraphNode());
				}
			});
		}
	};

	const formatHeading = (heading: HeadingTagType) => {
		if (blockType !== heading) {
			editor.update(() => {
				const selection = getSelection();

				if (isRangeSelection(selection)) {
					wrapNodes(selection, () => createHeadingNode(heading));
				}
			});
		}
	};

	const formatBulletList = () => {
		if (blockType !== 'bullet') {
			editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
		} else {
			editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
		}
	};

	const formatNumberList = () => {
		if (blockType !== 'number') {
			editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined);
		} else {
			editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
		}
	};

	const formatChekList = () => {
		if (blockType !== 'check') {
			editor.dispatchCommand(INSERT_CHECK_LIST_COMMAND, undefined);
		} else {
			editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
		}
	};

	const formatQuote = () => {
		if (blockType !== 'quote') {
			editor.update(() => {
				const selection = getSelection();

				if (isRangeSelection(selection)) {
					wrapNodes(selection, () => createQuoteNode());
				}
			});
		}
	};

	const formatCode = () => {
		if (blockType !== 'code') {
			editor.update(() => {
				const selection = getSelection();

				if (isRangeSelection(selection)) {
					if (selection.isCollapsed()) {
						wrapNodes(selection, () => createCodeNode());
					} else {
						const textContent = selection.getTextContent();
						const codeNode = createCodeNode();
						selection.insertNodes([codeNode]);
						selection.insertRawText(textContent);
					}
				}
			});
		}
	};

	onMount(() => {
		editor.registerUpdateListener(({ editorState }) => {
			editorState.read(() => {
				updateState();
			});
		});
		editor.registerCommand(
			CAN_UNDO_COMMAND,
			(payload) => {
				canUndo = payload;
				return false;
			},
			COMMAND_PRIORITY_CRITICAL
		);
		editor.registerCommand(
			CAN_REDO_COMMAND,
			(payload) => {
				canRedo = payload;
				return false;
			},
			COMMAND_PRIORITY_CRITICAL
		);
	});

	const toolbarItems = [
		{
			id: 'bold',
			name: 'Bold Format',
			command: () => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold')
		},
		{
			id: 'italic',
			name: 'Italic Format',
			command: () => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic')
		},
		{
			id: 'underline',
			name: 'Underline Format',
			command: () => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'underline')
		},
		{
			id: 'strike',
			name: 'Strikethrough Format',
			command: () => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'strikethrough')
		},
		{
			id: 'codeInline',
			name: 'Code Format',
			command: () => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'code')
		},
		{
			type: 'separator',
			id: ''
		},
		{
			id: 'paragraph',
			name: 'Paragraph Format',
			command: () => formatParagraph()
		},
		{
			id: 'h2',
			name: 'Heading 2 Format',
			command: () => formatHeading('h2')
		},
		{
			id: 'h3',
			name: 'Heading 3 Format',
			command: () => formatHeading('h3')
		},
		{
			id: 'h4',
			name: 'Heading 4 Format',
			command: () => formatHeading('h4')
		},
		{
			id: 'h5',
			name: 'Heading 5 Format',
			command: () => formatHeading('h5')
		},
		{
			id: 'h6',
			name: 'Heading 6 Format',
			command: () => formatHeading('h6')
		},
		{
			type: 'separator',
			id: ''
		},
		{
			id: 'number',
			name: 'Order List Format',
			command: () => formatNumberList()
		},
		{
			id: 'bullet',
			name: 'Unorder List Format',
			command: () => formatBulletList()
		},
		{
			id: 'check',
			name: 'Check List Format',
			command: () => formatChekList()
		},
		{
			id: 'quote',
			name: 'Quote Format',
			command: () => formatQuote()
		},
		{
			id: 'codeBlock',
			name: 'Code Block Format',
			command: () => formatCode()
		},
		{
			type: 'separator',
			id: ''
		},
		{
			id: 'undo',
			name: 'Undo Command',
			command: () => editor.dispatchCommand(UNDO_COMMAND, undefined)
		},
		{
			id: 'redo',
			name: 'Redo Command',
			command: () => editor.dispatchCommand(REDO_COMMAND, undefined)
		}
	];
</script>

<div class="toolbar">
	{#each toolbarItems as item}
		{#if item.type === 'separator'}
			<div class="separator" />
		{:else}
			<Button
				type="button"
				variant="circle"
				on:click={item.command}
				aria-label={item.name}
				title={item.name}
			>
				<ToolbarIcons name={item.id} />
			</Button>
		{/if}
	{/each}
</div>

<style lang="postcss">
	.toolbar {
		@apply relative flex flex-row flex-wrap items-center justify-start gap-x-1 gap-y-2 p-5;
	}
	.separator {
		@apply mx-3 h-8 w-[2px] bg-secondary;
	}
</style>
