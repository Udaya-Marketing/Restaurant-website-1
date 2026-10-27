import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowRight, ArrowUpRight, Check, Clock3, Play, Star } from "lucide-react";
import { CategoryPicker } from "@/components/category-picker";
import { IngredientFeature } from "@/components/ingredient-feature";
import { JsonLd } from "@/components/json-ld";
import { NewsletterForm } from "@/components/newsletter-form";
import { ProductCard } from "@/components/product-card";
import { SectionHeading } from "@/components/section-heading";
import { menu, topSellers } from "@/data/menu";
import { restaurantJsonLd } from "@/lib/structured-data";
import { site } from "@/lib/site";

const benefits = [
  "Smash-cooked to order, never waiting under a heat lamp",
  "Texas-raised beef and produce from people we know",
  "Vegetarian-friendly favorites, made with the same care",
];

export default function HomePage() {
  return (
    <>
      <JsonLd data={restaurantJsonLd()} />
      <main>
        <section className="hero-glow overflow-hidden">
          <div className="page-shell grid min-h-[650px] items-center gap-4 py-12 md:min-h-[700px] md:grid-cols-[0.94fr_1.06fr] md:py-16">
            <div className="relative z-10 py-6 md:py-0">
              <p className="eyebrow flex items-center gap-2"><span className="h-px w-8 bg-orange" /> Austin, meet your new favorite</p>
              <h1 className="display-heading mt-5 max-w-[650px] text-[clamp(3.1rem,5.5vw,5.5rem)] font-bold">
                Good burgers. <span className="text-orange">Great</span> company.
              </h1>
              <p className="mt-6 max-w-lg text-base leading-7 text-muted sm:text-lg sm:leading-8">
                A proper smash, a golden edge, and the kind of first bite that makes you pause. Pull up a chair — we saved you the good seat.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link className="focus-ring inline-flex items-center gap-2 rounded-full bg-ink px-7 py-4 text-sm font-bold text-white shadow-lg shadow-ink/10 transition hover:bg-orange" href="/menu">
                  Order now <ArrowRight aria-hidden="true" size={17} />
                </Link>
                <a className="focus-ring inline-flex items-center gap-2 rounded-full px-5 py-4 text-sm font-bold text-ink transition hover:bg-white/70" href="#our-way">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full border border-ink/20"><Play aria-hidden="true" className="ml-0.5" size={13} fill="currentColor" /></span>
                  Our way of cooking
                </a>
              </div>
              <div className="mt-9 flex items-center gap-3 text-sm">
                <div aria-label="Five out of five stars" className="flex gap-0.5 text-orange">
                  {Array.from({ length: 5 }, (_, i) => <Star aria-hidden="true" className="fill-current" key={i} size={15} />)}
                </div>
                <span className="font-bold">4.9</span>
                <span className="text-muted">from 480+ happy neighbors</span>
              </div>
            </div>
            <div className="relative mx-auto flex aspect-square w-full max-w-[630px] items-center justify-center md:ml-0">
              <div aria-hidden="true" className="absolute h-[78%] w-[78%] rounded-full bg-ink" />
              <div aria-hidden="true" className="absolute h-[87%] w-[87%] rounded-full border border-orange/40" />
              <div aria-hidden="true" className="absolute h-[97%] w-[97%] rounded-full border border-ink/10" />
              <div aria-hidden="true" className="absolute right-[5%] top-[14%] h-3 w-3 rounded-full bg-orange" />
              <Image
                alt="A juicy stacked cheeseburger with melted cheese, tomato, lettuce, pickles, and a toasted bun"
                className="float-gently relative z-10 aspect-square w-[94%] rounded-full object-cover object-center drop-shadow-[0_32px_22px_rgba(25,20,15,0.22)]"
                priority
                sizes="(max-width: 768px) 90vw, 54vw"
                src="/images/hero-burger-photo.jpg"
                height={1200}
                width={1200}
              />
              <div className="soft-shadow absolute left-0 top-[20%] z-20 rounded-2xl bg-white/95 p-4 backdrop-blur">
                <p className="text-[0.65rem] font-bold uppercase tracking-[0.15em] text-muted">The house favorite</p>
                <p className="mt-1 font-display text-lg font-bold">The Goodfire</p>
                <p className="mt-1 text-sm font-bold tabular-nums text-orange">$14</p>
              </div>
              <div className="soft-shadow absolute bottom-[13%] right-0 z-20 flex items-center gap-3 rounded-2xl bg-white/95 p-4 backdrop-blur">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#fff0df] text-orange"><Clock3 aria-hidden="true" size={20} /></span>
                <div><p className="text-xs text-muted">Hot off the grill</p><p className="mt-0.5 text-sm font-bold">12 min · 680 cal</p></div>
              </div>
            </div>
          </div>
          <div className="page-shell flex items-center gap-3 pb-7 text-xs font-bold uppercase tracking-[0.15em] text-muted/80">
            <ArrowDown aria-hidden="true" size={15} /> Scroll for the good stuff
          </div>
        </section>

        <section className="page-shell section-space pt-10" aria-labelledby="categories-heading">
          <div className="mb-7 flex items-end justify-between gap-4">
            <div><p className="eyebrow">Take your pick</p><h2 className="display-heading mt-2 text-3xl" id="categories-heading">What sounds good?</h2></div>
            <Link className="focus-ring hidden rounded py-2 text-sm font-bold text-orange hover:text-ink sm:block" href="/menu">Full menu <span aria-hidden="true">↗</span></Link>
          </div>
          <CategoryPicker />
        </section>

        <section className="page-shell section-space" aria-labelledby="top-sellers-heading">
          <SectionHeading
            description="The ones that keep bringing folks back. Made fresh, served with a smile, and best enjoyed with extra napkins."
            eyebrow="A few local legends"
            link={{ href: "/menu", label: "See the full menu" }}
            title={<>Meet the <span className="text-orange">regulars</span></>}
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {topSellers.map((item) => <ProductCard item={item} key={item.slug} />)}
          </div>
        </section>

        <section className="page-shell section-space" id="our-way">
          <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
            <div className="relative mx-auto w-full max-w-[600px]">
              <div className="absolute -left-4 -top-4 h-24 w-24 rounded-full bg-[#f9ddc0]" />
              <div className="relative overflow-hidden rounded-[30px]">
                <Image
                  alt="Illustrated Goodfire burger made with fresh Texas ingredients"
                  className="w-full"
                  height={520}
                  sizes="(max-width: 1024px) 90vw, 560px"
                  src="/images/ingredients-collage.svg"
                  width={680}
                />
              </div>
              <div className="soft-shadow absolute -bottom-5 right-4 rounded-2xl bg-white p-4 sm:right-8">
                <p className="font-display text-2xl font-bold">Good food,</p><p className="font-display text-2xl font-bold text-orange">good neighbors.</p>
              </div>
            </div>
            <div className="pt-4 lg:pt-0">
              <p className="eyebrow">A little more thoughtful</p>
              <h2 className="display-heading mt-3 text-[clamp(2.5rem,5vw,4.2rem)]">The good stuff is <span className="text-orange">never</span> an afterthought.</h2>
              <p className="mt-5 max-w-xl leading-7 text-muted">We started Goodfire with one simple idea: do the classics properly, treat people like neighbors, and make the kind of food you’ll think about tomorrow.</p>
              <ul className="mt-7 space-y-4">
                {benefits.map((benefit) => (
                  <li className="flex gap-3 text-sm font-medium leading-6" key={benefit}>
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#e8f0e2] text-green-800"><Check aria-hidden="true" size={15} /></span>{benefit}
                  </li>
                ))}
              </ul>
              <Link className="focus-ring mt-8 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3.5 text-sm font-bold text-white transition hover:bg-orange" href="/about">
                A little about us <ArrowUpRight aria-hidden="true" size={16} />
              </Link>
            </div>
          </div>
        </section>

        <section className="page-shell section-space" aria-labelledby="signature-heading">
          <SectionHeading
            description="A few thoughtful ingredients, brought together over a very hot griddle. Find the stack that feels like you."
            eyebrow="Made with a little fire"
            title={<>What goes into <span className="text-orange">a good thing?</span></>}
          />
          <IngredientFeature />
        </section>

        <section className="section-space bg-[#f7ecdf]" aria-labelledby="popular-heading">
          <div className="page-shell">
            <SectionHeading
              description="Something for the whole table, whether you’re keeping it classic or trying a new favorite."
              eyebrow="The table is set"
              link={{ href: "/menu", label: "All menu items" }}
              title={<>A little <span className="text-orange">something</span> for everyone.</>}
            />
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {menu.slice(0, 4).map((item) => <ProductCard item={item} key={item.slug} />)}
            </div>
          </div>
        </section>

        <section className="page-shell section-space" aria-labelledby="kind-words-heading">
          <SectionHeading
            eyebrow="Kind words, full bellies"
            title={<>Don’t just take <span className="text-orange">our word.</span></>}
          />
          <div className="grid gap-5 md:grid-cols-3">
            {[
              { quote: "The Goodfire is everything a burger should be: crispy at the edges, gloriously messy, and gone far too quickly.", name: "Maya R.", detail: "East Austin regular" },
              { quote: "Brought my whole crew. Nobody had to compromise, and we all left plotting our next visit.", name: "Jordan T.", detail: "Downtown neighbor" },
              { quote: "Those truffle fries are the reason I’m always the one who says ‘let’s get a side for the table.’", name: "Camille D.", detail: "Official fry enthusiast" },
            ].map((review) => (
              <figure className="rounded-[24px] border border-ink/[0.06] bg-white/80 p-6 sm:p-8" key={review.name}>
                <div aria-label="Five stars" className="flex gap-1 text-orange">{Array.from({ length: 5 }, (_, i) => <Star aria-hidden="true" className="fill-current" key={i} size={15} />)}</div>
                <blockquote className="mt-5 font-display text-xl leading-8">“{review.quote}”</blockquote>
                <figcaption className="mt-6 text-sm font-bold">{review.name}<span className="ml-2 font-normal text-muted">· {review.detail}</span></figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section className="page-shell pb-24" id="visit">
          <div className="grid overflow-hidden rounded-[30px] bg-white/75 shadow-[0_20px_65px_rgba(54,34,17,0.07)] lg:grid-cols-[0.8fr_1.2fr]">
            <div className="p-7 sm:p-10 lg:p-12">
              <p className="eyebrow">Right here in Austin</p>
              <h2 className="display-heading mt-3 text-4xl sm:text-5xl">Come on <span className="text-orange">over.</span></h2>
              <p className="mt-4 leading-7 text-muted">Your table, your people, your new favorite burger. We’re just off the Colorado River in downtown Austin.</p>
              <address className="mt-6 not-italic text-sm font-semibold leading-6">
                {site.address.streetAddress}<br />{site.address.addressLocality}, {site.address.addressRegion} {site.address.postalCode}
              </address>
              <p className="mt-5 text-sm leading-6 text-muted">Mon–Thu 11am–9pm<br />Fri–Sat 11am–10pm · Sun 11am–8pm</p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link className="focus-ring rounded-full bg-ink px-5 py-3 text-sm font-bold text-white hover:bg-orange" href="/contact">Book a table</Link>
                <a className="focus-ring rounded-full border border-ink/15 px-5 py-3 text-sm font-bold hover:bg-cream-deep" href="https://maps.google.com/?q=214+W+2nd+Street+Austin+TX+78701" rel="noreferrer" target="_blank">Get directions ↗</a>
              </div>
            </div>
            <div className="min-h-[320px] bg-cream-deep lg:min-h-[460px]">
              <iframe
                className="h-full min-h-[320px] w-full border-0 grayscale-[0.2]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src="https://maps.google.com/maps?q=214%20W%202nd%20Street%2C%20Austin%2C%20TX%2078701&t=&z=14&ie=UTF8&iwloc=&output=embed"
                title="Map showing Goodfire Burger Co. at 214 W 2nd Street in Austin, Texas"
              />
            </div>
          </div>
        </section>

        <section className="bg-ink py-16 text-white sm:py-20">
          <div className="page-shell flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-xl">
              <p className="eyebrow">Good news, occasionally</p>
              <h2 className="display-heading mt-3 text-4xl sm:text-5xl">A little good in your <span className="text-orange">inbox.</span></h2>
              <p className="mt-4 leading-7 text-white/65">First dibs on the specials, new menu things, and neighborhood happenings. No spam, ever.</p>
            </div>
            <NewsletterForm />
          </div>
        </section>
      </main>
    </>
  );
}
