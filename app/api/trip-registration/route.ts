import { neon } from "@neondatabase/serverless";
import { Resend } from "resend";
import { NextResponse } from "next/server";

const sql = neon(process.env.DATABASE_URL!);
const resend = new Resend(process.env.RESEND_API_KEY);

// ── Rate limiting ────────────────────────────────────────────────────
const rateLimitMap = new Map<string, { count: number; firstRequest: number }>();
const RATE_LIMIT_WINDOW = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS = 5;

const notificationEmails = ["Luismen29@gmail.com", "gamerpg08@gmail.com"];

// ── Validators ───────────────────────────────────────────────────────

function isValidEmail(email: string): boolean {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}

function isValidColombianPhone(phone: string): boolean {
  const cleanPhone = phone.replace(/[\s\-().]/g, "");
  const phoneRegex = /^3[0-9]{9}$/;
  return phoneRegex.test(cleanPhone);
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// ── POST handler ─────────────────────────────────────────────────────

export async function POST(request: Request) {
  try {
    const forwarded = request.headers.get("x-forwarded-for");
    const ip = forwarded ? forwarded.split(",")[0].trim() : "unknown";

    // Rate limiting
    const now = Date.now();
    const rateLimit = rateLimitMap.get(ip);
    if (rateLimit) {
      if (now - rateLimit.firstRequest < RATE_LIMIT_WINDOW) {
        if (rateLimit.count >= MAX_REQUESTS) {
          return NextResponse.json(
            {
              error:
                "Has excedido el límite de envios. Intenta de nuevo en 10 minutos.",
            },
            { status: 429 }
          );
        }
        rateLimit.count++;
      } else {
        rateLimitMap.set(ip, { count: 1, firstRequest: now });
      }
    } else {
      rateLimitMap.set(ip, { count: 1, firstRequest: now });
    }

    const body = await request.json();
    const {
      name,
      whatsapp,
      email,
      personas = 1,
      message = "",
      tripSlug,
      tripDest,
      dateId,
      dateRange,
      price,
    } = body;

    // Validate required fields
    if (!name?.trim() || !whatsapp?.trim() || !email?.trim()) {
      return NextResponse.json(
        { error: "Por favor completa todos los campos obligatorios." },
        { status: 400 }
      );
    }

    if (!tripSlug?.trim() || !dateId?.trim()) {
      return NextResponse.json(
        { error: "Selecciona un viaje y una fecha." },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: "Por favor ingresa un correo electrónico válido." },
        { status: 400 }
      );
    }

    if (!isValidColombianPhone(whatsapp)) {
      return NextResponse.json(
        {
          error:
            "Por favor ingresa un número de WhatsApp colombiano válido (10 dígitos, ej: 3001234567).",
        },
        { status: 400 }
      );
    }

    const safeName = name.trim();
    const safeWhatsapp = whatsapp.trim();
    const safeEmail = email.trim();
    const safePersonas = Math.min(Math.max(Number(personas) || 1, 1), 8);
    const safeMessage = String(message || "").trim();
    const safeTripSlug = String(tripSlug).trim();
    const safeTripDest = String(tripDest || "").trim();
    const safeDateId = String(dateId).trim();
    const safeDateRange = String(dateRange || "").trim();
    const safePrice = String(price || "").trim();

    // Insert into database
    const result = await sql`
      INSERT INTO trip_registrations (name, whatsapp, email, personas, message, trip_slug, trip_dest, date_id, date_range, price, ip_address, created_at)
      VALUES (${safeName}, ${safeWhatsapp}, ${safeEmail}, ${safePersonas}, ${safeMessage}, ${safeTripSlug}, ${safeTripDest}, ${safeDateId}, ${safeDateRange}, ${safePrice}, ${ip}, NOW())
      RETURNING id
    `;

    const registration = result[0];
    const cleanPhone = safeWhatsapp.replace(/[\s\-().]/g, "");

    const htmlName = escapeHtml(safeName);
    const htmlWhatsapp = escapeHtml(safeWhatsapp);
    const htmlEmail = escapeHtml(safeEmail);
    const htmlDest = escapeHtml(safeTripDest);
    const htmlDateRange = escapeHtml(safeDateRange);
    const htmlPrice = escapeHtml(safePrice);
    const htmlMessage = escapeHtml(safeMessage);
    const firstName = escapeHtml(safeName.split(" ")[0] || safeName);

    // Send notification email
    try {
      await resend.emails.send({
        from: "Luisito el Viajero <hola@luisito.com.co>",
        to: notificationEmails,
        subject: `Nueva inscripción — ${safeName} — Viaje a ${safeTripDest}`,
        html: `
        <div style="font-family: 'Inter', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f8faf9; padding: 40px 20px;">
          <div style="background: #0D1511; padding: 30px; border-radius: 16px 16px 0 0; text-align: center;">
            <h1 style="color: #FFFFFF; margin: 0; font-size: 22px; font-weight: 700; letter-spacing: -0.02em;">
              Nueva inscripción a viaje
            </h1>
            <p style="color: rgba(255,255,255,0.6); margin: 8px 0 0; font-size: 13px;">
              Luisito El Viajero · Viajes
            </p>
            <div style="margin-top: 16px; display: inline-block; background: #D4A574; color: #0D1511; padding: 8px 20px; border-radius: 50px; font-weight: 700; font-size: 14px;">
              ${htmlDest}
            </div>
          </div>

          <div style="background: white; padding: 30px; border-radius: 0 0 16px 16px; box-shadow: 0 4px 24px rgba(0,0,0,0.06);">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #E8F0EF; color: #6B7280; font-size: 12px; text-transform: uppercase; letter-spacing: 0.08em; width: 120px;">Nombre</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #E8F0EF; color: #1F1F1F; font-weight: 600;">${htmlName}</td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #E8F0EF; color: #6B7280; font-size: 12px; text-transform: uppercase; letter-spacing: 0.08em;">WhatsApp</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #E8F0EF;">
                  <a href="https://wa.me/57${cleanPhone}" style="color: #25D366; text-decoration: none; font-weight: 600;">${htmlWhatsapp}</a>
                </td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #E8F0EF; color: #6B7280; font-size: 12px; text-transform: uppercase; letter-spacing: 0.08em;">Email</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #E8F0EF;">
                  <a href="mailto:${safeEmail}" style="color: #1B4D5C; text-decoration: none; font-weight: 600;">${htmlEmail}</a>
                </td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #E8F0EF; color: #6B7280; font-size: 12px; text-transform: uppercase; letter-spacing: 0.08em;">Destino</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #E8F0EF; color: #B5763A; font-weight: 700;">${htmlDest}</td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #E8F0EF; color: #6B7280; font-size: 12px; text-transform: uppercase; letter-spacing: 0.08em;">Fecha</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #E8F0EF; color: #1F1F1F; font-weight: 600;">${htmlDateRange}</td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #E8F0EF; color: #6B7280; font-size: 12px; text-transform: uppercase; letter-spacing: 0.08em;">Precio</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #E8F0EF; color: #1F1F1F; font-weight: 600;">${htmlPrice}</td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: ${safeMessage ? "1px solid #E8F0EF" : "none"}; color: #6B7280; font-size: 12px; text-transform: uppercase; letter-spacing: 0.08em;">Personas</td>
                <td style="padding: 12px 0; border-bottom: ${safeMessage ? "1px solid #E8F0EF" : "none"}; color: #1F1F1F; font-weight: 600;">${safePersonas}</td>
              </tr>
              ${safeMessage ? `
              <tr>
                <td style="padding: 12px 0; color: #6B7280; font-size: 12px; text-transform: uppercase; letter-spacing: 0.08em; vertical-align: top;">Mensaje</td>
                <td style="padding: 12px 0; color: #1F1F1F;">${htmlMessage}</td>
              </tr>` : ""}
            </table>

            <div style="margin-top: 24px; padding: 20px; background: #F5F2ED; border-radius: 12px; text-align: center;">
              <p style="margin: 0 0 12px; color: #0D1511; font-weight: 600; font-size: 14px;">Contactar por WhatsApp</p>
              <a href="https://wa.me/57${cleanPhone}?text=Hola%20${encodeURIComponent(safeName)}%2C%20soy%20Luisito%20el%20Viajero.%20Recib%C3%AD%20tu%20inscripci%C3%B3n%20para%20el%20viaje%20a%20${encodeURIComponent(safeTripDest)}%20y%20quiero%20confirmar%20tu%20lugar."
                 style="display: inline-block; padding: 12px 28px; background: #0D1511; color: white; text-decoration: none; border-radius: 10px; font-weight: 700; font-size: 14px;">
                Escribir a ${firstName}
              </a>
            </div>
          </div>

          <p style="text-align: center; margin-top: 16px; color: #9CA3AF; font-size: 11px;">
            Inscripción #${registration.id} · ${new Date().toLocaleString("es-CO", { timeZone: "America/Bogota" })} · Luisito el Viajero
          </p>
        </div>
      `,
      });
    } catch (emailError) {
      console.error("Error enviando notificacion de inscripcion:", emailError);
    }

    return NextResponse.json({ success: true, id: registration.id });
  } catch (error) {
    console.error("Error en trip-registration API:", error);
    return NextResponse.json(
      {
        error:
          "Error al procesar tu inscripción. Por favor intenta de nuevo.",
      },
      { status: 500 }
    );
  }
}
