import Navbar from "@/components/Navbar";
import Skills from "@/components/Skills";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";

const SkillsPage = () => {
  const { lang } = useLanguage();

  return (
    <div className={`min-h-screen ${lang === "bn" ? "font-bangla" : ""}`}>
      <Navbar />
      <main className="pt-20">
        <Skills />
      </main>
      <Footer />
    </div>
  );
};

export default SkillsPage;
