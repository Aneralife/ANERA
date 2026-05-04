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
  openCart: () => void;
  closeCart: () => void;
  addItem: (variantId: string, quantity?: number, openAfter?: boolean) => void;
  updateItem: (lineId: string, quantity: number) => void;
  removeItem: (lineId: string) => void;
};

const CartContext = createContext<CartContextType | null>(null);

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
  // Real confirmed state — useOptimistic reverts to this after each transition
  const [cart, setCart] = useState<Cart | null>(initialCart);
  const [optimisticCart, addOptimistic] = useOptimistic(cart, cartReducer);
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const addItem = useCallback(
    (variantId: string, quantity = 1, openAfter = false) => {
      startTransition(async () => {
        addOptimistic({ type: "ADD_ITEM", variantId });

        const res = await fetch("/api/cart", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action: "add", variantId, quantity }),
        });
        const updatedCart = await res.json();
        setCart(updatedCart);

        if (openAfter) setIsOpen(true);
      });
    },
    [addOptimistic]
  );

  const updateItem = useCallback(
    (lineId: string, quantity: number) => {
      startTransition(async () => {
        addOptimistic({ type: "UPDATE_ITEM", lineId, quantity });

        const res = await fetch("/api/cart", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action: "update", lineId, quantity }),
        });
        const updatedCart = await res.json();
        setCart(updatedCart);
      });
    },
    [addOptimistic]
  );

  const removeItem = useCallback(
    (lineId: string) => {
      startTransition(async () => {
        addOptimistic({ type: "REMOVE_ITEM", lineId });

        const res = await fetch("/api/cart", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action: "remove", lineId }),
        });
        const updatedCart = await res.json();
        setCart(updatedCart);
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
