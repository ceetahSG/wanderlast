import type { Metadata } from "next";

import { SigninForm } from "@/components/signin-form";

export const metadata: Metadata = {
  title: "Sign In — Wanderlast",
  description: "Sign in to your Wanderlast account to resume your adventure.",
};

export default function LoginPage() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center bg-[#f4f7fb] px-4 py-14 dark:bg-background">
      <div className="w-full max-w-md text-center">
        <h1 className="text-4xl font-bold tracking-tight">Welcome Back</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Resume your adventure with Wanderlast
        </p>

        <SigninForm />
      </div>
    </main>
  );
}
