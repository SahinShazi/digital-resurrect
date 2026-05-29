import { Briefcase, FolderOpen, Users, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import profilePhoto from "@/assets/banner.jpg";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const About = () => {
  const { data: about } = useQuery({
    queryKey: ["about_section"],
    queryFn: async () => {
      const { data } = await supabase.from("about_section").select("*").limit(1).single();
      return data;
    },
  });

  const stats = [
    { icon: Briefcase, number: about ? `${about.years_experience}+` : "2+", label: "Years Experience", color: "bg-primary" },
    { icon: FolderOpen, number: about ? `${about.projects_completed}+` : "50+", label: "Projects Completed", color: "bg-accent" },
    { icon: Users, number: about ? `${about.happy_clients}+` : "100+", label: "Happy Clients", color: "bg-primary" },
  ];

  return (
    <section id="about" className="section-padding">
      <div className="container-width">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-foreground">Get to know me better</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">About Me</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          <div className="relative rounded-2xl overflow-hidden aspect-[4/5] max-w-md mx-auto lg:mx-0 shadow-xl">
            <img src={about?.profile_image || profilePhoto} alt="Sahin Enam" className="w-full h-full object-cover" />
          </div>

          <div className="space-y-6">
            <h3 className="font-display text-2xl md:text-3xl font-bold text-primary">Professional Web Developer</h3>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              {about?.bio_text ? (
                about.bio_text.split('\n').filter(Boolean).map((p: string, i: number) => <p key={i}>{p}</p>)
              ) : (
                <>
                  <p>Hello! I'm Sahin Enam, a passionate Full Stack Web Developer with experience creating digital solutions that make a difference. I specialize in building scalable web applications using modern technologies like React, Node.js, and MongoDB.</p>
                  <p>My journey in web development started with a curiosity about how websites work, and it has evolved into a career where I get to solve complex problems and create user-friendly experiences every day.</p>
                  <p>When I'm not coding, you can find me exploring new technologies, contributing to open-source projects, or sharing my knowledge with the developer community.</p>
                </>
              )}
            </div>
            <Link to="/contact" className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all duration-300">
              Let's work together
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-card border border-border rounded-2xl p-8 text-center hover:shadow-lg transition-shadow duration-300">
                <div className={`w-14 h-14 rounded-full ${stat.color} flex items-center justify-center mx-auto mb-4`}>
                  <Icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <div className="text-4xl font-bold text-foreground mb-1 font-display">{stat.number}</div>
                <div className="text-sm text-muted-foreground font-medium">{stat.label}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default About;
