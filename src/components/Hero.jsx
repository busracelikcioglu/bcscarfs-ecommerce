import heroBg from "@/assets/hero-bg.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
      <div className="absolute inset-0">
        <img src={heroBg} alt="" className="w-full h-full object-cover" loading="eager" />
        <div className="absolute inset-0 bg-background/70" />
        
      </div>
      <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
        <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-4 animate-fade-in">BC Scarfs</p>
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-foreground leading-tight mb-6 animate-fade-in" style={{ animationDelay: "0.2s" }}>
          Zarif ve Modern Şal Koleksiyonu<br /><span className="italic text-primary">Çok Yakında</span>
        </h1>
        <p className="text-base sm:text-lg text-muted-foreground max-w-xl mx-auto mb-10 animate-fade-in" style={{ animationDelay: "0.4s" }}>
          Modern ve zarif kadınlar için tasarlanan özel şal koleksiyonumuz çok yakında sizlerle.
        </p>
        <a href="#form" className="inline-block bg-primary text-primary-foreground px-8 py-3 rounded-full text-sm font-semibold tracking-widest uppercase transition-all duration-300 hover:shadow-lg hover:scale-105 animate-fade-in" style={{ animationDelay: "0.6s" }}>
          Haberdar Ol
        </a>
      </div>
    </section>
  );
};

export default Hero;
