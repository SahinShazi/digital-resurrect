import { Code2, Database, Flame, GitBranch, Bot, Globe } from "lucide-react";

const Skills = () => {
  const skills = [
    { name: "HTML5 & CSS3", icon: Globe, percentage: 100, color: "from-orange-500 to-red-500" },
    { name: "JavaScript", icon: Code2, percentage: 80, color: "from-yellow-400 to-orange-500" },
    { name: "React & TypeScript", icon: Code2, percentage: 75, color: "from-cyan-400 to-blue-500" },
    { name: "Firebase", icon: Flame, percentage: 74, color: "from-amber-500 to-orange-600" },
    { name: "Git & GitHub", icon: GitBranch, percentage: 100, color: "from-purple-500 to-pink-500" },
    { name: "AI Automation", icon: Bot, percentage: 50, color: "from-emerald-400 to-cyan-500" },
  ];

  return (
    <section id="skills" className="relative py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-secondary/30" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-[150px]" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 text-sm font-medium text-primary bg-primary/10 rounded-full mb-4">
            My Skills
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display text-foreground mb-4">
            Technical Expertise
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Technologies I use to bring ideas to life
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((skill) => {
            const Icon = skill.icon;
            return (
              <div
                key={skill.name}
                className="group relative p-6 md:p-8 rounded-2xl glass hover:border-primary/30 transition-all duration-300"
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <div className="relative">
                  {/* Icon */}
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${skill.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>

                  {/* Name and percentage */}
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-foreground">
                      {skill.name}
                    </h3>
                    <span className="text-sm font-bold text-primary">
                      {skill.percentage}%
                    </span>
                  </div>

                  {/* Progress bar */}
                  <div className="relative h-2 bg-secondary rounded-full overflow-hidden">
                    <div
                      className={`absolute inset-y-0 left-0 bg-gradient-to-r ${skill.color} rounded-full transition-all duration-1000 ease-out`}
                      style={{ width: `${skill.percentage}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;