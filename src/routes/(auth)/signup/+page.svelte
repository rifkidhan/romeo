<script lang="ts">
	import type { ActionData } from './$types';
	import { enhance } from '$app/forms';
	import { Button, Input, Field, Note, Progress } from '$lib/components/ui';
	import passwordValidation from '$lib/utils/passwordValidation';
	export let form: ActionData;

	let email = form?.email ?? '';
	let username = form?.username ?? '';
	let password = form?.password ?? '';
	let retypePassword = form?.retypePassword ?? '';
	let showPassword = false;

	$: validation = passwordValidation(password);
</script>

<div class="flex flex-col items-center justify-center gap-5">
	<h1>Create an account</h1>
	<form method="post" use:enhance>
		<Field label="Email" htmlFor="email">
			<Input type="email" name="email" placeholder="input your email" bind:value={email} required />
			{#if form?.duplicatedEmail}
				<Note type="error">Email already used</Note>
			{/if}
		</Field>

		<Field label="Username" htmlFor="username">
			<Input
				type="text"
				name="username"
				required
				placeholder="input your username"
				bind:value={username}
			/>
			{#if form?.duplicatedUsername}
				<Note type="error">Username already used</Note>
			{/if}
		</Field>
		<Field htmlFor="password" label="Password">
			<span class="inline-flex gap-1">
				<Input
					name="password"
					type={showPassword ? 'text' : 'password'}
					bind:value={password}
					placeholder="input password"
					required
				/>
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
		<Field htmlFor="password" label="Confirm Password">
			<span class="inline-flex gap-1">
				<Input
					name="retype-password"
					type={showPassword ? 'text' : 'password'}
					bind:value={retypePassword}
					placeholder="retype password"
					required
				/>
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
		{#if password}
			<Progress
				value={validation.progress}
				max={5}
				custom
				--progress-color="rgb(var({validation.progressColor}))"
			/>
		{/if}

		{#if form?.invalidPassword}
			<Note type="error">Password not same with Confirm Password</Note>
		{/if}
		<Button type="submit" disabled={!email || !username || !password}>Sign Up</Button>
	</form>
	<div>
		Have an account? <a href="/signin" class="text-red">Sign in now!</a>
	</div>
</div>

<style lang="postcss">
	form {
		@apply container mx-auto flex w-full flex-col gap-5 md:w-1/2;
	}
</style>
