import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import cta from "@/assets/CTA.png";

export function Cta() {
  return (
    <section className="relative isolate flex min-h-96 items-center justify-center overflow-hidden px-6 py-20 text-center text-white">
      <Image
        src={cta}
        alt="Airplane flying over a tropical island"
        fill
        sizes="100vw"
        className="-z-20 object-cover"
      />
      <div className="-z-10 absolute inset-0 bg-black/45" />

      <div className="flex flex-col items-center">
        <h2 className="text-4xl leading-tight font-light tracking-tight sm:text-5xl">
          Ready To Start Your Journey?
        </h2>
        <p className="mt-4 max-w-xl text-sm text-white/80 sm:text-base">
          Join thousands of travelers who have discovered the world with us
        </p>
        <Link
          href="/destinations"
          className="mt-8 inline-flex h-12 items-center gap-3 bg-white px-8 text-xs font-semibold tracking-wide text-black uppercase transition-colors hover:bg-white/90"
        >
          Book Your Trip Today
          <ArrowRight className="size-4" />
        </Link>
      </div>
    </section>
  );
}
