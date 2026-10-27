import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Clock3 } from "lucide-react";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbJsonLd } from "@/lib/structured-data";
import { absoluteUrl, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Recipes & Kitchen Notes",
  description: "Kitchen notes and approachable recipes from the Goodfire Burger Co. crew in Austin, Texas.",
  alternates: { canonical: "/recipes" },
  openGraph: { title: `Recipes & Kitchen Notes | ${site.name}`, description: site.description, url: absoluteUrl("/recipes"), images: ["/images/og-goodfire.svg"] },
  twitter: { card: "summary_large_image", title: `Recipes & Kitchen Notes | ${site.name}`, description: site.description, images: ["/images/og-goodfire.svg"] },
};

const recipes = [
  { title: "A better burger, right from your backyard", tag: "Kitchen notes", time: "15 min read", image: "/images/goodfire-double.svg", alt: "Illustration of a double smash burger", intro: "The little details that make a great homemade smash burger: a hot pan, a light touch, and a good bun." },
  { title: "The weeknight peach fizz", tag: "Something to sip", time: "5 min read", image: "/images/peach-fizz.svg", alt: "Illustration of a fresh peach fizz", intro: "A bright, fizzy glass of Texas peach, lemon, and mint for your next warm evening." },
  { title: "Make room for brown butter cookies", tag: "Something sweet", time: "30 min read", image: "/images/brown-butter-cookie.svg", alt: "Illustration of a brown butter cookie", intro: "Nutty browned butter, pools of dark chocolate, and a very good pinch of flaky salt." },
];

export default function RecipesPage() {
  return (
    <main className="page-shell min-h-[65vh] pb-24 pt-12 sm:pt-16">
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Recipes", path: "/recipes" }])} />
      <div className="mb-10 max-w-3xl">
        <p className="eyebrow">From our kitchen to yours</p>
        <h1 className="display-heading mt-3 text-[clamp(3rem,7vw,5.3rem)]">A few <span className="text-orange">kitchen notes.</span></h1>
        <p className="mt-5 text-lg leading-8 text-muted">Little ideas, recipes, and rituals that make good food even more fun.</p>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {recipes.map((recipe) => (
          <article className="overflow-hidden rounded-[24px] border border-ink/[0.06] bg-white/80" key={recipe.title}>
            <div className="flex aspect-[1.35] items-center justify-center bg-cream-deep p-6">
              <Image alt={recipe.alt} className="h-full w-full object-contain" height={360} sizes="(max-width: 768px) 90vw, 370px" src={recipe.image} width={480} />
            </div>
            <div className="p-6">
              <p className="eyebrow">{recipe.tag}</p>
              <h2 className="display-heading mt-2 text-2xl">{recipe.title}</h2>
              <p className="mt-3 text-sm leading-6 text-muted">{recipe.intro}</p>
              <p className="mt-4 flex items-center gap-2 text-xs font-semibold text-muted"><Clock3 aria-hidden="true" size={14} /> {recipe.time}</p>
              <Link className="focus-ring mt-5 inline-flex items-center gap-2 rounded py-1 text-sm font-bold hover:text-orange" href="/menu">
                Try it at Goodfire <ArrowUpRight aria-hidden="true" size={15} />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
