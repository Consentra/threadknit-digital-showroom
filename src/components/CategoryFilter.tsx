import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { categories } from "@/data/products";

interface CategoryFilterProps {
  active: string;
  onChange: (id: string) => void;
}

const CategoryFilter = ({ active, onChange }: CategoryFilterProps) => {
  const { t } = useTranslation();
  return (
    <div className="sticky top-[60px] sm:top-[68px] z-40 bg-background/95 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 py-2 sm:py-2.5">

        <div className="flex items-center gap-2 overflow-x-auto scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onChange(cat.id)}
              className={`relative px-5 py-2.5 font-sans text-xs font-medium uppercase tracking-wider whitespace-nowrap rounded-sm transition-colors ${
                active === cat.id
                  ? "text-accent-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {active === cat.id && (
                <motion.div
                  layoutId="category-bg"
                  className="absolute inset-0 bg-accent rounded-sm"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10">{t(`categories.${cat.id}`)}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryFilter;
