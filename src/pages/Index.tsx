import { useTranslation } from "react-i18next";
import HeroSection from "@/components/HeroSection";
import CapabilitiesSection from "@/components/CapabilitiesSection";
import ExportMap from "@/components/ExportMap";
import CertificationsSection from "@/components/CertificationsSection";
import SEO from "@/components/SEO";

const Index = () => {
  const { t } = useTranslation();

  return (
    <main>
      <SEO
        title="ThreadKnit | Garment Buying & Liaison House — Knitwear Specialists"
        description="ThreadKnit is a Bangladesh-based buying and liaison house specializing in premium knitwear, with sourcing capability across woven, sweater, leather and lingerie."
        path="/"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "ThreadKnit",
          url: "https://threadknit.lovable.app/",
        }}
      />
      <h1 className="sr-only">ThreadKnit — Garment Buying & Liaison House</h1>
      <HeroSection />

      {/* Capabilities — replaces previous duplicate catalog CTA */}
      <div id="products">
        <CapabilitiesSection />
      </div>

      {/* Where We Export */}
      <ExportMap />

      {/* Certifications & Compliance */}
      <CertificationsSection />
    </main>
  );
};

export default Index;

