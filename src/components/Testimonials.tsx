import { Star, Quote } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";

const Testimonials = () => {
  const { t } = useLanguage();

  const { data: testimonials = [], isLoading } = useQuery({
    queryKey: ["testimonials"],
    queryFn: async () => {
      const { data, error } = await supabase.from("testimonials").select("*").order("display_order");
      if (error) throw error;
      return data;
    },
  });

  return (
    <section className="section-padding bg-secondary/50">
      <div className="container-width">
        <div className="text-center mb-12">
          <p className="text-primary font-medium text-sm tracking-wide uppercase mb-2">{t("testimonials.badge")}</p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3">{t("testimonials.heading")}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">{t("testimonials.subtitle")}</p>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-16">
            <div className="animate-spin w-6 h-6 border-2 border-primary border-t-transparent rounded-full" />
          </div>
        ) : (
          <Carousel opts={{ align: "start", loop: true }} className="w-full max-w-5xl mx-auto">
            <CarouselContent className="-ml-4">
              {testimonials.map((testimonial) => (
                <CarouselItem key={testimonial.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                  <div className="h-full bg-background border border-border rounded-xl p-5 flex flex-col">
                    <Quote className="w-8 h-8 text-primary/20 mb-3" />
                    <div className="flex gap-0.5 mb-3">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-primary text-primary" />
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground mb-5 leading-relaxed flex-grow">"{testimonial.content}"</p>
                    <div className="flex items-center gap-3 pt-3 border-t border-border">
                      {testimonial.avatar && (testimonial.avatar.startsWith("http") || testimonial.avatar.startsWith("/")) ? (
                        <img src={testimonial.avatar} alt={testimonial.name} className="w-9 h-9 rounded-full object-cover" />
                      ) : (
                        <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-semibold">
                          {testimonial.avatar || testimonial.name.split(" ").map((n: string) => n[0]).join("").slice(0, 2).toUpperCase()}
                        </div>
                      )}
                      <div>
                        <p className="text-sm font-medium text-foreground">{testimonial.name}</p>
                        <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center gap-3 mt-6">
              <CarouselPrevious className="relative inset-0 translate-x-0 translate-y-0" />
              <CarouselNext className="relative inset-0 translate-x-0 translate-y-0" />
            </div>
          </Carousel>
        )}
      </div>
    </section>
  );
};

export default Testimonials;
