import type {
	DOMConversionMap,
	DOMConversionOutput,
	DOMExportOutput,
	EditorConfig,
	LexicalEditor,
	LexicalNode,
	NodeKey,
	SerializedLexicalNode,
	Spread,
	LexicalCommand
} from 'lexical';
import { $applyNodeReplacement, DecoratorNode, createCommand } from 'lexical';
import ImageComponent from './ImageComponent.svelte';

export interface ImagePayload {
	src: string;
	altText: string;
	height?: number;
	key?: NodeKey;
	maxWidth?: number;
	width?: number;
	title?: string;
}

export const INSERT_IMAGE_COMMAND: LexicalCommand<Readonly<ImagePayload>> =
	createCommand('INSERT_IMAGE_COMMAND');

const convertImageElement = (dom: Node): null | DOMConversionOutput => {
	if (dom instanceof HTMLImageElement) {
		const { alt: altText, src, title } = dom;
		const node = $createImageNode({ altText, src, title });

		return { node };
	}
	return null;
};

export type SerializedImageNode = Spread<
	{
		altText: string;
		height?: number;
		maxWidth: number;
		src: string;
		width?: number;
		title?: string;
		type: 'image';
		version: 1;
	},
	SerializedLexicalNode
>;

export class ImageNode extends DecoratorNode<HTMLElement> {
	__src: string;
	__altText: string;
	__width: 'inherit' | number;
	__height: 'inherit' | number;
	__maxWidth: number;
	__title: string | undefined;

	static getType(): string {
		return 'image';
	}

	static clone(node: ImageNode): ImageNode {
		return new ImageNode(
			node.__src,
			node.__altText,
			node.__maxWidth,
			node.__width,
			node.__height,
			node.__key,
			node.__title
		);
	}

	static importJSON(serializedNode: SerializedImageNode): ImageNode {
		const { src, altText, height, width, maxWidth, title } = serializedNode;

		const node = $createImageNode({
			altText,
			src,
			width,
			height,
			title,
			maxWidth
		});

		return node;
	}

	static importDOM(): DOMConversionMap | null {
		return {
			img: (node: Node) => ({
				conversion: convertImageElement,
				priority: 0
			})
		};
	}

	exportDOM(): DOMExportOutput {
		const element = document.createElement('img');
		element.setAttribute('src', this.__src);
		element.setAttribute('alt', this.__altText);
		if (this.__title) {
			element.setAttribute('title', this.__title);
		}

		return { element };
	}

	constructor(
		src: string,
		altText: string,
		maxWidth: number,
		width?: 'inherit' | number,
		height?: 'inherit' | number,
		title?: string,
		key?: NodeKey
	) {
		super(key);
		this.__src = src;
		this.__altText = altText;
		this.__maxWidth = maxWidth;
		this.__width = width || 'inherit';
		this.__height = height || 'inherit';
		this.__title = title;
	}

	exportJSON(): SerializedImageNode {
		return {
			src: this.getSrc(),
			altText: this.getAltText(),
			title: this.__title,
			height: this.__height === 'inherit' ? 0 : this.__height,
			maxWidth: this.__maxWidth,
			width: this.__width === 'inherit' ? 0 : this.__width,
			type: 'image',
			version: 1
		};
	}
	setWidthAndHeight(width: 'inherit' | number, height: 'inherit' | number): void {
		const writable = this.getWritable();
		writable.__height = height;
		writable.__width = width;
	}

	createDOM(config: EditorConfig, editor: LexicalEditor): HTMLElement {
		const span = document.createElement('div');
		const theme = config.theme;
		const className = theme.image;

		if (className !== undefined) {
			span.className = className;
		}

		new ImageComponent({
			target: span,
			props: {
				editor,
				src: this.__src,
				width: this.__width,
				height: this.__height,
				altText: this.__altText,
				nodeKey: this.__key,
				maxWidth: this.__maxWidth,
				title: this.__title
			}
		});

		return span;
	}

	updateDOM(): false {
		return false;
	}

	getSrc(): string {
		return this.__src;
	}

	getAltText(): string {
		return this.__altText;
	}

	decorate(): HTMLElement {
		const img = document.createElement('img');

		return img;
	}
}

export const $createImageNode = ({
	altText,
	height = 500,
	maxWidth = 500,
	title,
	src,
	width = 500,
	key
}: ImagePayload): ImageNode => {
	return $applyNodeReplacement(new ImageNode(src, altText, maxWidth, width, height, title, key));
};

export const $isImageNode = (node: LexicalNode | null | undefined): node is ImageNode => {
	return node instanceof ImageNode;
};
