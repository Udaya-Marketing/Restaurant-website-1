"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { Minus, Plus, ShoppingBag, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { formatPrice, getMenuItem, type MenuItem } from "@/data/menu";
import { site } from "@/lib/site";

type CartLine = { item: MenuItem; quantity: number };
type CartContextValue = {
  lines: CartLine[];
  itemCount: number;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (item: MenuItem) => void;
  updateQuantity: (slug: string, quantity: number) => void;
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "goodfire-cart-v1";
const EMPTY_CART: CartLine[] = [];
let cartSnapshot: CartLine[] | null = null;
const cartListeners = new Set<() => void>();

function readCart(): CartLine[] {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (!saved) return EMPTY_CART;
    const parsed: unknown = JSON.parse(saved);
    if (!Array.isArray(parsed)) return EMPTY_CART;
    return parsed.flatMap((line): CartLine[] => {
      if (typeof line !== "object" || line === null || !("item" in line) || !("quantity" in line)) return [];
      if (
        typeof line.item !== "object" ||
        line.item === null ||
        !("slug" in line.item) ||
        typeof line.item.slug !== "string" ||
        typeof line.quantity !== "number" ||
        !Number.isSafeInteger(line.quantity) ||
        line.quantity < 1
      ) {
        return [];
      }
      const item = getMenuItem(line.item.slug);
      return item ? [{ item, quantity: line.quantity }] : [];
    });
  } catch (error) {
    console.error("Could not load the saved cart.", error);
    return EMPTY_CART;
  }
}

function getCartSnapshot(): CartLine[] {
  if (typeof window === "undefined") return EMPTY_CART;
  cartSnapshot ??= readCart();
  return cartSnapshot;
}

function subscribeToCart(listener: () => void) {
  cartListeners.add(listener);
  return () => {
    cartListeners.delete(listener);
  };
}

function updateCart(update: (current: CartLine[]) => CartLine[]) {
  cartSnapshot = update(getCartSnapshot());
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(cartSnapshot));
  } catch (error) {
    console.error("Could not save the cart.", error);
  }
  cartListeners.forEach((listener) => listener());
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const lines = useSyncExternalStore(subscribeToCart, getCartSnapshot, () => EMPTY_CART);
  const [isOpen, setIsOpen] = useState(false);
  const returnFocusRef = useRef<HTMLElement | null>(null);
  const addItem = useCallback((item: MenuItem) => {
    returnFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    updateCart((current) => {
      const existing = current.find((line) => line.item.slug === item.slug);
      return existing
        ? current.map((line) =>
            line.item.slug === item.slug ? { ...line, quantity: line.quantity + 1 } : line,
          )
        : [...current, { item, quantity: 1 }];
    });
    setIsOpen(true);
  }, []);

  const updateQuantity = useCallback((slug: string, quantity: number) => {
    updateCart((current) =>
      quantity <= 0
        ? current.filter((line) => line.item.slug !== slug)
        : current.map((line) => (line.item.slug === slug ? { ...line, quantity } : line)),
    );
  }, []);

  const closeCart = useCallback(() => {
    setIsOpen(false);
    requestAnimationFrame(() => returnFocusRef.current?.focus());
  }, []);
  const openCart = useCallback(() => {
    returnFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    setIsOpen(true);
  }, []);
  const itemCount = lines.reduce((count, line) => count + line.quantity, 0);
  const value = useMemo(
    () => ({ lines, itemCount, isOpen, openCart, closeCart, addItem, updateQuantity }),
    [lines, itemCount, isOpen, openCart, closeCart, addItem, updateQuantity],
  );

  return (
    <CartContext.Provider value={value}>
      {children}
      <CartDrawer />
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside CartProvider.");
  return context;
}

