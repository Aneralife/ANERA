import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "Cart – Anera Life" },
  description:
    "Review your Anera Life cart. Pharmaceutical-grade NMN supplements with free shipping over $150 CAD. Secure checkout powered by Shopify.",
  robots: { index: false, follow: false },
};

export default function CartLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
