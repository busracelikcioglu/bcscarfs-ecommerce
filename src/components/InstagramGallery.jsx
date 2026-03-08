import { Instagram } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import insta1 from "@/assets/insta1.jpg";
import insta2 from "@/assets/insta2.jpg";
import insta3 from "@/assets/insta3.jpg";
import insta4 from "@/assets/insta4.jpg";

const InstagramGallery = () => {
  const { ref, isVisible } = useScrollAnimation();
  const images = [insta1, insta2, insta3, insta4];
  return (
    <section className="py-24 px-4 bg-card/50" ref={ref}>
      <div className={`max-w-5xl mx-auto transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
        <div className="text-center mb-14">
          <Instagram className="w-8 h-8 mx-auto text-primary mb-4" />
          <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-2">Instagram</p>
          <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-foreground">@bcscarfs</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {images.map((img, i) => (
            <a key={i} href="#" className="group relative overflow-hidden rounded-xl border border-border aspect-square">
              <img src={img} alt={`Instagram ${i + 1}`} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" />
              <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/20 transition-colors duration-300 flex items-center justify-center">
                <Instagram className="w-6 h-6 text-background opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InstagramGallery;
