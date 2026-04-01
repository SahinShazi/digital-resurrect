import { ArrowUpRight, Github, Linkedin, Twitter, Globe, Code2, Database, Flame, GitBranch, Bot } from "lucide-react";
import profileCutout from "@/assets/profile-cutout.png";
import { useLanguage } from "@/contexts/LanguageContext";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const iconMap: Record<string, any> = { Github, Linkedin, Twitter, Globe };

const techIcons = [
  { icon: Code2, label: "Frontend" },
  { icon: Database, label: "Backend" },
  { icon: GitBranch, label: "Git" },
  { icon: Bot, label: "AI" },
  { icon: Flame, label: "Performance" },
  { icon: Globe, label: "Web" },
];

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
    <section className="relative bg-muted">
      {/* Top bar */}
      <div className="absolute top-0 left-0 right-0 z-20 flex justify-between items-start px-4 sm:px-8 pt-20 sm:pt-24">
        <p className="text-xs sm:text-sm text-muted-foreground font-medium">
          © Code by Sahin Enam
        </p>
        <p className="text-xs sm:text-sm text-muted-foreground text-right max-w-[200px] sm:max-w-xs leading-relaxed hidden sm:block">
          {t("hero.description")}
        </p>
      </div>

      {/* Main hero image area */}
      <div className="relative w-full min-h-[70vh] sm:min-h-[80vh] flex items-end justify-center overflow-hidden pt-20">
        {/* Grayscale profile photo */}
        <img
          src={about?.profile_image || profileCutout}
          alt="Sahin Enam"
          className="relative z-10 w-[280px] sm:w-[350px] md:w-[420px] lg:w-[480px] object-contain object-bottom grayscale"
        />

        {/* Large overlapping title text */}
        <div className="absolute bottom-0 left-0 right-0 z-20 pointer-events-none">
          <h1 className="font-display text-[3rem] sm:text-[5rem] md:text-[7rem] lg:text-[9rem] xl:text-[10rem] font-bold leading-[0.85] text-foreground/90 text-center whitespace-nowrap overflow-hidden">
            {settings?.hero_title || "Creative Developer &"}
          </h1>
        </div>

        {/* Arrow button overlay */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
          <a
            href="#about"
            className="w-14 h-14 sm:w-16 sm:h-16 rounded-full border-2 border-foreground/20 flex items-center justify-center hover:bg-foreground hover:text-background transition-all duration-300"
          >
            <ArrowUpRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </a>
        </div>
      </div>

      {/* Tech icons bar */}
      <div className="relative z-30 flex justify-center py-6">
        <div className="flex items-center gap-1 bg-foreground rounded-full px-4 py-2.5 shadow-lg">
          {techIcons.map((tech, i) => {
            const Icon = tech.icon;
            return (
              <div
                key={i}
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-background/70 hover:text-background hover:bg-background/10 transition-colors cursor-pointer"
                title={tech.label}
              >
                <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Hero;
