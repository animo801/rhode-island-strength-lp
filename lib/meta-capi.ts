import crypto from "crypto";

const GRAPH_API_VERSION = "v23.0";

function sha256(value: string) {
  return crypto.createHash("sha256").update(value.trim().toLowerCase()).digest("hex");
}

function hashed(value?: string) {
  return value ? [sha256(value)] : undefined;
}

export type CapiEvent = {
  eventName: string;
  eventId: string;
  eventSourceUrl: string;
  email?: string;
  phone?: string;
  firstName?: string;
  lastName?: string;
  clientIp?: string;
  userAgent?: string;
  fbp?: string;
  fbc?: string;
  customData?: Record<string, unknown>;
};

/**
 * Sends a server-side event to Meta's Conversions API. Uses the same event
 * name and event_id as the browser pixel call so Meta deduplicates the two.
 * Requires NEXT_PUBLIC_META_PIXEL_ID and META_CAPI_ACCESS_TOKEN.
 */
export async function sendCapiEvent(event: CapiEvent) {
  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;
  const accessToken = process.env.META_CAPI_ACCESS_TOKEN;

  if (!pixelId || !accessToken) {
    console.warn(
      "Meta Conversions API is not configured (missing NEXT_PUBLIC_META_PIXEL_ID or META_CAPI_ACCESS_TOKEN); skipping server-side event."
    );
    return { skipped: true };
  }

  const digitsOnlyPhone = event.phone?.replace(/\D/g, "");

  const body = {
    data: [
      {
        event_name: event.eventName,
        event_time: Math.floor(Date.now() / 1000),
        event_id: event.eventId,
        event_source_url: event.eventSourceUrl,
        action_source: "website",
        user_data: {
          em: hashed(event.email),
          ph: hashed(digitsOnlyPhone),
          fn: hashed(event.firstName),
          ln: hashed(event.lastName),
          client_ip_address: event.clientIp,
          client_user_agent: event.userAgent,
          fbp: event.fbp,
          fbc: event.fbc,
        },
        custom_data: event.customData,
      },
    ],
    access_token: accessToken,
    ...(process.env.META_TEST_EVENT_CODE
      ? { test_event_code: process.env.META_TEST_EVENT_CODE }
      : {}),
  };

  const res = await fetch(`https://graph.facebook.com/${GRAPH_API_VERSION}/${pixelId}/events`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    throw new Error(`Meta Conversions API error: ${res.status} ${await res.text()}`);
  }

  return res.json();
}
