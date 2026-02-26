import { Github, Linkedin, Twitter, Heart, ArrowUp } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Footer = () => {
  const { t } = useLanguage();

  const socialLinks = [
    { icon: Github, href: "https://github.com/SahinShazi", label: "GitHub" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/sahinenam", label: "LinkedIn" },
    { icon: Twitter, href: "https://x.com/Sahin_Tech_1", label: "Twitter" },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative py-12 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <a href="#home" className="text-2xl font-bold font-display gradient-text">Sahin Enam</a>
            <p className="text-sm text-muted-foreground mt-1">{t("footer.role")}</p>
          </div>
          <div className="flex gap-3">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl glass flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-all" aria-label={social.label}>
                  <Icon className="w-5 h-5" />
                </a>
              );
            })}
          </div>
          <div className="text-center md:text-right text-sm text-muted-foreground">
            <p className="flex items-center justify-center md:justify-end gap-1">
              {t("footer.madeWith")} <Heart className="w-4 h-4 text-red-500 fill-red-500" /> {t("footer.by")} <span className="font-semibold text-foreground">Sahin Enam</span>
            </p>
            <p className="mt-1">© {new Date().getFullYear()} {t("footer.rights")}</p>
          </div>
        </div>
      </div>
      <button onClick={scrollToTop} className="fixed bottom-8 right-8 w-12 h-12 rounded-xl gradient-primary text-primary-foreground flex items-center justify-center shadow-lg hover:scale-110 transition-transform z-50" aria-label="Scroll to top">
        <ArrowUp className="w-5 h-5" />
      </button>
    </footer>
  );
};

export default Footer;
