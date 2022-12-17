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
