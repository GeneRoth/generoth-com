// app/opengraph-image.tsx
//
// Renders the default Open Graph / Twitter card image for generoth.com.
// Next.js automatically wires this file as the og:image and twitter:image
// for every route that doesn't override it.
//
// Output: 1200x630 PNG, served at https://generoth.com/opengraph-image
//
// Docs: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/opengraph-image

import { ImageResponse } from "next/og";

// --- Required exports per Next.js metadata file convention ----------------
export const runtime = "edge";
export const alt =
  "Gene Roth — Federal Regulatory Expert, AI Builder, Compliance Strategist";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// --- Image -----------------------------------------------------------------
export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background:
            "linear-gradient(135deg, #0a0e1a 0%, #131a2d 50%, #1c2540 100%)",
          color: "#f5f7fb",
          fontFamily: "sans-serif",
        }}
      >
        {/* Top row: monogram + eyebrow */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 24,
          }}
        >
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 16,
              background:
                "linear-gradient(135deg, #4f8cff 0%, #2563eb 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 32,
              fontWeight: 700,
              color: "#ffffff",
              letterSpacing: -1,
            }}
          >
            GR
          </div>
          <div
            style={{
              fontSize: 22,
              color: "#9bb0d4",
              letterSpacing: 4,
              textTransform: "uppercase",
              fontWeight: 600,
            }}
          >
            generoth.com
          </div>
        </div>

        {/* Headline block */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 24,
          }}
        >
          <div
            style={{
              fontSize: 28,
              color: "#9bb0d4",
              fontWeight: 500,
              letterSpacing: 1,
            }}
          >
            Federal Regulatory Expert · AI Builder · Compliance Strategist
          </div>

          <div
            style={{
              fontSize: 76,
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: -2,
              color: "#ffffff",
              maxWidth: 1040,
              display: "flex",
            }}
          >
            Strategic Leadership Meets Technical Execution
          </div>

          <div
            style={{
              fontSize: 26,
              color: "#c8d3eb",
              fontWeight: 400,
              lineHeight: 1.4,
              maxWidth: 980,
              display: "flex",
            }}
          >
            15+ years of federal regulatory expertise, paired with hands-on AI
            development. Seven live tools in production.
          </div>
        </div>

        {/* Bottom row: credentials strip */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingTop: 32,
            borderTop: "1px solid rgba(155, 176, 212, 0.25)",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: 48,
              fontSize: 20,
              color: "#9bb0d4",
              fontWeight: 500,
              letterSpacing: 0.5,
            }}
          >
            <span>FAA · DOT</span>
            <span>DBE / ACDBE</span>
            <span>Title VI · ADA</span>
            <span>RAG · LLM · Agents</span>
          </div>
          <div
            style={{
              fontSize: 20,
              color: "#9bb0d4",
              fontWeight: 600,
              letterSpacing: 1,
            }}
          >
            Gene Roth
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
