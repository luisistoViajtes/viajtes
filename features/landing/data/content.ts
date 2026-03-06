import { Service, Testimonial, Stat, BrandLogo } from "../types";

export const WA_NUMBER = "573209344964";
export const WA_BASE = `https://wa.me/${WA_NUMBER}`;
export const waLink = (msg: string) =>
  `${WA_BASE}?text=${encodeURIComponent(msg)}`;

export const SERVICES: Service[] = [
  {
    slug: "recorridos-360",
    title: "Recorridos 360° para negocios",
    description:
      "Lleva a tus clientes a una experiencia inmersiva de tu negocio. Tours virtuales profesionales que venden antes de que lleguen.",
    cta: "Quiero un recorrido 360°",
    icon: "MapPin",
    waMessage: "Hola Luisito, me interesa el servicio de Recorridos 360° para mi negocio",
  },
  {
    slug: "contenido-viral",
    title: "Creación de contenido viral orgánico",
    description:
      "Fotos, reels y videos que conectan con tu audiencia. Estrategia de contenido que genera seguidores reales y ventas.",
    cta: "Quiero crear contenido que venda",
    icon: "Camera",
    waMessage: "Hola Luisito, me interesa el servicio de Creación de Contenido",
  },
  {
    slug: "ia-automatizacion",
    title: "IA que responde mensajes por ti",
    description:
      "Automatiza tu atención al cliente con inteligencia artificial. Responde 24/7 sin perder ninguna oportunidad de venta.",
    cta: "Quiero automatizar mis mensajes",
    icon: "Bot",
    waMessage: "Hola Luisito, me interesa la automatización con IA para mi negocio",
  },
  {
    slug: "paginas-web",
    title: "Páginas web y landing pages",
    description:
      "Diseño y desarrollo de sitios web que convierten visitantes en clientes. Rápidos, bonitos y optimizados para vender.",
    cta: "Quiero mi página web",
    icon: "Globe",
    waMessage: "Hola Luisito, me interesa crear una página web o landing page",
  },
  {
    slug: "viajes",
    title: "Viaja conmigo",
    description:
      "Únete a nuestros grupos de viaje a los destinos más increíbles de Colombia y el mundo. Experiencias auténticas, comunidad real.",
    cta: "Quiero viajar contigo",
    icon: "Plane",
    waMessage: "Hola Luisito, me interesa viajar en uno de tus grupos",
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    name: "Carolina Restrepo",
    role: "Hoteles Boutique Cartagena",
    quote:
      "Luisito transformó la manera en que presentamos nuestro hotel. Las reservas aumentaron un 40% en el primer mes de trabajo juntos.",
  },
  {
    id: "t2",
    name: "Andrés Mejía",
    role: "Restaurante El Rincón, Medellín",
    quote:
      "El recorrido 360° que hizo para nosotros fue increíble. Nuestros clientes llegan ya enamorados del lugar antes de pisar la puerta.",
  },
  {
    id: "t3",
    name: "Valentina Torres",
    role: "Agencia de Viajes Nomada",
    quote:
      "Gracias al contenido que generamos con Luisito, pasamos de 2.000 a 28.000 seguidores en Instagram en menos de seis meses.",
  },
];

export const STATS: Stat[] = [
  { value: "10+", label: "años viajando y creando" },
  { value: "50+", label: "marcas aliadas" },
  { value: "200K+", label: "seguidores en redes" },
  { value: "15+", label: "destinos con grupos" },
];

export const BRAND_LOGOS: BrandLogo[] = [
  { name: "Brasilia", category: "Transporte" },
  { name: "Wingo", category: "Aerolínea" },
  { name: "Juan Valdez", category: "Café" },
  { name: "Copa Airlines", category: "Aerolínea" },
  { name: "Hoteles Estelar", category: "Hotelería" },
  { name: "Brasilia", category: "Transporte" },
  { name: "Wingo", category: "Aerolínea" },
  { name: "Juan Valdez", category: "Café" },
  { name: "Copa Airlines", category: "Aerolínea" },
  { name: "Hoteles Estelar", category: "Hotelería" },
];

export const SERVICE_LABELS: Record<string, string> = {
  "recorridos-360": "Recorridos 360°",
  "contenido-viral": "Creación de contenido",
  "ia-automatizacion": "IA automatización",
  "paginas-web": "Página web / landing",
  viajes: "Viajes",
  pauta: "Pauta conmigo",
};

export const PAUTA_FEATURES = [
  "Creación de contenido profesional para tu marca",
  "Publicación en Facebook, Instagram y TikTok",
  "Alcance orgánico a una comunidad activa de viajeros",
  "Generación de leads y consultas directas",
  "Asesoría gratuita en automatización de mensajes",
  "Informe de resultados al cierre de la campaña",
];
