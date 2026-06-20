import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "Best NMN Supplement in Canada (2026) | Buy High-Purity NMN" },
  description:
    "Looking for the best NMN supplement in Canada? Learn how to compare purity, testing, dosage, and value before you buy. Discover why Canadians trust Anera Life NMN.",
  keywords: ["NMN Supplement in Canada"],
  openGraph: {
    title: "Best NMN Supplement in Canada (2026) | Buy High-Purity NMN",
    description:
      "Looking for the best NMN supplement in Canada? Learn how to compare purity, testing, dosage, and value before you buy. Discover why Canadians trust Anera Life NMN.",
    url: "https://www.aneralife.com/buy-best-nmn-supplement-canada",
    type: "article",
    images: [
      {
        url: "/articles/buy-best-nmn-supplement-canada/1.webp",
        width: 2048,
        height: 1260,
        alt: "NMN Supplement in Canada",
      },
    ],
  },
  alternates: {
    canonical: "https://www.aneralife.com/buy-best-nmn-supplement-canada",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
