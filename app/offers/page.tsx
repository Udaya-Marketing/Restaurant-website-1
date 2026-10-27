import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Gift, Sparkles, Utensils } from "lucide-react";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbJsonLd } from "@/lib/structured-data";
import { absoluteUrl, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Goodfire Offers",
  description: "A little something extra from Goodfire Burger Co. Find our Austin lunch, weekday, and neighborhood offers.",
  alternates: { canonical: "/offers" },
  openGraph: { title: `Goodfire Offers | ${site.name}`, description: site.description, url: absoluteUrl("/offers"), images: ["/images/og-goodfire.svg"] },
  twitter: { card: "summary_large_image", title: `Goodfire Offers | ${site.name}`, description: site.description, images: ["/images/og-goodfire.svg"] },
};

export default function OffersPage() {
  const offers = [
    { icon: Utensils, title: "The lunch break", detail: "Weekdays, 11am–2pm", copy: "Make the most of the middle of your day: any classic smash burger with a side of hand-cut fries for $18.", note: "Available Monday–Friday. Dine-in only." },
    { icon: Gift, title: "A little birthday love", detail: "Your birthday week", copy: "A sweet little treat is on us when you celebrate your birthday with the Goodfire crew.", note: "Show a valid ID. One treat per guest." },
    { icon: Sparkles, title: "Neighbors night", detail: "First Wednesday each month", copy: "Bring a friend, bring the family, and enjoy 10% off your food bill. Good company encouraged.", note: "Dine-in only. Not valid with other offers." },
  ];

  return (
    <main className="page-shell min-h-[65vh] pb-24 pt-12 sm:pt-16">
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Offers", path: "/offers" }])} />
      <div className="mb-10 max-w-3xl">
        <p className="eyebrow">A little extra good</p>
        <h1 className="display-heading mt-3 text-[clamp(3rem,7vw,5.3rem)]">Good things <span className="text-orange">come around.</span></h1>
        <p className="mt-5 text-lg leading-8 text-muted">A few neighborhood favorites and small reasons to make tonight a Goodfire night.</p>
      </div>
      <div className="grid gap-5 md:grid-cols-3">
        {offers.map(({ icon: Icon, title, detail, copy, note }) => (
          <article className="flex flex-col rounded-[24px] border border-ink/[0.07] bg-white/80 p-7 sm:p-8" key={title}>
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-orange/10 text-orange"><Icon aria-hidden="true" size={22} /></span>
            <p className="eyebrow mt-6">{detail}</p>
            <h2 className="display-heading mt-2 text-2xl">{title}</h2>
            <p className="mt-3 flex-1 text-sm leading-6 text-muted">{copy}</p>
            <p className="mt-5 border-t border-ink/10 pt-4 text-xs leading-5 text-muted">{note}</p>
          </article>
        ))}
      </div>
      <div className="mt-8 rounded-[24px] bg-ink p-7 text-white sm:flex sm:items-center sm:justify-between sm:p-9">
        <div><p className="eyebrow">Good things are best shared</p><h2 className="display-heading mt-2 text-3xl">Find your next favorite.</h2></div>
        <Link className="focus-ring mt-5 inline-flex items-center gap-2 rounded-full bg-orange px-6 py-3.5 text-sm font-bold text-white hover:bg-[#d9560c] sm:mt-0" href="/menu">Browse the menu <ArrowRight aria-hidden="true" size={16} /></Link>
      </div>
    </main>
  );
}
