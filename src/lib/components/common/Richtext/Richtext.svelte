<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { EditorConfig } from '$lib/types/lexical';
	import Editor from './Editor.svelte';
	import Toolbar from './Toolbar.svelte';
	import RichtextPlugin from './plugins/RichtextPlugin.svelte';
	import HistoryPlugin from './plugins/HistoryPlugin.svelte';
	import ListPlugin from './plugins/ListPlugin.svelte';
	import OnChangePlugin from './plugins/OnChangePlugin.svelte';
	import HtmlPlugin from './plugins/HtmlPlugin.svelte';
	import AutoLinkPlugin from './plugins/link/AutoLinkPlugin.svelte';
	import LinkPlugin from './plugins/link/LinkPlugin.svelte';
	import CodeHighlightingPlugin from './plugins/CodeHighlightingPlugin.svelte';
	import FloatingLinkPlugin from './plugins/link/FloatingLinkPlugin.svelte';
	import AutofocusPlugin from './plugins/AutofocusPlugin.svelte';
	import HorizontalRulePlugin from './plugins/HorizontalRulePlugin.svelte';
	import ImagePlugin from './plugins/image/ImagePlugin.svelte';
	import { HeadingNode, QuoteNode } from '@lexical/rich-text';
	import { ListItemNode, ListNode } from '@lexical/list';
	import { LinkNode, AutoLinkNode } from '@lexical/link';
	import { CodeNode, CodeHighlightNode } from '@lexical/code';
	import { HorizontalRuleNode } from './nodes/HorizontalRuleNode';
	import { ImageNode } from './nodes/ImageNode';
	import { validateUrl } from './utils/url';
	import theme from './themes/PlaygroundEditorThemes';

	const dispatch = createEventDispatcher();

	let htmlString: string | undefined = undefined;
	export let editable: boolean | undefined = false;
	let ref: HTMLElement;

	let config = {
		editable,
		theme,
		namespace: 'RomeoRichText',
		nodes: [
			HeadingNode,
			ListNode,
			ListItemNode,
			QuoteNode,
			LinkNode,
			AutoLinkNode,
			CodeHighlightNode,
			CodeNode,
			HorizontalRuleNode,
			ImageNode
		],
		onError: (error: Error) => {
			throw error;
		}
	};

	const onChange = () => {
		dispatch('json', {
			content: htmlString
		});
	};
</script>

<div class="editor">
	<Editor {config} bind:floatingRef={ref}>
		<Toolbar slot="toolbar" />
		<RichtextPlugin />
		<HistoryPlugin />
		<ListPlugin />
		<AutoLinkPlugin />
		<CodeHighlightingPlugin />
		<AutofocusPlugin />
		<HorizontalRulePlugin />
		<ImagePlugin />
		<LinkPlugin {validateUrl} />
		<OnChangePlugin {onChange} />
		<HtmlPlugin
			{htmlString}
			on:html={(e) => {
				htmlString = e.detail.html;
			}}
		/>

		<FloatingLinkPlugin anchorElement={ref} />
	</Editor>
</div>

<style lang="postcss">
	.editor {
		@apply w-full;
	}
</style>
