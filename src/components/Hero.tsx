import { Github, Linkedin, Twitter, Download, ArrowRight, Globe, Mail, Phone } from "lucide-react";
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
    <section className="relative min-h-screen overflow-hidden bg-background">
      {/* Accent border frame */}
      <div className="absolute inset-0 m-2 md:m-4 border-[3px] border-accent/40 rounded-3xl pointer-events-none z-10" />

      <div className="relative z-20 container-width pt-24 md:pt-28 pb-12 min-h-screen flex flex-col justify-center">
        {/* Mobile layout */}
        <div className="lg:hidden text-center">
          <h1 className="font-display text-4xl sm:text-5xl font-bold leading-[1.1] mb-4">
            {settings?.hero_title || t("hero.greeting")}{" "}
            <span className="text-primary italic">{t("hero.name")}</span>
          </h1>

          <p className="text-muted-foreground mb-6 leading-relaxed text-sm">
            {t("hero.description")}
          </p>

          {/* Profile with brush stroke */}
          <div className="relative mx-auto w-64 h-80 mb-8">
            <img
              src={brushStroke}
              alt=""
              className="absolute inset-0 w-full h-full object-contain z-0 scale-125"
              width={800}
              height={600}
            />
            <img
              src={about?.profile_image || profileCutout}
              alt="Sahin Enam"
              className="relative z-10 w-full h-full object-contain object-bottom"
            />
          </div>

          {/* Stats */}
          <div className="flex justify-center gap-8 mb-6">
            <div>
              <p className="text-3xl font-bold text-primary font-display">{about ? about.years_experience : 2}+</p>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Years<br/>Experience</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-accent font-display">{about ? about.projects_completed : 50}+</p>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Projects<br/>Completed</p>
            </div>
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
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
        </div>

        {/* Desktop layout - matching reference */}
        <div className="hidden lg:block relative">
          <div className="grid grid-cols-12 items-end min-h-[75vh]">
            {/* Left - Big Title */}
            <div className="col-span-5 pb-32 z-20">
              <h1 className="font-display text-6xl xl:text-7xl font-bold leading-[1.05] mb-8">
                {settings?.hero_title || t("hero.greeting")}{" "}
                <span className="text-primary italic">{t("hero.name")}</span>
              </h1>

              {/* Email link */}
              <a href="mailto:sahinenam@gmail.com" className="text-primary font-semibold text-sm hover:underline">
                sahinenam@gmail.com
              </a>
            </div>

            {/* Center - Profile Image with brush stroke */}
            <div className="col-span-4 relative z-10 flex justify-center">
              <div className="relative w-full max-w-sm">
                <img
                  src={brushStroke}
                  alt=""
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[130%] h-[130%] object-contain z-0"
                  width={800}
                  height={600}
                />
                <img
                  src={about?.profile_image || profileCutout}
                  alt="Sahin Enam"
                  className="relative z-10 w-full h-auto object-contain"
                />
              </div>
            </div>

            {/* Right - Description */}
            <div className="col-span-3 pb-48 z-20 pl-4">
              <p className="text-muted-foreground text-sm leading-relaxed">
                {t("hero.description")}
              </p>
            </div>
          </div>

          {/* Bottom stats row */}
          <div className="absolute bottom-8 left-0 right-0 flex justify-between items-end z-20">
            {/* Left - Years Experience */}
            <div className="flex items-baseline gap-2">
              <span className="text-5xl font-bold text-primary font-display">{about ? about.years_experience : 2}+</span>
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider leading-tight">Years<br/>Experience</span>
            </div>

            {/* Right - Role badge */}
            <div className="text-right">
              <p className="text-xs font-bold text-foreground uppercase tracking-wider">
                Frontend Developer
              </p>
              <p className="text-xs font-bold text-foreground uppercase tracking-wider">
                & Web Designer
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Background accent color strip at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-accent/20 z-0" />
    </section>
  );
};

export default Hero;
