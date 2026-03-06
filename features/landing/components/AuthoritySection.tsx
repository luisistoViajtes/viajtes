"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { STATS } from "../data/content";

const EASE: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

const slideLeft = {
  hidden: { opacity: 0, x: -48 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.75, ease: EASE } },
};

const slideRight = {
  hidden: { opacity: 0, x: 48 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.75, ease: EASE } },
};

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE, delay } },
});

export default function AuthoritySection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="quien-soy"
      className="scroll-mt-20"
      style={{ backgroundColor: "#F5F2ED", paddingTop: "96px", paddingBottom: "96px" }}
    >
      <div ref={ref} className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-[40fr_60fr] gap-12 lg:gap-20 items-start">

          {/* Left: portrait */}
          <motion.div
            variants={slideLeft}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="relative mx-auto w-full max-w-sm md:max-w-none"
          >
            <div className="relative" style={{ paddingBottom: "133.33%" }}>
              {/* Copper offset decorative frame */}
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  top: "10px",
                  left: "10px",
                  right: "-10px",
                  bottom: "-10px",
                  border: "1px solid #B5763A",
                  borderRadius: "2px",
                  zIndex: 0,
                  opacity: 0.7,
                }}
              />
              {/* Image */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: "2px",
                  overflow: "hidden",
                  zIndex: 1,
                }}
              >
                <Image
                  src="/yoluisito.webp"
                  alt="Luisito El Viajero"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 80vw, 40vw"
                />
              </div>

              {/* Floating badge */}
              <div
                style={{
                  position: "absolute",
                  bottom: "-18px",
                  right: "-18px",
                  zIndex: 2,
                  backgroundColor: "white",
                  border: "1px solid #D8D4CC",
                  borderRadius: "2px",
                  padding: "14px 20px",
                  boxShadow: "0 4px 24px rgba(0,0,0,0.10)",
                }}
              >
                <p
                  className="font-display"
                  style={{
                    fontSize: "36px",
                    fontWeight: 300,
                    lineHeight: 1,
                    color: "#B5763A",
                  }}
                >
                  10+
                </p>
                <p
                  style={{
                    fontSize: "11px",
                    fontWeight: 500,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "#5C6460",
                    marginTop: "4px",
                  }}
                >
                  años
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right: editorial text */}
          <motion.div
            variants={slideRight}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="flex flex-col"
            style={{ paddingTop: "8px" }}
          >
            {/* Section label */}
            <p
              style={{
                fontSize: "11px",
                fontWeight: 500,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "#5C6460",
                marginBottom: "20px",
              }}
            >
              &mdash; Sobre Luisito
            </p>

            {/* Headline */}
            <h2
              className="font-display"
              style={{
                fontSize: "clamp(40px, 5vw, 64px)",
                fontWeight: 300,
                lineHeight: 1.08,
                color: "#0D1511",
                marginBottom: "28px",
              }}
            >
              Más que un viajero,
              <br />
              un{" "}
              <em style={{ fontStyle: "italic", fontWeight: 300, color: "#1B4D5C" }}>
                aliado
              </em>{" "}
              para
              <br />
              tu marca.
            </h2>

            {/* Body */}
            <div style={{ maxWidth: "56ch", marginBottom: "40px" }}>
              <p
                style={{
                  fontSize: "16px",
                  lineHeight: 1.7,
                  color: "#5C6460",
                  marginBottom: "16px",
                }}
              >
                Llevo más de una década recorriendo cada rincón de Colombia y
                explorando el mundo con una cámara en la mano y una estrategia en la
                cabeza. He convertido mi pasión por viajar en un negocio digital que
                ayuda a marcas y destinos turísticos a conectar con audiencias reales.
              </p>
              <p
                style={{
                  fontSize: "16px",
                  lineHeight: 1.7,
                  color: "#5C6460",
                }}
              >
                He trabajado con aerolíneas, hoteles, restaurantes y agencias de
                viaje, creando contenido que genera reservas, seguidores y confianza.
                Mi enfoque no es solo crear fotos bonitas — es construir estrategias
                que conviertan audiencias en clientes.
              </p>
            </div>

            {/* Divider */}
            <div
              style={{
                width: "100%",
                height: "1px",
                backgroundColor: "#D8D4CC",
                marginBottom: "36px",
              }}
            />

            {/* Stats 2×2 grid */}
            <div className="grid grid-cols-2" style={{ gap: 0 }}>
              {STATS.map((stat, i) => {
                const isRight = i % 2 === 1;
                const isBottom = i >= 2;
                return (
                  <motion.div
                    key={stat.label}
                    variants={fadeUp(i * 0.1)}
                    initial="hidden"
                    animate={inView ? "visible" : "hidden"}
                    style={{
                      padding: "20px 24px",
                      borderRight: !isRight ? "1px solid #D8D4CC" : "none",
                      borderBottom: !isBottom ? "1px solid #D8D4CC" : "none",
                    }}
                  >
                    <p
                      className="font-display"
                      style={{
                        fontSize: "52px",
                        fontWeight: 300,
                        lineHeight: 1,
                        color: "#1B4D5C",
                        marginBottom: "6px",
                      }}
                    >
                      {stat.value}
                    </p>
                    <p
                      style={{
                        fontSize: "12px",
                        fontWeight: 500,
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        color: "#5C6460",
                      }}
                    >
                      {stat.label}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
