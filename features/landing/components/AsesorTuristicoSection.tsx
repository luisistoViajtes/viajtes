"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { waLink } from "../data/content";
import { fadeUpVariants, staggerContainerVariants } from "../hooks/useScrollReveal";

const WA_MSG = "Hola Luisito, me interesa la asesoría turística de $230.000. ¿Me cuentas más?";

const INCLUDES = [
  "Selección del destino ideal para ti y tu grupo",
  "Cotización de tiquetes, hospedaje y traslados",
  "Itinerario personalizado día a día",
  "Gestión de documentos y requisitos de entrada",
  "Soporte por WhatsApp antes, durante y después del viaje",
  "Acompañamiento real durante todo el proceso",
];

function CtaLink({ href }: { href: string }) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      data-cta="asesor-turistico-cta"
      className="relative inline-flex items-center justify-center px-7 py-4 text-[13px] uppercase tracking-[0.14em] font-medium overflow-hidden"
      style={{
        border: "1px solid #D4A574",
        color: hovered ? "#0B2A35" : "#D4A574",
        transition: "color 0.28s ease",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span
        aria-hidden="true"
        className="absolute inset-0 block"
        style={{
          backgroundColor: "#D4A574",
          transform: hovered ? "translateX(0)" : "translateX(-100%)",
          transition: "transform 0.3s cubic-bezier(0.4,0,0.2,1)",
        }}
      />
      <span className="relative z-10">Quiero mi asesoría →</span>
    </a>
  );
}

export default function AsesorTuristicoSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      id="asesor"
      className="relative overflow-hidden"
      style={{ backgroundColor: "#0B2A35" }}
    >
      {/* Subtle copper glow top-left */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 -left-20 w-[500px] h-[500px] rounded-full"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(181,118,58,0.18) 0%, transparent 65%)",
        }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col lg:flex-row items-center gap-0 lg:gap-16">

          {/* ── Left: content ── */}
          <motion.div
            ref={ref}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={staggerContainerVariants}
            className="flex-1 py-20 md:py-28 lg:py-32 order-2 lg:order-1"
          >
            {/* Eyebrow */}
            <motion.p
              variants={fadeUpVariants}
              className="text-[11px] uppercase tracking-[0.22em] mb-5"
              style={{ color: "rgba(255,255,255,0.35)" }}
            >
              &mdash; PRODUCTO ESTRELLA
            </motion.p>

            {/* Headline */}
            <motion.h2
              variants={fadeUpVariants}
              className="font-display font-light leading-[0.95] mb-6"
              style={{ fontSize: "clamp(52px, 7vw, 80px)", color: "#FFFFFF" }}
            >
              Asesor de<br />
              <em style={{ color: "#D4A574" }}>Viajes.</em>
            </motion.h2>

            {/* Tagline */}
            <motion.p
              variants={fadeUpVariants}
              className="text-[17px] leading-relaxed mb-10 max-w-[42ch]"
              style={{ color: "rgba(255,255,255,0.6)" }}
            >
              Te acompaño durante todo el proceso para que tu próximo viaje
              sea perfecto, sin estrés y sin sorpresas. Desde elegir el destino
              hasta volver a casa.
            </motion.p>

            {/* Includes list */}
            <motion.ul variants={staggerContainerVariants} className="mb-10 space-y-0">
              {INCLUDES.map((item) => (
                <motion.li
                  key={item}
                  variants={fadeUpVariants}
                  className="flex items-start gap-4 py-3 border-b text-[14px]"
                  style={{
                    borderColor: "rgba(255,255,255,0.08)",
                    color: "rgba(255,255,255,0.72)",
                  }}
                >
                  <span
                    className="shrink-0 mt-px text-[12px]"
                    style={{ color: "#D4A574" }}
                  >
                    ✓
                  </span>
                  {item}
                </motion.li>
              ))}
            </motion.ul>

            {/* Price + CTA */}
            <motion.div variants={fadeUpVariants} className="flex flex-col sm:flex-row sm:items-center gap-6">
              <div>
                <p className="text-[11px] uppercase tracking-[0.18em] mb-1" style={{ color: "rgba(255,255,255,0.35)" }}>
                  Asesoría completa desde
                </p>
                <p className="font-display font-light leading-none" style={{ fontSize: "clamp(40px, 5vw, 56px)", color: "#D4A574" }}>
                  $230.000
                </p>
                <p className="text-[12px] mt-1" style={{ color: "rgba(255,255,255,0.3)" }}>
                  COP · pago único
                </p>
              </div>

              <CtaLink href={waLink(WA_MSG)} />
            </motion.div>
          </motion.div>

          {/* ── Right: image ── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.2, 0, 0, 1] }}
            className="order-1 lg:order-2 w-full lg:w-[420px] xl:w-[480px] shrink-0 pt-12 lg:pt-0 flex items-center justify-center"
          >
            <div className="relative w-full max-w-[420px]">
              {/* Copper glow behind image */}
              <div
                aria-hidden="true"
                className="absolute inset-0 rounded-2xl"
                style={{
                  background: "radial-gradient(ellipse at center, rgba(212,165,116,0.25) 0%, transparent 70%)",
                  transform: "scale(1.1)",
                  filter: "blur(20px)",
                }}
              />
              <Image
                src="/asesorturistico.png"
                alt="Asesor de Viajes — Luisito El Viajero"
                width={480}
                height={480}
                className="relative z-10 w-full h-auto"
                style={{ objectFit: "contain" }}
                priority
              />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
