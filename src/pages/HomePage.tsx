import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";

const HomePage = () => {
  const { lang } = useLanguage();

  return (
    <div className={`min-h-screen ${lang === "bn" ? "font-bangla" : ""}`}>
      <Navbar />
      <main>
        <Hero />
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
