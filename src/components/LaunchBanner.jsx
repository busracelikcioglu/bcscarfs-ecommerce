import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useState, useEffect } from "react";

const TARGET_DATE = new Date("2026-06-15T00:00:00");

const LaunchBanner = () => {
  const { ref, isVisible } = useScrollAnimation();
  const [timeLeft, setTimeLeft] = useState(calcTime());

  useEffect(() => {
    const id = setInterval(() => setTimeLeft(calcTime()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="py-16 px-4" ref={ref}>
      <div className={`max-w-3xl mx-auto text-center bg-primary/5 border border-primary/20 rounded-2xl py-12 px-6 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
        <p className="text-sm tracking-[0.3em] uppercase text-primary mb-3">Official Launch</p>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6">15 Haziran 2026</h2>
        <div className="flex justify-center gap-4 text-sm text-muted-foreground">
          <span><strong className="text-foreground font-serif text-lg">{timeLeft.d}</strong> Gün</span>
          <span><strong className="text-foreground font-serif text-lg">{timeLeft.h}</strong> Saat</span>
          <span><strong className="text-foreground font-serif text-lg">{timeLeft.m}</strong> Dk</span>
          <span><strong className="text-foreground font-serif text-lg">{timeLeft.s}</strong> Sn</span>
        </div>
      </div>
    </section>
  );
};

function calcTime() {
  const diff = Math.max(0, TARGET_DATE.getTime() - Date.now());
  return { d: Math.floor(diff / 86400000), h: Math.floor((diff / 3600000) % 24), m: Math.floor((diff / 60000) % 60), s: Math.floor((diff / 1000) % 60) };
}

export default LaunchBanner;
