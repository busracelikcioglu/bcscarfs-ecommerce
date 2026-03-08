import { Instagram } from "lucide-react";

const PinterestIcon = () => (<svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.024 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" /></svg>);
const TikTokIcon = () => (<svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.71a8.21 8.21 0 0 0 4.76 1.52V6.79a4.84 4.84 0 0 1-1-.1z" /></svg>);

const socials = [
  { icon: <Instagram size={20} />, label: "Instagram", href: "#" },
  { icon: <PinterestIcon />, label: "Pinterest", href: "#" },
  { icon: <TikTokIcon />, label: "TikTok", href: "#" },
];

const SocialMedia = () => (
  <section className="py-16 px-4 text-center">
    <p className="text-sm tracking-[0.25em] uppercase text-muted-foreground mb-6">Bizi Takip Edin</p>
    <div className="flex justify-center gap-6">
      {socials.map((s) => (
        <a key={s.label} href={s.href} className="w-12 h-12 flex items-center justify-center rounded-full border border-border text-muted-foreground transition-all duration-300 hover:bg-primary hover:text-primary-foreground hover:border-primary hover:scale-110">
          {s.icon}
        </a>
      ))}
    </div>
  </section>
);

export default SocialMedia;
