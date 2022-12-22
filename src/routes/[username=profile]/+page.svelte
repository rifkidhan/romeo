<script lang="ts">
	import type { PageData } from './$types';
	import { Button } from '$lib/components/ui';
	import { signOut, getUser } from '@lucia-auth/sveltekit/client';

	import { invalidateAll } from '$app/navigation';

	// export let data: PageData;
</script>

<h2>Profile Page</h2>
