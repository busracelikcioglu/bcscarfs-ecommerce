import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Star } from "lucide-react";

const testimonials = [
  { text: "Çok zarif ve kaliteli görünüyor.", name: "Elif Y.", title: "Moda Blogger" },
  { text: "Yeni koleksiyonu sabırsızlıkla bekliyorum.", name: "Selin K.", title: "Stil Danışmanı" },
  { text: "BC Scarfs'ın kumaş kalitesi benzersiz.", name: "Ayşe D.", title: "Tekstil Editörü" },
];

const Stars = () => (
  <div className="flex gap-1 justify-center mb-3">
    {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-primary text-primary" />)}
  </div>
);

const Testimonials = () => {
  const { ref, isVisible } = useScrollAnimation();
  return (
    <section className="py-24 px-4 bg-card/50" ref={ref}>
      <div className={`max-w-5xl mx-auto transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
        <div className="text-center mb-14">
          <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-4">Yorumlar</p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-foreground">Ne Diyorlar?</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-background border border-border rounded-2xl p-8 text-center transition-all duration-300 hover:shadow-lg">
              <Stars />
              <p className="text-foreground italic leading-relaxed mb-6">"{t.text}"</p>
              <p className="font-semibold text-foreground text-sm">{t.name}</p>
              <p className="text-xs text-muted-foreground">{t.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
