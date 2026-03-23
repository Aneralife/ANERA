export {
  getProducts,
  getProductByHandle,
  getProductRecommendations,
  getCollections,
  getCollectionProducts,
  createCart,
  addToCart,
  updateCart,
  removeFromCart,
} from "./client";

export type {
  Product,
  ProductVariant,
  Collection,
  Cart,
  CartItem,
  Image,
  Money,
} from "./types";
