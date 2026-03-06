"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Destination } from "../data/destinations";
import { waLink } from "../data/content";
import { fadeUpVariants, staggerContainerVariants } from "../hooks/useScrollReveal";

export default function DestinationDetail({ destination: d }: { destination: Destination }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.7);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div style={{ backgroundColor: "#F5F2ED", minHeight: "100vh" }}>
      {/* Sticky nav — appears after hero */}
      <motion.nav
        initial={false}
        animate={scrolled ? { y: 0, opacity: 1 } : { y: -64, opacity: 0 }}
        transition={{ duration: 0.3, ease: [0.2, 0, 0, 1] }}
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 h-14"
        style={{
          backgroundColor: "rgba(245,242,237,0.94)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid #D8D4CC",
        }}
      >
        <Link
          href="/"
          className="flex items-center gap-2 text-[12px] uppercase tracking-[0.14em]"
          style={{ color: "#5C6460" }}
        >
          ← Volver
        </Link>
        <span
          className="font-display font-light text-[17px]"
          style={{ color: "#0D1511" }}
        >
          {d.name}
        </span>
        <a
          href={waLink(d.waNextTrip)}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden sm:flex items-center gap-1.5 text-[11px] uppercase tracking-[0.14em] px-4 py-2"
          style={{ backgroundColor: "#25D366", color: "#FFFFFF" }}
        >
          <WaIcon />
          Preguntar
        </a>
      </motion.nav>

      {/* Hero */}
      <div className="relative h-screen min-h-[600px]">
        <Image
          src={d.heroSrc}
          alt={d.name}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        {/* Gradient */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.18) 100%)",
          }}
        />

        {/* Back button */}
        <Link
          href="/"
          className="absolute top-6 left-6 z-10 flex items-center gap-2 text-[12px] uppercase tracking-[0.14em] transition-opacity hover:opacity-70"
          style={{ color: "rgba(255,255,255,0.75)" }}
        >
          ← Destinos
        </Link>

        {/* Hero text */}
        <div className="absolute bottom-0 left-0 right-0 px-6 sm:px-10 pb-12">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.45 }}
            className="text-[10px] uppercase tracking-[0.22em] mb-2"
            style={{ color: "rgba(255,255,255,0.5)" }}
          >
            {d.label} — {d.region}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.55 }}
            className="font-display font-light leading-[1] text-white"
            style={{ fontSize: "clamp(52px, 8vw, 96px)" }}
          >
            {d.name}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.45 }}
            className="mt-3 text-[15px] max-w-[52ch]"
            style={{ color: "rgba(255,255,255,0.6)" }}
          >
            {d.tagline}
          </motion.p>
        </div>
      </div>

      {/* Info Strip */}
      <div
        className="flex flex-wrap items-center gap-0 border-b"
        style={{ backgroundColor: "#F5F2ED", borderColor: "#D8D4CC" }}
      >
        {[
          { icon: "◷", label: "Duración", value: d.details.duration },
          { icon: "◎", label: "Grupo", value: d.details.groupSize },
          { icon: "◈", label: "Temporada", value: d.details.season },
          { icon: "◉", label: "Nivel", value: d.details.difficulty },
        ].map((item, idx) => (
          <div
            key={item.label}
            className="flex flex-col px-6 py-4 gap-1"
            style={{
              borderRight: idx < 3 ? "1px solid #D8D4CC" : "none",
              minWidth: "140px",
            }}
          >
            <span
              className="text-[10px] uppercase tracking-[0.16em]"
              style={{ color: "#5C6460" }}
            >
              {item.label}
            </span>
            <span
              className="font-display font-light text-[17px]"
              style={{ color: "#0D1511" }}
            >
              {item.value}
            </span>
          </div>
        ))}
      </div>

      {/* Main body */}
      <MainBody d={d} />

      {/* Highlights */}
      <HighlightsSection d={d} />

      {/* Reviews */}
      <ReviewsSection d={d} />

      {/* CTA */}
      <CtaSection d={d} />
    </div>
  );
}

