import Navbar from "@/components/Navbar";
import Experience from "@/components/Experience";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";

const ExperiencePage = () => (
  <div className="min-h-screen flex flex-col">
    <Navbar />
    <main className="pt-20 flex-grow">
      <Reveal><Experience /></Reveal>
    </main>
    <Footer />
  </div>
);

export default ExperiencePage;
