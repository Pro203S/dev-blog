// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig, fontProviders } from 'astro/config';

// https://astro.build/config
export default defineConfig({
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
