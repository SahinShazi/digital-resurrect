import { Github, Linkedin, Twitter, Download, ArrowRight, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import profileCutout from "@/assets/profile-cutout.png";
import brushStroke from "@/assets/brush-stroke.png";
import { useLanguage } from "@/contexts/LanguageContext";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const iconMap: Record<string, any> = { Github, Linkedin, Twitter, Globe };

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

  const { data: socialLinks = [] } = useQuery({
    queryKey: ["social_links"],
    queryFn: async () => {
      const { data } = await supabase.from("social_links").select("*").order("display_order");
      return data || [];
    },
  });

  return (
    <section className="relative overflow-hidden bg-background">
      {/* Accent border frame */}
      <div className="absolute inset-2 md:inset-4 border-[3px] border-accent/30 rounded-3xl pointer-events-none z-10" />

      {/* ===== MOBILE ===== */}
      <div className="lg:hidden pt-20 pb-10 px-4">
        <div className="text-center mb-6 pt-4">
          <h1 className="font-display text-[2.5rem] leading-[1.1] font-bold mb-4">
            {settings?.hero_title || t("hero.greeting")}{" "}
            <span className="text-primary italic">{t("hero.name")}</span>
          </h1>
          <p className="text-muted-foreground text-sm leading-relaxed max-w-xs mx-auto">
            {t("hero.description")}
          </p>
        </div>

        {/* Profile image with brush */}
        <div className="relative mx-auto w-72 h-80 mb-6">
          <img
            src={brushStroke}
            alt=""
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[45%] w-[140%] h-[140%] object-contain z-0 opacity-90"
            width={800}
            height={600}
          />
          <img
            src={about?.profile_image || profileCutout}
            alt="Sahin Enam"
            className="relative z-10 w-full h-full object-contain object-bottom drop-shadow-xl"
          />
        </div>

        {/* Stats */}
        <div className="flex justify-center gap-10 mb-6">
          <div className="text-center">
            <p className="text-4xl font-bold text-primary font-display">{about ? about.years_experience : 2}+</p>
            <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Years<br/>Experience</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold text-accent font-display">{about ? about.projects_completed : 50}+</p>
            <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Projects<br/>Completed</p>
          </div>
        </div>

        {/* CTA */}
        <div className="flex gap-3 justify-center">
          <Button asChild size="lg" className="font-medium rounded-full px-6 bg-primary hover:bg-primary/90">
            <Link to="/projects" className="flex items-center gap-2">
              {t("hero.viewProjects")}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="font-medium rounded-full px-6 border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground">
            <a href={settings?.resume_url || "/resume.pdf"} download="Sahin_Enam_Resume.pdf" className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              {t("hero.resume")}
            </a>
          </Button>
        </div>
      </div>

      {/* ===== DESKTOP ===== */}
      <div className="hidden lg:flex items-end min-h-[calc(100vh-4rem)] pt-20 pb-8">
        <div className="container-width w-full">
          <div className="grid grid-cols-12 items-end gap-4">
            {/* Left - Title */}
            <div className="col-span-4 pb-24">
              <h1 className="font-display text-6xl xl:text-7xl font-bold leading-[1.05] mb-6">
                {settings?.hero_title || t("hero.greeting")}{" "}
                <span className="text-primary italic">{t("hero.name")}</span>
              </h1>
              <a href="mailto:sahinenam@gmail.com" className="text-primary font-semibold text-sm hover:underline inline-flex items-center gap-1">
                sahinenam@gmail.com
              </a>
            </div>

            {/* Center - Profile */}
            <div className="col-span-4 relative flex justify-center">
              <div className="relative w-full max-w-md">
                <img
                  src={brushStroke}
                  alt=""
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[45%] w-[150%] h-[150%] object-contain z-0 opacity-90"
                  width={800}
                  height={600}
                />
                <img
                  src={about?.profile_image || profileCutout}
                  alt="Sahin Enam"
                  className="relative z-10 w-full h-auto object-contain drop-shadow-2xl"
                />
              </div>
            </div>

            {/* Right - Description */}
            <div className="col-span-4 pb-40 pl-6">
              <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
                {t("hero.description")}
              </p>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="flex justify-between items-end mt-4">
            <div className="flex items-baseline gap-2">
              <span className="text-5xl font-bold text-primary font-display">{about ? about.years_experience : 2}+</span>
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider leading-tight">Years<br/>Experience</span>
            </div>
            <div className="flex gap-3">
              <Button asChild size="lg" className="font-medium rounded-full px-8 bg-primary hover:bg-primary/90">
                <Link to="/projects" className="flex items-center gap-2">
                  {t("hero.viewProjects")}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="font-medium rounded-full px-8 border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                <a href={settings?.resume_url || "/resume.pdf"} download="Sahin_Enam_Resume.pdf" className="flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  {t("hero.resume")}
                </a>
              </Button>
            </div>
            <div className="text-right">
              <p className="text-xs font-bold text-foreground uppercase tracking-wider">Frontend Developer</p>
              <p className="text-xs font-bold text-foreground uppercase tracking-wider">& Web Designer</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
