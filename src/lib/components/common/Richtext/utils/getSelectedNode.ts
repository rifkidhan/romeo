import { $isAtNodeEnd as isAtNodeEnd } from '@lexical/selection';
import type { ElementNode, RangeSelection, TextNode } from 'lexical';

const getSelectedNode = (selection: RangeSelection): TextNode | ElementNode => {
	const anchor = selection.anchor;
	const focus = selection.focus;
	const anchorNode = anchor.getNode();
	const focusNode = focus.getNode();

	if (anchorNode === focusNode) {
		return anchorNode;
	}

	const isBackward = selection.isBackward();

	if (isBackward) {
		return isAtNodeEnd(focus) ? anchorNode : focusNode;
	} else {
		return isAtNodeEnd(anchor) ? focusNode : anchorNode;
	}
};

export default getSelectedNode;
