export type ServiceSlug =
  | "recorridos-360"
  | "contenido-viral"
  | "ia-automatizacion"
  | "paginas-web"
  | "viajes"
  | "pauta";

export interface Service {
  slug: ServiceSlug;
  title: string;
  description: string;
  cta: string;
  icon: string;
  waMessage: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
}

export interface Stat {
  value: string;
  label: string;
}

export interface BrandLogo {
  name: string;
  category: string;
}

export interface LeadFormData {
  name: string;
  whatsapp: string;
  email: string;
  business: string;
  service: ServiceSlug | "";
  message: string;
}

export interface LeadFormState {
  status: "idle" | "submitting" | "success" | "error";
  errorMessage?: string;
}

export interface HeaderProps {
  isScrolled: boolean;
  onContactClick: () => void;
}

export interface HeroSectionProps {
  onServicesClick: () => void;
}

export interface ServicesGridProps {
  onServiceSelect: (slug: ServiceSlug) => void;
}

export interface PautaSectionProps {
  onContactClick: () => void;
}

export interface LeadFormProps {
  selectedService: ServiceSlug | "";
  onServiceChange: (slug: ServiceSlug | "") => void;
}
