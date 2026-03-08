import { Heart } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";
import { useFavorites } from "@/hooks/useFavorites";

const FavoritesPage = () => {
  const { favorites, isFavorite, toggleFavorite } = useFavorites();
  const favoriteProducts = products.filter((p) => favorites.includes(p.id));

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <Heart className="w-8 h-8 mx-auto text-primary mb-4" />
            <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-4">BC Scarfs</p>
            <h1 className="font-serif text-4xl sm:text-5xl font-semibold text-foreground">Favorilerim</h1>
          </div>
          {favoriteProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {favoriteProducts.map((p) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  isFavorite={isFavorite(p.id)}
                  onToggleFavorite={toggleFavorite}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <Heart className="w-16 h-16 mx-auto text-muted-foreground/30 mb-6" />
              <p className="text-lg text-muted-foreground mb-2">Henüz favori ürününüz yok</p>
              <p className="text-sm text-muted-foreground mb-8">Beğendiğiniz ürünleri kalp ikonuna tıklayarak favorilerinize ekleyebilirsiniz.</p>
              <Link
                to="/koleksiyon"
                className="inline-block bg-primary text-primary-foreground px-8 py-3 rounded-full text-sm font-semibold tracking-widest uppercase transition-all duration-300 hover:shadow-lg hover:scale-105"
              >
                Koleksiyonu Keşfet
              </Link>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default FavoritesPage;
