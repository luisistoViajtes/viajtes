import { notFound } from "next/navigation";
import { Metadata } from "next";
import { TRIPS, getTripBySlug } from "@/features/landing/data/trips";
import TripDetail from "@/features/landing/components/TripDetail";

export function generateStaticParams() {
  return TRIPS.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const trip = getTripBySlug(slug);
  if (!trip) return {};
  return {
    title: `${trip.dest} con Luisito — Próximos viajes`,
    description: trip.tagline,
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const trip = getTripBySlug(slug);
  if (!trip) notFound();
  return <TripDetail trip={trip} />;
}
