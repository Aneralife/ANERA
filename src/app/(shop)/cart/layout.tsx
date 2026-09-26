import type { Metadata } from "next";
import { FREE_SHIPPING_THRESHOLD_CAD } from "@/lib/shipping";

export const metadata: Metadata = {
  title: { absolute: "Cart – Anera Life" },
  description: `Review your Anera Life cart. Pharmaceutical-grade NMN supplements with free shipping over $${FREE_SHIPPING_THRESHOLD_CAD} CAD. Secure checkout powered by Shopify.`,
  robots: { index: false, follow: false },
};

export default function CartLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
