import { useEffect, useState } from "react";
import type { Product } from "@/data/products";

/**
 * Fetches the catalog from /catalog.json (a static file served from the public
 * folder). On cPanel, place catalog.json inside public_html and edit it via the
 * File Manager — changes appear after a page refresh.
 */
export function useCatalog() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    const base = import.meta.env.BASE_URL || "/";
    // cache-bust so admin edits show up on refresh without a hard reload
    fetch(`${base}catalog.json?ts=${Date.now()}`, { cache: "no-store" })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (cancelled) return;
        const list = Array.isArray(data) ? data : data?.products;
        setProducts(Array.isArray(list) ? list : []);
      })
      .catch((err) => {
        if (cancelled) return;
        console.error("Failed to load catalog.json", err);
        setError(err.message || "Failed to load catalog");
        setProducts([]);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return { products, loading, error };
}
