import { neon } from "@neondatabase/serverless";
import { Resend } from "resend";
import { NextResponse } from "next/server";

const sql = neon(process.env.DATABASE_URL!);
const resend = new Resend(process.env.RESEND_API_KEY);

// Rate limiting en memoria (se reinicia con cada deploy)
const rateLimitMap = new Map<string, { count: number; firstRequest: number }>();
const RATE_LIMIT_WINDOW = 10 * 60 * 1000; // 10 minutos
const MAX_REQUESTS = 3; // máximo 3 registros por ventana

// Validación de email
function isValidEmail(email: string): boolean {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}

// Validación de teléfono colombiano
function isValidColombianPhone(phone: string): boolean {
  // Limpiar espacios y caracteres especiales
  const cleanPhone = phone.replace(/[\s\-\(\)\.]/g, "");
  // Número colombiano: 10 dígitos, empieza con 3
  const phoneRegex = /^3[0-9]{9}$/;
  return phoneRegex.test(cleanPhone);
}

export async function POST(request: Request) {
  try {
    // Obtener IP del cliente para rate limiting
    const forwarded = request.headers.get("x-forwarded-for");
    const ip = forwarded ? forwarded.split(",")[0].trim() : "unknown";
    
    // Verificar rate limit
    const now = Date.now();
    const rateLimit = rateLimitMap.get(ip);
    
    if (rateLimit) {
      if (now - rateLimit.firstRequest < RATE_LIMIT_WINDOW) {
        if (rateLimit.count >= MAX_REQUESTS) {
          return NextResponse.json(
            { error: "Has excedido el límite de registros. Intenta de nuevo en 10 minutos." },
            { status: 429 }
          );
        }
        rateLimit.count++;
      } else {
        // Reiniciar ventana
        rateLimitMap.set(ip, { count: 1, firstRequest: now });
      }
    } else {
      rateLimitMap.set(ip, { count: 1, firstRequest: now });
    }

    const formData = await request.formData();

    const nombre = formData.get("nombre") as string;
    const apellido = formData.get("apellido") as string;
    const whatsapp = formData.get("whatsapp") as string;
    const email = formData.get("email") as string;
    const fecha_viaje = formData.get("fecha_viaje") as string;
    const tratamiento_datos = formData.get("tratamiento_datos") === "on";

    // Validar campos requeridos
    if (!nombre || !apellido || !whatsapp || !email || !fecha_viaje) {
      return NextResponse.json(
        { error: "Todos los campos son requeridos" },
        { status: 400 }
      );
    }

    // Validar formato de email
    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: "Por favor ingresa un correo electrónico válido" },
        { status: 400 }
      );
    }

    // Validar teléfono colombiano
    if (!isValidColombianPhone(whatsapp)) {
      return NextResponse.json(
        { error: "Por favor ingresa un número de WhatsApp colombiano válido (10 dígitos, ej: 3001234567)" },
        { status: 400 }
      );
    }

    // Guardar en Neon DB
    const result = await sql`
      INSERT INTO registros (nombre, apellido, whatsapp, email, tratamiento_datos, created_at)
      VALUES (${nombre}, ${apellido}, ${whatsapp}, ${email}, ${tratamiento_datos}, NOW())
      RETURNING id, created_at
    `;

    const registro = result[0];

    // Enviar notificación por email con Resend
    const notificationEmails = [
      "Luismen29@gmail.com",
      "gamerpg08@gmail.com"
    ];
    
    const emailResult = await resend.emails.send({
      from: "Luisito el Viajero <hola@luisito.com.co>",
      to: notificationEmails,
      subject: `🎉 Nuevo registro - ${nombre} ${apellido} - ${fecha_viaje}`,
      html: `
        <div style="font-family: 'Inter', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f8fafc; padding: 40px 20px;">
          <div style="background: linear-gradient(135deg, #064e3b 0%, #065f46 100%); padding: 30px; border-radius: 24px 24px 0 0; text-align: center;">
            <h1 style="color: #34d399; margin: 0; font-size: 28px; font-weight: 900; letter-spacing: -0.05em;">
              ¡NUEVO REGISTRO!
            </h1>
            <p style="color: white; margin: 10px 0 0; font-size: 14px; opacity: 0.9;">
              Minca Mágica - Luisito el Viajero
            </p>
            <div style="margin-top: 15px; display: inline-block; background: #34d399; color: #064e3b; padding: 10px 20px; border-radius: 50px; font-weight: 900; font-size: 16px;">
              📅 ${fecha_viaje}
            </div>
          </div>
          
          <div style="background: white; padding: 30px; border-radius: 0 0 24px 24px; box-shadow: 0 10px 40px rgba(0,0,0,0.1);">
            <h2 style="color: #0f172a; margin: 0 0 20px; font-size: 20px; font-weight: 700;">
              Datos del viajero:
            </h2>
            
            <table style="width: 100%; border-collapse: collapse;">
              <tr style="background: #ecfdf5;">
                <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; color: #065f46; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; width: 120px; font-weight: 700;">
                  📅 Fecha Viaje
                </td>
                <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; color: #065f46; font-weight: 900; font-size: 18px;">
                  ${fecha_viaje}
                </td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; color: #64748b; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; width: 120px;">
                  Nombre
                </td>
                <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; color: #0f172a; font-weight: 600; font-size: 16px;">
                  ${nombre} ${apellido}
                </td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; color: #64748b; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em;">
                  WhatsApp
                </td>
                <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; color: #0f172a; font-weight: 600; font-size: 16px;">
                  <a href="https://wa.me/57${whatsapp.replace(/\s/g, "")}" style="color: #10b981; text-decoration: none;">
                    ${whatsapp}
                  </a>
                </td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; color: #64748b; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em;">
                  Email
                </td>
                <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; color: #0f172a; font-weight: 600; font-size: 16px;">
                  <a href="mailto:${email}" style="color: #10b981; text-decoration: none;">
                    ${email}
                  </a>
                </td>
              </tr>
              <tr>
                <td style="padding: 12px 0; color: #64748b; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em;">
                  Registro
                </td>
                <td style="padding: 12px 0; color: #0f172a; font-weight: 600; font-size: 16px;">
                  ${new Date().toLocaleString("es-CO", { timeZone: "America/Bogota" })}
                </td>
              </tr>
            </table>
            
            <div style="margin-top: 30px; padding: 20px; background: #ecfdf5; border-radius: 16px; text-align: center;">
              <p style="margin: 0; color: #065f46; font-weight: 600;">
                💬 Contacta al viajero por WhatsApp
              </p>
              <a href="https://wa.me/57${whatsapp.replace(/\s/g, "")}?text=Hola%20${encodeURIComponent(nombre)}!%20Gracias%20por%20registrarte%20en%20Minca%20Mágica" 
                 style="display: inline-block; margin-top: 15px; padding: 14px 28px; background: #10b981; color: white; text-decoration: none; border-radius: 12px; font-weight: 700; font-size: 14px;">
                Enviar mensaje
              </a>
            </div>
          </div>
          
          <p style="text-align: center; margin-top: 20px; color: #94a3b8; font-size: 12px;">
            Registro ID: #${registro.id} • Luisito el Viajero © 2026
          </p>
        </div>
      `,
    });

    console.log("Resultado envío email:", emailResult);

    return NextResponse.json({
      success: true,
      message: "Registro exitoso",
      id: registro.id,
      emailSent: emailResult.data ? true : false,
    });
  } catch (error) {
    console.error("Error en registro:", error);
    return NextResponse.json(
      { error: "Error al procesar el registro" },
      { status: 500 }
    );
  }
}

