/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import type { EditorThemeClasses } from 'lexical';

import './PlaygroundEditorThemes.css';

const theme: EditorThemeClasses = {
	blockCursor: 'PlaygroundEditorTheme__blockCursor',
	characterLimit: 'PlaygroundEditorTheme__characterLimit',
	code: 'PlaygroundEditorTheme__code',
	codeHighlight: {
		atrule: 'PlaygroundEditorTheme__tokenAttr',
		attr: 'PlaygroundEditorTheme__tokenAttr',
		boolean: 'PlaygroundEditorTheme__tokenProperty',
		builtin: 'PlaygroundEditorTheme__tokenSelector',
		cdata: 'PlaygroundEditorTheme__tokenComment',
		char: 'PlaygroundEditorTheme__tokenSelector',
		class: 'PlaygroundEditorTheme__tokenFunction',
		'class-name': 'PlaygroundEditorTheme__tokenFunction',
		comment: 'PlaygroundEditorTheme__tokenComment',
		constant: 'PlaygroundEditorTheme__tokenProperty',
		deleted: 'PlaygroundEditorTheme__tokenProperty',
		doctype: 'PlaygroundEditorTheme__tokenComment',
		entity: 'PlaygroundEditorTheme__tokenOperator',
		function: 'PlaygroundEditorTheme__tokenFunction',
		important: 'PlaygroundEditorTheme__tokenVariable',
		inserted: 'PlaygroundEditorTheme__tokenSelector',
		keyword: 'PlaygroundEditorTheme__tokenAttr',
		namespace: 'PlaygroundEditorTheme__tokenVariable',
		number: 'PlaygroundEditorTheme__tokenProperty',
		operator: 'PlaygroundEditorTheme__tokenOperator',
		prolog: 'PlaygroundEditorTheme__tokenComment',
		property: 'PlaygroundEditorTheme__tokenProperty',
		punctuation: 'PlaygroundEditorTheme__tokenPunctuation',
		regex: 'PlaygroundEditorTheme__tokenVariable',
		selector: 'PlaygroundEditorTheme__tokenSelector',
		string: 'PlaygroundEditorTheme__tokenSelector',
		symbol: 'PlaygroundEditorTheme__tokenProperty',
		tag: 'PlaygroundEditorTheme__tokenProperty',
		url: 'PlaygroundEditorTheme__tokenOperator',
		variable: 'PlaygroundEditorTheme__tokenVariable'
	},
	embedBlock: {
		base: 'PlaygroundEditorTheme__embedBlock',
		focus: 'PlaygroundEditorTheme__embedBlockFocus'
	},
	hashtag: 'PlaygroundEditorTheme__hashtag',
	heading: {
		h1: 'h1',
		h2: 'h2',
		h3: 'h3',
		h4: 'h4',
		h5: 'h5',
		h6: 'h6'
	},
	image: 'editor-image',
	link: 'PlaygroundEditorTheme__link',
	list: {
		listitem: 'PlaygroundEditorTheme__listItem',
		listitemChecked: 'PlaygroundEditorTheme__listItemChecked',
		listitemUnchecked: 'PlaygroundEditorTheme__listItemUnchecked',
		nested: {
			listitem: 'PlaygroundEditorTheme__nestedListItem'
		},
		olDepth: [
			'list-inside list-decimal',
			'PlaygroundEditorTheme__ol2',
			'PlaygroundEditorTheme__ol3',
			'PlaygroundEditorTheme__ol4',
			'PlaygroundEditorTheme__ol5'
		],
		ul: 'list-disc list-inside'
	},
	ltr: 'PlaygroundEditorTheme__ltr',
	mark: 'PlaygroundEditorTheme__mark',
	markOverlap: 'PlaygroundEditorTheme__markOverlap',
	paragraph: 'PlaygroundEditorTheme__paragraph',
	quote: 'PlaygroundEditorTheme__quote',
	rtl: 'PlaygroundEditorTheme__rtl',
	table: 'PlaygroundEditorTheme__table',
	tableAddColumns: 'PlaygroundEditorTheme__tableAddColumns',
	tableAddRows: 'PlaygroundEditorTheme__tableAddRows',
	tableCell: 'PlaygroundEditorTheme__tableCell',
	tableCellActionButton: 'PlaygroundEditorTheme__tableCellActionButton',
	tableCellActionButtonContainer: 'PlaygroundEditorTheme__tableCellActionButtonContainer',
	tableCellEditing: 'PlaygroundEditorTheme__tableCellEditing',
	tableCellHeader: 'PlaygroundEditorTheme__tableCellHeader',
	tableCellPrimarySelected: 'PlaygroundEditorTheme__tableCellPrimarySelected',
	tableCellResizer: 'PlaygroundEditorTheme__tableCellResizer',
	tableCellSelected: 'PlaygroundEditorTheme__tableCellSelected',
	tableCellSortedIndicator: 'PlaygroundEditorTheme__tableCellSortedIndicator',
	tableResizeRuler: 'PlaygroundEditorTheme__tableCellResizeRuler',
	tableSelected: 'PlaygroundEditorTheme__tableSelected',
	text: {
		bold: 'font-bold',
		code: 'PlaygroundEditorTheme__textCode',
		italic: 'italic',
		strikethrough: 'line-through decoration-2',
		subscript: 'PlaygroundEditorTheme__textSubscript',
		superscript: 'PlaygroundEditorTheme__textSuperscript',
		underline: 'underline decoration-2',
		underlineStrikethrough: 'underline line-through'
	}
};

export default theme;
