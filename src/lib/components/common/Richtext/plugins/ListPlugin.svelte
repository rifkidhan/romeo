<script lang="ts">
	import { onMount, getContext } from 'svelte';
	import type { LexicalEditor } from 'lexical';
	import {
		indentList,
		INSERT_ORDERED_LIST_COMMAND,
		INSERT_UNORDERED_LIST_COMMAND,
		INSERT_CHECK_LIST_COMMAND,
		insertList,
		outdentList,
		REMOVE_LIST_COMMAND,
		removeList,
		$handleListInsertParagraph as handleListInsertParagraph
	} from '@lexical/list';
	import {
		COMMAND_PRIORITY_LOW,
		INDENT_CONTENT_COMMAND,
		INSERT_PARAGRAPH_COMMAND,
		OUTDENT_CONTENT_COMMAND
	} from 'lexical';
	import { mergeRegister } from '@lexical/utils';

	const editor = getContext<LexicalEditor>('editor');

	onMount(() => {
		mergeRegister(
			editor.registerCommand(
				INDENT_CONTENT_COMMAND,
				() => {
					indentList();
					return false;
				},
				COMMAND_PRIORITY_LOW
			),
			editor.registerCommand(
				OUTDENT_CONTENT_COMMAND,
				() => {
					outdentList();
					return false;
				},
				COMMAND_PRIORITY_LOW
			),
			editor.registerCommand(
				INSERT_ORDERED_LIST_COMMAND,
				() => {
					insertList(editor, 'number');
					return true;
				},
				COMMAND_PRIORITY_LOW
			),
			editor.registerCommand(
				INSERT_UNORDERED_LIST_COMMAND,
				() => {
					insertList(editor, 'bullet');
					return true;
				},
				COMMAND_PRIORITY_LOW
			),
			editor.registerCommand(
				REMOVE_LIST_COMMAND,
				() => {
					removeList(editor);
					return true;
				},
				COMMAND_PRIORITY_LOW
			),
			editor.registerCommand(
				INSERT_PARAGRAPH_COMMAND,
				() => {
					const hasParagraph = handleListInsertParagraph();
					if (hasParagraph) {
						return true;
					}

					return false;
				},
				COMMAND_PRIORITY_LOW
			)
		);
	});
</script>
