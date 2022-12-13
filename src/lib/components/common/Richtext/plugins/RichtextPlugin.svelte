<script lang="ts">
	import { onMount, getContext } from 'svelte';
	import { registerRichText } from '@lexical/rich-text';
	import type { LexicalEditor } from 'lexical';

	const editor = getContext<LexicalEditor>('editor');

	onMount(() => {
		registerRichText(editor);
	});
</script>
