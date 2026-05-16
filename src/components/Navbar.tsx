import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import logoSymbol from "@/assets/logo-symbol.png";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const Navbar = () => {
  const { t } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  const navLinks = [
    { to: "/", label: t("nav.home"), type: "route" as const },
    { to: "/about", label: t("nav.about"), type: "route" as const },
    { to: "/catalog", label: t("nav.catalog"), type: "route" as const },
    { to: "/sustainability", label: t("nav.sustainability", "Sustainability"), type: "route" as const },
    { to: "/contact", label: t("nav.contact"), type: "route" as const },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMobileOpen(false), [location]);

  const isTransparent = isHome && !scrolled;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isTransparent
            ? "bg-gradient-to-b from-navy/90 via-navy/60 to-transparent backdrop-blur-sm md:from-navy/60 md:via-navy/30"
            : "bg-background/95 backdrop-blur-md shadow-lg border-b border-border"
        }`}
      >
        <nav className="container mx-auto flex items-center justify-between px-6 py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2" aria-label="ThreadKnit home">
            <div className="relative flex items-center justify-center h-9 w-9 rounded-lg bg-gradient-to-br from-white/30 via-accent/10 to-white/20 backdrop-blur-xl ring-1 ring-white/30 shadow-[0_2px_16px_-3px_rgba(255,255,255,0.25),inset_0_1px_2px_rgba(255,255,255,0.3)]">
              <img
                src={logoSymbol}
                alt="ThreadKnit emblem"
                className="h-6 w-6 object-contain"
                width={24}
                height={24}
              />
            </div>
            <motion.span
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              className="font-serif text-xl font-bold tracking-wide"
            >
              <span className={isTransparent ? "text-cream" : "text-foreground"}>Thread</span>
              <span className="text-accent">Knit</span>
            </motion.span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive =
                link.type === "route" && location.pathname === link.to;
              const baseCls = `relative font-sans text-sm font-medium tracking-wide uppercase transition-colors hover:text-accent ${
                isActive
                  ? "text-accent"
                  : isTransparent
                  ? "text-cream/80 hover:text-cream"
                  : "text-foreground/80"
              }`;
              return (
                <Link key={link.to} to={link.to} className={baseCls}>
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="nav-underline"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-accent"
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Right side: Language + CTA */}
          <div className="hidden md:flex items-center gap-3">
            <LanguageSwitcher isTransparent={isTransparent} />
            <button
              onClick={() => setFormOpen(true)}
              className="inline-flex items-center px-5 py-2.5 bg-accent text-accent-foreground font-sans text-xs font-semibold uppercase tracking-wider rounded-sm hover:bg-gold-light transition-colors"
            >
              {t("nav.query")}
            </button>
          </div>

          {/* Mobile right: Lang + Toggle */}
          <div className="md:hidden flex items-center gap-2">
            <LanguageSwitcher isTransparent={isTransparent} />
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={isTransparent ? "text-cream" : "text-foreground"}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden bg-background/98 backdrop-blur-md border-b border-border overflow-hidden"
            >
              <div className="flex flex-col items-center gap-6 py-8">
                {navLinks.map((link) => {
                  const isActive =
                    link.type === "route" && location.pathname === link.to;
                  const cls = `font-sans text-sm font-medium uppercase tracking-wide ${
                    isActive ? "text-accent" : "text-foreground/80"
                  }`;
                  return (
                    <Link key={link.to} to={link.to} className={cls}>
                      {link.label}
                    </Link>
                  );
                })}
                <button
                  onClick={() => {
                    setMobileOpen(false);
                    setFormOpen(true);
                  }}
                  className="px-6 py-2.5 bg-accent text-accent-foreground font-sans text-xs font-semibold uppercase tracking-wider rounded-sm"
                >
                  {t("nav.query")}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Google Form Dialog */}
      <Dialog open={formOpen} onOpenChange={setFormOpen}>
        <DialogContent className="sm:max-w-2xl max-h-[90vh] p-0 overflow-hidden border-accent/20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <div className="bg-primary px-6 pt-6 pb-4 flex items-center gap-4">
              <div className="relative flex items-center justify-center h-11 w-11 rounded-lg bg-gradient-to-br from-white/30 via-accent/10 to-white/20 backdrop-blur-xl ring-1 ring-white/30 shadow-[inset_0_1px_2px_rgba(255,255,255,0.3)]">
                <img
                  src={logoSymbol}
                  alt="ThreadKnit emblem"
                  className="h-8 w-8 object-contain"
                />
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
              <DialogTitle className="font-serif text-lg font-bold">
                {t("nav.queryFormTitle")}
              </DialogTitle>
              <p className="font-sans text-sm text-muted-foreground">
                {t("nav.queryFormDesc")}
              </p>
            </DialogHeader>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="px-6 pb-6"
            >
              <iframe
                src="https://docs.google.com/forms/d/e/1FAIpQLScwXU2ttTqhKdPR522YwFb0fYs04YD6vq2wu6bJi4VTclKrvg/viewform?embedded=true"
                width="100%"
                height="450"
                frameBorder="0"
                marginHeight={0}
                marginWidth={0}
                className="rounded-sm"
                title="Query Form"
              >
                Loading…
              </iframe>
            </motion.div>
          </motion.div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Navbar;
