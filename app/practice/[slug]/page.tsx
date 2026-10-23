import { notFound } from "next/navigation"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter, WhatsAppFloat } from "@/components/site-footer"
import { PracticeDetail } from "@/components/practice-detail"
import { isPracticeSlug, practiceSlugs } from "@/lib/practice"

export function generateStaticParams() {
  return practiceSlugs.map((slug) => ({ slug }))
}

export default async function PracticePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  if (!isPracticeSlug(slug)) notFound()

  return (
    <div id="top" className="p-3 md:p-8">
      <div className="mx-auto max-w-7xl rounded-[2rem] bg-background px-5 py-6 md:px-12 md:py-8">
        <SiteHeader />
        <main className="pb-16 pt-8 md:pt-12">
          <PracticeDetail slug={slug} />
        </main>
        <SiteFooter />
      </div>
      <WhatsAppFloat />
    </div>
  )
}
