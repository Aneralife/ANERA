import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "Why I Stopped Taking NMN (The Truth No One Talks About)" },
  description:
    "Thinking about taking NMN? Discover the 7 reasons I stopped using it, what changed my mind, the latest research, and smarter alternatives for healthy aging.",
  keywords: ["Why I Stopped Taking NMN"],
  openGraph: {
    title: "Why I Stopped Taking NMN (The Truth No One Talks About)",
    description:
      "Thinking about taking NMN? Discover the 7 reasons I stopped using it, what changed my mind, the latest research, and smarter alternatives for healthy aging.",
    url: "https://www.aneralife.com/why-i-stopped-taking-nmn",
    type: "article",
    images: [
      {
        url: "/articles/why-i-stopped-taking-nmn/1.webp",
        width: 1536,
        height: 1024,
        alt: "Why I Stopped Taking NMN",
      },
    ],
  },
  alternates: {
    canonical: "https://www.aneralife.com/why-i-stopped-taking-nmn",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
