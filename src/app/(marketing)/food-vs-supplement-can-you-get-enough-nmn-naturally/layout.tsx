import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "Food vs Supplement: Can You Get Enough NMN Naturally?" },
  description:
    "Can food provide enough NMN? Compare natural NMN sources vs supplements, learn what research says, and discover the best way to support healthy NAD+ levels.",
  keywords: ["Food vs Supplement"],
  openGraph: {
    title: "Food vs Supplement: Can You Get Enough NMN Naturally?",
    description:
      "Can food provide enough NMN? Compare natural NMN sources vs supplements, learn what research says, and discover the best way to support healthy NAD+ levels.",
    url: "https://www.aneralife.com/food-vs-supplement-can-you-get-enough-nmn-naturally",
    type: "article",
    images: [
      {
        url: "/articles/food-vs-supplement-can-you-get-enough-nmn-naturally/1.webp",
        width: 1536,
        height: 1024,
        alt: "Food vs Supplement",
      },
    ],
  },
  alternates: {
    canonical: "https://www.aneralife.com/food-vs-supplement-can-you-get-enough-nmn-naturally",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
