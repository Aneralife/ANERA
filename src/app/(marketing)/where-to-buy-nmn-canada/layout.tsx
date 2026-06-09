import type { Metadata } from "next";
import { defaultSocialImage } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Where to Buy NMN Supplements in Canada? | Top 5 Brands",
  description:
    "Looking to buy NMN in Canada? Discover the safest places to buy NMN, the top trusted brands, Canada's legal status, and how to choose 99% pure, lab-tested supplements.",
  keywords: [
    "buy NMN supplements in Canada",
    "where to buy NMN Canada",
    "best NMN Canada 2026",
    "NMN online Canada",
    "NMN supplements Canada",
    "Anera Life NMN Canada",
  ],
  openGraph: {
    title: "Where to Buy NMN Supplements in Canada? | Top 5 Brands | Anera Life",
    description:
      "Looking to buy NMN in Canada? Discover the safest places to buy NMN, the top trusted brands, Canada's legal status, and how to choose 99% pure, lab-tested supplements.",
    url: "https://aneralife.com/where-to-buy-nmn-canada",
    type: "article",
    images: [defaultSocialImage],
  },
  alternates: {
    canonical: "https://aneralife.com/where-to-buy-nmn-canada",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
