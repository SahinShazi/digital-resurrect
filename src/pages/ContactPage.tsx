import Navbar from "@/components/Navbar";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";

const ContactPage = () => {
  const { lang } = useLanguage();

  return (
    <div className={`min-h-screen flex flex-col ${lang === "bn" ? "font-bangla" : ""}`}>
      <Navbar />
      <main className="pt-20">
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default ContactPage;
