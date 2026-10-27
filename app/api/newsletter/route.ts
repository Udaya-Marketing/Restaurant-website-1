import { NextResponse } from "next/server";
import { newsletterSchema } from "@/lib/reservation-schema";

export async function POST(request: Request) {
  const payload: unknown = await request.json().catch(() => null);
  const parsed = newsletterSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json({ message: "Enter a valid email address." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const audienceId = process.env.RESEND_AUDIENCE_ID;
  if (!apiKey || !audienceId) {
    return NextResponse.json({ message: "The mailing list is temporarily unavailable. Please try again later." }, { status: 503 });
  }

  let response: Response;
  try {
    response = await fetch(`https://api.resend.com/audiences/${encodeURIComponent(audienceId)}/contacts`, {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        email: parsed.data.email,
        unsubscribed: false,
      }),
      cache: "no-store",
    });
  } catch (error) {
    console.error("Newsletter signup could not reach the mailing-list provider.", error);
    return NextResponse.json({ message: "We couldn’t add you just now. Please try again." }, { status: 502 });
  }

  if (response.status === 409) {
    return NextResponse.json({ message: "You’re already on the list. Watch your inbox for the good stuff." });
  }
  if (!response.ok) {
    console.error("Newsletter mailing-list provider rejected the signup.", { status: response.status });
    return NextResponse.json({ message: "We couldn’t add you just now. Please try again." }, { status: 502 });
  }
  return NextResponse.json({ message: "You’re on the list. Watch your inbox for the good stuff." });
}
