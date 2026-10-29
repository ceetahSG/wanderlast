"use client";
import { useMemo, useState } from "react";

import { DestinationCard } from "@/components/destinations/destination-card";
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";
import type { Destination } from "@/lib/destinations";

type SortOption = "featured" | "price-asc" | "price-desc" | "name" | "date";

const priceRanges = [
  { label: "Any Price", min: 0, max: Number.POSITIVE_INFINITY },
  { label: "Under $1,000", min: 0, max: 1000 },
  { label: "$1,000 - $2,000", min: 1000, max: 2000 },
  { label: "$2,000 - $3,000", min: 2000, max: 3000 },
  { label: "$3,000+", min: 3000, max: Number.POSITIVE_INFINITY },
];

const sortLabels: Record<SortOption, string> = {
  featured: "Featured",
  "price-asc": "Price: Low to High",
  "price-desc": "Price: High to Low",
  name: "Name: A - Z",
  date: "Departure Date",
};

export function DestinationsExplorer({
  destinations,
}: {
  destinations: Destination[];
}) {
  const [category, setCategory] = useState("all");
  const [priceRange, setPriceRange] = useState("any");
  const [sort, setSort] = useState<SortOption>("featured");

  const categories = useMemo(
    () => [...new Set(destinations.map((d) => d.category))].sort(),
    [destinations]
  );

  const filtered = useMemo(() => {
    const range =
      priceRanges.find((_, i) => String(i) === priceRange) ?? priceRanges[0];

    const result = destinations.filter(
      (d) =>
        (category === "all" || d.category === category) &&
        d.price >= range.min &&
        d.price < range.max
    );

    switch (sort) {
      case "price-asc":
        return [...result].sort((a, b) => a.price - b.price);
      case "price-desc":
        return [...result].sort((a, b) => b.price - a.price);
      case "name":
        return [...result].sort((a, b) =>
          a.destinationName.localeCompare(b.destinationName)
        );
      case "date":
        return [...result].sort((a, b) =>
          a.departureDate.localeCompare(b.departureDate)
        );
      default:
        return result;
    }
  }, [destinations, category, priceRange, sort]);

  return (
    <div>
      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <NativeSelect
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          aria-label="Filter by category"
          className="w-full [&_select]:h-11 [&_select]:rounded-md [&_select]:uppercase"
        >
          <NativeSelectOption value="all">All Categories</NativeSelectOption>
          {categories.map((c) => (
            <NativeSelectOption key={c} value={c}>
              {c}
            </NativeSelectOption>
          ))}
        </NativeSelect>

        <NativeSelect
          value={priceRange}
          onChange={(e) => setPriceRange(e.target.value)}
          aria-label="Filter by price range"
          className="w-full [&_select]:h-11 [&_select]:rounded-md [&_select]:uppercase"
        >
          {priceRanges.map((range, i) => (
            <NativeSelectOption key={range.label} value={String(i)}>
              {range.label}
            </NativeSelectOption>
          ))}
        </NativeSelect>

        <NativeSelect
          value={sort}
          onChange={(e) => setSort(e.target.value as SortOption)}
          aria-label="Sort destinations"
          className="w-full [&_select]:h-11 [&_select]:rounded-md [&_select]:uppercase"
        >
          {(Object.keys(sortLabels) as SortOption[]).map((option) => (
            <NativeSelectOption key={option} value={option}>
              {sortLabels[option]}
            </NativeSelectOption>
          ))}
        </NativeSelect>
      </div>

      <p className="mt-4 text-sm text-neutral-600">
        Showing {filtered.length} destination{filtered.length === 1 ? "" : "s"}
      </p>

      {filtered.length === 0 ? (
        <div className="mt-12 rounded-lg border border-dashed p-12 text-center">
          <p className="text-neutral-600">
            No destinations match your filters.
          </p>
        </div>
      ) : (
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-6 lg:gap-y-10">
          {filtered.map((destination) => (
            <DestinationCard key={destination._id} destination={destination} />
          ))}
        </div>
      )}
    </div>
  );
}
