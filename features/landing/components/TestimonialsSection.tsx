"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { TESTIMONIALS } from "../data/content";
import { fadeUpVariants, staggerContainerVariants } from "../hooks/useScrollReveal";

export default function TestimonialsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const [featured, ...rest] = TESTIMONIALS;

  return (
    <section
      className="py-20 md:py-32 px-4 sm:px-6"
      style={{ backgroundColor: "#EDEAE3" }}
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={staggerContainerVariants}
        >
          {/* Section label */}
          <div className="flex items-center justify-between mb-12 md:mb-16">
            <motion.p
              variants={fadeUpVariants}
              className="text-[11px] uppercase tracking-widest"
              style={{ color: "#5C6460" }}
            >
              &mdash; Lo que dicen
            </motion.p>
            <motion.div
              variants={fadeUpVariants}
              className="hidden md:flex items-center gap-6"
            >
              {[
                { value: "+40%", label: "reservas" },
                { value: "28K", label: "seguidores" },
                { value: "6 meses", label: "resultados" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <p
                    className="font-display font-light leading-none"
                    style={{ fontSize: "22px", color: "#0D1511" }}
                  >
                    {stat.value}
                  </p>
                  <p className="text-[10px] uppercase tracking-[0.14em] mt-1" style={{ color: "#5C6460" }}>
                    {stat.label}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
            {/* Featured testimonial — 2/3 width */}
            <motion.div
              variants={fadeUpVariants}
              className="md:col-span-2 md:pr-12 border-t pt-8 pb-12 md:pb-0 relative"
              style={{ borderColor: "#D8D4CC" }}
            >
              {/* Giant decorative quote */}
              <span
                aria-hidden="true"
                style={{
                  position: "absolute",
                  fontFamily: "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif",
                  fontSize: "200px",
                  lineHeight: 1,
                  color: "#0D1511",
                  opacity: 0.06,
                  top: "-10px",
                  left: "-4px",
                  pointerEvents: "none",
                  userSelect: "none",
                }}
              >
                &ldquo;
              </span>

              <blockquote className="relative z-10">
                <p
                  className="leading-[1.22] mb-8"
                  style={{
                    fontFamily: "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif",
                    fontSize: "clamp(26px, 2.8vw, 36px)",
                    fontStyle: "italic",
                    fontWeight: 300,
                    color: "#0D1511",
                  }}
                >
                  &ldquo;{featured.quote}&rdquo;
                </p>
                <footer className="flex items-center gap-4">
                  <div
                    className="shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-[14px] font-medium"
                    style={{ backgroundColor: "#1B4D5C", color: "#FFFFFF" }}
                    aria-hidden="true"
                  >
                    {featured.name.charAt(0)}
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <cite
                      className="not-italic text-[13px] uppercase tracking-wider font-medium"
                      style={{ color: "#B5763A" }}
                    >
                      {featured.name}
                    </cite>
                    <span className="text-[12px]" style={{ color: "#5C6460" }}>
                      {featured.role}
                    </span>
                  </div>
                </footer>
              </blockquote>
            </motion.div>

            {/* Smaller testimonials — 1/3 */}
            <motion.div
              variants={staggerContainerVariants}
              className="md:pl-10 flex flex-col md:border-l"
              style={{ borderColor: "#D8D4CC" }}
            >
              {rest.map((t) => (
                <motion.div
                  key={t.id}
                  variants={fadeUpVariants}
                  className="border-t pt-8 pb-8 relative"
                  style={{ borderColor: "#D8D4CC" }}
                >
                  <span
                    aria-hidden="true"
                    style={{
                      position: "absolute",
                      fontFamily: "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif",
                      fontSize: "100px",
                      lineHeight: 1,
                      color: "#0D1511",
                      opacity: 0.05,
                      top: "0px",
                      left: "0px",
                      pointerEvents: "none",
                      userSelect: "none",
                    }}
                  >
                    &ldquo;
                  </span>

                  <blockquote className="relative z-10">
                    <p
                      className="leading-[1.32] mb-5"
                      style={{
                        fontFamily: "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif",
                        fontSize: "20px",
                        fontStyle: "italic",
                        fontWeight: 300,
                        color: "#0D1511",
                      }}
                    >
                      &ldquo;{t.quote}&rdquo;
                    </p>
                    <footer className="flex items-center gap-3">
                      <div
                        className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-[12px] font-medium"
                        style={{ backgroundColor: "#D4E5E2", color: "#1B4D5C" }}
                        aria-hidden="true"
                      >
                        {t.name.charAt(0)}
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <cite
                          className="not-italic text-[13px] uppercase tracking-wider font-medium"
                          style={{ color: "#B5763A" }}
                        >
                          {t.name}
                        </cite>
                        <span className="text-[12px]" style={{ color: "#5C6460" }}>
                          {t.role}
                        </span>
                      </div>
                    </footer>
                  </blockquote>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
