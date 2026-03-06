"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { fadeInVariants } from "../hooks/useScrollReveal";

const LOGOS = [
  { name: "Brasilia",        src: "/brasiliaLogo.png",   height: 32 },
  { name: "Wingo",           src: "/wingoLogo.png",      height: 52 },
  { name: "Juan Valdez",     src: "/JuanValdezLogo.png", height: 52 },
  { name: "Copa Airlines",   src: "/copaAirlines.png",   height: 52 },
  { name: "Hoteles Estelar", src: "/estelarLogo.png",    height: 52 },
];

// 4 copies → translateX(-50%) moves exactly 2 copies → seamless loop
const TRACK = [...LOGOS, ...LOGOS, ...LOGOS, ...LOGOS];

export default function LogosCarousel() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <section
      className="border-y py-10 sm:py-12 overflow-hidden"
      style={{ backgroundColor: "#FFFFFF", borderColor: "#D8D4CC" }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 mb-8" ref={ref}>
        <motion.p
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={fadeInVariants}
          className="text-center text-[13px]"
          style={{ color: "#5C6460" }}
        >
          Han confiado en Luisito
        </motion.p>
      </div>

      <div className="relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-20 sm:w-32 bg-linear-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 sm:w-32 bg-linear-to-l from-white to-transparent z-10 pointer-events-none" />

        <div className="logos-track" aria-hidden="true">
          {TRACK.map((logo, idx) => (
            <div
              key={`${logo.name}-${idx}`}
              className="shrink-0 flex items-center gap-10 sm:gap-14 select-none px-10 sm:px-14"
            >
              <Image
                src={logo.src}
                alt={logo.name}
                height={logo.height}
                width={0}
                sizes="180px"
                style={{
                  width: "auto",
                  height: `${logo.height}px`,
                  objectFit: "contain",
                  opacity: 0.9,
                }}
              />
              <span
                style={{
                  display: "inline-block",
                  width: "1px",
                  height: "20px",
                  backgroundColor: "rgba(181, 118, 58, 0.28)",
                  flexShrink: 0,
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
