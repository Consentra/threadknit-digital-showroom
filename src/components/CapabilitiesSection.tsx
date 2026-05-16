import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  Compass,
  Factory,
  ShieldCheck,
  Truck,
  Layers,
  Sparkles,
} from "lucide-react";
import sourcingFlatlay from "@/assets/sourcing-flatlay.jpg";
import productionFloor from "@/assets/production-floor.jpg";

const CapabilitiesSection = () => {
  const { t } = useTranslation();

  const pillars = [
    { icon: Compass, key: "sourcing" },
    { icon: Layers, key: "development" },
    { icon: Factory, key: "production" },
    { icon: ShieldCheck, key: "quality" },
    { icon: Truck, key: "logistics" },
    { icon: Sparkles, key: "value" },
  ] as const;

  const stats = [
    { value: "140–350", label: t("capabilities.stats.gsm", "GSM Fabric Range") },
    { value: "20+", label: t("capabilities.stats.countries", "Export Destinations") },
    { value: "5", label: t("capabilities.stats.categories", "Apparel Categories") },
    { value: "24h", label: t("capabilities.stats.response", "Response Time") },
  ];

  return (
    <section className="relative py-20 md:py-28 bg-background overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6 relative">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <div className="inline-flex items-center gap-3 mb-5">
            <div className="w-8 h-px bg-accent" />
            <p className="font-sans text-[11px] uppercase tracking-[0.3em] text-accent font-semibold">
              {t("capabilities.eyebrow", "What We Do")}
            </p>
            <div className="w-8 h-px bg-accent" />
          </div>
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-foreground leading-[1.1]">
            {t("capabilities.title1", "A Buying & Liaison House")}{" "}
            <span className="text-accent italic">
              {t("capabilities.title2", "for Global Brands")}
            </span>
          </h2>
          <p className="font-sans text-sm md:text-base text-muted-foreground mt-5 leading-relaxed">
            {t(
              "capabilities.description",
              "From sourcing and product development to production oversight and on-time shipment — we bridge international buyers with trusted Bangladesh manufacturing. Knit is our core strength; our network spans woven, sweater, leather and lingerie."
            )}
          </p>
        </motion.div>

        {/* Two-image collage with floating stats */}
        <div className="grid lg:grid-cols-12 gap-6 mb-16 items-stretch">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7 relative rounded-sm overflow-hidden shadow-xl shadow-primary/10 group"
          >
            <img
              src={sourcingFlatlay}
              alt="Premium garment sourcing flat lay with knit swatches, yarn and sketches"
              loading="lazy"
              width={1600}
              height={1024}
              className="w-full h-full object-cover aspect-[16/10] group-hover:scale-[1.03] transition-transform duration-[1.2s] ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 via-transparent to-transparent" />
            <div className="absolute bottom-5 left-5 right-5">
              <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-accent font-semibold mb-1">
                {t("capabilities.collage.sourcingEyebrow", "Sourcing & Development")}
              </p>
              <p className="font-serif text-base md:text-lg text-cream font-semibold">
                {t(
                  "capabilities.collage.sourcingTitle",
                  "Curated fabrics. Honest tech packs. Real samples."
                )}
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="lg:col-span-5 relative rounded-sm overflow-hidden shadow-xl shadow-primary/10 group"
          >
            <img
              src={productionFloor}
              alt="Modern garment production floor with stacks of knit fabric"
              loading="lazy"
              width={1400}
              height={1050}
              className="w-full h-full object-cover aspect-[16/10] lg:aspect-auto group-hover:scale-[1.03] transition-transform duration-[1.2s] ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 via-transparent to-transparent" />
            <div className="absolute bottom-5 left-5 right-5">
              <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-accent font-semibold mb-1">
                {t("capabilities.collage.productionEyebrow", "Production Oversight")}
              </p>
              <p className="font-serif text-base md:text-lg text-cream font-semibold">
                {t(
                  "capabilities.collage.productionTitle",
                  "On the floor with every order."
                )}
              </p>
            </div>
          </motion.div>
        </div>

        {/* Stat strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border rounded-sm overflow-hidden border border-border mb-16"
        >
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 + i * 0.08 }}
              className="bg-card p-6 text-center"
            >
              <p className="font-serif text-2xl md:text-3xl font-bold text-accent">
                {s.value}
              </p>
              <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-muted-foreground mt-2 leading-tight">
                {s.label}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Pillars grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {pillars.map((p, i) => {
            const Icon = p.icon;
            return (
              <motion.div
                key={p.key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: i * 0.06, duration: 0.5 }}
                whileHover={{ y: -3 }}
                className="group p-6 bg-card border border-border rounded-sm hover:border-accent/40 hover:shadow-lg transition-all duration-500"
              >
                <div className="w-11 h-11 rounded-sm bg-accent/10 text-accent flex items-center justify-center mb-4 group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-base font-semibold text-foreground mb-1.5 group-hover:text-accent transition-colors">
                  {t(`capabilities.pillars.${p.key}.title`)}
                </h3>
                <p className="font-sans text-xs text-muted-foreground leading-relaxed">
                  {t(`capabilities.pillars.${p.key}.desc`)}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CapabilitiesSection;
