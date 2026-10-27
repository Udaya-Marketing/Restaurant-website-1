"use client";

import { Plus } from "lucide-react";
import { type MenuItem } from "@/data/menu";
import { useCart } from "@/components/cart-provider";

export function AddToCartButton({ item }: { item: MenuItem }) {
  const { addItem } = useCart();
  return (
    <button
      className="focus-ring inline-flex items-center gap-2 rounded-full bg-orange px-6 py-3.5 text-sm font-bold text-white transition hover:bg-[#d9560c]"
      onClick={() => addItem(item)}
      type="button"
    >
      <Plus aria-hidden="true" size={17} /> Add to bag
    </button>
  );
}
