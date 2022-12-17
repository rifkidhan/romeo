<script lang="ts">
	import type { LexicalEditor } from 'lexical';
	import { getContext, onMount } from 'svelte';
	import { registerCodeHighlighting } from '@lexical/code';

	const editor = getContext<LexicalEditor>('editor');

	onMount(() => {
		registerCodeHighlighting(editor);
	});
</script>
