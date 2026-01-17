import { Helmet } from "react-helmet-async";
import { useLanguage } from "@/lib/i18n";

interface SEOProps {
  title: string;
  titleAr?: string;
  description: string;
  descriptionAr?: string;
  keywords?: string;
  keywordsAr?: string;
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: "website" | "article" | "product";
  noIndex?: boolean;
}

const SITE_NAME = "SkyStack";
const SITE_NAME_AR = "سكاي ستاك";
const BASE_URL = "https://skystack.sa";
const DEFAULT_OG_IMAGE = "https://skystack.sa/og-image.png";

export function SEO({
  title,
  titleAr,
  description,
  descriptionAr,
  keywords,
  keywordsAr,
  canonicalUrl,
  ogImage = DEFAULT_OG_IMAGE,
  ogType = "website",
  noIndex = false,
}: SEOProps) {
  const { language } = useLanguage();
  const isArabic = language === "ar";

  const currentTitle = isArabic && titleAr ? titleAr : title;
  const currentDescription = isArabic && descriptionAr ? descriptionAr : description;
  const currentKeywords = isArabic && keywordsAr ? keywordsAr : keywords;
  const siteName = isArabic ? SITE_NAME_AR : SITE_NAME;
  
  const fullTitle = `${currentTitle} | ${siteName}`;
  const fullCanonicalUrl = canonicalUrl ? `${BASE_URL}${canonicalUrl}` : undefined;

  return (
    <Helmet>
      <html lang={language} dir={isArabic ? "rtl" : "ltr"} />
      <title>{fullTitle}</title>
      <meta name="description" content={currentDescription} />
      {currentKeywords && <meta name="keywords" content={currentKeywords} />}
      
      {noIndex && <meta name="robots" content="noindex, nofollow" />}
      
      {fullCanonicalUrl && <link rel="canonical" href={fullCanonicalUrl} />}
      
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={currentDescription} />
      <meta property="og:type" content={ogType} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content={siteName} />
      {fullCanonicalUrl && <meta property="og:url" content={fullCanonicalUrl} />}
      <meta property="og:locale" content={isArabic ? "ar_SA" : "en_US"} />
      
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={currentDescription} />
      <meta name="twitter:image" content={ogImage} />
      
      <meta name="geo.region" content="SA" />
      <meta name="geo.placename" content="Riyadh" />
      
      <meta name="author" content="SkyStack Technology" />
      <meta name="publisher" content="SkyStack Technology" />
    </Helmet>
  );
}
