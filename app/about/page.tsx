import { SiteHeader } from "@/components/site-header";
import { About } from "@/components/about-contact";
import { SiteFooter, WhatsAppFloat } from "@/components/site-footer";

export default function AboutPage() {
  return (
    <div id="top" className="p-3 md:p-8">
      <div className="mx-auto max-w-7xl rounded-[2rem] bg-background px-5 py-6 md:px-12 md:py-8">
        <SiteHeader />
        <main className="pb-16">
          <About />
        </main>
        <SiteFooter />
      </div>
      <WhatsAppFloat />
    </div>
  );
}
