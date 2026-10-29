import { Skeleton } from "@/components/ui/skeleton";

export default function DestinationDetailsLoading() {
  return (
    <main className="mx-auto w-full max-w-[1600px] px-6 py-8 lg:px-10 lg:py-10">
      <div className="flex items-center justify-between">
        <Skeleton className="h-5 w-40" />
        <div className="flex gap-3">
          <Skeleton className="h-9 w-24" />
          <Skeleton className="h-9 w-24" />
        </div>
      </div>

      <Skeleton className="mt-6 aspect-21/9 rounded-lg" />

      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_320px] lg:gap-12">
        <div>
          <Skeleton className="h-4 w-28" />
          <Skeleton className="mt-3 h-12 w-72" />
          <Skeleton className="mt-4 h-5 w-52" />

          <Skeleton className="mt-10 h-7 w-32" />
          <Skeleton className="mt-4 h-4 w-full" />
          <Skeleton className="mt-2 h-4 w-5/6" />
          <Skeleton className="mt-2 h-4 w-2/3" />

          <Skeleton className="mt-10 h-7 w-36" />
          <Skeleton className="mt-4 h-4 w-full" />
          <Skeleton className="mt-2 h-4 w-4/5" />
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-4 w-48" />
            ))}
          </div>
        </div>

        <div className="rounded-lg border p-6">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="mt-2 h-10 w-32" />
          <Skeleton className="mt-2 h-4 w-20" />
          <Skeleton className="mt-5 h-11 w-full" />
          <Skeleton className="mt-4 h-11 w-full" />
          <Skeleton className="mt-6 h-4 w-full" />
          <Skeleton className="mt-3 h-4 w-full" />
          <Skeleton className="mt-3 h-4 w-full" />
        </div>
      </div>
    </main>
  );
}
