import { cn } from '@/lib/utils'

type BrandIconProps = {
  name: 'whatsapp' | 'instagram' | 'facebook' | 'tiktok' | 'youtube'
  className?: string
}

// Brand marks from theSVG.org rendered as a CSS mask so they inherit currentColor.
export function BrandIcon({ name, className }: BrandIconProps) {
  const url = `url(/icons/${name}.svg)`
  return (
    <span
      aria-hidden="true"
      className={cn('inline-block size-5 shrink-0 bg-current', className)}
      style={{
        maskImage: url,
        WebkitMaskImage: url,
        maskSize: 'contain',
        WebkitMaskSize: 'contain',
        maskRepeat: 'no-repeat',
        WebkitMaskRepeat: 'no-repeat',
        maskPosition: 'center',
        WebkitMaskPosition: 'center',
      }}
    />
  )
}
