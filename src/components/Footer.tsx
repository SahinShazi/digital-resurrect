import { useRef, useCallback } from "react";
import { Github, Linkedin, Twitter, Heart, ArrowUp, Globe } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const iconMap: Record<string, any> = { Github, Linkedin, Twitter, Globe };

const Footer = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const tapCountRef = useRef(0);
  const tapTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const holdTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { data: socialLinks = [] } = useQuery({
    queryKey: ["social_links"],
    queryFn: async () => {
      const { data } = await supabase.from("social_links").select("*").order("display_order");
      return data || [];
    },
  });

  const handlePointerDown = useCallback(() => {
    tapCountRef.current += 1;
    if (tapTimerRef.current) clearTimeout(tapTimerRef.current);
    if (tapCountRef.current >= 2) {
      holdTimerRef.current = setTimeout(() => {
        navigate("/admin");
        tapCountRef.current = 0;
      }, 800);
    }
    tapTimerRef.current = setTimeout(() => {
      tapCountRef.current = 0;
    }, 500);
  }, [navigate]);

  const handlePointerUp = useCallback(() => {
    if (holdTimerRef.current) {
      clearTimeout(holdTimerRef.current);
      holdTimerRef.current = null;
    }
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative py-12 border-t border-border mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <Link to="/" className="text-2xl font-bold font-display gradient-text">Sahin Enam</Link>
            <p className="text-sm text-muted-foreground mt-1">{t("footer.role")}</p>
          </div>
          <div className="flex gap-3">
            {socialLinks.map((social: any) => {
              const Icon = iconMap[social.icon] || Globe;
              return (
                <a key={social.id} href={social.url} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl glass flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-all" aria-label={social.platform}>
                  <Icon className="w-5 h-5" />
                </a>
              );
            })}
          </div>
          <div className="text-center md:text-right text-sm text-muted-foreground">
            <p className="flex items-center justify-center md:justify-end gap-1">
              {t("footer.madeWith")} <Heart className="w-4 h-4 text-red-500 fill-red-500" /> {t("footer.by")} <span className="font-semibold text-foreground">Sahin Enam</span>
            </p>
            <p
              className="mt-1 select-none cursor-default"
              onPointerDown={handlePointerDown}
              onPointerUp={handlePointerUp}
              onPointerLeave={handlePointerUp}
            >
              © <span>{new Date().getFullYear()}</span> {t("footer.rights")}
            </p>
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
