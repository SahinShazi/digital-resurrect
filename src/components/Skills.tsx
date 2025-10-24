const Skills = () => {
  const skills = [
    {
      name: "HTML5",
      icon: "fab fa-html5",
      percentage: 100,
    },
    {
      name: "CSS3",
      icon: "fab fa-css3-alt",
      percentage: 100,
    },
    {
      name: "JavaScript",
      icon: "fab fa-js-square",
      percentage: 80,
    },
    {
      name: "Firebase",
      icon: "fas fa-fire",
      percentage: 74,
    },
    {
      name: "Python",
      icon: "fab fa-python",
      percentage: 40,
    },
    {
  name: "Git & GitHub",
  icon: "fab fa-github",
  percentage: 100,
},
{
      name: "AI Automation",
      icon: "fas fa-robot",
      percentage: 50,
    }
  ];

  return (
    <section id="skills" className="py-20 md:py-28 bg-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
            My Technical Skills
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Technologies I leverage to craft robust and beautiful web applications.
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {skills.map((skill) => (
            <div
              key={skill.name}
              className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-border hover:-translate-y-2 hover:shadow-xl transition-all"
            >
              <div className="text-center mb-6">
                <i
                  className={`${skill.icon} text-6xl md:text-7xl gradient-text`}
                  aria-hidden="true"
                />
              </div>

              <h3 className="text-xl md:text-2xl font-semibold text-center mb-6">
                {skill.name}
              </h3>

              <div className="relative">
                <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full gradient-primary rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${skill.percentage}%` }}
                  />
                </div>
                <span className="absolute -top-6 right-0 text-sm font-bold gradient-text">
                  {skill.percentage}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Font Awesome Script */}
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
      />
    </section>
  );
};

export default Skills;
