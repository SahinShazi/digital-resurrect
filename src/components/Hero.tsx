import { Download, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import profileCutout from "@/assets/profile-cutout.png";
import brushStroke from "@/assets/brush-stroke.png";
import { useLanguage } from "@/contexts/LanguageContext";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const Hero = () => {
  const { t } = useLanguage();

  const { data: settings } = useQuery({
    queryKey: ["site_settings"],
    queryFn: async () => {
      const { data } = await supabase.from("site_settings").select("*").limit(1).single();
      return data;
    },
  });

  const { data: about } = useQuery({
    queryKey: ["about_section"],
    queryFn: async () => {
      const { data } = await supabase.from("about_section").select("*").limit(1).single();
      return data;
    },
  });

  return (
    <section className="relative min-h-screen overflow-hidden bg-background pt-16">
      {/* Border frame */}
      <div className="absolute inset-0 m-3 md:m-5 border-2 border-accent/30 rounded-2xl pointer-events-none z-10" />

      {/* ===== MOBILE ===== */}
      <div className="lg:hidden relative z-20 flex flex-col items-center text-center px-6 pt-24 pb-10 min-h-screen">
        {/* Title */}
        <h1 className="font-display text-4xl sm:text-5xl font-bold leading-[1.1] mb-3">
          {settings?.hero_title || t("hero.greeting")}{" "}
          <span className="text-primary italic">{t("hero.name")}</span>
        </h1>

        <p className="text-muted-foreground text-sm leading-relaxed max-w-xs mb-6">
          {t("hero.description")}
        </p>

        {/* Profile */}
        <div className="relative w-56 h-72 mb-6 flex-shrink-0">
          <img
            src={brushStroke}
            alt=""
            className="absolute inset-0 w-full h-full object-contain z-0 scale-[1.3]"
          />
          <img
            src={about?.profile_image || profileCutout}
            alt="Sahin Enam"
            className="relative z-10 w-full h-full object-contain object-bottom"
          />
        </div>

        {/* Stats row */}
        <div className="flex gap-10 mb-6">
          <div className="text-center">
            <p className="text-3xl font-bold text-primary font-display">{about?.years_experience ?? 2}+</p>
            <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Years<br/>Experience</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-accent font-display">{about?.projects_completed ?? 50}+</p>
            <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Projects<br/>Completed</p>
          </div>
        </div>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row gap-3 w-full max-w-xs">
          <Button asChild size="lg" className="font-medium rounded-full bg-primary hover:bg-primary/90 flex-1">
            <Link to="/projects" className="flex items-center justify-center gap-2">
              {t("hero.viewProjects")}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="font-medium rounded-full border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground flex-1">
            <a href={settings?.resume_url || "/resume.pdf"} download="Sahin_Enam_Resume.pdf" className="flex items-center justify-center gap-2">
              <Download className="w-4 h-4" />
              {t("hero.resume")}
            </a>
          </Button>
        </div>
      </div>

      {/* ===== DESKTOP ===== */}
      <div className="hidden lg:flex relative z-20 container-width min-h-screen items-center">
        <div className="grid grid-cols-12 items-center w-full gap-4">
          {/* Left - Title + Email */}
          <div className="col-span-4 z-20">
            <h1 className="font-display text-6xl xl:text-7xl font-bold leading-[1.05] mb-6">
              {settings?.hero_title || t("hero.greeting")}{" "}
              <span className="text-primary italic">{t("hero.name")}</span>
            </h1>
            <a href="mailto:sahinenam@gmail.com" className="text-primary font-semibold text-sm hover:underline">
              sahinenam@gmail.com
            </a>
          </div>

          {/* Center - Profile Image with brush stroke */}
          <div className="col-span-4 relative z-10 flex justify-center">
            <div className="relative w-full max-w-[340px]">
              <img
                src={brushStroke}
                alt=""
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[135%] h-[135%] object-contain z-0"
              />
              <img
                src={about?.profile_image || profileCutout}
                alt="Sahin Enam"
                className="relative z-10 w-full h-auto object-contain"
              />
            </div>
          </div>

          {/* Right - Description */}
          <div className="col-span-4 z-20 pl-6">
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              {t("hero.description")}
            </p>
            <div className="flex gap-3">
              <Button asChild size="sm" className="font-medium rounded-full bg-primary hover:bg-primary/90">
                <Link to="/projects" className="flex items-center gap-2">
                  {t("hero.viewProjects")}
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </Button>
              <Button asChild size="sm" variant="outline" className="font-medium rounded-full border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                <a href={settings?.resume_url || "/resume.pdf"} download="Sahin_Enam_Resume.pdf" className="flex items-center gap-2">
                  <Download className="w-3.5 h-3.5" />
                  {t("hero.resume")}
                </a>
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="absolute bottom-10 left-0 right-0 container-width flex justify-between items-end z-20">
          <div className="flex items-baseline gap-2">
            <span className="text-5xl font-bold text-primary font-display">{about?.years_experience ?? 2}+</span>
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider leading-tight">Years<br/>Experience</span>
          </div>
          <div className="text-right">
            <p className="text-xs font-bold text-foreground uppercase tracking-wider">Frontend Developer</p>
            <p className="text-xs font-bold text-foreground uppercase tracking-wider">& Web Designer</p>
          </div>
        </div>
      </div>

      {/* Bottom accent strip */}
      <div className="absolute bottom-0 left-0 right-0 h-12 bg-accent z-0" />
    </section>
  );
};

export default Hero;
