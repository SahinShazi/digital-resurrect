import { Github, Linkedin, Twitter, Download, ArrowRight, Globe, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import profilePhoto from "@/assets/profile-photo.jpg";
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
    <section className="section-padding pt-28 md:pt-32">
      <div className="container-width">
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-3 order-2 lg:order-1 text-center lg:text-left">
            <p className="text-primary font-medium mb-3 text-sm tracking-wide uppercase">
              {t("hero.available")}
            </p>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4">
              {settings?.hero_title || t("hero.greeting")}{" "}
              <span className="text-primary">{t("hero.name")}</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground mb-2">
              {settings?.hero_subtitle || t("hero.role")}
            </p>

            <p className="text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed">
              {t("hero.description")}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start mb-8">
              <Button asChild size="lg" className="font-medium">
                <Link to="/projects" className="flex items-center gap-2">
                  {t("hero.viewProjects")}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="font-medium">
                <a href={settings?.resume_url || "/resume.pdf"} download="Sahin_Enam_Resume.pdf" className="flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  {t("hero.resume")}
                </a>
              </Button>
            </div>

            <div className="flex gap-3 justify-center lg:justify-start">
              {socialLinks.map((social: any) => {
                const Icon = iconMap[social.icon] || Globe;
                return (
                  <a key={social.id} href={social.url} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors" aria-label={social.platform}>
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>

          <div className="lg:col-span-2 order-1 lg:order-2 flex justify-center">
            <div className="relative">
              <div className="w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 rounded-2xl overflow-hidden border border-border shadow-lg">
                <img src={about?.profile_image || profilePhoto} alt="Sahin Enam" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-3 -right-3 bg-background border border-border rounded-lg px-3 py-1.5 shadow-sm">
                <p className="text-xs font-medium text-foreground">{about ? `${about.years_experience}+ ${t("hero.yearsExp").replace(/\d+\+?\s*/, '')}` : t("hero.yearsExp")}</p>
              </div>
              <div className="absolute -top-3 -left-3 bg-background border border-border rounded-lg px-3 py-1.5 shadow-sm">
                <p className="text-xs font-medium text-foreground">{about ? `${about.projects_completed}+ ${t("hero.projects").replace(/\d+\+?\s*/, '')}` : t("hero.projects")}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
