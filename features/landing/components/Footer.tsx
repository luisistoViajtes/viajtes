"use client";

import Image from "next/image";
import { WA_BASE } from "../data/content";

const WA_HREF = `${WA_BASE}?text=${encodeURIComponent("Hola Luisito, quiero más información")}`;

const SERVICES = [
  "Recorridos 360°",
  "Contenido Viral",
  "IA Automatización",
  "Páginas Web",
  "Viajes",
];

const SOCIALS = [
  { label: "Instagram", href: "https://instagram.com/luisitoelviajero" },
  { label: "TikTok", href: "https://tiktok.com/@luisitoelviajero" },
  { label: "Facebook", href: "https://facebook.com/luisitoelviajero" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="text-white"
      style={{
        backgroundColor: "#0D1511",
        borderTop: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-16 pb-0">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 md:gap-12 mb-14">

          {/* Col 1 — Brand */}
          <div>
            <div className="flex items-center gap-3 mb-3">
              <Image
                src="/Luisito_png_cfhgb1.webp"
                alt="Luisito El Viajero"
                width={32}
                height={32}
                className="rounded-full object-cover"
              />
              <span
                className="font-display italic"
                style={{ fontSize: "22px", color: "#FFFFFF" }}
              >
                Luisito El Viajero
              </span>
            </div>

            <p className="text-[12px] mb-6" style={{ color: "#5C6460" }}>
              Barranquilla &middot; Colombia
            </p>

            {/* Social text links */}
            <div className="flex flex-col gap-2.5">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[12px] uppercase tracking-wider w-fit link-underline"
                  style={{ color: "rgba(255,255,255,0.35)" }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.75)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.35)";
                  }}
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          {/* Col 2 — Services */}
          <div>
            <p
              className="text-[11px] uppercase tracking-widest mb-5"
              style={{ color: "rgba(255,255,255,0.25)" }}
            >
              Servicios
            </p>
            <ul className="flex flex-col gap-3">
              {SERVICES.map((s) => (
                <li key={s}>
                  <a
                    href="#servicios"
                    className="text-[14px] link-underline"
                    style={{ color: "rgba(255,255,255,0.55)" }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.95)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.55)";
                    }}
                  >
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Contact */}
          <div>
            <p
              className="text-[11px] uppercase tracking-widest mb-5"
              style={{ color: "rgba(255,255,255,0.25)" }}
            >
              Contacto
            </p>

            <a
              href={WA_HREF}
              target="_blank"
              rel="noopener noreferrer"
              data-cta="whatsapp-footer"
              className="inline-flex items-center gap-1.5 text-[15px] font-medium mb-2 transition-opacity duration-150 hover:opacity-75"
              style={{ color: "#B5763A" }}
            >
              wa.me/573209344964 &rarr;
            </a>

            <p className="text-[13px]" style={{ color: "rgba(255,255,255,0.35)" }}>
              Respondo en menos de 24 horas
            </p>
          </div>

        </div>

        {/* Bottom bar */}
        <div
          className="py-6 flex flex-col sm:flex-row justify-between items-center gap-2 text-[12px]"
          style={{ borderTop: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.25)" }}
        >
          <p>© {year} Luisito El Viajero</p>
          <p>Hecho en Colombia 🇨🇴</p>
        </div>
      </div>
    </footer>
  );
}
