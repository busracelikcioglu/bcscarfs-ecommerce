import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const NewsletterPopup = () => {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    const dismissed = sessionStorage.getItem("popup_dismissed");
    if (dismissed) return;
    const timer = setTimeout(() => setOpen(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => { setOpen(false); sessionStorage.setItem("popup_dismissed", "1"); };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    toast({ title: "Kaydınız alındı ✓", description: "Lansmandan haberdar olacaksınız." });
    setEmail("");
    handleClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-foreground/30 backdrop-blur-sm animate-fade-in">
      <div className="relative bg-background border border-border rounded-2xl p-8 max-w-sm w-full mx-4 shadow-xl">
        <button onClick={handleClose} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"><X size={20} /></button>
        <div className="text-center mb-6">
          <h3 className="font-serif text-2xl font-semibold text-foreground mb-2">BC Scarfs</h3>
          <p className="text-sm text-muted-foreground">Lansmandan haberdar olmak ister misiniz?</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input type="email" placeholder="E-posta adresiniz" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <Button type="submit" className="w-full rounded-full tracking-widest uppercase font-semibold transition-all duration-300 hover:scale-105">Katıl</Button>
        </form>
      </div>
    </div>
  );
};

export default NewsletterPopup;
