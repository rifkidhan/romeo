<script lang="ts">
	import { Button } from '$lib/components/ui';
	import { signOut, getUser } from '@lucia-auth/sveltekit/client';

	import { invalidateAll } from '$app/navigation';

	const user = getUser();

	const signOutHandler = async () => {
		await signOut();
		invalidateAll();
	};
</script>

<h1>
	Hello {$user?.username}
</h1>
<Button on:click={signOutHandler}>Sign Out</Button>
