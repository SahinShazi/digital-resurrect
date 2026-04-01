import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const About = () => {
  const { t } = useLanguage();

  const { data: about } = useQuery({
    queryKey: ["about_section"],
    queryFn: async () => {
      const { data } = await supabase.from("about_section").select("*").limit(1).single();
      return data;
    },
  });

  return (
    <section id="about" className="py-16 md:py-24">
      <div className="container-width">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
          {/* Left - main description */}
          <div>
            <p className="text-lg sm:text-xl md:text-2xl leading-relaxed text-foreground">
              {about?.bio_text || t("about.p1")}
            </p>
          </div>

          {/* Right - short text + link */}
          <div className="flex flex-col justify-end">
            <p className="text-sm text-muted-foreground leading-relaxed mb-6 md:text-right">
              {t("about.p2")}
            </p>
            <Link
              to="/about"
              className="inline-flex items-center gap-2 text-sm font-semibold text-foreground hover:text-primary transition-colors md:self-end"
            >
              More about me
              <span className="w-8 h-8 rounded-full border-2 border-foreground/20 flex items-center justify-center">
                <ArrowUpRight className="w-3.5 h-3.5" />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
