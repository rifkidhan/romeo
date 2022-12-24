import { createHeadlessEditor } from '@lexical/headless';
import { $convertToMarkdownString } from '@lexical/markdown';
import { TRANSFORMERS } from './lexicalTransformer';
import { ImageNode, HorizontalRuleNode } from '$lib/components/common/Richtext';
import { HeadingNode, QuoteNode } from '@lexical/rich-text';
import { ListItemNode, ListNode } from '@lexical/list';
import { LinkNode, AutoLinkNode } from '@lexical/link';
import { CodeNode, CodeHighlightNode } from '@lexical/code';

export const lexicalParser = (input: string) => {
	let output = '';

	const editor = createHeadlessEditor({
		nodes: [
			ImageNode,
			HorizontalRuleNode,
			HeadingNode,
			QuoteNode,
			ListItemNode,
			ListNode,
			LinkNode,
			AutoLinkNode,
			CodeHighlightNode,
			CodeNode
		]
	});

	editor.setEditorState(editor.parseEditorState(input));

	editor.update(() => {
		output = $convertToMarkdownString(TRANSFORMERS);

		return output;
	});

	return output;
};

export default lexicalParser;
