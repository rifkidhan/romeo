<script lang="ts">
	import { enhance } from '$app/forms';
	import { Button, Input, Field, TextArea, Toggle, Dropzone } from '$lib/components/ui';
	import { Richtext } from '$lib/components/common';

	let files: FileList;
	let checked = false;

	$: file = files ? URL.createObjectURL(files[0]) : null;

	let content: string;
</script>

<div class="container mx-auto my-10 flex flex-col">
	<form method="post" use:enhance class="flex flex-col gap-5">
		<Field label="Title" htmlFor="title">
			<Input type="text" name="title" required />
		</Field>
		<Field label="Description" htmlFor="description">
			<TextArea name="description" required />
		</Field>
		<span class="item-center inline-flex gap-5">
			<Field label="Slug" htmlFor="slug">
				<Input type="text" name="slug" />
			</Field>
			<Field label="Published" htmlFor="published">
				<Toggle name="published" bind:checked value={!checked ? 'false' : 'true'} />
			</Field>
		</span>

		<Field label="Thumbnail" htmlFor="thumbnail">
			<Dropzone name="thumbnail" bind:files>
				<img
					src={file}
					slot="preview"
					alt="preview upload"
					height="500"
					width="500"
					class="h-auto w-auto"
					sizes="100vw"
				/>
			</Dropzone>
		</Field>
		<Field label="Content" htmlFor="content">
			<input type="hidden" id="content" name="content" value={content} required />
			<Richtext
				on:json={(e) => {
					content = e.detail.content;
				}}
			/>
		</Field>
		<Field label="Meta Title" htmlFor="metatitle">
			<Input type="text" name="metatitle" />
		</Field>
		<Field label="Meta Descripion" htmlFor="metadescription">
			<Input type="text" name="metadescription" />
		</Field>
		<Button type="submit">Submit</Button>
	</form>
</div>
