import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "NMN vs NAD: What's the Difference and Which Is Better?" },
  description:
    "Learn the difference between NMN and NAD+, how NMN converts to NAD+, what research says, and which option may better support healthy aging goals.",
  keywords: ["NMN vs NAD"],
  openGraph: {
    title: "NMN vs NAD: What's the Difference and Which Is Better?",
    description:
      "Learn the difference between NMN and NAD+, how NMN converts to NAD+, what research says, and which option may better support healthy aging goals.",
    url: "https://aneralife.com/nmn-vs-nad-whats-the-difference-and-which-is-better",
    type: "article",
    images: [
      {
        url: "/articles/nmn-vs-nad-whats-the-difference-and-which-is-better/1.webp",
        width: 1597,
        height: 985,
        alt: "NMN vs NAD",
      },
    ],
  },
  alternates: {
    canonical: "https://aneralife.com/nmn-vs-nad-whats-the-difference-and-which-is-better",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
