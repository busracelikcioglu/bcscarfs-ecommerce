import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useCart } from "@/hooks/useCart";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle, ShoppingBag } from "lucide-react";

const CheckoutPage = () => {
  const { user, loading: authLoading } = useAuth();
  const { items, totalPriceFormatted, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [placing, setPlacing] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  if (authLoading) return <div className="min-h-screen bg-background"><Navbar /><div className="pt-32 text-center text-muted-foreground">Yükleniyor...</div></div>;
  if (!user) { navigate("/giris", { state: { from: "/siparis" } }); return null; }
  if (items.length === 0 && !orderPlaced) return (<div className="min-h-screen bg-background"><Navbar /><div className="pt-32 text-center"><ShoppingBag size={48} className="mx-auto text-muted-foreground/30 mb-4" /><p className="text-muted-foreground mb-4">Sepetiniz boş</p><Button onClick={() => navigate("/koleksiyon")} variant="outline" className="rounded-full">Koleksiyona Git</Button></div></div>);

  if (orderPlaced) return (
    <div className="min-h-screen bg-background"><Navbar /><div className="pt-32 text-center px-4"><div className="max-w-md mx-auto"><CheckCircle size={64} className="mx-auto text-primary mb-6" /><h1 className="font-serif text-3xl font-bold text-foreground mb-3">Siparişiniz Alındı!</h1><p className="text-muted-foreground mb-8">Teşekkür ederiz.</p><div className="flex gap-3 justify-center"><Button onClick={() => navigate("/hesabim")} variant="outline" className="rounded-full">Siparişlerim</Button><Button onClick={() => navigate("/koleksiyon")} className="rounded-full">Alışverişe Devam</Button></div></div></div></div>
  );

  const handlePlaceOrder = async () => {
    setPlacing(true);
    try {
      const { error } = await supabase.from("orders").insert({ user_id: user.id, items, total_price: totalPrice, status: "pending" });
      if (error) throw error;
      if (address || phone) await supabase.from("profiles").update({ ...(address && { address }), ...(phone && { phone }) }).eq("user_id", user.id);
      clearCart();
      setOrderPlaced(true);
      toast({ title: "Sipariş başarıyla oluşturuldu! ✓" });
    } catch (err) { toast({ title: "Hata", description: err.message, variant: "destructive" }); }
    setPlacing(false);
  };

  return (
    <div className="min-h-screen bg-background"><Navbar /><div className="pt-24 pb-20 px-4"><div className="max-w-3xl mx-auto">
      <div className="text-center mb-12"><p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-4">BC Scarfs</p><h1 className="font-serif text-3xl sm:text-4xl font-semibold text-foreground">Siparişi Tamamla</h1></div>
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        <div className="lg:col-span-3 space-y-6"><div className="bg-card border border-border rounded-2xl p-6"><h3 className="font-serif text-lg font-semibold text-foreground mb-4">Teslimat Bilgileri</h3><div className="space-y-4"><div><label className="text-sm font-medium text-foreground mb-1.5 block">Telefon</label><Input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+90 555 123 4567" /></div><div><label className="text-sm font-medium text-foreground mb-1.5 block">Adres</label><Input value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Teslimat adresiniz" /></div></div></div></div>
        <div className="lg:col-span-2"><div className="bg-card border border-border rounded-2xl p-6 sticky top-24"><h3 className="font-serif text-lg font-semibold text-foreground mb-4">Sipariş Özeti</h3><div className="space-y-3 mb-6">{items.map((item) => (<div key={`${item.productId}-${item.color}`} className="flex justify-between items-center text-sm"><span className="text-foreground">{item.name} <span className="text-muted-foreground">x{item.quantity}</span></span><span className="text-foreground font-medium">₺{(item.price * item.quantity).toLocaleString("tr-TR")}</span></div>))}</div><div className="border-t border-border pt-4 mb-6"><div className="flex justify-between"><span className="font-semibold text-foreground">Toplam</span><span className="font-serif text-xl font-bold text-foreground">{totalPriceFormatted}</span></div></div><Button onClick={handlePlaceOrder} disabled={placing} className="w-full rounded-full tracking-widest uppercase font-semibold">{placing ? "İşleniyor..." : "Siparişi Onayla"}</Button></div></div>
      </div>
    </div></div><Footer /></div>
  );
};

export default CheckoutPage;
