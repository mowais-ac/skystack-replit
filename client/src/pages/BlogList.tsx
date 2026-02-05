import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Link } from "wouter";
import { useLanguage } from "@/lib/i18n";
import { motion } from "framer-motion";
import { 
  Calendar, Clock, ArrowRight, BookOpen, Tag, Search, Filter
} from "lucide-react";
import { SEO } from "@/components/SEO";
import { getAllPublishedBlogs, getBlogsByCategory, BlogPost } from "@/lib/blogs";
import { useState } from "react";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

function BlogCard({ blog, language }: { blog: BlogPost; language: string }) {
  const isArabic = language === "ar";
  const title = isArabic ? blog.titleAr : blog.title;
  const excerpt = isArabic ? blog.excerptAr : blog.excerpt;
  const category = isArabic ? blog.categoryAr : blog.category;
  
  const publishedDate = new Date(blog.publishedAt).toLocaleDateString(
    isArabic ? "ar-SA" : "en-US",
    { year: "numeric", month: "long", day: "numeric" }
  );

  return (
    <motion.article
      variants={fadeIn}
      className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300 group"
    >
      <Link href={`/blog/${blog.slug}`}>
        <div className="p-6 cursor-pointer">
          <div className="flex items-center gap-3 mb-3 text-sm text-gray-600">
            <span className="flex items-center gap-1">
              <Tag className="w-4 h-4" />
              <span className="text-primary font-medium">{category}</span>
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {publishedDate}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {blog.readingTime} {isArabic ? "دقائق" : "min read"}
            </span>
          </div>
          
          <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors">
            {title}
          </h3>
          
          <p className="text-gray-600 mb-4 line-clamp-3">
            {excerpt}
          </p>
          
          <div className="flex items-center text-primary font-medium group-hover:gap-2 transition-all">
            <span>{isArabic ? "اقرأ المزيد" : "Read More"}</span>
            <ArrowRight className={`w-4 h-4 ${isArabic ? "rotate-180" : ""} transition-transform group-hover:translate-x-1`} />
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

export default function BlogList() {
  const { language } = useLanguage();
  const isArabic = language === "ar";
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const allBlogs = selectedCategory 
    ? getBlogsByCategory(selectedCategory)
    : getAllPublishedBlogs();

  const filteredBlogs = searchQuery
    ? allBlogs.filter(blog => {
        const title = isArabic ? blog.titleAr : blog.title;
        const excerpt = isArabic ? blog.excerptAr : blog.excerpt;
        const content = isArabic ? blog.contentAr : blog.content;
        const searchLower = searchQuery.toLowerCase();
        return (
          title.toLowerCase().includes(searchLower) ||
          excerpt.toLowerCase().includes(searchLower) ||
          content.toLowerCase().includes(searchLower)
        );
      })
    : allBlogs;

  const categories = [
    { value: "mobile-development", label: isArabic ? "تطوير التطبيقات" : "Mobile Development" },
    { value: "web-development", label: isArabic ? "تطوير الويب" : "Web Development" },
    { value: "on-demand-apps", label: isArabic ? "تطبيقات الطلب" : "On-Demand Apps" },
    { value: "clone-apps", label: isArabic ? "تطبيقات مستنسخة" : "Clone Apps" },
    { value: "ui-ux-design", label: isArabic ? "تصميم UI/UX" : "UI/UX Design" },
    { value: "technology-consulting", label: isArabic ? "الاستشارات التقنية" : "Tech Consulting" },
    { value: "outsourcing", label: isArabic ? "التعهيد" : "Outsourcing" },
  ];

  const title = isArabic ? "المدونة" : "Blog";
  const subtitle = isArabic 
    ? "اكتشف آخر المقالات والأفكار حول التطوير الخارجي والتقنيات الحديثة"
    : "Discover the latest articles and insights on outsourcing and modern technologies";

  return (
    <div className="min-h-screen flex flex-col">
      <SEO 
        title="Blog"
        titleAr="المدونة"
        description="Read our latest articles about offshore development, software engineering, and technology trends for Saudi businesses."
        descriptionAr="اقرأ أحدث مقالاتنا حول التطوير الخارجي وهندسة البرمجيات واتجاهات التكنولوجيا للشركات السعودية."
        keywords="blog, articles, outsourcing, software development, technology insights, Saudi Arabia"
        keywordsAr="مدونة، مقالات، التطوير الخارجي، تطوير البرمجيات، رؤى التكنولوجيا، السعودية"
        canonicalUrl="/blog"
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
              className="text-center max-w-3xl mx-auto"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full mb-6">
                <BookOpen className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-primary">{title}</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                {title}
              </h1>
              
              <p className="text-xl text-gray-300 mb-8">
                {subtitle}
              </p>

              {/* Search and Filter */}
              <div className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder={isArabic ? "ابحث في المقالات..." : "Search articles..."}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                
                <div className="flex gap-2">
                  <button
                    onClick={() => setSelectedCategory(null)}
                    className={`px-4 py-3 rounded-lg border transition-colors ${
                      selectedCategory === null
                        ? "bg-primary border-primary text-white"
                        : "bg-white/10 border-white/20 text-white hover:bg-white/20"
                    }`}
                  >
                    {isArabic ? "الكل" : "All"}
                  </button>
                  {categories.map(cat => (
                    <button
                      key={cat.value}
                      onClick={() => setSelectedCategory(cat.value)}
                      className={`px-4 py-3 rounded-lg border transition-colors ${
                        selectedCategory === cat.value
                          ? "bg-primary border-primary text-white"
                          : "bg-white/10 border-white/20 text-white hover:bg-white/20"
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="py-16 bg-gray-50">
          <div className="container-width">
            {filteredBlogs.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredBlogs.map((blog) => (
                  <BlogCard key={blog.id} blog={blog} language={language} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-xl text-gray-600">
                  {isArabic ? "لم يتم العثور على مقالات." : "No articles found."}
                </p>
              </div>
            )}
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
