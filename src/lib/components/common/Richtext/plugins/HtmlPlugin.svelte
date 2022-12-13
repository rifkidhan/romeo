<script lang="ts">
	import type { LexicalEditor } from 'lexical';
	import { getContext, createEventDispatcher, onMount } from 'svelte';
	// import { $getRoot as getRoot, $insertNodes as insertNodes } from 'lexical';
	import { $generateHtmlFromNodes as generateHtmlFromNodes } from '@lexical/html';

	const dispatch = createEventDispatcher();

	export let htmlString: string | undefined = undefined;
	// export let convertToNode: string | undefined = undefined;
	const editor = getContext<LexicalEditor>('editor');

	// $: if (convert && htmlString) {
	// 	editor.update(() => {
	// 		const parser = new DOMParser();
	// 		const dom = parser.parseFromString(htmlString as string, 'text/html');

	// 		const nodes = generateNodesFromDOM(editor, dom);

	// 		getRoot().select();

	// 		insertNodes(nodes);
	// 	});
	// }

	onMount(() => {
		editor.registerUpdateListener(({ editorState }) => {
			editorState.read(() => {
				htmlString = generateHtmlFromNodes(editor, null);
				dispatch('html', {
					html: htmlString
				});
			});
		});
	});
</script>
