"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { Calendar, Users, MapPin, ArrowRight } from "lucide-react";
import { TRIPS, Trip } from "@/features/landing/data/trips";
import { waLink } from "@/features/landing/data/content";

function TripCard({ trip, index }: { trip: Trip; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [hovered, setHovered] = useState(false);
  const [ctaHovered, setCtaHovered] = useState(false);

  const firstDate = trip.dates[0];
  const isExternal = trip.heroSrc.startsWith("http");

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.55, delay: index * 0.1 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        backgroundColor: "rgba(255,255,255,0.04)",
        border: `1px solid ${hovered ? "rgba(255,255,255,0.16)" : "rgba(255,255,255,0.08)"}`,
        transition: "border-color 0.3s ease",
        overflow: "hidden",
      }}
    >
      {/* Top accent bar */}
      <div style={{ height: 2, backgroundColor: trip.accent }} />

      {/* Image */}
      <div style={{ position: "relative", height: 240, overflow: "hidden" }}>
        <Image
          src={trip.heroSrc}
          alt={trip.dest}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          style={{ objectFit: "cover" }}
          unoptimized={isExternal}
        />
        {/* Gradient overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, rgba(13,21,17,0.85) 0%, transparent 55%)",
          }}
        />

        {/* Status badge */}
        <div
          style={{
            position: "absolute",
            top: 14,
            left: 14,
            display: "flex",
            alignItems: "center",
            gap: 6,
            backgroundColor: "rgba(0,0,0,0.55)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            padding: "5px 10px",
            borderRadius: 2,
          }}
        >
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              backgroundColor:
                firstDate.status === "open" ? "#4ADE80" : "#9CA3AF",
            }}
          />
          <span
            style={{
              fontSize: 10,
              fontWeight: 600,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.7)",
            }}
          >
            {firstDate.status === "open"
              ? `${firstDate.spotsLeft} cupos`
              : "Proximamente"}
          </span>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: 24 }}>
        {/* Region */}
        <p
          style={{
            fontSize: 11,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.35)",
            marginBottom: 6,
          }}
        >
          {trip.region}
        </p>

        {/* Destination name */}
        <h3
          className="font-display"
          style={{
            fontSize: 36,
            fontWeight: 300,
            lineHeight: 1,
            color: "#FFFFFF",
            marginBottom: 16,
          }}
        >
          {trip.dest}
        </h3>

        {/* Info row */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 16,
            marginBottom: 8,
          }}
        >
          <span
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              fontSize: 13,
              color: "rgba(255,255,255,0.5)",
            }}
          >
            <Calendar size={14} strokeWidth={1.5} color="rgba(255,255,255,0.4)" />
            {firstDate.dateRange}
          </span>
          <span
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              fontSize: 13,
              color: "rgba(255,255,255,0.5)",
            }}
          >
            <Users size={14} strokeWidth={1.5} color="rgba(255,255,255,0.4)" />
            {firstDate.spotsLeft} cupos
          </span>
        </div>

        <div style={{ marginBottom: 16 }}>
          <span
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              fontSize: 13,
              color: "rgba(255,255,255,0.5)",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            <MapPin size={14} strokeWidth={1.5} color="rgba(255,255,255,0.4)" />
            {trip.meetingPoint}
          </span>
        </div>

        {/* Price */}
        <p
          className="font-display"
          style={{
            fontSize: 32,
            fontWeight: 300,
            lineHeight: 1,
            color: "#D4A574",
            marginBottom: 4,
          }}
        >
          {firstDate.price}
        </p>
        <p
          style={{
            fontSize: 12,
            color: "rgba(255,255,255,0.35)",
            marginBottom: 20,
          }}
        >
          {firstDate.priceNote}
        </p>

        {/* CTA row */}
        <div style={{ display: "flex", gap: 8 }}>
          <Link
            href={`/viajes/${trip.slug}`}
            onMouseEnter={() => setCtaHovered(true)}
            onMouseLeave={() => setCtaHovered(false)}
            style={{
              flex: 1,
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 6,
              backgroundColor: ctaHovered ? trip.accent : trip.accent,
              opacity: ctaHovered ? 0.9 : 1,
              color: "#FFFFFF",
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              padding: "11px 18px",
              borderRadius: 2,
              textDecoration: "none",
              transition: "opacity 0.2s ease",
            }}
          >
            Inscribirme
            <ArrowRight size={14} strokeWidth={1.5} />
          </Link>
          <a
            href={waLink(`Hola Luisito, me interesa el viaje a ${trip.dest}`)}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              border: "1px solid rgba(255,255,255,0.2)",
              color: "#FFFFFF",
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              padding: "11px 14px",
              borderRadius: 2,
              textDecoration: "none",
              transition: "border-color 0.2s ease",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
          </a>
        </div>
      </div>
    </motion.div>
  );
}

