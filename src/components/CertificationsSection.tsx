import { motion } from "framer-motion";
import { ShieldCheck, Users, Leaf, BadgeCheck, FlaskConical, Building2 } from "lucide-react";
import { useTranslation } from "react-i18next";

const items = [
  {
    icon: ShieldCheck,
    title: "Social Compliance",
    desc: "Aligned with internationally recognized social compliance frameworks covering fair labor, worker safety and ethical workplace standards.",
  },
  {
    icon: Building2,
    title: "Workplace Safety",
    desc: "Factories operate under structural, fire and electrical safety protocols required by global RMG buyers.",
  },
  {
    icon: FlaskConical,
    title: "Product Safety Testing",
    desc: "Garments tested for restricted substances and skin-safety standards through accredited third-party laboratories.",
  },
  {
    icon: Leaf,
    title: "Responsible Materials",
    desc: "Organic, recycled and low-impact fiber options sourced from mills with credible chain-of-custody documentation.",
  },
  {
    icon: Users,
    title: "Ethical Sourcing Audits",
    desc: "Supply chain partners audited under common buyer ethical-trade frameworks for transparency and traceability.",
  },
  {
    icon: BadgeCheck,
    title: "Quality Management",
    desc: "Documented multi-stage QC processes inspired by ISO-style quality management principles.",
  },
];

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
              {t("certs.eyebrow", "Compliance & Standards")}
            </p>
            <div className="w-8 h-px bg-accent" />
          </div>
          <h2 className="font-serif text-3xl md:text-4xl font-bold">
            {t("certs.title", "Built on Industry-Recognized Standards")}
          </h2>
          <p className="font-sans text-sm text-primary-foreground/70 mt-4 max-w-2xl mx-auto leading-relaxed">
            {t(
              "certs.description",
              "We work within the compliance frameworks expected by international RMG buyers — focusing on transparent, verifiable practices across people, product and process."
            )}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((item, i) => (
            <motion.div
              key={item.title}
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
                    {item.title}
                  </h3>
                  <p className="font-sans text-xs text-primary-foreground/70 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <p className="text-center font-sans text-xs text-primary-foreground/50 mt-10 max-w-2xl mx-auto italic">
          {t(
            "certs.disclaimer",
            "Specific certifications vary by production facility and order. Documentation is shared with buyers upon request as part of our onboarding process."
          )}
        </p>
      </div>
    </section>
  );
};

export default CertificationsSection;
