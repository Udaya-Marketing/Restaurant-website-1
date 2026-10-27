import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Goodfire Burger Co.",
    short_name: "Goodfire",
    description: "A little fire. A lot of flavor.",
    start_url: "/",
    display: "standalone",
    background_color: "#fff8f0",
    theme_color: "#fff8f0",
    icons: [{ src: "/favicon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
