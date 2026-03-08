import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import scarf1 from "@/assets/scarf1.jpg";
import scarf2 from "@/assets/scarf2.jpg";
import scarf3 from "@/assets/scarf3.jpg";

const items = [
  { img: scarf1, name: "Pembe Rüya", price: "₺1.290" },
  { img: scarf2, name: "Adaçayı Esintisi", price: "₺1.490" },
  { img: scarf3, name: "Toprak Sıcaklığı", price: "₺1.390" },
];

const Collection = () => {
  const { ref, isVisible } = useScrollAnimation();
  return (
    <section id="koleksiyon" className="py-24 px-4 bg-card/50" ref={ref}>
      <div className={`max-w-5xl mx-auto transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
        <div className="text-center mb-14">
          <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-4">Koleksiyon</p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-foreground">Öne Çıkan Parçalar</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item, i) => (
            <div key={item.name} className="group cursor-pointer" style={{ transitionDelay: `${i * 100}ms` }}>
              <div className="overflow-hidden rounded-xl border border-border bg-card">
                <img src={item.img} alt={item.name} className="w-full aspect-[4/5] object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" />
              </div>
              <div className="mt-4 text-center">
                <h3 className="font-serif text-lg font-semibold text-foreground">{item.name}</h3>
                <p className="text-sm text-muted-foreground mt-1">{item.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Collection;