/* ─── Main body: description + gallery ─── */
function MainBody({ d }: { d: Destination }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 md:py-24">
      <motion.div
        ref={ref}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={staggerContainerVariants}
        className="flex flex-col lg:flex-row gap-12 lg:gap-20"
      >
        {/* Left: description + includes */}
        <div className="flex-1 min-w-0">
          <motion.p
            variants={fadeUpVariants}
            className="font-display font-light italic leading-snug mb-7"
            style={{
              fontSize: "clamp(22px, 2.5vw, 28px)",
              color: "#0D1511",
            }}
          >
            {d.tagline}
          </motion.p>

          {d.description.split("\n\n").map((para, i) => (
            <motion.p
              key={i}
              variants={fadeUpVariants}
              className="text-[15px] leading-[1.75] mb-4"
              style={{ color: "#5C6460" }}
            >
              {para}
            </motion.p>
          ))}

          <motion.div variants={fadeUpVariants} className="mt-10">
            <p
              className="text-[11px] uppercase tracking-[0.18em] mb-5"
              style={{ color: "#5C6460" }}
            >
              ¿Qué incluye?
            </p>
            <ul className="space-y-3">
              {d.includes.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span
                    className="mt-0.5 shrink-0 text-[11px]"
                    style={{ color: "#B5763A" }}
                    aria-hidden="true"
                  >
                    ✓
                  </span>
                  <span className="text-[14px] leading-snug" style={{ color: "#0D1511" }}>
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Right: gallery + reviews */}
        <div className="lg:w-[42%] shrink-0 space-y-10">
          {/* Photo gallery 2×2 */}
          <motion.div variants={fadeUpVariants} className="grid grid-cols-2 gap-[3px]">
            {d.gallery.map((photo) => (
              <GalleryPhoto key={photo.src} photo={photo} />
            ))}
          </motion.div>

          {/* Reviews */}
          <motion.div variants={staggerContainerVariants}>
            <motion.p
              variants={fadeUpVariants}
              className="text-[11px] uppercase tracking-[0.18em] mb-5"
              style={{ color: "#5C6460" }}
            >
              — Lo que dicen
            </motion.p>
            <div className="space-y-0">
              {d.reviews.map((review) => (
                <motion.div
                  key={review.id}
                  variants={fadeUpVariants}
                  className="py-5 border-t"
                  style={{ borderColor: "#D8D4CC" }}
                >
                  <p
                    className="font-display font-light italic leading-snug mb-3"
                    style={{ fontSize: "17px", color: "#0D1511" }}
                  >
                    &ldquo;{review.quote}&rdquo;
                  </p>
                  <div className="flex items-center gap-3">
                    <div
                      className="w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-medium shrink-0"
                      style={{ backgroundColor: "#D4E5E2", color: "#1B4D5C" }}
                      aria-hidden="true"
                    >
                      {review.name.charAt(0)}
                    </div>
                    <div>
                      <p
                        className="text-[12px] uppercase tracking-[0.12em] font-medium"
                        style={{ color: "#B5763A" }}
                      >
                        {review.name}
                      </p>
                      <p className="text-[11px]" style={{ color: "#5C6460" }}>
                        {review.from}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

function GalleryPhoto({ photo }: { photo: { src: string; alt: string } }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="relative overflow-hidden"
      style={{ aspectRatio: "4/3" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Image
        src={photo.src}
        alt={photo.alt}
        fill
        sizes="(max-width: 768px) 50vw, 25vw"
        className="object-cover"
        style={{
          transform: hovered ? "scale(1.06)" : "scale(1)",
          transition: "transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        }}
      />
    </div>
  );
}

/* ─── Highlights ─── */
function HighlightsSection({ d }: { d: Destination }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      className="py-16 md:py-20 px-4 sm:px-6 border-t"
      style={{ backgroundColor: "#EDEAE3", borderColor: "#D8D4CC" }}
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={staggerContainerVariants}
        >
          <motion.p
            variants={fadeUpVariants}
            className="text-[11px] uppercase tracking-[0.2em] mb-10"
            style={{ color: "#5C6460" }}
          >
            — EXPERIENCIAS
          </motion.p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {d.highlights.map((highlight, idx) => (
              <motion.div key={idx} variants={fadeUpVariants} className="flex items-start gap-3">
                <span
                  className="mt-0.5 shrink-0 text-[14px]"
                  style={{ color: "#B5763A" }}
                  aria-hidden="true"
                >
                  —
                </span>
                <p className="text-[15px] leading-snug" style={{ color: "#0D1511" }}>
                  {highlight}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Reviews (full width) ─── */
function ReviewsSection({ d }: { d: Destination }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section className="py-16 md:py-20 px-4 sm:px-6 border-t" style={{ borderColor: "#D8D4CC" }}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={staggerContainerVariants}
        >
          <motion.p
            variants={fadeUpVariants}
            className="text-[11px] uppercase tracking-[0.2em] mb-10"
            style={{ color: "#5C6460" }}
          >
            — VIAJEROS QUE YA FUERON
          </motion.p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {d.reviews.map((review) => (
              <motion.div key={review.id} variants={fadeUpVariants}>
                <p
                  className="font-display font-light italic leading-snug mb-5"
                  style={{ fontSize: "clamp(18px, 1.8vw, 22px)", color: "#0D1511" }}
                >
                  &ldquo;{review.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center text-[13px] font-medium shrink-0"
                    style={{ backgroundColor: "#1B4D5C", color: "#FFFFFF" }}
                    aria-hidden="true"
                  >
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <p
                      className="text-[13px] uppercase tracking-wider font-medium"
                      style={{ color: "#B5763A" }}
                    >
                      {review.name}
                    </p>
                    <p className="text-[12px]" style={{ color: "#5C6460" }}>
                      {review.from}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Bottom CTA ─── */
function CtaSection({ d }: { d: Destination }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [primaryHovered, setPrimaryHovered] = useState(false);
  const [secondaryHovered, setSecondaryHovered] = useState(false);

  return (
    <section
      className="relative py-28 md:py-36 px-4 sm:px-6 text-center"
      style={{ backgroundColor: "#0D1511", borderTop: "1px solid rgba(255,255,255,0.08)" }}
    >
      <div className="max-w-2xl mx-auto">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={staggerContainerVariants}
        >
          <motion.p
            variants={fadeUpVariants}
            className="text-[11px] uppercase tracking-[0.2em] mb-6"
            style={{ color: "rgba(255,255,255,0.35)" }}
          >
            {d.label} — {d.region}
          </motion.p>

          <motion.h2
            variants={fadeUpVariants}
            className="font-display font-light leading-[1] text-white mb-4"
            style={{ fontSize: "clamp(44px, 6vw, 64px)" }}
          >
            ¿Cuándo es el<br />
            <em>próximo viaje?</em>
          </motion.h2>

          <motion.p
            variants={fadeUpVariants}
            className="text-[15px] mb-10 max-w-[38ch] mx-auto leading-relaxed"
            style={{ color: "rgba(255,255,255,0.45)" }}
          >
            Escríbele a Luisito directamente por WhatsApp y te confirma las próximas fechas
            disponibles para {d.name}.
          </motion.p>

          <motion.div
            variants={fadeUpVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            {/* Primary: ask about next trip */}
            <a
              href={waLink(d.waNextTrip)}
              target="_blank"
              rel="noopener noreferrer"
              data-cta={`destination-next-trip-${d.slug}`}
              className="inline-flex items-center justify-center gap-2.5 px-8 py-4 text-[13px] uppercase tracking-[0.12em] font-medium transition-colors duration-200"
              style={{
                backgroundColor: primaryHovered ? "transparent" : "#25D366",
                color: primaryHovered ? "#25D366" : "#FFFFFF",
                border: "1px solid #25D366",
              }}
              onMouseEnter={() => setPrimaryHovered(true)}
              onMouseLeave={() => setPrimaryHovered(false)}
            >
              <WaIcon />
              Preguntar por próximas fechas
            </a>

            {/* Secondary: general interest */}
            <a
              href={waLink(d.waMsg)}
              target="_blank"
              rel="noopener noreferrer"
              data-cta={`destination-interest-${d.slug}`}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 text-[13px] uppercase tracking-[0.12em] transition-colors duration-200"
              style={{
                backgroundColor: "transparent",
                color: secondaryHovered ? "#FFFFFF" : "rgba(255,255,255,0.55)",
                border: "1px solid rgba(255,255,255,0.2)",
              }}
              onMouseEnter={() => setSecondaryHovered(true)}
              onMouseLeave={() => setSecondaryHovered(false)}
            >
              Me interesa este destino
            </a>
          </motion.div>

          {/* Back link */}
          <motion.div variants={fadeUpVariants} className="mt-10">
            <Link
              href="/"
              className="text-[12px] uppercase tracking-[0.14em] transition-opacity hover:opacity-60"
              style={{ color: "rgba(255,255,255,0.3)" }}
            >
              ← Ver todos los destinos
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function WaIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}
