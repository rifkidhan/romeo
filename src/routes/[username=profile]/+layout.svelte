<script lang="ts">
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
	<div class="container mx-auto flex flex-row items-center gap-5">
		<div class="h-36 w-36 overflow-hidden rounded-full border-2 border-secondary">
			<img
				loading="lazy"
				src={profileData.photo_url ?? '/avatar-1.png'}
				alt="{profileData.username} Profile"
				class="max-h-full w-full"
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
		class="container mx-auto min-h-screen w-full rounded-2xl border-4 border-secondary shadow-down-3"
	>
		<slot />
	</div>
</div>

<style lang="postcss">
	.main {
		@apply my-10 flex flex-col gap-10;
	}
</style>
