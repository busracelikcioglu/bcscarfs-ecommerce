import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { User, Package, LogOut } from "lucide-react";

const ProfilePage = () => {
  const { user, loading: authLoading, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [profile, setProfile] = useState({ full_name: "", phone: "", address: "" });
  const [orders, setOrders] = useState([]);
  const [saving, setSaving] = useState(false);
  const [tab, setTab] = useState("profile");

  useEffect(() => { if (!authLoading && !user) navigate("/giris", { state: { from: "/hesabim" } }); }, [user, authLoading, navigate]);

  useEffect(() => {
    if (!user) return;
    supabase.from("profiles").select("full_name, phone, address").eq("user_id", user.id).single().then(({ data }) => { if (data) setProfile(data); });
    supabase.from("orders").select("*").eq("user_id", user.id).order("created_at", { ascending: false }).then(({ data }) => { if (data) setOrders(data); });
  }, [user]);

  const handleSave = async () => {
    if (!user) return;
    setSaving(true);
    const { error } = await supabase.from("profiles").update({ full_name: profile.full_name, phone: profile.phone, address: profile.address }).eq("user_id", user.id);
    if (error) toast({ title: "Hata", description: error.message, variant: "destructive" });
    else toast({ title: "Profil güncellendi ✓" });
    setSaving(false);
  };

  const handleLogout = async () => { await signOut(); navigate("/"); toast({ title: "Çıkış yapıldı" }); };

  if (authLoading || !user) return <div className="min-h-screen bg-background"><Navbar /><div className="pt-32 text-center text-muted-foreground">Yükleniyor...</div></div>;

  const statusLabels = { pending: "Hazırlanıyor", shipped: "Kargoda", delivered: "Teslim Edildi" };

  return (
    <div className="min-h-screen bg-background"><Navbar /><div className="pt-24 pb-20 px-4"><div className="max-w-3xl mx-auto">
      <div className="text-center mb-10"><p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-4">BC Scarfs</p><h1 className="font-serif text-3xl sm:text-4xl font-semibold text-foreground">Hesabım</h1><p className="text-sm text-muted-foreground mt-2">{user.email}</p></div>
      <div className="flex justify-center gap-2 mb-8">
        <button onClick={() => setTab("profile")} className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-colors ${tab === "profile" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}><User size={16} /> Profil</button>
        <button onClick={() => setTab("orders")} className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-colors ${tab === "orders" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}><Package size={16} /> Siparişlerim</button>
      </div>
      {tab === "profile" && (
        <div className="bg-card border border-border rounded-2xl p-8 space-y-5">
          <div><label className="text-sm font-medium text-foreground mb-1.5 block">Ad Soyad</label><Input value={profile.full_name || ""} onChange={(e) => setProfile({ ...profile, full_name: e.target.value })} /></div>
          <div><label className="text-sm font-medium text-foreground mb-1.5 block">Telefon</label><Input value={profile.phone || ""} onChange={(e) => setProfile({ ...profile, phone: e.target.value })} /></div>
          <div><label className="text-sm font-medium text-foreground mb-1.5 block">Adres</label><Input value={profile.address || ""} onChange={(e) => setProfile({ ...profile, address: e.target.value })} /></div>
          <div className="flex gap-3"><Button onClick={handleSave} disabled={saving} className="rounded-full flex-1">{saving ? "Kaydediliyor..." : "Kaydet"}</Button><Button onClick={handleLogout} variant="outline" className="rounded-full"><LogOut size={16} className="mr-2" /> Çıkış</Button></div>
        </div>
      )}
      {tab === "orders" && (
        <div className="space-y-4">
          {orders.length === 0 ? (<div className="text-center py-16"><Package size={48} className="mx-auto text-muted-foreground/30 mb-4" /><p className="text-muted-foreground">Henüz siparişiniz bulunmuyor.</p></div>) : orders.map((order) => (
            <div key={order.id} className="bg-card border border-border rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4"><div><p className="text-xs text-muted-foreground">{new Date(order.created_at).toLocaleDateString("tr-TR")}</p><p className="text-xs text-muted-foreground mt-0.5">#{order.id.slice(0, 8)}</p></div><span className="px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">{statusLabels[order.status] || order.status}</span></div>
              <div className="space-y-2">{order.items.map((item, i) => (<div key={i} className="flex justify-between text-sm"><span className="text-foreground">{item.name} <span className="text-muted-foreground">x{item.quantity}</span></span><span className="text-foreground">₺{(item.price * item.quantity).toLocaleString("tr-TR")}</span></div>))}</div>
              <div className="border-t border-border mt-3 pt-3 flex justify-between"><span className="text-sm font-semibold text-foreground">Toplam</span><span className="font-serif text-lg font-bold text-foreground">₺{order.total_price.toLocaleString("tr-TR")}</span></div>
            </div>
          ))}
        </div>
      )}
    </div></div><Footer /></div>
  );
};

export default ProfilePage;
