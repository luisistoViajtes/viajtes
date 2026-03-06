"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { PAUTA_FEATURES, waLink } from "../data/content";
import { PautaSectionProps } from "../types";
import { fadeUpVariants, staggerContainerVariants } from "../hooks/useScrollReveal";

const WA_MSG = "Hola Luisito, me interesa pautar contigo";

const PLAN_DETAILS = [
  "3–5 piezas de contenido",
  "Publicación en IG · FB · TikTok",
  "Duración de 1 semana",
  "Informe de resultados incluido",
];

const STATS = [
  { target: 200, suffix: "K+", label: "Seguidores en redes" },
  { target: 50, suffix: "+", label: "Marcas aliadas" },
  { target: 15, suffix: "+", label: "Destinos activos" },
];

function StatCounter({
  target,
  suffix,
  label,
  active,
}: {
  target: number;
  suffix: string;
  label: string;
  active: boolean;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) return;
    let startTime: number | null = null;
    let rafId: number;
    const duration = 1400;
    rafId = requestAnimationFrame(function step(ts) {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) rafId = requestAnimationFrame(step);
    });
    return () => cancelAnimationFrame(rafId);
  }, [active, target]);

  return (
    <div className="text-center md:text-left">
      <p
        className="font-display font-light leading-none"
        style={{ fontSize: "clamp(48px, 6vw, 72px)", color: "#FFFFFF" }}
      >
        {count}
        {suffix}
      </p>
      <p
        className="text-[11px] uppercase tracking-[0.18em] mt-2"
        style={{ color: "rgba(255,255,255,0.4)" }}
      >
        {label}
      </p>
    </div>
  );
}

