import type {
	LexicalCommand,
	LexicalNode,
	SerializedLexicalNode,
	DOMConversionMap,
	DOMConversionOutput,
	DOMExportOutput,
	LexicalEditor
} from 'lexical';
import pkg from 'lexical';
import HorizontalRuleComponent from './HorizontalRuleComponent.svelte';

const { createCommand, DecoratorNode, $applyNodeReplacement } = pkg;

export type SerializedHorizontalRuleNode = SerializedLexicalNode & {
	type: 'horizontalrule';
	version: 1;
};

export const INSERT_HORIZONTAL_RULE_COMMAND: LexicalCommand<void> = createCommand(
	'INSERT_HORIZONTAL_RULE_COMMAND'
);

export const $createHorizontalRuleNode = (): HorizontalRuleNode => {
	return $applyNodeReplacement(new HorizontalRuleNode());
};

const convertHorizontalRuleElement = (): DOMConversionOutput => {
	return { node: $createHorizontalRuleNode() };
};

export class HorizontalRuleNode extends DecoratorNode<HTMLElement> {
	static getType(): string {
		return 'horizontalrule';
	}

	static clone(node: HorizontalRuleNode): HorizontalRuleNode {
		return new HorizontalRuleNode(node.__key);
	}

	static importJSON(): HorizontalRuleNode {
		return $createHorizontalRuleNode();
	}

	static importDOM(): DOMConversionMap | null {
		return {
			hr: () => ({
				conversion: convertHorizontalRuleElement,
				priority: 0
			})
		};
	}

	exportJSON(): SerializedLexicalNode {
		return {
			type: 'horizontalrule',
			version: 1
		};
	}

	exportDOM(): DOMExportOutput {
		return {
			element: document.createElement('hr')
		};
	}

	createDOM(): HTMLElement {
		const hr = document.createElement('hr');

		return hr;
	}

	getTextContent(): '\n' {
		return '\n';
	}

	isInline(): false {
		return false;
	}

	updateDOM(): false {
		return false;
	}

	decorate(editor: LexicalEditor): HTMLElement {
		const hr = document.createElement('hr');
		new HorizontalRuleComponent({ target: hr, props: { editor, key: this.__key } });
		return hr;
	}
}

export const $isHorizontalRuleNode = (
	node: LexicalNode | null | undefined
): node is HorizontalRuleNode => {
	return node instanceof HorizontalRuleNode;
};
