import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "How Much Does an NMN Supplement Cost?" },
  description:
    "Learn how much NMN supplements typically cost and how to compare price, dosage, capsules, purity, testing, formulation, and monthly value before buying.",
  keywords: ["NMN supplement cost"],
  openGraph: {
    title: "How Much Does an NMN Supplement Cost?",
    description:
      "Learn how much NMN supplements typically cost and how to compare price, dosage, capsules, purity, testing, formulation, and monthly value before buying.",
    url: "https://www.aneralife.com/nmn-supplement-cost",
    type: "article",
    images: [
      {
        url: "/articles/nmn-supplement-cost/1.webp",
        width: 1536,
        height: 1024,
        alt: "NMN supplement cost",
      },
    ],
  },
  alternates: {
    canonical: "https://www.aneralife.com/nmn-supplement-cost",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
