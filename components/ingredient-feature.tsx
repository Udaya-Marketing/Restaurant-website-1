"use client";

import Image from "next/image";
import { useState } from "react";
import { Check, Star } from "lucide-react";
import { formatPrice, menu } from "@/data/menu";
import { useCart } from "@/components/cart-provider";

const featureItems = menu.filter((item) => item.slug === "the-goodfire" || item.slug === "smokeshow" || item.slug === "garden-party");

export function IngredientFeature() {
  const [activeSlug, setActiveSlug] = useState(featureItems[0].slug);
  const active = featureItems.find((item) => item.slug === activeSlug) ?? featureItems[0];
  const { addItem } = useCart();

  return (
    <div className="overflow-hidden rounded-[30px] border border-ink/[0.07] bg-white/75 shadow-[0_20px_65px_rgba(54,34,17,0.07)]">
      <div aria-label="Choose a signature burger" className="flex gap-2 overflow-x-auto border-b border-ink/[0.07] px-4 py-4 sm:px-7" role="tablist">
        {featureItems.map((item) => (
          <button
            aria-selected={item.slug === active.slug}
            className={`focus-ring shrink-0 rounded-full px-5 py-3 text-sm font-bold transition ${
              item.slug === active.slug ? "bg-ink text-white" : "bg-cream text-ink/70 hover:bg-cream-deep"
            }`}
            key={item.slug}
            onClick={() => setActiveSlug(item.slug)}
            role="tab"
            type="button"
          >
            {item.name}
          </button>
        ))}
      </div>
      <div className="grid items-center gap-8 p-5 sm:p-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14 lg:p-12">
        <div className="relative flex min-h-[260px] items-center justify-center rounded-[24px] bg-[radial-gradient(circle_at_50%_45%,#fff7e9_0,#f6e8d6_68%,#f2dfca_100%)] sm:min-h-[380px]">
          <Image
            alt={active.imageAlt}
            className="h-full max-h-[360px] w-full object-contain p-6 transition-opacity duration-200"
            height={360}
            sizes="(max-width: 1024px) 90vw, 520px"
            src={active.image}
            width={520}
          />
          <span className="absolute left-4 top-4 flex items-center gap-1 rounded-full bg-white px-3 py-2 text-xs font-bold shadow-sm">
            <Star aria-hidden="true" className="fill-orange text-orange" size={13} /> {active.rating.toFixed(1)} fan favorite
          </span>
        </div>
        <div>
          <p className="eyebrow">Good things, layered</p>
          <h3 className="display-heading mt-3 text-4xl sm:text-5xl">{active.name}</h3>
          <p className="mt-4 leading-7 text-muted">{active.description} Built with ingredients we know by name and cooked fresh when you order.</p>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {active.ingredients.map((ingredient) => (
              <li className="flex items-center gap-2 text-sm font-medium" key={ingredient}>
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#e8f0e2] text-green-800">
                  <Check aria-hidden="true" size={14} />
                </span>
                {ingredient}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <span className="font-display text-3xl font-bold tabular-nums text-orange">{formatPrice(active.price)}</span>
            <button
              className="focus-ring rounded-full bg-orange px-6 py-3.5 text-sm font-bold text-white transition hover:bg-[#d9560c]"
              onClick={() => addItem(active)}
              type="button"
            >
              Add to your bag
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
