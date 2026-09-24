import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "250 mg vs 500 mg NMN: Which Dose Makes Sense?" },
  description:
    "Compare 250 mg vs 500 mg NMN, review human research on dosage, and learn what to consider when choosing an NMN supplement in Canada.",
  keywords: ["250 mg vs 500 mg NMN"],
  openGraph: {
    title: "250 mg vs 500 mg NMN: Which Dose Makes Sense?",
    description:
      "Compare 250 mg vs 500 mg NMN, review human research on dosage, and learn what to consider when choosing an NMN supplement in Canada.",
    url: "https://www.aneralife.com/250-mg-vs-500-mg-nmn",
    type: "article",
    images: [
      {
        url: "/articles/250-mg-vs-500-mg-nmn/1.webp",
        width: 1536,
        height: 1024,
        alt: "250 mg vs 500 mg NMN",
      },
    ],
  },
  alternates: {
    canonical: "https://www.aneralife.com/250-mg-vs-500-mg-nmn",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
