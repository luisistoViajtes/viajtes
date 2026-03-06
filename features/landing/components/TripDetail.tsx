"use client";

import { useState, useEffect, useRef, FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { MapPin, Calendar, DollarSign, Users, Check } from "lucide-react";
import type { Trip, TripDate } from "@/features/landing/data/trips";
import {
  fadeUpVariants,
  staggerContainerVariants,
} from "@/features/landing/hooks/useScrollReveal";

// ── helpers ──────────────────────────────────────────────────────────

const WA_NUMBER = "573209344964";

function waLinkTrip(dest: string) {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(
    `Hola Luisito, tengo dudas sobre el viaje a ${dest}`
  )}`;
}

function isValidEmail(email: string): boolean {
  return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
}

function isValidPhone(phone: string): boolean {
  const clean = phone.replace(/[\s\-().]/g, "");
  return /^3[0-9]{9}$/.test(clean);
}

// ── component ────────────────────────────────────────────────────────

interface TripDetailProps {
  trip: Trip;
}

export default function TripDetail({ trip }: TripDetailProps) {
  // ── scroll-based sticky nav ────────────────────────────────────────
  const [showNav, setShowNav] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowNav(window.scrollY > window.innerHeight * 0.7);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ── section refs for inView animations ─────────────────────────────
  const infoRef = useRef(null);
  const bodyRef = useRef(null);
  const galleryRef = useRef(null);
  const ctaRef = useRef(null);
  const infoInView = useInView(infoRef, { once: true, margin: "-60px" });
  const bodyInView = useInView(bodyRef, { once: true, margin: "-60px" });
  const galleryInView = useInView(galleryRef, { once: true, margin: "-60px" });
  const ctaInView = useInView(ctaRef, { once: true, margin: "-60px" });

  // ── form state ─────────────────────────────────────────────────────
  const [selectedDate, setSelectedDate] = useState<TripDate | null>(
    trip.dates.find((d) => d.status === "open") ?? trip.dates[0] ?? null
  );
  const [name, setName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [email, setEmail] = useState("");
  const [personas, setPersonas] = useState(1);
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  // ── derived values ─────────────────────────────────────────────────
  const nextOpenDate = trip.dates.find((d) => d.status === "open");
  const groupSize = trip.dates[0]?.spotsTotal ?? 12;

  // ── submit handler ─────────────────────────────────────────────────
  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");

    if (!name.trim()) {
      setError("Por favor ingresa tu nombre.");
      return;
    }
    if (!isValidPhone(whatsapp)) {
      setError(
        "Ingresa un número de WhatsApp válido (10 dígitos, ej: 3001234567)."
      );
      return;
    }
    if (!isValidEmail(email)) {
      setError("Por favor ingresa un correo electrónico válido.");
      return;
    }
    if (!selectedDate) {
      setError("Selecciona una fecha para el viaje.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/trip-registration", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          whatsapp: whatsapp.trim(),
          email: email.trim(),
          personas,
          message: message.trim(),
          tripSlug: trip.slug,
          tripDest: trip.dest,
          dateId: selectedDate.id,
          dateRange: selectedDate.dateRange,
          price: selectedDate.price,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Error al enviar. Intenta de nuevo.");
      } else {
        setSuccess(true);
      }
    } catch {
      setError("Error de conexión. Intenta de nuevo.");
    } finally {
      setSubmitting(false);
    }
  }

  // ── scroll to registro ─────────────────────────────────────────────
  function scrollToRegistro() {
    document.getElementById("registro")?.scrollIntoView({ behavior: "smooth" });
  }

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // RENDER
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  return (
    <div style={{ backgroundColor: "#F5F2ED", color: "#0D1511" }}>
      {/* ── A. Sticky Nav ─────────────────────────────────────────── */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          background: "rgba(13,21,17,0.92)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          transform: showNav ? "translateY(0)" : "translateY(-100%)",
          transition: "transform 0.35s ease",
        }}
      >
        <div
          style={{
            maxWidth: "1152px",
            margin: "0 auto",
            padding: "14px 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Link
            href="/#viajes"
            style={{
              color: "rgba(255,255,255,0.55)",
              fontSize: "13px",
              textDecoration: "none",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.color = "rgba(255,255,255,0.9)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "rgba(255,255,255,0.55)")
            }
          >
            &larr; Todos los viajes
          </Link>

          <span
            className="font-display"
            style={{
              color: "#FFFFFF",
              fontSize: "16px",
              fontWeight: 400,
              letterSpacing: "0.02em",
            }}
          >
            {trip.dest}
          </span>

          <button
            onClick={scrollToRegistro}
            style={{
              color: "#FFFFFF",
              fontSize: "13px",
              fontWeight: 600,
              background: "none",
              border: "1px solid rgba(255,255,255,0.18)",
              padding: "8px 18px",
              cursor: "pointer",
              transition: "border-color 0.2s, background 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.5)";
              e.currentTarget.style.background = "rgba(255,255,255,0.06)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.18)";
              e.currentTarget.style.background = "none";
            }}
          >
            Inscribirme &rarr;
          </button>
        </div>
      </nav>

      {/* ── B. Hero (100vh) ───────────────────────────────────────── */}
      <section
        style={{
          position: "relative",
          height: "100vh",
          minHeight: "600px",
          overflow: "hidden",
        }}
      >
        <Image
          src={trip.heroSrc}
          alt={trip.dest}
          fill
          priority
          style={{ objectFit: "cover" }}
          sizes="100vw"
        />

        {/* gradient overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.1) 40%, rgba(0,0,0,0.65) 100%)",
          }}
        />

        {/* back link (always visible) */}
        <Link
          href="/"
          style={{
            position: "absolute",
            top: "28px",
            left: "28px",
            color: "rgba(255,255,255,0.75)",
            fontSize: "14px",
            textDecoration: "none",
            zIndex: 10,
            display: "flex",
            alignItems: "center",
            gap: "6px",
            transition: "color 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#FFFFFF")}
          onMouseLeave={(e) =>
            (e.currentTarget.style.color = "rgba(255,255,255,0.75)")
          }
        >
          &larr; Volver
        </Link>

        {/* bottom-left content */}
        <div
          style={{
            position: "absolute",
            bottom: "60px",
            left: "28px",
            right: "200px",
            zIndex: 10,
          }}
        >
          <p
            style={{
              fontSize: "11px",
              fontWeight: 600,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "#D4A574",
              marginBottom: "12px",
            }}
          >
            {trip.region}
          </p>
          <h1
            className="font-display"
            style={{
              fontSize: "clamp(52px, 8vw, 100px)",
              fontWeight: 300,
              fontStyle: "italic",
              color: "#FFFFFF",
              lineHeight: 0.95,
              marginBottom: "8px",
            }}
          >
            {trip.dest}
          </h1>
          <p
            style={{
              fontSize: "12px",
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.5)",
              marginBottom: "16px",
            }}
          >
            {trip.country}
          </p>
          <p
            style={{
              fontSize: "18px",
              color: "rgba(255,255,255,0.7)",
              maxWidth: "520px",
              lineHeight: 1.55,
            }}
          >
            {trip.tagline}
          </p>
        </div>

        {/* bottom-right date badge */}
        {nextOpenDate && (
          <div
            style={{
              position: "absolute",
              bottom: "60px",
              right: "28px",
              background: "rgba(13,21,17,0.7)",
              backdropFilter: "blur(8px)",
              border: "1px solid rgba(212,165,116,0.3)",
              padding: "14px 20px",
              zIndex: 10,
              maxWidth: "200px",
            }}
          >
            <p
              style={{
                fontSize: "10px",
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "#D4A574",
                marginBottom: "6px",
              }}
            >
              Próxima fecha
            </p>
            <p
              style={{
                fontSize: "14px",
                color: "#FFFFFF",
                fontWeight: 500,
              }}
            >
              {nextOpenDate.dateRange}
            </p>
          </div>
        )}
      </section>

      {/* ── C. Info Strip ─────────────────────────────────────────── */}
      <motion.section
        ref={infoRef}
        variants={staggerContainerVariants}
        initial="hidden"
        animate={infoInView ? "visible" : "hidden"}
        style={{
          backgroundColor: "#F5F2ED",
          borderBottom: "1px solid #D8D4CC",
          padding: "32px 24px",
        }}
      >
        <div
          style={{
            maxWidth: "1152px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "0",
          }}
        >
          {[
            {
              icon: <MapPin size={16} style={{ color: "#B5763A" }} />,
              label: "Punto de encuentro",
              value: trip.meetingPoint,
            },
            {
              icon: <Calendar size={16} style={{ color: "#B5763A" }} />,
              label: "Próxima fecha",
              value: nextOpenDate?.dateRange ?? trip.dates[0]?.dateRange ?? "Por confirmar",
            },
            {
              icon: <DollarSign size={16} style={{ color: "#B5763A" }} />,
              label: "Desde",
              value: trip.dates[0]?.price ?? "Por confirmar",
            },
            {
              icon: <Users size={16} style={{ color: "#B5763A" }} />,
              label: "Grupo",
              value: `Máx ${groupSize} personas`,
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              variants={fadeUpVariants}
              style={{
                padding: "12px 20px",
                borderLeft: i > 0 ? "1px solid #D8D4CC" : "none",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  marginBottom: "6px",
                }}
              >
                {item.icon}
                <span
                  style={{
                    fontSize: "10px",
                    fontWeight: 600,
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    color: "#5C6460",
                  }}
                >
                  {item.label}
                </span>
              </div>
              <p
                style={{
                  fontSize: "14px",
                  fontWeight: 500,
                  color: "#0D1511",
                  lineHeight: 1.35,
                }}
              >
                {item.value}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ── D. Main 2-Column Body ─────────────────────────────────── */}
      <section style={{ padding: "80px 24px" }}>
        <motion.div
          ref={bodyRef}
          variants={staggerContainerVariants}
          initial="hidden"
          animate={bodyInView ? "visible" : "hidden"}
          style={{
            maxWidth: "1152px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr 400px",
            gap: "64px",
            alignItems: "start",
          }}
        >
          {/* ── LEFT COLUMN ──────────────────────────────────────── */}
          <div>
            {/* About */}
            <motion.div variants={fadeUpVariants}>
              <p
                style={{
                  fontSize: "11px",
                  fontWeight: 600,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "#5C6460",
                  marginBottom: "24px",
                }}
              >
                &mdash; SOBRE EL VIAJE
              </p>
              <p
                style={{
                  fontSize: "16px",
                  lineHeight: 1.75,
                  color: "#5C6460",
                  maxWidth: "560px",
                }}
              >
                {trip.description}
              </p>
            </motion.div>

            <hr
              style={{
                border: "none",
                borderTop: "1px solid #D8D4CC",
                margin: "48px 0",
              }}
            />

            {/* Includes */}
            <motion.div variants={fadeUpVariants}>
              <h2
                className="font-display"
                style={{
                  fontSize: "32px",
                  fontWeight: 400,
                  color: "#0D1511",
                  marginBottom: "28px",
                }}
              >
                ¿Qué incluye?
              </h2>
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  display: "grid",
                  gap: "14px",
                }}
              >
                {trip.includes.map((item, i) => (
                  <li
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "12px",
                      fontSize: "15px",
                      color: "#0D1511",
                      lineHeight: 1.5,
                    }}
                  >
                    <Check
                      size={18}
                      style={{
                        color: "#B5763A",
                        flexShrink: 0,
                        marginTop: "2px",
                      }}
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            <hr
              style={{
                border: "none",
                borderTop: "1px solid #D8D4CC",
                margin: "48px 0",
              }}
            />

            {/* Highlights */}
            <motion.div variants={fadeUpVariants}>
              <h2
                className="font-display"
                style={{
                  fontSize: "32px",
                  fontWeight: 400,
                  color: "#0D1511",
                  marginBottom: "28px",
                }}
              >
                Experiencias
              </h2>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "12px",
                }}
              >
                {trip.highlights.map((hl, i) => (
                  <div
                    key={i}
                    style={{
                      background: "#0D1511",
                      padding: "20px",
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "10px",
                    }}
                  >
                    <span
                      style={{
                        width: "8px",
                        height: "8px",
                        borderRadius: "50%",
                        backgroundColor: "#D4A574",
                        flexShrink: 0,
                        marginTop: "6px",
                      }}
                    />
                    <span
                      style={{
                        fontSize: "14px",
                        color: "rgba(255,255,255,0.85)",
                        lineHeight: 1.45,
                      }}
                    >
                      {hl}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            <hr
              style={{
                border: "none",
                borderTop: "1px solid #D8D4CC",
                margin: "48px 0",
              }}
            />

            {/* Itinerary */}
            <motion.div variants={fadeUpVariants}>
              <h2
                className="font-display"
                style={{
                  fontSize: "32px",
                  fontWeight: 400,
                  color: "#0D1511",
                  marginBottom: "32px",
                }}
              >
                Itinerario
              </h2>
              <div style={{ display: "grid", gap: "0" }}>
                {trip.itinerary.map((item, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      gap: "24px",
                      padding: "28px 0",
                      borderTop: i === 0 ? "none" : "1px solid #D8D4CC",
                    }}
                  >
                    <p
                      className="font-display"
                      style={{
                        fontSize: "48px",
                        fontWeight: 300,
                        color: "#D8D4CC",
                        lineHeight: 1,
                        minWidth: "100px",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {item.day}
                    </p>
                    <div>
                      <h3
                        style={{
                          fontSize: "18px",
                          fontWeight: 600,
                          color: "#0D1511",
                          marginBottom: "6px",
                        }}
                      >
                        {item.title}
                      </h3>
                      <p
                        style={{
                          fontSize: "14px",
                          lineHeight: 1.65,
                          color: "#5C6460",
                        }}
                      >
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* ── RIGHT COLUMN — Registration Form ────────────────── */}
          <div
            id="registro"
            style={{
              position: "sticky",
              top: "96px",
            }}
          >
            <div
              style={{
                border: "1px solid #D8D4CC",
                backgroundColor: "#FFFFFF",
                padding: "0",
                overflow: "hidden",
              }}
            >
              {/* accent bar */}
              <div
                style={{
                  height: "3px",
                  background: trip.accent,
                }}
              />

              <div style={{ padding: "32px" }}>
                {success ? (
                  <SuccessView />
                ) : (
                  <>
                    <h3
                      className="font-display"
                      style={{
                        fontSize: "28px",
                        fontWeight: 400,
                        color: "#0D1511",
                        marginBottom: "6px",
                      }}
                    >
                      Reserva tu lugar
                    </h3>
                    {nextOpenDate && (
                      <p
                        style={{
                          fontSize: "13px",
                          color: "#5C6460",
                          marginBottom: "28px",
                        }}
                      >
                        {nextOpenDate.spotsLeft} cupos disponibles
                      </p>
                    )}

                    <form
                      onSubmit={handleSubmit}
                      style={{ display: "grid", gap: "20px" }}
                    >
                      {/* Date selector */}
                      <div>
                        <label
                          style={{
                            display: "block",
                            fontSize: "11px",
                            fontWeight: 600,
                            letterSpacing: "0.14em",
                            textTransform: "uppercase",
                            color: "#5C6460",
                            marginBottom: "10px",
                          }}
                        >
                          Fecha del viaje
                        </label>
                        <div style={{ display: "grid", gap: "8px" }}>
                          {trip.dates.map((d) => {
                            const isSelected = selectedDate?.id === d.id;
                            return (
                              <button
                                key={d.id}
                                type="button"
                                onClick={() => setSelectedDate(d)}
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "space-between",
                                  padding: "14px 16px",
                                  border: isSelected
                                    ? `2px solid ${trip.accent}`
                                    : "1px solid #D8D4CC",
                                  background: isSelected
                                    ? `${trip.accent}08`
                                    : "#FFFFFF",
                                  cursor: "pointer",
                                  textAlign: "left",
                                  transition:
                                    "border-color 0.2s, background 0.2s",
                                  width: "100%",
                                }}
                              >
                                <div>
                                  <p
                                    style={{
                                      fontSize: "14px",
                                      fontWeight: 500,
                                      color: "#0D1511",
                                      marginBottom: "2px",
                                    }}
                                  >
                                    {d.dateRange}
                                  </p>
                                  <p
                                    style={{
                                      fontSize: "12px",
                                      color: "#5C6460",
                                    }}
                                  >
                                    {d.price} &middot; {d.priceNote}
                                  </p>
                                </div>
                                <span
                                  style={{
                                    width: "8px",
                                    height: "8px",
                                    borderRadius: "50%",
                                    backgroundColor:
                                      d.status === "open"
                                        ? "#4ADE80"
                                        : "rgba(0,0,0,0.15)",
                                    flexShrink: 0,
                                    boxShadow:
                                      d.status === "open"
                                        ? "0 0 6px rgba(74,222,128,0.5)"
                                        : "none",
                                  }}
                                />
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Name */}
                      <FormField label="Nombre completo">
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Tu nombre"
                          style={inputStyle}
                        />
                      </FormField>

                      {/* WhatsApp */}
                      <FormField label="WhatsApp">
                        <input
                          type="tel"
                          value={whatsapp}
                          onChange={(e) => setWhatsapp(e.target.value)}
                          placeholder="3001234567"
                          style={inputStyle}
                        />
                      </FormField>

                      {/* Email */}
                      <FormField label="Correo electrónico">
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="tu@correo.com"
                          style={inputStyle}
                        />
                      </FormField>

                      {/* Personas */}
                      <FormField label="Personas">
                        <select
                          value={personas}
                          onChange={(e) =>
                            setPersonas(Number(e.target.value))
                          }
                          style={inputStyle}
                        >
                          {Array.from({ length: 8 }, (_, i) => i + 1).map(
                            (n) => (
                              <option key={n} value={n}>
                                {n} {n === 1 ? "persona" : "personas"}
                              </option>
                            )
                          )}
                        </select>
                      </FormField>

                      {/* Message */}
                      <FormField label="Mensaje (opcional)">
                        <textarea
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          placeholder="Alguna duda o comentario..."
                          rows={3}
                          style={{
                            ...inputStyle,
                            resize: "vertical",
                          }}
                        />
                      </FormField>

                      {/* Error */}
                      {error && (
                        <p
                          style={{
                            fontSize: "13px",
                            color: "#DC2626",
                            lineHeight: 1.4,
                          }}
                        >
                          {error}
                        </p>
                      )}

                      {/* Submit */}
                      <button
                        type="submit"
                        disabled={submitting}
                        style={{
                          width: "100%",
                          padding: "16px",
                          background: "#0D1511",
                          color: "#FFFFFF",
                          fontSize: "14px",
                          fontWeight: 600,
                          border: "none",
                          cursor: submitting ? "wait" : "pointer",
                          opacity: submitting ? 0.7 : 1,
                          transition: "opacity 0.2s, background 0.2s",
                          letterSpacing: "0.02em",
                        }}
                        onMouseEnter={(e) => {
                          if (!submitting)
                            e.currentTarget.style.background = "#1a2a22";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = "#0D1511";
                        }}
                      >
                        {submitting
                          ? "Enviando..."
                          : "Enviar inscripción →"}
                      </button>

                      <p
                        style={{
                          fontSize: "12px",
                          color: "#5C6460",
                          textAlign: "center",
                          lineHeight: 1.4,
                        }}
                      >
                        Te contactaremos en menos de 24 horas
                      </p>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── E. Gallery Strip ──────────────────────────────────────── */}
      <section
        style={{
          backgroundColor: "#0D1511",
          padding: "80px 24px",
        }}
      >
        <motion.div
          ref={galleryRef}
          variants={staggerContainerVariants}
          initial="hidden"
          animate={galleryInView ? "visible" : "hidden"}
          style={{ maxWidth: "1152px", margin: "0 auto" }}
        >
          <motion.p
            variants={fadeUpVariants}
            style={{
              fontSize: "11px",
              fontWeight: 600,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#D4A574",
              marginBottom: "32px",
            }}
          >
            &mdash; GALERÍA
          </motion.p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "4px",
            }}
          >
            {trip.gallery.map((src, i) => (
              <motion.div
                key={i}
                variants={fadeUpVariants}
                style={{
                  position: "relative",
                  height: "320px",
                  overflow: "hidden",
                }}
              >
                <Image
                  src={src}
                  alt={`${trip.dest} - foto ${i + 1}`}
                  fill
                  style={{
                    objectFit: "cover",
                    transition: "transform 0.6s ease",
                  }}
                  sizes="(max-width: 768px) 100vw, 33vw"
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLImageElement).style.transform =
                      "scale(1.04)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLImageElement).style.transform =
                      "scale(1)";
                  }}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── F. WhatsApp CTA ───────────────────────────────────────── */}
      <section
        style={{
          backgroundColor: "#F5F2ED",
          borderTop: "1px solid #D8D4CC",
          padding: "80px 24px",
        }}
      >
        <motion.div
          ref={ctaRef}
          variants={staggerContainerVariants}
          initial="hidden"
          animate={ctaInView ? "visible" : "hidden"}
          style={{
            maxWidth: "600px",
            margin: "0 auto",
            textAlign: "center",
          }}
        >
          <motion.h2
            variants={fadeUpVariants}
            className="font-display"
            style={{
              fontSize: "clamp(32px, 4vw, 44px)",
              fontWeight: 300,
              color: "#0D1511",
              marginBottom: "14px",
              lineHeight: 1.1,
            }}
          >
            ¿Tienes dudas?
          </motion.h2>
          <motion.p
            variants={fadeUpVariants}
            style={{
              fontSize: "16px",
              color: "#5C6460",
              marginBottom: "32px",
              lineHeight: 1.6,
            }}
          >
            Escríbenos por WhatsApp y te respondemos en minutos. Sin
            compromiso, sin letra pequeña.
          </motion.p>
          <motion.a
            variants={fadeUpVariants}
            href={waLinkTrip(trip.dest)}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-block",
              padding: "16px 40px",
              backgroundColor: "#1B4D5C",
              color: "#FFFFFF",
              fontSize: "14px",
              fontWeight: 600,
              textDecoration: "none",
              letterSpacing: "0.02em",
              transition: "background-color 0.2s",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "#0F2E38")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "#1B4D5C")
            }
          >
            Preguntar por WhatsApp
          </motion.a>
        </motion.div>
      </section>
    </div>
  );
}

// ── Sub-components ───────────────────────────────────────────────────

function FormField({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        style={{
          display: "block",
          fontSize: "11px",
          fontWeight: 600,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: "#5C6460",
          marginBottom: "8px",
        }}
      >
        {label}
      </label>
      {children}
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "12px 14px",
  fontSize: "14px",
  color: "#0D1511",
  backgroundColor: "#FFFFFF",
  border: "1px solid #D8D4CC",
  outline: "none",
  transition: "border-color 0.2s",
  fontFamily: "inherit",
};

function SuccessView() {
  return (
    <div style={{ textAlign: "center", padding: "24px 0" }}>
      <motion.svg
        width="64"
        height="64"
        viewBox="0 0 64 64"
        fill="none"
        style={{ margin: "0 auto 24px" }}
      >
        <motion.circle
          cx="32"
          cy="32"
          r="30"
          stroke="#4ADE80"
          strokeWidth="2"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
        <motion.path
          d="M20 32 L28 40 L44 24"
          stroke="#4ADE80"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.4, delay: 0.5, ease: "easeOut" }}
        />
      </motion.svg>
      <h3
        className="font-display"
        style={{
          fontSize: "26px",
          fontWeight: 400,
          color: "#0D1511",
          marginBottom: "12px",
        }}
      >
        ¡Inscripción recibida!
      </h3>
      <p
        style={{
          fontSize: "14px",
          color: "#5C6460",
          lineHeight: 1.6,
          maxWidth: "280px",
          margin: "0 auto",
        }}
      >
        Te escribiremos por WhatsApp pronto. Prepárate para una experiencia
        increíble.
      </p>
    </div>
  );
}
