import { neon } from "@neondatabase/serverless";
import { Resend } from "resend";
import { NextResponse } from "next/server";

const sql = neon(process.env.DATABASE_URL!);
const resend = new Resend(process.env.RESEND_API_KEY);

// Rate limiting en memoria
const rateLimitMap = new Map<string, { count: number; firstRequest: number }>();
const RATE_LIMIT_WINDOW = 10 * 60 * 1000; // 10 minutos
const MAX_REQUESTS = 3;

const VALID_SERVICES = [
  "recorridos-360",
  "contenido-viral",
  "ia-automatizacion",
  "paginas-web",
  "viajes",
  "pauta",
];

const SERVICE_LABELS: Record<string, string> = {
  "recorridos-360": "Recorridos 360°",
  "contenido-viral": "Creación de contenido",
  "ia-automatizacion": "IA automatización",
  "paginas-web": "Página web / landing",
  viajes: "Viajes",
  pauta: "Pauta conmigo",
};

const notificationEmails = ["Luismen29@gmail.com", "gamerpg08@gmail.com"];

function isValidEmail(email: string): boolean {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}

function isValidColombianPhone(phone: string): boolean {
  const cleanPhone = phone.replace(/[\s\-\(\)\.]/g, "");
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
            { error: "Has excedido el límite de envíos. Intenta de nuevo en 10 minutos." },
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
    const { name, whatsapp, email, business, service = "", message = "" } = body;

    // Validar campos requeridos
    if (!name?.trim() || !whatsapp?.trim() || !email?.trim() || !business?.trim()) {
      return NextResponse.json(
        { error: "Por favor completa todos los campos obligatorios." },
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
        { error: "Por favor ingresa un número de WhatsApp colombiano válido (10 dígitos, ej: 3001234567)." },
        { status: 400 }
      );
    }

    if (!service || !VALID_SERVICES.includes(service)) {
      return NextResponse.json(
        { error: "Selecciona un servicio valido." },
        { status: 400 }
      );
    }

    const safeName = name.trim();
    const safeWhatsapp = whatsapp.trim();
    const safeEmail = email.trim();
    const safeBusiness = business.trim();
    const safeService = service.trim();
    const safeMessage = String(message || "").trim();

    const result = await sql`
      INSERT INTO leads (name, whatsapp, email, business, service, message, ip_address, created_at)
      VALUES (${safeName}, ${safeWhatsapp}, ${safeEmail}, ${safeBusiness}, ${safeService}, ${safeMessage}, ${ip}, NOW())
      RETURNING id, created_at
    `;

    const lead = result[0];
    const serviceLabel = SERVICE_LABELS[safeService] || safeService;
    const cleanPhone = safeWhatsapp.replace(/[\s\-\(\)\.]/g, "");

    const htmlName = escapeHtml(safeName);
    const htmlWhatsapp = escapeHtml(safeWhatsapp);
    const htmlEmail = escapeHtml(safeEmail);
    const htmlBusiness = escapeHtml(safeBusiness);
    const htmlServiceLabel = escapeHtml(serviceLabel);
    const htmlMessage = escapeHtml(safeMessage);
    const firstName = escapeHtml(safeName.split(" ")[0] || safeName);

    try {
      await resend.emails.send({
        from: "Luisito el Viajero <hola@luisito.com.co>",
        to: notificationEmails,
        subject: `Nuevo lead — ${safeName} — ${serviceLabel}`,
        html: `
        <div style="font-family: 'Inter', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f8faf9; padding: 40px 20px;">
          <div style="background: #1B4D5C; padding: 30px; border-radius: 16px 16px 0 0; text-align: center;">
            <h1 style="color: #E8F0EF; margin: 0; font-size: 22px; font-weight: 700; letter-spacing: -0.02em;">
              Nuevo lead recibido
            </h1>
            <p style="color: rgba(232,240,239,0.7); margin: 8px 0 0; font-size: 13px;">
              Luisito El Viajero · Landing de servicios
            </p>
            <div style="margin-top: 16px; display: inline-block; background: #E8F0EF; color: #1B4D5C; padding: 8px 20px; border-radius: 50px; font-weight: 700; font-size: 14px;">
              ${htmlServiceLabel}
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
                <td style="padding: 12px 0; border-bottom: 1px solid #E8F0EF; color: #6B7280; font-size: 12px; text-transform: uppercase; letter-spacing: 0.08em;">Negocio</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #E8F0EF; color: #1F1F1F; font-weight: 600;">${htmlBusiness}</td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: ${safeMessage ? "1px solid #E8F0EF" : "none"}; color: #6B7280; font-size: 12px; text-transform: uppercase; letter-spacing: 0.08em;">Servicio</td>
                <td style="padding: 12px 0; border-bottom: ${safeMessage ? "1px solid #E8F0EF" : "none"}; color: #1B4D5C; font-weight: 700;">${htmlServiceLabel}</td>
              </tr>
              ${safeMessage ? `
              <tr>
                <td style="padding: 12px 0; color: #6B7280; font-size: 12px; text-transform: uppercase; letter-spacing: 0.08em; vertical-align: top;">Mensaje</td>
                <td style="padding: 12px 0; color: #1F1F1F;">${htmlMessage}</td>
              </tr>` : ""}
            </table>

            <div style="margin-top: 24px; padding: 20px; background: #E8F0EF; border-radius: 12px; text-align: center;">
              <p style="margin: 0 0 12px; color: #1B4D5C; font-weight: 600; font-size: 14px;">Contactar por WhatsApp</p>
              <a href="https://wa.me/57${cleanPhone}?text=Hola%20${encodeURIComponent(safeName)}%2C%20soy%20Luisito%20el%20Viajero.%20Vi%20tu%20solicitud%20sobre%20${encodeURIComponent(serviceLabel)}%20y%20me%20gustaria%20hablar%20contigo."
                 style="display: inline-block; padding: 12px 28px; background: #1B4D5C; color: white; text-decoration: none; border-radius: 10px; font-weight: 700; font-size: 14px;">
                Escribir a ${firstName}
              </a>
            </div>
          </div>

          <p style="text-align: center; margin-top: 16px; color: #9CA3AF; font-size: 11px;">
            Lead #${lead.id} · ${new Date().toLocaleString("es-CO", { timeZone: "America/Bogota" })} · Luisito el Viajero
          </p>
        </div>
      `,
      });
    } catch (emailError) {
      console.error("Error enviando notificacion de lead:", emailError);
    }

    return NextResponse.json({ success: true, id: lead.id });
  } catch (error) {
    console.error("Error en leads API:", error);
    return NextResponse.json(
      { error: "Error al procesar tu solicitud. Por favor intenta de nuevo." },
      { status: 500 }
    );
  }
}
