"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { ServiceSlug, ServicesGridProps } from "../types";

const C = {
  surface: "#F5F2ED",
  surfaceDark: "#EDE9E0",
  panelBg: "#E8E4DA",
  ink: "#0D1511",
  inkMuted: "#5C6460",
  teal: "#1B4D5C",
  copper: "#B5763A",
  border: "#D8D4CC",
  borderDark: "#B5B0A6",
  wa: "#25D366",
} as const;

const WA_BASE = "https://wa.me/573209344964";
const DISPLAY_FONT = "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif";

const SERVICES_DATA = [
  {
    slug: "recorridos-360" as ServiceSlug,
    ordinal: "01",
    title: "Recorridos 360°",
    subtitle: "para negocios",
    description: "Lleva a tus clientes a una experiencia inmersiva de tu negocio. Tours virtuales profesionales que venden antes de que lleguen.",
    imageSrc: "https://images.unsplash.com/photo-1617802690992-15d93263d3a9?w=900&q=80",
    preview: {
      headline: "Tu negocio en 360°",
      emoji: "🗺️",
      benefits: ["Aumenta conversiones hasta 40%", "Disponible 24/7 en Google Maps", "Atrae clientes antes de su visita", "Compatible con web, redes y Google Business"],
      process: ["Visita y toma de fotos esféricas", "Edición y montaje del tour", "Integración en tus plataformas", "Entrega en 5–7 días hábiles"],
      accent: "#1B4D5C",
    },
    cta: "Cotizar Recorrido 360°",
    waMessage: "Hola Luisito, me interesa el servicio de Recorridos 360° para mi negocio",
  },
  {
    slug: "contenido-viral" as ServiceSlug,
    ordinal: "02",
    title: "Contenido viral",
    subtitle: "orgánico",
    description: "Fotos, reels y videos que conectan con tu audiencia. Estrategia de contenido que genera seguidores reales y ventas.",
    imageSrc: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=900&q=80",
    preview: {
      headline: "Contenido que vende",
      emoji: "📸",
      benefits: ["De 2K a 28K seguidores en 6 meses", "Reels con millones de vistas", "Estrategia alineada a tu marca", "Resultados medibles y reales"],
      process: ["Sesión de brief y estrategia", "Producción fotográfica / video", "Edición y optimización", "Publicación y análisis"],
      accent: "#B5763A",
    },
    cta: "Cotizar Contenido",
    waMessage: "Hola Luisito, me interesa el servicio de Creación de Contenido",
  },
  {
    slug: "viajes" as ServiceSlug,
    ordinal: "03",
    title: "Viaja",
    subtitle: "conmigo",
    description: "Únete a nuestros grupos de viaje a los destinos más increíbles de Colombia y el mundo. Experiencias auténticas, comunidad real.",
    imageSrc: "/IMG_2941.jpg",
    preview: {
      headline: "Destinos que te cambian",
      emoji: "✈️",
      benefits: ["Grupos pequeños (máx. 15 personas)", "Destinos únicos y alternativos", "Comunidad de viajeros reales", "Todo coordinado y planificado"],
      process: ["Elige el destino y fecha", "Reserva tu cupo", "Prepárate con nuestra guía", "Vive la experiencia"],
      accent: "#B5763A",
    },
    cta: "Reservar cupo",
    waMessage: "Hola Luisito, me interesa viajar en uno de tus grupos",
  },
];

const EASE = [0.2, 0, 0, 1] as const;

const rowVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: EASE, delay: i * 0.07 },
  }),
};

const panelVariants = {
  hidden: { height: 0, opacity: 0 },
  visible: { height: "auto", opacity: 1, transition: { duration: 0.42, ease: EASE } },
  exit: { height: 0, opacity: 0, transition: { duration: 0.32, ease: EASE } },
};

const listItemVariants = {
  hidden: { opacity: 0, x: -6 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.3, ease: EASE, delay: i * 0.06 },
  }),
};

function WaIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill={C.wa} aria-hidden="true" style={{ flexShrink: 0 }}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

