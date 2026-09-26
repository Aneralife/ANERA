import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "Is NMN Good for Beginners? What You Should Know First" },
  description:
    "New to NMN? Learn the benefits, recommended dosage, safety, side effects, and what beginners should expect before starting an NMN supplement.",
  keywords: ["Is NMN Good for Beginners"],
  openGraph: {
    title: "Is NMN Good for Beginners? What You Should Know First",
    description:
      "New to NMN? Learn the benefits, recommended dosage, safety, side effects, and what beginners should expect before starting an NMN supplement.",
    url: "https://www.aneralife.com/is-nmn-good-for-beginners-complete-guide",
    type: "article",
    images: [
      {
        url: "/articles/is-nmn-good-for-beginners-complete-guide/1.webp",
        width: 1536,
        height: 1024,
        alt: "Is NMN Good for Beginners",
      },
    ],
  },
  alternates: {
    canonical: "https://www.aneralife.com/is-nmn-good-for-beginners-complete-guide",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
