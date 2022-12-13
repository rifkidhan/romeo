import { writable } from 'svelte/store';

export interface ThemeStore {
	themes: string[];
	forcedTheme?: string;
	theme?: string;
	resolvedTheme?: string;
	systemTheme?: 'dark' | 'light';
}
const themeStore = writable<ThemeStore>({
	themes: [],
	forcedTheme: undefined,
	theme: undefined,
	resolvedTheme: undefined,
	systemTheme: undefined
});

export const setTheme = (theme: string): void =>
	themeStore.update((store) => ({ ...store, theme }));

export default themeStore;
