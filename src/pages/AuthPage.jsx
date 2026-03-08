import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const AuthPage = () => {
  const location = useLocation();
  const isLogin = location.pathname === "/giris";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const redirectTo = location.state?.from || "/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (isLogin) {
      const { error } = await signIn(email, password);
      if (error) toast({ title: "Giriş başarısız", description: "E-posta veya şifre hatalı.", variant: "destructive" });
      else { toast({ title: "Hoş geldiniz! ✓" }); navigate(redirectTo); }
    } else {
      if (!fullName.trim()) { toast({ title: "Lütfen adınızı girin", variant: "destructive" }); setLoading(false); return; }
      const { error } = await signUp(email, password, fullName);
      if (error) toast({ title: "Kayıt başarısız", description: error.message, variant: "destructive" });
      else { toast({ title: "Kayıt başarılı! ✓", description: "E-posta adresinizi doğrulamayı unutmayın." }); navigate(redirectTo); }
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-20 px-4 flex items-center justify-center min-h-screen">
        <div className="w-full max-w-md">
          <div className="text-center mb-10">
            <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-4">BC Scarfs</p>
            <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-foreground">{isLogin ? "Giriş Yap" : "Üye Ol"}</h1>
          </div>
          <div className="bg-card border border-border rounded-2xl p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              {!isLogin && (<div><label className="text-sm font-medium text-foreground mb-1.5 block">Ad Soyad</label><Input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Adınız Soyadınız" required={!isLogin} /></div>)}
              <div><label className="text-sm font-medium text-foreground mb-1.5 block">E-posta</label><Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="ornek@email.com" required /></div>
              <div><label className="text-sm font-medium text-foreground mb-1.5 block">Şifre</label><Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required minLength={6} /></div>
              <Button type="submit" disabled={loading} className="w-full rounded-full tracking-widest uppercase font-semibold">{loading ? "Lütfen bekleyin..." : isLogin ? "Giriş Yap" : "Üye Ol"}</Button>
            </form>
            <p className="text-sm text-muted-foreground text-center mt-6">
              {isLogin ? "Hesabınız yok mu?" : "Zaten üye misiniz?"}{" "}
              <Link to={isLogin ? "/kayit" : "/giris"} state={{ from: redirectTo }} className="text-primary underline font-medium">{isLogin ? "Üye Ol" : "Giriş Yap"}</Link>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AuthPage;
