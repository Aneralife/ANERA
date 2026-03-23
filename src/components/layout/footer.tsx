import Link from "next/link";

const footerLinks = [
  { name: "Shop", href: "/products" },
  { name: "Collections", href: "/collections" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
  { name: "Shipping & Returns", href: "/shipping" },
];

export function Footer() {
  return (
    <footer className="bg-[#f5f5f7]" role="contentinfo">
      <div className="mx-auto max-w-[980px] px-4 sm:px-6">
        {/* Links */}
        <div className="flex flex-wrap gap-x-6 gap-y-2 border-b border-[#d2d2d7] py-4">
          {footerLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-xs text-[#424245] transition-colors duration-400 ease-apple hover:text-[#1d1d1f]"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Copyright */}
        <div className="py-4">
          <p className="text-xs text-[#6e6e73]">
            Copyright &copy; {new Date().getFullYear()} Anera. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
