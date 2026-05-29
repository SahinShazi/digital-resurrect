import Navbar from "@/components/Navbar";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";

const ContactPage = () => (
  <div className="min-h-screen flex flex-col">
    <Navbar />
    <main className="pt-20 flex-grow">
      <Reveal><Contact /></Reveal>
    </main>
    <Footer />
  </div>
);

export default ContactPage;
