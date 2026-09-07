// src/lib/analytics.ts

import { supabase } from "./supabase";

const VISITOR_KEY = "idealoop_visitor_id";
const SESSION_KEY = "idealoop_session_id";

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 12)}`;
}

export function getVisitorId(): string {
  let visitorId = localStorage.getItem(VISITOR_KEY);

  if (!visitorId) {
    visitorId = generateId();
    localStorage.setItem(VISITOR_KEY, visitorId);
  }

  return visitorId;
}

export function getSessionId(): string {
  let sessionId = sessionStorage.getItem(SESSION_KEY);

  if (!sessionId) {
    sessionId = generateId();
    sessionStorage.setItem(SESSION_KEY, sessionId);
  }

  return sessionId;
}

function getTrafficSource() {
  const params = new URLSearchParams(window.location.search);

  const utmSource = params.get("utm_source");
  const utmMedium = params.get("utm_medium");
  const utmCampaign = params.get("utm_campaign");

  // Save UTM information for the visitor's browsing session
  if (utmSource) {
    sessionStorage.setItem("idealoop_utm_source", utmSource);
  }

  if (utmMedium) {
    sessionStorage.setItem("idealoop_utm_medium", utmMedium);
  }

  if (utmCampaign) {
    sessionStorage.setItem("idealoop_utm_campaign", utmCampaign);
  }

  let source =
    utmSource ||
    sessionStorage.getItem("idealoop_utm_source");

  let medium =
    utmMedium ||
    sessionStorage.getItem("idealoop_utm_medium");

  let campaign =
    utmCampaign ||
    sessionStorage.getItem("idealoop_utm_campaign");

  // If there is no UTM source, try the referring website
  if (!source) {
    const referrer = document.referrer;

    if (referrer) {
      try {
        const hostname = new URL(referrer).hostname.toLowerCase();

        if (hostname.includes("pinterest")) {
          source = "pinterest";
          medium = "social";
        } else if (hostname.includes("facebook")) {
          source = "facebook";
          medium = "social";
        } else if (hostname.includes("instagram")) {
          source = "instagram";
          medium = "social";
        } else if (hostname.includes("tiktok")) {
          source = "tiktok";
          medium = "social";
        } else if (hostname.includes("youtube")) {
          source = "youtube";
          medium = "social";
        } else if (hostname.includes("google")) {
          source = "google";
          medium = "organic";
        } else {
          source = "other";
          medium = "referral";
        }
      } catch {
        source = "other";
        medium = "referral";
      }
    } else {
      source = "direct";
      medium = "direct";
    }
  }

  return {
    source: source || "direct",
    medium: medium || "direct",
    campaign: campaign || null,
  };
}

export async function trackEvent({
  eventType,
  product,
}: {
  eventType: string;
  product?: {
    product_id?: string;
    title?: string;
    marketplace?: string;
    department?: string;
    category?: string;
    subcategory?: string;
  };
}) {
  try {
    const traffic = getTrafficSource();

    await supabase.from("analytics_events").insert({
      event_type: eventType,

      visitor_id: getVisitorId(),
      session_id: getSessionId(),

      product_id: product?.product_id || null,
      product_name: product?.title || null,
      marketplace: product?.marketplace || null,

      department: product?.department || null,
      category: product?.category || null,
      subcategory: product?.subcategory || null,

      source: traffic.source,
      medium: traffic.medium,
      campaign: traffic.campaign,

      page_url: window.location.href,
    });
  } catch (error) {
    // Analytics should never stop the website from working
    console.error("Analytics tracking error:", error);
  }
}