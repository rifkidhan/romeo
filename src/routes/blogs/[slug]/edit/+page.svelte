<script lang="ts">
	import type { PageData } from './$types';
	import { enhance } from '$app/forms';
	import { Button, Input, Field, TextArea, Toggle, Dropzone } from '$lib/components/ui';
	import { Richtext } from '$lib/components/common';
	import { getUser } from '@lucia-auth/sveltekit/client';
	import slugify from '$lib/utils/slugify';

	export let data: PageData;

	$: blog = data.blog;

	const user = getUser();

	let files: FileList | undefined = undefined;

	$: file = files ? URL.createObjectURL(files[0]) : `/api/images/blogs?file=${blog.thumbnail}`;
	let published: boolean;
	$: authorId = $user?.userId;
	$: content = blog.content ?? '';
	$: title = blog.title ?? '';
	$: description = blog.description ?? '';
	$: updatedAt = new Date().toISOString();
	$: slug = blog.slug ?? slugify(title) ?? '';
	$: metaTitle = blog.meta_title ?? title ?? '';
	$: metaDescription = blog.meta_description ?? description ?? '';

	$: console.log(published);
</script>

<div class="container mx-auto my-10 flex flex-col">
	<form method="POST" use:enhance class="flex flex-col gap-5">
		<input type="hidden" value={authorId} id="authorId" name="authorId" />
		<input type="hidden" value={updatedAt} id="updated_at" name="updated_at" />
		<input type="hidden" value={blog.key} id="key" name="key" />
		<input type="hidden" value={blog.thumbnail} id="thumbnail-name" name="thumbnail-name" />
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
				<Toggle
					name="published"
					bind:checked={published}
					value={`${blog.published ?? published}`}
				/>
			</Field>
		</span>

		<Field label="Thumbnail" htmlFor="thumbnail">
			<Dropzone name="thumbnail" bind:files preview={true}>
				<img
					loading="lazy"
					slot="preview"
					src={file}
					alt={blog.title}
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
				editorState={blog.content}
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
