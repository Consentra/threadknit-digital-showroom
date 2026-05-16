import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Eye, Layers } from "lucide-react";
import { type Product } from "@/data/products";

interface ProductCardProps {
  product: Product;
  index: number;
}

const ProductCard = ({ product, index }: ProductCardProps) => {
  const { t } = useTranslation();
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ delay: index * 0.06, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -8 }}
      className="group relative bg-card rounded-sm overflow-hidden border border-border hover:border-accent/50 transition-all duration-500 hover:shadow-2xl hover:shadow-accent/10"
    >
      {/* Image */}
      <div className="relative aspect-[3/4] overflow-hidden bg-secondary">
        <motion.img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
          loading="lazy"
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        />

        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/60 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />

        {/* Specs badge - slides up on hover */}
        <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out p-5">
          <div className="flex items-center gap-2 mb-3">
            <Layers className="w-3.5 h-3.5 text-accent" />
            <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-accent font-semibold">
              {t("productCard.specs")}
            </p>
          </div>
          <div className="space-y-1.5">
            <p className="font-sans text-xs text-cream/90">{product.fabric}</p>
            <p className="font-sans text-sm font-bold text-accent">{product.gsm}</p>
            <div className="flex items-center gap-2 mt-2">
              <span className="px-2 py-0.5 bg-cream/10 rounded-sm font-sans text-[10px] text-cream/80 uppercase tracking-wider">
                {product.printEffect}
              </span>
              <span className="px-2 py-0.5 bg-cream/10 rounded-sm font-sans text-[10px] text-cream/80 uppercase tracking-wider">
                {product.color}
              </span>
            </div>
          </div>
        </div>

        {/* View icon - top right */}
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 delay-100">
          <div className="w-9 h-9 rounded-full bg-accent/90 flex items-center justify-center backdrop-blur-sm">
            <Eye className="w-4 h-4 text-accent-foreground" />
          </div>
        </div>

        {/* Subcategory badge */}
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-background/80 backdrop-blur-sm font-sans text-[10px] uppercase tracking-[0.15em] text-foreground/80 rounded-sm border border-border/50">
            {product.subcategory}
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="p-5 space-y-3">
        {/* Product Name */}
        <div>
          <p className="font-sans text-[9px] uppercase tracking-[0.25em] text-muted-foreground/70 font-semibold mb-1">
            Product Name
          </p>
          <h3 className="font-serif text-base font-semibold text-foreground leading-snug group-hover:text-accent transition-colors duration-300">
            {product.name}
          </h3>
        </div>

        {/* Fabrication */}
        <div>
          <p className="font-sans text-[9px] uppercase tracking-[0.25em] text-muted-foreground/70 font-semibold mb-1">
            Fabrication
          </p>
          <p className="font-sans text-xs text-foreground/85 leading-relaxed">
            {product.fabric}, {product.gsm}
          </p>
        </div>

        {/* Category */}
        <div>
          <p className="font-sans text-[9px] uppercase tracking-[0.25em] text-muted-foreground/70 font-semibold mb-1.5">
            Category
          </p>
          <div className="flex flex-wrap gap-1.5">
            {(product.fabrications && product.fabrications.length > 0
              ? product.fabrications
              : ["Knit"]
            ).map((f) => (
              <span
                key={`fab-${f}`}
                className="px-2 py-0.5 bg-accent/10 text-accent font-sans text-[10px] uppercase tracking-wider rounded-sm border border-accent/20"
              >
                {f}
              </span>
            ))}
            <span className="px-2 py-0.5 bg-secondary text-foreground/70 font-sans text-[10px] uppercase tracking-wider rounded-sm border border-border">
              {t(`categories.${product.category}`)}
            </span>
          </div>
        </div>

        {/* Description preview */}
        {product.description && (
          <p className="font-sans text-xs text-muted-foreground line-clamp-2 leading-relaxed pt-1 border-t border-border/50">
            {product.description}
          </p>
        )}

        {/* Tags */}
        {product.tags && product.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {product.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 bg-muted text-muted-foreground font-sans text-[9px] uppercase tracking-wider rounded-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ProductCard;
