import { useParams, Link } from "react-router-dom";
import { Heart, ArrowLeft, ShoppingBag } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";
import { useFavorites } from "@/hooks/useFavorites";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useCart } from "@/hooks/useCart";

const ProductDetail = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);
  const { isFavorite, toggleFavorite } = useFavorites();
  const [selectedColor, setSelectedColor] = useState(0);
  const [mainImage, setMainImage] = useState(0);
  const { toast } = useToast();
  const { addItem } = useCart();

  if (!product) return (<div className="min-h-screen bg-background"><Navbar /><div className="pt-32 text-center"><p className="text-muted-foreground">Ürün bulunamadı.</p><Link to="/koleksiyon" className="text-primary underline mt-4 inline-block">Koleksiyona dön</Link></div></div>);

  const related = products.filter((p) => p.id !== product.id).slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          <Link to="/koleksiyon" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors"><ArrowLeft size={16} /> Koleksiyona Dön</Link>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <div className="overflow-hidden rounded-2xl border border-border bg-card mb-4"><img src={product.images[mainImage]} alt={product.name} className="w-full aspect-[4/5] object-cover" /></div>
              <div className="flex gap-3">
                {product.images.map((img, i) => (
                  <button key={i} onClick={() => setMainImage(i)} className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${mainImage === i ? "border-primary" : "border-border"}`}>
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
            <div className="flex flex-col justify-center">
              <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-2">{product.collection}</p>
              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mb-2">{product.name}</h1>
              <p className="font-serif text-2xl text-primary font-semibold mb-6">{product.priceFormatted}</p>
              <p className="text-muted-foreground leading-relaxed mb-8">{product.description}</p>
              <div className="mb-6"><p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Kumaş</p><p className="text-foreground font-medium">{product.fabric}</p></div>
              <div className="mb-8">
                <p className="text-xs uppercase tracking-wider text-muted-foreground mb-3">Renk Seçenekleri</p>
                <div className="flex gap-3">
                  {product.colorHexes.map((hex, i) => (
                    <button key={i} onClick={() => setSelectedColor(i)} className={`w-10 h-10 rounded-full border-2 transition-all ${selectedColor === i ? "border-foreground scale-110" : "border-border"}`} style={{ backgroundColor: hex }} title={product.colors[i]} />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground mt-2">{product.colors[selectedColor]}</p>
              </div>
              <div className="flex gap-3">
                <button onClick={() => { addItem({ productId: product.id, name: product.name, price: product.price, priceFormatted: product.priceFormatted, image: product.images[0], color: product.colors[selectedColor] }); toast({ title: "Sepete eklendi ✓", description: `${product.name} sepetinize eklendi.` }); }} className="flex-1 flex items-center justify-center gap-2 bg-primary text-primary-foreground py-3.5 rounded-full font-semibold text-sm uppercase tracking-widest transition-all duration-300 hover:shadow-lg hover:scale-[1.02]">
                  <ShoppingBag size={18} /> Sepete Ekle
                </button>
                <button onClick={() => toggleFavorite(product.id)} className="w-14 h-14 rounded-full border border-border flex items-center justify-center transition-all hover:scale-110">
                  <Heart size={20} className={isFavorite(product.id) ? "fill-accent text-accent" : "text-muted-foreground"} />
                </button>
              </div>
            </div>
          </div>
          {related.length > 0 && (
            <div className="mt-24">
              <h2 className="font-serif text-2xl font-semibold text-foreground text-center mb-10">Benzer Ürünler</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {related.map((p) => <ProductCard key={p.id} product={p} isFavorite={isFavorite(p.id)} onToggleFavorite={toggleFavorite} />)}
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetail;
