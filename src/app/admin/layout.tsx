"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/components/auth-provider";
import { ThemeToggle } from "@/components/theme-toggle";

const navItems = [
  { label: "Dashboard", href: "/admin", icon: "~" },
  { label: "Products", href: "/admin/products", icon: "#" },
  { label: "Users", href: "/admin/users", icon: "@" },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { user, signOut } = useAuth();

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <Link href="/admin" className="admin-sidebar__logo">
          ANERA
        </Link>
        <div className="admin-sidebar__role">Admin Panel</div>

        <nav className="admin-sidebar__nav">
          {navItems.map((item) => {
            const isActive =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`admin-sidebar__link ${isActive ? "active" : ""}`}
              >
                <span style={{ fontFamily: "monospace", fontSize: 16 }}>
                  {item.icon}
                </span>
                {item.label}
              </Link>
            );
          })}
          <div style={{ height: 12 }} />
          <Link href="/" className="admin-sidebar__link">
            <span style={{ fontFamily: "monospace", fontSize: 16 }}>{"<"}</span>
            Back to Site
          </Link>
        </nav>

        <div className="admin-sidebar__bottom">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
            <div>
              <div className="admin-sidebar__user">{user?.name || "Admin"}</div>
              <div className="admin-sidebar__email">
                {user?.email || "admin@email.com"}
              </div>
            </div>
            <ThemeToggle className="theme-toggle" />
          </div>
          <button onClick={signOut} className="admin-sidebar__signout">
            Sign Out
          </button>
        </div>
      </aside>

      <main className="admin-main">{children}</main>
    </div>
  );
}
