import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "Best Time to Take NMN for Maximum Results: Morning or Night?" },
  description:
    "Discover the best time to take NMN and what human research says about taking it in the morning and at night, NAD+ production, food timing, sleep, and building a consistent routine.",
  keywords: ["Best Time to Take NMN"],
  openGraph: {
    title: "Best Time to Take NMN for Maximum Results: Morning or Night?",
    description:
      "Discover the best time to take NMN and what human research says about taking it in the morning and at night, NAD+ production, food timing, sleep, and building a consistent routine.",
    url: "https://www.aneralife.com/best-time-to-take-nmn",
    type: "article",
    images: [
      {
        url: "/articles/best-time-to-take-nmn/1.webp",
        width: 1536,
        height: 1024,
        alt: "Best Time to Take NMN",
      },
    ],
  },
  alternates: {
    canonical: "https://www.aneralife.com/best-time-to-take-nmn",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
