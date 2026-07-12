import type { Metadata } from "next";
import { defaultSocialImage } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Morning vs Night: When NMN Works Best for Your Body Clock?",
  description:
    "Discover whether morning or night is the best time to take NMN for energy, metabolism, and longevity. Learn how timing impacts sleep, focus, and NAD+ levels.",
  keywords: [
    "when NMN works best for your body clock",
    "best time to take NMN",
    "NMN morning or night",
    "NMN timing circadian rhythm",
    "NMN NAD+ supplement timing",
  ],
  openGraph: {
    title: "Morning vs Night: When NMN Works Best for Your Body Clock? | Anera Life",
    description:
      "Discover whether morning or night is the best time to take NMN for energy, metabolism, and longevity. Learn how timing impacts sleep, focus, and NAD+ levels.",
    url: "https://www.aneralife.com/when-nmn-works-best-for-your-body-clock",
    type: "article",
    images: [defaultSocialImage],
  },
  alternates: {
    canonical: "https://www.aneralife.com/when-nmn-works-best-for-your-body-clock",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
