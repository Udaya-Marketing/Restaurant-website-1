import { NextResponse } from "next/server";
import { reservationSchema } from "@/lib/reservation-schema";

export async function POST(request: Request) {
  const payload: unknown = await request.json().catch(() => null);
  const parsed = reservationSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json({ message: "Please check the reservation details and try again.", errors: parsed.error.flatten().fieldErrors }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.RESERVATION_TO_EMAIL;
  const from = process.env.MAIL_FROM_EMAIL;
  if (!apiKey || !to || !from) {
    return NextResponse.json({ message: "Reservations are temporarily unavailable. Please call us at +1 (512) 555-0148." }, { status: 503 });
  }

  const { name, email, phone, date, time, guests, message } = parsed.data;
  let response: Response;
  try {
    response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject: `Reservation request: ${name} · ${date} at ${time}`,
        text: [
          `Name: ${name}`,
          `Email: ${email}`,
          `Phone: ${phone}`,
          `Date and time: ${date} at ${time}`,
          `Guests: ${guests}`,
          `Notes: ${message || "None"}`,
        ].join("\n"),
      }),
      cache: "no-store",
    });
  } catch (error) {
    console.error("Reservation notification could not reach the email provider.", error);
    return NextResponse.json({ message: "We couldn’t send your request just now. Please call us or try again." }, { status: 502 });
  }

  if (!response.ok) {
    console.error("Reservation email provider rejected the request.", { status: response.status });
    return NextResponse.json({ message: "We couldn’t confirm your request just now. Please call us or try again." }, { status: 502 });
  }
  return NextResponse.json({ message: "Your reservation request is in. We’ll be in touch soon." });
}