// Mobile inline preview panel (same as before)
function PreviewPanel({ service, onSelect }: { service: (typeof SERVICES_DATA)[number]; onSelect: () => void }) {
  const { preview, cta, waMessage } = service;
  const waHref = `${WA_BASE}?text=${encodeURIComponent(waMessage)}`;

  return (
    <motion.div
      key={service.slug}
      variants={panelVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      style={{ overflow: "hidden" }}
    >
      <div style={{ backgroundColor: C.panelBg, borderLeft: `3px solid ${preview.accent}`, padding: "2rem 2rem 2rem 2.5rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "2rem" }}>
          {/* Col 1 — headline */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <span style={{ fontSize: "2rem", lineHeight: 1 }}>{preview.emoji}</span>
            <h3 style={{ fontFamily: DISPLAY_FONT, fontSize: "clamp(1.5rem, 2.8vw, 2rem)", fontWeight: 400, lineHeight: 1.15, color: C.ink, marginTop: "0.25rem" }}>
              {preview.headline}
            </h3>
            <p style={{ fontSize: "0.8125rem", color: C.inkMuted, marginTop: "0.5rem", lineHeight: 1.65 }}>
              {service.description}
            </p>
          </div>

          {/* Col 2 — benefits */}
          <div>
            <p style={{ fontSize: "0.6875rem", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: preview.accent, marginBottom: "0.875rem" }}>
              Beneficios
            </p>
            <ul style={{ display: "flex", flexDirection: "column", gap: "0.625rem", padding: 0, margin: 0 }}>
              {preview.benefits.map((benefit, i) => (
                <motion.li key={benefit} custom={i} variants={listItemVariants} initial="hidden" animate="visible"
                  style={{ display: "flex", alignItems: "flex-start", gap: "0.625rem", fontSize: "0.875rem", color: C.ink, lineHeight: 1.5, listStyle: "none" }}>
                  <span style={{ display: "inline-block", width: "1.25rem", height: "1px", backgroundColor: preview.accent, marginTop: "0.65em", flexShrink: 0 }} />
                  {benefit}
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Col 3 — process */}
          <div>
            <p style={{ fontSize: "0.6875rem", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: preview.accent, marginBottom: "0.875rem" }}>
              Cómo funciona
            </p>
            <ol style={{ display: "flex", flexDirection: "column", gap: "0.625rem", padding: 0, margin: 0 }}>
              {preview.process.map((step, i) => (
                <motion.li key={step} custom={i} variants={listItemVariants} initial="hidden" animate="visible"
                  style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem", fontSize: "0.875rem", color: C.ink, lineHeight: 1.5, listStyle: "none" }}>
                  <span style={{ fontFamily: DISPLAY_FONT, fontSize: "0.8125rem", color: preview.accent, fontWeight: 500, minWidth: "1rem", flexShrink: 0 }}>
                    {i + 1}.
                  </span>
                  {step}
                </motion.li>
              ))}
            </ol>
          </div>
        </div>

        {/* Panel CTAs */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", marginTop: "2rem", paddingTop: "1.5rem", borderTop: `1px solid ${C.borderDark}` }}>
          <button onClick={onSelect}
            style={{ backgroundColor: preview.accent, color: "#FFFFFF", fontSize: "0.875rem", fontWeight: 600, padding: "0.75rem 1.5rem", borderRadius: "2px", border: "none", cursor: "pointer", letterSpacing: "0.02em" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = "0.88"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = "1"; }}
          >
            {cta}
          </button>
          <a href={waHref} target="_blank" rel="noopener noreferrer"
            style={{ display: "flex", alignItems: "center", gap: "0.5rem", backgroundColor: "transparent", color: C.ink, fontSize: "0.875rem", fontWeight: 500, padding: "0.75rem 1.25rem", borderRadius: "2px", border: `1px solid ${C.borderDark}`, textDecoration: "none", transition: "border-color 0.15s ease" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.borderColor = C.wa; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.borderColor = C.borderDark; }}
          >
            <WaIcon /> WhatsApp directo
          </a>
        </div>
      </div>
    </motion.div>
  );
}

// Desktop sticky visual panel
function StickyPreviewPanel({
  service,
  onSelect,
}: {
  service: (typeof SERVICES_DATA)[number];
  onSelect: () => void;
}) {
  const { preview, cta, waMessage, imageSrc } = service;
  const waHref = `${WA_BASE}?text=${encodeURIComponent(waMessage)}`;
  const isExternal = imageSrc.startsWith("http");

  return (
    <div
      style={{
        position: "sticky",
        top: "120px",
        border: `1px solid ${C.border}`,
        backgroundColor: "#EDEAE3",
        overflow: "hidden",
      }}
    >
      {/* Accent bar */}
      <div style={{ height: "3px", backgroundColor: preview.accent }} />

      {/* Image */}
      <div style={{ position: "relative", height: "280px", overflow: "hidden" }}>
        <Image
          src={imageSrc}
          alt={service.title}
          fill
          sizes="44vw"
          style={{ objectFit: "cover" }}
          {...(isExternal ? { unoptimized: true } : {})}
        />
      </div>

      {/* Content */}
      <div style={{ padding: "24px 24px 28px" }}>
        {/* Emoji + headline */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
          <span style={{ fontSize: "22px", lineHeight: 1 }}>{preview.emoji}</span>
          <h3
            style={{
              fontFamily: DISPLAY_FONT,
              fontSize: "26px",
              fontWeight: 400,
              lineHeight: 1.1,
              color: C.ink,
            }}
          >
            {preview.headline}
          </h3>
        </div>

        {/* Description (2-line clamp) */}
        <p
          style={{
            fontSize: "13px",
            color: C.inkMuted,
            lineHeight: 1.65,
            marginBottom: "16px",
            overflow: "hidden",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
          }}
        >
          {service.description}
        </p>

        {/* Benefits */}
        <ul style={{ listStyle: "none", padding: 0, margin: "0 0 20px", display: "flex", flexDirection: "column", gap: "6px" }}>
          {preview.benefits.map((b) => (
            <li key={b} style={{ display: "flex", alignItems: "flex-start", gap: "8px", fontSize: "13px", color: C.ink, lineHeight: 1.5 }}>
              <span style={{ color: C.copper, flexShrink: 0, marginTop: "1px", fontWeight: 600 }}>✓</span>
              {b}
            </li>
          ))}
        </ul>

        {/* CTAs */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", paddingTop: "16px", borderTop: `1px solid ${C.border}` }}>
          <button
            onClick={onSelect}
            style={{
              flex: 1,
              backgroundColor: preview.accent,
              color: "#FFF",
              fontSize: "13px",
              fontWeight: 600,
              padding: "10px 16px",
              border: "none",
              borderRadius: "2px",
              cursor: "pointer",
              letterSpacing: "0.02em",
              transition: "opacity 0.2s ease",
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.opacity = "0.85")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.opacity = "1")}
          >
            {cta}
          </button>
          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              padding: "10px 14px",
              border: `1px solid ${C.borderDark}`,
              borderRadius: "2px",
              fontSize: "13px",
              color: C.ink,
              textDecoration: "none",
              transition: "border-color 0.15s ease",
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.borderColor = C.wa)}
            onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.borderColor = C.borderDark)}
          >
            <WaIcon /> WA
          </a>
        </div>
      </div>
    </div>
  );
}

export default function ServicesGrid({ onServiceSelect }: ServicesGridProps) {
  const [activeSlug, setActiveSlug] = useState<ServiceSlug | null>(null);
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });

  const toggleService = (slug: ServiceSlug) => {
    setActiveSlug((prev) => (prev === slug ? null : slug));
  };

  const openService = (slug: ServiceSlug) => setActiveSlug(slug);
  const closeService = () => setActiveSlug(null);

  const displayService =
    (activeSlug ? SERVICES_DATA.find((s) => s.slug === activeSlug) : null) ??
    SERVICES_DATA[0];

  return (
    <section
      id="servicios"
      ref={sectionRef}
      style={{
        backgroundColor: C.surface,
        scrollMarginTop: "4rem",
        paddingTop: "clamp(5rem, 10vw, 10rem)",
        paddingBottom: "clamp(5rem, 10vw, 10rem)",
        paddingLeft: "1.5rem",
        paddingRight: "1.5rem",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.5, ease: EASE }}
          style={{ marginBottom: "4rem" }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.25rem" }}>
            <span style={{ fontSize: "0.6875rem", fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: C.inkMuted }}>
              SERVICIOS
            </span>
            <span style={{ width: "3rem", height: "1px", backgroundColor: C.border }} />
          </div>
          <h2 style={{ fontFamily: DISPLAY_FONT, fontSize: "clamp(2.5rem, 5.5vw, 4rem)", fontWeight: 300, lineHeight: 1.05, color: C.ink, maxWidth: "18ch" }}>
            Lo que hacemos<br />juntos.
          </h2>
        </motion.div>

        {/* Split layout: accordion left + sticky visual right */}
        <div className="grid grid-cols-1 lg:grid-cols-[56fr_44fr] gap-10">

          {/* Left: accordion list */}
          <div>
            {SERVICES_DATA.map((service, index) => {
              const isActive = activeSlug === service.slug;
              return (
                <div
                  key={service.slug}
                  onMouseEnter={() => openService(service.slug)}
                  onMouseLeave={closeService}
                >
                  <motion.div custom={index} variants={rowVariants} initial="hidden" animate={inView ? "visible" : "hidden"}>
                    <div style={{ height: "1px", backgroundColor: C.border }} />
                    <button
                      onClick={() => toggleService(service.slug)}
                      aria-expanded={isActive}
                      style={{
                        width: "100%",
                        display: "grid",
                        gridTemplateColumns: "2.5rem 1fr",
                        gap: "1.25rem",
                        alignItems: "center",
                        paddingTop: "1.5rem",
                        paddingBottom: "1.5rem",
                        paddingRight: "0.25rem",
                        paddingLeft: isActive ? "1rem" : "0.25rem",
                        backgroundColor: isActive ? C.surfaceDark : "transparent",
                        border: "none",
                        borderLeft: `3px solid ${isActive ? C.teal : "transparent"}`,
                        cursor: "pointer",
                        textAlign: "left",
                        transition: "background-color 0.2s ease, border-color 0.2s ease, padding-left 0.2s ease",
                      }}
                      onMouseEnter={(e) => { if (!isActive) (e.currentTarget as HTMLButtonElement).style.backgroundColor = C.surfaceDark; }}
                      onMouseLeave={(e) => { if (!isActive) (e.currentTarget as HTMLButtonElement).style.backgroundColor = "transparent"; }}
                    >
                      {/* Ordinal */}
                      <span style={{ fontFamily: DISPLAY_FONT, fontSize: "0.8125rem", color: C.copper, fontWeight: 400, letterSpacing: "0.04em", flexShrink: 0 }}>
                        {service.ordinal}
                      </span>

                      {/* Title + toggle */}
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem", flexWrap: "wrap" }}>
                        <span style={{ fontFamily: DISPLAY_FONT, fontSize: "clamp(1.75rem, 3vw, 2.625rem)", fontWeight: 400, lineHeight: 1.1, color: C.ink }}>
                          {service.title}{" "}
                          <em style={{ fontStyle: "italic", fontWeight: 300, color: C.inkMuted }}>{service.subtitle}</em>
                        </span>
                        <span style={{ fontSize: "0.8125rem", color: isActive ? C.teal : C.inkMuted, fontWeight: 500, whiteSpace: "nowrap", display: "flex", alignItems: "center", gap: "0.375rem", transition: "color 0.2s ease", flexShrink: 0 }}>
                          Ver detalles
                          <motion.span
                            animate={{ rotate: isActive ? 90 : 0 }}
                            transition={{ duration: 0.25, ease: EASE }}
                            style={{ display: "inline-block" }}
                          >
                            →
                          </motion.span>
                        </span>
                      </div>
                    </button>
                    <div style={{ height: "1px", backgroundColor: C.border }} />
                  </motion.div>

                  {/* Inline panel — mobile only */}
                  <div className="lg:hidden">
                    <AnimatePresence>
                      {isActive && (
                        <PreviewPanel
                          service={service}
                          onSelect={() => onServiceSelect(service.slug)}
                        />
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              );
            })}

            {/* Bottom nudge */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.5, ease: EASE, delay: 0.55 }}
              style={{ marginTop: "3rem", fontSize: "0.8125rem", color: C.inkMuted, textAlign: "center" }}
            >
              ¿No sabes cuál elegir?{" "}
              <a
                href={`${WA_BASE}?text=${encodeURIComponent("Hola Luisito, me gustaría conocer qué servicio se adapta mejor a mi negocio")}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: C.teal, textDecoration: "underline", textDecorationColor: `${C.teal}66`, textUnderlineOffset: "3px" }}
              >
                Escríbeme y lo definimos juntos.
              </a>
            </motion.p>
          </div>

          {/* Right: sticky visual panel — desktop only */}
          <div className="hidden lg:block">
            <AnimatePresence mode="wait">
              <motion.div
                key={displayService.slug}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.28, ease: EASE }}
              >
                <StickyPreviewPanel
                  service={displayService}
                  onSelect={() => onServiceSelect(displayService.slug)}
                />
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}
