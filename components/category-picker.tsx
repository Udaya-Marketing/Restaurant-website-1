"use client";

import { Coffee, Cookie, Drumstick, Leaf, Soup, Sparkles } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const items = [
  { label: "Fast food", category: "Fast Food", icon: Drumstick },
  { label: "Salad", category: "Salad", icon: Leaf },
  { label: "Drinks", category: "Drinks", icon: Coffee },
  { label: "Dessert", category: "Dessert", icon: Cookie },
  { label: "Snacks", category: "Snacks", icon: Sparkles },
  { label: "Soup", category: "Soup", icon: Soup },
];

export function CategoryPicker() {
  const [selected, setSelected] = useState("Fast Food");

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
      {items.map(({ label, category, icon: Icon }) => {
        const active = selected === category;
        const target = category === "Fast Food" ? "Burgers" : category;
        return (
          <Link
            aria-current={active ? "true" : undefined}
            className={`focus-ring flex min-h-32 flex-col items-center justify-center gap-3 rounded-[22px] border p-4 text-center transition duration-200 hover:-translate-y-1 ${
              active
                ? "border-orange bg-orange text-white shadow-[0_12px_30px_rgba(242,106,27,0.2)]"
                : "border-ink/[0.07] bg-white/70 text-ink hover:border-orange/40"
            }`}
            href={`/menu?category=${encodeURIComponent(target)}`}
            key={category}
            onClick={() => setSelected(category)}
          >
            <span className={`flex h-12 w-12 items-center justify-center rounded-full ${active ? "bg-white/20" : "bg-cream-deep text-orange"}`}>
              <Icon aria-hidden="true" size={23} strokeWidth={1.8} />
            </span>
            <span className="text-sm font-bold">{label}</span>
          </Link>
        );
      })}
    </div>
  );
}
