import type { Metadata } from "next";
import { defaultSocialImage } from "@/lib/seo";

export const metadata: Metadata = {
  title: { absolute: "Buy the Premium NMN Supplement Canada Trusts – Shop Now | Anera Life" },
  description:
    "Get 10% off the Premium NMN supplement from Canada's top brand. Pure, effective, and fast shipping. Shop now!",
  openGraph: {
    title: "Buy the Premium NMN Supplement Canada Trusts – Shop Now | Anera Life",
    description:
      "Get 10% off the Premium NMN supplement from Canada's top brand. Pure, effective, and fast shipping. Shop now!",
    url: "/products",
    type: "website",
    images: [defaultSocialImage],
  },
  alternates: { canonical: "/products" },
};

export default function ProductsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
