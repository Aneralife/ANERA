import type { Metadata } from "next";
import { defaultSocialImage } from "@/lib/seo";

export const metadata: Metadata = {
  title: "How Long Does NMN Take to Work? Day 1 to 6 Month Timeline",
  description:
    "Wondering when NMN starts working? See the real timeline, from subtle energy boosts in 1–2 weeks to deeper cellular benefits by 3–6 months.",
  keywords: [
    "how long does NMN take to work",
    "NMN timeline",
    "NMN results",
    "NMN NAD+ supplement",
    "NMN benefits timeline",
  ],
  openGraph: {
    title: "How Long Does NMN Take to Work? Day 1 to 6 Month Timeline | Anera Life",
    description:
      "Wondering when NMN starts working? See the real timeline, from subtle energy boosts in 1–2 weeks to deeper cellular benefits by 3–6 months.",
    url: "https://www.aneralife.com/how-long-does-nmn-take-to-work-day-1-to-6-months",
    type: "article",
    images: [defaultSocialImage],
  },
  alternates: {
    canonical: "https://www.aneralife.com/how-long-does-nmn-take-to-work-day-1-to-6-months",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
