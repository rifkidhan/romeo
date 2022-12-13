<script lang="ts">
	import themeStore, { setTheme } from '$lib/utils/Darkmode';
	import { Button } from '$lib/components/ui';
	import { draw } from 'svelte/transition';
	import { circInOut } from 'svelte/easing';
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	import { timeline, stagger, spring } from 'motion';

	let className: string | undefined = undefined;

	export { className as class };

	let initial = true;

	const show = (progress: number) => ({
		strokeDashoffset: 1 - progress,
		strokeDasharray: '1px 1px',
		visibility: 'visible'
	});

	const hide = (progress: number) => ({
		strokeDashoffset: progress - 1,
		strokeDasharray: '0px 1px',
		visibility: 'hidden'
	});

	onMount(() => {
		initial = false;
	});

	$: if (browser) {
		if ($themeStore.theme === 'dark') {
			timeline(
				[
					['.darkMode circle', hide(1)],
					['.darkMode line', hide(1), { at: '<', delay: stagger(0.05) }],
					['.darkMode path', show(1), { at: '-0.4' }]
				],
				{ defaultOptions: spring() }
			);
		}

		if ($themeStore.theme === 'light') {
			timeline(
				[
					['.darkMode path', hide(1)],
					['.darkMode circle', show(1)],
					['.darkMode line', show(1), { at: '<', delay: stagger(0.05) }]
				],
				{ defaultOptions: spring() }
			);
		}
	}

	let lightSvg = $themeStore.theme === 'light';
	function themeSwitcher() {
		setTheme($themeStore.theme === 'dark' ? 'light' : 'dark');
	}

	const lightPath = [
		{ id: 1, x1: '12', y1: '5', x2: '12', y2: '3' },
		{ id: 2, x1: '17', y1: '7', x2: '18.4', y2: '5.6' },
		{ id: 3, x1: '19', y1: '12', x2: '21', y2: '12' },
		{ id: 4, x1: '17', y1: '17', x2: '18.4', y2: '18.4' },
		{ id: 5, x1: '12', y1: '19', x2: '12', y2: '21' },
		{ id: 6, x1: '7', y1: '17', x2: '5.6', y2: '18.4' },
		{ id: 7, x1: '6', y1: '12', x2: '4', y2: '12' },
		{ id: 8, x1: '7', y1: '7', x2: '5.6', y2: '5.6' }
	];
</script>

<Button on:click={themeSwitcher} variant="circle" title="Dark mode button" class={className}>
	<svg
		xmlns="http://www.w3.org/2000/svg"
		class="darkMode w-6 stroke-2"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		stroke-linecap="round"
		stroke-linejoin="round"
		aria-hidden="true"
	>
		{#if initial}
			<path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454z" />
		{/if}
		{#if $themeStore.theme === 'dark' && !lightSvg}
			<path
				d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454z"
				transition:draw={{ easing: circInOut, duration: 500 }}
				on:outroend={() => (lightSvg = true)}
			/>
		{:else if $themeStore.theme === 'light' && lightSvg}
			<circle cx="12" cy="12" r="3" transition:draw={{ easing: circInOut, duration: 500 }} />
			{#each lightPath as path (path.id)}
				<line
					x1={path.x1}
					y1={path.y1}
					x2={path.x2}
					y2={path.y2}
					transition:draw={{ easing: circInOut, delay: path.id * 50, speed: 1 }}
					on:outroend={() => path.id === 8 && (lightSvg = false)}
				/>
			{/each}
		{/if}

		<!-- <path
			d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454z"
			pathLength={1}
			style="visibility: hidden;"
		/>
		<circle cx="12" cy="12" r="3" pathLength={1} style="visibility: hidden;" />
		<line x1="12" y1="5" x2="12" y2="3" pathLength={1} style="visibility: hidden;" />
		<line x1="17" y1="7" x2="18.4" y2="5.6" pathLength={1} style="visibility: hidden;" />
		<line x1="19" y1="12" x2="21" y2="12" pathLength={1} style="visibility: hidden;" />
		<line x1="17" y1="17" x2="18.4" y2="18.4" pathLength={1} style="visibility: hidden;" />
		<line x1="12" y1="19" x2="12" y2="21" pathLength={1} style="visibility: hidden;" />
		<line x1="7" y1="17" x2="5.6" y2="18.4" pathLength={1} style="visibility: hidden;" />
		<line x1="6" y1="12" x2="4" y2="12" pathLength={1} style="visibility: hidden;" />
		<line x1="7" y1="7" x2="5.6" y2="5.6" pathLength={1} style="visibility: hidden;" /> -->
	</svg>
</Button>
