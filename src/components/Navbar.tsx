import { useState, useEffect } from "react";
import { Menu, X, Languages } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import logo from "@/assets/logo.png";
import { useLanguage } from "@/contexts/LanguageContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { lang, setLang, t } = useLanguage();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: t("nav.home") },
    { href: "/about", label: t("nav.about") },
    { href: "/skills", label: t("nav.skills") },
    { href: "/experience", label: t("nav.experience") },
    { href: "/projects", label: t("nav.projects") },
    { href: "/testimonials", label: t("testimonials.badge") },
    { href: "/contact", label: t("nav.contact") },
  ];

  const toggleLang = () => setLang(lang === "en" ? "bn" : "en");

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${lang === "bn" ? "font-bangla" : ""} ${
      isScrolled ? "bg-background/95 backdrop-blur-sm shadow-sm" : "bg-background"
    }`}>
      <div className="container-width">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-2" onClick={() => setIsOpen(false)}>
            <img src={logo} alt="Sahin Enam" className="h-8 w-auto" />
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`px-3 py-2 text-sm font-medium rounded-full transition-colors ${
                  location.pathname === link.href
                    ? "text-primary bg-primary/10 border border-primary/30"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}

            <button onClick={toggleLang} className="ml-1 px-3 py-2 text-sm text-muted-foreground hover:text-foreground rounded-full transition-colors flex items-center gap-1" aria-label="Toggle language">
              <Languages className="w-4 h-4" />
              {lang === "en" ? "বাং" : "EN"}
            </button>

            <Link to="/contact" className="ml-2 px-5 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors">
              {t("nav.hireMe")}
            </Link>
          </div>

          <div className="md:hidden flex items-center gap-1">
            <button onClick={toggleLang} className="p-2 rounded-full text-muted-foreground hover:text-foreground transition-colors" aria-label="Toggle language">
              <Languages className="w-5 h-5" />
            </button>
            <button onClick={() => setIsOpen(!isOpen)} className="p-2 rounded-full text-foreground" aria-label="Toggle menu">
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      <div className={`md:hidden transition-all duration-200 overflow-hidden ${isOpen ? "max-h-[400px]" : "max-h-0"}`}>
        <div className="px-4 py-3 space-y-1 bg-background border-t border-border">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={`block py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                location.pathname === link.href
                  ? "text-primary bg-primary/10"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/contact"
            className="block py-2 px-3 mt-2 text-center text-sm font-medium bg-primary text-primary-foreground rounded-full"
            onClick={() => setIsOpen(false)}
          >
            {t("nav.hireMe")}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
