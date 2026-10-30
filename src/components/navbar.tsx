"use client";

import Image from "next/image";
import Link from "next/link";
import { UserRound } from "lucide-react";
import { useState } from "react";

import logo from "@/assets/Wanderlast.png";
import { useSession } from "@/lib/auth-client";
import Profile from "./Profile";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Destinations", href: "/destinations" },
  { label: "My Bookings", href: "/bookings" },
  { label: "Add Destination", href: "/add-destination" },
  { label: "Admin", href: "/admin" },
];

export function Navbar() {
  const [activeTab, setActiveTab] = useState("/");
  const { data: session } = useSession();

  return (
    <header className="sticky top-0 z-50 bg-white">
      <nav className="relative mx-auto flex h-16 w-full max-w-[1600px] items-center justify-between gap-4 px-6 lg:h-18 lg:px-10">
        <ul className="hidden items-center gap-7 text-sm font-medium whitespace-nowrap text-neutral-700 lg:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                aria-current={activeTab === link.href ? "page" : undefined}
                onClick={() => setActiveTab(link.href)}
                className={`transition-colors hover:text-brand ${
                  activeTab === link.href ? "text-brand" : ""
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <Link
          href="/"
          aria-label="Wanderlast home"
          className="absolute left-1/2 -translate-x-1/2"
        >
          <Image src={logo} alt="Wanderlast" priority className="h-6 w-auto" />
        </Link>

        <div className="ml-auto hidden items-center gap-6 text-sm font-medium whitespace-nowrap text-neutral-700 sm:flex">
          {session ? (
            <Profile user={session.user} />
          ) : (
            <Link href="/login" className="transition-colors hover:text-brand">
              Login
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
