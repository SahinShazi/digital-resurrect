import Navbar from "@/components/Navbar";
import About from "@/components/About";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";

const AboutPage = () => {
  const { lang } = useLanguage();

  return (
    <div className={`min-h-screen ${lang === "bn" ? "font-bangla" : ""}`}>
      <Navbar />
      <main className="pt-20">
        <About />
      </main>
      <Footer />
    </div>
  );
};

export default AboutPage;
