import Navbar from "@/components/Navbar";
import Experience from "@/components/Experience";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";

const ExperiencePage = () => {
  const { lang } = useLanguage();

  return (
    <div className={`min-h-screen ${lang === "bn" ? "font-bangla" : ""}`}>
      <Navbar />
      <main className="pt-20">
        <Experience />
      </main>
      <Footer />
    </div>
  );
};

export default ExperiencePage;
