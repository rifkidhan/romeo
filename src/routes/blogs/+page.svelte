<script lang="ts">
	import type { PageData } from './$types';
	import { Card, Button, Input } from '$lib/components/ui';
	import { getUser } from '@lucia-auth/sveltekit/client';

	const user = getUser();

	export let data: PageData;
	$: blogs = data.blogs;
</script>

<main class="fit flex flex-col gap-10 items-center justify-center my-10">
	<h1>Blogs Page</h1>
	<div class="container mx-auto">
		<div class="flex items-center">
			{#if $user}
				<Button href="/blogs/create" variant="color" class="bg-blue">Create Post</Button>
			{/if}
		</div>
		{#if blogs.length != 0}
			<div class="grid md:grid-cols-2 grid-cols-1 lg:grid-cols-3 gap-5 ">
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
		{:else}
			<div class="flex items-center flex-col justify-center">
				<img src="/not-found.svg" alt="No one post" />
				<h2 class="text-center">No one blog has been posted</h2>
			</div>
		{/if}
	</div>
</main>
