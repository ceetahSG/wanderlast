"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Lock, Mail, UserRound } from "lucide-react";
import {
  type ComponentProps,
  type FormEvent,
  type ReactNode,
  useState,
} from "react";

import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";
import { createAuthClient } from "better-auth/react";

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="size-3.5">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1Z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23Z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.1a6.6 6.6 0 0 1 0-4.2V7.06H2.18a11 11 0 0 0 0 9.88l3.66-2.84Z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1A11 11 0 0 0 2.18 7.06l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38Z"
      />
    </svg>
  );
}

type FormFieldProps = {
  id: string;
  label: string;
  icon: ReactNode;
  name: string;
  type?: string;
  placeholder: string;
  autoComplete?: string;
};

function FormField({
  id,
  label,
  icon,
  ...inputProps
}: FormFieldProps & Omit<ComponentProps<"input">, "id">) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-[0.8125rem] font-semibold">
        {label}
      </Label>
      <InputGroup className="h-10 rounded-md bg-muted/60">
        <InputGroupAddon>{icon}</InputGroupAddon>
        <InputGroupInput id={id} className="text-sm" {...inputProps} />
      </InputGroup>
    </div>
  );
}

const SignupPage = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const userData = Object.fromEntries(formData.entries()) as Record<
      string,
      string
    >;
    const { name, email, password, confirmPassword } = userData;

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    const { data, error: signUpError } = await authClient.signUp.email({
      name: name,
      email: email,
      password: password,
    });
    if (!signUpError) {
      router.push("/login");
    } else {
      setError(signUpError.message || "Sign up failed.");
    }
  };

  //   const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
  //     event.preventDefault();
  //     setError(null);

  //     const formData = new FormData(event.currentTarget);
  //     const data = Object.fromEntries(formData.entries()) as Record<
  //       string,
  //       string
  //     >;

  //     const { name, email, password, confirmPassword } = data;
  //     if (password !== confirmPassword) {
  //       setError("Passwords do not match.");
  //       return;
  //     }
  //   };

  return (
    <main className="flex flex-1 items-center justify-center bg-muted/60 px-4 py-12 sm:px-6 sm:py-16">
      <div className="w-full max-w-lg">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-light tracking-tight sm:text-4xl">
            Create Account
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Start your adventure with Wanderlast
          </p>
        </div>

        <div className="rounded-lg border bg-card p-6 shadow-sm sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <FormField
              id="name"
              name="name"
              label="Full Name"
              placeholder="Enter your name"
              autoComplete="name"
              icon={<UserRound />}
              required
            />

            <FormField
              id="email"
              name="email"
              type="email"
              label="Email Address"
              placeholder="Enter your email"
              autoComplete="email"
              icon={<Mail />}
              required
            />

            <FormField
              id="password"
              name="password"
              type="password"
              label="Password"
              placeholder="Create a password"
              autoComplete="new-password"
              icon={<Lock />}
              minLength={8}
              required
            />

            <FormField
              id="confirm-password"
              name="confirmPassword"
              type="password"
              label="Confirm Password"
              placeholder="Confirm your password"
              autoComplete="new-password"
              icon={<Lock />}
              minLength={8}
              required
            />

            {error && (
              <p
                role="alert"
                className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-xs text-destructive"
              >
                {error}
              </p>
            )}

            <Button
              type="submit"
              disabled={pending}
              className="h-10 w-full bg-brand text-sm text-brand-foreground hover:bg-brand/90"
            >
              {pending ? "Creating account…" : "Create Account"}
            </Button>
          </form>

          <p className="my-4 text-center text-xs text-muted-foreground">
            Or sign up with
          </p>

          <Button
            type="button"
            variant="outline"
            disabled={pending}
            className="h-10 w-full gap-2.5 text-sm"
          >
            <GoogleIcon />
            Sign Up With Google
          </Button>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-medium text-brand hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
};
export default SignupPage;
