import type { LexicalEditor, NodeKey } from 'lexical';
import pkg from 'lexical';
import { onMount } from 'svelte';

const { $createNodeSelection, $getNodeByKey, $getSelection, $isNodeSelection, $setSelection } = pkg;

const isNodeSelected = (editor: LexicalEditor, key: NodeKey): boolean => {
	return editor.getEditorState().read(() => {
		const node = $getNodeByKey(key);

		if (node === null) {
			return false;
		}

		return node.isSelected();
	});
};

export default function useNodeSelection(
	editor: LexicalEditor,
	key: NodeKey
): [boolean, (arg0: boolean) => void, () => void] {
	let isSelected = isNodeSelected(editor, key);

	onMount(() => {
		editor.registerUpdateListener(() => {
			isSelected = isNodeSelected(editor, key);
		});
	});

	const setSelected = (selected: boolean) => {
		editor.update(() => {
			let selection = $getSelection();

			if (!$isNodeSelection(selection)) {
				selection = $createNodeSelection();

				$setSelection(selection);
			}

			if (selected) {
				selection.add(key);
			} else {
				selection.delete(key);
			}
		});
	};

	const clearSelected = () => {
		editor.update(() => {
			const selection = $getSelection();

			if ($isNodeSelection(selection)) {
				selection.clear();
			}
		});
	};

	return [isSelected, setSelected, clearSelected];
}
