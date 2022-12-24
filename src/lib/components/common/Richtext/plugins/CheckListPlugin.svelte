<script lang="ts">
	import type { LexicalEditor } from 'lexical';
	import type { ListItemNode } from '@lexical/list';
	import { onMount, getContext } from 'svelte';
	import {
		$isListItemNode as isListItemNode,
		$isListNode as isListNode,
		INSERT_CHECK_LIST_COMMAND,
		insertList
	} from '@lexical/list';
	import { $findMatchingParent as findMatchingParent, mergeRegister } from '@lexical/utils';
	import {
		$getNearestNodeFromDOMNode as getNearestNodeFromDOMNode,
		$getSelection as getSelection,
		$isElementNode as isElementNode,
		$isRangeSelection as isRangeSelection,
		COMMAND_PRIORITY_LOW,
		KEY_ARROW_DOWN_COMMAND,
		KEY_ARROW_LEFT_COMMAND,
		KEY_ARROW_UP_COMMAND,
		KEY_ESCAPE_COMMAND,
		KEY_SPACE_COMMAND
	} from 'lexical';

	const editor = getContext<LexicalEditor>('editor');

	let listenersCount = 0;

	const handleCheckItemEvent = (e: PointerEvent, callback: () => void) => {
		const target = e.target;

		if (!(target instanceof HTMLElement)) {
			return;
		}

		// Ignore clicks on LI that have nested lists
		const firstChild = target.firstChild;

		if (
			firstChild != null &&
			firstChild instanceof HTMLElement &&
			(firstChild.tagName === 'UL' || firstChild.tagName === 'OL')
		) {
			return;
		}

		const parentNode = target.parentNode;

		/* eslint-disabled-next-line @typescript-eslint/ban-ts-comment */
		// @ts-ignore internal field
		if (!parentNode || parentNode.__lexicalListType !== 'check') {
			return;
		}

		const pageX = e.pageX;
		const rect = target.getBoundingClientRect();

		if (
			target.dir === 'rtl'
				? pageX < rect.right && pageX > rect.right - 20
				: pageX > rect.left && pageX < rect.left + 20
		) {
			callback();
		}
	};

	const findEditor = (target: Node | ParentNode | null) => {
		let node = target;

		while (node) {
			/* eslint-disabled-next-line @typescript-eslint/ban-ts-comment */
			// @ts-ignore internal field
			if (node.__lexicalEditor) {
				/* eslint-disabled-next-line @typescript-eslint/ban-ts-comment */
				// @ts-ignore internal field
				return node.__lexicalEditor;
			}

			node = node.parentNode;
		}

		return null;
	};

	const handleClick = (e: Event) => {
		handleCheckItemEvent(e as PointerEvent, () => {
			const domNode = e.target as HTMLElement;
			const editor = findEditor(domNode);

			if (editor != null && editor.isEditable()) {
				editor.update(() => {
					if (e.target) {
						const node = getNearestNodeFromDOMNode(domNode);

						if (isListItemNode(node)) {
							domNode.focus();
							node.toggleChecked();
						}
					}
				});
			}
		});
	};

	const handlePointerDown = (e: PointerEvent) => {
		handleCheckItemEvent(e, () => {
			e.preventDefault();
		});
	};

	const getActiveCheckListItem = (): HTMLElement | null => {
		const activeElement = document.activeElement as HTMLElement;

		return activeElement != null &&
			activeElement.tagName === 'LI' &&
			activeElement.parentNode != null &&
			/* eslint-disabled-next-line @typescript-eslint/ban-ts-comment */
			// @ts-ignore internal field
			activeElement.parentNode.__lexicalListType === 'check'
			? activeElement
			: null;
	};

	const findCheckListItemSibling = (node: ListItemNode, backward: boolean): ListItemNode | null => {
		let sibling = backward ? node.getPreviousSibling() : node.getNextSibling();
		let parent: ListItemNode | null = node;

		// Going up in a tree to get non-null sibling
		while (sibling == null && isListItemNode(parent)) {
			// Get li -> parent ul/ol -> parent li
			parent = parent.getParentOrThrow().getParent();

			if (parent != null) {
				sibling = backward ? parent.getPreviousSibling() : parent.getNextSibling();
			}
		}

		// Going down in a tree to get first non-nested list item
		while (isListItemNode(sibling)) {
			const firstChild = backward ? sibling.getLastChild() : sibling.getFirstChild();

			if (!isListNode(firstChild)) {
				return sibling;
			}

			sibling = backward ? firstChild.getLastChild() : firstChild.getFirstChild();
		}

		return null;
	};

	const handleArrownUpOrDown = (event: KeyboardEvent, editor: LexicalEditor, backward: boolean) => {
		const activeItem = getActiveCheckListItem();

		if (activeItem != null) {
			editor.update(() => {
				const listItem = getNearestNodeFromDOMNode(activeItem);

				if (!isListItemNode(listItem)) {
					return;
				}

				const nextListItem = findCheckListItemSibling(listItem, backward);

				if (nextListItem != null) {
					nextListItem.selectStart();
					const dom = editor.getElementByKey(nextListItem.__key);

					if (dom != null) {
						event.preventDefault();
						setTimeout(() => {
							dom.focus();
						}, 0);
					}
				}
			});
		}

		return false;
	};

	const listenPointerDown = () => {
		if (listenersCount++ === 0) {
			document.addEventListener('click', handleClick);
			document.addEventListener('pointerdown', handlePointerDown);
		}

		return () => {
			if (--listenersCount === 0) {
				document.removeEventListener('click', handleClick);
				document.removeEventListener('pointerdown', handlePointerDown);
			}
		};
	};

	onMount(() => {
		mergeRegister(
			editor.registerCommand(
				INSERT_CHECK_LIST_COMMAND,
				() => {
					insertList(editor, 'check');
					return true;
				},
				COMMAND_PRIORITY_LOW
			),
			editor.registerCommand(
				KEY_ARROW_DOWN_COMMAND,
				(event) => {
					return handleArrownUpOrDown(event, editor, false);
				},
				COMMAND_PRIORITY_LOW
			),
			editor.registerCommand(
				KEY_ARROW_UP_COMMAND,
				(event) => {
					return handleArrownUpOrDown(event, editor, true);
				},
				COMMAND_PRIORITY_LOW
			),
			editor.registerCommand(
				KEY_ESCAPE_COMMAND,
				() => {
					const activeItem = getActiveCheckListItem();

					if (activeItem != null) {
						const rootElement = editor.getRootElement();

						if (rootElement != null) {
							rootElement.focus();
						}

						return true;
					}

					return false;
				},
				COMMAND_PRIORITY_LOW
			),
			editor.registerCommand(
				KEY_SPACE_COMMAND,
				(event) => {
					const activeItem = getActiveCheckListItem();

					if (activeItem != null && editor.isEditable()) {
						editor.update(() => {
							const listItemNode = getNearestNodeFromDOMNode(activeItem);

							if (isListItemNode(listItemNode)) {
								event.preventDefault();
								listItemNode.toggleChecked();
							}
						});
						return true;
					}

					return false;
				},
				COMMAND_PRIORITY_LOW
			),
			editor.registerCommand(
				KEY_ARROW_LEFT_COMMAND,
				(event) => {
					return editor.getEditorState().read(() => {
						const selection = getSelection();

						if (isRangeSelection(selection) && selection.isCollapsed()) {
							const { anchor } = selection;
							const isElement = anchor.type === 'element';

							if (isElement || anchor.offset === 0) {
								const anchorNode = anchor.getNode();
								const elementNode = findMatchingParent(
									anchorNode,
									(node) => isElementNode(node) && !node.isInline()
								);
								if (isListItemNode(elementNode)) {
									const parent = elementNode.getParent();
									if (
										isListNode(parent) &&
										parent.getListType() === 'check' &&
										(isElement || elementNode.getFirstDescendant() === anchorNode)
									) {
										const domNode = editor.getElementByKey(elementNode.__key);

										if (domNode != null && document.activeElement !== domNode) {
											domNode.focus();
											event.preventDefault();
											return true;
										}
									}
								}
							}
						}

						return false;
					});
				},
				COMMAND_PRIORITY_LOW
			),
			listenPointerDown()
		);
	});
</script>
