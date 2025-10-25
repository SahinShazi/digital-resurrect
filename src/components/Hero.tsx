import { Github, Linkedin, Twitter, ChevronDown, Download, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroBg from "@/assets/profile-photo.jpg";

const Hero = () => {
  const socialLinks = [
    { icon: Github, href: "https://github.com/SahinShazi", label: "GitHub" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/sahinenam?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app", label: "LinkedIn" },
    { icon: Twitter, href: "https://x.com/Sahin_Tech_1", label: "Twitter" },
  ];

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `url(${heroBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Enhanced Overlay with better gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background/95 via-background/90 to-primary/20 z-0" />
      
      {/* Animated gradient orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/30 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto py-20">
        <div className="animate-fade-in-up space-y-8">
          {/* Greeting Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm mb-4">
            <span className="text-2xl animate-wave">👋</span>
            <span className="text-sm font-medium text-foreground">Welcome to my portfolio</span>
          </div>

          {/* Main Heading */}
          <div className="space-y-4">
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight">
              <span className="text-foreground">Hi, I'm </span>
              <span className="block mt-2 gradient-text bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text">
                Sahin Enam
              </span>
            </h1>
            
            <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-muted-foreground">
              Frontend Developer
            </p>
          </div>

          {/* Description */}
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            I create exceptional digital experiences with clean code, modern design, 
            and cutting-edge technologies.
          </p>

          {/* Social Links */}
          <div className="flex justify-center gap-3 pt-4">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative w-14 h-14 rounded-2xl bg-card/50 backdrop-blur-sm border border-primary/20 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-primary/20"
                  aria-label={social.label}
                >
                  <Icon className="w-6 h-6 transition-transform group-hover:scale-110" />
                </a>
              );
            })}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
            <Button
              asChild
              size="lg"
              className="group gradient-primary text-white border-0 shadow-lg hover:shadow-2xl hover:shadow-primary/50 hover:-translate-y-1 transition-all duration-300 text-base font-semibold px-8 py-6 rounded-xl"
            >
              <a href="#projects" className="flex items-center gap-2">
                View My Work
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
            
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-2 border-primary/30 bg-background/50 backdrop-blur-sm hover:bg-primary/10 hover:border-primary transition-all duration-300 text-base font-semibold px-8 py-6 rounded-xl hover:-translate-y-1 hover:shadow-lg"
            >
              <a href="#contact">Get In Touch</a>
            </Button>
            
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-2 border-primary/30 bg-background/50 backdrop-blur-sm hover:bg-primary/10 hover:border-primary transition-all duration-300 text-base font-semibold px-8 py-6 rounded-xl hover:-translate-y-1 hover:shadow-lg"
            >
              <a href="/resume.pdf" download="Resume.pdf" className="flex items-center gap-2">
                <Download className="w-5 h-5" />
                Download Resume
              </a>
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <a
        href="#about"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 group"
        aria-label="Scroll to about section"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs text-muted-foreground font-medium">Scroll Down</span>
          <div className="w-6 h-10 rounded-full border-2 border-primary/30 flex items-start justify-center p-2">
            <ChevronDown className="w-4 h-4 text-primary animate-bounce" />
          </div>
        </div>
      </a>
    </section>
  );
};

export default Hero;
