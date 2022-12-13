<script lang="ts">
	import { disableAnimation, getTheme, getSystemTheme } from './helpers';
	import themeStore, { setTheme } from './index';
	import ThemeScript from './Themescript.svelte';

	export let forcedTheme: string | undefined = undefined;
	export let disableTransitionOnChange = false;
	export let enableSystem = true;
	export let enableColorSystem = true;
	export let storageKey = 'theme';
	export let themes: string[] = enableSystem ? ['light', 'dark', 'system'] : ['light', 'dark'];
	export let defaultTheme: string = enableSystem ? 'system' : 'light';
	export let attribute: string | 'class' = 'data-theme';
	export let value: { [themeName: string]: string } | undefined = undefined;
	export let colorSchemes = ['light', 'dark'];

	const initialTheme = getTheme(storageKey, defaultTheme);

	const browser = typeof window !== 'undefined';

	themeStore.set({
		theme: initialTheme,
		forcedTheme,
		resolvedTheme: initialTheme === 'system' ? getTheme(storageKey) : initialTheme,
		themes: enableSystem ? [...themes, 'system'] : themes,
		systemTheme: (enableSystem ? getTheme(storageKey) : undefined) as 'light' | 'dark' | undefined
	});

	$: theme = $themeStore.theme;
	$: resolvedTheme = $themeStore.resolvedTheme;

	const attrs = !value ? themes : Object.values(value);

	/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
	const handleMediaQuery = (e?: any) => {
		const systemTheme = getSystemTheme(e);
		$themeStore.resolvedTheme = systemTheme;

		if (theme === 'system' && !forcedTheme) changeTheme(systemTheme, false);
	};

	/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
	const changeTheme = (theme: any, updateStorage = true, updateDOM = true) => {
		let name = value?.[theme] || theme;

		const enable = disableTransitionOnChange && updateDOM ? disableAnimation() : null;

		if (updateStorage && browser) {
			try {
				window.localStorage.setItem(storageKey, theme);
			} catch (e) {
				console.error(e);
			}
		}

		if (theme === 'system' && enableSystem) {
			const resolved = getSystemTheme();
			name = value?.[resolved] || resolved;
		}

		if (updateDOM && browser) {
			const d = document.documentElement;

			if (attribute === 'class') {
				d.classList.remove(...(attrs as string[]));
				d.classList.add(name);
			} else {
				d.setAttribute(attribute, name);
			}
			enable?.();
		}
	};

	/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
	const mediaHandler = (...args: any) => handleMediaQuery(...args);

	const storageHandler = (e: StorageEvent) => {
		if (e.key !== storageKey) return;
		setTheme(e.newValue || defaultTheme);
	};

	/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
	const onWindow = (window: any) => {
		const media = window.matchMedia('(prefer-color-scheme: dark)');

		media.addListener(mediaHandler);
		mediaHandler(media);

		window.addEventListener('storage', storageHandler);

		return {
			destroy() {
				window.removeEventListener('storage', storageHandler);
				media.removeListener(mediaHandler);
			}
		};
	};

	$: if (enableColorSystem && browser) {
		let colorScheme =
			forcedTheme && colorSchemes.includes(forcedTheme)
				? forcedTheme
				: theme && colorSchemes.includes(theme)
				? theme
				: theme === 'system'
				? resolvedTheme || null
				: null;

		document.documentElement.style.setProperty('color-scheme', colorScheme);
	}

	$: {
		if (forcedTheme) {
			changeTheme(theme, true, false);
		} else {
			changeTheme(theme);
		}
	}
</script>

<ThemeScript {forcedTheme} {storageKey} {attribute} {enableSystem} {defaultTheme} {value} {attrs} />

<svelte:window use:onWindow />
