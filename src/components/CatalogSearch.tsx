import { Search, X, SlidersHorizontal, Check } from "lucide-react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { fabricationTypes } from "@/data/products";

interface CatalogSearchProps {
  value: string;
  onChange: (value: string) => void;
  resultCount: number;
  activeFabrication: string;
  onFabricationChange: (id: string) => void;
}

const CatalogSearch = ({
  value,
  onChange,
  resultCount,
  activeFabrication,
  onFabricationChange,
}: CatalogSearchProps) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onEsc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onEsc);
    };
  }, [open]);

  const activeLabel =
    activeFabrication === "all"
      ? t("productCard.allTypes")
      : fabricationTypes.find((f) => f.id === activeFabrication)?.label ??
        t("productCard.allTypes");

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className="relative max-w-xl mx-auto mb-10"
    >
      <div className="flex items-stretch gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={t("catalog.searchPlaceholder")}
            className="w-full pl-11 pr-10 py-3 bg-card border border-border rounded-sm font-sans text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-1 focus:ring-accent/50 focus:border-accent/50 transition-all duration-300"
          />
          {value && (
            <button
              onClick={() => onChange("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center rounded-full bg-muted hover:bg-accent/20 transition-colors"
              aria-label="Clear search"
            >
              <X className="w-3 h-3 text-muted-foreground" />
            </button>
          )}
        </div>

        <div className="relative" ref={ref}>
          <button
            onClick={() => setOpen((o) => !o)}
            className={`h-full flex items-center gap-2 px-4 border rounded-sm font-sans text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
              activeFabrication !== "all" || open
                ? "border-accent bg-accent text-accent-foreground"
                : "border-border bg-card text-foreground hover:border-accent/40"
            }`}
            aria-label={t("catalog.filterByType")}
            aria-expanded={open}
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span className="hidden sm:inline">{t("catalog.filterLabel")}</span>
            {activeFabrication !== "all" && (
              <span className="hidden sm:inline-flex items-center justify-center min-w-5 h-5 px-1.5 text-[10px] rounded-full bg-background/20">
                1
              </span>
            )}
          </button>

          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0, y: -6, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -6, scale: 0.98 }}
                transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                className="absolute right-0 top-full mt-2 w-56 bg-card border border-border rounded-sm shadow-2xl shadow-black/20 z-50 overflow-hidden"
              >
                <div className="px-3 py-2 border-b border-border">
                  <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-semibold">
                    {t("catalog.filterByType")}
                  </p>
                </div>
                <div className="py-1">
                  {fabricationTypes.map((f) => {
                    const isActive = activeFabrication === f.id;
                    const label =
                      f.id === "all" ? t("productCard.allTypes") : f.label;
                    return (
                      <button
                        key={f.id}
                        onClick={() => {
                          onFabricationChange(f.id);
                          setOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2 font-sans text-xs transition-colors ${
                          isActive
                            ? "text-accent bg-accent/10 font-semibold"
                            : "text-foreground hover:bg-accent/5"
                        }`}
                      >
                        <span>{label}</span>
                        {isActive && <Check className="w-3.5 h-3.5" />}
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {value && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="font-sans text-[11px] text-muted-foreground mt-2 text-center"
        >
          {resultCount}{" "}
          {resultCount === 1
            ? t("catalog.productFound")
            : t("catalog.productsFound")}
        </motion.p>
      )}
    </motion.div>
  );
};

export default CatalogSearch;
