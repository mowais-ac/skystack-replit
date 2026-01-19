import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertContactSchema, type InsertContactSubmission } from "@shared/schema";
import { useSubmitContact } from "@/hooks/use-contact";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { MapPin, Phone, Mail, Loader2, Send, Clock, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useLanguage } from "@/lib/i18n";
import { Link } from "wouter";
import { SEO } from "@/components/SEO";
import { trackLeadFormSubmission } from "@/lib/analytics";

export default function ContactUs() {
  const { language, t } = useLanguage();
  const mutation = useSubmitContact();
  const form = useForm<InsertContactSubmission>({
    resolver: zodResolver(insertContactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      company: "",
      message: "",
    },
  });

  const onSubmit = (data: InsertContactSubmission) => {
    trackLeadFormSubmission("contact_form", {
      name: data.name,
      email: data.email,
      phone: data.phone,
      company: data.company || "",
      message_length: data.message?.length || 0,
      language
    });
    mutation.mutate(data, {
      onSuccess: () => form.reset(),
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <SEO 
        title="Contact Us"
        titleAr="تواصل معنا"
        description="Get in touch with SkyStack for your software development needs. We're based in Riyadh, Saudi Arabia and ready to help with your next project."
        descriptionAr="تواصل مع سكاي ستاك لاحتياجات تطوير البرمجيات الخاصة بك. نحن مقرنا في الرياض، المملكة العربية السعودية وجاهزون لمساعدتك في مشروعك القادم."
        keywords="contact SkyStack, software development company, Riyadh tech company, Saudi Arabia IT services, get quote"
        keywordsAr="تواصل سكاي ستاك، شركة تطوير البرمجيات، شركة تقنية الرياض، خدمات تقنية المعلومات السعودية، احصل على عرض سعر"
        canonicalUrl="/contact-us"
      />
      <Navigation />
      
      <main className="flex-grow">
        {/* Hero */}
        <section className="bg-slate-900 text-white pt-40 pb-20 relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-20 right-20 w-72 h-72 bg-primary/30 rounded-full blur-3xl" />
          </div>
          
          <div className="container-width relative z-10">
            <div className="max-w-3xl">
              <span className="text-emerald-400 font-semibold tracking-wider uppercase text-sm">
                {language === "ar" ? "تواصل معنا" : "Get in Touch"}
              </span>
              <h1 className="text-4xl lg:text-6xl font-bold mt-4 mb-6" data-testid="text-contact-title">
                {t("contact.title")}
              </h1>
              <p className="text-xl text-slate-300 leading-relaxed">
                {t("contact.subtitle")}
              </p>
            </div>
          </div>
        </section>

        {/* Contact Form & Info */}
        <section className="py-20 lg:py-28">
          <div className="container-width">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
              {/* Contact Info Side */}
              <div className="lg:col-span-1 space-y-6">
                <div className="bg-slate-50 p-8 rounded-md border border-slate-100">
                  <h3 className="text-2xl font-bold mb-6">
                    {language === "ar" ? "معلومات الاتصال" : "Contact Info"}
                  </h3>
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center shrink-0 text-primary">
                        <MapPin className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-900">
                          {language === "ar" ? "موقعنا" : "Visit Us"}
                        </h4>
                        <p className="text-slate-600 mt-1">{t("contact.location")}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center shrink-0 text-primary">
                        <Mail className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-900">
                          {language === "ar" ? "البريد الإلكتروني" : "Email Us"}
                        </h4>
                        <p className="text-slate-600 mt-1">info@skystack.sa</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center shrink-0 text-primary">
                        <Phone className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-900">
                          {language === "ar" ? "اتصل بنا" : "Call Us"}
                        </h4>
                        <p className="text-slate-600 mt-1" dir="ltr">+966 537 430 455</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center shrink-0 text-primary">
                        <Clock className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-900">
                          {language === "ar" ? "ساعات العمل" : "Business Hours"}
                        </h4>
                        <p className="text-slate-600 mt-1">
                          {language === "ar" ? "الأحد - الخميس: 9 ص - 6 م" : "Sun - Thu: 9 AM - 6 PM"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Form Side */}
              <div className="lg:col-span-2">
                <div className="bg-white p-8 lg:p-10 rounded-md shadow-xl border border-slate-100">
                  <h2 className="text-2xl font-bold mb-6">
                    {language === "ar" ? "أرسل لنا رسالة" : "Send Us a Message"}
                  </h2>
                  
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name">{t("contact.name")}</Label>
                        <Input 
                          id="name" 
                          placeholder={language === "ar" ? "أدخل اسمك" : "Enter your name"} 
                          className="h-12" 
                          {...form.register("name")} 
                          data-testid="input-name"
                        />
                        {form.formState.errors.name && <p className="text-sm text-red-500">{form.formState.errors.name.message}</p>}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">{t("contact.email")}</Label>
                        <Input 
                          id="email" 
                          type="email" 
                          placeholder={language === "ar" ? "أدخل بريدك الإلكتروني" : "Enter your email"} 
                          className="h-12" 
                          {...form.register("email")} 
                          data-testid="input-email"
                        />
                        {form.formState.errors.email && <p className="text-sm text-red-500">{form.formState.errors.email.message}</p>}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="phone">{t("contact.phone")}</Label>
                        <Input 
                          id="phone" 
                          placeholder={language === "ar" ? "أدخل رقم هاتفك" : "Enter your phone"} 
                          className="h-12" 
                          {...form.register("phone")} 
                          data-testid="input-phone"
                        />
                        {form.formState.errors.phone && <p className="text-sm text-red-500">{form.formState.errors.phone.message}</p>}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="company">{t("contact.company")} ({language === "ar" ? "اختياري" : "Optional"})</Label>
                        <Input 
                          id="company" 
                          placeholder={language === "ar" ? "اسم شركتك" : "Your company name"} 
                          className="h-12" 
                          {...form.register("company")} 
                          data-testid="input-company"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">{t("contact.message")}</Label>
                      <Textarea 
                        id="message" 
                        placeholder={language === "ar" ? "أخبرنا عن مشروعك..." : "Tell us about your project..."} 
                        className="min-h-[150px] resize-none" 
                        {...form.register("message")} 
                        data-testid="input-message"
                      />
                      {form.formState.errors.message && <p className="text-sm text-red-500">{form.formState.errors.message.message}</p>}
                    </div>

                    <button 
                      type="submit" 
                      disabled={mutation.isPending}
                      className="w-full btn-primary h-14 text-lg flex items-center justify-center gap-2"
                      data-testid="button-submit"
                    >
                      {mutation.isPending ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" /> 
                          {language === "ar" ? "جاري الإرسال..." : "Sending..."}
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" /> {t("contact.submit")}
                        </>
                      )}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-primary text-white">
          <div className="container-width text-center">
            <h2 className="text-2xl lg:text-3xl font-bold mb-4">
              {language === "ar" ? "هل تفضل الاتصال المباشر؟" : "Prefer a Direct Call?"}
            </h2>
            <p className="text-blue-100 mb-6">
              {language === "ar" 
                ? "جدول مكالمة مع فريق المبيعات لمناقشة مشروعك"
                : "Schedule a call with our sales team to discuss your project"}
            </p>
            <a href="https://wa.me/966537430455" target="_blank" rel="noopener noreferrer">
              <button className="bg-white text-primary px-8 py-3 rounded-md font-semibold hover:bg-blue-50 transition-all inline-flex items-center gap-2" data-testid="button-whatsapp-cta">
                {language === "ar" ? "تواصل عبر واتساب" : "Chat on WhatsApp"} <ArrowRight className="w-5 h-5" />
              </button>
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
