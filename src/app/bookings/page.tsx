import { auth } from "@/lib/auth";
import { BookingList } from "@/components/bookings/booking-list";
import { getBookings } from "@/lib/bookings";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function BookingsPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  const user = session?.user;

  if (!user?.email) {
    redirect("/login");
  }

  const bookings = await getBookings(user.email);

  return (
    <main className="mx-auto w-full max-w-[1600px] px-6 py-12 lg:px-10 lg:py-16">
      <h1 className="text-4xl font-light tracking-tight sm:text-5xl">
        My Bookings
      </h1>
      <BookingList bookings={bookings} />
    </main>
  );
}
