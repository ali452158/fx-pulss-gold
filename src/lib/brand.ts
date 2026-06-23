// Shared brand config for FX_Pulss Gold

export const BRAND = {
  name: 'FX_Pulss Gold',
  tagline: 'SMC · ICT · BOOK MAP',
}

// Telegram — channel + private account for subscriptions
export const TELEGRAM_CHANNEL = 'https://t.me/FX_pulssGold'
export const TELEGRAM_CONTACT = 'https://t.me/ali_0165' // private account for course subscriptions

// Social media channels
export const SOCIAL_LINKS = [
  {
    key: 'telegram',
    label: 'تلجرام',
    handle: '@FX_pulssGold',
    href: TELEGRAM_CHANNEL,
    color: '#229ED9',
    icon: 'send',
  },
  {
    key: 'youtube',
    label: 'يوتيوب',
    handle: '@ali.c.u',
    href: 'https://www.youtube.com/@ali.c.u',
    color: '#FF0000',
    icon: 'youtube',
  },
  {
    key: 'instagram',
    label: 'انستجرام',
    handle: '@alifxgold3',
    href: 'https://www.instagram.com/alifxgold3',
    color: '#E4405F',
    icon: 'instagram',
  },
  {
    key: 'tiktok',
    label: 'تيك توك',
    handle: '@ali.trad011',
    href: 'https://www.tiktok.com/@ali.trad011',
    color: '#000000',
    icon: 'tiktok',
  },
] as const
