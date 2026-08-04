import { defineConfig } from 'astro/config';
import { readFileSync } from 'node:fs';
import { unified } from '@astrojs/markdown-remark';

const manifest = JSON.parse(readFileSync(new URL('./data/url-manifest.json', import.meta.url), 'utf8'));
const published = new Set(manifest.filter((page) => page.launch_status === 'publish').map((page) => page.slug));

function launchLinksOnly() {
  return (tree) => {
    const walk = (node) => {
      if (node?.type === 'element' && node.tagName === 'a') {
        const href = node.properties?.href;
        if (typeof href === 'string' && href.startsWith('/') && !href.startsWith('//')) {
          const path = href.split('#')[0].split('?')[0];
          if (path && !published.has(path) && !path.includes('.')) {
            const section = `/${path.split('/').filter(Boolean)[0]}/`;
            node.properties.href = published.has(section) ? section : '/';
          }
        }
      }
      if (Array.isArray(node?.children)) node.children.forEach(walk);
    };
    walk(tree);
  };
}

function removeMarkdownH1() {
  return (tree) => {
    const walk = (node) => {
      if (Array.isArray(node?.children)) {
        node.children = node.children.filter((child) => !(child.type === 'element' && child.tagName === 'h1'));
        node.children.forEach(walk);
      }
    };
    walk(tree);
  };
}

export default defineConfig({
  site: 'https://bier-durst.de',
  output: 'static',
  trailingSlash: 'always',
  markdown: {
    processor: unified({
      syntaxHighlight: false,
      rehypePlugins: [launchLinksOnly, removeMarkdownH1]
    })
  },
  build: {
    format: 'directory'
  }
});
