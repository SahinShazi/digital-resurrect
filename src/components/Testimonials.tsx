import { Card, CardContent } from "@/components/ui/card";
import { Quote } from "lucide-react";
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
    content: "Working with this developer was an absolute pleasure. The attention to detail and technical expertise exceeded our expectations. Our project was delivered on time and beyond what we imagined.",
    avatar: "SJ"
  },
  {
    name: "Michael Chen",
    role: "Product Manager at InnovateCo",
    content: "Exceptional work! The code quality is outstanding and the communication throughout the project was clear and professional. Highly recommend for any web development needs.",
    avatar: "MC"
  },
  {
    name: "Emily Rodriguez",
    role: "Founder of DesignHub",
    content: "Not only did they deliver a beautiful and functional website, but they also provided valuable insights that improved our overall user experience. A true professional.",
    avatar: "ER"
  },
  {
    name: "David Kim",
    role: "CTO at DataFlow",
    content: "The technical skills and problem-solving abilities are top-notch. They transformed our complex requirements into an elegant, scalable solution. Will definitely work together again.",
    avatar: "DK"
  },
  {
    name: "Lisa Thompson",
    role: "Marketing Director at BrandWave",
    content: "Our website now perfectly reflects our brand identity. The developer took time to understand our vision and brought it to life with creativity and precision.",
    avatar: "LT"
  },
  {
    name: "James Wilson",
    role: "Startup Founder",
    content: "From concept to launch, the entire process was smooth and efficient. The final product exceeded expectations and has been crucial to our business growth.",
    avatar: "JW"
  }
];

const Testimonials = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-background via-secondary/20 to-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 gradient-text">
          What Clients Say
        </h2>
        <p className="text-center text-muted-foreground max-w-2xl mx-auto">
          Don't just take my word for it - hear from some of the clients I've had the pleasure of working with
        </p>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full max-w-5xl mx-auto"
        >
          <CarouselContent>
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/2">
                <Card className="bg-card/50 backdrop-blur-sm border-primary/10 hover:border-primary/30 transition-all duration-300 h-full">
                  <CardContent className="p-6 flex flex-col h-full">
                    <Quote className="w-10 h-10 text-primary/40 mb-4" />
                    <p className="text-muted-foreground mb-6 leading-relaxed flex-grow">
                      "{testimonial.content}"
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-semibold">
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
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
};

export default Testimonials;
