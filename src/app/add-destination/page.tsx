"use client";
import { Save, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select";
import { Textarea } from "@/components/ui/textarea";
import { FormEvent } from "react";

const categories = [
  "Beach",
  "Adventure",
  "Cultural",
  "City Break",
  "Wildlife",
  "Luxury",
];

const AddDestinationPage = () => {
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());
    const res = await fetch("http://localhost:5000/destination", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      throw new Error("Failed to submit form");
    }
    const result = await res.json();
    console.log("Form submitted successfully:", result);
    // Here you can handle the form submission, e.g., send data to an API
  };
  return (
    <main className="mx-auto max-w-[1600px] px-6 py-12 lg:px-10 lg:py-16">
      <h1 className="text-4xl font-light tracking-tight sm:text-5xl">
        Add New Travel Package
      </h1>

      <form
        onSubmit={handleSubmit}
        className="mx-auto mt-10 max-w-2xl rounded-lg border bg-white p-6 shadow-sm sm:p-8"
      >
        <div className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="name">Destination Name</Label>
            <Input
              id="name"
              name="name"
              placeholder="Bali Paradise"
              required
              className="h-10"
            />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="country">Country</Label>
              <Input
                id="country"
                name="country"
                placeholder="Indonesia"
                required
                className="h-10"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <NativeSelect
                name="category"
                defaultValue="Beach"
                className="w-full [&_select]:h-10"
              >
                {categories.map((category) => (
                  <NativeSelectOption key={category} value={category}>
                    {category}
                  </NativeSelectOption>
                ))}
              </NativeSelect>
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="price">Price (USD)</Label>
              <Input
                id="price"
                name="price"
                type="number"
                min="0"
                placeholder="e.g., 1299"
                required
                className="h-10"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="duration">Duration</Label>
              <Input
                id="duration"
                name="duration"
                placeholder="e.g., 7 Days/6 Nights"
                required
                className="h-10"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="departure-date">Departure Date</Label>
            <Input
              id="departure-date"
              name="departureDate"
              type="date"
              required
              className="h-10"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="image-url">Image URL</Label>
            <Input
              id="image-url"
              name="imageUrl"
              type="url"
              placeholder="https://example.com/image.jpg"
              required
              className="h-10"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Describe the travel experience..."
              required
              className="min-h-24"
            />
          </div>
        </div>

        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <Button
            type="reset"
            variant="outline"
            className="border-destructive/40 text-destructive hover:bg-destructive/10 hover:text-destructive"
          >
            <Trash2 />
            Cancel
          </Button>
          <Button
            type="submit"
            className="bg-brand text-brand-foreground hover:bg-brand/90"
          >
            <Save />
            Add Travel Package
          </Button>
        </div>
      </form>
    </main>
  );
};

export default AddDestinationPage;
