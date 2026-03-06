import { notFound } from "next/navigation";
import { Metadata } from "next";
import { DESTINATIONS, getDestinationBySlug } from "@/features/landing/data/destinations";
import DestinationDetail from "@/features/landing/components/DestinationDetail";

export function generateStaticParams() {
  return DESTINATIONS.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const destination = getDestinationBySlug(slug);
  if (!destination) return {};
  return {
    title: `${destination.name} — Luisito El Viajero`,
    description: destination.tagline,
  };
}

export default async function DestinationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const destination = getDestinationBySlug(slug);
  if (!destination) notFound();
  return <DestinationDetail destination={destination} />;
}
