import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "NMN Supplement for Dogs and Cats: How It Can Help Your Pet Live Longer?" },
  description:
    "Can NMN help support healthy aging in pets? Learn the potential benefits, safety considerations, and science behind NMN supplements for dogs and cats.",
  keywords: ["NMN Supplement for Dogs and Cats"],
  openGraph: {
    title: "NMN Supplement for Dogs and Cats: How It Can Help Your Pet Live Longer?",
    description:
      "Can NMN help support healthy aging in pets? Learn the potential benefits, safety considerations, and science behind NMN supplements for dogs and cats.",
    url: "https://www.aneralife.com/nmn-supplement-for-dogs-and-cats",
    type: "article",
    images: [
      {
        url: "/articles/nmn-supplement-for-dogs-and-cats/1.webp",
        width: 1536,
        height: 1024,
        alt: "NMN Supplement for Dogs and Cats",
      },
    ],
  },
  alternates: {
    canonical: "https://www.aneralife.com/nmn-supplement-for-dogs-and-cats",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
