import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const fabrics = [
  { emoji: "🧵", title: "Premium Kumaş", desc: "En kaliteli ipek ve kaşmir karışımı ile benzersiz yumuşaklık." },
  { emoji: "🌿", title: "Nefes Alabilen Yapı", desc: "Doğal liflerle üretilen, cildinizin rahatça nefes almasını sağlayan dokular." },
  { emoji: "✨", title: "Gün Boyu Konfor", desc: "Hafif ve esnek yapısıyla sabahtan akşama kadar rahatlık sunar." },
];

const FabricFeatures = () => {
  const { ref, isVisible } = useScrollAnimation();
  return (
    <section className="py-24 px-4" ref={ref}>
      <div className={`max-w-5xl mx-auto transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
        <div className="text-center mb-14">
          <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-4">Kalite</p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-foreground">Kumaş Özellikleri</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {fabrics.map((f, i) => (
            <div key={f.title} className="bg-card border border-border rounded-2xl p-8 text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-1" style={{ transitionDelay: `${i * 100}ms` }}>
              <span className="text-4xl block mb-5">{f.emoji}</span>
              <h3 className="font-serif text-xl font-semibold text-foreground mb-3">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FabricFeatures;
