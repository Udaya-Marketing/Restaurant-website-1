import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Check, Clock3, Star } from "lucide-react";
import { AddToCartButton } from "@/components/add-to-cart-button";
import { JsonLd } from "@/components/json-ld";
import { ProductCard } from "@/components/product-card";
import { formatPrice, getMenuItem, menu } from "@/data/menu";
import { breadcrumbJsonLd } from "@/lib/structured-data";
import { absoluteUrl, site } from "@/lib/site";

type DishPageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return menu.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: DishPageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = getMenuItem(slug);
  if (!item) return { title: "Dish not found" };
  const title = `${item.name} | ${site.name} Menu`;
  const description = `${item.description} Freshly made at Goodfire Burger Co. in Austin, Texas.`;
  return {
    title,
    description,
    alternates: { canonical: `/menu/${item.slug}` },
    openGraph: { title, description, url: absoluteUrl(`/menu/${item.slug}`), images: [{ url: item.image, alt: item.imageAlt }] },
    twitter: { card: "summary_large_image", title, description, images: [item.image] },
  };
}

export default async function DishPage({ params }: DishPageProps) {
  const { slug } = await params;
  const item = getMenuItem(slug);
  if (!item) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MenuItem",
    name: item.name,
    description: item.description,
    image: absoluteUrl(item.image),
    offers: {
      "@type": "Offer",
      price: item.price,
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: item.rating,
      reviewCount: item.reviewCount,
      bestRating: 5,
    },
    isPartOf: { "@type": "Menu", name: `${site.name} Menu`, url: absoluteUrl("/menu") },
  };
  const related = menu.filter((candidate) => candidate.slug !== item.slug).slice(0, 3);

  return (
    <main className="page-shell pb-24 pt-9 sm:pt-12">
      <JsonLd data={jsonLd} />
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Menu", path: "/menu" }, { name: item.name, path: `/menu/${item.slug}` }])} />
      <Link className="focus-ring inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold text-muted hover:bg-white hover:text-ink" href="/menu">
        <ArrowLeft aria-hidden="true" size={16} /> Back to the menu
      </Link>
      <article className="mt-6 grid items-center gap-8 rounded-[30px] border border-ink/[0.07] bg-white/75 p-5 sm:p-8 lg:grid-cols-2 lg:gap-14 lg:p-12">
        <div className="relative flex min-h-[300px] items-center justify-center rounded-[24px] bg-cream-deep sm:min-h-[480px]">
          <Image alt={item.imageAlt} className="h-full max-h-[460px] w-full object-contain p-8" height={520} priority sizes="(max-width: 1024px) 90vw, 560px" src={item.image} width={620} />
        </div>
        <div>
          <p className="eyebrow">{item.category} · Fresh from our kitchen</p>
          <h1 className="display-heading mt-3 text-[clamp(2.8rem,5vw,4.5rem)]">{item.name}</h1>
          <div className="mt-4 flex items-center gap-2 text-sm">
            <Star aria-hidden="true" className="fill-orange text-orange" size={16} />
            <span className="font-bold">{item.rating.toFixed(1)}</span>
            <span className="text-muted">({item.reviewCount} neighbor reviews)</span>
          </div>
          <p className="mt-6 text-lg leading-8 text-muted">{item.description}</p>
          <ul className="mt-7 grid gap-3 sm:grid-cols-2">
            {item.ingredients.map((ingredient) => (
              <li className="flex items-center gap-2 text-sm font-medium" key={ingredient}>
                <Check aria-hidden="true" className="text-green-800" size={17} /> {ingredient}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex items-center gap-3 text-sm text-muted">
            <Clock3 aria-hidden="true" size={17} /> Ready in about {item.prepTime} <span aria-hidden="true">·</span> {item.calories} cal
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-5">
            <span className="font-display text-4xl font-bold tabular-nums text-orange">{formatPrice(item.price)}</span>
            <AddToCartButton item={item} />
          </div>
        </div>
      </article>
      <section className="mt-20" aria-labelledby="more-good-heading">
        <div className="mb-8">
          <p className="eyebrow">Keep exploring</p>
          <h2 className="display-heading mt-2 text-3xl" id="more-good-heading">More good things.</h2>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{related.map((relatedItem) => <ProductCard item={relatedItem} key={relatedItem.slug} />)}</div>
      </section>
    </main>
  );
}
