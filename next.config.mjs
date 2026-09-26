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
    return [
      {
        source: "/buy-best-nmn-supplement-canada",
        destination: "/best-nmn-supplement-canada",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
