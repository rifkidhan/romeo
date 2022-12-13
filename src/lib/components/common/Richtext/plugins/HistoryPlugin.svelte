<script lang="ts">
	import { onMount, getContext } from 'svelte';
	import { registerHistory, createEmptyHistoryState } from '@lexical/history';
	import type { LexicalEditor } from 'lexical';

	const editor = getContext<LexicalEditor>('editor');

	export let historyState = createEmptyHistoryState();
	export let delay = 1000;

	onMount(() => {
		registerHistory(editor, historyState, delay);
	});
</script>
