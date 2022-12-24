<script lang="ts">
	import type { LexicalEditor } from 'lexical';
	import { getContext, onMount, createEventDispatcher } from 'svelte';

	const editor = getContext<LexicalEditor>('editor');
	const dispatch = createEventDispatcher();

	onMount(() => {
		editor.registerUpdateListener(({ editorState }) => {
			dispatch('output', {
				json: JSON.stringify(editorState)
			});
		});
	});
</script>
