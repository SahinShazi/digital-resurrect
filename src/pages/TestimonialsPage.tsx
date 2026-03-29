import Navbar from "@/components/Navbar";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";

const TestimonialsPage = () => {
  const { lang } = useLanguage();

  return (
    <div className={`min-h-screen flex flex-col ${lang === "bn" ? "font-bangla" : ""}`}>
      <Navbar />
      <main className="pt-20 flex-grow">
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
};

export default TestimonialsPage;
