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
    <section className="section-padding">
      <div className="container-width">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-4">{t("testimonials.heading")}</h2>
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
                  <div className="h-full bg-card border border-border rounded-2xl p-6 flex flex-col relative">
                    <Quote className="w-10 h-10 text-accent/40 mb-4" />
                    <div className="flex gap-0.5 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground mb-6 leading-relaxed flex-grow italic">"{testimonial.content}"</p>
                    <div className="flex items-center gap-3 pt-4 border-t border-border">
                      {testimonial.avatar && (testimonial.avatar.startsWith("http") || testimonial.avatar.startsWith("/")) ? (
                        <img src={testimonial.avatar} alt={testimonial.name} className="w-11 h-11 rounded-full object-cover border-2 border-accent/30" />
                      ) : (
                        <div className="w-11 h-11 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-sm font-bold">
                          {testimonial.avatar || testimonial.name.split(" ").map((n: string) => n[0]).join("").slice(0, 2).toUpperCase()}
                        </div>
                      )}
                      <div>
                        <p className="text-sm font-bold text-foreground">{testimonial.name}</p>
                        <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center gap-3 mt-8">
              <CarouselPrevious className="relative inset-0 translate-x-0 translate-y-0 bg-primary text-primary-foreground hover:bg-primary/90 border-none" />
              <CarouselNext className="relative inset-0 translate-x-0 translate-y-0 bg-primary text-primary-foreground hover:bg-primary/90 border-none" />
            </div>
          </Carousel>
        )}
      </div>
    </section>
  );
};

export default Testimonials;
