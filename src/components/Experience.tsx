import { Briefcase, Calendar, MapPin } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const experiences = [
  {
    title: "Senior Full Stack Developer",
    company: "Tech Solutions Inc.",
    location: "Remote",
    period: "2022 - Present",
    description: "Leading development of scalable web applications using React, Node.js, and cloud technologies.",
    achievements: ["Increased application performance by 40%", "Led team of 5 developers", "Implemented CI/CD pipeline"],
  },
  {
    title: "Full Stack Developer",
    company: "Digital Innovations Ltd.",
    location: "Dhaka, Bangladesh",
    period: "2020 - 2022",
    description: "Developed and maintained multiple client projects using modern web technologies.",
    achievements: ["Built 15+ client projects", "Reduced load time by 50%", "Implemented responsive designs"],
  },
  {
    title: "Junior Developer",
    company: "StartUp Ventures",
    location: "Barisal, Bangladesh",
    period: "2018 - 2020",
    description: "Contributed to front-end development using React and Vue.js.",
    achievements: ["Developed reusable components", "Fixed 200+ bugs", "Improved code quality"],
  },
];

const Experience = () => {
  const { t } = useLanguage();

  return (
    <section id="experience" className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary/10 rounded-full blur-[150px]" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 text-sm font-medium text-primary bg-primary/10 rounded-full mb-4">
            {t("experience.badge")}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display text-foreground mb-4">
            {t("experience.heading")}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t("experience.subtitle")}
          </p>
        </div>

        <div className="relative">
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-primary/50 to-transparent md:-translate-x-px" />
          {experiences.map((exp, index) => (
            <div key={index} className={`relative flex flex-col md:flex-row gap-8 mb-12 last:mb-0 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
              <div className="absolute left-0 md:left-1/2 top-0 w-4 h-4 rounded-full bg-primary border-4 border-background -translate-x-[7px] md:-translate-x-1/2 shadow-lg shadow-primary/50" />
              <div className={`flex-1 ${index % 2 === 0 ? 'md:pr-16 md:text-right' : 'md:pl-16'}`} />
              <div className={`flex-1 pl-8 md:pl-0 ${index % 2 === 0 ? 'md:pl-16' : 'md:pr-16 md:text-right'}`}>
                <div className="group p-6 rounded-2xl glass hover:border-primary/30 transition-all duration-300">
                  <div className={`flex items-start gap-4 mb-4 ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                    <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center flex-shrink-0">
                      <Briefcase className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div className={index % 2 === 1 ? 'md:text-right' : ''}>
                      <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">{exp.title}</h3>
                      <p className="text-primary font-medium">{exp.company}</p>
                    </div>
                  </div>
                  <div className={`flex flex-wrap gap-4 text-sm text-muted-foreground mb-4 ${index % 2 === 1 ? 'md:justify-end' : ''}`}>
                    <span className="flex items-center gap-1"><Calendar className="w-4 h-4" />{exp.period}</span>
                    <span className="flex items-center gap-1"><MapPin className="w-4 h-4" />{exp.location}</span>
                  </div>
                  <p className="text-muted-foreground mb-4">{exp.description}</p>
                  <div className="space-y-2">
                    {exp.achievements.map((achievement, idx) => (
                      <div key={idx} className={`flex items-center gap-2 ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                        <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">{achievement}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
