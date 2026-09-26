import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "The Complete Guide to NMN Supplements in Canada (2026 Edition)" },
  description:
    "Discover how NMN works, its potential benefits, dosage, quality standards, and how to choose the right NMN supplement in Canada in 2026.",
  keywords: ["Complete guide to NMN supplements in Canada"],
  openGraph: {
    title: "The Complete Guide to NMN Supplements in Canada (2026 Edition)",
    description:
      "Discover how NMN works, its potential benefits, dosage, quality standards, and how to choose the right NMN supplement in Canada in 2026.",
    url: "https://www.aneralife.com/the-complete-guide-to-nmn-supplements-in-canada",
    type: "article",
    images: [
      {
        url: "/articles/the-complete-guide-to-nmn-supplements-in-canada/1.webp",
        width: 1536,
        height: 1024,
        alt: "Complete guide to NMN supplements in Canada",
      },
    ],
  },
  alternates: {
    canonical: "https://www.aneralife.com/the-complete-guide-to-nmn-supplements-in-canada",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
