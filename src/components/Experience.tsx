import { Calendar, MapPin } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";

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
    <section id="experience" className="section-padding bg-secondary/50">
      <div className="container-width">
        <div className="text-center mb-12">
          <p className="text-primary font-medium text-sm tracking-wide uppercase mb-2">{t("experience.badge")}</p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3">{t("experience.heading")}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">{t("experience.subtitle")}</p>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-16">
            <div className="animate-spin w-6 h-6 border-2 border-primary border-t-transparent rounded-full" />
          </div>
        ) : (
          <div className="max-w-3xl mx-auto space-y-6">
            {experiences.map((exp) => (
              <div key={exp.id} className="bg-background border border-border rounded-xl p-6 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">{exp.title}</h3>
                    <p className="text-primary font-medium text-sm">{exp.company}</p>
                  </div>
                  <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{exp.period}</span>
                    <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{exp.location}</span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{exp.description}</p>
                <ul className="space-y-1.5">
                  {exp.achievements.map((achievement, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="w-1 h-1 rounded-full bg-primary mt-2 flex-shrink-0" />
                      {achievement}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Experience;
