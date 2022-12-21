<script lang="ts">
	import { getContext, onMount } from 'svelte';
	import { Button, Dropdown, DropdownItem } from '$lib/components/ui';
	import ToolbarIcons from './ToolbarIcons.svelte';
	import type { LexicalEditor, NodeKey } from 'lexical';
	import {
		$getSelection as getSelection,
		$isRangeSelection as isRangeSelection,
		$createParagraphNode as createParagraphNode,
		$isRootOrShadowRoot as isRootOrShadowRoot,
		$getNodeByKey as getNodeByKey,
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
		$findMatchingParent as findMatchingParent,
		mergeRegister
	} from '@lexical/utils';
	import {
		ListNode,
		$isListNode as isListNode,
		INSERT_ORDERED_LIST_COMMAND,
		INSERT_UNORDERED_LIST_COMMAND,
		INSERT_CHECK_LIST_COMMAND,
		REMOVE_LIST_COMMAND
	} from '@lexical/list';
	import {
		$createCodeNode as createCodeNode,
		$isCodeNode as isCodeNode,
		CODE_LANGUAGE_FRIENDLY_NAME_MAP,
		CODE_LANGUAGE_MAP,
		getLanguageFriendlyName
	} from '@lexical/code';
	import { $wrapNodes as wrapNodes } from '@lexical/selection';
	import { $isLinkNode as isLinkNode, TOGGLE_LINK_COMMAND } from '@lexical/link';
	import { INSERT_HORIZONTAL_RULE_COMMAND } from './nodes/HorizontalRuleNode';
	import getSelectedNode from './utils/getSelectedNode';
	import { sanitizeUrl } from './utils/url';
	import { floatingLink } from './utils/storeAction';
	import { activeModal } from '$lib/stores/ui';

	const editor = getContext<LexicalEditor>('editor');

	const getCodeLanguageOptions = (): [string, string][] => {
		const options: [string, string][] = [];

		for (const [lang, friendlyName] of Object.entries(CODE_LANGUAGE_FRIENDLY_NAME_MAP)) {
			options.push([lang, friendlyName]);
		}

		return options;
	};

	const CODE_LANGUAGE_OPTIONS = getCodeLanguageOptions();

	let isBold = false;
	let isItalic = false;
	let isStrikeThrough = false;
	let isUnderline = false;
	let isCode = false;
	let isLink = false;
	let codeLanguage = '';
	let selectedElementKey: null | NodeKey = null;
	let blockType = 'paragraph';
	let canUndo = false;
	let canRedo = false;
	let isEditable = editor.isEditable();

	$: updateState = () => {
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
			isCode = selection.hasFormat('code');

			const node = getSelectedNode(selection);
			const parent = node.getParent();

			if (isLinkNode(parent) || isLinkNode(node)) {
				isLink = true;
			} else {
				isLink = false;
			}

			if (elementDom !== null) {
				selectedElementKey = elementKey;
				if (isListNode(element)) {
					const parentList = getNearestNodeOfType(anchorNode, ListNode);
					const type = parentList ? parentList.getListType() : element.getListType();
					blockType = type;
				} else {
					const type = isHeadingNode(element) ? element.getTag() : element.getType();
					blockType = type;

					if (isCodeNode(element)) {
						const language = element.getLanguage() as keyof typeof CODE_LANGUAGE_MAP;

						codeLanguage = language ? CODE_LANGUAGE_MAP[language] || language : '';
					}

					return;
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
				let selection = getSelection();

				if (isRangeSelection(selection)) {
					if (selection.isCollapsed()) {
						wrapNodes(selection, () => createCodeNode());
					} else {
						const textContent = selection.getTextContent();
						const codeNode = createCodeNode();
						selection.insertNodes([codeNode]);
						selection = getSelection();

						if (isRangeSelection(selection)) {
							selection.insertRawText(textContent);
						}
					}
				}
			});
		}
	};

	$: $floatingLink = isLink ? true : false;
	const insertLink = () => {
		if (!isLink) {
			editor.dispatchCommand(TOGGLE_LINK_COMMAND, sanitizeUrl('https://'));
		} else {
			editor.dispatchCommand(TOGGLE_LINK_COMMAND, null);
		}
	};

	const onCodeLanguageSelect = (value: string) => {
		editor.update(() => {
			if (selectedElementKey !== null) {
				const node = getNodeByKey(selectedElementKey);
				if (isCodeNode(node)) {
					node.setLanguage(value);
				}
			}
		});
	};

	onMount(() => {
		mergeRegister(
			editor.registerEditableListener((editable) => {
				isEditable = editable;
			}),
			editor.registerUpdateListener(({ editorState }) => {
				editorState.read(() => {
					updateState();
				});
			}),
			editor.registerCommand(
				CAN_UNDO_COMMAND,
				(payload) => {
					canUndo = payload;
					return false;
				},
				COMMAND_PRIORITY_CRITICAL
			),
			editor.registerCommand(
				CAN_REDO_COMMAND,
				(payload) => {
					canRedo = payload;
					return false;
				},
				COMMAND_PRIORITY_CRITICAL
			)
		);
	});

	$: essentialItems = [
		{
			id: 'undo',
			name: 'Undo Command',
			command: () => editor.dispatchCommand(UNDO_COMMAND, undefined),
			disabled: canUndo
		},
		{
			id: 'redo',
			name: 'Redo Command',
			command: () => editor.dispatchCommand(REDO_COMMAND, undefined),
			disabled: canRedo
		}
	];

	$: inlineItems = [
		{
			id: 'bold',
			name: 'Bold Format',
			command: () => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold'),
			active: isBold
		},
		{
			id: 'italic',
			name: 'Italic Format',
			command: () => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic'),
			active: isItalic
		},
		{
			id: 'underline',
			name: 'Underline Format',
			command: () => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'underline'),
			active: isUnderline
		},
		{
			id: 'strike',
			name: 'Strikethrough Format',
			command: () => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'strikethrough'),
			active: isStrikeThrough
		},
		{
			id: 'link',
			name: 'Link Format',
			command: () => insertLink(),
			active: isLink
		},
		{
			id: 'codeInline',
			name: 'Code Format',
			command: () => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'code'),
			active: isCode
		}
	];

	$: blockItems = [
		{
			id: 'paragraph',
			name: 'Paragraph Format',
			command: () => formatParagraph(),
			active: blockType === 'paragraph'
		},
		{
			id: 'h2',
			name: 'Heading 2 Format',
			command: () => formatHeading('h2'),
			active: blockType === 'h2'
		},
		{
			id: 'h3',
			name: 'Heading 3 Format',
			command: () => formatHeading('h3'),
			active: blockType === 'h3'
		},
		{
			id: 'h4',
			name: 'Heading 4 Format',
			command: () => formatHeading('h4'),
			active: blockType === 'h4'
		},
		{
			id: 'h5',
			name: 'Heading 5 Format',
			command: () => formatHeading('h5'),
			active: blockType === 'h5'
		},
		{
			id: 'h6',
			name: 'Heading 6 Format',
			command: () => formatHeading('h6'),
			active: blockType === 'h6'
		},
		{
			id: 'number',
			name: 'Order List Format',
			command: () => formatNumberList(),
			active: blockType === 'number'
		},
		{
			id: 'bullet',
			name: 'Unorder List Format',
			command: () => formatBulletList(),
			active: blockType === 'bullet'
		},
		{
			id: 'check',
			name: 'Check List Format',
			command: () => formatChekList(),
			active: blockType === 'check'
		},
		{
			id: 'quote',
			name: 'Quote Format',
			command: () => formatQuote(),
			active: blockType === 'quote'
		},
		{
			id: 'codeBlock',
			name: 'Code Block Format',
			command: () => formatCode(),
			active: blockType === 'code'
		},
		{
			id: 'separator',
			name: 'Add Separator',
			command: () => editor.dispatchCommand(INSERT_HORIZONTAL_RULE_COMMAND, undefined)
		},
		{
			id: 'image',
			name: 'Add Image',
			command: () => {
				activeModal.set('image-plugin-lexical');
			}
		}
	];
