export const site = {
  name: 'Lingua Maya',
  teacher: 'Martha A. Zelada',
  // Replace with the real number in international format, digits only (e.g. 502 + number).
  whatsappNumber: '50200000000',
  email: 'learnonlinegt@gmail.com',
  // Placeholder booking calendar — replace with the real Calendly / Google Calendar link.
  bookingUrl: 'https://calendly.com/linguamaya/lesson',
  socials: [
    { name: 'Instagram', icon: 'instagram', href: 'https://www.instagram.com/lingua.maya' },
    { name: 'Facebook', icon: 'facebook', href: 'https://www.facebook.com/profile.php?id=61595103177264' },
    { name: 'TikTok', icon: 'tiktok', href: 'https://www.tiktok.com/@lingua_maya' },
    { name: 'YouTube', icon: 'youtube', href: 'https://youtube.com/@linguamaya' },
  ],
} as const

export function whatsappLink(message: string) {
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`
}
