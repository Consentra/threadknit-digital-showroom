import { useState, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { Download } from "lucide-react";
import CategoryFilter from "@/components/CategoryFilter";
import ProductCard from "@/components/ProductCard";
import CatalogSearch from "@/components/CatalogSearch";
import SEO from "@/components/SEO";
import { useCatalog } from "@/hooks/useCatalog";
import { Skeleton } from "@/components/ui/skeleton";

const CATALOG_URL =
  "https://docs.google.com/document/d/1SZmRhewkOgFO-6CXPerl-suFlkVBrQ1CpRhLlxEw5AA/edit?usp=drivesdk";
const PAGE_SIZE = 12;

const Catalog = () => {
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeFabrication, setActiveFabrication] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const { products, loading, error } = useCatalog();

  const catalogLinks = [
    { label: t("catalog.ladies"), href: CATALOG_URL, category: "ladies" },
    { label: t("catalog.mens"), href: CATALOG_URL, category: "mens" },
    { label: t("catalog.children"), href: CATALOG_URL, category: "children" },
  ];

  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [activeCategory, activeFabrication, searchQuery]);

  const filtered = useMemo(() => {
    let result =
      activeCategory === "all"
        ? products
        : products.filter((p) => p.category === activeCategory);

    if (activeFabrication !== "all") {
      result = result.filter(
        (p) =>
          Array.isArray(p.fabrications) &&
          p.fabrications.includes(activeFabrication as any)
      );
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.fabric.toLowerCase().includes(q) ||
          p.subcategory.toLowerCase().includes(q) ||
          p.printEffect.toLowerCase().includes(q) ||
          p.color.toLowerCase().includes(q) ||
          (p.description && p.description.toLowerCase().includes(q)) ||
          (p.tags && p.tags.some((tag) => tag.toLowerCase().includes(q))) ||
          (p.fabrications && p.fabrications.some((f) => f.toLowerCase().includes(q)))
      );
    }

    return result;
  }, [products, activeCategory, activeFabrication, searchQuery]);

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;
  const remaining = filtered.length - visibleCount;

  const visibleCatalogLinks =
    activeCategory === "all"
      ? catalogLinks
      : catalogLinks.filter((c) => c.category === activeCategory);

  return (
    <main className="pt-20">
      <SEO
        title="Catalog | ThreadKnit Premium Knitwear Collections"
        description="Browse the complete ThreadKnit catalog: ladies', men's and children's knitwear in cotton, fleece, terry and pique fabrics — 140 to 350 GSM."
        path="/catalog"
      />

      {/* Page Hero */}
      <section className="bg-primary text-primary-foreground py-16 md:py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "3rem" }}
            transition={{ delay: 0.1, duration: 0.8 }}
            className="h-px bg-accent mb-6"
          />
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="font-sans text-[11px] uppercase tracking-[0.4em] text-accent mb-4"
          >
            {t("catalog.eyebrow")}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.6 }}
            className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold max-w-3xl leading-[1.1]"
          >
            {t("catalog.title")}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.6 }}
            className="font-sans text-sm md:text-base text-primary-foreground/70 mt-5 max-w-xl leading-relaxed"
          >
            {t("catalog.description")}
          </motion.p>
        </div>
      </section>

      <section id="products">
        <CategoryFilter active={activeCategory} onChange={setActiveCategory} />

        <div className="container mx-auto px-6 py-16">
          {/* Catalog Download Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-wrap items-center justify-center gap-3 mb-10"
          >
            {visibleCatalogLinks.map((cat) => (
              <a
                key={cat.category}
                href={cat.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 border border-accent/30 text-accent font-sans text-[11px] font-semibold uppercase tracking-wider rounded-sm hover:bg-accent hover:text-accent-foreground transition-all duration-300"
              >
                <Download className="w-3.5 h-3.5" />
                {cat.label}
              </a>
            ))}
          </motion.div>

          {!loading && !error && products.length > 0 && (
            <CatalogSearch
              value={searchQuery}
              onChange={setSearchQuery}
              resultCount={filtered.length}
            />
          )}

          {!loading && !error && products.length > 0 && (
            <FabricationFilter
              active={activeFabrication}
              onChange={setActiveFabrication}
            />
          )}

          {loading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="rounded-sm overflow-hidden border border-border bg-card"
                >
                  <Skeleton className="aspect-[3/4] w-full" />
                  <div className="p-5 space-y-3">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-3 w-full" />
                    <Skeleton className="h-3 w-1/2" />
                    <div className="flex gap-2 pt-1">
                      <Skeleton className="h-5 w-16 rounded-sm" />
                      <Skeleton className="h-5 w-12 rounded-sm" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {!loading && error && (
            <div className="text-center py-16">
              <p className="font-sans text-sm text-muted-foreground">
                Unable to load the catalog right now. Please refresh the page.
              </p>
            </div>
          )}

          {!loading && !error && filtered.length === 0 && (
            <div className="text-center py-16">
              <p className="font-sans text-sm text-muted-foreground">
                {searchQuery
                  ? `No products matching "${searchQuery}". Try a different search term.`
                  : "No products available in this collection yet."}
              </p>
            </div>
          )}

          {!loading && !error && filtered.length > 0 && (
            <>
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${activeCategory}-${activeFabrication}-${searchQuery}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                >
                  {visible.map((product, i) => (
                    <ProductCard key={product.id} product={product} index={i} />
                  ))}
                </motion.div>
              </AnimatePresence>

              {hasMore && (
                <div className="flex flex-col items-center gap-3 mt-12">
                  <button
                    onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
                    className="inline-flex items-center gap-2 px-8 py-3 border border-accent/40 text-accent font-sans text-[11px] font-semibold uppercase tracking-[0.2em] rounded-sm hover:bg-accent hover:text-accent-foreground transition-all duration-300"
                  >
                    Load More
                  </button>
                  <p className="font-sans text-[11px] text-muted-foreground">
                    Showing {visible.length} of {filtered.length} products
                    {remaining > 0 && ` · ${remaining} more`}
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </main>
  );
};

export default Catalog;
