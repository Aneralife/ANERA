import type { Metadata } from "next";
import { defaultSocialImage } from "@/lib/seo";

const title = "What Happens to NAD⁺ as We Age | ANERA";
const description =
  "Learn what human studies suggest about NAD⁺ and aging, why one percentage is the wrong takeaway, how NMN fits as a precursor, and what a Canadian NPN means. Education from ANERA.";
const canonical = "https://www.aneralife.com/nad-plus-and-aging";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  keywords: [
    "NAD+ and aging",
    "NAD+ decline",
    "NMN precursor",
    "Health Canada NPN",
    "cellular energy",
  ],
  openGraph: {
    title,
    description,
    url: canonical,
    type: "article",
    images: [defaultSocialImage],
  },
  alternates: { canonical },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
