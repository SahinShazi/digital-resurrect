import { useRef, useCallback } from "react";
import { Github, Linkedin, Twitter, Heart, Globe } from "lucide-react";
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
    tapTimerRef.current = setTimeout(() => { tapCountRef.current = 0; }, 500);
  }, [navigate]);

  const handlePointerUp = useCallback(() => {
    if (holdTimerRef.current) { clearTimeout(holdTimerRef.current); holdTimerRef.current = null; }
  }, []);

  return (
    <footer className="py-10 border-t border-border mt-auto bg-card">
      <div className="container-width">
        <div className="flex flex-col items-center gap-6">
          <Link to="/" className="font-display text-2xl font-bold text-foreground italic">Sahin Enam</Link>

          <div className="flex gap-3">
            {socialLinks.map((social: any) => {
              const Icon = iconMap[social.icon] || Globe;
              return (
                <a key={social.id} href={social.url} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border-2 border-primary/20 flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300" aria-label={social.platform}>
                  <Icon className="w-4 h-4" />
                </a>
              );
            })}
          </div>

          <div className="text-center text-sm text-muted-foreground space-y-1">
            <p className="flex items-center justify-center gap-1">
              {t("footer.madeWith")} <Heart className="w-3.5 h-3.5 text-coral fill-coral" /> {t("footer.by")} <span className="font-medium text-foreground">Sahin Enam</span>
            </p>
            <p className="select-none cursor-default" onPointerDown={handlePointerDown} onPointerUp={handlePointerUp} onPointerLeave={handlePointerUp}>
              © {new Date().getFullYear()} {t("footer.rights")}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
