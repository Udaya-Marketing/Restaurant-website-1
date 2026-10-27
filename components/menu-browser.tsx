"use client";

import { Search, SlidersHorizontal, X } from "lucide-react";
import { useMemo, useState } from "react";
import { categories, menu } from "@/data/menu";
import { ProductCard } from "@/components/product-card";

const filterCategories = ["Everything", ...categories.filter((category) => category !== "Burgers")];

export function MenuBrowser({ initialQuery = "", initialCategory = "" }: { initialQuery?: string; initialCategory?: string }) {
  const [query, setQuery] = useState(initialQuery);
  const [category, setCategory] = useState(
    initialCategory === "Burgers" ? "Fast Food" : filterCategories.includes(initialCategory) ? initialCategory : "Everything",
  );

  const filtered = useMemo(() => {
    const search = query.trim().toLowerCase();
    return menu.filter((item) => {
      const matchesCategory =
        category === "Everything" ||
        (category === "Fast Food" && item.category === "Burgers") ||
        item.category.toLowerCase() === category.toLowerCase();
      const matchesSearch =
        !search ||
        `${item.name} ${item.description} ${item.category} ${item.ingredients.join(" ")}`.toLowerCase().includes(search);
      return matchesCategory && matchesSearch;
    });
  }, [category, query]);

  return (
    <>
      <div className="rounded-[24px] border border-ink/[0.07] bg-white/80 p-4 sm:p-5">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="relative w-full md:max-w-sm">
            <label className="sr-only" htmlFor="menu-search">Search dishes and ingredients</label>
            <Search aria-hidden="true" className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" size={18} />
            <input
              className="focus-ring h-12 w-full rounded-full border border-ink/10 bg-cream/60 pl-11 pr-11 text-sm placeholder:text-muted/70"
              id="menu-search"
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search a dish or ingredient"
              type="search"
              value={query}
            />
            {query && (
              <button aria-label="Clear search" className="focus-ring absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1" onClick={() => setQuery("")}>
                <X aria-hidden="true" size={16} />
              </button>
            )}
          </div>
          <p aria-live="polite" className="flex items-center gap-2 text-sm text-muted">
            <SlidersHorizontal aria-hidden="true" size={15} /> Showing <strong className="text-ink">{filtered.length}</strong> good things
          </p>
        </div>
        <div aria-label="Filter menu by category" className="mt-4 flex gap-2 overflow-x-auto pb-1" role="group">
          {filterCategories.map((item) => (
            <button
              aria-pressed={category === item}
              className={`focus-ring shrink-0 rounded-full px-4 py-2.5 text-sm font-semibold transition ${
                category === item ? "bg-orange text-white" : "bg-cream text-ink/75 hover:bg-cream-deep"
              }`}
              key={item}
              onClick={() => setCategory(item)}
              type="button"
            >
              {item}
            </button>
          ))}
        </div>
      </div>
      {filtered.length > 0 ? (
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item) => <ProductCard item={item} key={item.slug} />)}
        </div>
      ) : (
        <div className="mt-8 rounded-[24px] border border-dashed border-ink/20 bg-white/50 px-6 py-16 text-center">
          <p className="display-heading text-2xl">Nothing on the grill by that name.</p>
          <p className="mt-2 text-sm text-muted">Try another search or choose a different category.</p>
          <button
            className="focus-ring mt-5 rounded-full bg-ink px-5 py-3 text-sm font-bold text-white"
            onClick={() => { setQuery(""); setCategory("Everything"); }}
            type="button"
          >
            Show me everything
          </button>
        </div>
      )}
    </>
  );
}
