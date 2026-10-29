"use client";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Save, Trash2 } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select";
import { Textarea } from "@/components/ui/textarea";
import { FormEvent } from "react";

import React from "react";
import { Button } from "./ui/button";
import { Pencil } from "lucide-react";

const categories = [
  "Beach",
  "Adventure",
  "Cultural",
  "City Break",
  "Wildlife",
  "Luxury",
];
interface Destination {
  destinationName: string;
  country: string;
  category: string;
  price: number;
  duration: string;
  departureDate: string;
  imageUrl: string;
  description: string;
  id: string;
}

const edit = ({ destination }: { destination: Destination }) => {
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());
    console.log("Form submitted successfully:", data);
    console.log("Destination ID:", destination.id);

    const res = await fetch(
      `http://localhost:5000/destination/${destination.id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      },
    );
    if (!res.ok) {
      throw new Error("Failed to submit form");
    } else {
      console.log("Form submitted successfully:", data);
      window.location.reload(); // Reload the page to reflect the updated data
    }
    // Here you can handle the form submission, e.g., send data to an API
  };
  return (
    <Dialog>
      <DialogTrigger>
        <Button variant="outline" className="h-9 gap-2 px-4">
          <Pencil className="size-4" strokeWidth={1.75} />
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="min-w-250 max-w-2xl rounded-lg border bg-white p-6 shadow-sm sm:p-8">
        <form
          onSubmit={handleSubmit}
          className=" min-w-200 mx-auto mt-10 max-w-2xl rounded-lg border bg-white p-6 shadow-sm sm:p-8"
        >
          <div className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="name">Destination Name</Label>
              <Input
                id="name"
                name="destinationName"
                defaultValue={destination.destinationName}
                className="h-10"
              />
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <Input
                  id="country"
                  name="country"
                  defaultValue={destination.country}
                  className="h-10"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <NativeSelect
                  name="category"
                  defaultValue={destination.category}
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
                  defaultValue={destination.price}
                  className="h-10"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="duration">Duration</Label>
                <Input
                  id="duration"
                  name="duration"
                  defaultValue={destination.duration}
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
                defaultValue={destination.departureDate}
                className="h-10"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="image-url">Image URL</Label>
              <Input
                id="image-url"
                name="imageUrl"
                type="url"
                defaultValue={destination.imageUrl}
                className="h-10"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                defaultValue={destination.description}
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
              Update Travel Package
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default edit;
