<script lang="ts">
	import type { PageData } from './$types';
	import { Card } from '$lib/components/ui';

	export let data: PageData;
	$: blogs = data.blogs;
</script>

<div>
	<h1>Blogs Page</h1>
	<div class="grid grid-cols-3 gap-5">
		{#each blogs as blog}
			<Card
				href="/blogs/{blog.slug}"
				imageSrc="/api/images/blogs?file={blog.thumbnail}&quality=50"
				imageAlt={blog.title}
			>
				<h4>{blog.title}</h4>
				<p class="line-clamp-4">{blog.description}</p>
			</Card>
		{/each}
		{#each blogs as blog}
			<Card
				href="/blogs/{blog.slug}"
				imageSrc="/api/images/blogs?file={blog.thumbnail}&quality=50"
				imageAlt={blog.title}
			>
				<h4>{blog.title}</h4>
				<p class="line-clamp-4">{blog.description}</p>
			</Card>
		{/each}
		{#each blogs as blog}
			<Card
				href="/blogs/{blog.slug}"
				imageSrc="/api/images/blogs?file={blog.thumbnail}&quality=50"
				imageAlt={blog.title}
			>
				<h4>{blog.title}</h4>
				<p class="line-clamp-4">{blog.description}</p>
			</Card>
		{/each}
		{#each blogs as blog}
			<Card
				href="/blogs/{blog.slug}"
				imageSrc="/api/images/blogs?file={blog.thumbnail}&quality=50"
				imageAlt={blog.title}
			>
				<h4>{blog.title}</h4>
				<p class="line-clamp-4">{blog.description}</p>
			</Card>
		{/each}
	</div>
</div>
