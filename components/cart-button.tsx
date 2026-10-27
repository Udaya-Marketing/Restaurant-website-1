"use client";

import { ShoppingBag } from "lucide-react";
import { useCart } from "@/components/cart-provider";

export function CartButton() {
  const { itemCount, openCart } = useCart();

  return (
    <button
      aria-label={`Open shopping cart, ${itemCount} ${itemCount === 1 ? "item" : "items"}`}
      className="focus-ring relative inline-flex h-11 w-11 items-center justify-center rounded-full border border-ink/10 bg-white/70 transition hover:border-orange hover:text-orange"
      onClick={openCart}
      type="button"
    >
      <ShoppingBag aria-hidden="true" size={19} />
      <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-orange px-1 text-[10px] font-bold text-white">
        {itemCount}
      </span>
    </button>
  );
}
