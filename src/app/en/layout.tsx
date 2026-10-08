import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import HtmlLangSync from "@/components/HtmlLangSync";
import RevealOnScroll from "@/components/RevealOnScroll";

export default function EnLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <HtmlLangSync lang="en" />
      <a href="#main" className="skip-link">Skip to main content</a>
      <Header />
      <RevealOnScroll />
      <main id="main">{children}</main>
      <Footer lang="en" />
      <WhatsAppButton lang="en" />
    </>
  );
}
