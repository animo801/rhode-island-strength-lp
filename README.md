# Rhode Island Strength — Landing Page

Next.js + Tailwind site
with an embedded Acuity scheduler. Bookings made in the embed fire a Meta
custom event, **`AcuityBooking`**, through both the browser Pixel and the
Conversions API, deduped by a shared `event_id`.

- `/` — home page
- `/lp` — ad landing page (Clarity Call)

Both end in the Acuity booking embed, so bookings from either page fire the event.

```bash
npm install
cp .env.example .env.local   # fill in values
npm run dev
```

## How the booking conversion works

1. `components/AcuityEmbed.tsx` renders the Acuity iframe and listens for `postMessage`.
2. Acuity runs `acuity/conversion-tracking-snippet.html` on its confirmation
   screen, which posts the appointment ID, email, name, phone, price and type up to the page.
3. The page fires `fbq('trackCustom', 'AcuityBooking', …, { eventID: 'acuity-<appointmentId>' })`
   and POSTs the same event to `/api/meta-event`, which sends it to the
   Conversions API with hashed email/phone/name, `_fbp`/`_fbc`, IP and user agent.

## Setup checklist

1. **Env vars** (in `.env.local` and in Vercel → Settings → Environment Variables):
   - `NEXT_PUBLIC_META_PIXEL_ID`
   - `META_CAPI_ACCESS_TOKEN`
   - `NEXT_PUBLIC_ACUITY_SCHEDULER_URL`: optional; the Clarity Call scheduler (owner 21447693, appointmentType 18913081) is built in
   - `META_TEST_EVENT_CODE`: optional, only while testing
2. **Acuity:** Integrations → Custom Conversion Tracking → paste the contents of
   `acuity/conversion-tracking-snippet.html`.
3. **Meta Events Manager:** after one test booking shows up, create a Custom
   Conversion with the rule *Event = AcuityBooking*.

## Testing

Set `META_TEST_EVENT_CODE`, open Events Manager → Test events, and make a
booking through the embed. You should see `AcuityBooking` arrive from both
**Browser** and **Server**, marked as deduplicated. Remove the test code when done.
