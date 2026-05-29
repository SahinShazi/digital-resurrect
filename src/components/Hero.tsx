import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import profileCutout from "@/assets/profile-cutout.png";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const Hero = () => {
  const { data: settings } = useQuery({
    queryKey: ["site_settings"],
    queryFn: async () => {
      const { data } = await supabase.from("site_settings").select("*").limit(1).single();
      return data;
    },
  });

  const heroImage = settings?.hero_background_image || profileCutout;
  const parts = "Sahin Enam".split(" ");

  return (
    <section className="relative min-h-screen overflow-hidden bg-foreground">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Sahin Enam"
          className="w-full h-full object-cover object-[60%_20%] sm:object-[center_15%] lg:object-[right_top]"
        />
        {/* Dark gradient overlay - desktop: left to right, mobile: bottom to top */}
        <div className="absolute inset-0 hidden lg:block bg-gradient-to-r from-foreground via-foreground/85 to-foreground/20" />
        <div className="absolute inset-0 lg:hidden bg-gradient-to-t from-foreground via-foreground/75 to-foreground/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 container-width min-h-screen flex items-end lg:items-center lg:justify-center pb-16 lg:pb-0">
        <div className="max-w-xl pt-20 lg:text-center animate-fade-in">
          <p className="text-background/80 text-base sm:text-lg font-medium mb-3 tracking-wide font-sans">
            Hi there! I'm
          </p>

          <h1 className="font-sans font-extrabold leading-[0.95] mb-4 text-background">
            {parts.map((word, i) => (
              <span key={i} className="inline-block mr-4">
                <span className="text-accent text-6xl sm:text-7xl md:text-8xl">{word.charAt(0)}</span>
                <span className="text-5xl sm:text-6xl md:text-7xl">{word.slice(1)}</span>
              </span>
            ))}
          </h1>

          <p className="text-background font-bold text-lg sm:text-xl md:text-2xl mb-8 tracking-wide font-sans">
            Frontend Developer &amp; Web Designer
          </p>

          <div className="flex flex-wrap gap-4 lg:justify-center">
            <Button
              asChild
              size="lg"
              className="rounded-none bg-background text-foreground hover:bg-accent hover:text-accent-foreground font-semibold uppercase tracking-wider px-8 transition-transform hover:scale-105"
            >
              <Link to="/about">About Me</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-none border-background/60 bg-transparent text-background hover:bg-background hover:text-foreground font-semibold uppercase tracking-wider px-8 transition-transform hover:scale-105"
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
