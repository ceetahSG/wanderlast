import { DestinationsExplorer } from "@/components/destinations/destinations-explorer";
import { getDestinations } from "@/lib/destinations";

export default async function DestinationsPage() {
  const destinations = await getDestinations();

  return (
    <main className="mx-auto w-full max-w-[1600px] px-6 py-12 lg:px-10 lg:py-16">
      <h1 className="text-4xl font-light tracking-tight sm:text-5xl">
        Explore All Destinations
      </h1>
      <p className="mt-3 text-sm text-neutral-600 sm:text-base">
        Find your perfect travel experience from our curated collection
      </p>

      <DestinationsExplorer destinations={destinations} />
    </main>
  );
}
