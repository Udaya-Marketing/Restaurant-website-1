import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Heart, Leaf, Sparkles } from "lucide-react";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbJsonLd } from "@/lib/structured-data";
import { absoluteUrl, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Our Story",
  description: "Meet the neighbors, cooks, and big burger dream behind Goodfire Burger Co. — an Austin-born neighborhood burger spot.",
  alternates: { canonical: "/about" },
  openGraph: { title: `Our Story | ${site.name}`, description: site.description, url: absoluteUrl("/about"), images: ["/images/og-goodfire.svg"] },
  twitter: { card: "summary_large_image", title: `Our Story | ${site.name}`, description: site.description, images: ["/images/og-goodfire.svg"] },
};

export default function AboutPage() {
  return (
    <main>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Our Story", path: "/about" }])} />
      <section className="page-shell py-14 sm:py-20">
        <p className="eyebrow">Good food brings us together</p>
        <h1 className="display-heading mt-4 max-w-4xl text-[clamp(3.2rem,8vw,6.6rem)]">We believe in a <span className="text-orange">very good</span> burger.</h1>
        <div className="mt-10 grid items-center gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div className="overflow-hidden rounded-[30px] bg-cream-deep">
            <Image alt="Colorful illustration of Goodfire's signature burger and fresh ingredients" className="w-full" height={520} priority sizes="(max-width: 1024px) 90vw, 600px" src="/images/ingredients-collage.svg" width={680} />
          </div>
          <div>
            <p className="text-lg leading-8 text-muted">Goodfire began with a borrowed griddle, a too-small apartment kitchen, and a friendly argument about what makes the perfect burger. The answer, it turns out, is good ingredients, a hot pan, and people you’re happy to share it with.</p>
            <p className="mt-5 leading-7 text-muted">We brought that feeling to downtown Austin: a relaxed neighborhood table where the welcome is warm, the edges are crispy, and there’s always room for one more.</p>
            <Link className="focus-ring mt-7 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3.5 text-sm font-bold text-white hover:bg-orange" href="/menu">Find your favorite <ArrowRight aria-hidden="true" size={16} /></Link>
          </div>
        </div>
      </section>
      <section className="bg-white/60 py-16 sm:py-20">
        <div className="page-shell">
          <p className="eyebrow">Our not-so-secret recipe</p>
          <h2 className="display-heading mt-3 max-w-2xl text-[clamp(2.5rem,5vw,4.2rem)]">A few things we’ll <span className="text-orange">always</span> believe.</h2>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {[
              { icon: Heart, title: "People first.", copy: "Good hospitality looks like remembering a name, making room, and showing up for your neighbors." },
              { icon: Leaf, title: "Know your ingredients.", copy: "We build the menu around thoughtfully sourced produce and Texas-raised beef whenever possible." },
              { icon: Sparkles, title: "Keep it joyful.", copy: "Food doesn’t need to be fussy to be special. A golden crust and a good laugh can do a lot." },
            ].map(({ icon: Icon, title, copy }) => (
              <article className="rounded-[24px] border border-ink/[0.06] bg-cream p-7" key={title}>
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-orange/10 text-orange"><Icon aria-hidden="true" size={22} /></span>
                <h3 className="display-heading mt-5 text-2xl">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted">{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
