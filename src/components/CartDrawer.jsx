import { Link, useNavigate } from "react-router-dom";
import { X, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

const CartDrawer = ({ open, onClose }) => {
  const { items, removeItem, updateQuantity, clearCart, totalItems, totalPriceFormatted } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  if (!open) return null;

  const handleCheckout = () => {
    onClose();
    if (!user) {
      toast({ title: "Giriş yapmalısınız", description: "Sipariş vermek için lütfen giriş yapın." });
      navigate("/giris", { state: { from: "/siparis" } });
    } else {
      navigate("/siparis");
    }
  };

  const handleClear = () => { clearCart(); toast({ title: "Sepet temizlendi" }); };

  return (
    <>
      <div className="fixed inset-0 z-[60] bg-foreground/30 backdrop-blur-sm" onClick={onClose} />
      <div className="fixed top-0 right-0 z-[70] h-full w-full max-w-md bg-background border-l border-border shadow-2xl flex flex-col animate-slide-in-right">
        <div className="flex items-center justify-between px-6 py-5 border-b border-border">
          <div className="flex items-center gap-2">
            <ShoppingBag size={20} className="text-foreground" />
            <h2 className="font-serif text-xl font-semibold text-foreground">Sepetim {totalItems > 0 && <span className="text-sm text-muted-foreground font-sans">({totalItems})</span>}</h2>
          </div>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors"><X size={22} /></button>
        </div>
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <ShoppingBag size={48} className="text-muted-foreground/30 mb-4" />
              <p className="text-muted-foreground mb-2">Sepetiniz boş</p>
              <Link to="/koleksiyon" onClick={onClose} className="text-sm text-primary underline">Koleksiyona göz atın</Link>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={`${item.productId}-${item.color}`} className="flex gap-4 p-3 rounded-xl border border-border bg-card">
                  <Link to={`/urun/${item.productId}`} onClick={onClose}>
                    <img src={item.image} alt={item.name} className="w-20 h-20 rounded-lg object-cover flex-shrink-0" />
                  </Link>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div><h3 className="text-sm font-semibold text-foreground truncate">{item.name}</h3><p className="text-xs text-muted-foreground">{item.color}</p></div>
                      <button onClick={() => removeItem(item.productId, item.color)} className="text-muted-foreground hover:text-destructive transition-colors p-1"><Trash2 size={14} /></button>
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center gap-2">
                        <button onClick={() => updateQuantity(item.productId, item.color, item.quantity - 1)} disabled={item.quantity <= 1} className="w-7 h-7 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:bg-muted disabled:opacity-30"><Minus size={12} /></button>
                        <span className="text-sm font-medium text-foreground w-6 text-center">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.productId, item.color, item.quantity + 1)} className="w-7 h-7 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:bg-muted"><Plus size={12} /></button>
                      </div>
                      <span className="text-sm font-semibold text-foreground">{item.priceFormatted}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        {items.length > 0 && (
          <div className="border-t border-border px-6 py-5 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Toplam</span>
              <span className="font-serif text-xl font-bold text-foreground">{totalPriceFormatted}</span>
            </div>
            <button onClick={handleCheckout} className="w-full bg-primary text-primary-foreground py-3.5 rounded-full font-semibold text-sm uppercase tracking-widest transition-all duration-300 hover:shadow-lg hover:scale-[1.02]">Siparişi Tamamla</button>
            <button onClick={handleClear} className="w-full text-xs text-muted-foreground hover:text-destructive transition-colors text-center">Sepeti Temizle</button>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;
