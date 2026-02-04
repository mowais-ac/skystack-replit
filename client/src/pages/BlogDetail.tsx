import { useRoute, Link } from "wouter";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { useLanguage } from "@/lib/i18n";
import { motion } from "framer-motion";
import { 
  Calendar, Clock, ArrowRight, Tag, User, Share2, 
  Facebook, Twitter, Linkedin, ArrowLeft
} from "lucide-react";
import { SEO } from "@/components/SEO";
import { getBlogBySlug, getRelatedBlogs, BlogPost } from "@/lib/blogs";
import NotFound from "./not-found";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

function RelatedBlogCard({ blog, language }: { blog: BlogPost; language: string }) {
  const isArabic = language === "ar";
  const title = isArabic ? blog.titleAr : blog.title;
  const excerpt = isArabic ? blog.excerptAr : blog.excerpt;
  
  return (
    <Link href={`/blog/${blog.slug}`}>
      <motion.article
        variants={fadeIn}
        className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow cursor-pointer group"
      >
        <div className="flex items-center gap-2 mb-3 text-sm text-gray-600">
          <Tag className="w-4 h-4" />
          <span className="text-primary font-medium">
            {isArabic ? blog.categoryAr : blog.category}
          </span>
        </div>
        
        <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">
          {title}
        </h3>
        
        <p className="text-gray-600 text-sm line-clamp-2">
          {excerpt}
        </p>
      </motion.article>
    </Link>
  );
}

export default function BlogDetail() {
  const [match, params] = useRoute("/blog/:slug");
  const { language } = useLanguage();
  const isArabic = language === "ar";

  if (!match || !params) return <NotFound />;

  const blog = getBlogBySlug(params.slug);
  if (!blog) return <NotFound />;

  const title = isArabic ? blog.titleAr : blog.title;
  const content = isArabic ? blog.contentAr : blog.content;
  const category = isArabic ? blog.categoryAr : blog.category;
  const author = isArabic ? blog.authorAr : blog.author;
  
  const publishedDate = new Date(blog.publishedAt).toLocaleDateString(
    isArabic ? "ar-SA" : "en-US",
    { year: "numeric", month: "long", day: "numeric" }
  );

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const shareTitle = encodeURIComponent(title);
  const shareText = encodeURIComponent(isArabic ? blog.excerptAr : blog.excerpt);

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${shareTitle}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
  };

  const relatedBlogs = getRelatedBlogs(blog.id, 3);

  return (
    <div className="min-h-screen flex flex-col">
      <SEO 
        title={blog.seoMeta.metaTitle || title}
        titleAr={blog.seoMeta.metaTitleAr || blog.titleAr}
        description={blog.seoMeta.metaDescription || blog.excerpt}
        descriptionAr={blog.seoMeta.metaDescriptionAr || blog.excerptAr}
        keywords={blog.seoMeta.keywords}
        keywordsAr={blog.seoMeta.keywordsAr}
        canonicalUrl={`/blog/${blog.slug}`}
      />
      <Navigation />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white pt-32 pb-16 relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-1/4 -right-1/4 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px]" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[100px]" />
          </div>
          
          <div className="container-width relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Link href="/blog">
                <button className="flex items-center gap-2 text-gray-300 hover:text-white mb-6 transition-colors">
                  <ArrowLeft className={`w-4 h-4 ${isArabic ? "rotate-180" : ""}`} />
                  <span>{isArabic ? "العودة إلى المدونة" : "Back to Blog"}</span>
                </button>
              </Link>

              <div className="flex items-center gap-4 mb-6 text-sm">
                <span className="flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20 rounded-full">
                  <Tag className="w-4 h-4" />
                  <span className="text-primary font-medium">{category}</span>
                </span>
                <span className="flex items-center gap-2 text-gray-300">
                  <Calendar className="w-4 h-4" />
                  {publishedDate}
                </span>
                <span className="flex items-center gap-2 text-gray-300">
                  <Clock className="w-4 h-4" />
                  {blog.readingTime} {isArabic ? "دقائق قراءة" : "min read"}
                </span>
                <span className="flex items-center gap-2 text-gray-300">
                  <User className="w-4 h-4" />
                  {author}
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                {title}
              </h1>

              <p className="text-xl text-gray-300 mb-8 max-w-3xl">
                {isArabic ? blog.excerptAr : blog.excerpt}
              </p>

              {/* Share Buttons */}
              <div className="flex items-center gap-4">
                <span className="text-gray-300 text-sm">{isArabic ? "شارك:" : "Share:"}</span>
                <div className="flex gap-3">
                  <a
                    href={shareLinks.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center hover:bg-primary transition-colors"
                    aria-label="Share on Facebook"
                  >
                    <Facebook className="w-5 h-5" />
                  </a>
                  <a
                    href={shareLinks.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center hover:bg-primary transition-colors"
                    aria-label="Share on Twitter"
                  >
                    <Twitter className="w-5 h-5" />
                  </a>
                  <a
                    href={shareLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center hover:bg-primary transition-colors"
                    aria-label="Share on LinkedIn"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-16 bg-white">
          <div className="container-width">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-primary prose-strong:text-gray-900 prose-ul:text-gray-700 prose-li:text-gray-700"
                dangerouslySetInnerHTML={{ __html: content }}
              />
            </div>
          </div>
        </section>

        {/* Related Blogs */}
        {relatedBlogs.length > 0 && (
          <section className="py-16 bg-gray-50">
            <div className="container-width">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                {isArabic ? "مقالات ذات صلة" : "Related Articles"}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {relatedBlogs.map((relatedBlog) => (
                  <RelatedBlogCard key={relatedBlog.id} blog={relatedBlog} language={language} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      
      <Footer />
    </div>
  );
}
