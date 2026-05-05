"use client";

import {
  createContext,
  useContext,
  useOptimistic,
  useTransition,
  useCallback,
  useState,
} from "react";
import type { Cart } from "@/lib/shopify/types";

type CartAction =
  | { type: "ADD_ITEM"; variantId: string }
  | { type: "UPDATE_ITEM"; lineId: string; quantity: number }
  | { type: "REMOVE_ITEM"; lineId: string }
  | { type: "SET_CART"; cart: Cart };

type CartContextType = {
  cart: Cart | null;
  isPending: boolean;
  isOpen: boolean;
  cartError: string | null;
  openCart: () => void;
  closeCart: () => void;
  addItem: (variantId: string, quantity?: number, openAfter?: boolean) => void;
  updateItem: (lineId: string, quantity: number) => void;
  removeItem: (lineId: string) => void;
};

const CartContext = createContext<CartContextType | null>(null);

function isCart(data: unknown): data is Cart {
  return typeof data === "object" && data !== null && "lines" in data && "checkoutUrl" in data;
}

function cartReducer(state: Cart | null, action: CartAction): Cart | null {
  if (!state) return state;

  switch (action.type) {
    case "ADD_ITEM":
      return {
        ...state,
        totalQuantity: state.totalQuantity + 1,
      };
    case "UPDATE_ITEM":
      return {
        ...state,
        lines: state.lines.map((line) =>
          line.id === action.lineId
            ? { ...line, quantity: action.quantity }
            : line
        ),
      };
    case "REMOVE_ITEM":
      return {
        ...state,
        lines: state.lines.filter((line) => line.id !== action.lineId),
        totalQuantity: Math.max(
          0,
          state.totalQuantity -
            (state.lines.find((l) => l.id === action.lineId)?.quantity ?? 0)
        ),
      };
    case "SET_CART":
      return action.cart;
    default:
      return state;
  }
}

export function CartProvider({
  children,
  initialCart,
}: {
  children: React.ReactNode;
  initialCart: Cart | null;
}) {
  const [cart, setCart] = useState<Cart | null>(initialCart);
  const [optimisticCart, addOptimistic] = useOptimistic(cart, cartReducer);
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);
  const [cartError, setCartError] = useState<string | null>(null);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const addItem = useCallback(
    (variantId: string, quantity = 1, openAfter = false) => {
      setCartError(null);
      startTransition(async () => {
        addOptimistic({ type: "ADD_ITEM", variantId });

        try {
          const res = await fetch("/api/cart", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ action: "add", variantId, quantity }),
          });
          const data = await res.json();

          if (!isCart(data)) {
            console.error("Cart API error:", data);
            setCartError(data?.error ?? "Failed to add item. Please try again.");
            return;
          }

          setCart(data);
          if (openAfter) setIsOpen(true);
        } catch (err) {
          console.error("addItem error:", err);
          setCartError("Failed to add item. Please try again.");
        }
      });
    },
    [addOptimistic]
  );

  const updateItem = useCallback(
    (lineId: string, quantity: number) => {
      startTransition(async () => {
        addOptimistic({ type: "UPDATE_ITEM", lineId, quantity });

        try {
          const res = await fetch("/api/cart", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ action: "update", lineId, quantity }),
          });
          const data = await res.json();
          if (isCart(data)) setCart(data);
        } catch (err) {
          console.error("updateItem error:", err);
        }
      });
    },
    [addOptimistic]
  );

  const removeItem = useCallback(
    (lineId: string) => {
      startTransition(async () => {
        addOptimistic({ type: "REMOVE_ITEM", lineId });

        try {
          const res = await fetch("/api/cart", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ action: "remove", lineId }),
          });
          const data = await res.json();
          if (isCart(data)) {
            setCart(data);
          } else {
            // Force a re-render with the unchanged cart so the item reappears
            setCart((prev) => prev ? { ...prev } : prev);
          }
        } catch (err) {
          console.error("removeItem error:", err);
          setCart((prev) => prev ? { ...prev } : prev);
        }
      });
    },
    [addOptimistic]
  );

  return (
    <CartContext.Provider
      value={{
        cart: optimisticCart,
        isPending,
        isOpen,
        cartError,
        openCart,
        closeCart,
        addItem,
        updateItem,
        removeItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
