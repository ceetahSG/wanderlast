"use client"

import Image from "next/image"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

import manPortrait from "@/assets/person1.png"
import womanPortrait from "@/assets/person2.png"

const testimonials = [
  {
    quote:
      "The Bali trip was absolutely magical! Every detail was perfectly planned. The resorts were luxurious and the cultural experiences were unforgettable.",
    name: "Michael Chen",
    location: "Singapore",
    image: manPortrait,
  },
  {
    quote:
      "Swiss Alps adventure exceeded all expectations! The mountain views were breathtaking and our guide was incredibly knowledgeable. Highly recommend!",
    name: "Sarah Johnson",
    location: "New York, USA",
    image: womanPortrait,
  },
  {
    quote:
      "From the desert camps outside Marrakech to the bustling souks, every moment felt curated just for us. We are already planning to book again next year!",
    name: "David Okafor",
    location: "London, UK",
    image: manPortrait,
  },
  {
    quote:
      "Santorini at sunset was even more beautiful than the photos. The private boat tour and our local guides made this the best vacation we have ever taken!",
    name: "Emily Carter",
    location: "Sydney, Australia",
    image: womanPortrait,
  },
]

export function Testimonials() {
  return (
    <section className="px-6 py-20 lg:py-28">
      <div className="mx-auto max-w-[1600px]">
        <Carousel opts={{ align: "start" }}>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <h2 className="text-4xl font-light tracking-tight sm:text-5xl">
                What Travelers Say
              </h2>
              <p className="mt-3 text-sm text-neutral-600 sm:text-base">
                Real experiences from our happy travelers
              </p>
            </div>

            <div className="flex items-center gap-3">
              <CarouselPrevious className="static size-9" />
              <CarouselNext className="static size-9" />
            </div>
          </div>

          <CarouselContent className="mt-10 gap-6">
            {testimonials.map((testimonial) => (
              <CarouselItem
                key={testimonial.name}
                className="basis-full md:basis-[calc(50%_-_12px)]"
              >
                <figure className="flex h-full min-h-[19rem] overflow-hidden rounded-lg border border-border bg-card">
                  <div className="flex flex-1 flex-col justify-between gap-8 p-5 sm:p-6">
                    <blockquote className="text-base leading-[1.55] capitalize text-foreground">
                      &ldquo;{testimonial.quote}&rdquo;
                    </blockquote>

                    <figcaption className="text-sm">
                      <span className="text-brand">
                        &mdash; {testimonial.name}
                      </span>
                      <span className="mt-1.5 block text-xs text-muted-foreground">
                        {testimonial.location}
                      </span>
                    </figcaption>
                  </div>

                  <div className="flex w-[42%] shrink-0 flex-col py-2 pr-2 pl-1 sm:py-2.5 sm:pr-2.5">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      sizes="(max-width: 768px) 42vw, 25vw"
                      className="min-h-0 w-full flex-1 rounded-md object-cover"
                    />
                  </div>
                </figure>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  )
}
