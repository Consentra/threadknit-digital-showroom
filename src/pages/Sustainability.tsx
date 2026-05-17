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
import SEO from "@/components/SEO";
import sustainabilityHero from "@/assets/sustainability-hero.jpg";
import { useTranslation } from "react-i18next";
import sustainabilityMaterials from "@/assets/sustainability-materials.jpg";
import sustainabilityField from "@/assets/sustainability-field.jpg";

const pillars = [
  {
    icon: Factory,
    title: "Sustainable Manufacturing",
    desc: "Modern, energy-conscious facilities with optimized workflows that reduce waste, water and power consumption across the production cycle.",
  },
  {
    icon: HeartHandshake,
    title: "Ethical Sourcing",
    desc: "Long-term partnerships with mills and suppliers that respect fair labor practices, safe working conditions and transparent traceability.",
  },
  {
    icon: Sprout,
    title: "Eco-Friendly Materials",
    desc: "A growing range of organic cotton, recycled blends and low-impact fibers — chosen for durability and a smaller environmental footprint.",
  },
  {
    icon: ShieldCheck,
    title: "Quality & Compliance",
    desc: "Multi-stage quality inspections aligned with internationally recognized standards, from raw fabric to final packaging.",
  },
  {
    icon: Droplets,
    title: "Environmental Responsibility",
    desc: "Water-efficient dyeing, responsible chemical management and continuous investment in cleaner processes to minimize our footprint.",
  },
  {
    icon: Award,
    title: "Ongoing Commitments",
    desc: "We benchmark ourselves against industry-recognized frameworks and work toward higher standards every season — step by step, honestly.",
  },
];

const principles = [
  { stat: "100%", label: "Buyer-aligned", desc: "Sustainability decisions made together with our partners." },
  { stat: "Multi-stage", label: "Quality Oversight", desc: "From yarn inspection to final packaging." },
  { stat: "Lower-impact", label: "Material Choices", desc: "Organic, recycled and responsibly sourced fibers." },
  { stat: "Continuous", label: "Improvement", desc: "Every season, measurable steps forward." },
];

const circularSteps = [
  { icon: Sprout, title: "Responsible Sourcing", desc: "Organic and certified fibers chosen at the field level." },
  { icon: Factory, title: "Cleaner Production", desc: "Energy-efficient knitting and low-impact dyeing." },
  { icon: Package, title: "Mindful Packaging", desc: "Recyclable and right-sized packaging to reduce waste." },
  { icon: RotateCcw, title: "Recycle & Reuse", desc: "Off-cuts and yarn waste reintroduced into the supply chain." },
];

const Sustainability = () => {
  return (
    <main className="bg-background">
      <SEO
        title="Sustainability | ThreadKnit"
        description="ThreadKnit's commitment to sustainable manufacturing, ethical sourcing, eco-friendly materials and responsible knitwear production."
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
                Sustainability
              </span>
            </div>
            <h1 className="font-serif text-4xl md:text-6xl font-bold leading-tight mb-6">
              Knitwear, made with{" "}
              <span className="text-accent italic">conscience.</span>
            </h1>
            <p className="font-sans text-base md:text-lg text-primary-foreground/85 leading-relaxed">
              At ThreadKnit, sustainability isn't a marketing line — it's a working
              commitment. From the fibers we choose to the partners we work with, we
              build garments that respect people, place and process.
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
                Our Pillars
              </p>
              <div className="w-8 h-px bg-accent" />
            </div>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
              How We Practice Sustainability
            </h2>
            <p className="font-sans text-sm text-muted-foreground mt-4 max-w-2xl mx-auto">
              Six interconnected commitments that guide how we design, source and
              manufacture every order — without compromising on quality.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {pillars.map((p, i) => (
              <motion.div
                key={p.title}
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
                  {p.title}
                </h3>
                <p className="font-sans text-sm text-muted-foreground leading-relaxed">
                  {p.desc}
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
            {principles.map((p, i) => (
              <motion.div
                key={p.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="text-center"
              >
                <p className="font-serif text-3xl md:text-4xl font-bold text-accent">
                  {p.stat}
                </p>
                <p className="font-sans text-xs uppercase tracking-[0.2em] text-foreground font-semibold mt-2">
                  {p.label}
                </p>
                <p className="font-sans text-xs text-muted-foreground mt-2 leading-relaxed">
                  {p.desc}
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
                Materials
              </span>
            </div>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-5">
              Better fibers, better garments.
            </h2>
            <p className="font-sans text-sm text-muted-foreground leading-relaxed mb-4">
              We actively expand our use of organic cotton, recycled polyester
              blends and low-impact dyestuffs. Each material is selected not just
              for its hand-feel and durability, but for the footprint behind it.
            </p>
            <ul className="space-y-3 font-sans text-sm text-foreground/80">
              {[
                "Organic and ring-spun cotton options",
                "Recycled polyester blends for fleece and terry",
                "Low-impact and water-efficient dye processes",
                "Responsible chemical management on the production floor",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-2 w-1.5 h-1.5 bg-accent rounded-full shrink-0" />
                  {item}
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
                Circular Approach
              </p>
              <div className="w-8 h-px bg-accent" />
            </div>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
              A More Circular Production Cycle
            </h2>
            <p className="font-sans text-sm text-muted-foreground mt-4 max-w-2xl mx-auto">
              We're working to close loops at every step — from how we source fibers
              to what happens to off-cuts and packaging at the end of production.
            </p>
          </motion.div>

          <div className="relative">
            {/* connecting line */}
            <div className="hidden lg:block absolute top-12 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {circularSteps.map((s, i) => (
                <motion.div
                  key={s.title}
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
                    {s.title}
                  </h3>
                  <p className="font-sans text-xs text-muted-foreground leading-relaxed max-w-[220px] mx-auto">
                    {s.desc}
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
                Resource Stewardship
              </span>
            </div>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-5">
              Every drop, every watt — accounted for.
            </h2>
            <p className="font-sans text-sm text-muted-foreground leading-relaxed mb-6">
              Dyeing and finishing are some of the most resource-intensive stages
              in garment production. We work with partners that invest in
              water-recycling systems, controlled chemical dosing and energy-aware
              machinery — measuring and reducing impact season after season.
            </p>
            <div className="grid grid-cols-3 gap-4">
              {[
                { icon: Droplets, label: "Water-efficient dyeing" },
                { icon: Sun, label: "Energy-aware operations" },
                { icon: Wind, label: "Cleaner air & effluent" },
              ].map((it) => (
                <div
                  key={it.label}
                  className="p-4 border border-border rounded-sm bg-card text-center hover:border-accent/40 transition-colors"
                >
                  <it.icon className="w-5 h-5 text-accent mx-auto mb-2" />
                  <p className="font-sans text-[11px] text-foreground/80 leading-tight">
                    {it.label}
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
                  Our Commitment
                </span>
              </div>
              <h3 className="font-serif text-2xl md:text-3xl font-bold mb-4">
                Honest progress, every season.
              </h3>
              <p className="font-sans text-sm md:text-base text-primary-foreground/80 leading-relaxed mb-6 max-w-2xl">
                We don't claim certifications we haven't earned. Instead, we measure
                what we do, share it openly with our buyers, and improve year over
                year — guided by industry-recognized frameworks for quality, safety
                and responsible manufacturing.
              </p>
              <p className="font-serif italic text-primary-foreground/85 text-base">
                "Softness you can wear. Crafted for comfort. Made with care."
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default Sustainability;
