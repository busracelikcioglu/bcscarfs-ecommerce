import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import LaunchBanner from "@/components/LaunchBanner";
import Lookbook from "@/components/Lookbook";
import Collection from "@/components/Collection";
import CombinationSuggestions from "@/components/CombinationSuggestions";
import ColorPalette from "@/components/ColorPalette";
import FabricFeatures from "@/components/FabricFeatures";
import About from "@/components/About";
import Testimonials from "@/components/Testimonials";
import SignupForm from "@/components/SignupForm";
import InstagramGallery from "@/components/InstagramGallery";
import Contact from "@/components/Contact";
import SocialMedia from "@/components/SocialMedia";
import Footer from "@/components/Footer";
import NewsletterPopup from "@/components/NewsletterPopup";

const Index = () => (
  <div className="min-h-screen bg-background scroll-smooth">
    <Navbar /><Hero /><LaunchBanner /><Lookbook /><Collection /><CombinationSuggestions />
    <ColorPalette /><FabricFeatures /><About /><Testimonials /><SignupForm />
    <InstagramGallery /><Contact /><SocialMedia /><Footer /><NewsletterPopup />
  </div>
);

export default Index;
