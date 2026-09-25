import { NextRequest, NextResponse } from "next/server";
import { sendCapiEvent } from "@/lib/meta-capi";
import { BOOKING_EVENT_NAME } from "@/lib/meta-pixel";

type BookingRequestBody = {
  eventId?: string;
  eventSourceUrl?: string;
  email?: string;
  phone?: string;
  firstName?: string;
  lastName?: string;
  value?: number;
  appointmentType?: string;
};

/** Server-side half of the Acuity booking conversion (see components/AcuityEmbed.tsx). */
export async function POST(request: NextRequest) {
  const body: BookingRequestBody = await request.json().catch(() => ({}));
  const { eventId, eventSourceUrl, email, phone, firstName, lastName, value, appointmentType } =
    body;

  // Event IDs are derived from the Acuity appointment ID; anything else isn't ours.
  if (!eventId || !/^acuity-[\w-]{1,64}$/.test(eventId)) {
    return NextResponse.json({ error: "Invalid eventId" }, { status: 400 });
  }

  try {
    await sendCapiEvent({
      eventName: BOOKING_EVENT_NAME,
      eventId,
      eventSourceUrl: eventSourceUrl || request.headers.get("referer") || request.url,
      email,
      phone,
      firstName,
      lastName,
      clientIp: request.headers.get("x-forwarded-for")?.split(",")[0]?.trim(),
      userAgent: request.headers.get("user-agent") ?? undefined,
      fbp: request.cookies.get("_fbp")?.value,
      fbc: request.cookies.get("_fbc")?.value,
      customData: {
        ...(typeof value === "number" ? { value, currency: "USD" } : {}),
        ...(appointmentType ? { appointment_type: appointmentType } : {}),
      },
    });
  } catch (err) {
    console.error("Meta Conversions API delivery failed:", err);
  }

  // Always succeed for the client: the booking already happened in Acuity.
  return NextResponse.json({ ok: true });
}
