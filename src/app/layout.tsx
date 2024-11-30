import ParticleField from '@/components/ParticleField'
import { ThemeProvider } from '@/components/theme-provider'
import { BackgroundBeams } from '@/components/ui/background-beams'

import '@/app/globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className="antialiased scroll-smooth"
      suppressHydrationWarning
    >
      <body className="overscroll-none">
        <div
          className="fixed inset-0 -z-30 bg-cover bg-center bg-no-repeat animate-ken-burns"
          style={{
            backgroundImage: 'url(/images/bg.png)',
            backgroundSize: 'cover',
            filter: 'brightness(0.7) contrast(1.2)',
            transformOrigin: 'center center',
          }}
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <BackgroundBeams>
            <div className="relative min-h-screen w-full">
              <ParticleField />
              {children}
            </div>
          </BackgroundBeams>
        </ThemeProvider>
      </body>
    </html>
  )
}
