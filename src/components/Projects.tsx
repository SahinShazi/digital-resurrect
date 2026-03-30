import { ExternalLink, Github } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";

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
    <section id="projects" className="section-padding">
      <div className="container-width">
        <div className="text-center mb-12">
          <p className="text-primary font-medium text-sm tracking-wide uppercase mb-2">{t("projects.badge")}</p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3">{t("projects.heading")}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">{t("projects.subtitle")}</p>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-16">
            <div className="animate-spin w-6 h-6 border-2 border-primary border-t-transparent rounded-full" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project) => (
              <div key={project.id} className="group border border-border rounded-xl overflow-hidden hover:shadow-md transition-shadow">
                {project.image && (
                  <div className="h-48 overflow-hidden">
                    <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                )}
                <div className="p-5">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-foreground">{project.title}</h3>
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
                      <span key={i} className="px-2 py-0.5 text-xs bg-secondary text-muted-foreground rounded">{tech}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="text-center mt-10">
          <a href="https://github.com/SahinShazi" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium border border-border rounded-lg hover:border-primary hover:text-primary transition-colors">
            <Github className="w-4 h-4" />
            {t("projects.viewAll")}
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;
