<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import Editor from './Editor.svelte';
	import Toolbar from './Toolbar.svelte';
	import RichtextPlugin from './plugins/RichtextPlugin.svelte';
	import HistoryPlugin from './plugins/HistoryPlugin.svelte';
	import ListPlugin from './plugins/ListPlugin.svelte';
	import OnChangePlugin from './plugins/OnChangePlugin.svelte';
	import HtmlPlugin from './plugins/HtmlPlugin.svelte';
	import { HeadingNode, QuoteNode } from '@lexical/rich-text';
	import { ListItemNode, ListNode } from '@lexical/list';
	// import theme from './themes/PlaygroundEditorThemes';

	const dispatch = createEventDispatcher();

	let htmlString: string | undefined = undefined;
	export let editable: boolean | undefined = undefined;

	// export let convertToNode: string | undefined = undefined;
	const config = {
		editable,

		namespace: 'RomeoRichText',
		nodes: [HeadingNode, ListNode, ListItemNode, QuoteNode],
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
	<Editor {config}>
		<Toolbar slot="toolbar" />
		<RichtextPlugin />
		<HistoryPlugin />
		<ListPlugin />
		<OnChangePlugin {onChange} />
		<HtmlPlugin
			{htmlString}
			on:html={(e) => {
				htmlString = e.detail.html;
			}}
		/>
	</Editor>
</div>

<style lang="postcss">
	.editor {
		@apply w-full;
	}
</style>