</script>

<div class="toolbar">
	{#each essentialItems as essential}
		<Button
			type="button"
			variant="circle"
			disabled={!isEditable || !essential.disabled}
			on:click={essential.command}
			aria-label={essential.name}
			title={essential.name}
		>
			<ToolbarIcons name={essential.id} />
		</Button>
	{/each}
	<div class="separator" />
	{#if blockType === 'code'}
		<Dropdown class="w-64" title={getLanguageFriendlyName(codeLanguage)}>
			{#each CODE_LANGUAGE_OPTIONS as codes}
				<DropdownItem on:itemClick={() => onCodeLanguageSelect(codes[0])}>
					{codes[1]}
				</DropdownItem>
			{/each}
		</Dropdown>
	{:else}
		{#each blockItems as block}
			<Button
				type="button"
				variant="circle"
				on:click={block.command}
				disabled={!isEditable}
				aria-label={block.name}
				title={block.name}
				class={block.active ? 'bg-secondary hover:!shadow-red-down' : ''}
			>
				<ToolbarIcons name={block.id} class={block.active ? 'stroke-primary' : ''} />
			</Button>
		{/each}
	{/if}

	<div class="separator" />
	{#each inlineItems as inline}
		<Button
			type="button"
			variant="circle"
			on:click={inline.command}
			disabled={!isEditable}
			aria-label={inline.name}
			title={inline.name}
			class={inline.active ? 'w-10 bg-secondary hover:!shadow-red-down' : 'w-10'}
		>
			<ToolbarIcons name={inline.id} class={inline.active ? 'stroke-primary' : ''} />
		</Button>
	{/each}
</div>

<style lang="postcss">
	.toolbar {
		@apply relative flex  flex-wrap items-center gap-x-1 gap-y-2 p-5;
	}
	.separator {
		@apply mx-3 h-8 w-[2px] bg-secondary;
	}
</style>
