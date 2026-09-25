"use client";

import Script from "next/script";
import { useEffect } from "react";
import { BOOKING_EVENT_NAME, fbTrackCustom } from "@/lib/meta-pixel";

/** Rhode Island Strength's Acuity scheduler, locked to the Clarity Call appointment type; NEXT_PUBLIC_ACUITY_SCHEDULER_URL overrides it. */
const SCHEDULER_URL =
  process.env.NEXT_PUBLIC_ACUITY_SCHEDULER_URL ||
  "https://app.acuityscheduling.com/schedule.php?owner=21447693&appointmentType=18913081";

/** Must match `source` in acuity/conversion-tracking-snippet.html. */
const MESSAGE_SOURCE = "acuity-booking";

type AcuityBookingMessage = {
  source: typeof MESSAGE_SOURCE;
  id?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  price?: string;
  appointmentType?: string;
};

function isBookingMessage(data: unknown): data is AcuityBookingMessage {
  return (
    typeof data === "object" &&
    data !== null &&
    (data as { source?: unknown }).source === MESSAGE_SOURCE
  );
}

/** Acuity leaves unsupported placeholders untouched (e.g. "%price%") — treat those as empty. */
function clean(value?: string) {
  const v = value?.trim();
  return v && !/^%.*%$/.test(v) ? v : undefined;
}

/**
 * The conversion snippet runs inside Acuity's sandboxed confirmation frame,
 * which posts with an opaque ("null") origin, so accept that alongside
 * Acuity's own domains.
 */
function isTrustedOrigin(origin: string) {
  if (origin === "null") return true;
  try {
    const host = new URL(origin).hostname;
    return (
      host.endsWith("acuityscheduling.com") ||
      host.endsWith("as.me") ||
      host.endsWith("squarespacescheduling.com") ||
      host === new URL(SCHEDULER_URL).hostname
    );
  } catch {
    return false;
  }
}

function alreadyTracked(eventId: string) {
  try {
    const key = `tracked:${eventId}`;
    if (sessionStorage.getItem(key)) return true;
    sessionStorage.setItem(key, "1");
  } catch {
    // Storage blocked — fall through; Meta still dedupes on event_id.
  }
  return false;
}

/**
 * Acuity scheduler iframe. When a booking completes, Acuity's custom
 * conversion tracking snippet (acuity/conversion-tracking-snippet.html)
 * posts the appointment details up to this page, and we fire
 * BOOKING_EVENT_NAME through both the browser pixel and the Conversions API
 * with a shared event_id (derived from the Acuity appointment ID) so Meta
 * counts it once.
 */
export default function AcuityEmbed() {
  useEffect(() => {
    function onMessage(e: MessageEvent) {
      if (!isTrustedOrigin(e.origin) || !isBookingMessage(e.data)) return;

      const id = clean(e.data.id);
      if (!id) return;
      const eventId = `acuity-${id.replace(/[^\w-]/g, "")}`;
      if (alreadyTracked(eventId)) return;

      const price = Number.parseFloat(clean(e.data.price) ?? "");
      const value = Number.isFinite(price) ? price : undefined;
      const appointmentType = clean(e.data.appointmentType);

      fbTrackCustom(
        BOOKING_EVENT_NAME,
        {
          ...(value !== undefined ? { value, currency: "USD" } : {}),
          ...(appointmentType ? { appointment_type: appointmentType } : {}),
        },
        eventId
      );

      fetch("/api/meta-event", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        keepalive: true,
        body: JSON.stringify({
          eventId,
          eventSourceUrl: window.location.href,
          email: clean(e.data.email),
          phone: clean(e.data.phone),
          firstName: clean(e.data.firstName),
          lastName: clean(e.data.lastName),
          value,
          appointmentType,
        }),
      }).catch((err) => console.error("[meta-capi] request failed", err));
    }

    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  return (
    <>
      <iframe
        src={SCHEDULER_URL}
        title="Schedule Appointment"
        width="100%"
        height="800"
        allow="payment"
        className="w-full border-0 bg-white"
      />
      {/* Acuity's resizer: grows the iframe to fit each step of the scheduler. */}
      <Script src="https://embed.acuityscheduling.com/js/embed.js" strategy="afterInteractive" />
    </>
  );
}
