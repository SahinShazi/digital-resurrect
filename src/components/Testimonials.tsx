import { Card, CardContent } from "@/components/ui/card";
import { Quote, Star } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "CEO at TechStart",
    content: "Working with this developer was an absolute pleasure. The attention to detail and technical expertise exceeded our expectations.",
    avatar: "SJ",
    rating: 5
  },
  {
    name: "Michael Chen",
    role: "Product Manager at InnovateCo",
    content: "Exceptional work! The code quality is outstanding and the communication throughout the project was clear and professional.",
    avatar: "MC",
    rating: 5
  },
  {
    name: "Emily Rodriguez",
    role: "Founder of DesignHub",
    content: "Not only did they deliver a beautiful website, but they also provided valuable insights that improved our overall user experience.",
    avatar: "ER",
    rating: 5
  },
  {
    name: "David Kim",
    role: "CTO at DataFlow",
    content: "The technical skills and problem-solving abilities are top-notch. They transformed our complex requirements into an elegant solution.",
    avatar: "DK",
    rating: 5
  },
  {
    name: "Lisa Thompson",
    role: "Marketing Director",
    content: "Our website now perfectly reflects our brand identity. The developer took time to understand our vision and brought it to life.",
    avatar: "LT",
    rating: 5
  },
  {
    name: "James Wilson",
    role: "Startup Founder",
    content: "From concept to launch, the entire process was smooth and efficient. The final product exceeded expectations.",
    avatar: "JW",
    rating: 5
  }
];

const Testimonials = () => {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[150px]" />
      
      <div className="relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 px-4">
          <span className="inline-block px-4 py-1.5 text-sm font-medium text-primary bg-primary/10 rounded-full mb-4">
            Testimonials
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display text-foreground mb-4">
            What Clients Say
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Don't just take my word for it
          </p>
        </div>
        
        {/* Carousel */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
                  <Card className="h-full glass border-primary/10 hover:border-primary/30 transition-all duration-300">
                    <CardContent className="p-6 flex flex-col h-full">
                      {/* Quote icon */}
                      <Quote className="w-10 h-10 text-primary/30 mb-4" />
                      
                      {/* Rating */}
                      <div className="flex gap-1 mb-4">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                        ))}
                      </div>
                      
                      {/* Content */}
                      <p className="text-muted-foreground mb-6 leading-relaxed flex-grow">
                        "{testimonial.content}"
                      </p>
                      
                      {/* Author */}
                      <div className="flex items-center gap-4 pt-4 border-t border-border">
                        <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center text-primary-foreground font-semibold">
                          {testimonial.avatar}
                        </div>
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
      </div>
    </section>
  );
};

export default Testimonials;