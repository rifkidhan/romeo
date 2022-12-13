import { writable } from 'svelte/store';

interface EditorStateProps {
	bold: boolean;
	italic: boolean;
	underline: boolean;
	strikethrough: boolean;
	blocktype: string;
	link: boolean;
}

export const editorState = writable<EditorStateProps>({
	bold: false,
	italic: false,
	underline: false,
	strikethrough: false,
	blocktype: 'paragraph',
	link: false
});
