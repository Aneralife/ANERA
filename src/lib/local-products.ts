// Simple in-memory product store for admin-managed products.
// In production, this would use a database. Products persist only
// while the server is running (temporary implementation).

export type LocalProduct = {
  id: string;
  handle: string;
  title: string;
  description: string;
  price: string;
  currency: string;
  tag: string;
  tagColor: "gold" | "blue" | "green" | "purple";
  dosage: string;
  capsules: string;
  available: boolean;
  createdAt: string;
  updatedAt: string;
};

// Seed with the two existing products so they appear by default
const products: LocalProduct[] = [
  {
    id: "prod-001",
    handle: "nad-booster-nmn-15000",
    title: "NMN 15000",
    description:
      "250 mg · 60 capsules. Pharmaceutical-grade NMN with industry-leading purity. Endotoxin <20 Eu/g — the cleanest NMN available.",
    price: "105",
    currency: "CAD",
    tag: "Best Seller",
    tagColor: "gold",
    dosage: "250mg",
    capsules: "60",
    available: true,
    createdAt: "2026-01-01T00:00:00Z",
    updatedAt: "2026-01-01T00:00:00Z",
  },
  {
    id: "prod-002",
    handle: "nmn-trans-resveratrol-24000",
    title: "NMN 24000",
    description:
      "400 mg · 60 capsules. Maximum-strength formula for peak longevity. The only NMN in the world clinically tested in human trials.",
    price: "120",
    currency: "CAD",
    tag: "Advanced",
    tagColor: "blue",
    dosage: "400mg",
    capsules: "60",
    available: true,
    createdAt: "2026-01-01T00:00:00Z",
    updatedAt: "2026-01-01T00:00:00Z",
  },
];

function toHandle(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function getAllProducts(): LocalProduct[] {
  return [...products];
}

export function getProductById(id: string): LocalProduct | undefined {
  return products.find((p) => p.id === id);
}

export function getProductByHandle(handle: string): LocalProduct | undefined {
  return products.find((p) => p.handle === handle);
}

export function createProduct(
  data: Omit<LocalProduct, "id" | "handle" | "createdAt" | "updatedAt">
): LocalProduct {
  const product: LocalProduct = {
    ...data,
    id: `prod-${Date.now()}`,
    handle: toHandle(data.title),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  products.push(product);
  return product;
}

export function updateProduct(
  id: string,
  data: Partial<Omit<LocalProduct, "id" | "createdAt">>
): LocalProduct | null {
  const index = products.findIndex((p) => p.id === id);
  if (index === -1) return null;
  products[index] = {
    ...products[index],
    ...data,
    handle: data.title ? toHandle(data.title) : products[index].handle,
    updatedAt: new Date().toISOString(),
  };
  return products[index];
}

export function deleteProduct(id: string): boolean {
  const index = products.findIndex((p) => p.id === id);
  if (index === -1) return false;
  products.splice(index, 1);
  return true;
}
