import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "Anera Life Media Hub – NMN Articles, Longevity Blogs and Research" },
  description:
    "Read expert-written articles and blog posts on NMN, longevity science, and healthy aging. Stay informed with trusted wellness content — read our blogs today.",
  openGraph: {
    title: "Anera Life Media Hub – NMN Articles, Longevity Blogs and Research",
    description:
      "Read expert-written articles and blog posts on NMN, longevity science, and healthy aging. Stay informed with trusted wellness content — read our blogs today.",
    url: "/media",
    type: "website",
  },
  alternates: { canonical: "/media" },
};

export default function MediaLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
