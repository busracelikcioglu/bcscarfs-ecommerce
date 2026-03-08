import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const About = () => {
  const { ref, isVisible } = useScrollAnimation();
  return (
    <section id="hakkimizda" className="py-24 px-4" ref={ref}>
      <div className={`max-w-3xl mx-auto text-center transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
        <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-4">Hikayemiz</p>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-foreground mb-6">BC Scarfs Hakkında</h2>
        <p className="text-muted-foreground leading-relaxed text-base sm:text-lg mb-6">
          BC Scarfs, modern kadının zarafetini ve özgüvenini yansıtan özel şal koleksiyonlarıyla tanınır. Her bir parça, en kaliteli kumaşlardan özenle üretilir ve zamansız bir estetik sunar.
        </p>
        <p className="text-muted-foreground leading-relaxed text-base sm:text-lg">
          Türkiye'nin zengin tekstil mirasını çağdaş moda anlayışıyla buluşturarak, her kadının gardırobunda olması gereken sofistike parçalar yaratıyoruz.
        </p>
      </div>
    </section>
  );
};

export default About;
