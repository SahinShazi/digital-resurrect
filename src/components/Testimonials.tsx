import { Card, CardContent } from "@/components/ui/card";
import { Quote, Star } from "lucide-react";
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
    <section className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[150px]" />

      <div className="relative z-10">
        <div className="text-center mb-16 px-4">
          <span className="inline-block px-4 py-1.5 text-sm font-medium text-primary bg-primary/10 rounded-full mb-4">
            {t("testimonials.badge")}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display text-foreground mb-4">
            {t("testimonials.heading")}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t("testimonials.subtitle")}
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full" />
          </div>
        ) : (
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <Carousel opts={{ align: "start", loop: true }} className="w-full">
              <CarouselContent className="-ml-4">
                {testimonials.map((testimonial) => (
                  <CarouselItem key={testimonial.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                    <Card className="h-full glass border-primary/10 hover:border-primary/30 transition-all duration-300">
                      <CardContent className="p-6 flex flex-col h-full">
                        <Quote className="w-10 h-10 text-primary/30 mb-4" />
                        <div className="flex gap-1 mb-4">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                          ))}
                        </div>
                        <p className="text-muted-foreground mb-6 leading-relaxed flex-grow">"{testimonial.content}"</p>
                        <div className="flex items-center gap-4 pt-4 border-t border-border">
                          {testimonial.avatar && (testimonial.avatar.startsWith("http") || testimonial.avatar.startsWith("/")) ? (
                            <img src={testimonial.avatar} alt={testimonial.name} className="w-12 h-12 rounded-full object-cover" />
                          ) : (
                            <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center text-primary-foreground font-semibold">
                              {testimonial.avatar || testimonial.name.split(" ").map((n: string) => n[0]).join("").slice(0, 2).toUpperCase()}
                            </div>
                          )}
                          <div>
                            <p className="font-semibold text-foreground">{testimonial.name}</p>
                            <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="flex justify-center gap-4 mt-8">
                <CarouselPrevious className="relative inset-0 translate-x-0 translate-y-0 bg-card border-border hover:bg-primary hover:text-primary-foreground hover:border-primary" />
                <CarouselNext className="relative inset-0 translate-x-0 translate-y-0 bg-card border-border hover:bg-primary hover:text-primary-foreground hover:border-primary" />
              </div>
            </Carousel>
          </div>
        )}
      </div>
    </section>
  );
};

export default Testimonials;
