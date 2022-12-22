<script lang="ts">
	import { onMount, setContext } from 'svelte';
	import { createEditor } from 'lexical';
	import type { EditorConfig } from '$lib/types/lexical';

	export let config: EditorConfig | undefined = undefined;
	export let floatingRef: HTMLDivElement | HTMLElement | undefined = undefined;

	let contentEditable: HTMLDivElement;

	const editor = createEditor(config);
	setContext('editor', editor);

	onMount(() => {
		editor.setRootElement(contentEditable);
	});
</script>

<div class="editor">
	<slot name="toolbar" />
	<div class="separator" />
	<div>
		<div bind:this={floatingRef} />
		<div
			contenteditable="true"
			bind:this={contentEditable}
			class="contenteditable"
			autoComplete="off"
			autoCorrect="off"
			autoCapitalize="off"
			spellCheck="false"
		/>
		<slot />
	</div>
</div>

<style lang="postcss">
	.editor {
		@apply flex max-h-fit flex-col rounded-xl border-2 border-secondary;
	}
	.separator {
		@apply h-[2px] w-full bg-secondary;
	}
	.contenteditable {
		@apply mx-auto max-h-[120vh] min-h-[20rem] w-full overflow-y-auto overscroll-y-auto whitespace-pre-wrap break-words p-5 focus:outline-none;
	}
</style>
