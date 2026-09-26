/** Keep in sync with `siteUrl` in src/lib/seo.ts */
const SITE_URL = "https://www.aneralife.com";

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.shopify.com",
      },
      {
        protocol: "https",
        hostname: "aneralife.com",
      },
      {
        protocol: "https",
        hostname: "www.aneralife.com",
      },
    ],
  },
  async redirects() {
    const legacy = [
      // Singular /product/ URLs still indexed; both 404 on www.
      ["/product/nmn-15000", "/products/nad-booster-nmn-15000"],
      ["/product/nmn-24000", "/products/nmn-trans-resveratrol-24000"],
      // Short product slugs render the product not-found state.
      ["/products/nmn-15000", "/products/nad-booster-nmn-15000"],
      ["/products/nmn-24000", "/products/nmn-trans-resveratrol-24000"],
      // Shopify handles that duplicate the marketed PDPs (see SHOPIFY_HANDLE).
      ["/products/nmn-tr-24000", "/products/nad-booster-nmn-15000"],
      [
        "/products/nmn-trans-resveratrol-24000-dual-cellular-support",
        "/products/nmn-trans-resveratrol-24000",
      ],
      // Former article slugs that 404; current pages exist.
      ["/where-to-buy-nmn-supplement-in-canada", "/where-to-buy-nmn-canada"],
      [
        "/my-personal-journey-with-anera-nmn-from-pain-to-purpose",
        "/from-pain-to-purpose-anera-nmn-story",
      ],
      ["/best-nmn-supplements-for-youth", "/buy-best-nmn-supplement-canada"],
      [
        "/how-long-does-nmn-take-to-work",
        "/how-long-does-nmn-take-to-work-day-1-to-6-months",
      ],
      // Removed route; the science page now holds this content.
      ["/pillars", "/science"],
      // Shop footer linked here; no shipping page exists. Returns covers the policy.
      ["/shipping", "/returns"],
    ];

    return [
      {
        source: "/",
        has: [{ type: "host", value: "aneralife.com" }],
        destination: SITE_URL,
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "aneralife.com" }],
        destination: `${SITE_URL}/:path*`,
        permanent: true,
      },
      ...legacy.map(([source, destination]) => ({
        source,
        destination,
        permanent: true,
      })),
    ];
  },
};

export default nextConfig;
