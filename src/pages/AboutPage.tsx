import Navbar from "@/components/Navbar";
import About from "@/components/About";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";

const AboutPage = () => (
  <div className="min-h-screen flex flex-col">
    <Navbar />
    <main className="pt-20 flex-grow">
      <Reveal><About /></Reveal>
    </main>
    <Footer />
  </div>
);

export default AboutPage;
