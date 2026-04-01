import { ExternalLink, Github, ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

const cardColors = ["bg-accent", "bg-primary", "bg-coral", "bg-accent"];

const Projects = () => {
  const { t } = useLanguage();

  const { data: projects = [], isLoading } = useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      const { data, error } = await supabase.from("projects").select("*").order("display_order");
      if (error) throw error;
      return data;
    },
  });

  return (
    <section id="projects" className="section-padding bg-card">
      <div className="container-width">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-16">
          <div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-3">{t("projects.heading")}</h2>
            <p className="text-muted-foreground max-w-xl">{t("projects.subtitle")}</p>
          </div>
          <Link to="/projects" className="text-primary font-semibold text-sm flex items-center gap-1 hover:gap-2 transition-all italic">
            {t("projects.viewAll")} <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-16">
            <div className="animate-spin w-6 h-6 border-2 border-primary border-t-transparent rounded-full" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <div key={project.id} className="group rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 bg-background">
                <div className={`${cardColors[index % 4]} p-6 relative overflow-hidden h-48`}>
                  {project.image ? (
                    <img src={project.image} alt={project.title} className="w-full h-full object-cover absolute inset-0 rounded-lg mx-auto my-auto scale-90 shadow-lg" />
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <span className="text-white/80 font-display text-2xl font-bold">{project.title}</span>
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <h3 className="text-lg font-bold text-foreground font-display">{project.title}</h3>
                    <div className="flex gap-2 flex-shrink-0">
                      {project.live_link && (
                        <a href={project.live_link} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Live demo">
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                      {project.github_link && (
                        <a href={project.github_link} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Source code">
                          <Github className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{project.description}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.technologies.map((tech, i) => (
                      <span key={i} className="px-2.5 py-1 text-xs bg-secondary text-muted-foreground rounded-full font-medium">{tech}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
