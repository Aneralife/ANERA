import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "Can You Take NMN at Night? Best Timing for Energy & Sleep" },
  description:
    "Can you take NMN at night? Learn the best time to take NMN for energy, sleep, and longevity based on science, age, and goals.",
  keywords: ["Can You Take NMN at Night"],
  openGraph: {
    title: "Can You Take NMN at Night? Best Timing for Energy & Sleep",
    description:
      "Can you take NMN at night? Learn the best time to take NMN for energy, sleep, and longevity based on science, age, and goals.",
    url: "https://www.aneralife.com/can-you-take-nmn-at-night-best-timing-for-energy-and-sleep",
    type: "article",
    images: [
      {
        url: "/articles/can-you-take-nmn-at-night-best-timing-for-energy-and-sleep/1.webp",
        width: 1536,
        height: 1024,
        alt: "Can You Take NMN at Night",
      },
    ],
  },
  alternates: {
    canonical: "https://www.aneralife.com/can-you-take-nmn-at-night-best-timing-for-energy-and-sleep",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
