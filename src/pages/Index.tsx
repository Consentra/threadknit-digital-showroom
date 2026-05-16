import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import HeroSection from "@/components/HeroSection";
import ExportMap from "@/components/ExportMap";
import CertificationsSection from "@/components/CertificationsSection";
import SEO from "@/components/SEO";

const Index = () => {
  const { t } = useTranslation();

  return (
    <main>
      <SEO
        title="ThreadKnit | Premium Knitwear Manufacturer & Sourcing"
        description="Explore ThreadKnit's premium knitwear collections — ladies', men's and children's apparel in cotton, fleece, terry and pique fabrics from 140–350 GSM."
        path="/"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "ThreadKnit",
          url: "https://threadknit.lovable.app/",
        }}
      />
      <h1 className="sr-only">ThreadKnit — Premium Knitwear Manufacturer</h1>
      <HeroSection />

      {/* Catalog teaser */}
      <section id="products" className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-accent/30 mb-6">
              <Sparkles className="w-3.5 h-3.5 text-accent" />
              <span className="font-sans text-[11px] uppercase tracking-[0.25em] text-accent font-semibold">
                {t("catalog.eyebrow")}
              </span>
            </div>
            <h2 className="font-serif text-3xl md:text-5xl font-bold text-foreground leading-tight">
              {t("catalog.title")}
            </h2>
            <p className="font-sans text-sm md:text-base text-muted-foreground mt-5 max-w-xl mx-auto leading-relaxed">
              {t("catalog.description")}
            </p>
            <Link
              to="/catalog"
              className="group inline-flex items-center gap-3 mt-10 px-10 py-4 bg-accent text-accent-foreground font-sans text-xs font-bold uppercase tracking-[0.2em] rounded-sm hover:bg-gold-light transition-all duration-300"
            >
              {t("catalog.explore", "Explore Full Catalog")}
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Where We Export */}
      <ExportMap />

      {/* Certifications & Compliance */}
      <CertificationsSection />
    </main>
  );
};

export default Index;
