import { useEffect, useState } from "react";
import type { Product, FabricationType } from "@/data/products";

const VALID_TYPES: FabricationType[] = [
  "Knit",
  "Woven",
  "Leather",
  "Sweater",
  "Lingerie",
];

/**
 * Normalize a raw product entry from catalog.json into the shape the UI
 * expects. Accepts both the clean schema (`type`, `print`) and the legacy
 * schema (`fabrications`, `printEffect`, `gsm`).
 */
function normalize(raw: any): Product | null {
  if (!raw || !raw.id || !raw.name || !raw.image) return null;

  // Product type / fabrications
  let fabrications: FabricationType[] = [];
  if (Array.isArray(raw.fabrications)) {
    fabrications = raw.fabrications.filter((f: any) =>
      VALID_TYPES.includes(f as FabricationType)
    );
  } else if (typeof raw.type === "string") {
    if (VALID_TYPES.includes(raw.type as FabricationType)) {
      fabrications = [raw.type as FabricationType];
    }
  }
  if (fabrications.length === 0) fabrications = ["Knit"];

  // Fabric (optionally merge legacy gsm)
  let fabric: string = raw.fabric ?? "";
  if (raw.gsm && !fabric.includes(raw.gsm)) {
    fabric = fabric ? `${fabric} · ${raw.gsm}` : raw.gsm;
  }

  const print: string = raw.print ?? raw.printEffect ?? "";

  return {
    id: String(raw.id),
    name: String(raw.name),
    image: String(raw.image),
    category: raw.category ?? "ladies",
    fabric,
    color: raw.color ?? "",
    print,
    printEffect: print, // back-compat field
    fabrications,
    tags: Array.isArray(raw.tags) ? raw.tags : undefined,
    subcategory: raw.subcategory,
    description: raw.description,
  };
}

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
    fetch(`${base}catalog.json?ts=${Date.now()}`, { cache: "no-store" })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (cancelled) return;
        const list = Array.isArray(data) ? data : data?.products;
        const normalized = Array.isArray(list)
          ? (list.map(normalize).filter(Boolean) as Product[])
          : [];
        setProducts(normalized);
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
