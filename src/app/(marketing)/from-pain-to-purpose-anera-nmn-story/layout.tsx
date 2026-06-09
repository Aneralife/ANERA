import type { Metadata } from "next";
import { defaultSocialImage } from "@/lib/seo";

export const metadata: Metadata = {
  title: "My Personal Journey with ANERA NMN: From Pain to Purpose",
  description:
    "Explore the founder's journey from debilitating pain to renewed vitality with NMN, and discover the mission behind ANERA's premium NMN supplements in Canada.",
  keywords: [
    "From Pain to Purpose",
    "ANERA NMN story",
    "NMN founder story",
    "Truc Tran ANERA",
    "NMN chronic pain recovery",
    "best NMN supplements Canada",
  ],
  openGraph: {
    title: "My Personal Journey with ANERA NMN: From Pain to Purpose | Anera Life",
    description:
      "Explore the founder's journey from debilitating pain to renewed vitality with NMN, and discover the mission behind ANERA's premium NMN supplements in Canada.",
    url: "https://aneralife.com/from-pain-to-purpose-anera-nmn-story",
    type: "article",
    images: [defaultSocialImage],
  },
  alternates: {
    canonical: "https://aneralife.com/from-pain-to-purpose-anera-nmn-story",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
