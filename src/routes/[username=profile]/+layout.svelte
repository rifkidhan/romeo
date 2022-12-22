<script lang="ts">
	import { onMount, beforeUpdate } from 'svelte';
	import type { LayoutData } from './$types';
	import { page } from '$app/stores';
	import { Segment } from '$lib/components/common';
	import type { SegmentProps } from '$lib/types/component';

	export let data: LayoutData;
	$: userData = data.user;
	$: profileData = data.profile;

	$: baseUrl = `/@${userData.username}`;
	$: pathname = $page.url.pathname;

	$: updateSegment = (): SegmentProps[] => {
		const segment = [
			{ id: 'profile', title: 'Profile', url: baseUrl, active: baseUrl === pathname },
			{
				id: 'settings',
				title: 'Setting',
				url: baseUrl + '/settings',
				active: baseUrl + '/settings' === pathname
			},
			{
				id: 'myblog',
				title: 'My Blog',
				url: baseUrl + '/my-blog',
				active: baseUrl + '/my-blog' === pathname
			}
		];

		return segment;
	};

	$: segmentList = updateSegment();
</script>

<div class="main">
	<div class="flex container mx-auto flex-row items-center gap-5">
		<div class="rounded-full border-2 border-secondary overflow-hidden w-36 h-36">
			<img
				loading="lazy"
				src={profileData.photo_url ?? '/avatar-1.png'}
				alt="{profileData.username} Profile"
				class="w-full max-h-full"
			/>
		</div>
		<div>
			<h1>
				Hello {userData.username}!
			</h1>
			<h4>
				{userData.email}
			</h4>
		</div>
	</div>
	<Segment list={segmentList} />
	<div
		class="border-4 container mx-auto shadow-down-3 border-secondary w-full rounded-2xl min-h-screen"
	>
		<slot />
	</div>
</div>

<style lang="postcss">
	.main {
		@apply my-10 flex flex-col gap-10;
	}
</style>
