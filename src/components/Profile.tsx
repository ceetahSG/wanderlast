"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";
import { authClient } from "@/lib/auth-client";

type ProfileUser = {
  name: string;
  email: string;
};

const ProfilePopOver = ({ user }: { user: ProfileUser }) => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function handleSignOut() {
    setError(null);
    setPending(true);
    const { error } = await authClient.signOut();

    if (error) {
      console.error("Failed to sign out:", error);
      setError("Unable to sign out. Please try again.");
      setPending(false);
      return;
    }

    router.refresh();
    router.replace("/login");
  }

  return (
    <div>
      <Popover>
        <PopoverTrigger
          render={
            <Button variant="outline" className="w-fit">
              Profile
            </Button>
          }
        />
        <PopoverContent align="start">
          <PopoverHeader>
            <PopoverTitle>{user.name}</PopoverTitle>
            <PopoverDescription>{user.email}</PopoverDescription>
          </PopoverHeader>
          <Button
            className="to-destructive"
            variant="ghost"
            disabled={pending}
            onClick={handleSignOut}
          >
            {pending ? "Signing Out..." : "Sign Out"}
          </Button>
          {error && <p className="text-sm text-destructive">{error}</p>}
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default ProfilePopOver;
