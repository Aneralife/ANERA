"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { LocalProduct } from "@/lib/local-products";

export default function AdminProductsPage() {
  const [products, setProducts] = useState<LocalProduct[]>([]);
  const [loading, setLoading] = useState(true);

  function loadProducts() {
    fetch("/api/admin/products")
      .then((r) => r.json())
      .then((d) => setProducts(d.products || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    loadProducts();
  }, []);

  async function handleDelete(id: string) {
    if (!confirm("Delete this product?")) return;
    await fetch("/api/admin/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "delete", id }),
    });
    loadProducts();
  }

  return (
    <>
      <div className="admin-header">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h1>Products</h1>
            <p>Manage your product catalog</p>
          </div>
          <Link href="/admin/products/new" className="admin-btn admin-btn-primary">
            + Add Product
          </Link>
        </div>
      </div>

      {loading ? (
        <p style={{ color: "var(--fg-muted)" }}>Loading...</p>
      ) : products.length === 0 ? (
        <p style={{ color: "var(--fg-muted)" }}>No products yet.</p>
      ) : (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Tag</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id}>
                  <td>
                    <div style={{ fontWeight: 600 }}>{p.title}</div>
                    <div style={{ fontSize: 12, color: "var(--fg-muted)" }}>
                      {p.dosage} · {p.capsules} capsules
                    </div>
                  </td>
                  <td>
                    ${p.price} {p.currency}
                  </td>
                  <td>
                    <span className={`badge badge-${p.tagColor === "gold" ? "admin" : "user"}`}>
                      {p.tag}
                    </span>
                  </td>
                  <td>
                    <span style={{ color: p.available ? "#22c55e" : "#ef4444" }}>
                      {p.available ? "Active" : "Draft"}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: "flex", gap: 8 }}>
                      <Link
                        href={`/admin/products/edit?id=${p.id}`}
                        className="admin-btn admin-btn-ghost admin-btn-sm"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(p.id)}
                        className="admin-btn admin-btn-danger admin-btn-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
