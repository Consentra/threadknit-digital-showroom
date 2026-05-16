import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Mail, Phone, MapPin, Linkedin, Instagram, Facebook, FileText, Presentation, BarChart3, BookOpen, ArrowUp } from "lucide-react";
import logoSymbol from "@/assets/logo-symbol.png";

const XIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const PinterestIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
  </svg>
);

const TelegramIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M11.944 0A12 12 0 000 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 01.171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
  </svg>
);

const YouTubeIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

const Footer = () => {
  const { t } = useTranslation();

  const navItems = [
    { label: t("footer.productCatalog"), to: "/catalog" },
    { label: t("footer.aboutUs"), to: "/about" },
    { label: t("footer.sustainability", "Sustainability"), to: "/sustainability" },
    { label: t("footer.contact"), to: "/contact" },
  ];

  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="relative bg-primary text-primary-foreground overflow-hidden">
      {/* decorative gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent" />
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6 py-16 relative">
        {/* Main columns: Brand (wide) + Nav + Resources + Contact */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-x-8 gap-y-12">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-4">
            <Link to="/" className="flex items-center gap-3 mb-5 group" aria-label="ThreadKnit home">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-cream ring-1 ring-accent/40 transition-transform group-hover:scale-105">
                <img src={logoSymbol} alt="ThreadKnit emblem" className="h-9 w-9 object-contain" />
              </div>
              <h3 className="font-serif text-2xl font-bold">
                Thread<span className="text-accent">Knit</span>
              </h3>
            </Link>
            <p className="font-serif text-sm italic text-primary-foreground/70 leading-relaxed mb-3">
              {t("footer.motto")}
            </p>
            <p className="font-sans text-xs text-primary-foreground/50 leading-relaxed">
              {t("footer.tagline")}
            </p>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h4 className="font-sans text-xs font-semibold uppercase tracking-widest mb-6 text-accent">
              {t("footer.navigation")}
            </h4>
            <ul className="space-y-3">
              {navItems.map((link) => (
                <li key={link.label}>
                    <Link
                      to={link.to!}
                      className="group font-sans text-sm text-primary-foreground/70 hover:text-accent transition-colors inline-flex items-center gap-2"
                    >
                      <span className="w-0 group-hover:w-3 h-px bg-accent transition-all duration-300" />
                      {link.label}
                    </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div className="lg:col-span-2">
            <h4 className="font-sans text-xs font-semibold uppercase tracking-widest mb-6 text-accent">
              {t("footer.resources")}
            </h4>
            <ul className="space-y-3">
              {[
                { label: t("footer.brochure"), icon: FileText },
                { label: t("footer.deck"), icon: Presentation },
                { label: t("footer.infographics"), icon: BarChart3 },
                { label: t("footer.catalog"), icon: BookOpen },
              ].map((item) => (
                <li key={item.label}>
                  <a
                    href="https://docs.google.com/document/d/1SZmRhewkOgFO-6CXPerl-suFlkVBrQ1CpRhLlxEw5AA/edit?usp=drivesdk"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-sans text-sm text-primary-foreground/70 hover:text-accent transition-colors inline-flex items-center gap-2"
                  >
                    <item.icon size={14} className="text-accent" />
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-2">
            <h4 className="font-sans text-xs font-semibold uppercase tracking-widest mb-6 text-accent">
              {t("footer.contactHeading")}
            </h4>
            <ul className="space-y-3 text-sm text-primary-foreground/70">
              <li className="font-sans font-medium text-primary-foreground">Abir Hossain</li>
              <li className="flex items-start gap-2">
                <Mail size={14} className="text-accent mt-1 shrink-0" />
                <a href="mailto:abir0729@gmail.com" className="hover:text-accent transition-colors break-all">
                  abir0729@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Phone size={14} className="text-accent mt-1 shrink-0" />
                <a href="https://wa.me/8801836497796" className="hover:text-accent transition-colors">
                  01836-497796
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin size={14} className="text-accent mt-1 shrink-0" />
                <span className="leading-snug">Mirpur 12, Dhaka, Bangladesh</span>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div className="sm:col-span-2 lg:col-span-2">
            <h4 className="font-sans text-xs font-semibold uppercase tracking-widest mb-6 text-accent">
              {t("footer.followUs")}
            </h4>
            <div className="flex flex-wrap gap-3">
              {[
                { icon: Linkedin, href: "https://bd.linkedin.com/in/abir-hossain" },
                { icon: Instagram, href: "https://www.soscial.com/" },
                { icon: Facebook, href: "https://www.soscial.com/" },
                { icon: XIcon, href: "https://www.soscial.com/" },
                { icon: PinterestIcon, href: "https://www.soscial.com/" },
                { icon: TelegramIcon, href: "https://www.soscial.com/" },
                { icon: YouTubeIcon, href: "https://www.soscial.com/" },
              ].map(({ icon: Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full border border-primary-foreground/20 flex items-center justify-center hover:border-accent hover:text-accent hover:bg-accent/10 hover:-translate-y-0.5 transition-all duration-300"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-14 pt-8 border-t border-primary-foreground/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-sans text-xs text-primary-foreground/50 text-center sm:text-left">
            © {new Date().getFullYear()} ThreadKnit. {t("footer.rights")}
          </p>
          <div className="flex items-center gap-4">
            <span className="font-sans text-xs text-primary-foreground/40">{t("footer.madeWith")}</span>
            <button
              onClick={scrollTop}
              aria-label={t("footer.backToTop")}
              className="w-9 h-9 rounded-full border border-accent/30 text-accent flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-all duration-300"
            >
              <ArrowUp size={14} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
