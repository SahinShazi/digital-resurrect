import { Github, Linkedin, Youtube, Twitter, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroBg from "@/assets/profile-photo.jpg";

const Hero = () => {
  const socialLinks = [
    { icon: Github, href: "https://github.com/SahinShazi", label: "GitHub" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/sahin-shazi", label: "LinkedIn" },
    { icon: Twitter, href: "https://x.com/Sahin_Tech_1", label: "Twitter" },
  ];

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 md:pt-20"
      style={{
        backgroundImage: `url(${heroBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/60 to-primary/30 z-0" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="animate-fade-in-up">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white mb-4 md:mb-6">
            <span className="animate-wave inline-block">👋</span> Hi, I'm{" "}
            <span className="gradient-text bg-gradient-to-r from-purple-400 to-pink-400">
              Sahin Enam
            </span>
          </h1>

          <p className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white mb-4 typing-cursor">
            Frontend Developer
          </p>

          <p className="text-base sm:text-lg md:text-xl text-gray-200 mb-8 md:mb-10 max-w-2xl mx-auto leading-relaxed">
            I create exceptional digital experiences with clean code, modern design, and cutting-edge technologies.
          </p>

          {/* Social Links */}
          <div className="flex justify-center gap-4 mb-8 md:mb-10">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-primary transition-all hover:scale-110"
                  aria-label={social.label}
                >
                  <Icon className="w-5 h-5" />
                </a>
              );
            })}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button
              asChild
              size="lg"
              className="gradient-primary text-white border-0 shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all text-base font-semibold"
            >
              <a href="#projects">View My Work</a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="bg-white/10 backdrop-blur-sm border-2 border-white text-white hover:bg-white hover:text-primary transition-all text-base font-semibold"
            >
              <a href="#contact">Get In Touch</a>
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <a
        href="#about"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce z-10"
        aria-label="Scroll to about section"
      >
        <ChevronDown className="w-8 h-8 text-white/80" />
      </a>
    </section>
  );
};

export default Hero;
