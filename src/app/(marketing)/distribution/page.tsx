import { getGlobePartners } from "@/lib/shopify";
import { DistributionClient, STATIC_GLOBE_PARTNERS } from "@/components/distribution/dist-client";

export default async function DistributionPage() {
  const shopifyPartners = await getGlobePartners();
  const partners = shopifyPartners.length > 0 ? shopifyPartners : STATIC_GLOBE_PARTNERS;

  return <DistributionClient partners={partners} />;
}
