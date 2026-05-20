import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Mail, Phone, MessageCircle, MapPin, Clock, ArrowRight, Send, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";
import abirPhoto from "@/assets/abir-hossain.png";
import logoSymbol from "@/assets/logo-symbol.png";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import InquiryForm from "@/components/InquiryForm";
import SEO from "@/components/SEO";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

const Contact = () => {
  const { t } = useTranslation();
  const [formOpen, setFormOpen] = useState(false);

  const contactInfo = [
    {
      icon: Mail,
      label: t("contact.info.email"),
      value: "abir0729@gmail.com",
      href: "mailto:abir0729@gmail.com",
      desc: t("contact.info.emailDesc"),
    },
    {
      icon: Phone,
      label: t("contact.info.whatsapp"),
      value: "+880 1836-497796",
      href: "https://wa.me/8801836497796",
      desc: t("contact.info.whatsappDesc"),
    },
    {
      icon: MapPin,
      label: t("contact.info.location"),
      value: t("contact.info.locationValue"),
      href: null as string | null,
      desc: t("contact.info.locationDesc"),
    },
    {
      icon: Clock,
      label: t("contact.info.response"),
      value: t("contact.info.responseValue"),
      href: null as string | null,
      desc: t("contact.info.responseDesc"),
    },
  ];

  return (
    <main className="pt-20">
      <SEO
        title="Contact ThreadKnit | Knitwear Sourcing Inquiries"
        description="Get in touch with ThreadKnit for premium knitwear sourcing. Contact Abir Hossain via email, WhatsApp, or our inquiry form for product samples and quotes."
        path="/contact"
      />
      {/* Hero */}
      <section className="bg-primary text-primary-foreground py-20 md:py-28">
        <div className="container mx-auto px-6">
          <motion.div initial={{ width: 0 }} animate={{ width: "3rem" }} transition={{ delay: 0.2, duration: 0.8 }} className="h-px bg-accent mb-8" />
          <motion.p {...fadeUp} className="font-sans text-[11px] uppercase tracking-[0.4em] text-accent mb-4">
            {t("contact.eyebrow")}
          </motion.p>
          <motion.h1 {...fadeUp} transition={{ delay: 0.2 }} className="font-serif text-4xl md:text-6xl font-bold max-w-2xl leading-[1.1]">
            {t("contact.titleA")} <span className="text-accent italic">{t("contact.titleB")}</span>
          </motion.h1>
          <motion.p {...fadeUp} transition={{ delay: 0.3 }} className="font-sans text-sm text-primary-foreground/60 mt-6 max-w-lg leading-relaxed">
            {t("contact.subtitle")}
          </motion.p>
        </div>
      </section>

      {/* Contact Details */}
      <section className="container mx-auto px-6 py-20 md:py-28">
        <div className="max-w-4xl mx-auto">
          {/* Contact Person */}
          <motion.div {...fadeUp} className="text-center mb-16">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full overflow-hidden border-2 border-accent/30 shadow-lg">
              <img src={abirPhoto} alt="Abir Hossain" className="w-full h-full object-cover" />
            </div>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground">Abir Hossain</h2>
            <p className="font-sans text-sm text-muted-foreground mt-2">{t("contact.role")}</p>
            <a
              href="https://bd.linkedin.com/in/abir-hossain"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-4 px-4 py-2 border border-accent/30 rounded-sm text-accent font-sans text-[11px] font-semibold uppercase tracking-wider hover:bg-accent hover:text-accent-foreground transition-all duration-300"
              aria-label="Abir Hossain on LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
                         </a>
          </motion.div>

          {/* Contact Cards Grid */}
          <div className="grid sm:grid-cols-2 gap-5 mb-16">
            {contactInfo.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                whileHover={{ y: -3 }}
                className="p-8 bg-card border border-border rounded-sm group hover:border-accent/30 transition-all duration-500"
              >
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-full bg-accent/10 flex items-center justify-center shrink-0 group-hover:bg-accent/20 transition-colors">
                    <item.icon className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <p className="font-sans text-[10px] uppercase tracking-wider text-accent font-semibold mb-1">{item.label}</p>
                    {item.href ? (
                      <a href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="font-sans text-sm font-medium text-foreground hover:text-accent transition-colors">
                        {item.value}
                      </a>
                    ) : (
                      <p className="font-sans text-sm font-medium text-foreground">{item.value}</p>
                    )}
                    <p className="font-sans text-xs text-muted-foreground mt-1">{item.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTAs */}
          <motion.div {...fadeUp} className="text-center">
            <p className="font-sans text-sm text-muted-foreground mb-6">
              {t("contact.ctaLine")}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href="https://wa.me/8801836497796"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 bg-[hsl(142,70%,40%)] text-white rounded-sm hover:bg-[hsl(142,70%,35%)] transition-colors font-sans text-sm font-semibold"
              >
                <MessageCircle className="w-5 h-5" />
                {t("contact.chatWhatsapp")}
              </a>
              <button
                onClick={() => setFormOpen(true)}
                className="inline-flex items-center gap-3 px-8 py-4 bg-accent text-accent-foreground rounded-sm hover:bg-accent/90 transition-colors font-sans text-sm font-semibold"
              >
                <Send className="w-5 h-5" />
                {t("contact.sendQuery")}
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-primary text-primary-foreground py-16">
        <div className="container mx-auto px-6 text-center">
          <motion.div {...fadeUp}>
            <h2 className="font-serif text-2xl md:text-3xl font-bold mb-3">
              {t("contact.bannerTitle")}
            </h2>
            <p className="font-sans text-sm text-primary-foreground/50 max-w-md mx-auto mb-6 leading-relaxed">
              {t("contact.bannerDesc")}
            </p>
            <Link
              to="/catalog"
              className="inline-flex items-center gap-2 px-8 py-3 bg-accent text-accent-foreground font-sans text-xs font-semibold uppercase tracking-wider rounded-sm hover:bg-accent/90 transition-colors"
            >
              {t("contact.viewCatalog")}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Query Dialog */}
      <Dialog open={formOpen} onOpenChange={setFormOpen}>
        <DialogContent className="sm:max-w-2xl max-h-[90vh] p-0 overflow-hidden border-accent/20">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            <div className="bg-primary px-6 pt-6 pb-4 flex items-center gap-4">
              <div className="flex items-center justify-center h-11 w-11 rounded-lg bg-cream/95 ring-1 ring-accent/30">
                <img src={logoSymbol} alt="ThreadKnit emblem" className="h-8 w-8 object-contain" />
              </div>
              <div>
                <h2 className="font-serif text-xl font-bold text-primary-foreground">
                  Thread<span className="text-accent">Knit</span>
                </h2>
                <p className="font-sans text-xs text-primary-foreground/60 tracking-wide uppercase">
                  {t("nav.queryFormTagline")}
                </p>
              </div>
            </div>
            <DialogHeader className="px-6 pt-4 pb-2">
              <DialogTitle className="font-serif text-lg font-bold">{t("nav.queryFormTitle")}</DialogTitle>
              <p className="font-sans text-sm text-muted-foreground">
                {t("nav.queryFormDesc")}
              </p>
            </DialogHeader>
            <div className="px-6 pb-6 max-h-[60vh] overflow-y-auto">
              <InquiryForm onClose={() => setFormOpen(false)} />
            </div>
          </motion.div>
        </DialogContent>
      </Dialog>
    </main>
  );
};

export default Contact;
