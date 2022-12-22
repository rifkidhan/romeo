<script lang="ts">
	import { Logo, Button, Loading, Dropdown, DropdownItem } from '$lib/components/ui';

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
