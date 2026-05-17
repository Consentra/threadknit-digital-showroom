import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Eye, EyeOff } from "lucide-react";
import { type Product } from "@/data/products";

interface ProductCardProps {
  product: Product;
  index: number;
}

const NONE_VALUES = new Set(["none", "n/a", "na", "-", ""]);
const isNone = (v?: string) =>
  !v || NONE_VALUES.has(v.trim().toLowerCase());

const ProductCard = ({ product, index }: ProductCardProps) => {
  const { t } = useTranslation();
  const [showSpecs, setShowSpecs] = useState(false);

  const productType =
    (product.fabrications && product.fabrications[0]) || "Knit";

  const specs: { label: string; value: string }[] = [];
  if (!isNone(product.fabric)) {
    const fab = product.gsm
      ? `${product.fabric} · ${product.gsm}`
      : product.fabric;
    specs.push({ label: t("productCard.fabrication"), value: fab });
  }
  if (!isNone(product.color))
    specs.push({ label: t("productCard.color"), value: product.color });
  if (!isNone(product.printEffect))
    specs.push({ label: t("productCard.print"), value: product.printEffect });

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        delay: index * 0.05,
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ y: -6 }}
      className="group relative bg-card rounded-sm overflow-hidden border border-border hover:border-accent/50 transition-all duration-500 hover:shadow-2xl hover:shadow-accent/10"
    >
      {/* Image */}
      <button
        type="button"
        onClick={() => setShowSpecs((s) => !s)}
        className="relative block w-full aspect-[3/4] overflow-hidden bg-secondary text-left focus:outline-none focus:ring-2 focus:ring-accent/50"
        aria-label={showSpecs ? t("productCard.hideSpecs") : t("productCard.viewSpecs")}
        aria-expanded={showSpecs}
      >
        <motion.img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
          loading="lazy"
          animate={{ scale: showSpecs ? 1.05 : 1 }}
          whileHover={{ scale: showSpecs ? 1.08 : 1.06 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        />

        {/* Product-type badge (top-left) */}
        <div className="absolute top-3 left-3 z-10">
          <span className="px-2.5 py-1 bg-background/85 backdrop-blur-sm font-sans text-[10px] uppercase tracking-[0.18em] text-foreground rounded-sm border border-border/60">
            {productType}
          </span>
        </div>

        {/* Eye toggle (top-right) */}
        <motion.div
          className="absolute top-3 right-3 z-10"
          initial={false}
          animate={{ opacity: showSpecs ? 1 : 0.85 }}
        >
          <div
            role="presentation"
            className={`w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-sm transition-colors duration-300 ${
              showSpecs
                ? "bg-accent text-accent-foreground"
                : "bg-background/80 text-foreground/80 group-hover:bg-accent/90 group-hover:text-accent-foreground"
            }`}
          >
            <AnimatePresence mode="wait" initial={false}>
              {showSpecs ? (
                <motion.span
                  key="off"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="inline-flex"
                >
                  <EyeOff className="w-4 h-4" />
                </motion.span>
              ) : (
                <motion.span
                  key="on"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="inline-flex"
                >
                  <Eye className="w-4 h-4" />
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Technical Specs overlay */}
        <AnimatePresence>
          {showSpecs && (
            <motion.div
              key="specs"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="absolute inset-0 bg-gradient-to-t from-navy via-navy/85 to-navy/55 flex flex-col justify-end p-5"
            >
              <motion.div
                initial={{ y: 24, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 16, opacity: 0 }}
                transition={{ delay: 0.05, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <p className="font-sans text-[10px] uppercase tracking-[0.25em] text-accent font-semibold mb-3">
                  {t("productCard.specs")}
                </p>
                <div className="space-y-2.5">
                  {specs.map((s) => (
                    <div key={s.label}>
                      <p className="font-sans text-[9px] uppercase tracking-[0.2em] text-cream/60">
                        {s.label}
                      </p>
                      <p className="font-sans text-xs text-cream/95 leading-snug">
                        {s.value}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </button>

      {/* Minimal info */}
      <div className="p-5 space-y-2">
        <h3 className="font-serif text-base font-semibold text-foreground leading-snug group-hover:text-accent transition-colors duration-300">
          {product.name}
        </h3>
        <p className="font-sans text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
          {t(`categories.${product.category}`)}
        </p>
      </div>
    </motion.div>
  );
};

export default ProductCard;
