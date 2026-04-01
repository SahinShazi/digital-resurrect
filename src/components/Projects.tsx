import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

const Projects = () => {
  const { t } = useLanguage();

  const { data: projects = [], isLoading } = useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      const { data, error } = await supabase.from("projects").select("*").order("display_order").limit(4);
      if (error) throw error;
      return data;
    },
  });

  return (
    <section id="projects" className="py-16 md:py-24">
      <div className="container-width">
        {/* Header */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-foreground">
            Impressive Works
          </h2>
          <div className="flex items-end md:justify-end">
            <p className="text-xs sm:text-sm text-muted-foreground uppercase tracking-wider leading-relaxed max-w-xs md:text-right">
              HERE'S A SELECTION OF PROJECTS THAT SHOWCASE MY PASSION FOR DESIGN AND DEVELOPMENT, REFLECTING CREATIVITY AND INNOVATION.
            </p>
          </div>
        </div>

        {/* Projects grid */}
        {isLoading ? (
          <div className="flex justify-center py-16">
            <div className="animate-spin w-6 h-6 border-2 border-primary border-t-transparent rounded-full" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-10">
            {projects.map((project) => (
              <div key={project.id} className="group">
                {/* Project image */}
                <div className="relative rounded-2xl overflow-hidden bg-muted aspect-[4/3] mb-4">
                  {project.image ? (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-foreground/5">
                      <span className="font-display text-xl font-bold text-muted-foreground">{project.title}</span>
                    </div>
                  )}
                </div>
                {/* Project title with arrow */}
                <a
                  href={project.live_link || project.github_link || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
                >
                  <span className="w-7 h-7 rounded-full border border-foreground/20 flex items-center justify-center">
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                  {project.title}
                </a>
              </div>
            ))}
          </div>
        )}

        {/* Explore more */}
        <div className="flex justify-center">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-foreground/20 text-sm font-medium text-foreground hover:bg-foreground hover:text-background transition-all duration-300"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-foreground" />
            Explore more
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Projects;
