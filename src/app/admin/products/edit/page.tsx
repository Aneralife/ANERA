"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import type { LocalProduct } from "@/lib/local-products";

export default function EditProductPage() {
  return (
    <Suspense fallback={<div className="admin-header"><h1>Edit Product</h1><p style={{ color: "var(--fg-muted)" }}>Loading...</p></div>}>
      <EditProductForm />
    </Suspense>
  );
}

function EditProductForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    currency: "CAD",
    tag: "",
    tagColor: "gold" as "gold" | "blue" | "green" | "purple",
    dosage: "",
    capsules: "",
    available: true,
  });

  useEffect(() => {
    if (!id) return;
    fetch("/api/admin/products")
      .then((r) => r.json())
      .then((d) => {
        const product = (d.products as LocalProduct[])?.find(
          (p) => p.id === id
        );
        if (product) {
          setForm({
            title: product.title,
            description: product.description,
            price: product.price,
            currency: product.currency,
            tag: product.tag,
            tagColor: product.tagColor,
            dosage: product.dosage,
            capsules: product.capsules,
            available: product.available,
          });
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [id]);

  function update(field: string, value: string | boolean) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSaving(true);

    const res = await fetch("/api/admin/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "update", id, ...form }),
    });
    const data = await res.json();
    setSaving(false);

    if (data.error) {
      setError(data.error);
      return;
    }
    router.push("/admin/products");
  }

  if (loading) {
    return (
      <div className="admin-header">
        <h1>Edit Product</h1>
        <p style={{ color: "var(--fg-muted)" }}>Loading...</p>
      </div>
    );
  }

  return (
    <>
      <div className="admin-header">
        <h1>Edit Product</h1>
        <p>Update product details</p>
      </div>

      {error && <div className="auth-error" style={{ maxWidth: 600 }}>{error}</div>}

      <form onSubmit={handleSubmit} className="admin-form">
        <div className="admin-form__field">
          <label>Product Title</label>
          <input
            type="text"
            value={form.title}
            onChange={(e) => update("title", e.target.value)}
            required
          />
        </div>

        <div className="admin-form__field">
          <label>Description</label>
          <textarea
            value={form.description}
            onChange={(e) => update("description", e.target.value)}
            required
          />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <div className="admin-form__field">
            <label>Price</label>
            <input
              type="number"
              value={form.price}
              onChange={(e) => update("price", e.target.value)}
              required
            />
          </div>
          <div className="admin-form__field">
            <label>Currency</label>
            <select
              value={form.currency}
              onChange={(e) => update("currency", e.target.value)}
            >
              <option value="CAD">CAD</option>
              <option value="USD">USD</option>
            </select>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <div className="admin-form__field">
            <label>Dosage</label>
            <input
              type="text"
              value={form.dosage}
              onChange={(e) => update("dosage", e.target.value)}
              required
            />
          </div>
          <div className="admin-form__field">
            <label>Capsules per bottle</label>
            <input
              type="text"
              value={form.capsules}
              onChange={(e) => update("capsules", e.target.value)}
              required
            />
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <div className="admin-form__field">
            <label>Tag Label</label>
            <input
              type="text"
              value={form.tag}
              onChange={(e) => update("tag", e.target.value)}
            />
          </div>
          <div className="admin-form__field">
            <label>Tag Color</label>
            <select
              value={form.tagColor}
              onChange={(e) => update("tagColor", e.target.value)}
            >
              <option value="gold">Gold</option>
              <option value="blue">Blue</option>
              <option value="green">Green</option>
              <option value="purple">Purple</option>
            </select>
          </div>
        </div>

        <div className="admin-form__field">
          <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <input
              type="checkbox"
              checked={form.available}
              onChange={(e) => update("available", e.target.checked)}
              style={{ width: "auto" }}
            />
            Published (visible on site)
          </label>
        </div>

        <div className="admin-form__actions">
          <button
            type="submit"
            className="admin-btn admin-btn-primary"
            disabled={saving}
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
          <Link href="/admin/products" className="admin-btn admin-btn-ghost">
            Cancel
          </Link>
        </div>
      </form>
    </>
  );
}
