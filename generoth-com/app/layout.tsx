import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Gene Roth | Strategic Leadership Meets Technical Execution",
  description: "Former FAA Director. AI builder. Compliance strategist. Gene Roth merges deep federal regulatory expertise with hands-on artificial intelligence development.",
  keywords: ["Gene Roth", "FAA", "DBE", "ACDBE", "compliance", "AI", "airport consulting", "federal compliance", "aviation"],
  authors: [{ name: "Gene Roth" }],
  metadataBase: new URL("https://generoth.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Gene Roth | Strategic Leadership Meets Technical Execution",
    description: "Former FAA Director building AI-powered compliance tools.",
    url: "https://generoth.com",
    siteName: "GeneRoth.com",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gene Roth | Strategic Leadership Meets Technical Execution",
    description: "Former FAA Director. AI builder. Compliance strategist.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif" }}>
        {children}
      </body>
    </html>
  );
}
