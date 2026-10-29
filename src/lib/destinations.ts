import { notFound } from "next/navigation";

export interface Destination {
  _id: string;
  destinationName: string;
  country: string;
  category: string;
  price: number;
  duration: string;
  departureDate: string;
  imageUrl: string;
  description: string;
  rating?: number;
  reviews?: number;
  highlights?: string[];
}

const API_BASE = "http://localhost:5000";

export async function getDestinations(): Promise<Destination[]> {
  const response = await fetch(`${API_BASE}/destinations`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch destinations (${response.status})`);
  }

  return response.json();
}

export async function getDestination(id: string): Promise<Destination> {
  const response = await fetch(`${API_BASE}/destination/${id}`, {
    cache: "no-store",
  });

  if (response.status === 404) {
    notFound();
  }

  if (!response.ok) {
    throw new Error(`Failed to fetch destination (${response.status})`);
  }

  return response.json();
}
