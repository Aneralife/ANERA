import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "Anera Global Distribution Partners | Buy Authentic Supplements" },
  description:
    "Buy 100% genuine, science-backed Anera supplements from verified global partners. Scan QR codes, avoid counterfeits, and shop with confidence. Find an official partner today.",
  openGraph: {
    title: "Anera Global Distribution Partners | Buy Authentic Supplements",
    description:
      "Buy 100% genuine, science-backed Anera supplements from verified global partners. Scan QR codes, avoid counterfeits, and shop with confidence. Find an official partner today.",
    url: "/distribution",
    type: "website",
  },
  alternates: { canonical: "/distribution" },
};

export default function DistributionLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
