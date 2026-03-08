import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const colors = [
  { name: "Mocha Brown", color: "hsl(25, 30%, 35%)" },
  { name: "Sage Green", color: "hsl(145, 12%, 50%)" },
  { name: "Dusty Rose", color: "hsl(350, 25%, 70%)" },
  { name: "Cream Beige", color: "hsl(30, 30%, 85%)" },
];

const ColorPalette = () => {
  const { ref, isVisible } = useScrollAnimation();
  return (
    <section className="py-24 px-4 bg-card/50" ref={ref}>
      <div className={`max-w-3xl mx-auto text-center transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
        <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-4">Renk Paleti</p>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-foreground mb-14">Yeni Renkler</h2>
        <div className="flex flex-wrap justify-center gap-10">
          {colors.map((c) => (
            <div key={c.name} className="flex flex-col items-center gap-3 group">
              <div className="w-20 h-20 rounded-full border-2 border-border shadow-sm transition-transform duration-300 group-hover:scale-110" style={{ backgroundColor: c.color }} />
              <span className="text-sm text-muted-foreground font-medium tracking-wide">{c.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ColorPalette;
