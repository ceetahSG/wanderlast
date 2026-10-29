import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, CalendarDays, MapPin } from "lucide-react";
import { format } from "date-fns";

import type { Destination } from "@/lib/destinations";

function formatDepartureDate(isoDate: string) {
  const [year, month, day] = isoDate.split("-").map(Number);
  if (!year || !month || !day) return isoDate;
  return format(new Date(year, month - 1, day), "MMM d, yyyy");
}

export function DestinationCard({ destination }: { destination: Destination }) {
  return (
    <article className="group flex flex-col">
      <div className="relative aspect-5/3 overflow-hidden rounded-lg bg-muted">
        <Image
          src={destination.imageUrl}
          alt={destination.destinationName}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute top-3 right-3 rounded-md bg-white/95 px-2.5 py-1 text-xs font-semibold text-neutral-800 shadow-sm backdrop-blur-sm">
          {destination.category}
        </span>
      </div>

      <div className="mt-4 flex items-center gap-1.5 text-sm text-neutral-500">
        <MapPin className="size-4" strokeWidth={1.75} />
        {destination.country}
      </div>

      <div className="mt-1.5 flex items-baseline justify-between gap-3">
        <h3 className="text-lg font-medium">{destination.destinationName}</h3>
        <p className="whitespace-nowrap text-lg font-semibold">
          ${destination.price.toLocaleString("en-US")}
          <span className="text-xs font-normal text-neutral-500">/Person</span>
        </p>
      </div>

      <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-neutral-500">
        <span className="flex items-center gap-1.5">
          <CalendarDays className="size-4" strokeWidth={1.75} />
          {destination.duration}
        </span>
        <span>Departs {formatDepartureDate(destination.departureDate)}</span>
      </div>

      <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-neutral-600">
        {destination.description}
      </p>

      <Link
        href={`/destinations/${destination._id}`}
        className="mt-3 inline-flex w-fit items-center gap-1 text-sm font-semibold tracking-wide text-brand uppercase transition-colors hover:text-brand/80"
      >
        Book Now
        <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </Link>
    </article>
  );
}
