import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";
import { Globe2 } from "lucide-react";
import { useTranslation } from "react-i18next";

const GEO_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

type Country = { name: string; coords: [number, number]; region: string };

const EXPORT_COUNTRIES: Country[] = [
  // Europe (modern / EU)
  { name: "United Kingdom", coords: [-2, 54], region: "Europe" },
  { name: "Ireland", coords: [-8, 53.4], region: "Europe" },
  { name: "Germany", coords: [10.4, 51.1], region: "Europe" },
  { name: "France", coords: [2.2, 46.6], region: "Europe" },
  { name: "Italy", coords: [12.5, 42.8], region: "Europe" },
  { name: "Spain", coords: [-3.7, 40.4], region: "Europe" },
  { name: "Netherlands", coords: [5.3, 52.1], region: "Europe" },
  { name: "Belgium", coords: [4.5, 50.6], region: "Europe" },
  { name: "Sweden", coords: [15.5, 60], region: "Europe" },
  { name: "Norway", coords: [9, 61], region: "Europe" },
  { name: "Denmark", coords: [9.5, 56], region: "Europe" },
  { name: "Finland", coords: [26, 64], region: "Europe" },
  { name: "Switzerland", coords: [8.2, 46.8], region: "Europe" },
  { name: "Austria", coords: [14.5, 47.5], region: "Europe" },
  { name: "Poland", coords: [19, 52], region: "Europe" },
  { name: "Portugal", coords: [-8, 39.5], region: "Europe" },
  // North America
  { name: "United States of America", coords: [-98, 39], region: "North America" },
  { name: "Canada", coords: [-106, 56], region: "North America" },
  // Middle East (developed)
  { name: "United Arab Emirates", coords: [54, 24], region: "Middle East" },
  { name: "Saudi Arabia", coords: [45, 24], region: "Middle East" },
  { name: "Qatar", coords: [51.2, 25.3], region: "Middle East" },
  { name: "Kuwait", coords: [47.5, 29.3], region: "Middle East" },
  { name: "Bahrain", coords: [50.6, 26], region: "Middle East" },
  { name: "Oman", coords: [56, 21], region: "Middle East" },
  { name: "Israel", coords: [35, 31.5], region: "Middle East" },
  // East Asia
  { name: "Japan", coords: [138, 36], region: "Asia" },
  { name: "South Korea", coords: [127.8, 36.5], region: "Asia" },
  // Oceania
  { name: "Australia", coords: [134, -25], region: "Oceania" },
  { name: "New Zealand", coords: [172, -41], region: "Oceania" },
  // Latin America (developed/selected)
  { name: "Brazil", coords: [-52, -10], region: "Latin America" },
  { name: "Mexico", coords: [-102, 23], region: "Latin America" },
  { name: "Chile", coords: [-71, -35], region: "Latin America" },
  { name: "Argentina", coords: [-64, -38], region: "Latin America" },
  // Africa (modern selected)
  { name: "South Africa", coords: [25, -29], region: "Africa" },
  { name: "Morocco", coords: [-6, 32], region: "Africa" },
];

const HIGHLIGHT_NAMES = new Set(EXPORT_COUNTRIES.map((c) => c.name));

