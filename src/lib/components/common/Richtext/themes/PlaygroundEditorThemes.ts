/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import type { EditorThemeClasses } from 'lexical';

const theme: EditorThemeClasses = {
	blockCursor: 'lexical__blockCursor',
	characterLimit: 'lexical__characterLimit',
	code: 'lexical__code',
	codeHighlight: {
		atrule: 'lexical__tokenAttr',
		attr: 'lexical__tokenAttr',
		boolean: 'lexical__tokenProperty',
		builtin: 'lexical__tokenSelector',
		cdata: 'lexical__tokenComment',
		char: 'lexical__tokenSelector',
		class: 'lexical__tokenFunction',
		'class-name': 'lexical__tokenFunction',
		comment: 'lexical__tokenComment',
		constant: 'lexical__tokenProperty',
		deleted: 'lexical__tokenProperty',
		doctype: 'lexical__tokenComment',
		entity: 'lexical__tokenOperator',
		function: 'lexical__tokenFunction',
		important: 'lexical__tokenVariable',
		inserted: 'lexical__tokenSelector',
		keyword: 'lexical__tokenAttr',
		namespace: 'lexical__tokenVariable',
		number: 'lexical__tokenProperty',
		operator: 'lexical__tokenOperator',
		prolog: 'lexical__tokenComment',
		property: 'lexical__tokenProperty',
		punctuation: 'lexical__tokenPunctuation',
		regex: 'lexical__tokenVariable',
		selector: 'lexical__tokenSelector',
		string: 'lexical__tokenSelector',
		symbol: 'lexical__tokenProperty',
		tag: 'lexical__tokenProperty',
		url: 'lexical__tokenOperator',
		variable: 'lexical__tokenVariable'
	},
	embedBlock: {
		base: 'lexical__embedBlock',
		focus: 'lexical__embedBlockFocus'
	},
	hashtag: 'lexical__hashtag',
	heading: {
		h1: 'h1',
		h2: 'h2',
		h3: 'h3',
		h4: 'h4',
		h5: 'h5',
		h6: 'h6'
	},
	image: 'editor-image',
	link: 'lexical__link',
	list: {
		listitem: 'lexical__listItem',
		listitemChecked: 'lexical__listItemChecked',
		listitemUnchecked: 'lexical__listItemUnchecked',
		nested: {
			listitem: 'lexical__nestedListItem'
		},
		olDepth: [
			'list-inside list-decimal',
			'lexical__ol2',
			'lexical__ol3',
			'lexical__ol4',
			'lexical__ol5'
		],
		ul: 'list-disc list-inside'
	},
	ltr: 'lexical__ltr',
	mark: 'lexical__mark',
	markOverlap: 'lexical__markOverlap',
	paragraph: 'lexical__paragraph',
	quote: 'lexical__quote',
	rtl: 'lexical__rtl',
	table: 'lexical__table',
	tableAddColumns: 'lexical__tableAddColumns',
	tableAddRows: 'lexical__tableAddRows',
	tableCell: 'lexical__tableCell',
	tableCellActionButton: 'lexical__tableCellActionButton',
	tableCellActionButtonContainer: 'lexical__tableCellActionButtonContainer',
	tableCellEditing: 'lexical__tableCellEditing',
	tableCellHeader: 'lexical__tableCellHeader',
	tableCellPrimarySelected: 'lexical__tableCellPrimarySelected',
	tableCellResizer: 'lexical__tableCellResizer',
	tableCellSelected: 'lexical__tableCellSelected',
	tableCellSortedIndicator: 'lexical__tableCellSortedIndicator',
	tableResizeRuler: 'lexical__tableCellResizeRuler',
	tableSelected: 'lexical__tableSelected',
	text: {
		bold: 'font-bold',
		code: 'lexical__textCode',
		italic: 'italic',
		strikethrough: 'line-through decoration-2',
		subscript: 'lexical__textSubscript',
		superscript: 'lexical__textSuperscript',
		underline: 'underline decoration-2',
		underlineStrikethrough: 'underline line-through'
	}
};

export default theme;
