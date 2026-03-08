import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { blogPosts } from "@/data/blogs";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Clock } from "lucide-react";

const BlogPage = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <div className="pt-24 pb-20 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-4">BC Scarfs</p>
          <h1 className="font-serif text-4xl sm:text-5xl font-semibold text-foreground">Moda Blogu</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => <BlogCard key={post.id} post={post} />)}
        </div>
      </div>
    </div>
    <Footer />
  </div>
);

const BlogCard = ({ post }) => {
  const { ref, isVisible } = useScrollAnimation();
  return (
    <div ref={ref} className={`group transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
      <Link to={`/blog/${post.id}`}>
        <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-shadow duration-300 group-hover:shadow-md">
          <img src={post.image} alt={post.title} className="w-full aspect-[16/10] object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
          <div className="p-5">
            <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3"><span>{post.date}</span><span className="flex items-center gap-1"><Clock size={12} />{post.readTime}</span></div>
            <h3 className="font-serif text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">{post.title}</h3>
            <p className="text-sm text-muted-foreground line-clamp-2">{post.excerpt}</p>
            <span className="inline-block mt-4 text-xs tracking-widest uppercase text-primary font-medium border-b border-primary pb-0.5">Devamını Oku</span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default BlogPage;
