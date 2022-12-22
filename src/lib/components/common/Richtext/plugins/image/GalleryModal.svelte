<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { Dropzone, Input, Button, Field, Loading } from '$lib/components/ui';
	import type { Galleries } from '$lib/types/objects';

	const dispatch = createEventDispatcher();

	let src: string;
	let title: string;
	let alt: string;

	let mode: 'upload' | 'gallery' | 'image' = 'gallery';

	let loading = false;

	let files: FileList;

	$: filePreview = files ? URL.createObjectURL(files[0]) : null;

	$: file = files ? files[0] : null;

	let listImage: Galleries[];
	const ListAllImage = async () => {
		const res = await fetch('/api/images?list=true', {
			method: 'GET'
		});

		const data = await res.json();
		listImage = data;
	};

	const fileImageUpload = async () => {
		loading = true;
		const data = new FormData();
		data.append('image', file!);

		const res = await fetch('/api/images/blogs', {
			method: 'POST',
			body: data
		});

		if (!res) {
			throw new Error('error');
		}
		src = `/api/images/blogs?file=${file?.name}`;
		loading = false;
		dispatch('payload', {
			src: src,
			title: title,
			alt: alt
		});
		dispatch('uploaded');
	};

	const urlImageUpload = () => {
		dispatch('payload', {
			src: src,
			title: title,
			alt: alt
		});
		dispatch('uploaded');
	};
</script>

<div class="root">
	{#if mode === 'upload'}
		<div>
			<Field htmlFor="lexical-image-upload" label="Upload image">
				<Dropzone name="lexical-image-upload" bind:files {loading}>
					<img
						src={filePreview}
						slot="preview"
						alt="preview upload"
						height="500"
						width="500"
						class="h-auto w-auto"
						sizes="100vw"
					/>
				</Dropzone>
			</Field>

			<Field htmlFor="alt_image_input" label="Alt Image">
				<Input name="alt_image_input" bind:value={alt} disabled={loading} />
			</Field>
			<Field htmlFor="title_image_input" label="Title Image">
				<Input name="title_image_input" bind:value={title} disabled={loading} />
			</Field>
			<Button type="button" disabled={!title || !files || loading} on:click={fileImageUpload}>
				Confirm
			</Button>
		</div>
	{:else if mode === 'gallery'}
		<Button
			type="button"
			on:click={() => {
				mode = 'upload';
			}}
		>
			Upload new Image
		</Button>
		<div class="gallery">
			{#await ListAllImage()}
				<Loading type="spinner" />
			{:then _}
				{#each listImage as images}
					<div
						class="imageWrapper"
						on:click={() => {
							src = `/api/images/blogs?file=${images.name}`;
							mode = 'image';
						}}
						on:keydown
					>
						<img
							loading="lazy"
							src="/api/images/blogs?file={images.name}"
							alt={images.name}
							class="imageItems"
						/>
					</div>
				{/each}
			{/await}
		</div>
	{:else}
		<div class="imageSingle">
			<img loading="lazy" {src} alt={src} class="imageItems" />
		</div>

		<Field htmlFor="alt_image_input" label="Alt Image">
			<Input name="alt_image_input" bind:value={alt} />
		</Field>
		<Field htmlFor="title_image_input" label="Title Image">
			<Input name="title_image_input" bind:value={title} />
		</Field>
		<Button type="button" disabled={!title} on:click={urlImageUpload}>Confirm</Button>
	{/if}
</div>

<style lang="postcss">
	.root {
		@apply flex flex-col gap-3;
	}
	.gallery {
		@apply grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3;
	}
	.imageWrapper {
		@apply h-auto max-h-64 w-full translate-y-0 overflow-hidden rounded-xl border-2 border-secondary transition-all duration-200 ease-in-out;
		&:hover {
			@apply -translate-y-1 shadow-down-2;
		}
	}
	.imageItems {
		@apply h-full w-full object-cover;
	}
	.imageSingle {
		@apply h-auto max-w-xl;
	}
</style>
