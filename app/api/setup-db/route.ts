import { neon } from "@neondatabase/serverless";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const sql = neon(process.env.DATABASE_URL!);

    // Crear tabla de registros
    await sql`
      CREATE TABLE IF NOT EXISTS registros (
        id SERIAL PRIMARY KEY,
        nombre VARCHAR(255) NOT NULL,
        apellido VARCHAR(255) NOT NULL,
        whatsapp VARCHAR(50) NOT NULL,
        email VARCHAR(255) NOT NULL,
        tratamiento_datos BOOLEAN DEFAULT false,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      )
    `;

    // Crear índice para búsquedas por email
    await sql`
      CREATE INDEX IF NOT EXISTS idx_registros_email ON registros(email)
    `;

    // Crear índice para búsquedas por fecha
    await sql`
      CREATE INDEX IF NOT EXISTS idx_registros_created_at ON registros(created_at DESC)
    `;

    // Crear tabla de visitas
    await sql`
      CREATE TABLE IF NOT EXISTS page_views (
        id SERIAL PRIMARY KEY,
        ip_address VARCHAR(50) NOT NULL,
        user_agent TEXT,
        visited_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      )
    `;

    // Crear índice para búsquedas por IP
    await sql`
      CREATE INDEX IF NOT EXISTS idx_page_views_ip ON page_views(ip_address)
    `;

    // Crear índice para búsquedas por fecha
    await sql`
      CREATE INDEX IF NOT EXISTS idx_page_views_visited_at ON page_views(visited_at DESC)
    `;

    return NextResponse.json({
      success: true,
      message: "Base de datos configurada correctamente (registros + page_views)",
    });
  } catch (error) {
    console.error("Error configurando DB:", error);
    return NextResponse.json(
      { error: "Error al configurar la base de datos", details: String(error) },
      { status: 500 }
    );
  }
}

