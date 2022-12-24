<script lang="ts">
	import type { LexicalEditor } from 'lexical';
	import { onMount, getContext } from 'svelte';
	import { LinkNode, TOGGLE_LINK_COMMAND, toggleLink } from '@lexical/link';
	import { mergeRegister } from '@lexical/utils';
	import {
		$getSelection as getSelection,
		$isElementNode as isElementNode,
		$isRangeSelection as isRangeSelection,
		COMMAND_PRIORITY_LOW,
		PASTE_COMMAND
	} from 'lexical';
	import type { ValidateUrl } from '$lib/types/lexical';

	const editor = getContext<LexicalEditor>('editor');

	export let validateUrl: ValidateUrl | undefined = undefined;

	onMount(() => {
		if (!editor.hasNodes([LinkNode])) {
			throw new Error('LinkPlugin: LinkNode not registered on editor');
		}

		mergeRegister(
			editor.registerCommand(
				TOGGLE_LINK_COMMAND,
				(payload) => {
					if (payload === null) {
						toggleLink(payload);

						return true;
					} else if (typeof payload === 'string') {
						if (validateUrl === undefined || validateUrl(payload)) {
							toggleLink(payload);

							return true;
						}
						return false;
					} else {
						const { url, target, rel } = payload;

						toggleLink(url, { rel, target });

						return true;
					}
				},
				COMMAND_PRIORITY_LOW
			),
			validateUrl !== undefined
				? editor.registerCommand(
						PASTE_COMMAND,
						(e) => {
							const selection = getSelection();

							if (
								!isRangeSelection(selection) ||
								selection.isCollapsed() ||
								!(e instanceof ClipboardEvent) ||
								e.clipboardData == null
							) {
								return false;
							}
							const clipboardText = e.clipboardData.getData('text');

							if (validateUrl && !validateUrl(clipboardText)) {
								return false;
							}

							if (!selection.getNodes().some((node) => isElementNode(node))) {
								editor.dispatchCommand(TOGGLE_LINK_COMMAND, clipboardText);
								e.preventDefault();

								return true;
							}

							return false;
						},
						COMMAND_PRIORITY_LOW
				  )
				: () => {
						// empty
				  }
		);
	});
</script>
