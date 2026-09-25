export const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;

/**
 * Custom event fired when someone books through the Acuity embed. Build the
 * custom conversion in Events Manager off this exact name. The browser pixel
 * and the Conversions API must both use it (plus a shared event_id) or Meta
 * won't dedupe them.
 */
export const BOOKING_EVENT_NAME = "AcuityBooking";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

/** Fires a custom (non-standard) pixel event, deduped with CAPI via eventId. */
export function fbTrackCustom(
  event: string,
  data: Record<string, unknown>,
  eventId: string
) {
  if (typeof window !== "undefined" && typeof window.fbq === "function") {
    window.fbq("trackCustom", event, data, { eventID: eventId });
  } else {
    // Usually an ad blocker or the pixel script failing to load — CAPI still lands.
    console.warn("[meta-pixel] fbq not available — browser event skipped");
  }
}
