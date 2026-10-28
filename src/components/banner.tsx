import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import banner from "@/assets/Banner.png";

const searchFields = [
  { label: "Location", value: "Address, City Or Zip" },
  { label: "Date/Duration", value: "Anytime/3 Days" },
  { label: "Budget", value: "$0-$3000" },
  { label: "People", value: "5-10" },
];

export function Banner() {
  return (
    <section className="relative isolate flex min-h-[calc(100svh-4rem)] flex-col overflow-hidden lg:min-h-[calc(100svh-4.5rem)]">
      <Image
        src={banner}
        alt="Coastal village surrounded by forest"
        fill
        priority
        sizes="100vw"
        className="-z-20 object-cover"
      />
      <div className="-z-10 absolute inset-0 bg-black/35" />

      <div className="flex flex-1 flex-col items-center justify-center px-6 py-16 text-center text-white sm:py-20">
        <h1 className="max-w-4xl text-5xl leading-[1.05] font-light tracking-tight sm:text-6xl lg:text-7xl xl:text-8xl">
          Discover Your
          <br />
          Next Adventure
        </h1>
        <p className="mt-6 max-w-xl text-base text-white/85 sm:text-lg">
          Explore breathtaking destinations and create unforgettable memories
          with our curated travel experiences.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/destinations"
            className="inline-flex h-13 items-center gap-3 bg-brand px-7 text-sm font-semibold tracking-wide text-brand-foreground uppercase transition-colors hover:bg-brand/90"
          >
            Explore Now
            <ArrowRight className="size-4" />
          </Link>
          <Link
            href="/destinations"
            className="inline-flex h-13 items-center bg-white/20 px-7 text-sm font-semibold tracking-wide text-white uppercase backdrop-blur-sm transition-colors hover:bg-white/30"
          >
            View Destination
          </Link>
        </div>
      </div>

      <div className="relative grid grid-cols-1 border-t border-white/20 bg-white/20 backdrop-blur-md sm:grid-cols-2 lg:grid-cols-[repeat(4,1fr)_auto]">
        {searchFields.map((field) => (
          <div
            key={field.label}
            className="border-b border-white/20 px-6 py-5 sm:border-r lg:border-b-0"
          >
            <p className="text-sm font-semibold text-white">{field.label}</p>
            <p className="mt-0.5 text-xs text-white/70">{field.value}</p>
          </div>
        ))}
        <button
          type="button"
          className="col-span-full min-h-20 bg-brand px-12 text-sm font-semibold text-brand-foreground transition-colors hover:bg-brand/90 sm:col-span-2 lg:col-span-1"
        >
          Search
        </button>
      </div>
    </section>
  );
}
