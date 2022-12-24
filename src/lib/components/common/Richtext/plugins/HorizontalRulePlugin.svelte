<script lang="ts">
	import { onMount, getContext } from 'svelte';
	import type { LexicalEditor } from 'lexical';
	import {
		$createHorizontalRuleNode as createHorizontalRuleNode,
		INSERT_HORIZONTAL_RULE_COMMAND
	} from '../nodes/HorizontalRuleNode';
	import { $insertNodeToNearestRoot as insertNodeToNearestRoot } from '@lexical/utils';
	import {
		$getSelection as getSelection,
		$isRangeSelection as isRangeSelection,
		COMMAND_PRIORITY_EDITOR
	} from 'lexical';

	const editor = getContext<LexicalEditor>('editor');

	onMount(() => {
		editor.registerCommand(
			INSERT_HORIZONTAL_RULE_COMMAND,
			() => {
				const selection = getSelection();
				if (!isRangeSelection(selection)) {
					return false;
				}

				const focusNode = selection.focus.getNode();

				if (focusNode !== null) {
					const horizontal = createHorizontalRuleNode();
					insertNodeToNearestRoot(horizontal);
				}

				return true;
			},
			COMMAND_PRIORITY_EDITOR
		);
	});
</script>
