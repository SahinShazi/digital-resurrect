import Navbar from "@/components/Navbar";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";

const TestimonialsPage = () => (
  <div className="min-h-screen flex flex-col">
    <Navbar />
    <main className="pt-20 flex-grow">
      <Reveal><Testimonials /></Reveal>
    </main>
    <Footer />
  </div>
);

export default TestimonialsPage;
