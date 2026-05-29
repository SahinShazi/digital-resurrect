import Navbar from "@/components/Navbar";
import Projects from "@/components/Projects";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";

const ProjectsPage = () => (
  <div className="min-h-screen flex flex-col">
    <Navbar />
    <main className="pt-20 flex-grow">
      <Reveal><Projects /></Reveal>
    </main>
    <Footer />
  </div>
);

export default ProjectsPage;
