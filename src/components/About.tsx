const About = () => {
  const stats = [
    { number: "5+", label: "Years Experience" },
    { number: "50+", label: "Projects Completed" },
    { number: "100+", label: "Happy Clients" },
  ];

  return (
    <section id="about" className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
            About Me
          </h2>
          <p className="text-muted-foreground text-lg">Get to know me better</p>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto">
          <div className="space-y-6 mb-12">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold mb-4 gradient-text">
                Professional Web Developer
              </h3>
            </div>

            <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
              Hello! I'm Sahin Enam, a passionate Full Stack Web Developer with over 5 years of experience
              creating digital solutions that make a difference. I specialize in building scalable web applications
              using modern technologies like React, Node.js, and MongoDB.
            </p>

            <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
              My journey in web development started with a curiosity about how websites work, and it has
              evolved into a career where I get to solve complex problems and create user-friendly experiences
              every day. I believe in writing clean, maintainable code and staying up-to-date with the latest
              industry trends.
            </p>

            <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
              When I'm not coding, you can find me exploring new technologies, contributing to open-source
              projects, or sharing my knowledge with the developer community.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center p-6 rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-100 hover:shadow-lg transition-shadow"
              >
                <div className="text-4xl md:text-5xl font-extrabold gradient-text mb-2">
                  {stat.number}
                </div>
                <div className="text-muted-foreground font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
