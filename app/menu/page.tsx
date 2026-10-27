import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import { MenuBrowser } from "@/components/menu-browser";
import { menuJsonLd, breadcrumbJsonLd } from "@/lib/structured-data";
import { absoluteUrl, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "The Menu",
  description: "Explore Goodfire Burger Co.’s Austin menu: smash burgers, hand-cut sides, fresh salads, local drinks, and little sweet things.",
  alternates: { canonical: "/menu" },
  openGraph: {
    title: `The Menu | ${site.name}`,
    description: "Smash burgers, hand-cut sides, and good things around the table in Austin, Texas.",
    url: absoluteUrl("/menu"),
    images: ["/images/og-goodfire.svg"],
  },
  twitter: { card: "summary_large_image", title: `The Menu | ${site.name}`, description: site.description, images: ["/images/og-goodfire.svg"] },
};

type MenuPageProps = {
  searchParams: Promise<{ q?: string; category?: string }>;
};

export default async function MenuPage({ searchParams }: MenuPageProps) {
  const params = await searchParams;
  return (
    <main className="page-shell min-h-[70vh] pb-24 pt-12 sm:pt-16">
      <JsonLd data={menuJsonLd()} />
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Menu", path: "/menu" }])} />
      <div className="mb-10 max-w-3xl">
        <p className="eyebrow">The Goodfire menu</p>
        <h1 className="display-heading mt-3 text-[clamp(3rem,7vw,5.4rem)]">Good things <span className="text-orange">cooked fresh.</span></h1>
        <p className="mt-5 max-w-2xl text-base leading-7 text-muted sm:text-lg">
          Thoughtful ingredients, familiar favorites, and a griddle that’s always hot. Everything’s made when you order.
        </p>
      </div>
      <MenuBrowser initialCategory={params.category} initialQuery={params.q} />
    </main>
  );
}
