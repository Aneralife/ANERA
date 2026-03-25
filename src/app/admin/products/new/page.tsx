"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function NewProductPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
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

  function update(field: string, value: string | boolean) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await fetch("/api/admin/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "create", ...form }),
    });
    const data = await res.json();
    setLoading(false);

    if (data.error) {
      setError(data.error);
      return;
    }
    router.push("/admin/products");
  }

  return (
    <>
      <div className="admin-header">
        <h1>Add Product</h1>
        <p>Create a new product for your store</p>
      </div>

      {error && <div className="auth-error" style={{ maxWidth: 600 }}>{error}</div>}

      <form onSubmit={handleSubmit} className="admin-form">
        <div className="admin-form__field">
          <label>Product Title</label>
          <input
            type="text"
            value={form.title}
            onChange={(e) => update("title", e.target.value)}
            placeholder="e.g. NMN 30000"
            required
          />
        </div>

        <div className="admin-form__field">
          <label>Description</label>
          <textarea
            value={form.description}
            onChange={(e) => update("description", e.target.value)}
            placeholder="Product description..."
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
              placeholder="105"
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
              placeholder="250mg"
              required
            />
          </div>
          <div className="admin-form__field">
            <label>Capsules per bottle</label>
            <input
              type="text"
              value={form.capsules}
              onChange={(e) => update("capsules", e.target.value)}
              placeholder="60"
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
              placeholder="e.g. Best Seller, New, Advanced"
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
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Product"}
          </button>
          <Link href="/admin/products" className="admin-btn admin-btn-ghost">
            Cancel
          </Link>
        </div>
      </form>
    </>
  );
}
