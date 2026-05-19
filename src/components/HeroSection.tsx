import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const goCatalog = () => navigate("/catalog");
  const scrollToProducts = () => {
    document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with subtle zoom */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 8, ease: "easeOut" }}
      >
        <img
          src={heroBg}
          alt="Premium knitwear fabric texture"
          className="w-full h-full object-cover"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-navy/80 via-navy/70 to-navy/90" />

      {/* Decorative elements */}
      <div className="absolute top-1/4 left-8 md:left-16 w-px h-24 bg-gradient-to-b from-transparent via-accent/40 to-transparent" />
      <div className="absolute top-1/3 right-8 md:right-16 w-px h-32 bg-gradient-to-b from-transparent via-accent/30 to-transparent" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="max-w-4xl mx-auto"
        >
          {/* Decorative line */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "3rem" }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="h-px bg-accent mx-auto mb-8"
          />

          {/* Label */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="font-sans text-[11px] font-semibold uppercase tracking-[0.4em] text-accent mb-8"
          >
            {t("hero.label")}
          </motion.p>

          {/* Main Title */}
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold text-cream leading-[1.05] mb-8">
            <motion.span
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="block"
            >
              {t("hero.titleA")}
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.85, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="block"
            >
              {t("hero.titleB1")}{" "}
              <span className="text-accent italic">{t("hero.titleB2")}</span>
            </motion.span>
          </h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.8 }}
            className="font-serif text-lg md:text-xl text-cream/60 italic mb-12 max-w-lg mx-auto"
          >
            {t("hero.subtitle")}
          </motion.p>

          {/* CTA */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8, duration: 0.6 }}
            onClick={goCatalog}
            whileHover={{ scale: 1.02, boxShadow: "0 20px 40px -10px hsla(42, 65%, 55%, 0.3)" }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center px-10 py-4 bg-accent text-accent-foreground font-sans text-xs font-bold uppercase tracking-[0.2em] rounded-sm transition-all duration-300 mb-20"
          >
            {t("hero.cta")}
          </motion.button>

        </motion.div>

        {/* Scroll Indicator — positioned well below CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 0.6 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2"
        >
          <motion.button
            onClick={scrollToProducts}
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
            className="w-5 h-9 border border-cream/30 rounded-full flex items-start justify-center p-1.5 cursor-pointer hover:border-accent/50 transition-colors"
            aria-label="Scroll to products"
          >
            <motion.div
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
              className="w-1 h-2 bg-accent rounded-full"
            />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
