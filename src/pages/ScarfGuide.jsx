import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import tieStep1 from "@/assets/tie-step1.jpg";
import tieStep2 from "@/assets/tie-step2.jpg";
import tieStep3 from "@/assets/tie-step3.jpg";

const techniques = [
  { title: "Klasik Döküm", description: "Şalı omuzlarınıza atın ve bir ucunu karşı omza doğru sarkıtın.", image: tieStep1, steps: ["Şalı açık bir şekilde yayın", "Omuzlarınıza yerleştirin", "Bir ucu karşı tarafa sarkıtın", "Doğal döküm oluşmasını sağlayın"] },
  { title: "French Knot", description: "Fransız düğümü tekniği, şık ve pratik bir yöntemdir.", image: tieStep2, steps: ["Şalı ikiye katlayın", "Boynunuza sarın", "Açık uçları kapalı ucun içinden geçirin", "Düğümü istediğiniz sıkılıkta ayarlayın"] },
  { title: "Waterfall Wrap", description: "Katmanlı sarma tekniği, zengin ve dramatik bir görünüm yaratır.", image: tieStep3, steps: ["Şalı geniş bir şekilde açın", "Boynunuza birkaç kez sarın", "Uçları serbest bırakın", "Katmanları düzenleyin"] },
];

const ScarfGuide = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <div className="pt-24 pb-20 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-4">BC Scarfs</p>
          <h1 className="font-serif text-4xl sm:text-5xl font-semibold text-foreground">Şal Bağlama Teknikleri</h1>
        </div>
        <div className="space-y-20">
          {techniques.map((tech, i) => <TechniqueCard key={tech.title} technique={tech} index={i} />)}
        </div>
      </div>
    </div>
    <Footer />
  </div>
);

const TechniqueCard = ({ technique, index }) => {
  const { ref, isVisible } = useScrollAnimation();
  const reversed = index % 2 === 1;
  return (
    <div ref={ref} className={`grid grid-cols-1 lg:grid-cols-2 gap-10 items-center transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
      <div className={reversed ? "lg:order-2" : ""}>
        <div className="overflow-hidden rounded-2xl border border-border"><img src={technique.image} alt={technique.title} className="w-full aspect-square object-cover" /></div>
      </div>
      <div className={reversed ? "lg:order-1" : ""}>
        <span className="text-xs tracking-[0.3em] uppercase text-primary font-medium">Teknik {index + 1}</span>
        <h2 className="font-serif text-3xl font-bold text-foreground mt-2 mb-4">{technique.title}</h2>
        <p className="text-muted-foreground leading-relaxed mb-6">{technique.description}</p>
        <ol className="space-y-3">
          {technique.steps.map((step, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="w-7 h-7 rounded-full bg-primary/10 text-primary text-sm font-semibold flex items-center justify-center flex-shrink-0 mt-0.5">{i + 1}</span>
              <span className="text-foreground">{step}</span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default ScarfGuide;
