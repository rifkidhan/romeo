<script lang="ts">
	import { enhance } from '$app/forms';
	import { Button, Input, Field, Note } from '$lib/components/ui';
	import type { ActionData } from './$types';

	export let form: ActionData;

	let username = form?.email ?? '';
	let password = form?.password ?? '';
	let showPassword = false;
</script>

<div class="flex flex-col items-center justify-center gap-5">
	<h1>Sign In</h1>
	<form method="post" use:enhance class="flex flex-col gap-5 w-full">
		<Field htmlFor="username" label="Username">
			<Input name="username" bind:value={username} />
		</Field>
		<Field htmlFor="password" label="Password">
			<span class="inline-flex gap-1">
				<Input name="password" type={showPassword ? 'text' : 'password'} bind:value={password} />
				<Button
					type="button"
					active={true}
					icons={showPassword ? 'eye' : 'eye-off'}
					on:click={() => {
						showPassword = !showPassword;
					}}
				/>
			</span>
		</Field>
		{#if form?.invalidcredential}
			<Note size="sm" type="error">Invalid credential</Note>
		{/if}
		<Button type="submit" disabled={!username || !password}>Sign in</Button>
	</form>
	<div>
		Don't have an account? <a href="/signup" class="text-red">Sign up now!</a>
	</div>
</div>
