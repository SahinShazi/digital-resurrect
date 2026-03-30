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
    <section id="skills" className="section-padding">
      <div className="container-width">
        <div className="text-center mb-12">
          <p className="text-primary font-medium text-sm tracking-wide uppercase mb-2">{t("skills.badge")}</p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3">{t("skills.heading")}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">{t("skills.subtitle")}</p>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-16">
            <div className="animate-spin w-6 h-6 border-2 border-primary border-t-transparent rounded-full" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {skills.map((skill) => {
              const Icon = iconMap[skill.icon] || Code2;
              return (
                <div key={skill.id} className="border border-border rounded-xl p-5 hover:border-primary/30 transition-colors">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Icon className="w-4 h-4 text-primary" />
                    </div>
                    <h3 className="font-medium text-foreground">{skill.name}</h3>
                    <span className="ml-auto text-sm font-medium text-primary">{skill.percentage}%</span>
                  </div>
                  <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full transition-all duration-1000" style={{ width: `${skill.percentage}%` }} />
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
