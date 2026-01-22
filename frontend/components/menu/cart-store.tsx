// frontend/components/menu/cart-store.tsx
"use client";

import React, { createContext, useContext, useMemo, useState } from "react";
import type { CatalogProduct } from "./catalog";

export type CartItem = CatalogProduct & { quantity: number };

type CartContextType = {
  items: CartItem[];
  addItem: (p: CatalogProduct) => void;
  removeItem: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
  subtotal: number;
};

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  function addItem(p: CatalogProduct) {
    setItems((prev) => {
      const found = prev.find((x) => x.id === p.id);
      if (found) {
        return prev.map((x) =>
          x.id === p.id ? { ...x, quantity: x.quantity + 1 } : x
        );
      }
      return [...prev, { ...p, quantity: 1 }];
    });
  }

  function removeItem(id: string) {
    setItems((prev) => prev.filter((x) => x.id !== id));
  }

  function setQty(id: string, qty: number) {
    const safe = Math.max(1, Math.min(50, qty));
    setItems((prev) =>
      prev.map((x) => (x.id === id ? { ...x, quantity: safe } : x))
    );
  }

  function clear() {
    setItems([]);
  }

  const subtotal = useMemo(() => {
    return items.reduce((acc, it) => acc + it.price * it.quantity, 0);
  }, [items]);

  const value = useMemo(
    () => ({ items, addItem, removeItem, setQty, clear, subtotal }),
    [items, subtotal]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