const ExportMap = () => {
  const { t } = useTranslation();
  const [hovered, setHovered] = useState<Country | null>(null);
  const regions = Array.from(new Set(EXPORT_COUNTRIES.map((c) => c.region)));

  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-background via-secondary/30 to-background">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-px bg-accent" />
            <p className="font-sans text-[11px] uppercase tracking-[0.3em] text-accent font-semibold">
              {t("exportMap.eyebrow", "Global Reach")}
            </p>
            <div className="w-8 h-px bg-accent" />
          </div>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
            {t("exportMap.title", "Where We Source & Ship")}
          </h2>
          <p className="font-sans text-sm text-muted-foreground mt-4 max-w-xl mx-auto">
            {t(
              "exportMap.description",
              "Crafted in Bangladesh, delivered to discerning buyers across Europe, North America, the Middle East, Oceania, Latin America and Africa."
            )}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative bg-card/60 backdrop-blur-sm border border-border rounded-sm p-2 sm:p-6 shadow-lg overflow-hidden"
        >
          <div className="relative">
            <ComposableMap
              projectionConfig={{ scale: 155 }}
              width={980}
              height={480}
              style={{ width: "100%", height: "auto" }}
            >
              <Geographies geography={GEO_URL}>
                {({ geographies }) =>
                  geographies.map((geo) => {
                    const isExport = HIGHLIGHT_NAMES.has(geo.properties.name);
                    return (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        onMouseEnter={() => {
                          if (isExport) {
                            const c = EXPORT_COUNTRIES.find(
                              (e) => e.name === geo.properties.name
                            );
                            if (c) setHovered(c);
                          }
                        }}
                        onMouseLeave={() => setHovered(null)}
                        style={{
                          default: {
                            fill: isExport ? "hsl(42, 65%, 58%)" : "hsl(36, 20%, 88%)",
                            stroke: "hsl(40, 33%, 96%)",
                            strokeWidth: 0.4,
                            outline: "none",
                            transition: "fill 0.4s ease, transform 0.4s ease",
                          },
                          hover: {
                            fill: isExport ? "hsl(220, 40%, 18%)" : "hsl(36, 20%, 82%)",
                            outline: "none",
                            cursor: isExport ? "pointer" : "default",
                          },
                          pressed: { outline: "none" },
                        }}
                      />
                    );
                  })
                }
              </Geographies>
              {EXPORT_COUNTRIES.map((c, i) => {
                const isActive = hovered?.name === c.name;
                return (
                  <Marker key={c.name} coordinates={c.coords}>
                    {isActive && (
                      <circle
                        r={9}
                        fill="hsl(42, 65%, 55%)"
                        opacity={0.25}
                      >
                        <animate
                          attributeName="r"
                          from="4"
                          to="14"
                          dur="1.4s"
                          repeatCount="indefinite"
                        />
                        <animate
                          attributeName="opacity"
                          from="0.5"
                          to="0"
                          dur="1.4s"
                          repeatCount="indefinite"
                        />
                      </circle>
                    )}
                    <circle
                      r={isActive ? 4 : 3}
                      fill={isActive ? "hsl(42, 65%, 55%)" : "hsl(220, 40%, 18%)"}
                      stroke="hsl(40, 33%, 96%)"
                      strokeWidth={1.2}
                      style={{ transition: "all 0.3s ease" }}
                    />
                  </Marker>
                );
              })}
            </ComposableMap>

            <AnimatePresence>
              {hovered && (
                <motion.div
                  key={hovered.name}
                  initial={{ opacity: 0, y: -6, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-4 right-4 bg-primary text-primary-foreground px-4 py-2.5 rounded-sm shadow-xl pointer-events-none border border-accent/30"
                >
                  <p className="font-serif text-sm font-semibold">{hovered.name}</p>
                  <p className="font-sans text-[10px] uppercase tracking-wider text-accent mt-0.5">
                    {t(`exportMap.regions.${hovered.region}`, hovered.region)}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Region legend */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 pt-4 border-t border-border">
            <div className="flex items-center gap-2">
              <Globe2 className="w-4 h-4 text-accent" />
              <span className="font-sans text-xs uppercase tracking-wider text-muted-foreground">
                {EXPORT_COUNTRIES.length}+ {t("exportMap.countries")}
              </span>
            </div>
            {regions.map((r) => (
              <motion.div
                key={r}
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-2"
              >
                <span className="w-2 h-2 rounded-full bg-accent" />
                <span className="font-sans text-xs text-foreground/80">
                  {t(`exportMap.regions.${r}`, r)}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ExportMap;
