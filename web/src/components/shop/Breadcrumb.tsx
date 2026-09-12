import Link from "next/link";

export function Breadcrumb({ items }: { items: { href?: string; label: string }[] }) {
  return (
    <nav className="mb-5 text-sm text-[#888]">
      <Link href="/" className="hover:text-green">
        Home
      </Link>
      {items.map((item) => (
        <span key={item.label}>
          <span className="mx-1.5">»</span>
          {item.href ? (
            <Link href={item.href} className="hover:text-green">
              {item.label}
            </Link>
          ) : (
            <span className="text-[#333]">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
