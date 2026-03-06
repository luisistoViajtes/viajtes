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

    // Crear tabla de leads (brand landing page)
    await sql`
      CREATE TABLE IF NOT EXISTS leads (
        id          SERIAL PRIMARY KEY,
        name        VARCHAR(255) NOT NULL,
        whatsapp    VARCHAR(20)  NOT NULL,
        email       VARCHAR(255) NOT NULL,
        business    VARCHAR(255) NOT NULL,
        service     VARCHAR(50)  NOT NULL DEFAULT '',
        message     TEXT,
        ip_address  VARCHAR(50),
        created_at  TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      )
    `;

    await sql`
      CREATE INDEX IF NOT EXISTS idx_leads_service    ON leads(service)
    `;

    await sql`
      CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at DESC)
    `;

    // Crear tabla de inscripciones a viajes
    await sql`
      CREATE TABLE IF NOT EXISTS trip_registrations (
        id           SERIAL PRIMARY KEY,
        name         VARCHAR(255) NOT NULL,
        whatsapp     VARCHAR(20)  NOT NULL,
        email        VARCHAR(255) NOT NULL,
        personas     INTEGER      DEFAULT 1,
        message      TEXT,
        trip_slug    VARCHAR(100) NOT NULL,
        trip_dest    VARCHAR(255) NOT NULL,
        date_id      VARCHAR(100) NOT NULL,
        date_range   VARCHAR(255) NOT NULL,
        price        VARCHAR(50),
        ip_address   VARCHAR(50),
        created_at   TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      )
    `;

    await sql`
      CREATE INDEX IF NOT EXISTS idx_trip_reg_slug ON trip_registrations(trip_slug)
    `;

    await sql`
      CREATE INDEX IF NOT EXISTS idx_trip_reg_created_at ON trip_registrations(created_at DESC)
    `;

    return NextResponse.json({
      success: true,
      message: "Base de datos configurada correctamente (registros + page_views + leads + trip_registrations)",
    });
  } catch (error) {
    console.error("Error configurando DB:", error);
    return NextResponse.json(
      { error: "Error al configurar la base de datos", details: String(error) },
      { status: 500 }
    );
  }
}

