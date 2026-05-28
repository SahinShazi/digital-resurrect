import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import profileCutout from "@/assets/profile-cutout.png";
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

  const heroImage = settings?.hero_background_image || profileCutout;
  const name = t("hero.name");
  const parts = name.split(" ");

  return (
    <section className="relative min-h-screen overflow-hidden bg-[hsl(200,30%,12%)]">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Sahin Enam"
          className="w-full h-full object-cover object-[60%_20%] sm:object-[center_15%] lg:object-[right_top]"
        />
        {/* Dark gradient overlay - desktop: left to right, mobile: bottom to top */}
        <div className="absolute inset-0 hidden lg:block bg-gradient-to-r from-[hsl(200,30%,9%)] via-[hsl(200,30%,9%)]/85 to-[hsl(200,30%,9%)]/20" />
        <div className="absolute inset-0 lg:hidden bg-gradient-to-t from-[hsl(200,30%,9%)] via-[hsl(200,30%,9%)]/75 to-[hsl(200,30%,9%)]/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 container-width min-h-screen flex items-end lg:items-center pb-16 lg:pb-0">
        <div className="max-w-xl pt-20">
          <p className="text-white/80 text-base sm:text-lg font-medium mb-3 tracking-wide">
            Hi there! I'm
          </p>

          <h1 className="font-display font-bold leading-[1.05] mb-4 text-white text-5xl sm:text-6xl md:text-7xl">
            {parts.map((word, i) => (
              <span key={i} className="inline-block mr-3">
                <span className="text-accent">{word.charAt(0)}</span>
                {word.slice(1)}
              </span>
            ))}
          </h1>

          <p className="text-white font-semibold text-lg sm:text-xl md:text-2xl mb-8 tracking-wide">
            {t("hero.role")} &amp; Web Designer
          </p>

          <div className="flex flex-wrap gap-4">
            <Button
              asChild
              size="lg"
              className="rounded-none bg-white text-[hsl(200,30%,15%)] hover:bg-accent hover:text-white font-semibold uppercase tracking-wider px-8"
            >
              <Link to="/about">About Me</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-none border-white/60 bg-transparent text-white hover:bg-white hover:text-[hsl(200,30%,15%)] font-semibold uppercase tracking-wider px-8"
            >
              <Link to="/contact">Hire Me</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
