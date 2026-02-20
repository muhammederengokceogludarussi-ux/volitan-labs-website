import { NextRequest, NextResponse } from "next/server";

const TURNSTILE_SECRET = process.env.TURNSTILE_SECRET_KEY;
const CONTACT_EMAIL = process.env.CONTACT_EMAIL || "eren.gokceoglu@metu.edu.tr";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, subject, message, token, honeypot } = body;

    // Honeypot check — bots fill this, humans don't see it
    if (honeypot) {
      return NextResponse.json({ success: true });
    }

    // Basic validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    // Cloudflare Turnstile verification
    if (TURNSTILE_SECRET && token) {
      const turnstileRes = await fetch(
        "https://challenges.cloudflare.com/turnstile/v0/siteverify",
        {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams({
            secret: TURNSTILE_SECRET,
            response: token,
          }),
        }
      );

      const turnstileData = await turnstileRes.json();
      if (!turnstileData.success) {
        return NextResponse.json(
          { error: "Verification failed" },
          { status: 400 }
        );
      }
    }

    // Send email via Resend (lazy init to avoid build-time crash)
    if (process.env.RESEND_API_KEY) {
      const { Resend } = await import("resend");
      const resend = new Resend(process.env.RESEND_API_KEY);
      await resend.emails.send({
        from: "Volitan Labs <onboarding@resend.dev>",
        to: CONTACT_EMAIL,
        replyTo: email,
        subject: `[Volitan Labs] ${subject || "Contact Form"}`,
        html: `
          <h2>New Contact Form Message</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject || "N/A"}</p>
          <hr />
          <p>${message.replace(/\n/g, "<br />")}</p>
        `,
      });
    } else {
      // Fallback: log to console in development
      console.log("Contact form submission:", { name, email, subject, message });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
