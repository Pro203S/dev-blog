import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
	loader: glob({ base: './posts', pattern: '**/*.{md,mdx}' }),
	schema: ({ image }) =>
		z.object({
			"title": z.string(),
			"description": z.string(),
			"publishDate": z.date(),
			"image": z.optional(image()),
		}),
});

export const collections = { blog };
