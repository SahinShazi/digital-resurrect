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
    <section className="section-padding pt-28 md:pt-32 lg:pt-36">
      <div className="container-width">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left - Text Content */}
          <div className="order-2 lg:order-1 text-center lg:text-left">
            <p className="text-accent font-semibold mb-4 text-sm tracking-widest uppercase">
              {t("hero.available")}
            </p>

            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] mb-6">
              {settings?.hero_title || t("hero.greeting")}{" "}
              <span className="text-primary italic">{t("hero.name")}</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground mb-3">
              {settings?.hero_subtitle || t("hero.role")}
            </p>

            <p className="text-muted-foreground max-w-lg mx-auto lg:mx-0 mb-8 leading-relaxed">
              {t("hero.description")}
            </p>

            {/* Social Links */}
            <div className="flex gap-3 justify-center lg:justify-start mb-8">
              {socialLinks.map((social: any) => {
                const Icon = iconMap[social.icon] || Globe;
                return (
                  <a key={social.id} href={social.url} target="_blank" rel="noopener noreferrer" className="w-11 h-11 rounded-full border-2 border-primary/20 flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300" aria-label={social.platform}>
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
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

          {/* Right - Profile Image */}
          <div className="order-1 lg:order-2 flex justify-center">
            <div className="relative">
              {/* Decorative background shape */}
              <div className="absolute -inset-4 bg-accent/30 rounded-[2rem] rotate-3" />
              <div className="absolute -inset-4 bg-primary/10 rounded-[2rem] -rotate-2" />
              
              <div className="relative w-64 h-72 sm:w-72 sm:h-80 md:w-80 md:h-96 rounded-2xl overflow-hidden shadow-xl">
                <img src={about?.profile_image || profilePhoto} alt="Sahin Enam" className="w-full h-full object-cover" />
              </div>

              {/* Stats Badge - Experience */}
              <div className="absolute -bottom-4 -left-4 bg-card border-2 border-border rounded-2xl px-5 py-3 shadow-lg">
                <p className="text-3xl font-bold text-primary font-display">{about ? about.years_experience : 2}+</p>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{t("hero.yearsExp").replace(/\d+\+?\s*/, '')}</p>
              </div>

              {/* Stats Badge - Projects */}
              <div className="absolute -top-4 -right-4 bg-card border-2 border-border rounded-2xl px-5 py-3 shadow-lg">
                <p className="text-3xl font-bold text-accent font-display">{about ? about.projects_completed : 50}+</p>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{t("hero.projects").replace(/\d+\+?\s*/, '')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
