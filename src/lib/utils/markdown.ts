import { marked, type Renderer } from 'marked';
import { refractor } from 'refractor/lib/core';
import { toHtml } from 'hast-util-to-html';
import typescript from 'refractor/lang/typescript';
import javascript from 'refractor/lang/javascript';
import rust from 'refractor/lang/rust';
import shell from 'refractor/lang/shell-session';
import css from 'refractor/lang/css';
import tsx from 'refractor/lang/tsx';
import jsx from 'refractor/lang/jsx';
import json from 'refractor/lang/json';
import markup from 'refractor/lang/markup';
import markdown from 'refractor/lang/markdown';
import bash from 'refractor/lang/bash';

refractor.register(typescript);
refractor.register(javascript);
refractor.register(rust);
refractor.register(shell);
refractor.register(css);
refractor.register(tsx);
refractor.register(jsx);
refractor.register(json);
refractor.register(markup);
refractor.register(markdown);
refractor.register(bash);

refractor.alias({ typescript: 'ts' });
refractor.alias({ javascript: 'js' });
refractor.alias({ markdown: ['md', 'mdx'] });

const customrenderer: Partial<Renderer> = {
	code(code, lang) {
		// code = code.replace(/\n$/, '') + '\n';
		if (lang && refractor.registered(lang)) {
			const prism = refractor.highlight(code, lang);
			return `<pre class="language-${lang}">` + toHtml(prism) + `</pre>\n`;
		}

		return '<pre><code>' + code + '</code></pre>\n';
	},
	image(href, title, text) {
		if (!title) return `<img src=${href} alt="${text}" />\n`;
		return `
        <img src=${href} alt="${text}" title=${title} />\n
        `;
	},
	paragraph(text) {
		if (text.startsWith('<img')) {
			return text + '\n';
		}
		return '<p>' + text + '</p>';
	}
};

const parse = (str: string) => {
	marked.setOptions({
		highlight: (code, lang) => {
			if (refractor.registered(lang)) {
				const prism = refractor.highlight(code, lang);
				return toHtml(prism);
			} else {
				return code;
			}
		}
	});

	marked.use({
		gfm: true,
		renderer: customrenderer
	});

	return marked.parse(str);
};

export default parse;
