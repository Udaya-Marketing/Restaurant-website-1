export const site = {
  name: "Goodfire Burger Co.",
  tagline: "A little fire. A lot of flavor.",
  description:
    "Austin-made smash burgers, hand-cut sides, and good things around the table. Find your new favorite at Goodfire Burger Co.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://goodfire.example",
  telephone: "+1-512-555-0148",
  email: "hello@goodfire.example",
  address: {
    streetAddress: "214 W 2nd Street",
    addressLocality: "Austin",
    addressRegion: "TX",
    postalCode: "78701",
    addressCountry: "US",
  },
  hours: [
    { days: ["Monday", "Tuesday", "Wednesday", "Thursday"], opens: "11:00", closes: "21:00" },
    { days: ["Friday", "Saturday"], opens: "11:00", closes: "22:00" },
    { days: ["Sunday"], opens: "11:00", closes: "20:00" },
  ],
};

export function absoluteUrl(path: string): string {
  return new URL(path, site.url).toString();
}
