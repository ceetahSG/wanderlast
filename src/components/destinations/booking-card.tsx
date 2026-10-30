"use client";
import { ArrowRight, Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { Destination } from "@/lib/destinations";
import { authClient, useSession } from "@/lib/auth-client";

const perks = [
  "Free cancellation up to 7 days",
  "Travel insurance included",
  "24/7 customer support",
];

export function BookingCard({ destination }: { destination: Destination }) {
  const { data: session } = authClient.useSession(); // Assuming you want to use the session for some logic
  const handleBooking = async () => {
    const res = await fetch("http://localhost:5000/booking", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        destinationName: destination.destinationName,
        destinationImage: destination.imageUrl,
        price: destination.price,
        country: destination.country,
        category: destination.category,
        description: destination.description,
        email: session?.user?.email, // Assuming you have user email in the session
        userId: session?.user?.id, // Assuming you have user ID in the session
        departureDate: destination.departureDate,
      }),
    });
    if (!res.ok) {
      // Handle error
      console.error("Failed to book destination");
    } else {
      // Handle success
      console.log("Booking successful");
    }
  };

  return (
    <div className="rounded-lg border bg-white p-6 shadow-sm">
      <p className="text-sm text-neutral-500">Starting from</p>
      <p className="mt-1 text-4xl font-semibold text-brand">
        ${destination.price.toLocaleString("en-US")}
      </p>
      <p className="mt-1 text-sm text-neutral-500">per person</p>

      <Input
        type="date"
        defaultValue={destination.departureDate}
        aria-label="Departure date"
        className="mt-5 h-11 bg-muted border-transparent"
      />

      <Button
        onClick={handleBooking}
        className="mt-4 h-11 w-full gap-2 bg-brand text-brand-foreground hover:bg-brand/90"
      >
        Book Now
        <ArrowRight className="size-4" />
      </Button>

      <ul className="mt-6 space-y-3 border-t pt-5 text-sm text-neutral-600">
        {perks.map((perk) => (
          <li key={perk} className="flex items-center gap-2.5">
            <Check
              className="size-4 shrink-0 text-emerald-600"
              strokeWidth={2.5}
            />
            {perk}
          </li>
        ))}
      </ul>
    </div>
  );
}
