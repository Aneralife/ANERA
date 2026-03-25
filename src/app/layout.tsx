import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/components/cart/cart-context";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/components/auth-provider";

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
    <html lang="en" data-theme="light" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('anera-theme');if(t==='dark')document.documentElement.setAttribute('data-theme','dark')}catch(e){}})()`,
          }}
        />
      </head>
      <body>
        <ThemeProvider>
          <AuthProvider>
            <CartProvider initialCart={null}>{children}</CartProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
