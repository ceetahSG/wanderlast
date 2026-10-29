import { Skeleton } from "@/components/ui/skeleton";

export default function DestinationsLoading() {
  return (
    <main className="mx-auto w-full max-w-[1600px] px-6 py-12 lg:px-10 lg:py-16">
      <Skeleton className="h-12 w-2/3 max-w-lg" />
      <Skeleton className="mt-4 h-5 w-1/2 max-w-md" />

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {["category", "price", "sort"].map((filter) => (
          <Skeleton key={filter} className="h-11 rounded-md" />
        ))}
      </div>

      <Skeleton className="mt-4 h-5 w-40" />

      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-6 lg:gap-y-10">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i}>
            <Skeleton className="aspect-5/3 rounded-lg" />
            <Skeleton className="mt-4 h-4 w-24" />
            <div className="mt-2 flex items-center justify-between">
              <Skeleton className="h-6 w-40" />
              <Skeleton className="h-6 w-20" />
            </div>
            <Skeleton className="mt-2 h-4 w-32" />
            <Skeleton className="mt-2 h-4 w-full" />
            <Skeleton className="mt-1.5 h-4 w-2/3" />
            <Skeleton className="mt-3 h-4 w-28" />
          </div>
        ))}
      </div>
    </main>
  );
}
