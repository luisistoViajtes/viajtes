"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { HeaderProps } from "../types";
import { WA_BASE } from "../data/content";

const WA_HREF = `${WA_BASE}?text=${encodeURIComponent("Hola Luisito, quiero más información sobre tus servicios")}`;

const NAV_LINKS = [
  { label: "Asesoría", href: "#asesor" },
  { label: "Servicios", href: "#servicios" },
  { label: "Viajes", href: "#viaja-conmigo" },
  { label: "Destinos", href: "#destinos" },
  { label: "Pauta", href: "#pauta" },
  { label: "Contacto", href: "#contacto" },
];

export default function Header({ isScrolled, onContactClick }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    if (href === "#contacto") {
      onContactClick();
    } else {
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  // When menu is open on mobile, header merges visually with the overlay
  const headerBg = menuOpen
    ? "#1B4D5C"
    : isScrolled
    ? "rgba(245,242,237,0.95)"
    : "transparent";

  const headerBorder = menuOpen || !isScrolled ? "1px solid transparent" : "1px solid #D8D4CC";
  const headerBackdrop = !menuOpen && isScrolled ? "blur(8px)" : "none";

  // Hamburger/X lines are always white when menu is open or header is transparent
  const lineColor = menuOpen || !isScrolled ? "white" : "#0D1511";

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      className="fixed top-0 left-0 right-0 z-40"
      style={{
        height: "70px",
        backgroundColor: headerBg,
        borderBottom: headerBorder,
        backdropFilter: headerBackdrop,
        WebkitBackdropFilter: headerBackdrop,
        transition: "background-color 0.3s ease, border-color 0.3s ease",
      }}
    >
      {/* ── Inner container ─────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-5 lg:px-8 flex items-center justify-between h-full relative">

        {/* Mobile left spacer — keeps logo visually centered */}
        <div className="md:hidden flex-shrink-0" style={{ width: 40 }} aria-hidden="true" />

        {/* Logo — absolute centered on mobile, static on desktop */}
        <a
          href="#"
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
          className="flex items-center gap-2.5 absolute left-1/2 -translate-x-1/2 md:static md:left-auto md:translate-x-0"
          aria-label="Luisito El Viajero — Inicio"
        >
          <div
            className="shrink-0 rounded-full overflow-hidden"
            style={{ width: 40, height: 40 }}
          >
            <Image
              src="/Luisito_png_cfhgb1.webp"
              alt="Luisito El Viajero"
              width={40}
              height={40}
              className="object-cover w-full h-full"
            />
          </div>
          <span
            className="font-display italic"
            style={{
              fontSize: "clamp(20px, 4vw, 24px)",
              lineHeight: 1,
              fontWeight: 400,
              color: menuOpen ? "white" : isScrolled ? "#1B4D5C" : "white",
              transition: "color 0.3s ease",
            }}
          >
            Luisito
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Navegación principal">
          {NAV_LINKS.map((link) => (
            <button
              key={link.label}
              onClick={() => handleNavClick(link.href)}
              className="link-underline"
              style={{
                fontSize: "13px",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                fontWeight: 500,
                color: isScrolled ? "#0D1511" : "rgba(255,255,255,0.75)",
                transition: "color 0.2s ease",
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "4px 0",
                fontFamily: "inherit",
              }}
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Próximos viajes link + Desktop CTA */}
        <div className="hidden md:flex items-center gap-5">
          <a
            href="#viaja-conmigo"
            onClick={(e) => { e.preventDefault(); document.querySelector("#viaja-conmigo")?.scrollIntoView({ behavior: "smooth" }); }}
            style={{
              fontSize: "11px",
              fontWeight: 600,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: isScrolled ? "#B5763A" : "rgba(212,165,116,0.9)",
              textDecoration: "none",
              transition: "opacity 0.2s ease",
              display: "flex",
              alignItems: "center",
              gap: "4px",
            }}
          >
            Próximos viajes →
          </a>
          <CtaButton isScrolled={isScrolled} href={WA_HREF}>
            Trabajemos
          </CtaButton>
        </div>

        {/* Hamburger / X button */}
        <button
          className="md:hidden flex flex-col justify-center items-center gap-[5px] p-1 flex-shrink-0"
          style={{ width: 40, height: 40, zIndex: 41 }}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={menuOpen}
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="block"
              style={{
                width: 22,
                height: "1.5px",
                backgroundColor: lineColor,
                transformOrigin: "center",
                transition: "transform 0.25s ease, opacity 0.25s ease, background-color 0.25s ease",
                transform:
                  menuOpen && i === 0
                    ? "translateY(6.5px) rotate(45deg)"
                    : menuOpen && i === 2
                    ? "translateY(-6.5px) rotate(-45deg)"
                    : "none",
                opacity: menuOpen && i === 1 ? 0 : 1,
              }}
            />
          ))}
        </button>
      </div>

      {/* Mobile menu — full-screen overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden fixed inset-0 flex flex-col items-center justify-center"
            style={{ backgroundColor: "#1B4D5C", zIndex: 39 }}
          >
            <nav className="flex flex-col items-center" style={{ gap: "28px" }}>
              {NAV_LINKS.map((link, i) => (
                <motion.button
                  key={link.label}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07 + 0.08, duration: 0.45 }}
                  onClick={() => handleNavClick(link.href)}
                  className="font-display italic"
                  style={{
                    fontSize: "clamp(34px, 9vw, 52px)",
                    fontWeight: 300,
                    lineHeight: 1.05,
                    color: "rgba(255,255,255,0.92)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    textAlign: "center",
                  }}
                >
                  {link.label}
                </motion.button>
              ))}

              <motion.a
                href={WA_HREF}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.38, duration: 0.45 }}
                style={{
                  marginTop: "16px",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "10px",
                  fontSize: "13px",
                  fontWeight: 500,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  padding: "12px 36px",
                  border: "1px solid rgba(255,255,255,0.35)",
                  color: "white",
                  borderRadius: "2px",
                  textDecoration: "none",
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                Trabajemos
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

function CtaButton({
  isScrolled,
  href,
  children,
}: {
  isScrolled: boolean;
  href: string;
  children: React.ReactNode;
}) {
  const [hovered, setHovered] = useState(false);

  const hoverBg = isScrolled ? "#1B4D5C" : "white";
  const hoverText = isScrolled ? "white" : "#1B4D5C";

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "inline-block",
        fontSize: "13px",
        fontWeight: 500,
        letterSpacing: "0.04em",
        padding: "9px 22px",
        borderRadius: "2px",
        textDecoration: "none",
        color: hovered ? hoverText : isScrolled ? "#1B4D5C" : "white",
        backgroundColor: hovered ? hoverBg : "transparent",
        border: `1px solid ${isScrolled ? "#1B4D5C" : "rgba(255,255,255,0.7)"}`,
        transition: "background-color 0.2s ease, color 0.2s ease",
      }}
    >
      {children}
    </a>
  );
}
