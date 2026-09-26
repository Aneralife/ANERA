import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "Cheap NMN vs Quality NMN: What’s the Difference?" },
  description:
    "Compare cheap and premium NMN supplements by purity, potency, testing, COAs, GMP manufacturing, formulation and cost per serving before buying in Canada.",
  keywords: ["cheap NMN vs quality NMN"],
  openGraph: {
    title: "Cheap NMN vs Quality NMN: What’s the Difference?",
    description:
      "Compare cheap and premium NMN supplements by purity, potency, testing, COAs, GMP manufacturing, formulation and cost per serving before buying in Canada.",
    url: "https://www.aneralife.com/cheap-nmn-vs-quality-nmn",
    type: "article",
    images: [
      {
        url: "/articles/cheap-nmn-vs-quality-nmn/1.webp",
        width: 1536,
        height: 1024,
        alt: "cheap NMN vs quality NMN",
      },
    ],
  },
  alternates: {
    canonical: "https://www.aneralife.com/cheap-nmn-vs-quality-nmn",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
