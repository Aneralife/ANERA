import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/api/", "/signin", "/signup"],
      },
    ],
    sitemap: "https://aneralife.com/sitemap.xml",
  };
}
