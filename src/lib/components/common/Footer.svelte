<script lang="ts">
	import { Button, Logo } from '$lib/components/ui';

	const socialMedia = [
		{
			name: 'Github',
			link: 'https://github.com/rifkidhan',
			icon: 'github'
		},
		{
			name: 'Linkedin',
			link: 'https://linkedin.com/in/rifkidhan',
			icon: 'linkedin'
		},
		{
			name: 'Twitter',
			link: 'https://twitter.com/rifkidhan',
			icon: 'twitter'
		},
		{
			name: 'Facebook',
			link: 'https://facebook.com/rifki303',
			icon: 'facebook'
		}
	];
</script>

<footer class="root">
	<div class="wrapper">
		<div class="items">
			<Logo variant="mark" class="w-7 md:w-10" />
			<div>© 2022, Rifkidhan</div>
		</div>
		<div class="items">
			{#each socialMedia as media}
				<Button
					icons={media.icon}
					variant="circle"
					href={media.link}
					target="_blank"
					rel="noopener noreferrer"
					aria-label={`Rifkidhan's ${media.name}`}
					title={media.name}
				/>
			{/each}
		</div>
	</div>
</footer>

<style lang="postcss">
	.root {
		@apply block border-t-2 border-secondary py-5;
	}
	.wrapper {
		@apply container mx-auto flex flex-col-reverse items-center justify-between gap-5 md:flex-row;
	}
	.items {
		@apply inline-flex flex-row items-center gap-x-2;
	}
</style>
