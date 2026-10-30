export interface Booking {
  _id: string;
  destinationName: string;
  destinationImage: string;
  price: number;
  country: string;
  category: string;
  description: string;
  email: string;
  userId: string;
  departureDate: string;
  status?: "Confirmed" | "Pending" | "Cancelled";
}

const API_BASE = "http://localhost:5000";

export async function getBookings(email: string): Promise<Booking[]> {
  const response = await fetch(
    `${API_BASE}/bookings/${encodeURIComponent(email)}`,
    {
      cache: "no-store",
    },
  );

  if (!response.ok) {
    throw new Error(
      `Failed to fetch bookings (${response.status} ${response.statusText})`,
    );
  }

  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) {
    throw new Error(
      `Bookings endpoint returned ${contentType || "an unknown response type"} instead of JSON`,
    );
  }

  return response.json();
}

export async function cancelBooking(bookingId: string): Promise<boolean> {
  const response = await fetch(`${API_BASE}/booking/${bookingId}`, {
    method: "DELETE",
  });

  return response.ok;
}
