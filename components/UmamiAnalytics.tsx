"use client";

import { useEffect } from "react";

const DEFAULT_UMAMI_URL = "https://stats.aerocoreos.com";

export default function UmamiAnalytics() {
  useEffect(() => {
    const websiteId = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID?.trim();
    if (!websiteId) return;

    const url = (process.env.NEXT_PUBLIC_UMAMI_URL || DEFAULT_UMAMI_URL).replace(/\/$/, "");
    const allowedDomains = (process.env.NEXT_PUBLIC_UMAMI_DOMAINS || "")
      .split(",")
      .map((value) => value.trim().toLowerCase())
      .filter(Boolean);

    const { hostname, protocol, search } = window.location;

    if (protocol === "file:") return;
    if (["localhost", "127.0.0.1", "::1"].includes(hostname)) return;
    if (new URLSearchParams(search).get("no_analytics") === "1") return;
    if (allowedDomains.length && !allowedDomains.includes(hostname.toLowerCase())) return;
    if (document.querySelector("script[data-cdafair-umami]")) return;

    const script = document.createElement("script");
    script.async = true;
    script.defer = true;
    script.src = `${url}/script.js`;
    script.setAttribute("data-website-id", websiteId);
    script.setAttribute("data-cdafair-umami", "true");

    if (allowedDomains.length) {
      script.setAttribute("data-domains", allowedDomains.join(","));
    }

    document.head.appendChild(script);
  }, []);

  return null;
}
