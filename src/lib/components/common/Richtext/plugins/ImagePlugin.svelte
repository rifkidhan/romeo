<script lang="ts">
	import type { LexicalEditor } from 'lexical';
	import { onMount, getContext } from 'svelte';
	import {
		INSERT_IMAGE_COMMAND,
		$isImageNode as isImageNode,
		$createImageNode as createImageNode,
		ImageNode
	} from '../nodes/ImageNode';
	import { $insertNodes as insertNodes, COMMAND_PRIORITY_EDITOR } from 'lexical';
	import { mergeRegister } from '@lexical/utils';

	const editor = getContext<LexicalEditor>('editor');

	onMount(() => {
		if (!editor.hasNodes([ImageNode])) {
			throw new Error('ImagesPlugin: ImageNode not registered on editor');
		}

		mergeRegister(
			editor.registerCommand(
				INSERT_IMAGE_COMMAND,
				(payload) => {
					const imageNode = createImageNode(payload);
					insertNodes([imageNode]);

					return true;
				},
				COMMAND_PRIORITY_EDITOR
			)
		);
	});
</script>
