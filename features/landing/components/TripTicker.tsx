"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";

const UPCOMING = [
  {
    slug: "minca",
    dest: "Minca",
    country: "Colombia",
    date: "Marzo 2026",
    spots: "4 cupos",
    status: "open",
    accent: "#1B4D5C",
    bg: "linear-gradient(135deg, #0B2A35 0%, #1B4D5C 100%)",
  },
  {
    slug: "la-guajira",
    dest: "La Guajira",
    country: "Colombia",
    date: "Abril 2026",
    spots: "6 cupos",
    status: "open",
    accent: "#B5763A",
    bg: "linear-gradient(135deg, #1A1006 0%, #3D2410 100%)",
  },
  {
    slug: "cartagena",
    dest: "Cartagena",
    country: "Colombia",
    date: "Mayo 2026",
    spots: "8 cupos",
    status: "open",
    accent: "#2A6678",
    bg: "linear-gradient(135deg, #071E28 0%, #0F3545 100%)",
  },
  {
    slug: "punta-cana",
    dest: "Punta Cana",
    country: "Rep. Dominicana",
    date: "Junio 2026",
    spots: "Próximamente",
    status: "soon",
    accent: "#5C6460",
    bg: "linear-gradient(135deg, #111613 0%, #1E2920 100%)",
  },
];

export default function TripTicker() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <section
      id="viajes"
      style={{
        backgroundColor: "#0D1511",
        borderTop: "1px solid rgba(255,255,255,0.07)",
        borderBottom: "1px solid rgba(255,255,255,0.07)",
        padding: "48px 0",
      }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div
          ref={ref}
          className="flex items-end justify-between mb-8"
        >
          <div>
            <p
              style={{
                fontSize: "10px",
                fontWeight: 600,
                letterSpacing: "0.24em",
                textTransform: "uppercase",
                color: "#D4A574",
                marginBottom: "8px",
              }}
            >
              &mdash; PRÓXIMOS VIAJES
            </p>
            <h2
              className="font-display font-light"
              style={{
                fontSize: "clamp(32px, 4vw, 48px)",
                color: "#FFFFFF",
                lineHeight: 1,
              }}
            >
              Viaja con{" "}
              <em style={{ color: "#D4A574" }}>Luisito</em>
            </h2>
          </div>
          <span
            className="hidden sm:inline-flex items-center gap-2"
            style={{
              fontSize: "12px",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.35)",
              paddingBottom: "2px",
            }}
          >
            Ver todos &rarr;
          </span>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-[2px]">
          {UPCOMING.map((trip, i) => (
            <motion.div
              key={trip.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group relative flex flex-col justify-between overflow-hidden"
              style={{
                background: trip.bg,
                minHeight: "180px",
              }}
            >
              <Link
                href={`/viajes/${trip.slug}`}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  padding: "24px 20px 22px",
                  minHeight: "180px",
                  textDecoration: "none",
                  cursor: "pointer",
                  width: "100%",
                  height: "100%",
                }}
              >
                {/* Top accent bar */}
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "2px",
                    backgroundColor: trip.accent,
                    opacity: 0.5,
                    transition: "opacity 0.3s ease",
                  }}
                />

                {/* Status pill */}
                <div className="flex items-center gap-2 mb-auto">
                  <span
                    style={{
                      width: "6px",
                      height: "6px",
                      borderRadius: "50%",
                      backgroundColor: trip.status === "open" ? "#4ADE80" : "rgba(255,255,255,0.25)",
                      flexShrink: 0,
                      boxShadow: trip.status === "open" ? "0 0 6px rgba(74,222,128,0.5)" : "none",
                    }}
                  />
                  <span
                    style={{
                      fontSize: "10px",
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      color: trip.status === "open" ? "rgba(74,222,128,0.8)" : "rgba(255,255,255,0.28)",
                      fontWeight: 500,
                    }}
                  >
                    {trip.spots}
                  </span>
                </div>

                {/* Destination name */}
                <div style={{ marginTop: "20px" }}>
                  <p
                    style={{
                      fontSize: "10px",
                      letterSpacing: "0.16em",
                      textTransform: "uppercase",
                      color: "rgba(255,255,255,0.35)",
                      marginBottom: "6px",
                    }}
                  >
                    {trip.country}
                  </p>
                  <h3
                    className="font-display font-light"
                    style={{
                      fontSize: "clamp(22px, 2.5vw, 30px)",
                      color: "#FFFFFF",
                      lineHeight: 1,
                      marginBottom: "10px",
                    }}
                  >
                    {trip.dest}
                  </h3>
                  <p
                    style={{
                      fontSize: "12px",
                      color: "rgba(255,255,255,0.42)",
                      letterSpacing: "0.04em",
                    }}
                  >
                    {trip.date}
                  </p>
                </div>

                {/* Hover arrow */}
                <div
                  style={{
                    position: "absolute",
                    bottom: "20px",
                    right: "18px",
                    fontSize: "16px",
                    color: "rgba(255,255,255,0.2)",
                    transition: "color 0.25s ease, transform 0.25s ease",
                  }}
                  className="group-hover:text-white group-hover:translate-x-1"
                >
                  &rarr;
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
