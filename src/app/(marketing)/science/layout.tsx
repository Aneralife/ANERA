import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Science Behind NMN & Longevity",
  description:
    "Explore the peer-reviewed science behind NMN, NAD+ restoration, and Anera's five research pillars: epigenetics, mitochondrial health, microbiome science, nanometallic therapies, and AI-driven longevity analytics.",
  openGraph: {
    title: "The Science Behind NMN & Longevity | Anera Life",
    description:
      "Explore the peer-reviewed science behind NMN, NAD+ restoration, and Anera's five research pillars: epigenetics, mitochondrial health, microbiome science, nanometallic therapies, and AI-driven longevity analytics.",
    url: "/science",
    type: "website",
  },
  alternates: { canonical: "/science" },
};

export default function ScienceLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
