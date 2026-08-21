import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "CDA Fair Day — Going to the Fair? Check this first.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background: "radial-gradient(circle at 85% 20%, #5c2715 0%, #12131a 38%, #080a0f 72%)",
          color: "#f7f7f2",
          fontFamily: "Arial, sans-serif"
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", fontSize: 27, fontWeight: 800, letterSpacing: "0.06em" }}>🎡 CDA FAIR DAY</div>
          <div style={{ display: "flex", fontSize: 20, color: "#ffb23f", fontWeight: 700 }}>AUG 21–30 · 2026</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", maxWidth: 940 }}>
          <div style={{ display: "flex", fontSize: 25, color: "#ffb23f", fontWeight: 800, letterSpacing: "0.08em", marginBottom: 18 }}>
            NORTH IDAHO STATE FAIR · UNOFFICIAL COMMUNITY GUIDE
          </div>
          <div style={{ display: "flex", flexDirection: "column", fontSize: 82, lineHeight: 0.95, fontWeight: 900, letterSpacing: "-0.045em" }}>
            <span>Going to the Fair?</span>
            <span style={{ color: "#b7bac4" }}>Check this first.</span>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "1px solid rgba(255,255,255,.18)", paddingTop: 28 }}>
          <div style={{ display: "flex", fontSize: 25 }}>Today's deals · What's next · Parking · Plan your day</div>
          <div style={{ display: "flex", fontSize: 20, color: "#aeb3bd" }}>Made in Coeur d'Alene · AeroVista</div>
        </div>
      </div>
    ),
    size
  );
}
