/**
 * Central site configuration. Update these values before launch.
 * Environment variables (see .env.example) override the defaults below.
 */
export const site = {
  name: "Forge AI",
  tagline: "Less busywork. More business.",
  positioning: "Forge AI builds intelligent systems that automate business operations.",
  // TODO: replace with the real inbox before launch.
  email: "hello@forgeai.com",
  bookingUrl: (import.meta.env.VITE_BOOKING_URL as string | undefined) || "",
  contactEndpoint: (import.meta.env.VITE_CONTACT_ENDPOINT as string | undefined) || "",
};

export const navLinks = [
  { label: "Solutions", to: "/solutions" },
  { label: "How It Works", to: "/how-it-works" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

/** Where "Book a Discovery Call" points: an external scheduler if configured, else the contact page. */
export const discoveryCallHref = site.bookingUrl || "/contact?intent=discovery-call";
