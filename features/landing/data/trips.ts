// ── Trip data & types ────────────────────────────────────────────────
// Central source of truth for all upcoming trips

export interface TripDate {
  id: string;
  dateRange: string;
  spotsTotal: number;
  spotsLeft: number;
  price: string;
  priceNote: string;
  status: "open" | "full" | "soon";
}

export interface Trip {
  slug: string;
  dest: string;
  country: string;
  region: string;
  heroSrc: string;
  tagline: string;
  description: string;
  accent: string;
  bg: string;
  includes: string[];
  highlights: string[];
  itinerary: Array<{ day: string; title: string; desc: string }>;
  dates: TripDate[];
  meetingPoint: string;
  gallery: string[];
}

export const TRIPS: Trip[] = [
  {
    slug: "minca",
    dest: "Minca",
    country: "Colombia",
    region: "Sierra Nevada · Santa Marta",
    heroSrc: "/Donde-queda-Minca-en-Santa-Marta 2.jpg",
    tagline: "Selva, cascadas y café en las faldas de la Sierra Nevada.",
    description:
      "Minca es uno de los secretos mejor guardados de Colombia. Un pueblo pequeño rodeado de selva tropical, cascadas de agua fría y cafetales que cuelgan de las montañas. Aquí el tiempo va más despacio, la naturaleza lo es todo y cada amanecer desde el mirador regala una vista que no se olvida jamás.",
    accent: "#1B4D5C",
    bg: "linear-gradient(135deg, #0B2A35 0%, #1B4D5C 100%)",
    includes: [
      "Transporte ida y vuelta desde Santa Marta",
      "2 noches en hostal ecológico",
      "Desayunos incluidos",
      "Guía local certificado",
      "Recorrido por fincas cafeteras",
      "Piscina natural en cascada La Victoria",
    ],
    highlights: [
      "Cascada La Victoria",
      "Mirador Pozo Azul",
      "Finca cafetera El Paraíso",
      "Reserva Natural ProAves",
    ],
    itinerary: [
      {
        day: "Día 1",
        title: "Llegada y aclimatación",
        desc: "Recibimiento en Santa Marta, subida a Minca en jeep, instalación y tarde libre en el pueblo.",
      },
      {
        day: "Día 2",
        title: "Cascadas y café",
        desc: "Caminata a la Cascada La Victoria, visita a finca cafetera con catación, tarde en pozos naturales.",
      },
      {
        day: "Día 3",
        title: "Mirador y regreso",
        desc: "Amanecer en el mirador Pozo Azul, desayuno en la finca y regreso a Santa Marta.",
      },
    ],
    dates: [
      {
        id: "minca-mar-26",
        dateRange: "14 – 16 de Marzo, 2026",
        spotsTotal: 12,
        spotsLeft: 4,
        price: "$380.000",
        priceNote: "por persona · todo incluido",
        status: "open",
      },
      {
        id: "minca-abr-26",
        dateRange: "18 – 20 de Abril, 2026",
        spotsTotal: 12,
        spotsLeft: 8,
        price: "$380.000",
        priceNote: "por persona · todo incluido",
        status: "open",
      },
    ],
    meetingPoint: "Terminal de Transportes de Santa Marta",
    gallery: ["/IMG_2941.jpg", "/IMG_2942.jpg", "/IMG_2943.jpg"],
  },
  {
    slug: "la-guajira",
    dest: "La Guajira",
    country: "Colombia",
    region: "Caribe · Punta Gallinas",
    heroSrc:
      "https://images.unsplash.com/photo-1597655601841-214a4cfe8b2c?w=1400&q=80",
    tagline: "El desierto donde Colombia se besa con el mar Caribe.",
    description:
      "La Guajira es el extremo norte de Colombia, donde el desierto rojo y la selva baja se funden con el mar Caribe. Un territorio Wayuu lleno de cultura ancestral, dunas de arena que bajan al océano y atardeceres que pintan el cielo de naranja y violeta. La experiencia más única e irrepetible del país.",
    accent: "#B5763A",
    bg: "linear-gradient(135deg, #1A1006 0%, #3D2410 100%)",
    includes: [
      "Transporte 4x4 todo el recorrido",
      "3 noches en rancherías y campamentos",
      "Alimentación completa (comida Wayuu)",
      "Guía indígena Wayuu",
      "Bañado en el mar en Punta Gallinas",
      "Visita a las dunas del desierto",
    ],
    highlights: [
      "Cabo de la Vela",
      "Punta Gallinas (el punto más norte de Suramérica)",
      "Dunas de Pilón de Azúcar",
      "Playones de bahía Hondita",
    ],
    itinerary: [
      {
        day: "Día 1",
        title: "Riohacha y Cabo de la Vela",
        desc: "Salida desde Riohacha, recorrido en 4x4 por el desierto, llegada al cabo, atardecer sobre el mar.",
      },
      {
        day: "Día 2",
        title: "Punta Gallinas",
        desc: "Madrugada hacia el punto más norte de Sudamérica, desayuno frente al Caribe, caminata por las dunas.",
      },
      {
        day: "Día 3",
        title: "Dunas y cultura Wayuu",
        desc: "Visita al Pilón de Azúcar, intercambio cultural con comunidad Wayuu, artesanías.",
      },
      {
        day: "Día 4",
        title: "Regreso",
        desc: "Desayuno en ranchería, viaje de regreso a Riohacha con paradas fotográficas.",
      },
    ],
    dates: [
      {
        id: "guajira-abr-26",
        dateRange: "10 – 13 de Abril, 2026",
        spotsTotal: 10,
        spotsLeft: 6,
        price: "$690.000",
        priceNote: "por persona · todo incluido",
        status: "open",
      },
      {
        id: "guajira-may-26",
        dateRange: "8 – 11 de Mayo, 2026",
        spotsTotal: 10,
        spotsLeft: 10,
        price: "$690.000",
        priceNote: "por persona · todo incluido",
        status: "open",
      },
    ],
    meetingPoint: "Terminal de Riohacha, Guajira",
    gallery: [
      "https://images.unsplash.com/photo-1597655601841-214a4cfe8b2c?w=800&q=80",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
      "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&q=80",
    ],
  },
  {
    slug: "cartagena",
    dest: "Cartagena",
    country: "Colombia",
    region: "Costa Caribe · Bolívar",
    heroSrc:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1400&q=80",
    tagline:
      "La ciudad amurallada que enamora desde el primer atardecer.",
    description:
      "Cartagena de Indias es una de las ciudades más bellas y vibrantes de América Latina. Sus calles empedradas, balcones con flores y murallas coloniales cuentan siglos de historia. Pero también hay playas de aguas cristalinas, gastronomía que no para y una vida nocturna que te atrapa. El plan perfecto para combinar cultura, sol y sabor.",
    accent: "#2A6678",
    bg: "linear-gradient(135deg, #071E28 0%, #0F3545 100%)",
    includes: [
      "Hotel en el centro histórico (2 noches)",
      "City tour por la ciudad amurallada",
      "Paseo en chiva por el barrio Getsemanmí",
      "Día de playa en Islas del Rosario",
      "Desayunos incluidos",
      "Cena de bienvenida en restaurante local",
    ],
    highlights: [
      "Ciudad Amurallada (Patrimonio UNESCO)",
      "Islas del Rosario y playa privada",
      "Castillo San Felipe de Barajas",
      "Barrio Getsemanmí y arte callejero",
    ],
    itinerary: [
      {
        day: "Día 1",
        title: "Bienvenida a la Ciudad Heroica",
        desc: "Llegada, instalación, cena de bienvenida y primera caminata por las murallas al atardecer.",
      },
      {
        day: "Día 2",
        title: "Playas e Islas del Rosario",
        desc: "Embarcación desde el muelle hacia las islas, día de snorkel y relax en playa blanca, regreso al atardecer.",
      },
      {
        day: "Día 3",
        title: "Historia, arte y sabores",
        desc: "Tour por el casco histórico, visita a Getsemanmí, mercado de Bazurto con Luisito y chiva nocturna.",
      },
    ],
    dates: [
      {
        id: "ctg-may-26",
        dateRange: "22 – 24 de Mayo, 2026",
        spotsTotal: 14,
        spotsLeft: 8,
        price: "$520.000",
        priceNote: "por persona · todo incluido",
        status: "open",
      },
      {
        id: "ctg-jun-26",
        dateRange: "19 – 21 de Junio, 2026",
        spotsTotal: 14,
        spotsLeft: 14,
        price: "$520.000",
        priceNote: "por persona · todo incluido",
        status: "open",
      },
    ],
    meetingPoint: "Aeropuerto Rafael Núñez, Cartagena",
    gallery: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
    ],
  },
  {
    slug: "punta-cana",
    dest: "Punta Cana",
    country: "Rep. Dominicana",
    region: "Caribe · Punta Cana",
    heroSrc:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1400&q=80",
    tagline: "El Caribe más cristalino a precio de Colombia.",
    description:
      "Punta Cana es sinónimo de arena blanca, palmeras y aguas turquesa que parecen sacadas de un sueño. Un destino internacional al alcance del colombiano, con vuelos directos y una oferta turística que combina relax total con aventura caribeña. El primer viaje internacional del grupo Luisito El Viajero.",
    accent: "#5C6460",
    bg: "linear-gradient(135deg, #111613 0%, #1E2920 100%)",
    includes: [
      "Vuelo ida y vuelta desde Bogotá",
      "5 noches en hotel todo incluido",
      "Traslados aeropuerto-hotel",
      "Paseo en catamarán con snorkel",
      "Excursión a Isla Saona",
      "Seguro de viaje",
    ],
    highlights: [
      "Playa Bávaro",
      "Isla Saona en catamarán",
      "Parque Nacional del Este",
      "Altos de Chavón",
    ],
    itinerary: [
      {
        day: "Día 1-2",
        title: "Llegada y relax total",
        desc: "Vuelo, instalación en el hotel todo incluido, primer día de playa y bienvenida al Caribe.",
      },
      {
        day: "Día 3",
        title: "Catamarán e Isla Saona",
        desc: "Día completo en el mar: catamarán, snorkel, laguna natural y llegada a la paradísíaca Isla Saona.",
      },
      {
        day: "Día 4-5",
        title: "Aventura y cultura",
        desc: "Excursión a Altos de Chavón, paseo en quad por la playa y tarde libre para disfrutar el resort.",
      },
      {
        day: "Día 6",
        title: "Regreso",
        desc: "Último desayuno frente al mar, check-out y traslado al aeropuerto.",
      },
    ],
    dates: [
      {
        id: "puntacana-jun-26",
        dateRange: "12 – 17 de Junio, 2026",
        spotsTotal: 16,
        spotsLeft: 16,
        price: "$2.800.000",
        priceNote: "por persona · vuelo + hotel todo incluido",
        status: "soon",
      },
      {
        id: "puntacana-jul-26",
        dateRange: "10 – 15 de Julio, 2026",
        spotsTotal: 16,
        spotsLeft: 16,
        price: "$2.800.000",
        priceNote: "por persona · vuelo + hotel todo incluido",
        status: "soon",
      },
    ],
    meetingPoint: "Aeropuerto El Dorado, Bogotá — Terminal Internacional",
    gallery: [
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
      "https://images.unsplash.com/photo-1490750967868-88df5691cc27?w=800&q=80",
      "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&q=80",
    ],
  },
];

export function getTripBySlug(slug: string): Trip | undefined {
  return TRIPS.find((t) => t.slug === slug);
}
