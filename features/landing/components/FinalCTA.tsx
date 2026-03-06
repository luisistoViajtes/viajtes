"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { waLink } from "../data/content";
import { fadeUpVariants, staggerContainerVariants } from "../hooks/useScrollReveal";

const WA_MSG = "Hola Luisito, quiero trabajar contigo y posicionar mi negocio";

export default function FinalCTA() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [primaryHovered, setPrimaryHovered] = useState(false);

  return (
    <section
      className="relative py-40 px-4 sm:px-6"
      style={{ backgroundColor: "#0D1511" }}
    >
      {/* Top decorative line */}
      <div
        className="absolute top-0 left-0 right-0"
        style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
      />

      <div className="max-w-3xl mx-auto text-center">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={staggerContainerVariants}
        >
          <motion.p
            variants={fadeUpVariants}
            className="text-[12px] uppercase tracking-widest mb-8"
            style={{ color: "rgba(255,255,255,0.35)" }}
          >
            ¿Listo para empezar?
          </motion.p>

          <motion.h2
            variants={fadeUpVariants}
            className="font-display font-light leading-[0.95] mb-6"
            style={{
              fontSize: "clamp(56px, 9vw, 88px)",
              color: "#FFFFFF",
            }}
          >
            Hagamos algo<br />
            <em>extraordinario.</em>
          </motion.h2>

          <motion.p
            variants={fadeUpVariants}
            className="text-[15px] mb-12 max-w-[44ch] mx-auto leading-relaxed"
            style={{ color: "rgba(255,255,255,0.45)" }}
          >
            Viaja, vende y posiciona tu negocio con estrategia real y experiencia comprobada.
          </motion.p>

          <motion.div
            variants={fadeUpVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            {/* Primary WA CTA */}
            <a
              href={waLink(WA_MSG)}
              target="_blank"
              rel="noopener noreferrer"
              data-cta="whatsapp-final-cta"
              className="inline-flex items-center gap-2.5 px-8 py-4 text-[14px] font-medium tracking-wide"
              style={{
                backgroundColor: primaryHovered ? "transparent" : "#FFFFFF",
                color: primaryHovered ? "#FFFFFF" : "#0D1511",
                border: "1px solid #FFFFFF",
                transition: "background-color 0.22s ease, color 0.22s ease",
              }}
              onMouseEnter={() => setPrimaryHovered(true)}
              onMouseLeave={() => setPrimaryHovered(false)}
            >
              <WaIcon />
              Contáctame por WhatsApp
            </a>

            {/* Secondary form link */}
            <button
              onClick={() =>
                document.getElementById("contacto")?.scrollIntoView({ behavior: "smooth" })
              }
              data-cta="final-cta-form"
              className="text-[14px] link-underline"
              style={{
                color: "rgba(255,255,255,0.45)",
                background: "none",
                border: "none",
                cursor: "pointer",
              }}
            >
              Ver formulario
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function WaIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}