function CartDrawer() {
  const { lines, isOpen, closeCart, updateQuantity } = useCart();
  const total = lines.reduce((sum, line) => sum + line.item.price * line.quantity, 0);
  const orderBody = [
    ...lines.map(({ item, quantity }) => `${quantity} × ${item.name} — ${formatPrice(item.price * quantity)}`),
    "",
    `Subtotal: ${formatPrice(total)}`,
  ].join("\n");
  const orderEmail = `mailto:${site.email}?subject=${encodeURIComponent("Goodfire order request")}&body=${encodeURIComponent(orderBody)}`;

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeCart();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, closeCart]);

  return (
    <div className={isOpen ? "fixed inset-0 z-[70]" : "pointer-events-none fixed inset-0 z-[70]"}>
      <button
        aria-label="Close shopping cart"
        className={`absolute inset-0 bg-ink/35 transition-opacity ${isOpen ? "opacity-100" : "opacity-0"}`}
        onClick={closeCart}
        tabIndex={isOpen ? 0 : -1}
      />
      <aside
        aria-label="Your shopping cart"
        aria-modal={isOpen || undefined}
        className={`absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-cream px-6 py-6 shadow-2xl transition-transform duration-300 sm:px-8 ${isOpen ? "translate-x-0" : "translate-x-full"}`}
        inert={!isOpen}
        role="dialog"
      >
        <div className="flex items-center justify-between border-b border-ink/10 pb-5">
          <div>
            <p className="eyebrow">Good choices</p>
            <h2 className="display-heading mt-1 text-3xl">Your bag</h2>
          </div>
          <button
            aria-label="Close shopping cart"
            className="focus-ring rounded-full p-2 hover:bg-cream-deep"
            onClick={closeCart}
          >
            <X aria-hidden="true" size={22} />
          </button>
        </div>
        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center text-center">
            <ShoppingBag aria-hidden="true" className="text-orange" size={38} />
            <p className="display-heading mt-4 text-2xl">Room for something good.</p>
            <p className="mt-2 text-sm text-muted">Your next favorite is just around the corner.</p>
            <Link
              className="focus-ring mt-6 rounded-full bg-ink px-6 py-3 text-sm font-bold text-white"
              href="/menu"
              onClick={closeCart}
            >
              Explore the menu
            </Link>
          </div>
        ) : (
          <>
            <ul className="flex-1 divide-y divide-ink/10 overflow-y-auto">
              {lines.map(({ item, quantity }) => (
                <li className="flex gap-4 py-5" key={item.slug}>
                  <Image
                    alt={item.imageAlt}
                    className="h-20 w-20 rounded-2xl bg-cream-deep object-contain p-1"
                    height={96}
                    src={item.image}
                    width={96}
                  />
                  <div className="flex min-w-0 flex-1 flex-col justify-center">
                    <p className="font-bold">{item.name}</p>
                    <p className="mt-1 text-sm font-semibold tabular-nums text-orange">
                      {formatPrice(item.price)}
                    </p>
                    <div className="mt-3 flex w-fit items-center gap-3 rounded-full border border-ink/15 px-2 py-1">
                      <button
                        aria-label={`Remove one ${item.name}`}
                        className="focus-ring rounded-full p-1"
                        onClick={() => updateQuantity(item.slug, quantity - 1)}
                      >
                        <Minus aria-hidden="true" size={14} />
                      </button>
                      <span className="min-w-4 text-center text-sm tabular-nums">{quantity}</span>
                      <button
                        aria-label={`Add one ${item.name}`}
                        className="focus-ring rounded-full p-1"
                        onClick={() => updateQuantity(item.slug, quantity + 1)}
                      >
                        <Plus aria-hidden="true" size={14} />
                      </button>
                    </div>
                  </div>
                  <p className="pt-1 text-sm font-semibold tabular-nums">
                    {formatPrice(item.price * quantity)}
                  </p>
                </li>
              ))}
            </ul>
            <div className="border-t border-ink/10 pt-5">
              <div className="flex justify-between text-lg font-bold">
                <span>Subtotal</span>
                <span className="tabular-nums">{formatPrice(total)}</span>
              </div>
              <p className="mt-2 text-xs text-muted">Taxes and any delivery fees are calculated at checkout.</p>
              <a className="focus-ring mt-5 flex items-center justify-center rounded-full bg-orange px-6 py-4 font-bold text-white transition hover:bg-[#d9560c]" href={orderEmail}>
                Send order request by email
              </a>
              <a className="focus-ring mt-3 block rounded py-1 text-center text-sm font-semibold text-muted hover:text-orange" href={`tel:${site.telephone}`}>Prefer to call? {site.telephone}</a>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
