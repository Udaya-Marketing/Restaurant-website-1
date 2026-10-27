"use client";

import { ArrowUpRight, Plus, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { formatPrice, type MenuItem } from "@/data/menu";
import { useCart } from "@/components/cart-provider";

export function ProductCard({ item }: { item: MenuItem }) {
  const { addItem } = useCart();

  return (
    <article className="group overflow-hidden rounded-[24px] border border-ink/[0.06] bg-white/80 transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(54,34,17,0.10)]">
      <Link aria-label={`View ${item.name}`} className="focus-ring relative block aspect-[1.25] overflow-hidden bg-cream-deep" href={`/menu/${item.slug}`}>
        <Image
          alt={item.imageAlt}
          className="h-full w-full object-contain p-4 transition duration-500 group-hover:scale-105"
          height={360}
          loading="lazy"
          sizes="(max-width: 640px) 90vw, (max-width: 1024px) 44vw, 270px"
          src={item.image}
          width={520}
        />
        <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1.5 text-xs font-bold text-ink">
          <Star aria-hidden="true" className="mr-1 inline fill-orange text-orange" size={13} /> {item.rating.toFixed(1)}
        </span>
        <span aria-hidden="true" className="absolute bottom-4 right-4 flex h-9 w-9 items-center justify-center rounded-full bg-white text-ink shadow-sm transition group-hover:bg-orange group-hover:text-white">
          <ArrowUpRight size={17} />
        </span>
      </Link>
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <Link className="focus-ring rounded font-display text-xl font-bold tracking-tight hover:text-orange" href={`/menu/${item.slug}`}>
              {item.name}
            </Link>
            <p className="mt-1 text-sm leading-5 text-muted">{item.description}</p>
          </div>
          <span className="shrink-0 pt-1 font-bold tabular-nums text-orange">{formatPrice(item.price)}</span>
        </div>
        <button
          className="focus-ring mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full border border-ink/15 px-4 py-2.5 text-sm font-bold transition hover:border-ink hover:bg-ink hover:text-white"
          onClick={() => addItem(item)}
          type="button"
        >
          <Plus aria-hidden="true" size={16} /> Add to bag
        </button>
      </div>
    </article>
  );
}
