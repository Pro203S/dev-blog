import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
	loader: glob({ base: './posts', pattern: '**/*.{md,mdx}' }),
	schema: () =>
		z.object({
			"id": z.string(),
			"title": z.string(),
			"description": z.string(),
			"publishDate": z.date()
		}),
});

export const collections = { blog };
