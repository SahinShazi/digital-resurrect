import { Calendar, MapPin } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";

const dotColors = ["bg-primary", "bg-coral", "bg-accent"];

const Experience = () => {
  const { t } = useLanguage();

  const { data: experiences = [], isLoading } = useQuery({
    queryKey: ["experiences"],
    queryFn: async () => {
      const { data, error } = await supabase.from("experiences").select("*").order("display_order");
      if (error) throw error;
      return data;
    },
  });

  return (
    <section id="experience" className="section-padding">
      <div className="container-width">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-4">{t("experience.heading")}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">{t("experience.subtitle")}</p>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-16">
            <div className="animate-spin w-6 h-6 border-2 border-primary border-t-transparent rounded-full" />
          </div>
        ) : (
          <div className="max-w-4xl mx-auto relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px border-l-2 border-dashed border-border hidden md:block" />

            {experiences.map((exp, index) => (
              <div key={exp.id} className={`relative flex flex-col md:flex-row items-center gap-6 md:gap-12 mb-16 last:mb-0 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                {/* Left / Right content */}
                <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                  <h4 className="font-bold text-foreground text-lg">{exp.company}</h4>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1 justify-center md:justify-start">
                    {index % 2 !== 0 && <Calendar className="w-3.5 h-3.5 hidden md:block" />}
                    <span>{exp.period}</span>
                    {index % 2 === 0 && <Calendar className="w-3.5 h-3.5 hidden md:block" />}
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-0.5 justify-center md:justify-start">
                    <MapPin className="w-3 h-3" />
                    <span>{exp.location}</span>
                  </div>
                </div>

                {/* Center dot */}
                <div className={`w-5 h-5 rounded-full ${dotColors[index % 3]} border-4 border-background shadow-md z-10 flex-shrink-0`} />

                {/* Right / Left content */}
                <div className="flex-1">
                  <h3 className="font-display text-xl font-bold text-foreground">{exp.title}</h3>
                  <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{exp.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Experience;
