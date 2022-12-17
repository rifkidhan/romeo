<script lang="ts">
	import { browser } from '$app/environment';
	import type { ChangeHandler, LinkMatcher, LinkMatcherResult } from '$lib/types/lexical';
	import type { ElementNode, LexicalEditor, LexicalNode } from 'lexical';
	import { getContext, onMount } from 'svelte';
	import {
		$createAutoLinkNode as createAutoLinkNode,
		$isAutoLinkNode as isAutoLinkNode,
		$isLinkNode as isLinkNode,
		AutoLinkNode
	} from '@lexical/link';
	import {
		$createTextNode as createTextNode,
		$isElementNode as isElementNode,
		$isLineBreakNode as isLineBreakNode,
		$isTextNode as isTextNode,
		TextNode
	} from 'lexical';
	import { mergeRegister } from '@lexical/utils';
	import { MATCHERS } from '../../utils/url';

	const editor = getContext<LexicalEditor>('editor');

	const findFirstMatch = (text: string, matcher: LinkMatcher[]): LinkMatcherResult | null => {
		for (let i = 0; i < matcher.length; i++) {
			const match = matcher[i](text);

			if (match) {
				return match;
			}
		}

		return null;
	};

	const replaceWithChildren = (node: ElementNode): LexicalNode[] => {
		const children = node.getChildren();
		const childrenLength = children.length;

		for (let j = childrenLength - 1; j >= 0; j--) {
			node.insertAfter(children[j]);
		}

		node.remove();
		return children.map((child) => child.getLatest());
	};

	const PUNCTUATION_OR_SPACE = /[.,;\s]/;

	const isSeparator = (char: string): boolean => {
		return PUNCTUATION_OR_SPACE.test(char);
	};

	const startWithSeparator = (content: string): boolean => {
		return isSeparator(content[0]);
	};

	const endWithSeparator = (content: string): boolean => {
		return isSeparator(content[content.length - 1]);
	};

	const isPreviousNodeValid = (node: LexicalNode): boolean => {
		let previousNode = node.getPreviousSibling();
		if (isElementNode(previousNode)) {
			previousNode = previousNode.getLastDescendant();
		}

		return (
			previousNode === null ||
			isLineBreakNode(previousNode) ||
			(isTextNode(previousNode) && endWithSeparator(previousNode.getTextContent()))
		);
	};

	const isNextNodeValid = (node: LexicalNode): boolean => {
		let nextNode = node.getNextSibling();
		if (isElementNode(nextNode)) {
			nextNode = nextNode.getFirstDescendant();
		}

		return (
			nextNode === null ||
			isLineBreakNode(nextNode) ||
			(isTextNode(nextNode) && startWithSeparator(nextNode.getTextContent()))
		);
	};

	const isContentAroundIsValid = (
		start: number,
		end: number,
		text: string,
		node: TextNode
	): boolean => {
		const contentBeforeIsValid =
			start > 0 ? isSeparator(text[start - 1]) : isPreviousNodeValid(node);

		if (!contentBeforeIsValid) {
			return false;
		}

		const contentAfterIsValid = end < text.length ? isSeparator(text[end]) : isNextNodeValid(node);

		return contentAfterIsValid;
	};

	const handleLinkCreation = (node: TextNode, matchers: LinkMatcher[], onChange: ChangeHandler) => {
		const nodeText = node.getTextContent();
		let text = nodeText;
		let invalidMatchEnd = 0;
		let remainingTextNode = node;
		let match;

		while ((match = findFirstMatch(text, matchers)) && match !== null) {
			const matchStart = match.index;
			const matchLength = match.length;
			const matchEnd = matchStart + matchLength;
			const isValid = isContentAroundIsValid(
				invalidMatchEnd + matchStart,
				invalidMatchEnd + matchEnd,
				nodeText,
				node
			);

			if (isValid) {
				let linkTextNode;
				if (invalidMatchEnd + matchStart === 0) {
					[linkTextNode, remainingTextNode] = remainingTextNode.splitText(
						invalidMatchEnd + matchLength
					);
				} else {
					[, linkTextNode, remainingTextNode] = remainingTextNode.splitText(
						invalidMatchEnd + matchStart,
						invalidMatchEnd + matchStart + matchLength
					);
				}
				const linkNode = createAutoLinkNode(match.url, match.attributes);
				const textNode = createTextNode(match.text);
				textNode.setFormat(linkTextNode.getFormat());
				textNode.setDetail(linkTextNode.getDetail());
				linkNode.append(textNode);
				linkTextNode.replace(linkNode);
				onChange(match.url, null);
				invalidMatchEnd = 0;
			} else {
				invalidMatchEnd += matchEnd;
			}

			text = text.substring(matchEnd);
		}
	};

	const handleLinkEdit = (
		linkNode: AutoLinkNode,
		matchers: LinkMatcher[],
		onChange: ChangeHandler
	) => {
		// Check children are simple text
		const children = linkNode.getChildren();
		const childrenLength = children.length;
		for (let i = 0; i < childrenLength; i++) {
			const child = children[i];
			if (!isTextNode(child) || !child.isSimpleText()) {
				replaceWithChildren(linkNode);
				onChange(null, linkNode.getURL());
				return;
			}
		}

		// Check text content fully matches
		const text = linkNode.getTextContent();
		const match = findFirstMatch(text, matchers);
		if (match === null || match.text !== text) {
			replaceWithChildren(linkNode);
			onChange(null, linkNode.getURL());
			return;
		}

		// Check neighbors
		if (!isPreviousNodeValid(linkNode) || !isNextNodeValid(linkNode)) {
			replaceWithChildren(linkNode);
			onChange(null, linkNode.getURL());
			return;
		}

		const url = linkNode.getURL();
		if (url !== match.url) {
			linkNode.setURL(match.url);
			onChange(match.url, url);
		}

		if (match.attributes) {
			const rel = linkNode.getRel();
			if (rel !== match.attributes.rel) {
				linkNode.setRel(match.attributes.rel || null);
				onChange(match.attributes.rel || null, rel);
			}

			const target = linkNode.getTarget();
			if (target !== match.attributes.target) {
				linkNode.setTarget(match.attributes.target || null);
				onChange(match.attributes.target || null, target);
			}
		}
	};

	const handleBadNeighbors = (textNode: TextNode, onChange: ChangeHandler) => {
		const previousSibling = textNode.getPreviousSibling();
		const nextSibling = textNode.getNextSibling();
		const text = textNode.getTextContent();

		if (isAutoLinkNode(previousSibling) && !startWithSeparator(text)) {
			replaceWithChildren(previousSibling);
			onChange(null, previousSibling.getURL());
		}

		if (isAutoLinkNode(nextSibling) && !endWithSeparator(text)) {
			replaceWithChildren(nextSibling);
			onChange(null, nextSibling.getURL());
		}
	};

	const useAutoLink = (
		editor: LexicalEditor,
		matchers: LinkMatcher[],
		onChange?: ChangeHandler
	) => {
		if (!editor.hasNodes([AutoLinkNode])) {
			throw new Error('AutoLinkPlugin: AutoLinkNode not registered on editor');
		}
		const onChangeWrapper = (url: string | null, prevUrl: string | null) => {
			if (onChange) {
				onChange(url, prevUrl);
			}
		};

		return mergeRegister(
			editor.registerNodeTransform(TextNode, (textNode: TextNode) => {
				const parent = textNode.getParentOrThrow();

				if (isAutoLinkNode(parent)) {
					handleLinkEdit(parent, matchers, onChangeWrapper);
				} else if (isLinkNode(parent)) {
					if (textNode.isSimpleText()) {
						handleLinkCreation(textNode, matchers, onChangeWrapper);
					}
					handleBadNeighbors(textNode, onChangeWrapper);
				}
			})
		);
	};

	// $: if (browser) {
	// 	useAutoLink(editor, MATCHERS);
	// }

	onMount(() => {
		useAutoLink(editor, MATCHERS);
	});
</script>
