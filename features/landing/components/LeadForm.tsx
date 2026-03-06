"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { LeadFormProps, LeadFormData, LeadFormState } from "@/features/landing/types";
import { fadeUpVariants, staggerContainerVariants } from "@/features/landing/hooks/useScrollReveal";

const WA_LINK =
  "https://wa.me/573209344964?text=" +
  encodeURIComponent("Hola Luisito, quiero hablar sobre mi proyecto.");

const SERVICE_OPTIONS = [
  { value: "", label: "Selecciona un servicio" },
  { value: "recorridos-360", label: "Recorridos 360°" },
  { value: "contenido-viral", label: "Creación de contenido viral" },
  { value: "ia-automatizacion", label: "IA y automatización" },
  { value: "paginas-web", label: "Páginas web y landing pages" },
  { value: "viajes", label: "Viajes" },
  { value: "pauta", label: "Pauta conmigo" },
];

const ASIDE_POINTS = [
  { stat: "24h", text: "Respuesta garantizada." },
  { stat: "10+", text: "Años de experiencia en campo." },
  { stat: "50+", text: "Marcas que ya confían en él." },
];

const INITIAL_FORM: LeadFormData = {
  name: "",
  whatsapp: "",
  email: "",
  business: "",
  service: "",
  message: "",
};

function runValidation(
  form: LeadFormData,
  effectiveService: string
): Partial<Record<keyof LeadFormData, string>> {
  const errors: Partial<Record<keyof LeadFormData, string>> = {};
  if (!form.name.trim() || form.name.trim().length < 2)
    errors.name = "Ingresa tu nombre completo.";
  if (!/^3[0-9]{9}$/.test(form.whatsapp.replace(/[\s\-\(\)\.]/g, "")))
    errors.whatsapp = "Número colombiano inválido (ej: 3001234567).";
  if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(form.email))
    errors.email = "Correo electrónico inválido.";
  if (!form.business.trim())
    errors.business = "Ingresa el nombre de tu negocio.";
  if (!effectiveService)
    errors.service = "Selecciona el servicio que te interesa.";
  return errors;
}

const lineBase = [
  "w-full bg-transparent",
  "border-b border-[#D8D4CC]",
  "pb-3 pt-1",
  "text-[17px] text-[#0D1511]",
  "placeholder:text-[#5C6460]/40",
  "focus:outline-none",
  "focus:border-b-[#1B4D5C]",
  "transition-colors duration-200",
].join(" ");

const lineError = "border-b-[#C0392B] focus:border-b-[#C0392B]";

function LineField({
  label,
  required,
  optional,
  error,
  id,
  children,
}: {
  label: string;
  required?: boolean;
  optional?: boolean;
  error?: string;
  id: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-[11px] uppercase tracking-[0.16em] text-[#5C6460] mb-2"
      >
        {label}
        {required && (
          <span className="text-[#C0392B] ml-0.5" aria-hidden="true">*</span>
        )}
        {optional && (
          <span className="ml-1 normal-case tracking-normal font-normal text-[#5C6460]/55">
            (opcional)
          </span>
        )}
      </label>
      {children}
      <AnimatePresence>
        {error && (
          <motion.p
            key={error}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.18 }}
            className="mt-1.5 text-[12px] text-[#C0392B]"
            role="alert"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

function SuccessView({ onReset }: { onReset: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.35, ease: [0.2, 0, 0, 1] }}
      className="flex flex-col items-center text-center py-16 px-4"
    >
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.5, type: "spring", stiffness: 200, damping: 16 }}
        className="mb-6"
      >
        <svg width="56" height="56" viewBox="0 0 56 56" fill="none" aria-hidden="true">
          <circle cx="28" cy="28" r="27" stroke="#1B4D5C" strokeWidth="1.5" />
          <motion.path
            d="M18 28.5L25 35.5L38 21"
            stroke="#1B4D5C"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 0.3, duration: 0.5, ease: "easeOut" }}
          />
        </svg>
      </motion.div>
      <h3 className="font-display text-[52px] leading-none font-light text-[#1B4D5C] mb-3">
        Mensaje recibido.
      </h3>
      <p className="text-[15px] text-[#5C6460] max-w-[36ch] mb-8">
        Te escribiremos en menos de 24 horas.
      </p>
      <a
        href={WA_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 text-[14px] text-[#1B4D5C] underline underline-offset-4 decoration-[#D8D4CC] hover:decoration-[#1B4D5C] transition-all duration-200 mb-6"
      >
        <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
        </svg>
        O contáctame ahora por WhatsApp
      </a>
      <button
        onClick={onReset}
        className="text-[12px] uppercase tracking-[0.12em] text-[#5C6460]/55 hover:text-[#5C6460] transition-colors duration-150"
      >
        Enviar otra consulta
      </button>
    </motion.div>
  );
}

