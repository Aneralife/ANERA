import type { Metadata } from "next";
import { defaultSocialImage } from "@/lib/seo";

export const metadata: Metadata = {
  title: { absolute: "Anera Life – About Us" },
  description:
    "Anera is building a world where aging is measurable and manageable. Discover our mission, vision, and science-backed approach to living longer, healthier lives.",
  openGraph: {
    title: "Anera Life – About Us",
    description:
      "Anera is building a world where aging is measurable and manageable. Discover our mission, vision, and science-backed approach to living longer, healthier lives.",
    url: "/about",
    type: "website",
    images: [defaultSocialImage],
  },
  alternates: { canonical: "/about" },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
