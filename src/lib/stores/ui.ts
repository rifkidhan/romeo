import { writable } from 'svelte/store';

export const displayNavbar = writable<boolean>(false);

export const displayModal = writable<boolean>(false);

export const activeModal = writable<string>('');
