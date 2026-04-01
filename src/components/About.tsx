import { Briefcase, FolderOpen, Users, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import profilePhoto from "@/assets/banner.jpg";
import { useLanguage } from "@/contexts/LanguageContext";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const About = () => {
  const { t } = useLanguage();

  const { data: about } = useQuery({
    queryKey: ["about_section"],
    queryFn: async () => {
      const { data } = await supabase.from("about_section").select("*").limit(1).single();
      return data;
    },
  });

  const stats = [
    { icon: Briefcase, number: about ? `${about.years_experience}+` : "2+", label: t("about.stat1"), color: "bg-primary" },
    { icon: FolderOpen, number: about ? `${about.projects_completed}+` : "50+", label: t("about.stat2"), color: "bg-accent" },
    { icon: Users, number: about ? `${about.happy_clients}+` : "100+", label: t("about.stat3"), color: "bg-coral" },
  ];

  return (
    <section id="about" className="section-padding">
      <div className="container-width">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-4">{t("about.heading")}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">{t("about.badge")}</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          <div className="relative rounded-2xl overflow-hidden aspect-[4/5] max-w-md mx-auto lg:mx-0 shadow-xl">
            <img src={about?.profile_image || profilePhoto} alt="Sahin Enam" className="w-full h-full object-cover" />
          </div>

          <div className="space-y-6">
            <h3 className="font-display text-2xl md:text-3xl font-bold text-primary">{t("about.subtitle")}</h3>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              {about?.bio_text ? (
                about.bio_text.split('\n').filter(Boolean).map((p: string, i: number) => <p key={i}>{p}</p>)
              ) : (
                <>
                  <p>{t("about.p1")}</p>
                  <p>{t("about.p2")}</p>
                  <p>{t("about.p3")}</p>
                </>
              )}
            </div>
            <Link to="/contact" className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all duration-300">
              {t("about.cta")}
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
                  <Icon className="w-6 h-6 text-white" />
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
