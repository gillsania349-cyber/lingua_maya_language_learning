import { notFound, redirect } from "next/navigation"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter, WhatsAppFloat } from "@/components/site-footer"
import { MaterialDetail } from "@/components/material-detail"
import {
  isMaterialSlug,
  materialIdBySlug,
  materialSlugs,
} from "@/lib/materials"

export function generateStaticParams() {
  return materialSlugs.map((slug) => ({ slug }))
}

export default async function MaterialPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  // Old link from before the English pack became the Speaking Club.
  if (slug === "english-pack") redirect("/materials/speaking-club")
  if (!isMaterialSlug(slug)) notFound()

  const id = materialIdBySlug[slug]

  return (
    <div id="top" className="p-3 md:p-8">
      <div className="mx-auto max-w-7xl rounded-[2rem] bg-background px-5 py-6 md:px-12 md:py-8">
        <SiteHeader />
        <main className="pb-16 pt-8 md:pt-12">
          <MaterialDetail id={id} />
        </main>
        <SiteFooter />
      </div>
      <WhatsAppFloat />
    </div>
  )
}
