<script lang="ts">
	import { Logo, Button, Loading, Dropdown, DropdownItem } from '$lib/components/ui';
	import { signOut, getUser } from '@lucia-auth/sveltekit/client';
	import { invalidateAll } from '$app/navigation';

	const user = getUser();
	const userId = $user?.userId;

	const signOutHandler = async () => {
		await signOut();
		invalidateAll();
	};
	const tests = [
		{ name: 'Rifkidhan', value: 'rifkidhan' },
		{ name: 'Ramadhan', value: 'ramadhan' },
		{ name: 'Rifki', value: 'rifki' }
	];

	let title = 'Contoh pertama';
</script>

<main class="flex flex-col gap-10 ">
	<Logo variant="mark" class="w-36" />
	<Loading type="dots" />
	{#if userId}
		<Button type="button" on:click={signOutHandler}>Sign Out</Button>
	{:else}
		<Button href="/signin">Sign In</Button>
	{/if}

	<Dropdown {title} variant="pink">
		{#each tests as test}
			<DropdownItem
				on:itemClick={() => {
					title = test.name;
				}}
				value={test.value}
			>
				{test.name}
			</DropdownItem>
		{/each}
	</Dropdown>
</main>
