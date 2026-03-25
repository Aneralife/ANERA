"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function AdminDashboard() {
  const [productCount, setProductCount] = useState(0);
  const [userCount, setUserCount] = useState(0);

  useEffect(() => {
    fetch("/api/admin/products")
      .then((r) => r.json())
      .then((d) => setProductCount(d.products?.length || 0))
      .catch(() => {});
    fetch("/api/admin/users")
      .then((r) => r.json())
      .then((d) => setUserCount(d.users?.length || 0))
      .catch(() => {});
  }, []);

  return (
    <>
      <div className="admin-header">
        <h1>Dashboard</h1>
        <p>Overview of your store</p>
      </div>

      <div className="admin-stats">
        <div className="admin-stat-card">
          <div className="admin-stat-card__label">Products</div>
          <div className="admin-stat-card__value">{productCount}</div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-card__label">Users</div>
          <div className="admin-stat-card__value">{userCount}</div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-card__label">Status</div>
          <div className="admin-stat-card__value" style={{ fontSize: 20, color: "#22c55e" }}>
            Active
          </div>
        </div>
      </div>

      <div className="admin-stats">
        <Link
          href="/admin/products"
          className="admin-btn admin-btn-primary"
          style={{ padding: "14px 24px", fontSize: 14 }}
        >
          Manage Products
        </Link>
        <Link
          href="/admin/users"
          className="admin-btn admin-btn-ghost"
          style={{ padding: "14px 24px", fontSize: 14 }}
        >
          Manage Users
        </Link>
      </div>
    </>
  );
}
