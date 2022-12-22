<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { onMount, onDestroy } from 'svelte';
	import {
		disableBodyScroll,
		clearAllBodyScrollLocks,
		enableBodyScroll
	} from '$lib/utils/scroll-lock';
	import { page } from '$app/stores';
	import { MenuButton, Darkmode } from '$lib/components/common';
	import { Logo, Button } from '$lib/components/ui';
	import { displayNavbar } from '$lib/stores/ui';
	import type { TransitionConfig } from 'svelte/transition';
	import { cubicInOut } from 'svelte/easing';
	import { getUser, signOut } from '@lucia-auth/sveltekit/client';

	$: pathname = $page.url.pathname;

	let navbar: HTMLElement;
	let insideNav: HTMLElement;

	const user = getUser();

	const menuItem = [
		{
			name: 'Home',
			link: '/'
		},
		{
			name: 'Portfolio',
			link: '/portfolio'
		},
		{
			name: 'Blogs',
			link: '/blogs'
		},
		{
			name: 'About',
			link: '/about'
		}
	];

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

	const closeNavbar = () => {
		displayNavbar.set(false);
	};

	onMount(() => {
		enableBodyScroll(insideNav);
		disableBodyScroll(navbar, { reserveScrollBarGap: true });
	});

	onDestroy(() => {
		clearAllBodyScrollLocks();
	});

	const appearance = (node: Element): TransitionConfig => {
		const style = getComputedStyle(node);
		const clipPath = style.clipPath === 'none' ? '' : style.clipPath;
		return {
			easing: cubicInOut,
			css: (t) => `
			clip-path: ${clipPath} polygon(0 0, 0 ${(0 + t) * 100}%, 50% ${(0 + t) * 100}%, 50% ${
				(1 - t) * 100
			}%, 100% ${(1 - t) * 100}%, 100% 100%, 50% 100%, 50% 0)
			`
		};
	};
</script>

<nav transition:appearance bind:this={navbar}>
	<div class="wrapper" bind:this={insideNav}>
		<div class="topNav">
			<div class="leftTop">
				<Logo variant="mark" class="w-12 md:w-14" />
				<Logo variant="types" class="hidden h-8 fill-primary md:inline-block" />
			</div>
			<div class="rightTop">
				<Darkmode class="!border-primary hover:!shadow-secondary-1" />
				<MenuButton class="!border-primary hover:!shadow-secondary-1" />
			</div>
		</div>
		<div class="separatorItem" />
		<div class="menuItem">
			{#each menuItem as item}
				<a
					href={item.link}
					on:click={closeNavbar}
					class={`h1 ${pathname === item.link && 'text-red'}`}
				>
					{item.name}
				</a>
			{/each}
		</div>
		<div
			class="w-full relative mx-auto max-w-2xl inline-flex flex-col md:flex-row container gap-3 items-center justify-center"
		>
			{#if $user}
				<Button
					variant="secondary"
					class="w-full !border-primary hover:!shadow-secondary-1"
					href="/@{$user.username}"
					on:click={closeNavbar}>Profile</Button
				>
				<Button
					type="button"
					variant="color"
					class="bg-red w-full !border-primary hover:!shadow-secondary-1"
					on:click={async () => {
						closeNavbar();
						await signOut();
						invalidateAll();
					}}
				>
					Sign Out
				</Button>
			{:else}
				<Button
					variant="secondary"
					href="/signin"
					class="w-full !border-primary hover:!shadow-secondary-1"
					on:click={closeNavbar}>Sign In</Button
				>
			{/if}
		</div>
		<div class="bottom">
			<div class="items">© 2022, Rifkidhan</div>
			<div class="items">
				{#each socialMedia as items}
					<Button
						Component="a"
						icons={items.icon}
						variant="circle"
						href={items.link}
						target="_blank"
						class="!border-primary hover:!shadow-secondary-1"
						rel="noopener noreferrer"
						aria-label={`Rifkidhan's ${items.name}`}
						title={items.name}
					/>
				{/each}
			</div>
		</div>
	</div>
</nav>

<style lang="postcss">
	nav {
		@apply fixed inset-0 z-[100] box-border h-full w-full overflow-y-auto bg-secondary text-secondary;
	}
	.wrapper {
		@apply relative flex flex-col;
	}
	.topNav {
		@apply container mx-auto inline-flex flex-row justify-between py-1 md:py-3;
	}
	.leftTop {
		@apply inline-flex flex-row items-center md:gap-x-3;
	}
	.logo {
		@apply w-12 md:w-14;
	}
	.logotype {
		@apply hidden h-8 fill-primary md:inline-block;
	}
	.rightTop {
		@apply inline-flex flex-row items-center justify-center gap-2 md:gap-5;
	}
	.menuItem {
		@apply container mx-auto inline-flex flex-col items-center gap-10 py-5 transition-all duration-300 ease-in-out;
	}
	.separatorItem {
		@apply relative border-b-2 border-primary;
	}
	.bottom {
		@apply container mx-auto flex flex-col-reverse items-center justify-between gap-5 py-1 md:flex-row md:py-3;
	}
	.items {
		@apply inline-flex flex-row items-center gap-x-2;
	}
</style>
