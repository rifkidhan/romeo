<script lang="ts">
	import { enhance } from '$app/forms';
	import { Button, Input } from '$lib/components/ui';
</script>

<div class="flex flex-col items-center justify-center gap-5">
	<h1>Sign In</h1>
	<form method="post" use:enhance class="flex flex-col gap-5">
		<Input name="username" label="Username" />
		<Input name="password" type="password" label="password" />
		<Button type="submit">Sign in</Button>
	</form>
	<div>
		Don't have an account? <a href="/signup" class="text-red">Sign up now!</a>
	</div>
</div>
