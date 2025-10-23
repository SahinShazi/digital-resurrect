import { ExternalLink, Github } from "lucide-react";

const Projects = () => {
  const projects = [
    {
      title: "Portfolio Website",
      description: "A modern, responsive portfolio website for Sahin Enam, a professional frontend developer. This website showcases skills, projects, and YouTube content with a beautiful, interactive design.",
      image: "https://i.ibb.co.com/YTdrXy8n/image-search-1761235093085.png",
      technologies: ["Vite", "Tailwind CSS", "shadcn-ui", "React"],
      liveLink: "https://shahinenam.netlify.app",
      githubLink: "https://github.com/SahinShazi/Portfolio-Website.git",
    },
{
      title: "Task Management App",
      description: "A collaborative task management application with real-time updates and team features using WebSocket.",
      image: "https://i.ibb.co.com/ccYSSgnP/image-search-1761235778859.jpg",
      technologies: ["Vite", "TypeScript", "React", "shadcn-ui", "Tailwind CSS"],
      liveLink: "https://shahinenam.netlify.app",
      githubLink: "https://github.com/SahinShazi/task-canvas-supa",
    },
    {
      title: "Stock Analyst AI Bot",
      description: "Your personal stock analyst. I provide AI-driven reports with charts and data. Just send a ticker to start.",
      image: "https://i.ibb.co.com/G4zhpNpD/image-search-1761238014116.png",
      technologies: ["Python"],
      liveLink: "https://t.me/assistant232_bot",
      githubLink: "https://github.com/SahinShazi/Stock-Analysis-Telegram-Bot.git",
    }
  ];

  return (
    <section id="projects" className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
            Featured Projects
          </h2>
          <p className="text-muted-foreground text-lg">
            Some of my recent work that I'm proud of
          </p>
        </div>

        {/* Projects Grid  */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-border hover:-translate-y-2 hover:shadow-2xl transition-all"
            >
              {/* Image */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-primary/90 to-accent/90 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                  <a
                    href={project.liveLink}
                    className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-primary hover:scale-110 transition-transform"
                    aria-label="View live project"
                  >
                    <ExternalLink className="w-5 h-5" />
                  </a>
                  <a
                    href={project.githubLink}
                    className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-primary hover:scale-110 transition-transform"
                    aria-label="View on GitHub"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3">{project.title}</h3>
                <p className="text-muted-foreground mb-4 line-clamp-3">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-3 py-1 text-xs font-medium gradient-primary text-white rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
