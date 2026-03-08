import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Clock } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { blogPosts } from "@/data/blogs";

const BlogDetail = () => {
  const { id } = useParams();
  const post = blogPosts.find((p) => p.id === id);
  if (!post) return (<div className="min-h-screen bg-background"><Navbar /><div className="pt-32 text-center"><p className="text-muted-foreground">Yazı bulunamadı.</p><Link to="/blog" className="text-primary underline mt-4 inline-block">Bloga dön</Link></div></div>);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-20 px-4">
        <div className="max-w-3xl mx-auto">
          <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors"><ArrowLeft size={16} /> Bloga Dön</Link>
          <img src={post.image} alt={post.title} className="w-full aspect-[16/9] object-cover rounded-2xl mb-8" />
          <div className="flex items-center gap-3 text-xs text-muted-foreground mb-4"><span>{post.date}</span><span className="flex items-center gap-1"><Clock size={12} />{post.readTime}</span></div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mb-8">{post.title}</h1>
          <div>
            {post.content.split("\n\n").map((para, i) => {
              if (para.startsWith("**") && para.endsWith("**")) return <h3 key={i} className="font-serif text-xl font-semibold text-foreground mt-8 mb-3">{para.replace(/\*\*/g, "")}</h3>;
              if (para.includes("**")) { const parts = para.split("**"); return <p key={i} className="text-muted-foreground leading-relaxed mb-4">{parts.map((part, j) => j % 2 === 1 ? <strong key={j} className="text-foreground">{part}</strong> : part)}</p>; }
              return <p key={i} className="text-muted-foreground leading-relaxed mb-4">{para}</p>;
            })}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BlogDetail;
