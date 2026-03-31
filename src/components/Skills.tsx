import { Code2, Database, Flame, GitBranch, Bot, Globe, LucideIcon } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";

const iconMap: Record<string, LucideIcon> = { Globe, Code2, Database, Flame, GitBranch, Bot };

const Skills = () => {
  const { t } = useLanguage();

  const { data: skills = [], isLoading } = useQuery({
    queryKey: ["skills"],
    queryFn: async () => {
      const { data, error } = await supabase.from("skills").select("*").order("display_order");
      if (error) throw error;
      return data;
    },
  });

  return (
    <section id="skills" className="section-padding bg-primary text-primary-foreground">
      <div className="container-width">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-4">{t("skills.heading")}</h2>
          <p className="text-primary-foreground/70 max-w-2xl mx-auto">{t("skills.subtitle")}</p>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-16">
            <div className="animate-spin w-6 h-6 border-2 border-primary-foreground border-t-transparent rounded-full" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {skills.map((skill) => {
              const Icon = iconMap[skill.icon] || Code2;
              return (
                <div key={skill.id} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/15 transition-colors duration-300">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center">
                      <Icon className="w-5 h-5 text-accent-foreground" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-primary-foreground">{skill.name}</h3>
                      <span className="text-sm text-primary-foreground/60">{skill.percentage}%</span>
                    </div>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-accent rounded-full transition-all duration-1000" style={{ width: `${skill.percentage}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default Skills;
