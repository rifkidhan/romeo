<script lang="ts">
	import type { EditorState, LexicalEditor } from 'lexical';
	import { onMount, getContext } from 'svelte';
	export let ignoreHistoryMergeTagChange = true;
	export let ignoreSelectionChange = false;
	export let onChange: (editorState: EditorState, editor: LexicalEditor) => void;
	export let editorState: Readonly<string> | undefined = undefined;
	const editor = getContext<LexicalEditor>('editor');

	onMount(() => {
		if (editorState) {
			editor.setEditorState(editor.parseEditorState(editorState));
		}
		editor.registerUpdateListener(
			({ editorState, dirtyElements, dirtyLeaves, prevEditorState, tags }) => {
				if (
					(ignoreSelectionChange && dirtyElements.size === 0 && dirtyLeaves.size === 0) ||
					(ignoreHistoryMergeTagChange && tags.has('history-merge')) ||
					prevEditorState.isEmpty()
				) {
					return;
				}

				onChange(editorState, editor);
			}
		);
	});
</script>
