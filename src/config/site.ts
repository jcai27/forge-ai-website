/**
 * Central site configuration. Update these values before launch.
 * Environment variables (see .env.example) override the defaults below.
 */
export const site = {
  name: "Forge AI",
  url: "https://jcai27.github.io/forge-ai-website",
  tagline: "Less busywork. More business.",
  positioning: "AI-powered operational infrastructure for modern businesses.",
  // TODO: replace with the real inbox before launch.
  email: "hello@forgeai.com",
  bookingUrl: (import.meta.env.VITE_BOOKING_URL as string | undefined) || "",
  contactEndpoint: (import.meta.env.VITE_CONTACT_ENDPOINT as string | undefined) || "",
};

export const navLinks = [
  { label: "Platform", to: "/platform" },
  { label: "Solutions", to: "/solutions" },
  { label: "How It Works", to: "/how-it-works" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

/** Where "Book a Consultation" points: an external scheduler if configured, else the contact page. */
export const consultationHref = site.bookingUrl || "/contact?intent=consultation";
