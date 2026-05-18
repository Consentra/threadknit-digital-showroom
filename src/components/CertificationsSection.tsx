import { motion } from "framer-motion";
import { ShieldCheck, Users, Leaf, BadgeCheck, FlaskConical, Building2 } from "lucide-react";
import { useTranslation } from "react-i18next";

const ITEMS = [
  { key: "social", icon: ShieldCheck },
  { key: "safety", icon: Building2 },
  { key: "product", icon: FlaskConical },
  { key: "materials", icon: Leaf },
  { key: "audits", icon: Users },
  { key: "quality", icon: BadgeCheck },
] as const;

const CertificationsSection = () => {
  const { t } = useTranslation();
  return (
    <section className="py-20 md:py-28 bg-primary text-primary-foreground relative overflow-hidden">
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-accent/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-accent/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-px bg-accent" />
            <p className="font-sans text-[11px] uppercase tracking-[0.3em] text-accent font-semibold">
              {t("certs.eyebrow")}
            </p>
            <div className="w-8 h-px bg-accent" />
          </div>
          <h2 className="font-serif text-3xl md:text-4xl font-bold">
            {t("certs.title")}
          </h2>
          <p className="font-sans text-sm text-primary-foreground/70 mt-4 max-w-2xl mx-auto leading-relaxed">
            {t("certs.description")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {ITEMS.map((item, i) => (
            <motion.div
              key={item.key}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.06, duration: 0.5 }}
              className="group p-6 bg-primary-foreground/5 border border-primary-foreground/10 rounded-sm hover:border-accent/40 hover:bg-primary-foreground/[0.07] transition-all duration-500 backdrop-blur-sm"
            >
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-sm bg-accent/15 text-accent flex items-center justify-center shrink-0 group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
                  <item.icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif text-base font-semibold mb-1.5 group-hover:text-accent transition-colors">
                    {t(`certs.items.${item.key}.title`)}
                  </h3>
                  <p className="font-sans text-xs text-primary-foreground/70 leading-relaxed">
                    {t(`certs.items.${item.key}.desc`)}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <p className="text-center font-sans text-xs text-primary-foreground/50 mt-10 max-w-2xl mx-auto italic">
          {t("certs.disclaimer")}
        </p>
      </div>
    </section>
  );
};

export default CertificationsSection;
