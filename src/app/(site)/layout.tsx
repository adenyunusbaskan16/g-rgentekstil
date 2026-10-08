import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import HtmlLangSync from "@/components/HtmlLangSync";
import RevealOnScroll from "@/components/RevealOnScroll";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <HtmlLangSync lang="tr" />
      <a href="#main" className="skip-link">Ana içeriğe geç</a>
      <Header />
      <RevealOnScroll />
      <main id="main">{children}</main>
      <Footer lang="tr" />
      <WhatsAppButton lang="tr" />
    </>
  );
}
