<script lang="ts">
	import { enhance } from '$app/forms';
	import { Button, Input, Field, TextArea, Toggle, Dropzone } from '$lib/components/ui';
	import { Richtext } from '$lib/components/common';
	import { getUser } from '@lucia-auth/sveltekit/client';
	import slugify from '$lib/utils/slugify';

	const user = getUser();

	let files: FileList;
	let checked = false;

	$: file = files ? URL.createObjectURL(files[0]) : null;

	$: authorId = $user?.userId;

	let content: string;
	let title = '';
	let description = '';
	let createAt = new Date().toISOString();
	$: slug = slugify(title) ?? '';
	$: metaTitle = title ?? '';
	$: metaDescription = description ?? '';
</script>

<div class="container mx-auto my-10 flex flex-col">
	<form method="POST" use:enhance class="flex flex-col gap-5">
		<input type="hidden" value={authorId} id="authorId" name="authorId" />
		<input type="hidden" value={createAt} id="created_at" name="created_at" />
		<input type="hidden" value={createAt} id="updated_at" name="updated_at" />
		<Field label="Title" htmlFor="title">
			<Input type="text" name="title" required bind:value={title} />
		</Field>
		<Field label="Description" htmlFor="description">
			<TextArea name="description" required bind:value={description} />
		</Field>
		<span class="item-center inline-flex gap-5">
			<Field label="Slug" htmlFor="slug">
				<Input type="text" name="slug" bind:value={slug} />
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
			<Input type="text" name="metatitle" bind:value={metaTitle} />
		</Field>
		<Field label="Meta Descripion" htmlFor="metadescription">
			<Input type="text" name="metadescription" bind:value={metaDescription} />
		</Field>
		<Button type="submit" disabled={!title || !description || !content}>Submit</Button>
	</form>
</div>
