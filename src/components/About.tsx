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
    { icon: Briefcase, number: about ? `${about.years_experience}+` : "2+", label: t("about.stat1") },
    { icon: FolderOpen, number: about ? `${about.projects_completed}+` : "50+", label: t("about.stat2") },
    { icon: Users, number: about ? `${about.happy_clients}+` : "100+", label: t("about.stat3") },
  ];

  return (
    <section id="about" className="section-padding bg-secondary/50">
      <div className="container-width">
        <div className="text-center mb-12">
          <p className="text-primary font-medium text-sm tracking-wide uppercase mb-2">{t("about.badge")}</p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">{t("about.heading")}</h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div className="relative rounded-xl overflow-hidden aspect-[4/5] max-w-sm mx-auto lg:mx-0 border border-border shadow-md">
            <img src={about?.profile_image || profilePhoto} alt="Sahin Enam" className="w-full h-full object-cover" />
          </div>

          <div className="space-y-5">
            <h3 className="text-xl md:text-2xl font-bold text-primary">{t("about.subtitle")}</h3>
            <div className="space-y-3 text-muted-foreground leading-relaxed">
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
            <Link to="/contact" className="inline-flex items-center gap-1.5 text-primary font-medium hover:underline">
              {t("about.cta")}
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-background border border-border rounded-xl p-6 text-center shadow-sm">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-3">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <div className="text-3xl font-bold text-foreground mb-1">{stat.number}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default About;
