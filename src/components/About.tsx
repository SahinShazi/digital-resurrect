import { User, Briefcase, Users, ArrowUpRight } from "lucide-react";
import profilePhoto from "@/assets/banner.jpg";

const About = () => {
  const stats = [
    { icon: Briefcase, number: "2+", label: "Years Experience" },
    { icon: User, number: "50+", label: "Projects Completed" },
    { icon: Users, number: "100+", label: "Happy Clients" },
  ];

  return (
    <section id="about" className="relative py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-grid opacity-50" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[150px]" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 text-sm font-medium text-primary bg-primary/10 rounded-full mb-4">
            About Me
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display text-foreground">
            Get to know me better
          </h2>
        </div>

        {/* Content */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-20">
          {/* Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden aspect-[4/5] max-w-md mx-auto lg:mx-0">
              <img 
                src={profilePhoto} 
                alt="Sahin Enam" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
            </div>
            {/* Decorative elements */}
            <div className="absolute -bottom-6 -right-6 w-48 h-48 border-2 border-primary/30 rounded-2xl -z-10" />
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-primary/20 rounded-2xl blur-xl" />
          </div>

          {/* Text */}
          <div className="space-y-6">
            <h3 className="text-2xl md:text-3xl font-bold font-display">
              <span className="gradient-text">Professional Web Developer</span>
            </h3>

            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Hello! I'm Sahin Enam, a passionate Full Stack Web Developer with experience
                creating digital solutions that make a difference. I specialize in building scalable web applications
                using modern technologies like React, Node.js, and MongoDB.
              </p>
              <p>
                My journey in web development started with a curiosity about how websites work, and it has
                evolved into a career where I get to solve complex problems and create user-friendly experiences
                every day.
              </p>
              <p>
                When I'm not coding, you can find me exploring new technologies, contributing to open-source
                projects, or sharing my knowledge with the developer community.
              </p>
            </div>

            <a
              href="#contact"
              className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all"
            >
              Let's work together
              <ArrowUpRight className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="group relative p-8 rounded-2xl glass border-glow hover:scale-105 transition-all duration-300"
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative flex flex-col items-center text-center">
                  <div className="w-14 h-14 rounded-xl gradient-primary flex items-center justify-center mb-4">
                    <Icon className="w-7 h-7 text-primary-foreground" />
                  </div>
                  <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">
                    {stat.number}
                  </div>
                  <div className="text-muted-foreground font-medium">{stat.label}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default About;