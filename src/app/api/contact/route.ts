import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Configure via environment variables for security.
// Required: SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_TO
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT || 587),
  secure: Boolean(process.env.SMTP_SECURE === "true"),
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

async function sendViaBrevo(params: {
  name: string;
  email: string;
  subject: string;
  message: string;
  to: string;
}) {
  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) throw new Error("BREVO_API_KEY not set");

  // Derive a sender from env (must be a verified sender in Brevo)
  const fromEnv = process.env.SMTP_FROM || `Portfolio Contact <${process.env.SMTP_USER || "no-reply@example.com"}>`;
  const match = fromEnv.match(/^(.*)<(.+)>$/);
  const senderName = match ? match[1].replace(/"/g, "").trim() : "Portfolio Contact";
  const senderEmail = match ? match[2].trim() : process.env.SMTP_USER || "no-reply@example.com";

  const res = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      "accept": "application/json",
      "content-type": "application/json",
      "api-key": apiKey,
    },
    body: JSON.stringify({
      sender: { name: senderName, email: senderEmail },
      to: [{ email: params.to }],
      replyTo: { email: params.email, name: params.name },
      subject: params.subject || "Portfolio Contact",
      textContent: `Name: ${params.name}\nEmail: ${params.email}\n\n${params.message}`,
      htmlContent: `<p><strong>Name:</strong> ${params.name}</p>
        <p><strong>Email:</strong> ${params.email}</p>
        <p><strong>Message:</strong></p>
        <p>${params.message.replace(/\n/g, "<br/>")}</p>`
    }),
  });

  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`Brevo send failed: ${res.status} ${txt}`);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, subject, message } = body as {
      name?: string;
      email?: string;
      subject?: string;
      message?: string;
    };

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "Missing required fields." },
        { status: 400 }
      );
    }

    const to = process.env.CONTACT_TO || "myalghani@gmail.com";

    // Prefer Brevo HTTP API if key is present; fallback to SMTP
    if (process.env.BREVO_API_KEY) {
      await sendViaBrevo({ name, email, subject, message, to });
    } else {
      const mailOptions = {
        from: process.env.SMTP_FROM || `Portfolio Contact <${process.env.SMTP_USER}>`,
        to,
        replyTo: email,
        subject: subject || "Portfolio Contact",
        text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
        html: `<p><strong>Name:</strong> ${name}</p>
               <p><strong>Email:</strong> ${email}</p>
               <p><strong>Message:</strong></p>
               <p>${message.replace(/\n/g, "<br/>")}</p>`,
      } as const;
      await transporter.sendMail(mailOptions);
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("/api/contact error", err);
    return NextResponse.json(
      { error: "Failed to send message." },
      { status: 500 }
    );
  }
}

// Quick SMTP health check: GET /api/contact
export async function GET() {
  try {
    if (process.env.BREVO_API_KEY) {
      const res = await fetch("https://api.brevo.com/v3/account", {
        headers: {
          "accept": "application/json",
          "api-key": process.env.BREVO_API_KEY,
        },
      });
      if (!res.ok) {
        const txt = await res.text();
        return NextResponse.json({ ok: false, error: `Brevo: ${res.status} ${txt}` }, { status: 500 });
      }
      return NextResponse.json({ ok: true });
    }
    await transporter.verify();
    return NextResponse.json({ ok: true });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ ok: false, error: msg }, { status: 500 });
  }
}
