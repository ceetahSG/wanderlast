"use client";

import React from "react";
import { useRouter } from "next/navigation";
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

const ProfilePopOver = ({ user }: { user: any }) => {
  const router = useRouter();

  async function handleSignOut() {
    const { error } = await authClient.signOut();

    if (error) {
      console.error("Failed to sign out:", error);
      return;
    }

    router.push("/login");
    router.refresh();
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
            onClick={handleSignOut}
          >
            Sign Out
          </Button>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default ProfilePopOver;
