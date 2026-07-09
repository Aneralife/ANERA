import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "NMN Supplement Benefits, Side Effects, and Dosage Guide (2026)" },
  description:
    "Learn the science-backed benefits of NMN, possible side effects, recommended dosage, and how to choose a high-quality NMN supplement for healthy aging.",
  keywords: ["NMN Supplement Benefits"],
  openGraph: {
    title: "NMN Supplement Benefits, Side Effects, and Dosage Guide (2026)",
    description:
      "Learn the science-backed benefits of NMN, possible side effects, recommended dosage, and how to choose a high-quality NMN supplement for healthy aging.",
    url: "https://www.aneralife.com/nmn-supplement-benefits-side-effects-dosage-guide",
    type: "article",
    images: [
      {
        url: "/articles/nmn-supplement-benefits-side-effects-dosage-guide/1.webp",
        width: 2048,
        height: 1260,
        alt: "NMN Supplement Benefits",
      },
    ],
  },
  alternates: {
    canonical: "https://www.aneralife.com/nmn-supplement-benefits-side-effects-dosage-guide",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
