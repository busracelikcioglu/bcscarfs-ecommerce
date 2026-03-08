import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const schema = z.object({
  email: z.string().min(1, "Lütfen bu alanı doldurun").email("Geçersiz e-posta adresi"),
  password: z.string().min(1, "Lütfen bu alanı doldurun").min(6, "Şifre en az 6 karakter olmalı"),
});

const SignupForm = () => {
  const { toast } = useToast();
  const form = useForm({ resolver: zodResolver(schema), defaultValues: { email: "", password: "" } });

  const onSubmit = (data) => {
    toast({ title: "Giriş başarılı ✓", description: `${data.email} ile kayıt olundu.` });
    form.reset();
  };

  return (
    <section id="form" className="py-20 px-4">
      <div className="max-w-md mx-auto bg-card border border-border rounded-2xl p-8 shadow-sm">
        <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-foreground text-center mb-2">Haberdar Ol</h2>
        <p className="text-sm text-muted-foreground text-center mb-8">Lansman tarihini kaçırmamak için kayıt ol.</p>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField control={form.control} name="email" render={({ field }) => (
              <FormItem><FormLabel>E-posta</FormLabel><FormControl><Input placeholder="ornek@email.com" {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="password" render={({ field }) => (
              <FormItem><FormLabel>Şifre</FormLabel><FormControl><Input type="password" placeholder="••••••" {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <Button type="submit" className="w-full rounded-full tracking-widest uppercase font-semibold transition-all duration-300 hover:scale-105">Katıl</Button>
          </form>
        </Form>
      </div>
    </section>
  );
};

export default SignupForm;
