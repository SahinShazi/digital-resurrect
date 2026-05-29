import { useState } from "react";
import { Mail, MapPin, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import emailjs from "@emailjs/browser";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await emailjs.send("service_znsqaoq", "template_gbrjc78", {
        from_name: formData.name, from_email: formData.email, subject: formData.subject, message: formData.message,
      }, "J-3oOPD-4XB8LTpB8");
      toast({ title: "Message sent!", description: "Thank you for reaching out. I'll get back to you soon." });
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      console.error("Error sending message:", error);
      toast({ title: "Error sending message", description: "Please try again later or contact me directly via email.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    { icon: Mail, label: "Email", value: "sahin.enam10@gmail.com", href: "mailto:sahin.enam10@gmail.com" },
    { icon: MapPin, label: "Location", value: "Barisal, Bangladesh", href: "https://maps.app.goo.gl/VXr3hJekYW1v1mFu8" },
  ];

  return (
    <section id="contact" className="section-padding bg-primary text-primary-foreground">
      <div className="container-width">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-primary-foreground">Get In Touch</h2>
          <p className="text-primary-foreground/70 max-w-2xl mx-auto">Have a project in mind? Let's discuss how we can work together.</p>
        </div>

        <div className="grid lg:grid-cols-5 gap-10 max-w-5xl mx-auto">
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h3 className="font-display text-2xl font-bold mb-3 text-primary-foreground">Let's work together</h3>
              <p className="text-sm text-primary-foreground/70 leading-relaxed">I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions. Feel free to reach out!</p>
            </div>
            <div className="space-y-3">
              {contactInfo.map((info, index) => {
                const Icon = info.icon;
                return (
                  <a key={index} href={info.href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-4 rounded-2xl bg-primary-foreground/10 hover:bg-primary-foreground/15 transition-colors">
                    <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center flex-shrink-0">
                      <Icon className="w-4 h-4 text-accent-foreground" />
                    </div>
                    <div>
                      <p className="text-xs text-primary-foreground/60">{info.label}</p>
                      <p className="text-sm font-medium text-primary-foreground">{info.value}</p>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>

          <div className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="space-y-4 bg-primary-foreground/10 backdrop-blur-sm rounded-2xl p-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2 text-primary-foreground/80">Your Name</label>
                  <Input id="name" name="name" value={formData.name} onChange={handleChange} placeholder="John Doe" required className="h-11 bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/40 focus:border-accent" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2 text-primary-foreground/80">Your Email</label>
                  <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="john@example.com" required className="h-11 bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/40 focus:border-accent" />
                </div>
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium mb-2 text-primary-foreground/80">Subject</label>
                <Input id="subject" name="subject" value={formData.subject} onChange={handleChange} placeholder="Project Inquiry" required className="h-11 bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/40 focus:border-accent" />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2 text-primary-foreground/80">Message</label>
                <Textarea id="message" name="message" value={formData.message} onChange={handleChange} placeholder="Tell me about your project..." required rows={4} className="resize-none bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/40 focus:border-accent" />
              </div>
              <Button type="submit" size="lg" disabled={isSubmitting} className="w-full font-medium rounded-full bg-accent text-accent-foreground hover:bg-accent/90">
                <Send className="w-4 h-4 mr-2" />
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
