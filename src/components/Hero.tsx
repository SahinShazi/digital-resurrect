import { Github, Linkedin, Twitter, ArrowDown, Download, ArrowRight, Code2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import profilePhoto from "@/assets/profile-photo.jpg";
import { useLanguage } from "@/contexts/LanguageContext";

const Hero = () => {
  const { t } = useLanguage();

  const socialLinks = [
    { icon: Github, href: "https://github.com/SahinShazi", label: "GitHub" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/sahinenam", label: "LinkedIn" },
    { icon: Twitter, href: "https://x.com/Sahin_Tech_1", label: "Twitter" },
  ];

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden bg-background">
      {/* Background effects */}
      <div className="absolute inset-0 bg-grid" />
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-pulse-glow" />
      <div className="absolute bottom-1/4 -right-32 w-80 h-80 bg-accent/20 rounded-full blur-[100px] animate-pulse-glow" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px]" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 pt-28">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="order-2 lg:order-1 text-center lg:text-left">
            <div className="animate-fade-in-up inline-flex items-center gap-2 px-4 py-2 rounded-full glass border-glow mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              <span className="text-sm font-medium text-foreground/80">{t("hero.available")}</span>
            </div>

            <h1 className="animate-fade-in-up-delay-1 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-display leading-tight mb-6">
              <span className="text-foreground">{t("hero.greeting")}</span>
              <br />
              <span className="gradient-text text-glow">{t("hero.name")}</span>
            </h1>

            <div className="animate-fade-in-up-delay-2 flex items-center justify-center lg:justify-start gap-3 mb-6">
              <Code2 className="w-6 h-6 text-primary" />
              <span className="text-xl sm:text-2xl md:text-3xl font-semibold text-muted-foreground">
                {t("hero.role")}
              </span>
            </div>

            <p className="animate-fade-in-up-delay-3 text-base sm:text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed">
              {t("hero.description")}
            </p>

            <div className="animate-fade-in-up-delay-3 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-10">
              <Button asChild size="lg" className="group gradient-primary text-primary-foreground font-semibold px-8 py-6 rounded-xl hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-primary/30">
                <a href="#projects" className="flex items-center gap-2">
                  {t("hero.viewProjects")}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-2 border-border bg-card/50 hover:bg-card hover:border-primary/50 font-semibold px-8 py-6 rounded-xl transition-all duration-300">
                <a href="/resume.pdf" download="Sahin_Enam_Resume.pdf" className="flex items-center gap-2">
                  <Download className="w-5 h-5" />
                  {t("hero.resume")}
                </a>
              </Button>
            </div>

            <div className="animate-fade-in-up-delay-3 flex gap-4 justify-center lg:justify-start">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" className="group w-12 h-12 rounded-xl glass flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-all duration-300 hover:scale-110" aria-label={social.label}>
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>

          <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
            <div className="relative animate-fade-in-up">
              <div className="absolute -inset-4 rounded-full border border-primary/20 animate-pulse-glow" />
              <div className="absolute -inset-8 rounded-full border border-primary/10" />
              <div className="absolute -inset-12 rounded-full border border-primary/5" />
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-full overflow-hidden border-4 border-primary/30 shadow-2xl">
                <img src={profilePhoto} alt="Sahin Enam" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
              </div>
              <div className="absolute -right-4 top-1/4 glass px-4 py-2 rounded-xl animate-float shadow-lg">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium">{t("hero.yearsExp")}</span>
                </div>
              </div>
              <div className="absolute -left-4 bottom-1/4 glass px-4 py-2 rounded-xl animate-float shadow-lg" style={{ animationDelay: '1s' }}>
                <div className="flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-accent" />
                  <span className="text-sm font-medium">{t("hero.projects")}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <a href="#about" className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 hidden sm:flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
        <span className="text-xs font-medium">{t("hero.scroll")}</span>
        <div className="w-6 h-10 rounded-full border-2 border-current flex items-start justify-center p-2">
          <ArrowDown className="w-3 h-3 animate-bounce" />
        </div>
      </a>
    </section>
  );
};

export default Hero;
