import type { Metadata } from "next";

import HomePageClient from "./home-page-client";
import { jsonLdScript, organizationJsonLd, siteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  alternates: {
    canonical: `${siteUrl}/`,
  },
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(organizationJsonLd) }}
      />
      <HomePageClient />
    </>
  );
}
