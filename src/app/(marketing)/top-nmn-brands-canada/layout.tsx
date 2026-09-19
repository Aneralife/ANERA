import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "Top 10 NMN Brands in Canada for 2026" },
  description:
    "Discover the top 10 NMN brands in Canada for 2026. See why Anera Life stands out for purity, testing, transparency, and Canadian manufacturing.",
  keywords: ["NMN Brands in Canada"],
  openGraph: {
    title: "Top 10 NMN Brands in Canada for 2026",
    description:
      "Discover the top 10 NMN brands in Canada for 2026. See why Anera Life stands out for purity, testing, transparency, and Canadian manufacturing.",
    url: "https://www.aneralife.com/top-nmn-brands-canada",
    type: "article",
    images: [
      {
        url: "/articles/top-nmn-brands-canada/1.webp",
        width: 1536,
        height: 1024,
        alt: "Top 10 NMN Brands in Canada",
      },
    ],
  },
  alternates: {
    canonical: "https://www.aneralife.com/top-nmn-brands-canada",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
