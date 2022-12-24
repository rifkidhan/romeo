import type { LexicalEditor, EditorThemeClasses, Klass, LexicalNode, EditorState } from 'lexical';
import type { LinkAttributes } from '@lexical/link';

export type ChangeHandler = (url: string | null, prevUrl: string | null) => void;

export type LinkMatcherResult = {
	attributes?: LinkAttributes;
	index: number;
	length: number;
	text: string;
	url: string;
};

export type LinkMatcher = (text: string) => LinkMatcherResult | null;

export type ValidateUrl = (url: string) => boolean;

export type EditorConfig = Readonly<{
	namespace: string;
	nodes?: ReadonlyArray<
		| Klass<LexicalNode>
		| {
				replace: Klass<LexicalNode>;
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				with: <T extends { new (...args: any): any }>(node: InstanceType<T>) => LexicalNode;
		  }
	>;
	onError?: (error: Error) => void;
	parentEditor?: LexicalEditor | undefined;
	editable?: boolean | undefined;
	theme?: EditorThemeClasses | undefined;
	editorState?: EditorState;
}>;
