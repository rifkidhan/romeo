<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;

	$: blog = data.blog;
</script>

<div>
	<h1>
		{blog.title}
	</h1>
	<article>
		{@html blog.content}
	</article>
</div>

<style lang="postcss">
	article {
		@apply container mx-auto;
	}
</style>
