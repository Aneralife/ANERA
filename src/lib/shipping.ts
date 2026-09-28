/**
 * Public free-shipping rule used in marketing copy.
 *
 * Free shipping to Canada and the USA on orders of CA$120 or more.
 * Checkout rates live in Shopify Admin and are not set in this repo.
 * If Admin still uses another threshold, update Admin so checkout matches this copy.
 */
export const FREE_SHIPPING_THRESHOLD_CAD = 120;

export const FREE_SHIPPING_SUMMARY = `Free shipping to Canada and the USA on orders of CA$${FREE_SHIPPING_THRESHOLD_CAD} or more.`;
