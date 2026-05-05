import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { addToCart, createCart, removeFromCart, updateCart } from "@/lib/shopify";

export async function POST(req: NextRequest) {
  const { action, variantId, lineId, quantity } = await req.json();
  const cookieStore = cookies();
  const cartId = cookieStore.get("cartId")?.value;

  try {
    let cart;

    switch (action) {
      case "add": {
        const addQty = typeof quantity === "number" && quantity > 0 ? quantity : 1;
        if (cartId) {
          cart = await addToCart(cartId, [
            { merchandiseId: variantId, quantity: addQty },
          ]);
        } else {
          cart = await createCart([
            { merchandiseId: variantId, quantity: addQty },
          ]);
          // Set cart cookie
          const response = NextResponse.json(cart);
          response.cookies.set("cartId", cart.id, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 60 * 60 * 24 * 30, // 30 days
          });
          return response;
        }
        break;
      }

      case "update": {
        if (!cartId) {
          return NextResponse.json(
            { error: "No cart found" },
            { status: 400 }
          );
        }
        const updateLine: { id: string; merchandiseId?: string; quantity: number } = { id: lineId, quantity };
        if (variantId) updateLine.merchandiseId = variantId;
        cart = await updateCart(cartId, [updateLine]);
        break;
      }

      case "remove": {
        if (!cartId) {
          return NextResponse.json(
            { error: "No cart found" },
            { status: 400 }
          );
        }
        cart = await removeFromCart(cartId, [lineId]);
        break;
      }

      case "buyNow": {
        if (cartId) {
          // Add the item to existing cart, then redirect to its checkout
          const updatedCart = await addToCart(cartId, [
            { merchandiseId: variantId, quantity: quantity || 1 },
          ]);
          return NextResponse.json({ checkoutUrl: updatedCart.checkoutUrl });
        } else {
          // No cart yet — create one with this item
          const newCart = await createCart([
            { merchandiseId: variantId, quantity: quantity || 1 },
          ]);
          const response = NextResponse.json({ checkoutUrl: newCart.checkoutUrl });
          response.cookies.set("cartId", newCart.id, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 60 * 60 * 24 * 30,
          });
          return response;
        }
      }

      default:
        return NextResponse.json(
          { error: "Invalid action" },
          { status: 400 }
        );
    }

    return NextResponse.json(cart);
  } catch (error) {
    console.error("Cart API error:", error);
    return NextResponse.json(
      { error: "Failed to update cart" },
      { status: 500 }
    );
  }
}
