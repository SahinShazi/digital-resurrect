import { useState } from "react";
import { Mail, MapPin, Send, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import emailjs from "@emailjs/browser";
import { useLanguage } from "@/contexts/LanguageContext";

const Contact = () => {
  const { toast } = useToast();
  const { t } = useLanguage();
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
      toast({ title: t("contact.successTitle"), description: t("contact.successDesc") });
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      console.error("Error sending message:", error);
      toast({ title: t("contact.errorTitle"), description: t("contact.errorDesc"), variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    { icon: Mail, label: t("contact.email"), value: "sahin.enam10@gmail.com", href: "mailto:sahin.enam10@gmail.com" },
    { icon: MapPin, label: t("contact.location"), value: "Barisal, Bangladesh", href: "https://maps.app.goo.gl/VXr3hJekYW1v1mFu8" },
  ];

  return (
    <section id="contact" className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-secondary/30" />
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[150px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 text-sm font-medium text-primary bg-primary/10 rounded-full mb-4">{t("contact.badge")}</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display text-foreground mb-4">{t("contact.heading")}</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">{t("contact.subtitle")}</p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12">
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h3 className="text-2xl font-bold font-display mb-4">{t("contact.leftTitle")}</h3>
              <p className="text-muted-foreground leading-relaxed">{t("contact.leftDesc")}</p>
            </div>
            <div className="space-y-4">
              {contactInfo.map((info, index) => {
                const Icon = info.icon;
                return (
                  <a key={index} href={info.href} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-4 p-4 rounded-xl glass hover:border-primary/30 transition-all">
                    <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center text-primary-foreground flex-shrink-0"><Icon className="w-5 h-5" /></div>
                    <div className="flex-grow">
                      <div className="text-sm text-muted-foreground">{info.label}</div>
                      <div className="font-semibold text-foreground group-hover:text-primary transition-colors">{info.value}</div>
                    </div>
                    <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </a>
                );
              })}
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="p-6 md:p-8 rounded-2xl glass">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2 text-foreground">{t("contact.nameLabel")}</label>
                    <Input id="name" name="name" value={formData.name} onChange={handleChange} placeholder={t("contact.namePlaceholder")} required className="h-12 bg-secondary/50 border-border focus:border-primary" />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2 text-foreground">{t("contact.emailLabel")}</label>
                    <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder={t("contact.emailPlaceholder")} required className="h-12 bg-secondary/50 border-border focus:border-primary" />
                  </div>
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium mb-2 text-foreground">{t("contact.subjectLabel")}</label>
                  <Input id="subject" name="subject" value={formData.subject} onChange={handleChange} placeholder={t("contact.subjectPlaceholder")} required className="h-12 bg-secondary/50 border-border focus:border-primary" />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2 text-foreground">{t("contact.messageLabel")}</label>
                  <Textarea id="message" name="message" value={formData.message} onChange={handleChange} placeholder={t("contact.messagePlaceholder")} required rows={5} className="resize-none bg-secondary/50 border-border focus:border-primary" />
                </div>
                <Button type="submit" size="lg" disabled={isSubmitting} className="w-full gradient-primary text-primary-foreground font-semibold py-6 rounded-xl hover:scale-[1.02] transition-transform">
                  <Send className="w-5 h-5 mr-2" />
                  {isSubmitting ? t("contact.sending") : t("contact.send")}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
