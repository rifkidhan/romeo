<script lang="ts">
	import { Logo } from '$lib/components/ui';
	import { MenuButton, Darkmode } from '$lib/components/common';
	import throttle from '$lib/utils/throttle';

	let visible = true;
	let currScroll = 0;
	let prevScroll = 0;

	const onScroll = throttle(() => {
		visible = (prevScroll > currScroll && prevScroll - currScroll > 20) || currScroll < 100;

		prevScroll = currScroll;
	}, 50);
</script>

<svelte:window bind:scrollY={currScroll} on:scroll={onScroll} />

<header class:isHidden={!visible} class={currScroll > 100 ? 'fixed' : 'sticky'}>
	<div class="wrapper">
		<a href="/" class="home" title="Home Page">
			<Logo variant="mark" class="w-12 md:w-14" />
			<Logo variant="types" class="hidden h-8 fill-secondary md:inline-block" />
		</a>
		<div class="headerItem">
			<Darkmode />
			<MenuButton />
		</div>
	</div>
</header>

<style lang="postcss">
	header {
		@apply top-0 z-[99] w-full border-b-2 border-secondary bg-primary py-1 transition-transform duration-500 ease-in-out md:py-3;
	}
	.isHidden {
		@apply -translate-y-full;
	}
	.wrapper {
		@apply container relative mx-auto flex flex-row items-center justify-between;
	}
	.home {
		@apply inline-flex flex-row items-center md:gap-x-3;
	}
	.headerItem {
		@apply inline-flex flex-row items-center justify-center gap-2 md:gap-5;
	}
</style>
