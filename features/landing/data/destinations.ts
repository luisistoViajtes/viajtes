export interface DestinationPhoto {
  src: string;
  alt: string;
}

export interface DestinationReview {
  id: string;
  name: string;
  from: string;
  quote: string;
}

export interface Destination {
  slug: string;
  label: string;
  name: string;
  region: string;
  heroSrc: string;
  tagline: string;
  description: string;
  details: {
    duration: string;
    groupSize: string;
    season: string;
    difficulty: string;
  };
  highlights: string[];
  includes: string[];
  gallery: DestinationPhoto[];
  reviews: DestinationReview[];
  waMsg: string;
  waNextTrip: string;
  grid: {
    colSpan?: boolean;
    panSpan?: boolean;
    cardHeight: number;
  };
}

export const DESTINATIONS: Destination[] = [
  {
    slug: "caribe",
    label: "01",
    name: "Islas del Caribe",
    region: "Colombia",
    heroSrc: "/IMG_2942.jpg",
    tagline: "Aguas turquesas y cultura raizal en el corazón del Caribe colombiano.",
    description:
      "San Andrés y Providencia son dos de los destinos más increíbles de Colombia. Aguas cristalinas de 12 tonos de azul, arrecifes de coral vírgenes, y una cultura raizal única que no encontrarás en ningún otro lugar del mundo.\n\nCon Luisito recorremos la isla en grupo, con alojamiento seleccionado, transporte coordinado y las mejores experiencias locales. Desde el famoso Mar de los Siete Colores hasta los manglares de Old Point, cada momento es una postal.",
    details: {
      duration: "5–7 días",
      groupSize: "8–16 personas",
      season: "Todo el año",
      difficulty: "Fácil",
    },
    highlights: [
      "Mar de los Siete Colores en Providencia",
      "Snorkeling en arrecifes coralinos vírgenes",
      "Cultura y gastronomía raizal auténtica",
      "Atardeceres desde Jhonny Cay",
      "La Piscinita Natural y sus peces tropicales",
      "Paseos en catamarán al amanecer",
    ],
    includes: [
      "Tiquete aéreo coordinado",
      "Alojamiento seleccionado (4 noches)",
      "Traslados internos en lancha",
      "Guía local certificado",
      "Snorkel y equipo acuático",
      "Grupo privado con Luisito",
    ],
    gallery: [
      { src: "/IMG_2942.jpg", alt: "Islas del Caribe colombiano" },
      {
        src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
        alt: "Playa tropical Caribe",
      },
      {
        src: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",
        alt: "Snorkeling en arrecifes",
      },
      {
        src: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80",
        alt: "Atardecer caribeño",
      },
    ],
    reviews: [
      {
        id: "r1",
        name: "Valentina López",
        from: "Bogotá",
        quote:
          "San Andrés en grupo con Luisito es completamente diferente. Todo organizado, sin estrés, y con la mejor energía del grupo.",
      },
      {
        id: "r2",
        name: "Sebastián Gómez",
        from: "Medellín",
        quote:
          "Providencia me quitó el aliento. Las aguas son de otro planeta. No hubiera ido solo, gracias Luisito.",
      },
      {
        id: "r3",
        name: "Mariana Ríos",
        from: "Cali",
        quote:
          "El Mar de los Siete Colores es real. Mejor foto de mi vida. El viaje superó todas las expectativas.",
      },
    ],
    waMsg: "Hola Luisito, me interesa el viaje a las Islas del Caribe colombiano",
    waNextTrip:
      "Hola Luisito, ¿cuándo es el próximo viaje a las Islas del Caribe? Me interesa inscribirme",
    grid: { colSpan: true, cardHeight: 520 },
  },
  {
    slug: "minca",
    label: "02",
    name: "Minca",
    region: "Sierra Nevada de Santa Marta",
    heroSrc: "/Donde-queda-Minca-en-Santa-Marta 2.jpg",
    tagline: "Selva tropical, cascadas y pueblos indígenas a 45 minutos del mar.",
    description:
      "Minca es uno de esos lugares que cambia tu perspectiva. A tan solo 45 minutos de Santa Marta, el mundo cambia completamente: de la playa y el calor del Caribe a la frescura de la selva tropical de la Sierra Nevada.\n\nCon Luisito exploramos cascadas secretas, cafetales tradicionales, y llegamos a comunidades indígenas que han habitado estas montañas por siglos. Es un viaje corto pero profundo, perfecto para reconectar.",
    details: {
      duration: "2–3 días",
      groupSize: "6–14 personas",
      season: "Todo el año",
      difficulty: "Moderado",
    },
    highlights: [
      "Cascadas Pozo Azul y Los Pinos",
      "Recorrido por cafetales artesanales",
      "Observación de aves endémicas",
      "Amanecer sobre las nubes desde la Sierra",
      "Comunidades indígenas Arhuacas",
      "Hamacas y río en la tarde",
    ],
    includes: [
      "Transporte desde Santa Marta",
      "Alojamiento en ecohotel (2 noches)",
      "Todas las comidas incluidas",
      "Guía experto en flora y fauna",
      "Entrada a cascadas",
      "Grupo pequeño con Luisito",
    ],
    gallery: [
      {
        src: "/Donde-queda-Minca-en-Santa-Marta 2.jpg",
        alt: "Minca Sierra Nevada",
      },
      {
        src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80",
        alt: "Selva tropical Sierra Nevada",
      },
      {
        src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
        alt: "Montañas al amanecer",
      },
      {
        src: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&q=80",
        alt: "Sendero tropical",
      },
    ],
    reviews: [
      {
        id: "r1",
        name: "Ana García",
        from: "Bogotá",
        quote:
          "Fue la experiencia más increíble de mi vida. Luisito conoce cada rincón de la Sierra con una profundidad que no encontrarás en ninguna agencia.",
      },
      {
        id: "r2",
        name: "Miguel Torres",
        from: "Medellín",
        quote:
          "Los 3 días en Minca se pasaron volando. La energía del grupo fue perfecta. Volveré sin duda.",
      },
      {
        id: "r3",
        name: "Camila Herrera",
        from: "Barranquilla",
        quote:
          "Ver el amanecer sobre las nubes desde lo alto de la Sierra fue algo que no tenía palabras para describir.",
      },
    ],
    waMsg: "Hola Luisito, me interesa el viaje a Minca y la Sierra Nevada",
    waNextTrip:
      "Hola Luisito, ¿cuándo es el próximo viaje a Minca? Me interesa inscribirme",
    grid: { cardHeight: 520 },
  },
  {
    slug: "guajira",
    label: "03",
    name: "La Guajira",
    region: "Colombia",
    heroSrc: "/IMG_2941.jpg",
    tagline: "El desierto más hermoso de Colombia: dunas, flamencos y el fin del mundo.",
    description:
      "La Guajira es el extremo norte de Suramérica, donde el desierto se encuentra con el mar Caribe. Un paisaje lunar de dunas rosadas, flamencos en lagunas saladas, y el pueblo Wayuu con su cultura milenaria.\n\nLlegar a Punta Gallinas, el punto más septentrional de Suramérica, es una experiencia que muy pocos colombianos han tenido. Con Luisito lo hacemos en grupo, con todo el logístico resuelto, para que solo te preocupes de disfrutarlo.",
    details: {
      duration: "3–4 días",
      groupSize: "8–12 personas",
      season: "Noviembre – Abril",
      difficulty: "Aventurero",
    },
    highlights: [
      "Punta Gallinas: el extremo norte de Suramérica",
      "Dunas de Taroa frente al mar Caribe",
      "Flamencos rosados en la laguna de Muyuy",
      "Cultura y artesanías del pueblo Wayuu",
      "Cabo de la Vela al atardecer",
      "Amanecer en el desierto sin luz artificial",
    ],
    includes: [
      "Transporte en 4×4 todo terreno",
      "Alojamiento en rancherías Wayuu",
      "Todas las comidas típicas incluidas",
      "Guía especializado en La Alta Guajira",
      "Permisos de ingreso",
      "Grupo privado con Luisito",
    ],
    gallery: [
      { src: "/IMG_2941.jpg", alt: "La Guajira Colombia" },
      {
        src: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=800&q=80",
        alt: "Dunas del desierto",
      },
      {
        src: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=800&q=80",
        alt: "Atardecer en La Guajira",
      },
      {
        src: "https://images.unsplash.com/photo-1414609245224-aea10f43c0ea?w=800&q=80",
        alt: "Cielo estrellado desierto",
      },
    ],
    reviews: [
      {
        id: "r1",
        name: "Laura Martínez",
        from: "Cali",
        quote:
          "Llegamos al amanecer a Punta Gallinas y no podía creer que Colombia tuviera ese lugar. El fin del mundo más hermoso que existe.",
      },
      {
        id: "r2",
        name: "Carlos Rodríguez",
        from: "Barranquilla",
        quote:
          "La comunidad Wayuu, el desierto, el mar... todo en un viaje de 4 días. Imposible describirlo, hay que vivirlo.",
      },
      {
        id: "r3",
        name: "Isabela Mora",
        from: "Bogotá",
        quote:
          "Luisito transformó un viaje que parecía difícil de organizar en algo completamente fluido. Llegamos al punto más norte de Suramérica.",
      },
    ],
    waMsg: "Hola Luisito, me interesa el viaje a La Guajira",
    waNextTrip:
      "Hola Luisito, ¿cuándo es el próximo viaje a La Guajira? Me interesa inscribirme",
    grid: { cardHeight: 320 },
  },
  {
    slug: "ballenas",
    label: "04",
    name: "Avistamiento de Ballenas",
    region: "Pacífico colombiano",
    heroSrc: "/IMG_2943.jpg",
    tagline: "Las jorobadas migran al Pacífico colombiano entre julio y octubre.",
    description:
      "Cada año, entre julio y octubre, las ballenas jorobadas recorren miles de kilómetros desde la Antártida hasta las cálidas aguas del Pacífico colombiano para dar a luz y aparearse. Presenciar esto desde un bote pequeño es una de las experiencias más poderosas que existen.\n\nDesde Nuquí o Bahía Solano recorremos las aguas del Pacífico, visitamos playas vírgenes, comunidades afrocolombianas, y nos encontramos cara a cara con las crías y sus madres.",
    details: {
      duration: "3–4 días",
      groupSize: "6–12 personas",
      season: "Julio – Octubre",
      difficulty: "Moderado",
    },
    highlights: [
      "Avistamiento de ballenas jorobadas garantizado",
      "Crías y sus madres en aguas calmadas del Pacífico",
      "Playas vírgenes de arena oscura",
      "Comunidades afrocolombianas del Chocó",
      "Cascadas selváticas hasta el mar",
      "Pesca artesanal y gastronomía pacífica",
    ],
    includes: [
      "Vuelo a Nuquí o Bahía Solano",
      "Alojamiento en lodge frente al mar (3 noches)",
      "Todas las comidas incluidas",
      "Tour de avistamiento en lancha",
      "Guía biólogo marino",
      "Grupo exclusivo con Luisito",
    ],
    gallery: [
      { src: "/IMG_2943.jpg", alt: "Pacífico colombiano" },
      {
        src: "https://images.unsplash.com/photo-1505459668311-8dfac7952bf0?w=800&q=80",
        alt: "Océano Pacífico",
      },
      {
        src: "https://images.unsplash.com/photo-1559494007-9f5847c49d94?w=800&q=80",
        alt: "Aguas del Pacífico",
      },
      {
        src: "https://images.unsplash.com/photo-1493558103817-58b2924bce98?w=800&q=80",
        alt: "Playa virgen Pacífico",
      },
    ],
    reviews: [
      {
        id: "r1",
        name: "Camila Pérez",
        from: "Bogotá",
        quote:
          "Ver las ballenas jorobadas desde tan cerca es uno de esos momentos que te cambian la vida. No hay palabras para describirlo.",
      },
      {
        id: "r2",
        name: "Diego Fuentes",
        from: "Medellín",
        quote:
          "Pensé que había viajado mucho, pero el Pacífico con Luisito me mostró otra Colombia. Nunca había sentido algo así.",
      },
      {
        id: "r3",
        name: "Natalia Vargas",
        from: "Cali",
        quote:
          "Una cría de ballena emergió a 5 metros del bote. Me puse a llorar. Gracias Luisito por hacer posible este viaje.",
      },
    ],
    waMsg: "Hola Luisito, me interesa el avistamiento de ballenas",
    waNextTrip:
      "Hola Luisito, ¿cuándo es el próximo viaje de avistamiento de ballenas? Me interesa inscribirme",
    grid: { cardHeight: 320 },
  },
  {
    slug: "punta-cana",
    label: "05",
    name: "Punta Cana",
    region: "República Dominicana",
    heroSrc:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1400&q=80",
    tagline: "Playas de arena blanca y Caribe todo incluido con la mejor energía grupal.",
    description:
      "Punta Cana es el destino de playa más visitado del Caribe internacional y con razón: kilómetros de arena blanca, aguas que varían del verde esmeralda al azul profundo, y una infraestructura hotelera de clase mundial.\n\nCon Luisito organizamos el viaje en grupo con todo incluido, excursiones a Isla Saona, los mejores beach clubs, y la mejor energía grupal. Sin preocupaciones, solo disfrute.",
    details: {
      duration: "5–7 días",
      groupSize: "10–20 personas",
      season: "Todo el año",
      difficulty: "Fácil",
    },
    highlights: [
      "Isla Saona con playa de arena blanca infinita",
      "Beach clubs exclusivos de Bávaro",
      "Catamaran al atardecer entre islas",
      "Excursión a Scape Park y cenotes",
      "Todo incluido en resort seleccionado",
      "Energía grupal inigualable con Luisito",
    ],
    includes: [
      "Tiquete aéreo coordinado",
      "Resort todo incluido (5–6 noches)",
      "Traslados aeropuerto–hotel",
      "Excursión a Isla Saona",
      "Tour en catamarán",
      "Acompañamiento de Luisito",
    ],
    gallery: [
      {
        src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
        alt: "Playa de Punta Cana",
      },
      {
        src: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80",
        alt: "Aguas cristalinas Caribe",
      },
      {
        src: "https://images.unsplash.com/photo-1548574505-5e239809ee19?w=800&q=80",
        alt: "Turquoise Caribbean water",
      },
      {
        src: "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800&q=80",
        alt: "Playa tropical palmeras",
      },
    ],
    reviews: [
      {
        id: "r1",
        name: "Jorge Vargas",
        from: "Bogotá",
        quote:
          "Todo incluido con la mejor energía grupal. Luisito hace que cualquier destino internacional sea especial y sin complicaciones.",
      },
      {
        id: "r2",
        name: "Paola Estrada",
        from: "Medellín",
        quote:
          "Nunca había ido a Punta Cana. La Isla Saona parecía sacada de un cuento. Lo volvería a hacer el próximo año.",
      },
      {
        id: "r3",
        name: "Felipe Castillo",
        from: "Cali",
        quote:
          "20 personas en el mismo resort, todos amigos al final del viaje. Eso es lo que hace Luisito: comunidad real.",
      },
    ],
    waMsg: "Hola Luisito, me interesa el viaje a Punta Cana",
    waNextTrip:
      "Hola Luisito, ¿cuándo es el próximo viaje a Punta Cana? Me interesa inscribirme",
    grid: { cardHeight: 320 },
  },
  {
    slug: "internacional",
    label: "06",
    name: "Tours Internacionales",
    region: "El mundo",
    heroSrc:
      "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1400&q=80",
    tagline: "Destinos cuidadosamente curados alrededor del mundo con experiencias únicas.",
    description:
      "Más allá del Caribe, Luisito lleva grupos a destinos cuidadosamente seleccionados en todo el mundo. Desde los mercados de Marrakech hasta las calles de Tokio, desde los paisajes de Patagonia hasta las ciudades medievales de Europa.\n\nCada tour internacional es diseñado para maximizar la experiencia cultural, la fotografía y los momentos únicos que solo se consiguen viajando en grupo con alguien que ya conoce el destino.",
    details: {
      duration: "7–15 días",
      groupSize: "8–16 personas",
      season: "Varía por destino",
      difficulty: "Moderado",
    },
    highlights: [
      "Itinerarios curados por destino",
      "Hoteles boutique y experiencias locales",
      "Fotografía y contenido del viaje incluidos",
      "Gastronomía local auténtica",
      "Guías locales en cada ciudad",
      "Comunidad viajera de alto nivel",
    ],
    includes: [
      "Coordinación completa del viaje",
      "Alojamiento seleccionado",
      "Traslados internos",
      "Entradas a atracciones principales",
      "Seguro de viaje internacional",
      "Grupo privado con Luisito",
    ],
    gallery: [
      {
        src: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80",
        alt: "Vuelo internacional",
      },
      {
        src: "https://images.unsplash.com/photo-1488085061387-422e29b40080?w=800&q=80",
        alt: "Aventura internacional",
      },
      {
        src: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&q=80",
        alt: "Paisajes del mundo",
      },
      {
        src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
        alt: "Montañas internacionales",
      },
    ],
    reviews: [
      {
        id: "r1",
        name: "Diana Castro",
        from: "Bogotá",
        quote:
          "Hicimos un tour a Europa con Luisito y cada detalle estaba perfectamente pensado. La experiencia de viaje sin el estrés de organizar.",
      },
      {
        id: "r2",
        name: "Andrés Lozano",
        from: "Medellín",
        quote:
          "Fui a Marruecos con un grupo de desconocidos y volví con amigos de por vida. Luisito crea experiencias que trascienden el destino.",
      },
      {
        id: "r3",
        name: "Sofía Mendoza",
        from: "Cali",
        quote:
          "El nivel de curaduría de cada experiencia en el tour internacional fue impresionante. No es turismo, es vivir el destino.",
      },
    ],
    waMsg: "Hola Luisito, me interesa conocer los tours internacionales",
    waNextTrip:
      "Hola Luisito, ¿qué tours internacionales tienes próximamente? Me interesa unirme",
    grid: { panSpan: true, cardHeight: 210 },
  },
];

export function getDestinationBySlug(slug: string): Destination | undefined {
  return DESTINATIONS.find((d) => d.slug === slug);
}
