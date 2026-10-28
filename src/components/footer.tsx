import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Destinations", href: "/destinations" },
  { label: "My Bookings", href: "/bookings" },
  { label: "My Profile", href: "/profile" },
];

const supportLinks = [
  { label: "Help Center", href: "/help" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Privacy Policy", href: "/privacy" },
];

const contactInfo = [
  { label: "786901 1622", href: "tel:7869011622" },
  { label: "info@wanderland.com", href: "mailto:info@wanderland.com" },
];

const socialLinks = [
  {
    label: "X",
    href: "https://x.com",
    icon: (
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    ),
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com",
    icon: (
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    ),
  },
  {
    label: "Instagram",
    href: "https://instagram.com",
    icon: (
      <>
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
      </>
    ),
  },
];

function FooterHeading({ children }: { children: string }) {
  return (
    <h3 className="text-xs font-semibold tracking-[0.2em] text-white uppercase">
      {children}
    </h3>
  );
}

export function Footer() {
  return (
    <footer className="bg-neutral-950 px-6 py-16 text-white lg:py-20">
      <div className="mx-auto max-w-[1600px]">
        <h2 className="text-5xl font-bold tracking-tight lg:text-6xl">
          Wanderlast
        </h2>
        <p className="mt-3 text-sm text-neutral-400">
          Your gateway to extraordinary travel experiences around the world.
        </p>

        <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-[minmax(0,1.4fr)_repeat(3,minmax(0,1fr))]">
          <div>
            <FooterHeading>Newsletter</FooterHeading>
            <p className="mt-4 text-sm text-neutral-400">
              Subscribe for exclusive travel deals and inspiration.
            </p>
            <form className="mt-5 flex max-w-xs items-stretch border border-neutral-800 bg-neutral-900">
              <label htmlFor="newsletter-email" className="sr-only">
                Enter email
              </label>
              <input
                id="newsletter-email"
                type="email"
                name="email"
                required
                placeholder="Enter email"
                className="h-11 w-full min-w-0 bg-transparent px-4 text-sm text-white placeholder:text-neutral-500 focus:outline-none"
              />
              <button
                type="submit"
                aria-label="Subscribe"
                className="flex h-11 w-12 shrink-0 items-center justify-center border-l border-neutral-800 text-neutral-400 transition-colors hover:text-white"
              >
                <ArrowUpRight className="size-4" />
              </button>
            </form>
          </div>

          <div>
            <FooterHeading>Quick Links</FooterHeading>
            <ul className="mt-4 flex flex-col gap-3 text-sm text-neutral-400">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <FooterHeading>Support</FooterHeading>
            <ul className="mt-4 flex flex-col gap-3 text-sm text-neutral-400">
              {supportLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <FooterHeading>Contact Us</FooterHeading>
            <ul className="mt-4 flex flex-col gap-3 text-sm text-neutral-400">
              {contactInfo.map((contact) => (
                <li key={contact.href}>
                  <a
                    href={contact.href}
                    className="transition-colors hover:text-white"
                  >
                    {contact.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-6 border-t border-neutral-800 pt-6 sm:flex-row">
          <p className="text-xs text-neutral-500">
            © Wanderlast. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="text-neutral-400 transition-colors hover:text-white"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill={social.label === "Instagram" ? "none" : "currentColor"}
                  stroke={
                    social.label === "Instagram" ? "currentColor" : "none"
                  }
                  strokeWidth={1.75}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="size-4.5"
                  aria-hidden="true"
                >
                  {social.icon}
                </svg>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
