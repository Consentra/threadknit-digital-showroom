import { motion } from "framer-motion";
import { Layers3 } from "lucide-react";
import { fabricationTypes } from "@/data/products";

interface FabricationFilterProps {
  active: string;
  onChange: (id: string) => void;
}

const FabricationFilter = ({ active, onChange }: FabricationFilterProps) => {
  return (
    <div className="mb-10">
      <div className="flex items-center justify-center gap-2 mb-4">
        <Layers3 className="w-3.5 h-3.5 text-accent" />
        <p className="font-sans text-[10px] uppercase tracking-[0.25em] text-muted-foreground font-semibold">
          Filter by Fabrication
        </p>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-2">
        {fabricationTypes.map((f) => {
          const isActive = active === f.id;
          return (
            <button
              key={f.id}
              onClick={() => onChange(f.id)}
              className={`relative px-4 py-2 font-sans text-[11px] font-semibold uppercase tracking-[0.15em] rounded-sm border transition-colors ${
                isActive
                  ? "border-accent text-accent-foreground"
                  : "border-border text-muted-foreground hover:text-foreground hover:border-accent/40"
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="fab-bg"
                  className="absolute inset-0 bg-accent rounded-sm"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10">{f.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default FabricationFilter;
