import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/components/cart/cart-context";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "Anera Life — Longevity Is the New Flex",
    template: "%s — Anera",
  },
  description:
    "Pharmaceutical-grade NMN supplements. Pure. Proven. Life-changing. Canada & USA.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${inter.className}`}>
      <body>
        <CartProvider initialCart={null}>{children}</CartProvider>
      </body>
    </html>
  );
}
