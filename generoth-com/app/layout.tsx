import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://generoth.com"),
  title: {
    default: "Gene Roth Advisory, LLC | Federal Expertise · AI Execution",
    template: "%s | Gene Roth Advisory, LLC",
  },
  description: "AI-assisted regulatory compliance advisory for airports, prospective DBEs and ACDBEs, and engineering consultants. Founded by the former FAA Director of National External Operations, Compliance, and Policy.",
  keywords: ["DBE", "ACDBE", "49 CFR Part 26", "49 CFR Part 23", "Title VI", "ADA", "Section 504", "FAA", "airport compliance", "AI compliance", "regulatory advisory"],
  authors: [{ name: "Gene Roth" }],
  creator: "Gene Roth Advisory, LLC",
  publisher: "Gene Roth Advisory, LLC",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://generoth.com",
    siteName: "Gene Roth Advisory, LLC",
    title: "Gene Roth Advisory, LLC | Federal Expertise · AI Execution",
    description: "AI-assisted regulatory compliance advisory for airports, prospective DBEs and ACDBEs, and engineering consultants.",
    images: [
      {
        url: "/og-image-1200x630.png",
        width: 1200,
        height: 630,
        alt: "Gene Roth Advisory, LLC",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gene Roth Advisory, LLC",
    description: "Federal Expertise · AI Execution",
    images: ["/og-image-1200x630.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
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
