import { neon } from "@neondatabase/serverless";
import { NextResponse } from "next/server";
import { headers } from "next/headers";

const sql = neon(process.env.DATABASE_URL!);

// GET - Obtener estadísticas de visitas
export async function GET() {
  try {
    // Total de vistas
    const viewsResult = await sql`
      SELECT COUNT(*) as total_views FROM page_views
    `;

    // Visitantes únicos (por IP)
    const visitorsResult = await sql`
      SELECT COUNT(DISTINCT ip_address) as unique_visitors FROM page_views
    `;

    return NextResponse.json({
      views: Number(viewsResult[0].total_views),
      visitors: Number(visitorsResult[0].unique_visitors),
    });
  } catch (error) {
    console.error("Error obteniendo vistas:", error);
    return NextResponse.json({ views: 0, visitors: 0 });
  }
}

// POST - Registrar una nueva visita
export async function POST() {
  try {
    const headersList = await headers();
    
    // Obtener IP del visitante
    const forwardedFor = headersList.get("x-forwarded-for");
    const realIp = headersList.get("x-real-ip");
    const ip = forwardedFor?.split(",")[0] || realIp || "unknown";
    
    // Obtener user agent para más info
    const userAgent = headersList.get("user-agent") || "unknown";

    // Registrar la visita
    await sql`
      INSERT INTO page_views (ip_address, user_agent, visited_at)
      VALUES (${ip}, ${userAgent}, NOW())
    `;

    // Obtener estadísticas actualizadas
    const viewsResult = await sql`
      SELECT COUNT(*) as total_views FROM page_views
    `;

    const visitorsResult = await sql`
      SELECT COUNT(DISTINCT ip_address) as unique_visitors FROM page_views
    `;

    return NextResponse.json({
      success: true,
      views: Number(viewsResult[0].total_views),
      visitors: Number(visitorsResult[0].unique_visitors),
    });
  } catch (error) {
    console.error("Error registrando visita:", error);
    return NextResponse.json(
      { error: "Error al registrar visita" },
      { status: 500 }
    );
  }
}


