<script lang="ts">
	import type { LexicalEditor, NodeKey } from 'lexical';
	import { onMount } from 'svelte';
	import useNodeSelection from '../utils/useSelectedNode';
	import {
		$isNodeSelection as isNodeSelection,
		$getSelection as getSelection,
		$getNodeByKey as getNodeByKey,
		CLICK_COMMAND,
		COMMAND_PRIORITY_LOW,
		KEY_DELETE_COMMAND,
		KEY_BACKSPACE_COMMAND
	} from 'lexical';
	import { mergeRegister } from '@lexical/utils';
	import { $isHorizontalRuleNode as isHorizontalRuleNode } from './HorizontalRuleNode';

	export let editor: LexicalEditor;
	export let key: NodeKey;

	const [isSelected, setSelected, clearSelection] = useNodeSelection(editor, key);

	const onDelete = (payload: KeyboardEvent) => {
		if (isSelected && isNodeSelection(getSelection)) {
			const event = payload;
			event.preventDefault();
			const node = getNodeByKey(key);

			if (isHorizontalRuleNode(node)) {
				node.remove();
			}

			setSelected(false);
		}

		return false;
	};

	onMount(() => {
		mergeRegister(
			editor.registerCommand(
				CLICK_COMMAND,
				(e: MouseEvent) => {
					const hr = editor.getElementByKey(key);

					if (e.target === hr) {
						if (!e.shiftKey) {
							clearSelection();
						}
						setSelected(!isSelected);
						return true;
					}

					return false;
				},
				COMMAND_PRIORITY_LOW
			),

			editor.registerCommand(KEY_DELETE_COMMAND, onDelete, COMMAND_PRIORITY_LOW),

			editor.registerCommand(KEY_BACKSPACE_COMMAND, onDelete, COMMAND_PRIORITY_LOW)
		);
	});
</script>
