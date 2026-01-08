import { neon } from "@neondatabase/serverless";
import { Resend } from "resend";
import { NextResponse } from "next/server";

const sql = neon(process.env.DATABASE_URL!);
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const nombre = formData.get("nombre") as string;
    const apellido = formData.get("apellido") as string;
    const whatsapp = formData.get("whatsapp") as string;
    const email = formData.get("email") as string;
    const tratamiento_datos = formData.get("tratamiento_datos") === "on";

    // Validar campos requeridos
    if (!nombre || !apellido || !whatsapp || !email) {
      return NextResponse.json(
        { error: "Todos los campos son requeridos" },
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
    await resend.emails.send({
      from: "Luisito Viajes <notificaciones@tudominio.com>", // Cambia a tu dominio verificado en Resend
      to: process.env.NOTIFICATION_EMAIL!, // Email donde recibirás las notificaciones
      subject: `🎉 Nuevo registro para Minca Mágica - ${nombre} ${apellido}`,
      html: `
        <div style="font-family: 'Inter', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f8fafc; padding: 40px 20px;">
          <div style="background: linear-gradient(135deg, #064e3b 0%, #065f46 100%); padding: 30px; border-radius: 24px 24px 0 0; text-align: center;">
            <h1 style="color: #34d399; margin: 0; font-size: 28px; font-weight: 900; letter-spacing: -0.05em;">
              ¡NUEVO REGISTRO!
            </h1>
            <p style="color: white; margin: 10px 0 0; font-size: 14px; opacity: 0.9;">
              Minca Mágica - Luisito el Viajero
            </p>
          </div>
          
          <div style="background: white; padding: 30px; border-radius: 0 0 24px 24px; box-shadow: 0 10px 40px rgba(0,0,0,0.1);">
            <h2 style="color: #0f172a; margin: 0 0 20px; font-size: 20px; font-weight: 700;">
              Datos del viajero:
            </h2>
            
            <table style="width: 100%; border-collapse: collapse;">
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

    return NextResponse.json({
      success: true,
      message: "Registro exitoso",
      id: registro.id,
    });
  } catch (error) {
    console.error("Error en registro:", error);
    return NextResponse.json(
      { error: "Error al procesar el registro" },
      { status: 500 }
    );
  }
}

