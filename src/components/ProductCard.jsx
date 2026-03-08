import { Heart } from "lucide-react";
import { Link } from "react-router-dom";

const ProductCard = ({ product, isFavorite, onToggleFavorite }) => (
  <div className="group relative">
    <button onClick={(e) => { e.preventDefault(); onToggleFavorite(product.id); }} className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center transition-all duration-300 hover:scale-110">
      <Heart size={18} className={isFavorite ? "fill-accent text-accent" : "text-muted-foreground"} />
    </button>
    <Link to={`/urun/${product.id}`}>
      <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-shadow duration-300 group-hover:shadow-md">
        <img src={product.images[0]} alt={product.name} className="w-full aspect-[4/5] object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" />
      </div>
      <div className="mt-4 text-center">
        <h3 className="font-serif text-lg font-semibold text-foreground">{product.name}</h3>
        <p className="text-sm text-muted-foreground mt-1">{product.priceFormatted}</p>
        <span className="inline-block mt-3 text-xs tracking-widest uppercase text-primary font-medium border-b border-primary pb-0.5">Ürünü Görüntüle</span>
      </div>
    </Link>
  </div>
);

export default ProductCard;
