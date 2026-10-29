"use client";
import React from "react";
import { Button } from "./ui/button";
import { Trash2 } from "lucide-react";
import { redirect } from "next/navigation";

const Delete = ({ id }: { id: string }) => {
  const handleDelete = async () => {
    const res = await fetch(`http://localhost:5000/destination/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) {
      throw new Error("Failed to delete destination");
    } else {
      console.log("Destination deleted successfully");
      redirect("/destinations"); // Redirect to the destinations page after deletion
    }
  };
  return (
    <div>
      <Button
        onClick={handleDelete}
        variant="outline"
        className="h-9 gap-2 border-destructive/40 px-4 text-destructive hover:bg-destructive/10 hover:text-destructive"
      >
        <Trash2 className="size-4" strokeWidth={1.75} />
        Delete
      </Button>
    </div>
  );
};

export default Delete;
