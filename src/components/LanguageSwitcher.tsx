import { useTranslation } from "react-i18next";
import { Globe, Check } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const LANGS = [
  { code: "en", label: "English", short: "EN" },
  { code: "zh", label: "中文", short: "ZH" },
  { code: "es", label: "Español", short: "ES" },
  { code: "de", label: "Deutsch", short: "DE" },
  { code: "ar", label: "العربية", short: "AR" },
  { code: "ko", label: "한국어", short: "KO" },
  { code: "ja", label: "日本語", short: "JA" },
] as const;

interface Props {
  isTransparent?: boolean;
}

const LanguageSwitcher = ({ isTransparent = false }: Props) => {
  const { i18n } = useTranslation();
  const current = i18n.language?.split("-")[0] || "en";
  const active = LANGS.find((l) => l.code === current) || LANGS[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-sm border text-xs font-sans font-medium uppercase tracking-wider transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
          isTransparent
            ? "border-cream/30 text-cream/90 hover:border-accent hover:text-accent"
            : "border-border text-foreground/80 hover:border-accent hover:text-accent"
        }`}
        aria-label="Select language"
      >
        <Globe size={14} />
        <span>{active.short}</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[10rem]">
        {LANGS.map((lng) => (
          <DropdownMenuItem
            key={lng.code}
            onClick={() => i18n.changeLanguage(lng.code)}
            className="flex items-center justify-between cursor-pointer font-sans text-sm"
          >
            <span>{lng.label}</span>
            {current === lng.code && <Check size={14} className="text-accent" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;
