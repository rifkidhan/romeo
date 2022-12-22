<script lang="ts">
	import { Image } from '$lib/components/ui';
	import type { PageData } from './$types';
	export let data: PageData;

	$: blog = data.blog;
</script>

<div class="root">
	<div class="image">
		<Image
			src="/api/images/blogs?file={blog.thumbnail}"
			alt={blog.title}
			class="h-full w-full object-cover object-center"
		/>
	</div>

	<h1>
		{blog.title}
	</h1>
	<article class="container mx-auto">
		{@html blog.content}
	</article>
</div>

<style lang="postcss">
	.root {
		@apply flex flex-col gap-10;
	}
	.image {
		@apply relative h-screen w-full overflow-hidden;
	}
</style>
