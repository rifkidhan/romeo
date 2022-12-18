<script lang="ts">
	import type { LexicalEditor } from 'lexical';
	import { onMount, getContext } from 'svelte';

	export let defaultSelection: 'rootStart' | 'rootEnd' | undefined = undefined;

	const editor = getContext<LexicalEditor>('editor');

	onMount(() => {
		editor.focus(
			() => {
				const activeElement = document.activeElement;
				const rootElement = editor.getRootElement() as HTMLDivElement;

				if (
					rootElement !== null &&
					(activeElement !== null || !rootElement.contains(activeElement))
				) {
					rootElement.focus({ preventScroll: true });
				}
			},
			{ defaultSelection }
		);
	});
</script>
