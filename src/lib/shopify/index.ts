export {
  getProducts,
  getProductByHandle,
  getProductRecommendations,
  getCollections,
  getCollectionProducts,
  getPageByHandle,
  getPages,
  getBlogByHandle,
  getArticleByHandle,
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
  ShopifyPage,
  Article,
  Blog,
} from "./types";
