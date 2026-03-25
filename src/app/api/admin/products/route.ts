import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "@/lib/local-products";

function requireAdmin() {
  const session = getSession();
  if (!session || session.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }
  return null;
}

export async function GET() {
  const denied = requireAdmin();
  if (denied) return denied;
  return NextResponse.json({ products: getAllProducts() });
}

export async function POST(req: NextRequest) {
  const denied = requireAdmin();
  if (denied) return denied;

  const { action, id, ...data } = await req.json();

  switch (action) {
    case "create": {
      const product = createProduct(data);
      return NextResponse.json({ product });
    }
    case "update": {
      const product = updateProduct(id, data);
      if (!product) {
        return NextResponse.json(
          { error: "Product not found" },
          { status: 404 }
        );
      }
      return NextResponse.json({ product });
    }
    case "delete": {
      const deleted = deleteProduct(id);
      if (!deleted) {
        return NextResponse.json(
          { error: "Product not found" },
          { status: 404 }
        );
      }
      return NextResponse.json({ success: true });
    }
    default:
      return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  }
}
