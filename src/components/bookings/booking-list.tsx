"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  CalendarDays,
  CheckCircle2,
  Clock,
  Eye,
  Hash,
  Tag,
  Trash2,
  XCircle,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { cancelBooking, type Booking } from "@/lib/bookings";

const statusStyles: Record<string, { badge: string; icon: React.ElementType }> =
  {
    Confirmed: {
      badge: "bg-emerald-50 text-emerald-600",
      icon: CheckCircle2,
    },
    Pending: {
      badge: "bg-amber-50 text-amber-600",
      icon: Clock,
    },
    Cancelled: {
      badge: "bg-red-50 text-red-600",
      icon: XCircle,
    },
  };

function formatDate(date: string) {
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return date;
  return parsed.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function BookingList({ bookings }: { bookings: Booking[] }) {
  const router = useRouter();
  const [cancellingId, setCancellingId] = useState<string | null>(null);

  const handleCancel = async (bookingId: string) => {
    setCancellingId(bookingId);
    try {
      await cancelBooking(bookingId);
      router.refresh();
    } finally {
      setCancellingId(null);
    }
  };

  if (bookings.length === 0) {
    return (
      <div className="mt-10 flex flex-col items-center rounded-lg border border-dashed bg-white p-12 text-center shadow-sm">
        <h2 className="text-lg font-medium">No bookings yet</h2>
        <p className="mt-1 text-sm text-neutral-500">
          When you book a trip, it will show up here.
        </p>
        <Button
          render={<Link href="/destinations" />}
          className="mt-6 gap-2 bg-brand text-brand-foreground hover:bg-brand/90"
        >
          Explore destinations
        </Button>
      </div>
    );
  }

  return (
    <ul className="mt-8 space-y-5">
      {bookings.map((booking) => {
        const status =
          statusStyles[booking.status ?? "Confirmed"] ?? statusStyles.Confirmed;
        const StatusIcon = status.icon;

        return (
          <li
            key={booking._id}
            className="flex flex-col gap-5 rounded-lg border bg-white p-4 shadow-sm sm:flex-row"
          >
            <div className="relative h-48 w-full shrink-0 overflow-hidden rounded-md sm:h-auto sm:w-64">
              <Image
                src={booking.destinationImage}
                alt={booking.destinationName}
                fill
                sizes="(max-width: 640px) 100vw, 256px"
                className="object-cover"
              />
            </div>

            <div className="flex min-w-0 flex-1 flex-col">
              <Badge
                variant="outline"
                className={`w-fit gap-1.5 border-transparent ${status.badge}`}
              >
                <StatusIcon className="size-3" />
                {booking.status ?? "Confirmed"}
              </Badge>

              <h2 className="mt-2 text-2xl font-bold">
                {booking.destinationName}
              </h2>

              <dl className="mt-3 space-y-1.5 text-sm text-neutral-600">
                <div className="flex items-center gap-2">
                  <CalendarDays className="size-4 shrink-0 text-neutral-400" />
                  <dt className="sr-only">Departure</dt>
                  <dd>Departure: {formatDate(booking.departureDate)}</dd>
                </div>
                <div className="flex items-center gap-2">
                  <Hash className="size-4 shrink-0 text-neutral-400" />
                  <dt className="sr-only">Booking ID</dt>
                  <dd>Booking ID: {booking._id}</dd>
                </div>
              </dl>

              <div className="mt-auto flex flex-wrap items-end justify-between gap-4 pt-4">
                <p className="text-2xl font-semibold text-brand">
                  ${booking.price.toLocaleString("en-US")}
                </p>

                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    disabled={cancellingId === booking._id}
                    onClick={() => handleCancel(booking._id)}
                    className="gap-1.5 border-red-200 bg-white text-red-500 hover:border-red-300 hover:bg-red-50 hover:text-red-600"
                  >
                    <Trash2 className="size-4" />
                    {cancellingId === booking._id ? "Cancelling..." : "Cancel"}
                  </Button>

                  <Dialog>
                    <DialogTrigger
                      render={
                        <Button className="gap-1.5 bg-brand text-brand-foreground hover:bg-brand/90" />
                      }
                    >
                      <Eye className="size-4" />
                      View
                    </DialogTrigger>

                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle>{booking.destinationName}</DialogTitle>
                        <DialogDescription>
                          {booking.country} · {booking.category}
                        </DialogDescription>
                      </DialogHeader>

                      <div className="relative h-44 w-full overflow-hidden rounded-md">
                        <Image
                          src={booking.destinationImage}
                          alt={booking.destinationName}
                          fill
                          sizes="(max-width: 640px) 100vw, 448px"
                          className="object-cover"
                        />
                      </div>

                      <p className="text-sm text-neutral-600">
                        {booking.description}
                      </p>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="flex items-center gap-1.5 text-xs text-neutral-500">
                            <CalendarDays className="size-3.5" />
                            Departure
                          </p>
                          <p className="mt-1 font-medium">
                            {formatDate(booking.departureDate)}
                          </p>
                        </div>
                        <div>
                          <p className="flex items-center gap-1.5 text-xs text-neutral-500">
                            <Tag className="size-3.5" />
                            Total price
                          </p>
                          <p className="mt-1 font-medium text-brand">
                            ${booking.price.toLocaleString("en-US")}
                          </p>
                        </div>
                      </div>

                      <DialogFooter>
                        <p className="text-xs text-neutral-400">
                          Booking ID: {booking._id}
                        </p>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

export function BookingsSkeleton() {
  return (
    <ul className="mt-8 space-y-5">
      {Array.from({ length: 3 }).map((_, i) => (
        <li
          key={i}
          className="flex flex-col gap-5 rounded-lg border bg-white p-4 shadow-sm sm:flex-row"
        >
          <Skeleton className="h-48 w-full rounded-md sm:h-44 sm:w-64" />
          <div className="flex-1 space-y-3">
            <Skeleton className="h-5 w-20 rounded-full" />
            <Skeleton className="h-7 w-56" />
            <Skeleton className="h-4 w-44" />
            <Skeleton className="h-4 w-40" />
            <div className="flex items-center justify-between pt-4">
              <Skeleton className="h-7 w-20" />
              <div className="flex gap-2">
                <Skeleton className="h-8 w-24" />
                <Skeleton className="h-8 w-20" />
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
