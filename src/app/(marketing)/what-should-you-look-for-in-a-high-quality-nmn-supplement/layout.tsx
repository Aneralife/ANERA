import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "What Should You Look for in a High-Quality NMN Supplement?" },
  description:
    "Learn how to choose a high-quality NMN supplement. Discover 10 expert buying tips, red flags to avoid, and what really matters before you buy.",
  keywords: ["High-Quality NMN Supplement"],
  openGraph: {
    title: "What Should You Look for in a High-Quality NMN Supplement?",
    description:
      "Learn how to choose a high-quality NMN supplement. Discover 10 expert buying tips, red flags to avoid, and what really matters before you buy.",
    url: "https://www.aneralife.com/what-should-you-look-for-in-a-high-quality-nmn-supplement",
    type: "article",
    images: [
      {
        url: "/articles/what-should-you-look-for-in-a-high-quality-nmn-supplement/1.webp",
        width: 1536,
        height: 1024,
        alt: "High-Quality NMN Supplement",
      },
    ],
  },
  alternates: {
    canonical: "https://www.aneralife.com/what-should-you-look-for-in-a-high-quality-nmn-supplement",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
