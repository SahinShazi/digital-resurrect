import { ExternalLink, Github, ArrowUpRight } from "lucide-react";

const Projects = () => {
  const projects = [
    {
      title: "Portfolio Website",
      description: "A modern, responsive portfolio website showcasing skills, projects, and experience with beautiful design.",
      image: "https://i.ibb.co.com/YTdrXy8n/image-search-1761235093085.png",
      technologies: ["React", "Vite", "Tailwind CSS", "TypeScript"],
      liveLink: "https://shahinenam.netlify.app",
      githubLink: "https://github.com/SahinShazi/Portfolio-Website.git",
    },
    {
      title: "Task Management App",
      description: "A collaborative task management application with real-time updates and team features.",
      image: "https://i.ibb.co.com/ccYSSgnP/image-search-1761235778859.jpg",
      technologies: ["React", "TypeScript", "Supabase", "Tailwind"],
      liveLink: "https://shahinenam.netlify.app",
      githubLink: "https://github.com/SahinShazi/task-canvas-supa",
    },
    {
      title: "Stock Analyst AI Bot",
      description: "AI-driven stock analysis bot providing reports with charts and data via Telegram.",
      image: "https://i.ibb.co.com/G4zhpNpD/image-search-1761238014116.png",
      technologies: ["Python", "AI/ML", "Telegram API"],
      liveLink: "https://t.me/assistant232_bot",
      githubLink: "https://github.com/SahinShazi/Stock-Analysis-Telegram-Bot.git",
    },
    {
      title: "AI Telegram Chatbot",
      description: "A friendly AI chatbot powered by DeepSeek R1 providing natural conversations.",
      image: "https://i.ibb.co.com/TDZPQbMH/image-search-1761239469737.png",
      technologies: ["Python", "DeepSeek", "OpenRouter"],
      liveLink: "https://t.me/aurevix_bot",
      githubLink: "https://github.com/SahinShazi/Telegram-Chatbot-AI.git",
    }
  ];

  return (
    <section id="projects" className="relative py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-secondary/30" />
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-accent/10 rounded-full blur-[150px]" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 text-sm font-medium text-primary bg-primary/10 rounded-full mb-4">
            My Work
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display text-foreground mb-4">
            Featured Projects
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Some of my recent work that I'm proud of
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group relative rounded-2xl overflow-hidden glass hover:border-primary/30 transition-all duration-500"
            >
              {/* Image */}
              <div className="relative h-56 sm:h-64 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
                
                {/* Overlay links */}
                <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-background/60 backdrop-blur-sm">
                  <a
                    href={project.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center text-primary-foreground hover:scale-110 transition-transform"
                  >
                    <ExternalLink className="w-5 h-5" />
                  </a>
                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full bg-foreground flex items-center justify-center text-background hover:scale-110 transition-transform"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                </div>
                
                <p className="text-muted-foreground mb-4 line-clamp-2">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All */}
        <div className="text-center mt-12">
          <a
            href="https://github.com/SahinShazi"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-foreground border-2 border-border rounded-xl hover:border-primary hover:text-primary transition-all"
          >
            <Github className="w-5 h-5" />
            View All on GitHub
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;