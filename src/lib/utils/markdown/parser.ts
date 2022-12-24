import type * as Marked from 'marked';
import { marked } from 'marked';
import Prism from 'prismjs';

import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-markdown';
import 'prismjs/components/prism-c';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-sql';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-rust';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-tsx';
import 'prismjs/components/prism-bash';
import 'prism-svelte';

// const subscript: Marked.marked.TokenizerAndRendererExtension = {
// 	name: 'subscript',
// 	level: 'inline',
// 	start(src) {
// 		return src.match(/^[^~\s]^/)?.index;
// 	},
// 	tokenizer(src, tokens) {
// 		const rules = /^(~)((?:[^~\s]|(?<=\\)\1|(?<=\\) )+?)(?<!\\)\1(?!\1)$/;
// 		const match = rules.exec(src);

// 		if (match) {
// 			const token = {
// 				type: 'subscript',
// 				raw: match[0],
// 				sub: this.lexer.inlineTokens(match[1].trim()),
// 				tokens: []
// 			};

// 			return token;
// 		}
// 	},
// 	renderer(token) {
// 		return `<sub>${this.parser.parseInline(token.sub)}</sub>`;
// 	}
// };
const customrenderer: Partial<Marked.Renderer> = {
	code(code, lang) {
		if (lang) {
			const prism = Prism.highlight(code, Prism.languages[lang], lang);
			return `<pre class="language-${lang}">` + prism + `</pre>\n`;
		}

		return '<pre><code>' + code + '</code></pre>\n';
	},
	image(href, title, text) {
		if (!title) return `<img loading="lazy" src=${href} alt="${text}" />\n`;
		return `
        <img loading="lazy" src=${href} alt="${text}" title="${title}" />\n
        `;
	},
	paragraph(text) {
		if (text.startsWith('<img')) {
			return text + '\n';
		}
		return '<p>' + text + '</p>';
	},
	link(href, title, text) {
		if (title) {
			return `<a href="${href}" title="${title}" target="_blank" rel="noreferrer noopener">${text}</a>`;
		}
		return `<a href="${href}" target="_blank" rel="noreferrer noopener">${text}</a>`;
	}
};

const parse = (str: string) => {
	marked.use({
		gfm: true,
		renderer: customrenderer
	});

	return marked.parse(str);
};

export default parse;
