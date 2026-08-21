"use client";

import { trackEvent } from "../lib/analytics";

const AEROVISTA_URL = "https://aerovista.us/?utm_source=cdafair&utm_medium=referral&utm_campaign=local_tools&utm_content=brand_badge";

export default function AeroVistaBranding() {
  return (
    <a
      href={AEROVISTA_URL}
      target="_blank"
      rel="noreferrer"
      aria-label="AeroVista Local — Built in Coeur d'Alene"
      onClick={() => trackEvent("brand_click", { placement: "persistent_badge", destination: "aerovista" })}
      style={{
        position: "fixed",
        right: 14,
        bottom: "calc(14px + env(safe-area-inset-bottom))",
        zIndex: 45,
        display: "flex",
        alignItems: "center",
        gap: 9,
        padding: "9px 12px",
        borderRadius: 999,
        border: "1px solid rgba(255,255,255,.11)",
        background: "rgba(12,15,21,.86)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        boxShadow: "0 8px 28px rgba(0,0,0,.28)",
        color: "#f7f7f2",
        textDecoration: "none",
        fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
      }}
      className="aerovistaBrandBadge"
    >
      <span
        aria-hidden="true"
        style={{
          width: 25,
          height: 25,
          display: "grid",
          placeItems: "center",
          borderRadius: 8,
          background: "linear-gradient(145deg, rgba(255,106,26,.22), rgba(255,178,63,.08))",
          border: "1px solid rgba(255,178,63,.28)",
          color: "#ffb23f",
          fontSize: 11,
          fontWeight: 900,
          letterSpacing: "-.03em"
        }}
      >
        AV
      </span>
      <span style={{ display: "flex", flexDirection: "column", lineHeight: 1.05 }}>
        <strong style={{ fontSize: 11, letterSpacing: ".055em", textTransform: "uppercase" }}>AeroVista Local</strong>
        <small style={{ marginTop: 4, color: "#8f97a4", fontSize: 9 }}>Built in Coeur d'Alene · ↗</small>
      </span>
      <style jsx>{`
        .aerovistaBrandBadge {
          transition: border-color .16s ease, background .16s ease, transform .16s ease;
        }
        .aerovistaBrandBadge:hover,
        .aerovistaBrandBadge:focus-visible {
          border-color: rgba(255,178,63,.38) !important;
          background: rgba(18,21,29,.96) !important;
          transform: translateY(-1px);
          outline: none;
        }
        @media (max-width: 760px) {
          .aerovistaBrandBadge {
            right: 10px !important;
            bottom: calc(78px + env(safe-area-inset-bottom)) !important;
            padding: 7px 9px !important;
          }
        }
        @media (max-width: 390px) {
          .aerovistaBrandBadge small { display: none; }
        }
        @media (prefers-reduced-motion: reduce) {
          .aerovistaBrandBadge { transition: none !important; }
        }
      `}</style>
    </a>
  );
}