export default function ViajaConLuisitoSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [bottomCtaHovered, setBottomCtaHovered] = useState(false);

  return (
    <section
      id="viaja-conmigo"
      className="py-28 md:py-36 px-4 sm:px-6"
      style={{ backgroundColor: "#0D1511" }}
    >
      <div style={{ maxWidth: "72rem", margin: "0 auto" }}>
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:justify-between md:items-start"
          style={{ marginBottom: 56 }}
        >
          <div>
            {/* Eyebrow */}
            <p
              style={{
                fontSize: 11,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "#B5763A",
                marginBottom: 16,
              }}
            >
              — PROXIMAS SALIDAS
            </p>

            {/* Headline */}
            <h2
              className="font-display"
              style={{
                fontSize: "clamp(56px, 8vw, 88px)",
                fontWeight: 300,
                lineHeight: 0.95,
                color: "#FFFFFF",
                marginBottom: 16,
              }}
            >
              Viaja{" "}
              <br />
              <em style={{ color: "#D4A574" }}>conmigo.</em>
            </h2>

            {/* Subtext */}
            <p
              style={{
                fontSize: 15,
                lineHeight: 1.6,
                color: "rgba(255,255,255,0.5)",
                maxWidth: "50ch",
              }}
            >
              Grupos pequenos, destinos reales y experiencias que te cambian.
              Cada viaje es coordinado y acompanado por Luisito.
            </p>
          </div>

          {/* Desktop link */}
          <div className="hidden md:block" style={{ paddingTop: 8 }}>
            <Link
              href="/#destinos"
              style={{
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#D4A574",
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              Ver todos los destinos →
            </Link>
          </div>
        </motion.div>

        {/* Trip cards grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-2"
          style={{ gap: 2 }}
        >
          {TRIPS.map((trip, i) => (
            <TripCard key={trip.slug} trip={trip} index={i} />
          ))}
        </div>

        {/* Bottom CTA strip */}
        <div
          style={{
            marginTop: 48,
            borderTop: "1px solid rgba(255,255,255,0.08)",
            paddingTop: 40,
            textAlign: "center",
          }}
        >
          <p
            style={{
              fontSize: 14,
              color: "rgba(255,255,255,0.45)",
              marginBottom: 20,
            }}
          >
            Quieres un viaje personalizado o tienes preguntas?
          </p>
          <a
            href={waLink(
              "Hola Luisito, quiero planificar un viaje personalizado"
            )}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => setBottomCtaHovered(true)}
            onMouseLeave={() => setBottomCtaHovered(false)}
            style={{
              display: "inline-block",
              border: "1px solid #D4A574",
              color: bottomCtaHovered ? "#0D1511" : "#D4A574",
              backgroundColor: bottomCtaHovered ? "#D4A574" : "transparent",
              padding: "12px 28px",
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              textDecoration: "none",
              borderRadius: 2,
              transition:
                "background-color 0.25s ease, color 0.25s ease",
            }}
          >
            Escribir por WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
