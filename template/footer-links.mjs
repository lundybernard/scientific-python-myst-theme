import { readFileSync } from 'node:fs';

/** @type {import('myst-common').DirectiveSpec} */
const footerLinksDirective = {
  name: 'footer-links',
  doc: 'Display footer links from a JSON file.',
  options: {
    file: {
      type: String,
      required: true,
      doc: 'Path to the JSON file, relative to the project root.',
    },
  },
  run(data) {
    const footerLinks = JSON.parse(readFileSync(data.options.file, 'utf-8'));
    // Plugin output is final AST: nested `mystDirective` nodes are not
    // re-parsed, so emit `grid-item` nodes directly.
    return Object.entries(footerLinks).map(([text, url]) => ({
      type: 'grid-item',
      children: [
        {
          type: 'link',
          url: url,
          children: [{ type: 'text', value: text }],
        },
      ],
    }));
  },
};

/** @type {import('myst-common').MystPlugin} */
const plugin = {
  name: 'Footer Links',
  directives: [footerLinksDirective],
};

export default plugin;
