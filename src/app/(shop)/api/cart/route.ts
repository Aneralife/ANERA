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
        if (cartId) {
          cart = await addToCart(cartId, [
            { merchandiseId: variantId, quantity: 1 },
          ]);
        } else {
          cart = await createCart([
            { merchandiseId: variantId, quantity: 1 },
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
        cart = await updateCart(cartId, [
          { id: lineId, merchandiseId: variantId, quantity },
        ]);
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
