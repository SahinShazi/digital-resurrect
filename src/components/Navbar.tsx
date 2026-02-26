import { useState, useEffect } from "react";
import { Menu, X, Languages } from "lucide-react";
import logo from "@/assets/logo.png";
import { useLanguage } from "@/contexts/LanguageContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { lang, setLang, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "#home", label: t("nav.home") },
    { href: "#about", label: t("nav.about") },
    { href: "#skills", label: t("nav.skills") },
    { href: "#experience", label: t("nav.experience") },
    { href: "#projects", label: t("nav.projects") },
    { href: "#contact", label: t("nav.contact") },
  ];

  const toggleLang = () => setLang(lang === "en" ? "bn" : "en");

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${lang === "bn" ? "font-bangla" : ""} ${
        isScrolled
          ? "bg-secondary/95 backdrop-blur-md shadow-lg border-b border-primary/20"
          : "bg-secondary/80 backdrop-blur-sm border-b border-primary/10"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          <a href="#home" className="flex items-center gap-3 group" onClick={() => setIsOpen(false)}>
            <img src={logo} alt="Sahin Enam" className="h-8 md:h-10 w-auto transition-transform group-hover:scale-105" />
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="relative px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-secondary/50"
              >
                {link.label}
              </a>
            ))}

            {/* Language Toggle */}
            <button
              onClick={toggleLang}
              className="ml-2 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-primary rounded-lg hover:bg-secondary/50 transition-colors flex items-center gap-1.5"
              aria-label="Toggle language"
            >
              <Languages className="w-4 h-4" />
              {lang === "en" ? "বাং" : "EN"}
            </button>

            <a
              href="#contact"
              className="ml-2 px-5 py-2 text-sm font-semibold gradient-primary text-primary-foreground rounded-lg hover:scale-105 transition-transform"
            >
              {t("nav.hireMe")}
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={toggleLang}
              className="p-2 rounded-lg hover:bg-secondary transition-colors text-muted-foreground hover:text-primary"
              aria-label="Toggle language"
            >
              <Languages className="w-5 h-5" />
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg hover:bg-secondary transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6 text-foreground" /> : <Menu className="w-6 h-6 text-foreground" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className={`md:hidden transition-all duration-300 overflow-hidden ${isOpen ? "max-h-[400px]" : "max-h-0"}`}>
        <div className="px-4 py-4 space-y-2 glass-strong border-t border-border">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="block py-3 px-4 rounded-lg text-muted-foreground font-medium hover:bg-secondary hover:text-foreground transition-colors"
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            className="block py-3 px-4 mt-4 text-center font-semibold gradient-primary text-primary-foreground rounded-lg"
            onClick={() => setIsOpen(false)}
          >
            {t("nav.hireMe")}
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
