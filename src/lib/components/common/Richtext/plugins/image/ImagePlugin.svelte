<script lang="ts">
	import type { LexicalEditor } from 'lexical';
	import { onMount, getContext } from 'svelte';
	import {
		INSERT_IMAGE_COMMAND,
		$createImageNode as createImageNode,
		ImageNode as NodeImage
	} from '../../nodes/ImageNode';
	import { $insertNodes as insertNodes, COMMAND_PRIORITY_EDITOR } from 'lexical';
	import { mergeRegister } from '@lexical/utils';
	import { Modal, Button, Input, Field } from '$lib/components/ui';
	import { activeModal } from '$lib/stores/ui';
	import GalleryModal from './GalleryModal.svelte';

	const editor = getContext<LexicalEditor>('editor');

	let mode: 'file' | 'url' | undefined = undefined;
	let srcImage: string;
	let altImage: string;
	let titleImage: string;

	const urlImageUpload = () => {
		editor.dispatchCommand(INSERT_IMAGE_COMMAND, {
			altText: altImage,
			src: srcImage,
			title: titleImage
		});
		$activeModal = null;
	};

	onMount(() => {
		if (!editor.hasNodes([NodeImage])) {
			throw new Error('ImagesPlugin: ImageNode not registered on editor');
		}

		return mergeRegister(
			editor.registerCommand(
				INSERT_IMAGE_COMMAND,
				(payload) => {
					const imageNode = createImageNode({
						src: payload.src,
						altText: payload.altText,
						title: payload.title
					});
					insertNodes([imageNode]);
					return true;
				},
				COMMAND_PRIORITY_EDITOR
			)
		);
	});
</script>

{#if $activeModal === 'image-plugin-lexical'}
	<Modal
		title="Insert Image"
		on:closed={() => {
			mode = undefined;
		}}
	>
		{#if !mode}
			<Button
				type="button"
				on:click={() => {
					mode = 'file';
				}}>File</Button
			>
			<Button
				type="button"
				on:click={() => {
					mode = 'url';
				}}>URL</Button
			>
		{/if}

		{#if mode === 'file'}
			<GalleryModal
				on:payload={(e) => {
					srcImage = e.detail.src;
					altImage = e.detail.alt;
					titleImage = e.detail.title;
				}}
				on:uploaded={urlImageUpload}
			/>
		{/if}

		{#if mode === 'url'}
			<div class="url">
				<Field htmlFor="url_image_input" label="URL">
					<Input name="url_image_input" bind:value={srcImage} />
				</Field>
				<Field htmlFor="alt_image_input" label="Alt Image">
					<Input name="alt_image_input" bind:value={altImage} />
				</Field>
				<Field htmlFor="title_image_input" label="Title Image">
					<Input name="title_image_input" bind:value={titleImage} />
				</Field>
				<Button type="button" disabled={!altImage || !srcImage} on:click={urlImageUpload}>
					Confirm
				</Button>
			</div>
		{/if}
	</Modal>
{/if}

<style lang="postcss">
	.url {
		@apply flex flex-col gap-3;
	}
</style>
