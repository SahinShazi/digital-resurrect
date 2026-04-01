import { useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const Footer = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const tapCountRef = useRef(0);
  const tapTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const holdTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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
    <footer className="py-8 mt-auto">
      <div className="container-width">
        <div className="flex flex-col sm:flex-row justify-between gap-4 text-sm text-muted-foreground">
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-10">
            <div>
              <p className="text-xs text-muted-foreground/60 mb-0.5">Email</p>
              <a href="mailto:sahin.enam10@gmail.com" className="text-foreground font-medium hover:text-primary transition-colors">
                sahin.enam10@gmail.com
              </a>
            </div>
            <div>
              <p className="text-xs text-muted-foreground/60 mb-0.5">Phone</p>
              <span className="text-foreground font-medium">+880 1234 567890</span>
            </div>
          </div>
          <p
            className="text-xs text-muted-foreground/50 self-end select-none cursor-default"
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
          >
            © {new Date().getFullYear()} Sahin Enam. {t("footer.rights")}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
