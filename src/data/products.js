import product1 from "@/assets/product1.jpg";
import product2 from "@/assets/product2.jpg";
import product3 from "@/assets/product3.jpg";
import product4 from "@/assets/product4.jpg";
import product5 from "@/assets/product5.jpg";
import product6 from "@/assets/product6.jpg";
import scarf1 from "@/assets/scarf1.jpg";
import scarf2 from "@/assets/scarf2.jpg";
import scarf3 from "@/assets/scarf3.jpg";

export const products = [
  {
    id: "mocha-dream", name: "Mocha Dream", price: 1290, priceFormatted: "₺1.290",
    description: "Yumuşak ipek karışımlı kumaşıyla zarif ve sofistike bir görünüm sunan Mocha Dream, günlük ve özel anlarınızda yanınızda.",
    fabric: "İpek Karışım", colors: ["Mocha Brown", "Cream Beige"], colorHexes: ["#8B7355", "#F5F0E8"],
    collection: "Essentials", images: [product1, scarf1], featured: true,
  },
  {
    id: "sage-breeze", name: "Adaçayı Esintisi", price: 1490, priceFormatted: "₺1.490",
    description: "Doğadan ilham alan Adaçayı Esintisi, nefes alabilen premium kumaşıyla ferah bir stil yaratır.",
    fabric: "Premium Pamuk", colors: ["Sage Green", "Dusty Rose"], colorHexes: ["#9CAF88", "#D4A0A0"],
    collection: "Nature", images: [product2, scarf2], featured: true,
  },
  {
    id: "dusty-rose", name: "Pembe Rüya", price: 1390, priceFormatted: "₺1.390",
    description: "Romantik pembe tonlarıyla dikkat çeken Pembe Rüya, kadınsı ve zarif bir dokunuş arayanlara özel.",
    fabric: "İpek", colors: ["Dusty Rose", "Cream Beige"], colorHexes: ["#D4A0A0", "#F5F0E8"],
    collection: "Romance", images: [product3, scarf3], featured: true,
  },
  {
    id: "cream-elegance", name: "Krem Zarafet", price: 1590, priceFormatted: "₺1.590",
    description: "Saf kaşmir dokunuşuyla lüksün tanımını yeniden yapan Krem Zarafet.",
    fabric: "Kaşmir", colors: ["Cream Beige", "Mocha Brown"], colorHexes: ["#F5F0E8", "#8B7355"],
    collection: "Luxury", images: [product4, scarf1], featured: false,
  },
  {
    id: "burgundy-night", name: "Bordo Gece", price: 1450, priceFormatted: "₺1.450",
    description: "Derin bordo tonlarıyla güçlü ve etkileyici bir ifade yaratan bu şal.",
    fabric: "İpek Karışım", colors: ["Burgundy", "Mocha Brown"], colorHexes: ["#722F37", "#8B7355"],
    collection: "Evening", images: [product5, scarf2], featured: false,
  },
  {
    id: "navy-classic", name: "Lacivert Klasik", price: 1350, priceFormatted: "₺1.350",
    description: "Zamansız lacivert tonuyla her kombine uyum sağlayan Lacivert Klasik.",
    fabric: "Premium Pamuk", colors: ["Navy Blue", "Cream Beige"], colorHexes: ["#1B2A4A", "#F5F0E8"],
    collection: "Essentials", images: [product6, scarf3], featured: false,
  },
];

export const collections = ["Tümü", "Essentials", "Nature", "Romance", "Luxury", "Evening"];
export const fabrics = ["Tümü", "İpek", "İpek Karışım", "Premium Pamuk", "Kaşmir"];
export const colorOptions = ["Tümü", "Mocha Brown", "Sage Green", "Dusty Rose", "Cream Beige", "Burgundy", "Navy Blue"];
