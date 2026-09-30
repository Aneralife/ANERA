import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "How to Choose an NMN Supplement in 2026: 10 Things to Check",
  },
  description:
    "Learn how to choose an NMN supplement with 10 practical checks for dose, purity, testing, COA, GMP, ingredients, packaging, price, and transparency.",
  keywords: ["How to Choose an NMN Supplement"],
  openGraph: {
    title: "How to Choose an NMN Supplement in 2026: 10 Things to Check",
    description:
      "Learn how to choose an NMN supplement with 10 practical checks for dose, purity, testing, COA, GMP, ingredients, packaging, price, and transparency.",
    url: "https://www.aneralife.com/how-to-choose-an-nmn-supplement",
    type: "article",
    images: [
      {
        url: "/articles/how-to-choose-an-nmn-supplement/1.webp",
        width: 1536,
        height: 1024,
        alt: "How to Choose an NMN Supplement",
      },
    ],
  },
  alternates: {
    canonical: "https://www.aneralife.com/how-to-choose-an-nmn-supplement",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
