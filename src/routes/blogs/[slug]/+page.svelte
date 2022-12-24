<script lang="ts">
	import { page } from '$app/stores';
	import { Image } from '$lib/components/ui';
	import type { PageData } from './$types';
	export let data: PageData;

	$: pathname = $page.url.pathname;

	$: blog = data.blog;
	$: console.log(pathname);
</script>

<div class="root">
	<div class="image">
		<Image
			src="/api/images/blogs?file={blog.thumbnail}"
			alt={blog.title}
			class="h-full w-full object-cover object-center"
		/>
	</div>

	<div class="container mx-auto flex flex-col items-center">
		<h1>
			{blog.title}
		</h1>
		<a href="{pathname}/edit">edit</a>
		<article class="prose max-w-none">
			{@html blog.content}
		</article>
	</div>
</div>

<style lang="postcss">
	.root {
		@apply flex flex-col items-center gap-10;
	}
	.image {
		@apply relative h-screen w-full overflow-hidden;
	}
</style>
