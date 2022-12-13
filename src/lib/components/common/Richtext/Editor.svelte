<script lang="ts">
	import { onMount, setContext } from 'svelte';
	import { createEditor } from 'lexical';

	export let config = {};

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
		<div contenteditable="true" bind:this={contentEditable} class="contenteditable" />
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
		@apply mx-auto min-h-[10rem] w-full whitespace-pre-wrap break-words p-5 focus:outline-none;
	}
</style>