export default function LeadForm({ selectedService, onServiceChange }: LeadFormProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const [form, setForm] = useState<LeadFormData>({ ...INITIAL_FORM });
  const [formState, setFormState] = useState<LeadFormState>({ status: "idle" });
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof LeadFormData, string>>>({});
  const [submitHovered, setSubmitHovered] = useState(false);

  const effectiveService = selectedService || form.service;
  const isSubmitting = formState.status === "submitting";

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (name === "service") onServiceChange(value as LeadFormData["service"]);
    if (fieldErrors[name as keyof LeadFormData])
      setFieldErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errors = runValidation(form, effectiveService);
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }
    setFormState({ status: "submitting" });
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          whatsapp: form.whatsapp.trim(),
          email: form.email.trim(),
          business: form.business.trim(),
          service: effectiveService,
          message: form.message.trim(),
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setFormState({ status: "error", errorMessage: data.error || "Error al enviar." });
        return;
      }
      setFormState({ status: "success" });
      setForm(INITIAL_FORM);
      onServiceChange("");
    } catch {
      setFormState({ status: "error", errorMessage: "Error de conexión. Intenta de nuevo." });
    }
  };

  const handleReset = () => {
    setFormState({ status: "idle" });
    setFieldErrors({});
  };

  return (
    <section
      id="contacto"
      className="py-32 md:py-40 px-4 sm:px-6 scroll-mt-20"
      style={{ backgroundColor: "#F5F2ED", borderTop: "1px solid #D8D4CC" }}
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={staggerContainerVariants}
        >
          {/* Section header */}
          <div className="mb-14 md:mb-16 text-center md:text-left">
            <motion.p
              variants={fadeUpVariants}
              className="text-[11px] uppercase tracking-[0.2em] text-[#5C6460] mb-4"
            >
              &mdash; CONTACTO
            </motion.p>

            {/* Headline with animated "proyecto." reveal */}
            <motion.h2
              variants={fadeUpVariants}
              className="font-display font-light leading-[1] tracking-tight"
              style={{ fontSize: "clamp(48px, 7vw, 72px)", color: "#0D1511" }}
            >
              Cuéntame tu<br />
              <motion.em
                initial={{ clipPath: "inset(0 100% 0 0)" }}
                animate={inView ? { clipPath: "inset(0 0% 0 0)" } : { clipPath: "inset(0 100% 0 0)" }}
                transition={{ duration: 0.7, delay: 0.45, ease: [0.2, 0, 0, 1] }}
                style={{ display: "inline-block" }}
              >
                proyecto.
              </motion.em>
            </motion.h2>

            <motion.p variants={fadeUpVariants} className="mt-4 text-[15px] text-[#5C6460]">
              Respondo en menos de 24 horas.
            </motion.p>
          </div>

          {/* Body: aside + form */}
          <div className="flex flex-col md:flex-row gap-16 md:gap-20 lg:gap-28 items-start">

            {/* Info aside — desktop only */}
            <motion.aside
              variants={fadeUpVariants}
              className="hidden md:block md:w-56 lg:w-64 shrink-0 pt-2"
            >
              <p className="font-display italic font-light text-[22px] text-[#0D1511] leading-snug mb-8">
                ¿Por qué trabajar con Luisito?
              </p>
              <ul className="space-y-6">
                {ASIDE_POINTS.map((point) => (
                  <li key={point.stat} className="flex items-start gap-4">
                    <span
                      className="font-display font-light text-[28px] leading-none shrink-0"
                      style={{ color: "#1B4D5C" }}
                    >
                      {point.stat}
                    </span>
                    <span
                      className="font-display italic font-light text-[16px] text-[#5C6460] leading-snug pt-1"
                    >
                      {point.text}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.aside>

            {/* Form area */}
            <motion.div variants={fadeUpVariants} className="flex-1 min-w-0 max-w-2xl">
              <AnimatePresence mode="wait">
                {formState.status === "success" ? (
                  <SuccessView key="success" onReset={handleReset} />
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    onSubmit={handleSubmit}
                    noValidate
                    className="space-y-8"
                  >
                    {/* Error banner */}
                    <AnimatePresence>
                      {formState.status === "error" && (
                        <motion.div
                          key="error-banner"
                          initial={{ opacity: 0, y: -6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -6 }}
                          transition={{ duration: 0.2 }}
                          className="px-4 py-3"
                          style={{ backgroundColor: "#FEF2F2", border: "1px solid #FCA5A5" }}
                          role="alert"
                        >
                          <p className="text-[14px] text-[#C0392B]">{formState.errorMessage}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Name */}
                    <LineField label="Nombre completo" required error={fieldErrors.name} id="name">
                      <input
                        id="name" name="name" type="text" autoComplete="name"
                        placeholder="Tu nombre" value={form.name} onChange={handleChange}
                        aria-invalid={!!fieldErrors.name}
                        className={`${lineBase} ${fieldErrors.name ? lineError : ""}`}
                      />
                    </LineField>

                    {/* WhatsApp + Email */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <LineField label="WhatsApp (Colombia)" required error={fieldErrors.whatsapp} id="whatsapp">
                        <input
                          id="whatsapp" name="whatsapp" type="tel" autoComplete="tel"
                          placeholder="3001234567" value={form.whatsapp} onChange={handleChange}
                          maxLength={14} aria-invalid={!!fieldErrors.whatsapp}
                          className={`${lineBase} ${fieldErrors.whatsapp ? lineError : ""}`}
                        />
                      </LineField>
                      <LineField label="Correo electrónico" required error={fieldErrors.email} id="email">
                        <input
                          id="email" name="email" type="email" autoComplete="email"
                          placeholder="tu@correo.com" value={form.email} onChange={handleChange}
                          aria-invalid={!!fieldErrors.email}
                          className={`${lineBase} ${fieldErrors.email ? lineError : ""}`}
                        />
                      </LineField>
                    </div>

                    {/* Business */}
                    <LineField label="Negocio / Marca" required error={fieldErrors.business} id="business">
                      <input
                        id="business" name="business" type="text"
                        placeholder="Nombre de tu negocio" value={form.business} onChange={handleChange}
                        aria-invalid={!!fieldErrors.business}
                        className={`${lineBase} ${fieldErrors.business ? lineError : ""}`}
                      />
                    </LineField>

                    {/* Service */}
                    <LineField label="Servicio de interés" required error={fieldErrors.service} id="service">
                      <select
                        id="service" name="service"
                        value={effectiveService} onChange={handleChange}
                        aria-invalid={!!fieldErrors.service}
                        className={`${lineBase} cursor-pointer appearance-none ${fieldErrors.service ? lineError : ""}`}
                        style={{ backgroundImage: "none" }}
                      >
                        {SERVICE_OPTIONS.map((opt) => (
                          <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                      </select>
                    </LineField>

                    {/* Message */}
                    <LineField label="Mensaje" optional id="message">
                      <textarea
                        id="message" name="message" rows={4}
                        placeholder="Cuéntame brevemente sobre tu proyecto..."
                        value={form.message} onChange={handleChange}
                        maxLength={500}
                        className={`${lineBase} resize-none`}
                      />
                      <p className="text-right text-[11px] text-[#5C6460]/45 mt-1.5">
                        {form.message.length}/500
                      </p>
                    </LineField>

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      data-cta="lead-form-submit"
                      data-service={effectiveService}
                      className="relative w-full h-14 flex items-center justify-center gap-3 text-[13px] uppercase tracking-[0.14em] text-white overflow-hidden disabled:cursor-not-allowed disabled:opacity-60"
                      style={{ backgroundColor: "#1B4D5C" }}
                      onMouseEnter={() => setSubmitHovered(true)}
                      onMouseLeave={() => setSubmitHovered(false)}
                    >
                      {/* Fill sweep on hover */}
                      {!isSubmitting && (
                        <span
                          aria-hidden="true"
                          className="absolute inset-0 block"
                          style={{
                            backgroundColor: "#0F2E38",
                            transform: submitHovered ? "translateX(0)" : "translateX(-100%)",
                            transition: "transform 0.32s cubic-bezier(0.4,0,0.2,1)",
                          }}
                        />
                      )}
                      <span className="relative z-10 flex items-center gap-2.5">
                        {isSubmitting ? (
                          <>
                            <span
                              className="inline-block w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin shrink-0"
                              aria-hidden="true"
                            />
                            Enviando...
                          </>
                        ) : (
                          <>
                            Enviar mensaje
                            <span
                              style={{
                                display: "inline-block",
                                transform: submitHovered ? "translateX(2px)" : "translateX(0)",
                                transition: "transform 0.2s ease",
                              }}
                            >
                              →
                            </span>
                          </>
                        )}
                      </span>
                    </button>

                    <p className="text-center text-[12px] text-[#5C6460]/45">
                      Tu información es privada y no será compartida.
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}
