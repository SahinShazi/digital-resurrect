import Navbar from "@/components/Navbar";
import Skills from "@/components/Skills";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";

const SkillsPage = () => (
  <div className="min-h-screen flex flex-col">
    <Navbar />
    <main className="pt-20 flex-grow">
      <Reveal><Skills /></Reveal>
    </main>
    <Footer />
  </div>
);

export default SkillsPage;
