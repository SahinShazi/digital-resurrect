import { Github, Linkedin, Twitter, ArrowDown, Download, ArrowRight, Code2, Sparkles, Globe } from "lucide-react";
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
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden bg-background">
      <div className="absolute inset-0 bg-grid" />
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-pulse-glow" />
      <div className="absolute bottom-1/4 -right-32 w-80 h-80 bg-accent/20 rounded-full blur-[100px] animate-pulse-glow" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px]" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 pt-28">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="order-2 lg:order-1 text-center lg:text-left">
            <div className="animate-fade-in-up inline-flex items-center gap-2 px-4 py-2 rounded-full glass border-glow mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              <span className="text-sm font-medium text-foreground/80">{t("hero.available")}</span>
            </div>

            <h1 className="animate-fade-in-up-delay-1 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-display leading-tight mb-6">
              <span className="text-foreground">{settings?.hero_title || t("hero.greeting")}</span>
              <br />
              <span className="gradient-text text-glow">{t("hero.name")}</span>
            </h1>

            {settings?.hero_subtitle && (
              <div className="animate-fade-in-up-delay-2 flex items-center justify-center lg:justify-start gap-3 mb-6">
                <Code2 className="w-6 h-6 text-primary" />
                <span className="text-xl sm:text-2xl md:text-3xl font-semibold text-muted-foreground">
                  {settings.hero_subtitle}
                </span>
              </div>
            )}
            {!settings?.hero_subtitle && (
              <div className="animate-fade-in-up-delay-2 flex items-center justify-center lg:justify-start gap-3 mb-6">
                <Code2 className="w-6 h-6 text-primary" />
                <span className="text-xl sm:text-2xl md:text-3xl font-semibold text-muted-foreground">
                  {t("hero.role")}
                </span>
              </div>
            )}

            <p className="animate-fade-in-up-delay-3 text-base sm:text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed">
              {t("hero.description")}
            </p>

            <div className="animate-fade-in-up-delay-3 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-10">
              <Button asChild size="lg" className="group gradient-primary text-primary-foreground font-semibold px-8 py-6 rounded-xl hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-primary/30">
                <Link to="/projects" className="flex items-center gap-2">
                  {t("hero.viewProjects")}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-2 border-border bg-card/50 hover:bg-card hover:border-primary/50 font-semibold px-8 py-6 rounded-xl transition-all duration-300">
                <a href={settings?.resume_url || "/resume.pdf"} download="Sahin_Enam_Resume.pdf" className="flex items-center gap-2">
                  <Download className="w-5 h-5" />
                  {t("hero.resume")}
                </a>
              </Button>
            </div>

            <div className="animate-fade-in-up-delay-3 flex gap-4 justify-center lg:justify-start">
              {socialLinks.map((social: any) => {
                const Icon = iconMap[social.icon] || Globe;
                return (
                  <a key={social.id} href={social.url} target="_blank" rel="noopener noreferrer" className="group w-12 h-12 rounded-xl glass flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-all duration-300 hover:scale-110" aria-label={social.platform}>
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>

          <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
            <div className="relative animate-fade-in-up group">
              {/* Rotating gradient ring */}
              <div className="absolute -inset-3 rounded-full bg-gradient-to-r from-primary via-accent to-primary opacity-30 blur-md animate-spin-slow" />
              {/* Concentric rings */}
              <div className="absolute -inset-5 rounded-full border border-primary/20 animate-pulse-glow" />
              <div className="absolute -inset-10 rounded-full border border-primary/10" />
              <div className="absolute -inset-16 rounded-full border border-dashed border-primary/5" />
              
              {/* Main photo container */}
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-[22rem] md:h-[22rem] rounded-full overflow-hidden border-[3px] border-primary/40 shadow-[0_0_60px_hsla(var(--primary),0.25)] group-hover:shadow-[0_0_80px_hsla(var(--primary),0.4)] transition-shadow duration-700">
                <img src={about?.profile_image || profilePhoto} alt="Sahin Enam" className="w-full h-full object-cover scale-105 group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-background/50 via-transparent to-primary/5" />
              </div>

              {/* Floating badge - top right */}
              <div className="absolute -right-6 top-1/4 glass px-4 py-2.5 rounded-2xl animate-float shadow-lg border border-primary/20">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-primary-foreground" />
                  </div>
                  <span className="text-sm font-semibold">{about ? `${about.years_experience}+ ${t("hero.yearsExp").replace(/\d+\+?\s*/, '')}` : t("hero.yearsExp")}</span>
                </div>
              </div>

              {/* Floating badge - bottom left */}
              <div className="absolute -left-6 bottom-1/4 glass px-4 py-2.5 rounded-2xl animate-float shadow-lg border border-accent/20" style={{ animationDelay: '1s' }}>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center">
                    <Code2 className="w-4 h-4 text-accent" />
                  </div>
                  <span className="text-sm font-semibold">{about ? `${about.projects_completed}+ ${t("hero.projects").replace(/\d+\+?\s*/, '')}` : t("hero.projects")}</span>
                </div>
              </div>

              {/* Decorative dots */}
              <div className="absolute -top-2 left-1/2 w-2 h-2 rounded-full bg-primary/60 animate-pulse" />
              <div className="absolute -bottom-2 left-1/3 w-1.5 h-1.5 rounded-full bg-accent/60 animate-pulse" style={{ animationDelay: '0.5s' }} />
            </div>
          </div>
        </div>
      </div>

    </section>
  );
};

export default Hero;
