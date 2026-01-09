"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  MapPin,
  Instagram,
  CheckCircle,
  Coffee,
  Mountain,
  Utensils,
  Waves,
  LayoutGrid,
  Smile,
  Bird,
  Truck,
  Bus,
  Calendar,
  Check,
  MessageCircle,
  HelpCircle,
  ArrowRight,
  Eye,
  Users,
} from "lucide-react";

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showWhatsAppModal, setShowWhatsAppModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showRegistroModal, setShowRegistroModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [stats, setStats] = useState({ views: 0, visitors: 0 });
  const [countdown, setCountdown] = useState(3);
  const [fechaSeleccionada, setFechaSeleccionada] = useState<string | null>(null);
  const [errorModal, setErrorModal] = useState<{ show: boolean; message: string }>({ show: false, message: "" });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Registrar visita y obtener estadísticas
  useEffect(() => {
    const registerView = async () => {
      try {
        const response = await fetch("/api/views", { method: "POST" });
        const data = await response.json();
        if (data.views !== undefined) {
          setStats({ views: data.views, visitors: data.visitors });
        }
      } catch (error) {
        console.error("Error registrando visita:", error);
        // Intentar solo obtener las stats si falla el POST
        try {
          const response = await fetch("/api/views");
          const data = await response.json();
          setStats({ views: data.views, visitors: data.visitors });
        } catch {
          // Silenciar error
        }
      }
    };
    registerView();
  }, []);

  // Countdown para redirección al pago
  useEffect(() => {
    if (showSuccessModal) {
      setCountdown(3);
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            window.location.href = "https://checkout.nequi.wompi.co/l/4NTTQO";
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [showSuccessModal]);

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.currentTarget;
    const formData = new FormData(form);
    
    if (fechaSeleccionada) {
      formData.append("fecha_viaje", fechaSeleccionada);
    }

    try {
      const response = await fetch("/api/registro", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSubmitSuccess(true);
        setShowRegistroModal(false);
        setShowSuccessModal(true);
        form.reset();
      } else {
        // Mostrar error específico del servidor
        setErrorModal({ show: true, message: data.error || "Error al procesar el registro" });
      }
    } catch (error) {
      console.error("Error!", error);
      setErrorModal({ show: true, message: "Error de conexión. Por favor intenta de nuevo." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-slate-50 text-slate-900 overflow-x-hidden">
      {/* Top Bar Premium */}
      <div className="fixed w-full z-[60] bg-emerald-950 text-white py-2 px-6 overflow-hidden border-b border-emerald-800/50">
        <div className="max-w-7xl mx-auto flex justify-center items-center gap-3 text-center">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <p className="text-[10px] md:text-xs font-black tracking-[0.3em] uppercase">
            Experiencias exclusivas saliendo desde{" "}
            <span className="text-emerald-400">Barranquilla</span>
          </p>
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
        </div>
      </div>

      {/* Navegación */}
      <nav
        className={`fixed w-full z-50 transition-all duration-500 pt-14 px-6 ${
          isScrolled
            ? "bg-white/90 backdrop-blur-xl shadow-2xl py-3"
            : "py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <a href="#">
              <Image
                src="https://res.cloudinary.com/dgvg8lsw3/image/upload/v1736256249/Luisito_png_cfhgb1.png"
                alt="Logo Luisito el Viajero"
                width={80}
                height={80}
                className={`h-16 md:h-20 w-auto transition-all duration-500 premium-logo-glow object-contain ${
                  isScrolled ? "" : "brightness-0 invert"
                }`}
              />
            </a>
          </div>
          <div className="flex items-center gap-8">
            <a
              href="https://instagram.com/luisitoelviajero"
              target="_blank"
              rel="noopener noreferrer"
              className={`hidden md:flex items-center gap-2 font-bold transition-all ${
                isScrolled
                  ? "text-slate-900 hover:text-emerald-600"
                  : "text-white/90 hover:text-white"
              }`}
            >
              <Instagram size={20} />
              <span>@luisitoelviajero</span>
            </a>
            <a
              href="#reserva"
              className={`px-8 py-3 rounded-2xl font-black tracking-tighter shadow-2xl transition-all transform hover:scale-105 text-sm md:text-base ${
                isScrolled
                  ? "bg-emerald-600 text-white"
                  : "bg-white text-emerald-900"
              }`}
            >
              RESERVAR AHORA
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/Donde-queda-Minca-en-Santa-Marta 2.jpg"
            alt="Portada Minca"
            fill
            className="w-full h-full object-cover hero-zoom"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-slate-50"></div>
        </div>
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center text-white">
          <div className="inline-flex items-center gap-3 px-5 py-2 mb-8 rounded-full bg-black/40 backdrop-blur-md border border-white/20">
            <MapPin size={14} className="text-emerald-400" />
            <span className="text-white font-bold tracking-[0.2em] uppercase text-[10px] md:text-xs">
              Salidas directas desde Barranquilla
            </span>
          </div>
          <h1 className="text-7xl md:text-[10rem] font-black mb-8 tracking-tighter leading-[0.85] drop-shadow-2xl">
            MINCA <br />
            <span className="text-emerald-400 italic">MÁGICA</span>
          </h1>
          <p className="text-2xl md:text-3xl mb-12 text-slate-100 font-light max-w-3xl mx-auto drop-shadow-lg leading-tight">
            El escape que tu alma estaba pidiendo. Reconecta con la Sierra
            Nevada saliendo desde Barranquilla.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <a
              href="#reserva"
              className="px-14 py-7 bg-emerald-500 hover:bg-emerald-400 text-white rounded-3xl text-2xl font-black shadow-2xl shadow-emerald-500/50 transition-all transform hover:-translate-y-2"
            >
              ¡RESERVAR MI CUPO!
            </a>
          </div>
        </div>
      </section>

      {/* Sección Sobre Mí */}
      <section className="py-20 bg-gradient-to-b from-white to-slate-50 px-6 overflow-hidden relative">
        {/* SVG Colombia de fondo */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-5 pointer-events-none">
          <svg width="400" height="500" viewBox="0 0 100 120" className="fill-emerald-600">
            <path d="M50,5 C55,8 65,10 70,15 C75,20 78,28 80,35 C82,42 80,50 78,58 C76,66 72,74 68,82 C64,90 58,98 52,105 C50,108 48,108 46,105 C40,98 34,90 30,82 C26,74 22,66 20,58 C18,50 16,42 18,35 C20,28 23,20 28,15 C33,10 43,8 50,5 Z" />
          </svg>
        </div>
        
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
            {/* Foto con elementos */}
            <div className="relative shrink-0">
              {/* Círculo animado detrás */}
              <div className="absolute inset-0 w-44 h-44 md:w-56 md:h-56 rounded-full bg-emerald-400/20 animate-ping" style={{ animationDuration: '3s' }}></div>
              <div className="absolute inset-0 w-44 h-44 md:w-56 md:h-56 rounded-full bg-emerald-400/10 animate-pulse"></div>
              
              <div className="relative w-44 h-44 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-emerald-500 shadow-2xl shadow-emerald-500/30">
                <Image
                  src="/yoluisito.webp"
                  alt="Luisito el Viajero"
                  width={250}
                  height={250}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Bandera Colombia flotante */}
              <div className="absolute -top-2 -right-2 text-2xl animate-bounce" style={{ animationDuration: '2s' }}>🇨🇴</div>
            </div>
            
            {/* Contenido */}
            <div className="text-center md:text-left flex-1">
              <h2 className="text-3xl md:text-5xl font-black tracking-tighter uppercase mb-6">
                Hola, soy <span className="text-emerald-500 italic">Luisito</span>
              </h2>
              
              <div className="space-y-4 mb-8">
                <p className="text-slate-600 text-base md:text-lg leading-relaxed">
                  <span className="font-black text-emerald-600">+10 años creando viajes grupales</span>, recorriendo destinos y transformando el turismo en experiencias que se sienten y se recuerdan.
                </p>
                <p className="text-slate-600 text-base md:text-lg leading-relaxed">
                  No improviso viajes: <span className="font-bold text-slate-800">diseño vivencias</span> con conocimiento, pasión y un profundo respeto por cada persona que confía en mí.
                </p>
                <p className="text-slate-700 text-base md:text-lg leading-relaxed font-medium italic">
                  Aquí empiezas a viajar con alguien que <span className="text-emerald-600 font-black">vive el turismo</span>, no solo lo vende.
                </p>
              </div>
              
              {/* Redes sociales */}
              <div className="flex flex-wrap justify-center md:justify-start gap-3">
                <a
                  href="https://instagram.com/luisitoelviajero"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 text-white rounded-full font-bold text-sm hover:scale-105 transition-all shadow-lg"
                >
                  <Instagram size={18} />
                  Instagram
                </a>
                <a
                  href="https://www.tiktok.com/@luisitoelviajero?_r=1&_t=ZS-92uvPleUxRX"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 bg-black text-white rounded-full font-bold text-sm hover:scale-105 transition-all shadow-lg"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                  </svg>
                  TikTok
                </a>
                <a
                  href="https://www.facebook.com/share/1EFKtLjbpf/?mibextid=wwXIfr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 bg-blue-600 text-white rounded-full font-bold text-sm hover:scale-105 transition-all shadow-lg"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  Facebook
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sección de Viajes Grupales */}
      <section className="py-24 bg-white px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-sm font-bold text-emerald-600 tracking-widest uppercase mb-4">
              Comunidad de Viajeros
            </h2>
            <h3 className="text-5xl md:text-6xl font-black tracking-tighter uppercase">
              Nuestros{" "}
              <span className="text-emerald-500 italic">Viajes Grupales</span>
            </h3>
            <p className="mt-6 text-slate-500 max-w-2xl mx-auto text-lg italic uppercase tracking-wider">
              Únete a la familia de Luisito el Viajero
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Foto 1 */}
            <div className="overflow-hidden rounded-[2rem] shadow-xl hover:shadow-2xl transition-all">
              <Image
                src="/IMG_2941.jpg"
                alt="Viaje Minca 1"
                width={600}
                height={450}
                className="w-full h-[450px] object-cover hover:scale-110 transition-transform duration-700"
              />
            </div>
            {/* Foto 2 */}
            <div className="overflow-hidden rounded-[2rem] shadow-xl hover:shadow-2xl transition-all md:translate-y-8">
              <Image
                src="/IMG_2942.jpg"
                alt="Viaje Minca 2"
                width={600}
                height={450}
                className="w-full h-[450px] object-cover hover:scale-110 transition-transform duration-700"
              />
            </div>
            {/* Foto 3 */}
            <div className="overflow-hidden rounded-[2rem] shadow-xl hover:shadow-2xl transition-all">
              <Image
                src="/IMG_2943.jpg"
                alt="Viaje Minca 3"
                width={600}
                height={450}
                className="w-full h-[450px] object-cover hover:scale-110 transition-transform duration-700"
              />
            </div>
          </div>
        </div>
      </section>

      {/* EL PLAN INCLUYE */}
      <section className="py-24 bg-slate-100 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-sm font-bold text-emerald-600 tracking-[0.3em] uppercase text-center mb-4">
            Todo lo que vivirás
          </h2>
          <h3 className="text-5xl md:text-6xl font-black text-center mb-16 tracking-tighter uppercase">
            EL PLAN <span className="text-emerald-500 italic">INCLUYE</span>
          </h3>
          <div className="grid lg:grid-cols-3 gap-8">
            {/* City Tour */}
            <div className="bg-white p-10 rounded-[3rem] shadow-xl border border-slate-100 hover:shadow-2xl transition-all">
              <div className="w-16 h-16 bg-amber-50 rounded-2xl flex items-center justify-center mb-8">
                <Coffee className="text-amber-600" size={32} />
              </div>
              <h4 className="text-2xl font-black mb-6 uppercase tracking-tighter">
                City Tour Minca
              </h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3 text-slate-600">
                  <CheckCircle
                    className="text-emerald-500 shrink-0 mt-1"
                    size={18}
                  />
                  <span>Degustación de café orgánico</span>
                </li>
                <li className="flex items-start gap-3 text-slate-600">
                  <CheckCircle
                    className="text-emerald-500 shrink-0 mt-1"
                    size={18}
                  />
                  <span>Famoso pan de chocolate</span>
                </li>
              </ul>
            </div>

            {/* Pasadía Sierra Minca */}
            <div className="bg-emerald-900 p-10 rounded-[3rem] shadow-2xl text-white transform lg:-translate-y-6">
              <div className="w-16 h-16 bg-emerald-800 rounded-2xl flex items-center justify-center mb-8">
                <Mountain className="text-emerald-400" size={32} />
              </div>
              <h4 className="text-2xl font-black mb-6 uppercase tracking-tighter">
                Pasadía Sierra Minca
              </h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3 text-emerald-100 font-bold">
                  <Utensils className="text-emerald-400 shrink-0 mt-1" size={18} />
                  <span>Almuerzo a la carta</span>
                </li>
                <li className="flex items-start gap-3 text-emerald-100">
                  <Waves className="text-emerald-400 shrink-0 mt-1" size={18} />
                  <span>Acceso a piscinas</span>
                </li>
                <li className="flex items-start gap-3 text-emerald-100">
                  <LayoutGrid
                    className="text-emerald-400 shrink-0 mt-1"
                    size={18}
                  />
                  <span>Mallas, hamacas y miradores</span>
                </li>
                <li className="flex items-start gap-3 text-emerald-100">
                  <Smile className="text-emerald-400 shrink-0 mt-1" size={18} />
                  <span>Zona de descanso y juegos</span>
                </li>
              </ul>
            </div>

            {/* Sierra Wonders & Transporte */}
            <div className="bg-white p-10 rounded-[3rem] shadow-xl border border-slate-100 hover:shadow-2xl transition-all">
              <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center mb-8">
                <Bird className="text-indigo-600" size={32} />
              </div>
              <h4 className="text-2xl font-black mb-6 uppercase tracking-tighter">
                Wonders & Logística
              </h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3 text-slate-600">
                  <CheckCircle
                    className="text-emerald-500 shrink-0 mt-1"
                    size={18}
                  />
                  <span>Visita Sierra Wonders (Colibríes)</span>
                </li>
                <li className="flex items-start gap-3 text-slate-600 font-bold">
                  <Truck className="text-emerald-500 shrink-0 mt-1" size={18} />
                  <span>Transporte interno en 4x4</span>
                </li>
                <li className="flex items-start gap-3 text-emerald-600 font-black">
                  <Bus className="shrink-0 mt-1" size={18} />
                  <span>Ida y regreso desde Barranquilla</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Reserva y Fechas */}
      <section id="reserva" className="py-8 sm:py-12 md:py-20 px-4 md:px-6 bg-white scroll-mt-28 md:scroll-mt-32">
        <div className="max-w-3xl mx-auto text-center">
          <div className="bg-slate-900 rounded-2xl sm:rounded-3xl md:rounded-[3rem] p-5 sm:p-8 md:p-12 lg:p-16 text-white shadow-2xl border border-white/5">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black mb-4 sm:mb-6 md:mb-8 tracking-tighter uppercase italic">
              ASEGURA TU CUPO
            </h2>
            
            {/* Fechas - Seleccionables */}
            <p className="text-slate-400 text-[10px] sm:text-xs mb-3 uppercase tracking-widest font-bold">
              Selecciona tu fecha de viaje
            </p>
            <div className="grid grid-cols-2 gap-2 sm:gap-4 md:gap-6 mb-5 sm:mb-8 md:mb-10">
              <button
                type="button"
                onClick={() => setFechaSeleccionada("11 de Enero 2026")}
                className={`relative p-3 sm:p-4 md:p-6 rounded-xl sm:rounded-2xl md:rounded-3xl flex items-center gap-2 sm:gap-3 md:gap-4 transition-all cursor-pointer text-left ${
                  fechaSeleccionada === "11 de Enero 2026"
                    ? "bg-emerald-500/20 border-2 border-emerald-500 scale-[1.02]"
                    : "bg-white/5 border border-white/10 hover:bg-emerald-500/10"
                }`}
              >
                {fechaSeleccionada === "11 de Enero 2026" && (
                  <div className="absolute top-2 right-2 w-5 h-5 sm:w-6 sm:h-6 bg-emerald-500 rounded-full flex items-center justify-center">
                    <Check size={12} className="text-white" />
                  </div>
                )}
                <Calendar className="text-emerald-400 shrink-0 hidden sm:block" size={24} />
                <div>
                  <div className="font-black text-sm sm:text-lg md:text-xl tracking-tight leading-none mb-0.5 sm:mb-1 text-emerald-400">
                    11 ENERO
                  </div>
                  <div className="text-[7px] sm:text-[9px] md:text-[10px] text-slate-400 uppercase tracking-wider font-bold">
                    DOM 2026 - ÚLTIMOS
                  </div>
                </div>
              </button>
              <button
                type="button"
                onClick={() => setFechaSeleccionada("01 de Febrero 2026")}
                className={`relative p-3 sm:p-4 md:p-6 rounded-xl sm:rounded-2xl md:rounded-3xl flex items-center gap-2 sm:gap-3 md:gap-4 transition-all cursor-pointer text-left ${
                  fechaSeleccionada === "01 de Febrero 2026"
                    ? "bg-emerald-500/20 border-2 border-emerald-500 scale-[1.02]"
                    : "bg-white/5 border border-white/10 hover:bg-emerald-500/10"
                }`}
              >
                {fechaSeleccionada === "01 de Febrero 2026" && (
                  <div className="absolute top-2 right-2 w-5 h-5 sm:w-6 sm:h-6 bg-emerald-500 rounded-full flex items-center justify-center">
                    <Check size={12} className="text-white" />
                  </div>
                )}
                <Calendar className="text-emerald-400 shrink-0 hidden sm:block" size={24} />
                <div>
                  <div className="font-black text-sm sm:text-lg md:text-xl tracking-tight leading-none mb-0.5 sm:mb-1">
                    01 FEBRERO
                  </div>
                  <div className="text-[7px] sm:text-[9px] md:text-[10px] text-slate-400 uppercase tracking-wider font-bold">
                    DOM 2026 - DISPONIBLE
                  </div>
                </div>
              </button>
            </div>
            
            {/* Precio */}
            <div className="mb-5 sm:mb-8 md:mb-10">
              <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-1 sm:mb-2 tracking-tighter leading-none">
                $290.000 <span className="text-xs sm:text-sm md:text-base text-slate-500 font-normal uppercase tracking-widest">COP</span>
              </div>
              <div className="mt-3 sm:mt-4">
                <p className="text-emerald-400 font-black uppercase tracking-wider text-[10px] sm:text-xs bg-emerald-500/10 inline-block px-3 sm:px-5 md:px-6 py-1.5 sm:py-2 rounded-full border border-emerald-500/30">
                  Reserva con $60.000/persona
                </p>
              </div>
            </div>
            
            {/* Botón */}
            <button
              onClick={() => {
                if (!fechaSeleccionada) {
                  setErrorModal({ show: true, message: "Por favor selecciona una fecha de viaje antes de continuar." });
                  return;
                }
                setShowRegistroModal(true);
              }}
              className={`block w-full py-4 sm:py-5 md:py-6 rounded-xl sm:rounded-2xl text-lg sm:text-xl md:text-2xl font-black shadow-2xl transition-all transform active:scale-[0.98] uppercase tracking-tighter cursor-pointer ${
                fechaSeleccionada
                  ? "bg-emerald-500 text-slate-950 hover:bg-emerald-400 hover:-translate-y-1"
                  : "bg-slate-700 text-slate-400"
              }`}
            >
              {fechaSeleccionada ? "RESERVAR POR NEQUI" : "SELECCIONA UNA FECHA"}
            </button>
            
            <p className="mt-4 sm:mt-5 text-slate-500 text-[9px] sm:text-[10px] font-bold uppercase tracking-widest italic">
              Punto de encuentro: Barranquilla
            </p>
            
            <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-white/10">
              <p className="text-slate-500 text-[9px] sm:text-[10px]">
                ¿Necesitas cancelar?{" "}
                <a
                  href="https://wa.me/573209344964?text=Hola!%20Necesito%20cancelar%20mi%20reserva%20de%20Minca%20Mágica"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 hover:text-emerald-300 underline"
                >
                  WhatsApp
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-24 bg-slate-950 text-white px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
          <div className="mb-16">
            <Image
              src="https://res.cloudinary.com/dgvg8lsw3/image/upload/v1736256249/Luisito_png_cfhgb1.png"
              alt="Logo Luisito el Viajero"
              width={160}
              height={160}
              className="h-32 md:h-40 w-auto brightness-0 invert opacity-90"
            />
          </div>
          <a
            href="https://instagram.com/luisitoelviajero"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 text-emerald-400 text-4xl font-black transition-all hover:scale-110 tracking-tighter"
          >
            <Instagram size={48} />
            @luisitoelviajero
          </a>

          {/* Contador de Visitas */}
          <div className="flex items-center justify-center gap-8 mt-16 mb-8">
            <div className="flex flex-col items-center gap-2 px-8 py-6 bg-white/5 border border-white/10 rounded-2xl hover:bg-emerald-500/10 transition-all">
              <div className="flex items-center gap-2 text-emerald-400">
                <Users size={24} />
                <span className="text-3xl font-black tracking-tighter">
                  {stats.visitors.toLocaleString("es-CO")}
                </span>
              </div>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
                Visitantes
              </span>
            </div>
            <div className="flex flex-col items-center gap-2 px-8 py-6 bg-white/5 border border-white/10 rounded-2xl hover:bg-emerald-500/10 transition-all">
              <div className="flex items-center gap-2 text-emerald-400">
                <Eye size={24} />
                <span className="text-3xl font-black tracking-tighter">
                  {stats.views.toLocaleString("es-CO")}
                </span>
              </div>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
                Vistas
              </span>
            </div>
          </div>

          <div className="w-full pt-16 border-t border-white/5 mt-8 text-[10px] font-black text-slate-700 uppercase tracking-[0.6em]">
            © 2026 LUISITO EL VIAJERO • SALIDAS DESDE BARRANQUILLA • SIERRA
            NEVADA
          </div>
        </div>
      </footer>

      {/* Modal Registro */}
      {showRegistroModal && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowRegistroModal(false);
          }}
        >
          <div className="bg-white rounded-[3rem] p-8 md:p-12 max-w-xl w-full shadow-2xl border border-slate-100 relative overflow-hidden max-h-[90vh] overflow-y-auto">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full -mr-16 -mt-16"></div>
            
            <button
              onClick={() => setShowRegistroModal(false)}
              className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-700 transition-all cursor-pointer"
            >
              ✕
            </button>

            <div className="text-center mb-8">
              {/* Fecha seleccionada */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 rounded-full text-xs font-bold mb-4 border border-emerald-200">
                <Calendar size={14} />
                {fechaSeleccionada}
              </div>
              <h2 className="text-sm font-bold text-emerald-600 tracking-[0.3em] uppercase mb-4">
                Paso 1 de 2
              </h2>
              <h3 className="text-3xl md:text-4xl font-black tracking-tighter uppercase">
                Datos del{" "}
                <span className="text-emerald-500 italic">Viajero</span>
              </h3>
              <p className="text-slate-500 mt-2 text-sm">
                Completa tus datos para habilitar el pago de reserva.
              </p>
            </div>

            <form
              onSubmit={handleFormSubmit}
              className="grid grid-cols-1 md:grid-cols-2 gap-5"
            >
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">
                  Nombre
                </label>
                <input
                  type="text"
                  name="nombre"
                  required
                  placeholder="Ej: Juan"
                  className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all placeholder:text-slate-300"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">
                  Apellido
                </label>
                <input
                  type="text"
                  name="apellido"
                  required
                  placeholder="Ej: Perez"
                  className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all placeholder:text-slate-300"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">
                  WhatsApp <span className="text-slate-300">(10 dígitos)</span>
                </label>
                <input
                  type="tel"
                  name="whatsapp"
                  required
                  pattern="3[0-9]{9}"
                  maxLength={10}
                  placeholder="3001234567"
                  title="Número colombiano de 10 dígitos que empiece con 3"
                  className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all placeholder:text-slate-300 invalid:border-red-300 invalid:focus:ring-red-500"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">
                  Correo Electrónico
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
                  placeholder="tu@email.com"
                  title="Ingresa un correo electrónico válido"
                  className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all placeholder:text-slate-300 invalid:border-red-300 invalid:focus:ring-red-500"
                />
              </div>

              <div className="md:col-span-2 flex items-center gap-3 py-3">
                <input
                  type="checkbox"
                  id="datos-modal"
                  name="tratamiento_datos"
                  required
                  className="w-5 h-5 accent-emerald-500 cursor-pointer"
                />
                <label
                  htmlFor="datos-modal"
                  className="text-xs text-slate-500 leading-tight cursor-pointer"
                >
                  Acepto el{" "}
                  <span className="font-bold text-slate-700">
                    tratamiento de datos personales
                  </span>{" "}
                  y política de privacidad para mi reserva.
                </label>
              </div>

              <div className="md:col-span-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-5 rounded-2xl font-black text-lg tracking-tighter transition-all transform active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer ${
                    submitSuccess
                      ? "bg-emerald-600 text-white"
                      : "bg-slate-900 text-white hover:bg-emerald-600"
                  }`}
                >
                  <span>
                    {isSubmitting
                      ? "PROCESANDO REGISTRO..."
                      : submitSuccess
                      ? "¡REGISTRO EXITOSO!"
                      : "CONTINUAR AL PAGO"}
                  </span>
                  {!isSubmitting && !submitSuccess && <ArrowRight size={20} />}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal WhatsApp */}
      {showWhatsAppModal && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowWhatsAppModal(false);
          }}
        >
          <div className="bg-slate-900 rounded-3xl p-8 md:p-12 max-w-md w-full text-center border border-emerald-500/30 shadow-2xl">
            <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="text-white" size={32} />
            </div>
            <h3 className="text-2xl md:text-3xl font-black text-white mb-4 tracking-tight">
              ¡CASI LISTO!
            </h3>
            <p className="text-slate-300 mb-6">
              Una vez realizado el pago, envíanos el comprobante por WhatsApp
              para confirmar tu reserva.
            </p>
            <p className="text-slate-400 text-sm mb-6">
              ¿Tienes otro método de pago? Escríbenos por WhatsApp
            </p>
            <a
              href="https://wa.me/573209344964?text=Hola!%20Acabo%20de%20realizar%20mi%20pago%20para%20Minca%20Mágica"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full py-5 bg-emerald-500 text-slate-950 rounded-2xl text-xl font-black hover:bg-emerald-400 transition-all mb-3"
            >
              <span className="flex items-center justify-center gap-3">
                <MessageCircle size={24} /> ENVIAR COMPROBANTE
              </span>
            </a>
            <a
              href="https://wa.me/573209344964?text=Hola!%20Necesito%20ayuda%20con%20mi%20reserva%20de%20Minca%20Mágica"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full py-4 bg-white/10 text-white rounded-2xl text-base font-bold hover:bg-white/20 transition-all mb-3"
            >
              <span className="flex items-center justify-center gap-2">
                <HelpCircle size={20} /> NECESITO AYUDA
              </span>
            </a>
            <button
              onClick={() => {
                localStorage.removeItem("nequi_clicked");
                setShowWhatsAppModal(false);
              }}
              className="w-full py-4 bg-slate-800 text-slate-400 rounded-2xl text-sm font-bold hover:bg-slate-700 hover:text-white transition-all mb-2"
            >
              Aún no he hecho mi pago
            </button>
            <button
              onClick={() => setShowWhatsAppModal(false)}
              className="text-slate-600 text-xs font-bold hover:text-white transition-all mt-2"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}

      {/* Modal Éxito Registro */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl transform transition-all">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-black text-slate-900 mb-2 tracking-tighter">
              ¡REGISTRO EXITOSO!
            </h3>
            <p className="text-slate-500 mb-6 leading-tight">
              Tus datos han sido guardados. Te redirigiremos a la plataforma
              de pago en <span className="font-black text-emerald-600">{countdown}</span> segundos.
            </p>
            <button
              onClick={() => {
                window.location.href = "https://checkout.nequi.wompi.co/l/4NTTQO";
              }}
              className="w-full py-4 bg-emerald-600 text-white rounded-2xl font-black hover:bg-emerald-700 transition-colors uppercase tracking-tight cursor-pointer"
            >
              Ir a pagar ahora ({countdown})
            </button>
          </div>
        </div>
      )}

      {/* Modal de Error */}
      {errorModal.show && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={(e) => {
            if (e.target === e.currentTarget) setErrorModal({ show: false, message: "" });
          }}
        >
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl transform transition-all animate-pulse">
            <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-black text-slate-900 mb-2 tracking-tighter">
              ¡ATENCIÓN!
            </h3>
            <p className="text-slate-500 mb-6 leading-tight">
              {errorModal.message}
            </p>
            <button
              onClick={() => setErrorModal({ show: false, message: "" })}
              className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black hover:bg-slate-800 transition-colors uppercase tracking-tight cursor-pointer"
            >
              Entendido
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
