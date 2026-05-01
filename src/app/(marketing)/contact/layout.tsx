import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with the Anera Life team. Reach us by email at Info@aneralife.com or visit our Richmond, BC office. We're here to help.",
  openGraph: {
    title: "Contact Us | Anera Life",
    description:
      "Get in touch with the Anera Life team. Reach us by email at Info@aneralife.com or visit our Richmond, BC office.",
    url: "/contact",
    type: "website",
  },
  alternates: { canonical: "/contact" },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
