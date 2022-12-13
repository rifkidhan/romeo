<script lang="ts">
	import type { ActionData } from './$types';
	import { enhance } from '$app/forms';
	import { Button, Input, Field } from '$lib/components/ui';
	export let form: ActionData;
</script>

<div class="flex flex-col items-center justify-center gap-5">
	<h1>Create an account</h1>
	<form method="post" use:enhance>
		<Field label="Email" htmlFor="email">
			<Input
				type="email"
				name="email"
				placeholder="input your email"
				value={form?.email ?? ''}
				required
			/>
			{#if form?.duplicatedEmail}
				<p class="text-red">Email already used</p>
			{/if}
		</Field>

		<Field label="Username" htmlFor="username">
			<Input
				name="username"
				required
				placeholder="input your username"
				value={form?.username ?? ''}
			/>
			{#if form?.duplicatedUsername}
				<p class="text-red">Username already used</p>
			{/if}
		</Field>

		<Field htmlFor="password" label="Password">
			<Input name="password" type="password" required />
		</Field>

		<Button type="submit">Sign Up</Button>
	</form>
	<div>
		Have an account? <a href="/signin" class="text-red">Sign up now!</a>
	</div>
</div>

<style lang="postcss">
	form {
		@apply container mx-auto flex w-full flex-col gap-5 md:w-1/2;
	}
</style>
