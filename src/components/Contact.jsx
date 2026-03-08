import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Mail, MapPin, Phone } from "lucide-react";

const schema = z.object({
  name: z.string().trim().min(1, "Lütfen adınızı girin").max(100),
  email: z.string().trim().min(1, "Lütfen e-posta adresinizi girin").email("Geçersiz e-posta adresi").max(255),
  message: z.string().trim().min(1, "Lütfen mesajınızı yazın").max(1000),
});

const contactInfo = [
  { icon: <Mail className="w-5 h-5" />, label: "E-posta", value: "info@bcscarfs.com" },
  { icon: <Phone className="w-5 h-5" />, label: "Telefon", value: "+90 555 123 4567" },
  { icon: <MapPin className="w-5 h-5" />, label: "Adres", value: "İstanbul, Türkiye" },
];

const Contact = () => {
  const { ref, isVisible } = useScrollAnimation();
  const { toast } = useToast();
  const form = useForm({ resolver: zodResolver(schema), defaultValues: { name: "", email: "", message: "" } });

  const onSubmit = (data) => {
    toast({ title: "Mesajınız alındı ✓", description: `Teşekkürler ${data.name}, en kısa sürede dönüş yapacağız.` });
    form.reset();
  };

  return (
    <section id="iletisim" className="py-24 px-4" ref={ref}>
      <div className={`max-w-5xl mx-auto transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
        <div className="text-center mb-14">
          <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-4">Bize Ulaşın</p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-foreground">İletişim</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-8">
            <p className="text-muted-foreground leading-relaxed">Sorularınız için bizimle iletişime geçebilirsiniz.</p>
            <div className="space-y-6">
              {contactInfo.map((item) => (
                <div key={item.label} className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">{item.icon}</div>
                  <div><p className="text-xs text-muted-foreground uppercase tracking-wider">{item.label}</p><p className="text-foreground font-medium">{item.value}</p></div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-card border border-border rounded-2xl p-8">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                <FormField control={form.control} name="name" render={({ field }) => (<FormItem><FormLabel>Ad Soyad</FormLabel><FormControl><Input placeholder="Adınız Soyadınız" {...field} /></FormControl><FormMessage /></FormItem>)} />
                <FormField control={form.control} name="email" render={({ field }) => (<FormItem><FormLabel>E-posta</FormLabel><FormControl><Input placeholder="ornek@email.com" {...field} /></FormControl><FormMessage /></FormItem>)} />
                <FormField control={form.control} name="message" render={({ field }) => (<FormItem><FormLabel>Mesaj</FormLabel><FormControl><Textarea placeholder="Mesajınızı yazın..." rows={4} {...field} /></FormControl><FormMessage /></FormItem>)} />
                <Button type="submit" className="w-full rounded-full tracking-widest uppercase font-semibold transition-all duration-300 hover:scale-105">Gönder</Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
