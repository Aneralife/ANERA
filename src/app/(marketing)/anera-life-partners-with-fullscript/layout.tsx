import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "Anera Life Partners With Fullscript | Premium Supplements" },
  description:
    "Anera Life partners with Fullscript, expanding access to premium supplements through a platform used by 125,000+ healthcare providers.",
  keywords: ["Anera Life Partners With Fullscript"],
  openGraph: {
    title: "Anera Life Partners With Fullscript | Premium Supplements",
    description:
      "Anera Life partners with Fullscript, expanding access to premium supplements through a platform used by 125,000+ healthcare providers.",
    url: "https://www.aneralife.com/anera-life-partners-with-fullscript",
    type: "article",
    images: [
      {
        url: "/articles/anera-life-partners-with-fullscript/1.webp",
        width: 1536,
        height: 1024,
        alt: "Anera Life Partners With Fullscript",
      },
    ],
  },
  alternates: {
    canonical: "https://www.aneralife.com/anera-life-partners-with-fullscript",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
