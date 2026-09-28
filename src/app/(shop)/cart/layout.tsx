import type { Metadata } from "next";
import { FREE_SHIPPING_SUMMARY } from "@/lib/shipping";

export const metadata: Metadata = {
  title: { absolute: "Cart | Anera Life" },
  description: `Review your Anera Life cart. Pharmaceutical-grade NMN supplements. ${FREE_SHIPPING_SUMMARY} Secure checkout powered by Shopify.`,
  robots: { index: false, follow: false },
};

export default function CartLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
