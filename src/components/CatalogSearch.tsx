import { Search, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

interface CatalogSearchProps {
  value: string;
  onChange: (value: string) => void;
  resultCount: number;
}

const CatalogSearch = ({ value, onChange, resultCount }: CatalogSearchProps) => {
  const { t } = useTranslation();

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className="relative max-w-md mx-auto mb-10"
    >
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={t("catalog.searchPlaceholder", "Search products by name, fabric, or style...")}
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
      {value && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="font-sans text-[11px] text-muted-foreground mt-2 text-center"
        >
          {resultCount} {resultCount === 1 ? "product" : "products"} found
        </motion.p>
      )}
    </motion.div>
  );
};

export default CatalogSearch;
