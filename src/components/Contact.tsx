import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const Contact = () => {
  const { t } = useLanguage();

  return (
    <section id="contact" className="py-20 md:py-32">
      <div className="container-width">
        <div className="max-w-3xl">
          <p className="text-sm text-muted-foreground font-mono mb-4">That's all for now.</p>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-foreground leading-tight mb-10">
            Got a project in mind?<br />
            Let's talk
          </h2>
        </div>

        {/* Divider with floating button */}
        <div className="relative">
          <div className="border-t border-border" />
          <div className="absolute right-4 sm:right-12 -top-16">
            <Link
              to="/contact"
              className="w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-medium text-sm sm:text-base hover:scale-105 transition-transform duration-300 shadow-lg"
            >
              Get in touch
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
