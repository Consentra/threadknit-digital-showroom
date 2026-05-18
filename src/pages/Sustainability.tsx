import { motion } from "framer-motion";
import {
  Leaf,
  Recycle,
  ShieldCheck,
  Sprout,
  HeartHandshake,
  Award,
  Factory,
  Droplets,
  Sun,
  Wind,
  RotateCcw,
  Package,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import SEO from "@/components/SEO";
import sustainabilityHero from "@/assets/sustainability-hero.jpg";
import sustainabilityMaterials from "@/assets/sustainability-materials.jpg";
import sustainabilityField from "@/assets/sustainability-field.jpg";

const PILLARS = [
  { key: "manufacturing", icon: Factory },
  { key: "sourcing", icon: HeartHandshake },
  { key: "materials", icon: Sprout },
  { key: "quality", icon: ShieldCheck },
  { key: "environment", icon: Droplets },
  { key: "commitments", icon: Award },
] as const;

const PRINCIPLE_KEYS = ["p1", "p2", "p3", "p4"] as const;

const CIRCULAR = [
  { key: "s1", icon: Sprout },
  { key: "s2", icon: Factory },
  { key: "s3", icon: Package },
  { key: "s4", icon: RotateCcw },
] as const;

const WATER_CARDS = [
  { key: "c1", icon: Droplets },
  { key: "c2", icon: Sun },
  { key: "c3", icon: Wind },
] as const;

const Sustainability = () => {
  const { t } = useTranslation();

  return (
    <main className="bg-background">
      <SEO
        title={t("sustainability.seoTitle")}
        description={t("sustainability.seoDesc")}
        path="/sustainability"
      />

      {/* Hero with image */}
      <section className="relative pt-32 pb-24 overflow-hidden text-primary-foreground">
        <div className="absolute inset-0">
          <img
            src={sustainabilityHero}
            alt="Organic cotton yarn cones with a fresh leaf"
            className="w-full h-full object-cover"
            width={1920}
            height={1080}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/85 via-primary/75 to-primary/95" />
        </div>
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-accent/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-accent/10 rounded-full blur-3xl pointer-events-none" />
        <div className="container mx-auto px-6 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-accent/40 bg-primary/30 backdrop-blur-sm mb-6">
              <Leaf className="w-3.5 h-3.5 text-accent" />
              <span className="font-sans text-[11px] uppercase tracking-[0.25em] text-accent font-semibold">
                {t("sustainability.hero.badge")}
              </span>
            </div>
            <h1 className="font-serif text-4xl md:text-6xl font-bold leading-tight mb-6">
              {t("sustainability.hero.titleA")}{" "}
              <span className="text-accent italic">
                {t("sustainability.hero.titleHighlight")}
              </span>
            </h1>
            <p className="font-sans text-base md:text-lg text-primary-foreground/85 leading-relaxed">
              {t("sustainability.hero.subtitle")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pillars */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-8 h-px bg-accent" />
              <p className="font-sans text-[11px] uppercase tracking-[0.3em] text-accent font-semibold">
                {t("sustainability.pillarsSection.eyebrow")}
              </p>
              <div className="w-8 h-px bg-accent" />
            </div>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
              {t("sustainability.pillarsSection.title")}
            </h2>
            <p className="font-sans text-sm text-muted-foreground mt-4 max-w-2xl mx-auto">
              {t("sustainability.pillarsSection.subtitle")}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PILLARS.map((p, i) => (
              <motion.div
                key={p.key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: i * 0.06, duration: 0.5 }}
                className="group p-7 bg-card border border-border rounded-sm hover:border-accent/40 hover:shadow-xl hover:shadow-accent/5 transition-all duration-500"
              >
                <div className="w-12 h-12 rounded-sm bg-accent/10 text-accent flex items-center justify-center mb-5 group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
                  <p.icon className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-lg font-semibold text-foreground mb-2 group-hover:text-accent transition-colors">
                  {t(`sustainability.pillarsSection.items.${p.key}.title`)}
                </h3>
                <p className="font-sans text-sm text-muted-foreground leading-relaxed">
                  {t(`sustainability.pillarsSection.items.${p.key}.desc`)}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Principles strip */}
      <section className="py-16 bg-secondary/40">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {PRINCIPLE_KEYS.map((k, i) => (
              <motion.div
                key={k}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="text-center"
              >
                <p className="font-serif text-3xl md:text-4xl font-bold text-accent">
                  {t(`sustainability.principles.${k}.stat`)}
                </p>
                <p className="font-sans text-xs uppercase tracking-[0.2em] text-foreground font-semibold mt-2">
                  {t(`sustainability.principles.${k}.label`)}
                </p>
                <p className="font-sans text-xs text-muted-foreground mt-2 leading-relaxed">
                  {t(`sustainability.principles.${k}.desc`)}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Materials with image */}
      <section className="py-20">
        <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative rounded-sm overflow-hidden shadow-2xl shadow-primary/10 order-2 lg:order-1"
          >
            <img
              src={sustainabilityMaterials}
              alt="Folded organic cotton t-shirts in natural earth tones"
              className="w-full h-full object-cover aspect-[4/3]"
              loading="lazy"
              width={1400}
              height={1050}
            />
            <div className="absolute inset-0 ring-1 ring-inset ring-accent/10 pointer-events-none" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-1 lg:order-2"
          >
            <div className="flex items-center gap-2 mb-3">
              <Recycle className="w-4 h-4 text-accent" />
              <span className="font-sans text-[11px] uppercase tracking-[0.25em] text-accent font-semibold">
                {t("sustainability.materials.eyebrow")}
              </span>
            </div>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-5">
              {t("sustainability.materials.title")}
            </h2>
            <p className="font-sans text-sm text-muted-foreground leading-relaxed mb-4">
              {t("sustainability.materials.body")}
            </p>
            <ul className="space-y-3 font-sans text-sm text-foreground/80">
              {(["i1", "i2", "i3", "i4"] as const).map((k) => (
                <li key={k} className="flex items-start gap-3">
                  <span className="mt-2 w-1.5 h-1.5 bg-accent rounded-full shrink-0" />
                  {t(`sustainability.materials.${k}`)}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* Circular process */}
      <section className="py-20 bg-gradient-to-b from-background to-secondary/30">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-8 h-px bg-accent" />
              <p className="font-sans text-[11px] uppercase tracking-[0.3em] text-accent font-semibold">
                {t("sustainability.circular.eyebrow")}
              </p>
              <div className="w-8 h-px bg-accent" />
            </div>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
              {t("sustainability.circular.title")}
            </h2>
            <p className="font-sans text-sm text-muted-foreground mt-4 max-w-2xl mx-auto">
              {t("sustainability.circular.subtitle")}
            </p>
          </motion.div>

          <div className="relative">
            <div className="hidden lg:block absolute top-12 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {CIRCULAR.map((s, i) => (
                <motion.div
                  key={s.key}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="relative text-center"
                >
                  <div className="relative w-24 h-24 mx-auto mb-5">
                    <div className="absolute inset-0 rounded-full bg-accent/10 blur-xl" />
                    <div className="relative w-24 h-24 rounded-full bg-background border border-accent/30 flex items-center justify-center shadow-lg">
                      <s.icon className="w-9 h-9 text-accent" />
                    </div>
                    <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-accent text-accent-foreground font-sans text-xs font-bold flex items-center justify-center shadow-md">
                      {i + 1}
                    </span>
                  </div>
                  <h3 className="font-serif text-base font-semibold text-foreground mb-2">
                    {t(`sustainability.circular.${s.key}.title`)}
                  </h3>
                  <p className="font-sans text-xs text-muted-foreground leading-relaxed max-w-[220px] mx-auto">
                    {t(`sustainability.circular.${s.key}.desc`)}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Water & Resource Stewardship with image */}
      <section className="py-20">
        <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-2 mb-3">
              <Droplets className="w-4 h-4 text-accent" />
              <span className="font-sans text-[11px] uppercase tracking-[0.25em] text-accent font-semibold">
                {t("sustainability.water.eyebrow")}
              </span>
            </div>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-5">
              {t("sustainability.water.title")}
            </h2>
            <p className="font-sans text-sm text-muted-foreground leading-relaxed mb-6">
              {t("sustainability.water.body")}
            </p>
            <div className="grid grid-cols-3 gap-4">
              {WATER_CARDS.map((it) => (
                <div
                  key={it.key}
                  className="p-4 border border-border rounded-sm bg-card text-center hover:border-accent/40 transition-colors"
                >
                  <it.icon className="w-5 h-5 text-accent mx-auto mb-2" />
                  <p className="font-sans text-[11px] text-foreground/80 leading-tight">
                    {t(`sustainability.water.${it.key}`)}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative rounded-sm overflow-hidden shadow-2xl shadow-primary/20"
          >
            <img
              src={sustainabilityField}
              alt="Organic cotton field at golden hour"
              className="w-full h-full object-cover aspect-[4/3]"
              loading="lazy"
              width={1400}
              height={1050}
            />
            <div className="absolute inset-0 ring-1 ring-inset ring-accent/10 pointer-events-none" />
          </motion.div>
        </div>
      </section>

      {/* Commitment closer */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto p-10 md:p-14 bg-primary text-primary-foreground rounded-sm relative overflow-hidden"
          >
            <div className="absolute -top-16 -right-16 w-64 h-64 bg-accent/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-accent/10 rounded-full blur-3xl pointer-events-none" />
            <div className="relative">
              <div className="flex items-center gap-2 mb-3">
                <ShieldCheck className="w-4 h-4 text-accent" />
                <span className="font-sans text-[11px] uppercase tracking-[0.25em] text-accent font-semibold">
                  {t("sustainability.closer.eyebrow")}
                </span>
              </div>
              <h3 className="font-serif text-2xl md:text-3xl font-bold mb-4">
                {t("sustainability.closer.title")}
              </h3>
              <p className="font-sans text-sm md:text-base text-primary-foreground/80 leading-relaxed mb-6 max-w-2xl">
                {t("sustainability.closer.body")}
              </p>
              <p className="font-serif italic text-primary-foreground/85 text-base">
                {t("sustainability.closer.quote")}
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default Sustainability;
