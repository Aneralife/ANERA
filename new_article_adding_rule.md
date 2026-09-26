# Article Import Guide

When the user asks to add a downloaded article, use the newest relevant `.docx` file in `/home/sang/Downloads` and complete the work end to end.

## Content and Styling

- Preserve the article wording exactly. Do not silently rewrite, correct, shorten, or omit content.
- Exclude the final `SEO Technical Elements` instructions from the visible article. Use them for the slug, metadata, canonical URL, focus keyword, and image alt/title text.
- Preserve Word formatting: heading hierarchy, capitalization, bold, italics, blue underlined internal links, lists, checkmarks, tables, and image positions.
- Use real heading, list, link, and table HTML. Table headers must use bold `<th>` cells and centered text.
- Checkmark lists must not also display bullet marks.
- Convert absolute `aneralife.com` links to internal paths such as `/products`; do not remove or invent styled links.
- Reuse the shared article CSS at `src/app/(marketing)/how-to-choose-the-best-nmn-supplement-the-ultimate-buyers-guide/article.css`.

## Files and Images

- Use the SEO suggested URL as `<slug>`.
- Create `src/app/(marketing)/<slug>/page.tsx` and `layout.tsx`.
- Set article canonical URLs with `www`: `https://www.aneralife.com/<slug>`.
- Extract article images in document order into `public/articles/<slug>/`.
- Convert PNG/JPG images to numbered WebP files (`1.webp`, `2.webp`, etc.) at quality 88, preserving dimensions, aspect ratio, and visual quality.
- Use the first image for Open Graph metadata with its real dimensions.

## Required Page Elements

- Add the article as the first item in `src/app/(marketing)/media/page.tsx`.
- Keep Media article IDs sequential and equal to their array indexes.
- Add the canonical route to `src/app/sitemap.ts`.
- Always include the standard bottom CTA: `Shop All Products`, `Shop NMN + TR 24000`, and `← Back to Anera Life`.

## Verification

- Compare rendered article text with the DOCX and verify links, images, lists, tables, and article order.
- Run `npm run lint` and `npm run build`.
- Do not alter unrelated files or existing user changes.
