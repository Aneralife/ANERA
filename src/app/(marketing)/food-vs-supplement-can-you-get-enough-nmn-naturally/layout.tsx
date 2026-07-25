import type { Metadata } from "next";

const title = "Food vs Supplement: Can You Get Enough NMN Naturally? | Anera Life";
const description =
  "Compare natural NMN sources vs supplements, learn what research says about dietary NMN, and discover how to support healthy NAD+ levels.";
const url =
  "https://www.aneralife.com/food-vs-supplement-can-you-get-enough-nmn-naturally";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  keywords: [
    "NMN foods",
    "natural NMN sources",
    "NMN supplement",
    "NMN vs food",
    "Anera Life",
  ],
  openGraph: {
    title,
    description,
    url,
    type: "article",
    images: [
      {
        url: "/articles/food-vs-supplement-can-you-get-enough-nmn-naturally/1.webp",
        width: 2048,
        height: 1260,
        alt: "Food vs Supplement: Can You Get Enough NMN Naturally?",
      },
    ],
  },
  alternates: {
    canonical: url,
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
