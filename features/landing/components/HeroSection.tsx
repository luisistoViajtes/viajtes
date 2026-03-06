"use client";

import { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { HeroSectionProps } from "../types";
import { WA_BASE } from "../data/content";

const WA_HREF = `${WA_BASE}?text=${encodeURIComponent("Hola Luisito, quiero trabajar contigo")}`;

const EASE: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

const fadeUp = (delay: number) => ({
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE, delay },
  },
});

// Floating destination pills — anchored to quadrants of the hero
const DEST_TAGS = [
  { label: "Minca, Colombia",   left: "7%",  top: "24%", floatDelay: 0, delay: 1.0 },
  { label: "Caribe Colombiano", left: "70%", top: "30%", floatDelay: 0.8, delay: 1.3 },
  { label: "La Guajira",        left: "9%",  top: "67%", floatDelay: 1.6, delay: 1.6 },
  { label: "Cartagena",         left: "66%", top: "65%", floatDelay: 2.4, delay: 1.9 },
];

export default function HeroSection({ onServicesClick }: HeroSectionProps) {
  const containerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Image moves up 25% of its container height as we scroll through hero
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);

  return (
    <section
      id="inicio"
      ref={containerRef}
      className="relative min-h-svh flex flex-col items-center justify-center overflow-hidden"
    >
      {/* ── Parallax background ─────────────────────────── */}
      <motion.div
        className="absolute left-0 right-0 z-0"
        style={{ top: "-15%", bottom: "-15%", y: imageY }}
      >
        <Image
          src="/Donde-queda-Minca-en-Santa-Marta 2.jpg"
          alt=""
          aria-hidden="true"
          fill
          sizes="100vw"
          className="object-cover hero-zoom"
          priority
          fetchPriority="high"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.50) 0%, rgba(0,0,0,0.16) 42%, rgba(0,0,0,0.68) 100%)",
          }}
        />
      </motion.div>

      {/* ── Floating destination pills (desktop) ─────────── */}
      {DEST_TAGS.map((tag) => (
        <motion.div
          key={tag.label}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: tag.delay, ease: EASE }}
          className="absolute z-[2] hidden lg:block"
          style={{ left: tag.left, top: tag.top }}
        >
          {/* Gentle float loop after entrance */}
          <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{
              duration: 4.5,
              ease: "easeInOut",
              repeat: Infinity,
              delay: tag.floatDelay,
            }}
          >
            <div
              style={{
                backgroundColor: "rgba(255,255,255,0.10)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                border: "1px solid rgba(255,255,255,0.16)",
                borderRadius: "100px",
                padding: "7px 16px 7px 11px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              {/* Copper dot */}
              <span
                style={{
                  width: "7px",
                  height: "7px",
                  borderRadius: "50%",
                  backgroundColor: "#D4A574",
                  flexShrink: 0,
                  boxShadow: "0 0 8px rgba(212,165,116,0.7)",
                }}
              />
              <span
                style={{
                  fontSize: "11.5px",
                  color: "rgba(255,255,255,0.90)",
                  fontWeight: 500,
                  letterSpacing: "0.03em",
                  whiteSpace: "nowrap",
                }}
              >
                {tag.label}
              </span>
            </div>
          </motion.div>
        </motion.div>
      ))}

      {/* ── Próximo viaje badge (top-right) ──────────────── */}
      <motion.div
        initial={{ opacity: 0, x: 18 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.55, delay: 1.8, ease: EASE }}
        className="absolute top-24 right-6 md:right-10 z-[2] hidden sm:flex flex-col"
      >
        <div
          style={{
            backgroundColor: "#D4A574",
            padding: "10px 18px",
            borderRadius: "2px",
          }}
        >
          <p
            style={{
              fontSize: "9px",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.65)",
              marginBottom: "3px",
            }}
          >
            PRÓXIMO VIAJE
          </p>
          <p
            style={{
              fontSize: "13px",
              fontWeight: 600,
              color: "white",
              letterSpacing: "0.01em",
            }}
          >
            La Guajira · Mar 2026
          </p>
        </div>
      </motion.div>

      {/* ── Main content ─────────────────────────────────── */}
      <div className="relative z-[3] w-full max-w-5xl mx-auto px-6 lg:px-8 pt-28 pb-24 flex flex-col items-center text-center">

        {/* Eyebrow */}
        <motion.p
          variants={fadeUp(0.1)}
          initial="hidden"
          animate="visible"
          style={{
            fontSize: "11px",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.55)",
            fontWeight: 500,
            marginBottom: "44px",
          }}
        >
          Creador de contenido &middot; Colombia
        </motion.p>

        {/* H1 — editorial split */}
        <h1 style={{ margin: 0, padding: 0, lineHeight: 0.9 }}>
          <motion.span
            variants={fadeUp(0.25)}
            initial="hidden"
            animate="visible"
            className="font-display"
            style={{
              fontSize: "clamp(64px, 10.5vw, 124px)",
              fontWeight: 300,
              fontStyle: "italic",
              color: "white",
              lineHeight: 0.9,
              display: "block",
            }}
          >
            Luisito
          </motion.span>
          <motion.span
            variants={fadeUp(0.42)}
            initial="hidden"
            animate="visible"
            className="font-display"
            style={{
              fontSize: "clamp(64px, 10.5vw, 124px)",
              fontWeight: 600,
              fontStyle: "normal",
              color: "white",
              lineHeight: 0.9,
              marginLeft: "clamp(20px, 3.5vw, 56px)",
              display: "block",
            }}
          >
            El Viajero
          </motion.span>
        </h1>

        {/* Tagline */}
        <motion.p
          variants={fadeUp(0.62)}
          initial="hidden"
          animate="visible"
          style={{
            fontSize: "18px",
            color: "rgba(255,255,255,0.78)",
            maxWidth: "420px",
            lineHeight: 1.55,
            marginTop: "36px",
            fontWeight: 400,
          }}
        >
          Más que un creador. Un aliado estratégico para tu marca.
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={fadeUp(0.82)}
          initial="hidden"
          animate="visible"
          className="flex flex-col sm:flex-row gap-3 mt-10"
        >
          <HeroButton variant="solid" onClick={onServicesClick} dataCta="hero-servicios">
            Ver servicios
          </HeroButton>
          <HeroButton variant="outline" href={WA_HREF} dataCta="whatsapp-hero">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: 8, flexShrink: 0 }} aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
            WhatsApp
          </HeroButton>
        </motion.div>
      </div>

      {/* ── Scroll indicator ─────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="absolute bottom-10 left-1/2 flex flex-col items-center gap-3 z-[3]"
        style={{ transform: "translateX(-50%)" }}
      >
        <span
          style={{
            fontSize: "10px",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.38)",
            fontWeight: 500,
          }}
        >
          Explorar
        </span>
        <ScrollLine />
      </motion.div>
    </section>
  );
}

function HeroButton({
  variant,
  onClick,
  href,
  dataCta,
  children,
}: {
  variant: "solid" | "outline";
  onClick?: () => void;
  href?: string;
  dataCta: string;
  children: React.ReactNode;
}) {
  const [hovered, setHovered] = useState(false);

  const solidStyle: React.CSSProperties = {
    backgroundColor: hovered ? "transparent" : "white",
    color: hovered ? "white" : "#1B4D5C",
    border: "1px solid white",
  };

  const outlineStyle: React.CSSProperties = {
    backgroundColor: hovered ? "white" : "transparent",
    color: hovered ? "#1B4D5C" : "white",
    border: "1px solid rgba(255,255,255,0.55)",
  };

  const baseStyle: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "13px 32px",
    fontSize: "14px",
    fontWeight: 500,
    letterSpacing: "0.02em",
    borderRadius: "2px",
    textDecoration: "none",
    cursor: "pointer",
    transition: "background-color 0.25s ease, color 0.25s ease",
    ...(variant === "solid" ? solidStyle : outlineStyle),
  };

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        data-cta={dataCta}
        style={baseStyle}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      onClick={onClick}
      data-cta={dataCta}
      style={{ ...baseStyle, background: baseStyle.backgroundColor }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {children}
    </button>
  );
}

function ScrollLine() {
  return (
    <div style={{ width: 1, height: 48, position: "relative", overflow: "hidden" }}>
      <motion.div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          backgroundColor: "rgba(255,255,255,0.40)",
          borderRadius: 1,
        }}
        animate={{ height: ["0%", "100%", "0%"], top: ["0%", "0%", "100%"] }}
        transition={{
          duration: 1.6,
          ease: "easeInOut",
          repeat: Infinity,
          repeatDelay: 0.4,
        }}
      />
    </div>
  );
}
