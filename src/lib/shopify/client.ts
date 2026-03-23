import {
  Cart,
  Collection,
  Connection,
  Product,
  ShopifyCart,
  ShopifyCollection,
  ShopifyProduct,
} from "./types";
import {
  GET_PRODUCTS_QUERY,
  GET_PRODUCT_BY_HANDLE_QUERY,
  GET_PRODUCT_RECOMMENDATIONS_QUERY,
  GET_COLLECTIONS_QUERY,
  GET_COLLECTION_PRODUCTS_QUERY,
  CREATE_CART_MUTATION,
  ADD_TO_CART_MUTATION,
  UPDATE_CART_MUTATION,
  REMOVE_FROM_CART_MUTATION,
} from "./queries";

const domain = process.env.SHOPIFY_STORE_DOMAIN!;
const storefrontAccessToken = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN!;
const endpoint = `https://${domain}/api/2024-01/graphql.json`;

// ─── Core Fetch ───────────────────────────────────────────

type ShopifyResponse<T> = {
  data: T;
  errors?: { message: string }[];
};

async function shopifyFetch<T>(
  query: string,
  variables: Record<string, unknown> = {}
): Promise<T> {
  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": storefrontAccessToken,
    },
    body: JSON.stringify({ query, variables }),
    next: { revalidate: 120 },
  });

  if (!response.ok) {
    throw new Error(`Shopify API error: ${response.status} ${response.statusText}`);
  }

  const json: ShopifyResponse<T> = await response.json();

  if (json.errors) {
    throw new Error(json.errors.map((e) => e.message).join("\n"));
  }

  return json.data;
}

// ─── Transform Helpers ───────────────────────────────────

function flattenConnection<T>(connection: Connection<T>): T[] {
  return connection.edges.map((edge) => edge.node);
}

function reshapeProduct(product: ShopifyProduct): Product {
  return {
    ...product,
    images: flattenConnection(product.images),
    variants: flattenConnection(product.variants),
  };
}

function reshapeProducts(products: ShopifyProduct[]): Product[] {
  return products.map(reshapeProduct);
}

function reshapeCart(cart: ShopifyCart): Cart {
  return {
    ...cart,
    lines: flattenConnection(cart.lines),
  };
}

// ─── Product API ──────────────────────────────────────────

export async function getProducts(options?: {
  first?: number;
  sortKey?: string;
  reverse?: boolean;
  query?: string;
}): Promise<Product[]> {
  const { first = 20, sortKey = "RELEVANCE", reverse = false, query } = options || {};

  const data = await shopifyFetch<{
    products: Connection<ShopifyProduct>;
  }>(GET_PRODUCTS_QUERY, { first, sortKey, reverse, query });

  return reshapeProducts(flattenConnection(data.products));
}

export async function getProductByHandle(handle: string): Promise<Product | null> {
  const data = await shopifyFetch<{
    productByHandle: ShopifyProduct | null;
  }>(GET_PRODUCT_BY_HANDLE_QUERY, { handle });

  if (!data.productByHandle) return null;
  return reshapeProduct(data.productByHandle);
}

export async function getProductRecommendations(productId: string): Promise<Product[]> {
  const data = await shopifyFetch<{
    productRecommendations: ShopifyProduct[];
  }>(GET_PRODUCT_RECOMMENDATIONS_QUERY, { productId });

  return reshapeProducts(data.productRecommendations);
}

// ─── Collection API ───────────────────────────────────────

export async function getCollections(first = 20): Promise<Collection[]> {
  const data = await shopifyFetch<{
    collections: Connection<ShopifyCollection>;
  }>(GET_COLLECTIONS_QUERY, { first });

  return flattenConnection(data.collections);
}

export async function getCollectionProducts(
  handle: string,
  options?: { first?: number; sortKey?: string; reverse?: boolean }
): Promise<{ collection: Collection; products: Product[] }> {
  const { first = 20, sortKey = "RELEVANCE", reverse = false } = options || {};

  const data = await shopifyFetch<{
    collection: ShopifyCollection & { products: Connection<ShopifyProduct> };
  }>(GET_COLLECTION_PRODUCTS_QUERY, { handle, first, sortKey, reverse });

  return {
    collection: {
      id: data.collection.id,
      handle: data.collection.handle,
      title: data.collection.title,
      description: data.collection.description,
      image: data.collection.image,
      seo: data.collection.seo,
    },
    products: reshapeProducts(flattenConnection(data.collection.products)),
  };
}

// ─── Cart API ─────────────────────────────────────────────

export async function createCart(
  lines: { merchandiseId: string; quantity: number }[] = []
): Promise<Cart> {
  const data = await shopifyFetch<{
    cartCreate: { cart: ShopifyCart };
  }>(CREATE_CART_MUTATION, { lines });

  return reshapeCart(data.cartCreate.cart);
}

export async function addToCart(
  cartId: string,
  lines: { merchandiseId: string; quantity: number }[]
): Promise<Cart> {
  const data = await shopifyFetch<{
    cartLinesAdd: { cart: ShopifyCart };
  }>(ADD_TO_CART_MUTATION, { cartId, lines });

  return reshapeCart(data.cartLinesAdd.cart);
}

export async function updateCart(
  cartId: string,
  lines: { id: string; merchandiseId: string; quantity: number }[]
): Promise<Cart> {
  const data = await shopifyFetch<{
    cartLinesUpdate: { cart: ShopifyCart };
  }>(UPDATE_CART_MUTATION, { cartId, lines });

  return reshapeCart(data.cartLinesUpdate.cart);
}

export async function removeFromCart(
  cartId: string,
  lineIds: string[]
): Promise<Cart> {
  const data = await shopifyFetch<{
    cartLinesRemove: { cart: ShopifyCart };
  }>(REMOVE_FROM_CART_MUTATION, { cartId, lineIds });

  return reshapeCart(data.cartLinesRemove.cart);
}
