import { SiteHeader } from "@/components/site-header";
import { Hero } from "@/components/hero";
import { Languages } from "@/components/languages";
import { Booking } from "@/components/booking";
import { Practice } from "@/components/practice";
import { Materials } from "@/components/materials";
import { SiteFooter, WhatsAppFloat } from "@/components/site-footer";

export default function Page() {
  return (
    <div id="top" className="p-3 md:p-8">
      <div className="mx-auto max-w-7xl rounded-[2rem] bg-background px-5 py-6 md:px-12 md:py-8">
        <SiteHeader />
        <main className="flex flex-col gap-24 pb-16 md:gap-32">
          <Hero />
          <Languages />
          <Practice />
          <Booking />
          <Materials />
        </main>
        <SiteFooter />
      </div>
      <WhatsAppFloat />
    </div>
  );
}
