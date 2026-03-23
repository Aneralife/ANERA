# Anera — Headless Shopify Storefront

A fast, minimal, premium ecommerce storefront built with Next.js 14 App Router, TypeScript, and Tailwind CSS, powered by the Shopify Storefront API.

## Setup

1. Install dependencies:

```bash
npm install
```

2. Copy the environment file and fill in your Shopify credentials:

```bash
cp .env.example .env.local
```

Required environment variables:

| Variable                          | Description                          |
| --------------------------------- | ------------------------------------ |
| `SHOPIFY_STORE_DOMAIN`            | Your `*.myshopify.com` domain        |
| `SHOPIFY_STOREFRONT_ACCESS_TOKEN` | Storefront API access token (public) |

3. Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Architecture

```
src/
├── app/                    # Next.js App Router pages
│   ├── api/cart/           # Cart API route (server-side)
│   ├── cart/               # Cart page
│   ├── collections/        # Collections listing + detail
│   ├── products/           # Products listing + detail
│   └── layout.tsx          # Root layout (Header, Footer, CartProvider)
├── components/
│   ├── cart/               # Cart context + cart contents (client)
│   ├── layout/             # Header, Footer
│   ├── product/            # ProductCard, ProductGrid, ImageGallery, VariantSelector
│   └── ui/                 # Design system (Button, Card, Container, Typography, Skeleton)
└── lib/
    ├── shopify/            # Shopify Storefront API client, queries, types
    └── utils.ts            # formatPrice, cn helper
```

### Key decisions

- **Server Components by default** — only interactive pieces (cart, image gallery, variant selector, mobile menu) are Client Components.
- **All Shopify API calls are server-side** — private tokens never reach the browser.
- **Optimistic cart updates** — uses `useOptimistic` for instant UI feedback.
- **Loading states** — every data-fetching route has a `loading.tsx` skeleton.
- **Error/empty states** — handled gracefully in all pages.
- **8px spacing scale** — consistent via Tailwind's default spacing + custom extensions.
- **Accessibility** — ARIA labels, keyboard navigation, focus-visible rings, semantic HTML.

## Scripts

| Command         | Description          |
| --------------- | -------------------- |
| `npm run dev`   | Start dev server     |
| `npm run build` | Production build     |
| `npm run start` | Start production     |
| `npm run lint`  | Run ESLint           |
