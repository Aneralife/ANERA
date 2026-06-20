import type { Metadata } from "next";
import { defaultSocialImage } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Top 10 NMN Brands in Canada for 2026",
  description:
    "Discover the Top 10 NMN Brands in Canada for 2026. Learn why Anera Life is ranked #1 for purity, safety, and long-term NAD⁺ support backed by real testing.",
  keywords: [
    "NMN brands in Canada",
    "best NMN Canada 2026",
    "Anera Life NMN",
    "NMN supplements Canada",
    "top NMN brand Canada",
  ],
  openGraph: {
    title: "Top 10 NMN Brands in Canada for 2026 | Anera Life",
    description:
      "Discover the Top 10 NMN Brands in Canada for 2026. Learn why Anera Life is ranked #1 for purity, safety, and long-term NAD⁺ support backed by real testing.",
    url: "https://www.aneralife.com/top-nmn-brands-canada",
    type: "article",
    images: [defaultSocialImage],
  },
  alternates: {
    canonical: "https://www.aneralife.com/top-nmn-brands-canada",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
