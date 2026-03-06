"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  MessageCircle, MapPin, Backpack, Navigation,
  Lightbulb, Target, Camera, BarChart2,
  type LucideProps,
} from "lucide-react";
import { waLink } from "../data/content";

type Icon = React.ComponentType<LucideProps>;

const ICONS: Record<string, Icon> = {
  message: MessageCircle,
  mappin: MapPin,
  backpack: Backpack,
  navigation: Navigation,
  lightbulb: Lightbulb,
  target: Target,
  camera: Camera,
  chart: BarChart2,
};

const EASE: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

const TRACKS = {
  viajes: {
    label: "Para tu viaje",
    headline: "Tu aventura empieza con un mensaje.",
    sub: "Planificación real, sin agencias impersonales. Luisito te acompaña de principio a fin.",
    steps: [
      {
        num: "01",
        icon: "message",
        title: "Me escribes",
        desc: "Por WhatsApp o Instagram. Me cuentas a dónde quieres ir, cuándo, con quién y tu presupuesto. Sin formularios, sin burocracia.",
        tag: "Sin costo · Sin compromiso",
      },
      {
        num: "02",
        icon: "mappin",
        title: "Armo tu plan",
        desc: "Itinerario personalizado, hospedaje real, transportes y costos exactos. Todo listo para que solo tengas que decir que sí.",
        tag: "En menos de 48h",
      },
      {
        num: "03",
        icon: "backpack",
        title: "Te preparo",
        desc: "Tips del destino, lista de equipaje, documentos necesarios y recomendaciones locales que ningún blog te va a dar.",
        tag: "Asesoría completa",
      },
      {
        num: "04",
        icon: "navigation",
        title: "Viajamos",
        desc: "En grupo: nos vamos juntos. Solo: tengo soporte activo antes, durante y después de tu viaje. Siempre disponible en WA.",
        tag: "Acompañamiento real",
      },
    ],
    cta: "Empezar mi viaje",
    ctaMsg: "Hola Luisito, quiero planificar mi próximo viaje contigo",
  },
  marcas: {
    label: "Para tu marca",
    headline: "Contenido que vende desde el primer día.",
    sub: "200K seguidores reales que confían en lo que Luisito recomienda. Eso vale más que cualquier pauta pagada.",
    steps: [
      {
        num: "01",
        icon: "lightbulb",
        title: "Me cuentas todo",
        desc: "Qué vendes, a quién le hablas, qué quieres lograr. Me interesa entender tu negocio, no solo publicar una foto.",
        tag: "Primera consulta gratis",
      },
      {
        num: "02",
        icon: "target",
        title: "Definimos la estrategia",
        desc: "Qué tipo de contenido, en qué plataformas, con qué tono. Siempre auténtico, nunca forzado. Tu marca en el contexto correcto.",
        tag: "Propuesta personalizada",
      },
      {
        num: "03",
        icon: "camera",
        title: "Creamos y publicamos",
        desc: "Fotos, reels, stories. Producción completa y publicación coordinada en Instagram, TikTok y Facebook con tu marca.",
        tag: "Contenido profesional",
      },
      {
        num: "04",
        icon: "chart",
        title: "Medimos resultados",
        desc: "Informe real al cierre: alcance, interacciones, tráfico generado. Sin humo. Sabes exactamente lo que obtuvo tu inversión.",
        tag: "Informe incluido",
      },
    ],
    cta: "Quiero pautar con Luisito",
    ctaMsg: "Hola Luisito, me interesa pautar mi marca contigo",
  },
} as const;

type TrackKey = keyof typeof TRACKS;

