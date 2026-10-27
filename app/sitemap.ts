import type { MetadataRoute } from "next";
import { menu } from "@/data/menu";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/menu", "/about", "/recipes", "/offers", "/contact"];
  const pages = staticRoutes.map((route) => ({
    url: new URL(route, site.url).toString(),
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" as const : "monthly" as const,
    priority: route === "" ? 1 : route === "/menu" ? 0.9 : 0.7,
  }));
  const dishes = menu.map((item) => ({
    url: new URL(`/menu/${item.slug}`, site.url).toString(),
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));
  return [...pages, ...dishes];
}
