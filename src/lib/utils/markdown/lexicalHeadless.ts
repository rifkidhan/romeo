import headless from '@lexical/headless';
import markdown from '@lexical/markdown';
import { TRANSFORMERS } from './lexicalTransformer';
import { ImageNode } from '$lib/components/common/Richtext/nodes/ImageNode';
import { HorizontalRuleNode } from '$lib/components/common/Richtext/nodes/HorizontalRuleNode';
import rich from '@lexical/rich-text';
import list from '@lexical/list';
import link from '@lexical/link';
import code from '@lexical/code';

const { createHeadlessEditor } = headless;
const { $convertToMarkdownString } = markdown;
const { HeadingNode, QuoteNode } = rich;
const { LinkNode, AutoLinkNode } = link;
const { ListItemNode, ListNode } = list;
const { CodeNode, CodeHighlightNode } = code;

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
