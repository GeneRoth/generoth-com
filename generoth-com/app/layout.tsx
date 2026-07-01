import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";

const GA_ID = "G-E8ZPZ0VT2T";

const SITE_DESCRIPTION =
  "AI-assisted regulatory compliance advisory for airports, DBEs/ACDBEs, and engineering consultants — led by a former FAA compliance director.";

const KNOWS_ABOUT = [
  "DBE certification",
  "ACDBE certification",
  "49 CFR Part 26",
  "49 CFR Part 23",
  "Title VI compliance",
  "ADA / Section 504 accessibility",
  "FAA airport compliance",
  "AI compliance tools",
  "RAG systems",
];

const JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfessionalService",
      "@id": "https://generoth.com/#organization",
      name: "Gene Roth Advisory, LLC",
      url: "https://generoth.com/",
      description: SITE_DESCRIPTION,
      founder: { "@id": "https://generoth.com/#gene" },
      email: "gene@generoth.com",
      areaServed: "United States",
      address: {
        "@type": "PostalAddress",
        addressRegion: "GA",
        addressCountry: "US",
      },
      logo: "https://generoth.com/og-image-1200x630.png",
      image: "https://generoth.com/og-image-1200x630.png",
      knowsAbout: KNOWS_ABOUT,
      sameAs: ["https://linkedin.com/in/generoth"],
    },
    {
      "@type": "Person",
      "@id": "https://generoth.com/#gene",
      name: "Gene Roth",
      jobTitle: "Founder & Principal",
      worksFor: { "@id": "https://generoth.com/#organization" },
      description:
        "Former FAA Director of National External Operations, Policy & Compliance Programs.",
      sameAs: ["https://linkedin.com/in/generoth"],
      knowsAbout: KNOWS_ABOUT,
    },
  ],
};

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
  description: "AI-assisted regulatory compliance advisory for airports, DBEs/ACDBEs, and engineering consultants — led by a former FAA compliance director.",
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
    siteName: "Gene Roth Advisory, LLC",
    title: "Gene Roth Advisory, LLC | Federal Expertise · AI Execution",
    description: "AI-assisted regulatory compliance advisory for airports, DBEs/ACDBEs, and engineering consultants — led by a former FAA compliance director.",
    // og:image comes from the generated app/opengraph-image.tsx (1200x630, with
    // its own alt); twitter:image inherits the same generated image below.
  },
  twitter: {
    card: "summary_large_image",
    title: "Gene Roth Advisory, LLC",
    description: "AI-assisted regulatory compliance advisory for airports, DBEs/ACDBEs, and engineering consultants — led by a former FAA compliance director.",
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
        {/* Canonical and og:url are emitted explicitly (not via metadata
            alternates/openGraph.url) so the root trailing slash is preserved.
            Next normalizes those fields and strips the trailing slash, which
            would leave these URL signals mismatched against the sitemap. */}
        <link rel="canonical" href="https://generoth.com/" />
        <meta property="og:url" content="https://generoth.com/" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
        />
      </head>
      <body style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif" }}>
        {children}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_ID}');
            `,
          }}
        />
      </body>
    </html>
  );
}
