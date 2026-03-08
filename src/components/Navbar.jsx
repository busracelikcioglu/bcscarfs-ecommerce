import { useState, useMemo, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, Search, Heart, ShoppingBag, UserCircle } from "lucide-react";
import logo from "@/assets/logo.png";
import { useFavorites } from "@/hooks/useFavorites";
import { useCart } from "@/hooks/useCart";
import { useAuth } from "@/hooks/useAuth";
import { products } from "@/data/products";
import CartDrawer from "@/components/CartDrawer";

const navLinks = [
  { label: "Ana Sayfa", href: "/" },
  { label: "Koleksiyon", href: "/koleksiyon" },
  { label: "Favoriler", href: "/favoriler" },
  { label: "Blog", href: "/blog" },
  { label: "Rehber", href: "/rehber" },
  { label: "İletişim", href: "/iletisim" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [cartOpen, setCartOpen] = useState(false);
  const searchRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { favorites } = useFavorites();
  const { totalItems } = useCart();
  const { user } = useAuth();

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase();
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.collection.toLowerCase().includes(q) ||
        p.fabric.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setSearchOpen(false);
        setSearchQuery("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleResultClick = (productId) => {
    setSearchOpen(false);
    setSearchQuery("");
    navigate(`/urun/${productId}`);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto flex items-center justify-between h-16 px-4">
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="BC Scarfs" className="h-10 w-auto" />
            <span className="font-serif text-2xl font-semibold tracking-wider text-foreground">
              BC <span className="font-light italic">Scarfs</span>
            </span>
          </Link>
          <ul className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.label}>
                <Link to={link.href} className={`text-sm font-medium tracking-widest uppercase transition-colors duration-300 hover:text-primary ${location.pathname === link.href ? "text-primary" : "text-muted-foreground"}`}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="hidden lg:flex items-center gap-3">
            <div className="relative" ref={searchRef}>
              {searchOpen ? (
                <div className="flex items-center gap-2 animate-fade-in">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Ürün ara..."
                    className="w-56 px-3 py-1.5 rounded-full border border-border bg-card text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                    autoFocus
                  />
                  <button onClick={() => { setSearchOpen(false); setSearchQuery(""); }} className="text-muted-foreground hover:text-foreground"><X size={16} /></button>
                </div>
              ) : (
                <button onClick={() => setSearchOpen(true)} className="text-muted-foreground hover:text-foreground transition-colors"><Search size={20} /></button>
              )}
              {searchOpen && searchQuery.trim() && (
                <div className="absolute top-full right-0 mt-2 w-72 bg-card border border-border rounded-xl shadow-lg overflow-hidden z-50 animate-fade-in">
                  {searchResults.length > 0 ? (
                    <div className="max-h-80 overflow-y-auto">
                      {searchResults.map((p) => (
                        <button
                          key={p.id}
                          onClick={() => handleResultClick(p.id)}
                          className="flex items-center gap-3 w-full px-4 py-3 hover:bg-muted/50 transition-colors text-left"
                        >
                          <img src={p.images[0]} alt={p.name} className="w-12 h-12 rounded-lg object-cover" />
                          <div>
                            <p className="text-sm font-medium text-foreground">{p.name}</p>
                            <p className="text-xs text-muted-foreground">{p.priceFormatted}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="px-4 py-6 text-center text-sm text-muted-foreground">Sonuç bulunamadı</div>
                  )}
                </div>
              )}
            </div>
            <Link to="/favoriler" className="relative text-muted-foreground hover:text-foreground transition-colors">
              <Heart size={20} />
              {favorites.length > 0 && <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-accent text-accent-foreground text-[10px] flex items-center justify-center font-bold">{favorites.length}</span>}
            </Link>
            <button onClick={() => setCartOpen(true)} className="relative text-muted-foreground hover:text-foreground transition-colors">
              <ShoppingBag size={20} />
              {totalItems > 0 && <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-primary text-primary-foreground text-[10px] flex items-center justify-center font-bold">{totalItems}</span>}
            </button>
            <Link to={user ? "/hesabim" : "/giris"} className="text-muted-foreground hover:text-foreground transition-colors">
              <UserCircle size={22} className={user ? "text-primary" : ""} />
            </Link>
          </div>
          <div className="flex lg:hidden items-center gap-2">
            <button onClick={() => setSearchOpen(!searchOpen)} className="text-muted-foreground hover:text-foreground transition-colors">
              <Search size={20} />
            </button>
            <button onClick={() => setCartOpen(true)} className="relative text-muted-foreground hover:text-foreground transition-colors">
              <ShoppingBag size={20} />
              {totalItems > 0 && <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-primary text-primary-foreground text-[10px] flex items-center justify-center font-bold">{totalItems}</span>}
            </button>
            <Link to="/favoriler" className="relative text-muted-foreground hover:text-foreground transition-colors">
              <Heart size={20} />
              {favorites.length > 0 && <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-accent text-accent-foreground text-[10px] flex items-center justify-center font-bold">{favorites.length}</span>}
            </Link>
            <Link to={user ? "/hesabim" : "/giris"} className="text-muted-foreground hover:text-foreground transition-colors">
              <UserCircle size={22} className={user ? "text-primary" : ""} />
            </Link>
            <button className="text-foreground" onClick={() => setOpen(!open)}>{open ? <X size={24} /> : <Menu size={24} />}</button>
          </div>
        </div>
        {searchOpen && (
          <div className="lg:hidden bg-background border-b border-border animate-fade-in px-4 py-3" ref={searchRef}>
            <div className="relative">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Ürün ara..."
                className="w-full pl-10 pr-10 py-2.5 rounded-full border border-border bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                autoFocus
              />
              <button onClick={() => { setSearchOpen(false); setSearchQuery(""); }} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                <X size={16} />
              </button>
            </div>
            {searchQuery.trim() && (
              <div className="mt-2 bg-card border border-border rounded-xl shadow-lg overflow-hidden">
                {searchResults.length > 0 ? (
                  <div className="max-h-64 overflow-y-auto">
                    {searchResults.map((p) => (
                      <button key={p.id} onClick={() => handleResultClick(p.id)} className="flex items-center gap-3 w-full px-4 py-3 hover:bg-muted/50 transition-colors text-left">
                        <img src={p.images[0]} alt={p.name} className="w-12 h-12 rounded-lg object-cover" />
                        <div>
                          <p className="text-sm font-medium text-foreground">{p.name}</p>
                          <p className="text-xs text-muted-foreground">{p.priceFormatted}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="px-4 py-6 text-center text-sm text-muted-foreground">Sonuç bulunamadı</div>
                )}
              </div>
            )}
          </div>
        )}
        {open && (
          <div className="lg:hidden bg-background border-b border-border animate-fade-in">
            <ul className="flex flex-col items-center gap-4 py-6">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <Link to={link.href} onClick={() => setOpen(false)} className={`text-sm font-medium tracking-widest uppercase transition-colors duration-300 hover:text-primary ${location.pathname === link.href ? "text-primary" : "text-muted-foreground"}`}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
};

export default Navbar;
