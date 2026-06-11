import type { Metadata } from "next";

import HomePageClient from "./home-page-client";

export const metadata: Metadata = {
  alternates: {
    canonical: new URL("https://www.aneralife.com/"),
  },
};

export default function HomePage() {
  return <HomePageClient />;
}
