import ParticleField from '@/components/ParticleField'
import { ThemeProvider } from '@/components/theme-provider'

import './globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="antialiased scroll-smooth">
      <body className="overscroll-none">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        <ParticleField />
      </body>
    </html>
  )
}
