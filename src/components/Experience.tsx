import { Briefcase, Calendar } from "lucide-react";

const experiences = [
  {
    title: "Senior Full Stack Developer",
    company: "Tech Solutions Inc.",
    period: "2022 - Present",
    description: "Leading development of scalable web applications using React, Node.js, and cloud technologies. Mentoring junior developers and architecting system solutions.",
    achievements: [
      "Increased application performance by 40%",
      "Led team of 5 developers",
      "Implemented CI/CD pipeline"
    ]
  },
  {
    title: "Full Stack Developer",
    company: "Digital Innovations Ltd.",
    period: "2020 - 2022",
    description: "Developed and maintained multiple client projects using modern web technologies. Collaborated with designers and product managers to deliver high-quality solutions.",
    achievements: [
      "Built 15+ client projects",
      "Reduced load time by 50%",
      "Implemented responsive designs"
    ]
  },
  {
    title: "Junior Developer",
    company: "StartUp Ventures",
    period: "2018 - 2020",
    description: "Contributed to front-end development using React and Vue.js. Participated in code reviews and agile development processes.",
    achievements: [
      "Developed reusable components",
      "Fixed 200+ bugs",
      "Improved code quality"
    ]
  }
];

const Experience = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 gradient-text">
          Experience
        </h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          My professional journey and key achievements
        </p>

        <div className="max-w-4xl mx-auto">
          {experiences.map((exp, index) => (
            <div key={index} className="relative pl-8 pb-12 last:pb-0">
              {/* Timeline line */}
              <div className="absolute left-[15px] top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary/50 to-transparent" />
              
              {/* Timeline dot */}
              <div className="absolute left-0 top-2 w-8 h-8 rounded-full bg-primary/20 border-4 border-primary flex items-center justify-center">
                <Briefcase className="w-4 h-4 text-primary" />
              </div>

              {/* Content */}
              <div className="ml-8 group">
                <div className="bg-card/50 backdrop-blur-sm border border-primary/10 rounded-lg p-6 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                    <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                      {exp.title}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1 sm:mt-0">
                      <Calendar className="w-4 h-4" />
                      {exp.period}
                    </div>
                  </div>
                  
                  <p className="text-primary font-medium mb-3">{exp.company}</p>
                  
                  <p className="text-muted-foreground mb-4">
                    {exp.description}
                  </p>

                  <div className="space-y-2">
                    {exp.achievements.map((achievement, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
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
