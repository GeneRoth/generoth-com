import type { Metadata } from "next";
import Link from "next/link";

// `absolute` bypasses the root layout's title template so this renders exactly
// as written, rather than getting a "| Gene Roth Advisory, LLC" suffix appended.
export const metadata: Metadata = {
  title: { absolute: "Page Not Found | Gene Roth Advisory" },
};

const LINKS = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/#services" },
  { label: "Portfolio", href: "/#portfolio" },
  { label: "Contact", href: "/#contact" },
];

export default function NotFound() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#0a0a0a",
        color: "#f5f5f5",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "6rem 1.5rem",
      }}
    >
      <div style={{ maxWidth: "560px", width: "100%" }}>
        <div
          style={{
            fontSize: "0.7rem",
            fontWeight: 700,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#06b6d4",
            marginBottom: "1.25rem",
          }}
        >
          Error 404
        </div>

        <h1
          style={{
            fontSize: "clamp(2rem, 6vw, 3.5rem)",
            fontWeight: 800,
            lineHeight: 1.15,
            letterSpacing: "-0.02em",
            marginBottom: "1.25rem",
          }}
        >
          This page couldn&apos;t be found
        </h1>

        <p
          style={{
            color: "#a3a3a3",
            fontSize: "clamp(0.95rem, 2vw, 1.05rem)",
            lineHeight: 1.7,
            marginBottom: "2.5rem",
          }}
        >
          The page you&apos;re looking for may have moved or never existed. Try
          one of the links below to get back on track.
        </p>

        <nav
          style={{
            display: "flex",
            gap: "0.75rem",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              style={{
                border: "1px solid rgba(245,245,245,0.18)",
                borderRadius: "8px",
                padding: "0.75rem 1.5rem",
                color: "#f5f5f5",
                textDecoration: "none",
                fontSize: "0.9rem",
                fontWeight: 600,
                transition: "all 0.2s",
              }}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </main>
  );
}
