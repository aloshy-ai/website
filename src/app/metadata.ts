import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'URL Shortener',
  description:
    'A modern, fast, and minimalist URL shortening service built with Next.js 15',
  icons: {
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
  },
}
