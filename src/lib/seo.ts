export const siteUrl = "https://www.aneralife.com";

export const defaultSocialImage = {
  url: "/og-image.jpg",
  width: 1200,
  height: 627,
  alt: "Anera Life",
};

export const defaultTwitterImage = "/og-image.jpg";

export function jsonLdScript(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: "Anera Life Inc.",
      url: siteUrl,
      logo: `${siteUrl}/og-image.jpg`,
      email: "Info@aneralife.com",
      address: {
        "@type": "PostalAddress",
        streetAddress: "2220 – 8788 McKim Way",
        addressLocality: "Richmond",
        addressRegion: "BC",
        postalCode: "V6X 4E2",
        addressCountry: "CA",
      },
      sameAs: [
        "https://www.instagram.com/aneralife/",
        "https://www.linkedin.com/company/anera",
        "https://www.facebook.com/aneralife/",
        "https://x.com/Aneralife",
        "https://www.tiktok.com/@aneralife",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "Anera Life",
      publisher: { "@id": `${siteUrl}/#organization` },
    },
  ],
};

/** Articles with their own routes but almost no in-content links from the homepage or PDPs. */
export const readingGuides = [
  {
    href: "/nmn-vs-nad-whats-the-difference-and-which-is-better",
    title: "NMN vs NAD: what's the difference",
  },
  {
    href: "/food-vs-supplement-can-you-get-enough-nmn-naturally",
    title: "Can you get enough NMN from food?",
  },
  {
    href: "/nmn-supplement-benefits-side-effects-dosage-guide",
    title: "NMN benefits, side effects, and dosage",
  },
  {
    href: "/how-long-does-nmn-take-to-work-day-1-to-6-months",
    title: "How long NMN takes to work",
  },
  {
    href: "/when-nmn-works-best-for-your-body-clock",
    title: "When NMN works best for your body clock",
  },
  {
    href: "/how-to-choose-the-best-nmn-supplement-the-ultimate-buyers-guide",
    title: "How to choose an NMN supplement",
  },
  {
    href: "/buy-best-nmn-supplement-canada",
    title: "Best NMN supplement in Canada",
  },
  {
    href: "/where-to-buy-nmn-canada",
    title: "Where to buy NMN in Canada",
  },
  {
    href: "/top-nmn-brands-canada",
    title: "Top NMN brands in Canada",
  },
  {
    href: "/from-pain-to-purpose-anera-nmn-story",
    title: "From pain to purpose: the Anera NMN story",
  },
] as const;
