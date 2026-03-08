import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import lookbook1 from "@/assets/lookbook1.jpg";
import lookbook2 from "@/assets/lookbook2.jpg";
import lookbook3 from "@/assets/lookbook3.jpg";

const Lookbook = () => {
  const { ref, isVisible } = useScrollAnimation();
  return (
    <section className="py-24 px-4" ref={ref}>
      <div className={`max-w-6xl mx-auto transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
        <div className="text-center mb-14">
          <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-4">İlham</p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-foreground">2026 Lookbook</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="group overflow-hidden rounded-xl border border-border row-span-2 aspect-square md:aspect-auto">
            <img src={lookbook1} alt="Lookbook" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" />
          </div>
          <div className="group overflow-hidden rounded-xl border border-border aspect-[4/3]">
            <img src={lookbook2} alt="Lookbook" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" />
          </div>
          <div className="group overflow-hidden rounded-xl border border-border aspect-[4/3]">
            <img src={lookbook3} alt="Lookbook" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Lookbook;