export default function HowItWorksSection() {
  const [activeTrack, setActiveTrack] = useState<TrackKey>("viajes");
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const track = TRACKS[activeTrack];

  return (
    <section
      style={{
        backgroundColor: "#F5F2ED",
        borderTop: "1px solid #D8D4CC",
        padding: "clamp(5rem, 10vw, 8rem) 1.5rem",
      }}
    >
      <div ref={ref} style={{ maxWidth: "1200px", margin: "0 auto" }}>

        {/* ── Header + tab switcher ──────────────────────────── */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-14">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, ease: EASE }}
          >
            <p style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.22em", textTransform: "uppercase", color: "#5C6460", marginBottom: "14px" }}>
              &mdash; ASÍ FUNCIONA
            </p>
            <h2
              className="font-display font-light"
              style={{ fontSize: "clamp(40px, 5.5vw, 64px)", lineHeight: 1.05, color: "#0D1511" }}
            >
              Simple, directo<br />y <em style={{ color: "#B5763A" }}>sin vueltas.</em>
            </h2>
          </motion.div>

          {/* Tab switcher */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.15, ease: EASE }}
            style={{
              display: "inline-flex",
              border: "1px solid #D8D4CC",
              backgroundColor: "#EDEAE3",
              padding: "3px",
              gap: "2px",
              flexShrink: 0,
            }}
          >
            {(["viajes", "marcas"] as TrackKey[]).map((key) => (
              <button
                key={key}
                onClick={() => setActiveTrack(key)}
                style={{
                  padding: "8px 20px",
                  fontSize: "12px",
                  fontWeight: 500,
                  letterSpacing: "0.06em",
                  border: "none",
                  cursor: "pointer",
                  transition: "all 0.22s ease",
                  backgroundColor: activeTrack === key ? "#0D1511" : "transparent",
                  color: activeTrack === key ? "#FFFFFF" : "#5C6460",
                }}
              >
                {TRACKS[key].label}
              </button>
            ))}
          </motion.div>
        </div>

        {/* ── Body: steps left + photo right ──────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-[58fr_42fr] gap-12 lg:gap-16 items-start">

          {/* Left: animated steps */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTrack}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 12 }}
              transition={{ duration: 0.35, ease: EASE }}
            >
              {/* Sub-headline */}
              <p style={{ fontSize: "15px", lineHeight: 1.65, color: "#5C6460", marginBottom: "40px", maxWidth: "52ch" }}>
                {track.sub}
              </p>

              {/* Steps */}
              <div style={{ position: "relative" }}>
                {/* Vertical route line */}
                <div
                  style={{
                    position: "absolute",
                    left: "23px",
                    top: "48px",
                    bottom: "48px",
                    width: "1px",
                    backgroundColor: "#D8D4CC",
                  }}
                />

                {track.steps.map((step, i) => (
                  <motion.div
                    key={step.num}
                    initial={{ opacity: 0, y: 14 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.45, delay: 0.1 + i * 0.1, ease: EASE }}
                    style={{
                      display: "flex",
                      gap: "20px",
                      paddingBottom: i < track.steps.length - 1 ? "32px" : "0",
                    }}
                  >
                    {/* Step marker */}
                    <div style={{ flexShrink: 0, display: "flex", flexDirection: "column", alignItems: "center" }}>
                      <div
                        style={{
                          width: "46px",
                          height: "46px",
                          borderRadius: "50%",
                          backgroundColor: i === 0 ? "#0D1511" : "#EDEAE3",
                          border: `1px solid ${i === 0 ? "#0D1511" : "#D8D4CC"}`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                          position: "relative",
                          zIndex: 1,
                        }}
                      >
                        {(() => {
                          const IconComp = ICONS[step.icon];
                          return IconComp ? (
                            <IconComp
                              size={18}
                              strokeWidth={1.5}
                              color={i === 0 ? "#D4A574" : "#5C6460"}
                            />
                          ) : null;
                        })()}
                      </div>
                    </div>

                    {/* Content */}
                    <div style={{ paddingTop: "8px", flex: 1 }}>
                      {/* Tag */}
                      <span
                        style={{
                          display: "inline-block",
                          fontSize: "10px",
                          fontWeight: 600,
                          letterSpacing: "0.16em",
                          textTransform: "uppercase",
                          color: "#B5763A",
                          marginBottom: "6px",
                        }}
                      >
                        {step.tag}
                      </span>

                      <h3
                        className="font-display"
                        style={{
                          fontSize: "clamp(22px, 2.5vw, 28px)",
                          fontWeight: 400,
                          color: "#0D1511",
                          lineHeight: 1.1,
                          marginBottom: "8px",
                        }}
                      >
                        {step.num}. {step.title}
                      </h3>

                      <p style={{ fontSize: "14px", lineHeight: 1.7, color: "#5C6460" }}>
                        {step.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ duration: 0.45, delay: 0.55, ease: EASE }}
                style={{ marginTop: "40px", paddingLeft: "66px" }}
              >
                <a
                  href={waLink(track.ctaMsg)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-3"
                  style={{
                    backgroundColor: "#0D1511",
                    color: "#FFFFFF",
                    fontSize: "13px",
                    fontWeight: 500,
                    letterSpacing: "0.06em",
                    padding: "14px 28px",
                    textDecoration: "none",
                    transition: "background-color 0.25s ease",
                  }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#1B4D5C")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#0D1511")}
                >
                  {track.cta}
                  <span style={{ transition: "transform 0.2s ease" }} className="group-hover:translate-x-1">→</span>
                </a>
              </motion.div>
            </motion.div>
          </AnimatePresence>

          {/* Right: photo + floating cards */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
            className="hidden lg:block"
            style={{ position: "sticky", top: "120px" }}
          >
            <div style={{ position: "relative" }}>
              {/* Copper offset frame */}
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  top: "12px",
                  left: "12px",
                  right: "-12px",
                  bottom: "-12px",
                  border: "1px solid #B5763A",
                  opacity: 0.5,
                }}
              />

              {/* Main photo */}
              <div style={{ position: "relative", aspectRatio: "3/4", overflow: "hidden" }}>
                <Image
                  src="/yoluisito.webp"
                  alt="Luisito El Viajero"
                  fill
                  sizes="42vw"
                  style={{ objectFit: "cover" }}
                />
                {/* Dark gradient bottom */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(to top, rgba(13,21,17,0.7) 0%, transparent 55%)",
                  }}
                />

                {/* Bottom text overlay */}
                <div style={{ position: "absolute", bottom: "24px", left: "24px", right: "24px" }}>
                  <p style={{ fontSize: "11px", letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", marginBottom: "4px" }}>
                    Luisito El Viajero
                  </p>
                  <p
                    className="font-display font-light"
                    style={{ fontSize: "22px", color: "#FFFFFF", lineHeight: 1.1 }}
                  >
                    Tu compañero de viaje<br />
                    <em style={{ color: "#D4A574" }}>en Colombia y el mundo.</em>
                  </p>
                </div>
              </div>

              {/* Floating stat cards */}
              <div
                style={{
                  position: "absolute",
                  top: "-18px",
                  right: "-24px",
                  backgroundColor: "#FFFFFF",
                  border: "1px solid #D8D4CC",
                  padding: "14px 18px",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                }}
              >
                <p className="font-display" style={{ fontSize: "36px", fontWeight: 300, lineHeight: 1, color: "#B5763A" }}>10+</p>
                <p style={{ fontSize: "11px", fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase", color: "#5C6460", marginTop: "3px" }}>años viajando</p>
              </div>

              <div
                style={{
                  position: "absolute",
                  bottom: "80px",
                  right: "-24px",
                  backgroundColor: "#0D1511",
                  padding: "14px 18px",
                }}
              >
                <p className="font-display" style={{ fontSize: "28px", fontWeight: 300, lineHeight: 1, color: "#D4A574" }}>200K+</p>
                <p style={{ fontSize: "11px", fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", marginTop: "3px" }}>seguidores</p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
