"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { waLink } from "../data/content";
import { DESTINATIONS, Destination } from "../data/destinations";
import { fadeUpVariants, staggerContainerVariants } from "../hooks/useScrollReveal";

export default function DestinationsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      id="destinos"
      style={{ backgroundColor: "#0D1511", borderTop: "1px solid rgba(255,255,255,0.08)" }}
    >
      {/* Header */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 md:py-20">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={staggerContainerVariants}
        >
          <motion.p
            variants={fadeUpVariants}
            className="text-[11px] uppercase tracking-[0.2em] mb-4"
            style={{ color: "rgba(255,255,255,0.35)" }}
          >
            &mdash; VIAJA CONMIGO
          </motion.p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <motion.h2
              variants={fadeUpVariants}
              className="font-display font-light leading-[1] tracking-tight"
              style={{ fontSize: "clamp(56px, 8vw, 80px)", color: "#FFFFFF" }}
            >
              Destinos
            </motion.h2>
            <motion.p
              variants={fadeUpVariants}
              className="text-[15px] md:max-w-[38ch] leading-relaxed"
              style={{ color: "rgba(255,255,255,0.45)" }}
            >
              Grupos de viaje a los rincones más increíbles de Colombia y el mundo.
              Experiencias auténticas, comunidad real.
            </motion.p>
          </div>
        </motion.div>
      </div>

      {/* Photo Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-[2px]">
        {DESTINATIONS.map((dest, idx) => (
          <DestCard key={dest.slug} dest={dest} delay={idx * 0.07} />
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="py-10 text-center">
        <a
          href={waLink("Hola Luisito, quiero conocer todos los próximos viajes disponibles")}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.16em] transition-opacity duration-200 hover:opacity-70"
          style={{ color: "rgba(255,255,255,0.4)" }}
        >
          Consultar próximos viajes
          <span style={{ color: "#B5763A" }}>→</span>
        </a>
      </div>
    </section>
  );
}

function DestCard({ dest, delay }: { dest: Destination; delay: number }) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.55, delay }}
      className={`relative${dest.grid.colSpan ? " md:col-span-2" : ""}${dest.grid.panSpan ? " md:col-span-3" : ""}`}
      style={{ height: `${dest.grid.cardHeight}px` }}
    >
      {/* Entire card links to destination page */}
      <Link
        href={`/destinos/${dest.slug}`}
        className="absolute inset-0 block"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Image */}
        <Image
          src={dest.heroSrc}
          alt={dest.name}
          fill
          sizes={
            dest.grid.colSpan
              ? "(max-width: 768px) 100vw, 66vw"
              : dest.grid.panSpan
              ? "100vw"
              : "(max-width: 768px) 100vw, 33vw"
          }
          className="object-cover"
          style={{
            transform: hovered ? "scale(1.05)" : "scale(1)",
            transition: "transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          }}
        />

        {/* Gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: hovered
              ? "linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.2) 100%)"
              : "linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.2) 55%, rgba(0,0,0,0.1) 100%)",
            transition: "background 0.5s ease",
          }}
        />

        {/* Label — top left */}
        <div
          className="absolute top-5 left-5 text-[10px] uppercase tracking-[0.18em]"
          style={{ color: "rgba(255,255,255,0.45)" }}
        >
          {dest.label}
        </div>

        {/* Text — bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <p
            className="text-[10px] uppercase tracking-[0.18em] mb-1.5"
            style={{ color: "rgba(255,255,255,0.45)" }}
          >
            {dest.region}
          </p>
          <h3
            className="font-display font-light leading-tight text-white"
            style={{ fontSize: "clamp(20px, 2.2vw, 28px)" }}
          >
            {dest.name}
          </h3>

          {/* Hover CTA */}
          <div
            style={{
              maxHeight: hovered ? "36px" : "0px",
              opacity: hovered ? 1 : 0,
              overflow: "hidden",
              transition: "max-height 0.35s ease, opacity 0.3s ease",
              marginTop: hovered ? "10px" : "0px",
            }}
          >
            <span
              className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.16em]"
              style={{ color: "#B5763A" }}
            >
              Ver destino →
            </span>
          </div>
        </div>
      </Link>

      {/* WhatsApp shortcut — floats above the Link */}
      <a
        href={waLink(dest.waMsg)}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute bottom-6 right-6 z-10 text-[10px] uppercase tracking-[0.14em] opacity-0 transition-opacity duration-300"
        style={{
          color: "#B5763A",
          opacity: hovered ? 0.85 : 0,
          pointerEvents: hovered ? "auto" : "none",
        }}
        onClick={(e) => e.stopPropagation()}
        aria-label="Preguntar por WhatsApp"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
        </svg>
      </a>
    </motion.div>
  );
}
