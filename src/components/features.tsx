import { Headphones, Map, ShieldCheck } from "lucide-react";

const features = [
  {
    icon: ShieldCheck,
    title: "Safe & Secure",
    description:
      "Your safety is our priority with comprehensive travel insurance and 24/7 support.",
  },
  {
    icon: Map,
    title: "Expert Guides",
    description:
      "Local experts who bring destinations to life with authentic cultural insights.",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description:
      "Round-the-clock customer service to assist you wherever your journey takes you.",
  },
];

export function Features() {
  return (
    <section className="bg-brand/10 px-6 py-20 lg:py-28">
      <div className="mx-auto max-w-[1600px]">
        <h2 className="text-center text-4xl font-light tracking-tight sm:text-5xl">
          Why Choose Wanderlast
        </h2>
        <p className="mt-3 text-center text-sm text-neutral-600 sm:text-base">
          Your trusted partner for exceptional travel experiences
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {features.map((feature) => (
            <div key={feature.title} className="rounded-lg bg-white p-8">
              <feature.icon className="size-9 text-brand" strokeWidth={2} />
              <h3 className="mt-6 text-xl">{feature.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-neutral-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
