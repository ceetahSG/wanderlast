import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  CalendarDays,
  Check,
  MapPin,
  Star,
  Trash2,
} from "lucide-react";

import { BookingCard } from "@/components/destinations/booking-card";
import { Button } from "@/components/ui/button";
import { getDestination } from "@/lib/destinations";
import EditDestinationDialog from "@/components/EditDestinationDialog";
import { redirect } from "next/navigation";
import Delete from "@/components/Delete";

export default async function DestinationDetailsPage({
  params,
}: PageProps<"/destinations/[id]">) {
  const { id } = await params;
  const destination = await getDestination(id);

  return (
    <main className="mx-auto w-full max-w-[1600px] px-6 py-8 lg:px-10 lg:py-10">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Link
          href="/destinations"
          className="inline-flex items-center gap-2 text-sm text-neutral-600 transition-colors hover:text-brand"
        >
          <ArrowLeft className="size-4" strokeWidth={1.75} />
          Back to Destinations
        </Link>

        <div className="flex items-center gap-3">
          <EditDestinationDialog destination={{ ...destination, id }} />
          <Delete id={id} />
        </div>
      </div>

      <div className="relative mt-6 aspect-21/9 overflow-hidden rounded-lg bg-muted">
        <Image
          src={destination.imageUrl}
          alt={destination.destinationName}
          fill
          priority
          sizes="(min-width: 1600px) 1520px, 100vw"
          className="object-cover"
        />
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_320px] lg:gap-12">
        <div>
          <p className="flex items-center gap-1.5 text-sm text-neutral-500">
            <MapPin className="size-4" strokeWidth={1.75} />
            {destination.country}
          </p>

          <h1 className="mt-2 text-4xl font-light tracking-tight sm:text-5xl">
            {destination.destinationName}
          </h1>

          <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm font-medium">
            {destination.rating !== undefined && (
              <span className="flex items-center gap-1.5">
                <Star className="size-4 fill-emerald-600 text-emerald-600" />
                {destination.rating.toFixed(1)}
                {destination.reviews !== undefined && (
                  <span className="font-normal text-neutral-500">
                    ({destination.reviews} reviews)
                  </span>
                )}
              </span>
            )}
            <span className="flex items-center gap-1.5">
              <CalendarDays
                className="size-4 text-neutral-500"
                strokeWidth={1.75}
              />
              {destination.duration}
            </span>
          </div>

          <section className="mt-10">
            <h2 className="text-2xl font-light tracking-tight">Overview</h2>
            <p className="mt-3 text-sm leading-relaxed text-neutral-600 sm:text-base">
              {destination.description}
            </p>
          </section>

          {destination.highlights && destination.highlights.length > 0 && (
            <section className="mt-10">
              <h2 className="text-2xl font-light tracking-tight">Highlights</h2>
              <p className="mt-3 text-sm leading-relaxed text-neutral-600 sm:text-base">
                {destination.description}
              </p>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {destination.highlights.map((highlight) => (
                  <li
                    key={highlight}
                    className="flex items-center gap-2.5 text-sm text-neutral-600"
                  >
                    <Check
                      className="size-4 shrink-0 text-emerald-600"
                      strokeWidth={2.5}
                    />
                    {highlight}
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>

        <div className="lg:sticky lg:top-24 lg:h-fit">
          <BookingCard destination={destination} />
        </div>
      </div>
    </main>
  );
}