export default function PautaSection({ onContactClick }: PautaSectionProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [cardHovered, setCardHovered] = useState(false);

  return (
    <section
      id="pauta"
      className="relative py-28 md:py-36 px-4 sm:px-6 scroll-mt-16 overflow-hidden"
      style={{
        background:
          "linear-gradient(155deg, #071E28 0%, #0F2E38 45%, #1B4D5C 100%)",
      }}
    >
      {/* Copper radial glow — top right */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(181,118,58,0.22) 0%, transparent 65%)",
        }}
      />
      {/* Second glow — bottom left */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 -left-20 w-[480px] h-[480px] rounded-full"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(27,77,92,0.55) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-6xl mx-auto relative">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={staggerContainerVariants}
        >
          {/* Label */}
          <motion.p
            variants={fadeUpVariants}
            className="text-[11px] uppercase tracking-[0.22em] mb-6"
            style={{ color: "rgba(255,255,255,0.35)" }}
          >
            &mdash; COLABORA CON LUISITO
          </motion.p>

          {/* Headline */}
          <motion.h2
            variants={fadeUpVariants}
            className="font-display font-light leading-[0.95] mb-10 md:mb-14"
            style={{ fontSize: "clamp(52px, 7vw, 84px)", color: "#FFFFFF" }}
          >
            Pauta con<br />
            una comunidad<br />
            <em style={{ color: "#D4A574" }}>real.</em>
          </motion.h2>

          {/* ── Stats row ───────────────────────────────── */}
          <motion.div
            variants={fadeUpVariants}
            className="grid grid-cols-3 gap-4 md:gap-0 mb-14 md:mb-16 pb-14 md:pb-16 border-b"
            style={{ borderColor: "rgba(255,255,255,0.1)" }}
          >
            {STATS.map((s) => (
              <StatCounter
                key={s.label}
                target={s.target}
                suffix={s.suffix}
                label={s.label}
                active={inView}
              />
            ))}
          </motion.div>

          {/* ── 2-column body ───────────────────────────── */}
          <div className="grid grid-cols-1 md:grid-cols-[55%_45%] gap-12 md:gap-16 items-start">

            {/* Left: description + features */}
            <div>
              <motion.p
                variants={fadeUpVariants}
                className="text-[17px] leading-relaxed mb-10 max-w-lg"
                style={{ color: "rgba(255,255,255,0.62)" }}
              >
                Conecta tu marca con una comunidad activa de viajeros colombianos.
                Contenido auténtico que genera conversaciones, visitas y ventas reales
                desde el primer día.
              </motion.p>

              <motion.ul variants={staggerContainerVariants}>
                {PAUTA_FEATURES.map((feature) => (
                  <motion.li
                    key={feature}
                    variants={fadeUpVariants}
                    className="flex items-start gap-4 py-3.5 border-b text-[15px]"
                    style={{
                      borderColor: "rgba(255,255,255,0.08)",
                      color: "rgba(255,255,255,0.72)",
                    }}
                  >
                    <span
                      className="shrink-0 mt-px text-[13px] font-medium"
                      style={{ color: "#D4A574" }}
                    >
                      ✓
                    </span>
                    {feature}
                  </motion.li>
                ))}
              </motion.ul>
            </div>

            {/* Right: Price card */}
            <motion.div variants={fadeUpVariants}>
              <div
                className="relative overflow-hidden"
                style={{
                  border: "1px solid rgba(181,118,58,0.35)",
                  backgroundColor: "rgba(255,255,255,0.04)",
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                }}
              >
                {/* Copper top accent bar */}
                <div
                  style={{
                    height: "3px",
                    background:
                      "linear-gradient(90deg, #B5763A 0%, #D4A574 50%, #B5763A 100%)",
                  }}
                />

                <div className="p-8 md:p-10">
                  <p
                    className="text-[11px] uppercase tracking-[0.2em] mb-3"
                    style={{ color: "rgba(181,118,58,0.75)" }}
                  >
                    Inversión desde
                  </p>

                  <p
                    className="font-display font-light leading-none mb-1"
                    style={{ fontSize: "clamp(52px, 7vw, 72px)", color: "#FFFFFF" }}
                  >
                    $250 USD
                  </p>

                  <p className="text-[13px] mb-8" style={{ color: "rgba(255,255,255,0.35)" }}>
                    por campaña
                  </p>

                  <div
                    className="mb-7"
                    style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}
                  />

                  <ul className="mb-8 space-y-0">
                    {PLAN_DETAILS.map((item) => (
                      <li
                        key={item}
                        className="flex items-center gap-3 py-2.5 text-[14px] border-b"
                        style={{
                          color: "rgba(255,255,255,0.65)",
                          borderColor: "rgba(255,255,255,0.07)",
                        }}
                      >
                        <span style={{ color: "#D4A574", fontSize: "12px" }}>✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <button
                    onClick={onContactClick}
                    data-cta="pauta-card-cta"
                    className="relative w-full py-4 mb-4 text-[13px] uppercase tracking-[0.14em] font-medium overflow-hidden"
                    style={{
                      color: cardHovered ? "#0F2E38" : "#FFFFFF",
                      border: "1px solid rgba(255,255,255,0.55)",
                      cursor: "pointer",
                      transition: "color 0.28s ease",
                    }}
                    onMouseEnter={() => setCardHovered(true)}
                    onMouseLeave={() => setCardHovered(false)}
                  >
                    {/* Fill sweep */}
                    <span
                      aria-hidden="true"
                      className="absolute inset-0 block"
                      style={{
                        backgroundColor: "#FFFFFF",
                        transform: cardHovered ? "translateX(0)" : "translateX(-100%)",
                        transition: "transform 0.3s cubic-bezier(0.4,0,0.2,1)",
                      }}
                    />
                    <span className="relative z-10">Comenzar campaña</span>
                  </button>

                  <div className="text-center">
                    <a
                      href={waLink(WA_MSG)}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-cta="whatsapp-pauta"
                      className="text-[12px] link-underline"
                      style={{ color: "rgba(255,255,255,0.38)" }}
                    >
                      o escríbeme directo &rarr;
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}
