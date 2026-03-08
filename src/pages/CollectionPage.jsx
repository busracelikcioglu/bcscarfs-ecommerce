import { useState, useMemo } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { products, collections, fabrics, colorOptions } from "@/data/products";
import { useFavorites } from "@/hooks/useFavorites";

const priceRanges = [
  { label: "Tümü", min: 0, max: Infinity },
  { label: "₺1.000 – ₺1.300", min: 1000, max: 1300 },
  { label: "₺1.300 – ₺1.500", min: 1300, max: 1500 },
  { label: "₺1.500+", min: 1500, max: Infinity },
];

const CollectionPage = () => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const [search, setSearch] = useState("");
  const [collection, setCollection] = useState("Tümü");
  const [fabric, setFabric] = useState("Tümü");
  const [color, setColor] = useState("Tümü");
  const [priceIdx, setPriceIdx] = useState(0);
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    const range = priceRanges[priceIdx];
    return products.filter((p) => {
      if (search && !p.name.toLowerCase().includes(search.toLowerCase())) return false;
      if (collection !== "Tümü" && p.collection !== collection) return false;
      if (fabric !== "Tümü" && p.fabric !== fabric) return false;
      if (color !== "Tümü" && !p.colors.includes(color)) return false;
      if (p.price < range.min || p.price > range.max) return false;
      return true;
    });
  }, [search, collection, fabric, color, priceIdx]);

  const activeFilterCount = [collection !== "Tümü", fabric !== "Tümü", color !== "Tümü", priceIdx !== 0].filter(Boolean).length;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-4">BC Scarfs</p>
            <h1 className="font-serif text-4xl sm:text-5xl font-semibold text-foreground">Koleksiyon</h1>
          </div>
          <div className="flex items-center gap-3 mb-8 max-w-xl mx-auto">
            <div className="flex-1 relative">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input type="text" placeholder="Ürün ara..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full pl-10 pr-4 py-2.5 rounded-full border border-border bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
            </div>
            <button onClick={() => setShowFilters(!showFilters)} className="relative flex items-center gap-2 px-4 py-2.5 rounded-full border border-border bg-card text-sm text-foreground hover:bg-muted transition-colors">
              <SlidersHorizontal size={16} /> Filtrele
              {activeFilterCount > 0 && <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">{activeFilterCount}</span>}
            </button>
          </div>
          {showFilters && (
            <div className="max-w-3xl mx-auto mb-10 p-6 bg-card border border-border rounded-2xl animate-fade-in">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">Filtreler</h3>
                <button onClick={() => { setCollection("Tümü"); setFabric("Tümü"); setColor("Tümü"); setPriceIdx(0); }} className="text-xs text-primary hover:underline">Temizle</button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <FilterGroup label="Koleksiyon" options={collections} value={collection} onChange={setCollection} />
                <FilterGroup label="Kumaş" options={fabrics} value={fabric} onChange={setFabric} />
                <FilterGroup label="Renk" options={colorOptions} value={color} onChange={setColor} />
                <FilterGroup label="Fiyat" options={priceRanges.map(r => r.label)} value={priceRanges[priceIdx].label} onChange={(v) => setPriceIdx(priceRanges.findIndex(r => r.label === v))} />
              </div>
            </div>
          )}
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map((p) => <ProductCard key={p.id} product={p} isFavorite={isFavorite(p.id)} onToggleFavorite={toggleFavorite} />)}
            </div>
          ) : (
            <div className="text-center py-20"><p className="text-muted-foreground">Aramanıza uygun ürün bulunamadı.</p></div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

const FilterGroup = ({ label, options, value, onChange }) => (
  <div>
    <p className="text-xs text-muted-foreground mb-2 uppercase tracking-wider">{label}</p>
    <div className="flex flex-wrap gap-1.5">
      {options.map((opt) => (
        <button key={opt} onClick={() => onChange(opt)} className={`px-3 py-1.5 rounded-full text-xs transition-colors ${value === opt ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}>{opt}</button>
      ))}
    </div>
  </div>
);

export default CollectionPage;
