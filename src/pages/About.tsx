import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import fabricTexture from "@/assets/hero-bg.jpg";
import {
  Shield, Leaf, Award, TrendingUp, Paintbrush, ArrowRight,
  CheckCircle2, Factory, Ruler, Scissors, Package, Eye, Users, Globe, Heart,
  Handshake, Clock, Star, MessageSquare
} from "lucide-react";
import SEO from "@/components/SEO";

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
};

const About = () => {
  const { t } = useTranslation();
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  const trustSignals = [
    { icon: Handshake, key: "buyerFocused" },
    { icon: Clock, key: "response" },
    { icon: Star, key: "quality" },
    { icon: MessageSquare, key: "direct" },
  ] as const;

  const materialKeys = ["m1", "m2", "m3", "m4", "m5", "m6", "m7"] as const;
  const processIcons = [Scissors, Leaf, Factory, Eye, Ruler, Package];
  const processKeys = ["s1", "s2", "s3", "s4", "s5", "s6"] as const;
  const printIcons = ["◆", "◇", "◈", "✦", "○", "●", "◉"];
  const printKeys = ["t1", "t2", "t3", "t4", "t5", "t6", "t7"] as const;
  const strengthIcons = [Shield, Leaf, Award, TrendingUp];
  const strengthKeys = ["s1", "s2", "s3", "s4"] as const;
  const buyerKeys = ["b1", "b2", "b3", "b4", "b5", "b6"] as const;
  const featureIcons = [Globe, Users, Heart, Factory];
  const featureKeys = ["f1", "f2", "f3", "f4"] as const;
  const tipKeys = ["t1", "t2", "t3", "t4", "t5", "t6"] as const;
  const commitmentIcons = [MessageSquare, Eye, Clock];
  const commitmentKeys = ["i1", "i2", "i3"] as const;

  return (
    <main className="pt-0">
      <SEO
        title="About ThreadKnit | Premium Knitwear Expertise & Materials"
        description="Learn about ThreadKnit's expertise in premium knitwear: organic cotton, elastane blends, fleece, terry, pique — 140–350 GSM with HD, AOP, embroidery and puff print."
        path="/about"
      />
      {/* Hero */}
      <section ref={heroRef} className="relative h-[60vh] min-h-[450px] flex items-center overflow-hidden">
        <motion.div className="absolute inset-0" style={{ y: heroY }}>
          <img src={fabricTexture} alt="Premium cotton fabric texture" className="w-full h-full object-cover scale-110" />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-navy/85 via-navy/75 to-navy/95" />
        <div className="absolute top-1/3 left-8 md:left-16 w-px h-20 bg-gradient-to-b from-transparent via-accent/40 to-transparent" />

        <div className="relative z-10 container mx-auto px-6">
          <motion.div initial={{ width: 0 }} animate={{ width: "3rem" }} transition={{ delay: 0.2, duration: 0.8 }} className="h-px bg-accent mb-8" />
          <motion.p {...fadeUp} className="font-sans text-[11px] uppercase tracking-[0.4em] text-accent mb-5">{t("about.eyebrow")}</motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold text-cream max-w-3xl leading-[1.1]"
          >
            {t("about.titleA")} <br className="hidden md:block" />
            <span className="text-accent italic">{t("about.titleB")}</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7, duration: 0.8 }}
            className="font-sans text-sm text-cream/60 mt-6 max-w-lg leading-relaxed"
          >
            {t("about.subtitle")}
          </motion.p>
        </div>
      </section>

      {/* Trust Signals */}
      <section className="bg-accent/5 border-b border-border">
        <div className="container mx-auto px-6 py-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {trustSignals.map(({ icon: Icon, key }, i) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="flex items-start gap-4"
              >
                <div className="w-11 h-11 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="font-serif text-xl font-bold text-foreground">{t(`about.trust.${key}.value`)}</p>
                  <p className="font-sans text-[10px] uppercase tracking-wider text-accent font-semibold">{t(`about.trust.${key}.label`)}</p>
                  <p className="font-sans text-[11px] text-muted-foreground mt-0.5 leading-snug">{t(`about.trust.${key}.desc`)}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="container mx-auto px-6 py-24">
        <div className="grid md:grid-cols-2 gap-16 lg:gap-24 items-start">
          <motion.div {...fadeUp}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-px bg-accent" />
              <p className="font-sans text-[11px] uppercase tracking-[0.3em] text-accent font-semibold">{t("about.story.eyebrow")}</p>
            </div>
            <h2 className="font-serif text-3xl md:text-5xl font-bold text-foreground mb-8 leading-[1.15]">
              {t("about.story.title1")} <br />{t("about.story.title2")}
            </h2>
            <div className="space-y-5 text-muted-foreground font-sans text-sm leading-[1.9]">
              <p>{t("about.story.p1")} <strong className="text-foreground">{t("about.story.p1Bold")}</strong></p>
              <p>{t("about.story.p2")}</p>
              <p>{t("about.story.p3")}</p>
              <p>{t("about.story.p4")}</p>
            </div>
            <motion.div {...fadeUp} transition={{ delay: 0.3 }} className="mt-8 p-6 border-l-2 border-accent bg-accent/5">
              <p className="font-serif text-lg italic text-foreground/80 leading-relaxed">
                "Softness You Can Wear. Crafted for Comfort. Styled for Life."
              </p>
              <p className="font-sans text-[10px] uppercase tracking-wider text-muted-foreground mt-3">— {t("about.story.promise")}</p>
            </motion.div>
          </motion.div>

          {/* GSM Range Card */}
          <motion.div {...fadeUp} transition={{ delay: 0.2 }}>
            <div className="bg-card p-8 md:p-10 rounded-sm border border-border relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="flex items-center gap-3 mb-8 relative">
                <div className="w-8 h-px bg-accent" />
                <p className="font-sans text-[11px] uppercase tracking-[0.3em] text-accent font-semibold">{t("about.gsm.eyebrow")}</p>
              </div>

              <div className="flex items-end justify-between mb-3 relative">
                <div className="text-center">
                  <span className="font-serif text-5xl md:text-6xl font-bold text-foreground">140</span>
                  <p className="font-sans text-[10px] text-muted-foreground mt-1">{t("about.gsm.light")}</p>
                </div>
                <div className="flex-1 mx-6 relative">
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }} whileInView={{ width: "100%" }} viewport={{ once: true }}
                      transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
                      className="h-full bg-gradient-to-r from-accent/40 via-accent to-accent/40 rounded-full"
                    />
                  </div>
                  <p className="font-sans text-[10px] text-muted-foreground text-center mt-2">{t("about.gsm.caption")}</p>
                </div>
                <div className="text-center">
                  <span className="font-serif text-5xl md:text-6xl font-bold text-foreground">350</span>
                  <p className="font-sans text-[10px] text-muted-foreground mt-1">{t("about.gsm.heavy")}</p>
                </div>
              </div>

              <div className="mt-10 space-y-2">
                {materialKeys.map((mk, i) => (
                  <motion.div
                    key={mk}
                    initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                    transition={{ delay: 0.4 + i * 0.06 }}
                    className="flex items-center justify-between px-3 py-2 bg-secondary/50 rounded-sm border border-border/30 hover:border-accent/30 transition-colors"
                  >
                    <span className="font-sans text-[11px] uppercase tracking-wider text-foreground font-medium">{t(`about.materials.${mk}.name`)}</span>
                    <span className="font-sans text-[10px] text-muted-foreground">{t(`about.materials.${mk}.use`)}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Commitment */}
      <section className="bg-primary text-primary-foreground py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-8 left-8 w-64 h-64 border border-accent/20 rounded-full" />
          <div className="absolute bottom-8 right-8 w-48 h-48 border border-accent/20 rounded-full" />
        </div>
        <div className="container mx-auto px-6 relative">
          <motion.div {...fadeUp} className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-8 h-px bg-accent" />
              <p className="font-sans text-[11px] uppercase tracking-[0.3em] text-accent font-semibold">{t("about.commitment.eyebrow")}</p>
              <div className="w-8 h-px bg-accent" />
            </div>
            <h2 className="font-serif text-3xl md:text-5xl font-bold leading-[1.15] max-w-2xl mx-auto">
              {t("about.commitment.title1")} <span className="text-accent italic">{t("about.commitment.trust")}</span>{t("about.commitment.title2")} <span className="text-accent italic">{t("about.commitment.integrity")}</span>
            </h2>
            <p className="font-sans text-sm text-primary-foreground/50 mt-6 max-w-2xl mx-auto leading-relaxed">
              {t("about.commitment.subtitle")}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {commitmentKeys.map((ck, i) => {
              const Icon = commitmentIcons[i];
              return (
                <motion.div
                  key={ck}
                  initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                  whileHover={{ y: -4 }}
                  className="p-8 border border-primary-foreground/10 rounded-sm hover:border-accent/30 transition-all duration-500"
                >
                  <div className="w-11 h-11 mb-5 rounded-full bg-accent/10 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-accent" />
                  </div>
                  <h3 className="font-serif text-lg font-semibold mb-3">{t(`about.commitment.${ck}.title`)}</h3>
                  <p className="font-sans text-xs text-primary-foreground/60 leading-relaxed">{t(`about.commitment.${ck}.desc`)}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="bg-secondary/30 py-24">
        <div className="container mx-auto px-6">
          <motion.div {...fadeUp} className="mb-16 text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-8 h-px bg-accent" />
              <p className="font-sans text-[11px] uppercase tracking-[0.3em] text-accent font-semibold">{t("about.process.eyebrow")}</p>
              <div className="w-8 h-px bg-accent" />
            </div>
            <h2 className="font-serif text-3xl md:text-5xl font-bold text-foreground leading-[1.15]">
              {t("about.process.title1")} <span className="text-accent italic">{t("about.process.title2")}</span>
            </h2>
            <p className="font-sans text-sm text-muted-foreground mt-4 max-w-lg mx-auto leading-relaxed">
              {t("about.process.subtitle")}
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {processKeys.map((sk, i) => {
              const Icon = processIcons[i];
              return (
                <motion.div
                  key={sk}
                  initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ y: -4 }}
                  className="relative p-8 bg-card border border-border rounded-sm group hover:border-accent/30 transition-all duration-500"
                >
                  <div className="absolute top-6 right-6 font-serif text-4xl font-bold text-accent/10 group-hover:text-accent/20 transition-colors">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div className="w-11 h-11 mb-5 rounded-full bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                    <Icon className="w-5 h-5 text-accent" />
                  </div>
                  <h3 className="font-serif text-lg font-semibold text-foreground mb-2">{t(`about.process.${sk}.title`)}</h3>
                  <p className="font-sans text-xs text-muted-foreground leading-relaxed">{t(`about.process.${sk}.desc`)}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Print Techniques */}
      <section className="py-24 relative overflow-hidden">
        <div className="container mx-auto px-6">
          <motion.div {...fadeUp} className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <Paintbrush className="w-5 h-5 text-accent" />
              <div className="w-8 h-px bg-accent" />
            </div>
            <h2 className="font-serif text-3xl md:text-5xl font-bold text-foreground leading-[1.15]">
              {t("about.prints.title1")} <br />
              <span className="text-accent italic">{t("about.prints.title2")}</span>
            </h2>
            <p className="font-sans text-sm text-muted-foreground mt-4 max-w-lg">
              {t("about.prints.subtitle")}
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {printKeys.map((pk, i) => (
              <motion.div
                key={pk}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -4, scale: 1.02 }}
                className="p-6 border border-border rounded-sm group cursor-default bg-card hover:border-accent/30 transition-all duration-500"
              >
                <span className="text-accent text-lg mb-3 block">{printIcons[i]}</span>
                <h3 className="font-serif text-base font-semibold text-foreground mb-2 group-hover:text-accent transition-colors">{t(`about.prints.${pk}.name`)}</h3>
                <p className="font-sans text-xs text-muted-foreground leading-relaxed">{t(`about.prints.${pk}.desc`)}</p>
                <ArrowRight className="w-4 h-4 text-accent/0 group-hover:text-accent mt-3 transition-all duration-300 -translate-x-2 group-hover:translate-x-0" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why ThreadKnit */}
      <section className="bg-secondary/30 py-24">
        <div className="container mx-auto px-6">
          <motion.div {...fadeUp} className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-px bg-accent" />
              <p className="font-sans text-[11px] uppercase tracking-[0.3em] text-accent font-semibold">{t("about.why.eyebrow")}</p>
            </div>
            <h2 className="font-serif text-3xl md:text-5xl font-bold text-foreground leading-[1.15]">
              {t("about.why.title1")} <br />
              <span className="text-accent italic">{t("about.why.title2")}</span>
            </h2>
            <p className="font-sans text-sm text-muted-foreground mt-4 max-w-lg leading-relaxed">
              {t("about.why.subtitle")}
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {strengthKeys.map((sk, i) => {
              const Icon = strengthIcons[i];
              return (
                <motion.div
                  key={sk}
                  initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ y: -6 }}
                  className="p-8 border border-border rounded-sm hover:border-accent/30 transition-all duration-500 group bg-card"
                >
                  <div className="w-12 h-12 mb-6 rounded-full bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                    <Icon className="w-5 h-5 text-accent" />
                  </div>
                  <p className="font-serif text-xl font-bold text-accent mb-0.5">{t(`about.why.${sk}.stat`)}</p>
                  <p className="font-sans text-[10px] uppercase tracking-wider text-muted-foreground mb-4">{t(`about.why.${sk}.statLabel`)}</p>
                  <h3 className="font-serif text-lg font-semibold text-foreground mb-2">{t(`about.why.${sk}.title`)}</h3>
                  <p className="font-sans text-xs text-muted-foreground leading-relaxed">{t(`about.why.${sk}.desc`)}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Buyer Benefits */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div {...fadeUp}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-px bg-accent" />
                <p className="font-sans text-[11px] uppercase tracking-[0.3em] text-accent font-semibold">{t("about.buyers.eyebrow")}</p>
              </div>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground leading-[1.15] mb-6">
                {t("about.buyers.title1")} <br />
                <span className="text-accent italic">{t("about.buyers.title2")}</span>
              </h2>
              <p className="font-sans text-sm text-muted-foreground leading-relaxed mb-8">
                {t("about.buyers.subtitle")}
              </p>
              <div className="space-y-4">
                {buyerKeys.map((bk, i) => (
                  <motion.div
                    key={bk}
                    initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                    transition={{ delay: 0.2 + i * 0.07 }}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle2 className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                    <p className="font-sans text-sm text-foreground/80 leading-relaxed">{t(`about.buyers.${bk}`)}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div {...fadeUp} transition={{ delay: 0.2 }}>
              <div className="grid grid-cols-2 gap-4">
                {featureKeys.map((fk, i) => {
                  const Icon = featureIcons[i];
                  return (
                    <motion.div
                      key={fk}
                      initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
                      transition={{ delay: 0.3 + i * 0.1 }}
                      whileHover={{ y: -3 }}
                      className="p-6 bg-card border border-border rounded-sm text-center group hover:border-accent/30 transition-all"
                    >
                      <div className="w-10 h-10 mx-auto mb-3 rounded-full bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                        <Icon className="w-4 h-4 text-accent" />
                      </div>
                      <p className="font-serif text-sm font-semibold text-foreground whitespace-pre-line leading-tight mb-1">{t(`about.buyers.${fk}.label`)}</p>
                      <p className="font-sans text-[10px] text-muted-foreground">{t(`about.buyers.${fk}.desc`)}</p>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Tips */}
      <section className="container mx-auto px-6 py-24">
        <motion.div {...fadeUp} className="text-center mb-14">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-8 h-px bg-accent" />
            <p className="font-sans text-[11px] uppercase tracking-[0.3em] text-accent font-semibold">{t("about.tips.eyebrow")}</p>
            <div className="w-8 h-px bg-accent" />
          </div>
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-foreground leading-[1.15]">
            {t("about.tips.title1")} <span className="text-accent italic">{t("about.tips.title2")}</span>
          </h2>
          <p className="font-sans text-sm text-muted-foreground mt-4 max-w-xl mx-auto leading-relaxed">
            {t("about.tips.subtitle")}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {tipKeys.map((tk, i) => (
            <motion.div
              key={tk}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              whileHover={{ y: -3 }}
              className="p-7 bg-card border border-border rounded-sm hover:border-accent/30 transition-all"
            >
              <div className="w-10 h-10 mb-4 rounded-full bg-accent/10 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-accent" />
              </div>
              <h3 className="font-serif text-lg font-semibold text-foreground mb-3">{t(`about.tips.${tk}.title`)}</h3>
              <p className="font-sans text-xs text-muted-foreground leading-relaxed">{t(`about.tips.${tk}.desc`)}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="bg-primary text-primary-foreground py-20">
        <div className="container mx-auto px-6 text-center">
          <motion.div {...fadeUp}>
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
              {t("about.cta.title")}
            </h2>
            <p className="font-sans text-sm text-primary-foreground/50 max-w-md mx-auto mb-8 leading-relaxed">
              {t("about.cta.desc")}
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-3 bg-accent text-accent-foreground font-sans text-xs font-semibold uppercase tracking-wider rounded-sm hover:bg-accent/90 transition-colors"
            >
              {t("about.cta.button")}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default About;
