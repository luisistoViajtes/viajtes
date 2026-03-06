"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const DISPLAY_FONT =
  "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif";

const EASE = [0.2, 0, 0, 1] as const;

/* ── SVG Icons ──────────────────────────────────────────── */

function InstagramIcon({ color }: { color: string }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="17.5" cy="6.5" r="1.2" fill={color} stroke="none" />
    </svg>
  );
}

function TikTokIcon({ color }: { color: string }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill={color}
      aria-hidden="true"
    >
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V9.4a8.16 8.16 0 004.76 1.52V7.49a4.85 4.85 0 01-1-.8z" />
    </svg>
  );
}

function FacebookIcon({ color }: { color: string }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill={color}
      aria-hidden="true"
    >
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function YouTubeIcon({ color }: { color: string }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill={color}
      aria-hidden="true"
    >
      <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

/* ── Platform Data ──────────────────────────────────────── */

const PLATFORMS = [
  {
    name: "Instagram",
    handle: "@luisitoelviajero",
    followers: "120K",
    link: "https://instagram.com/luisitoelviajero",
    accent: "#E1306C",
    Icon: InstagramIcon,
  },
  {
    name: "TikTok",
    handle: "@luisitoelviajero",
    followers: "45K",
    link: "https://tiktok.com/@luisitoelviajero",
    accent: "#69C9D0",
    Icon: TikTokIcon,
  },
  {
    name: "Facebook",
    handle: "Luisito El Viajero",
    followers: "28K",
    link: "https://facebook.com/luisitoelviajero",
    accent: "#1877F2",
    Icon: FacebookIcon,
  },
  {
    name: "YouTube",
    handle: "Luisito El Viajero",
    followers: "8K",
    link: "https://youtube.com/@luisitoelviajero",
    accent: "#FF0000",
    Icon: YouTubeIcon,
  },
];

/* ── Card Variants ──────────────────────────────────────── */

const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: EASE, delay: i * 0.08 },
  }),
};

const leftVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE },
  },
};

/* ── Component ──────────────────────────────────────────── */

export default function SocialSection() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      ref={sectionRef}
      style={{
        backgroundColor: "#0D1511",
        padding: "clamp(5rem, 10vw, 8rem) 1.5rem",
      }}
    >
      <div
        style={{ maxWidth: "1120px", margin: "0 auto" }}
        className="grid grid-cols-1 md:grid-cols-[40%_60%] gap-12 items-center"
      >
        {/* ── Left Column ────────────────────────────── */}
        <motion.div
          variants={leftVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {/* Section label */}
          <p
            style={{
              fontSize: "11px",
              fontWeight: 600,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "#B5763A",
              marginBottom: "32px",
            }}
          >
            &mdash; S&Iacute;GUENOS
          </p>

          {/* Headline */}
          <h2
            style={{
              fontFamily: DISPLAY_FONT,
              fontSize: "clamp(44px, 6vw, 64px)",
              fontWeight: 300,
              lineHeight: 1,
              color: "#FFFFFF",
              margin: "0 0 24px 0",
            }}
          >
            Contenido de viajes
            <br />
            <em style={{ fontStyle: "italic", color: "#B5763A" }}>
              todos los d&iacute;as.
            </em>
          </h2>

          {/* Subtext */}
          <p
            style={{
              fontSize: "15px",
              lineHeight: 1.65,
              color: "rgba(255,255,255,0.55)",
              maxWidth: "34ch",
              margin: "0 0 48px 0",
            }}
          >
            Historias reales, destinos &uacute;nicos, inspiraci&oacute;n para tu
            pr&oacute;ximo viaje.
          </p>

          {/* Stat */}
          <div>
            <p
              style={{
                fontFamily: DISPLAY_FONT,
                fontSize: "52px",
                fontWeight: 300,
                lineHeight: 1,
                color: "#B5763A",
                margin: 0,
              }}
            >
              200K+
            </p>
            <p
              style={{
                fontSize: "12px",
                fontWeight: 600,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.35)",
                marginTop: "8px",
              }}
            >
              seguidores en redes
            </p>
          </div>
        </motion.div>

        {/* ── Right Column: Platform Cards ────────────── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "2px",
          }}
        >
          {PLATFORMS.map((platform, index) => {
            const { Icon } = platform;
            return (
              <motion.a
                key={platform.name}
                href={platform.link}
                target="_blank"
                rel="noopener noreferrer"
                custom={index}
                variants={cardVariants}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                style={{
                  position: "relative",
                  display: "block",
                  padding: "24px",
                  backgroundColor: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  textDecoration: "none",
                  transition: "all 0.25s ease",
                  overflow: "hidden",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.borderColor = "rgba(255,255,255,0.16)";
                  el.style.backgroundColor = "rgba(255,255,255,0.07)";
                  // Show accent bar
                  const bar = el.querySelector(
                    "[data-accent-bar]"
                  ) as HTMLElement | null;
                  if (bar) bar.style.opacity = "1";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.borderColor = "rgba(255,255,255,0.08)";
                  el.style.backgroundColor = "rgba(255,255,255,0.04)";
                  // Hide accent bar
                  const bar = el.querySelector(
                    "[data-accent-bar]"
                  ) as HTMLElement | null;
                  if (bar) bar.style.opacity = "0";
                }}
              >
                {/* Hover accent bar at top */}
                <div
                  data-accent-bar=""
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "2px",
                    backgroundColor: platform.accent,
                    opacity: 0,
                    transition: "opacity 0.25s ease",
                  }}
                />

                {/* Icon */}
                <div style={{ marginBottom: "20px" }}>
                  <Icon color={platform.accent} />
                </div>

                {/* Platform Name */}
                <p
                  style={{
                    fontSize: "14px",
                    fontWeight: 500,
                    color: "#FFFFFF",
                    margin: "0 0 4px 0",
                  }}
                >
                  {platform.name}
                </p>

                {/* Handle */}
                <p
                  style={{
                    fontSize: "12px",
                    color: "rgba(255,255,255,0.4)",
                    margin: "0 0 20px 0",
                  }}
                >
                  {platform.handle}
                </p>

                {/* Followers */}
                <p
                  style={{
                    fontFamily: DISPLAY_FONT,
                    fontSize: "32px",
                    fontWeight: 300,
                    lineHeight: 1,
                    color: "#B5763A",
                    margin: "0 0 4px 0",
                  }}
                >
                  {platform.followers}
                  <span
                    style={{
                      fontSize: "14px",
                      fontWeight: 400,
                      color: "rgba(255,255,255,0.4)",
                      marginLeft: "6px",
                      fontFamily:
                        "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif",
                    }}
                  >
                    seguidores
                  </span>
                </p>

                {/* Ver perfil link */}
                <p
                  style={{
                    fontSize: "10px",
                    fontWeight: 600,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "#B5763A",
                    marginTop: "16px",
                    marginBottom: 0,
                  }}
                >
                  Ver perfil &rarr;
                </p>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
