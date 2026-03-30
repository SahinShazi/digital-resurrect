import { useState } from "react";
import { Mail, MapPin, Send } from "lucide-react";
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
    <section id="contact" className="section-padding">
      <div className="container-width">
        <div className="text-center mb-12">
          <p className="text-primary font-medium text-sm tracking-wide uppercase mb-2">{t("contact.badge")}</p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3">{t("contact.heading")}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">{t("contact.subtitle")}</p>
        </div>

        <div className="grid lg:grid-cols-5 gap-10 max-w-5xl mx-auto">
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">{t("contact.leftTitle")}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{t("contact.leftDesc")}</p>
            </div>
            <div className="space-y-3">
              {contactInfo.map((info, index) => {
                const Icon = info.icon;
                return (
                  <a key={index} href={info.href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 rounded-lg border border-border hover:border-primary/30 transition-colors">
                    <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">{info.label}</p>
                      <p className="text-sm font-medium text-foreground">{info.value}</p>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>

          <div className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="space-y-4 border border-border rounded-xl p-5">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-1.5">{t("contact.nameLabel")}</label>
                  <Input id="name" name="name" value={formData.name} onChange={handleChange} placeholder={t("contact.namePlaceholder")} required className="h-10" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1.5">{t("contact.emailLabel")}</label>
                  <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder={t("contact.emailPlaceholder")} required className="h-10" />
                </div>
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium mb-1.5">{t("contact.subjectLabel")}</label>
                <Input id="subject" name="subject" value={formData.subject} onChange={handleChange} placeholder={t("contact.subjectPlaceholder")} required className="h-10" />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-1.5">{t("contact.messageLabel")}</label>
                <Textarea id="message" name="message" value={formData.message} onChange={handleChange} placeholder={t("contact.messagePlaceholder")} required rows={4} className="resize-none" />
              </div>
              <Button type="submit" size="lg" disabled={isSubmitting} className="w-full font-medium">
                <Send className="w-4 h-4 mr-2" />
                {isSubmitting ? t("contact.sending") : t("contact.send")}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
