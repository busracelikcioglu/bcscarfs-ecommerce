import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import comboCasual from "@/assets/combo-casual.jpg";
import comboOffice from "@/assets/combo-office.jpg";
import comboSpecial from "@/assets/combo-special.jpg";

const combos = [
  { image: comboCasual, title: "Günlük Kombin", desc: "Rahat ve şık bir günlük görünüm" },
  { image: comboOffice, title: "Ofis Kombini", desc: "Profesyonel ve zarif iş stili" },
  { image: comboSpecial, title: "Özel Gün", desc: "Unutulmaz anlar için zarafet" },
];

const CombinationSuggestions = () => {
  const { ref, isVisible } = useScrollAnimation();
  return (
    <section className="py-24 px-4 bg-card/50" ref={ref}>
      <div className={`max-w-5xl mx-auto transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
        <div className="text-center mb-14">
          <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-4">Stil Rehberi</p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-foreground">Nasıl Kombinlenir?</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {combos.map((c, i) => (
            <div key={c.title} className="group cursor-pointer" style={{ transitionDelay: `${i * 150}ms` }}>
              <div className="overflow-hidden rounded-xl border border-border shadow-sm transition-shadow duration-300 group-hover:shadow-lg">
                <img src={c.image} alt={c.title} className="w-full aspect-[3/4] object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" />
              </div>
              <div className="mt-4 text-center">
                <h3 className="font-serif text-lg font-semibold text-foreground">{c.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">{c.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CombinationSuggestions;
