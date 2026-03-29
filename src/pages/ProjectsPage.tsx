import Navbar from "@/components/Navbar";
import Projects from "@/components/Projects";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";

const ProjectsPage = () => {
  const { lang } = useLanguage();

  return (
    <div className={`min-h-screen flex flex-col ${lang === "bn" ? "font-bangla" : ""}`}>
      <Navbar />
      <main className="pt-20 flex-grow">
        <Projects />
      </main>
      <Footer />
    </div>
  );
};

export default ProjectsPage;
