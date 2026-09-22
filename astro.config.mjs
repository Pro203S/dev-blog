// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig, fontProviders } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	// Preserve Astro 6's HTML whitespace handling after upgrading to Astro 7.
	compressHTML: true,
	"integrations": [mdx(), sitemap()],
	"fonts": [{
		"name": "Pretendard",
		"provider": fontProviders.local(),
		"cssVariable": "--pretendard",
		"options": {
			"variants": [{
				"src": ["./public/PretendardVariable.ttf"]
			}]
		}
	}]
});
