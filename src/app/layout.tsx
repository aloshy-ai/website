import HeroText from '@/components/HeroText'
import { Logo } from '@/components/Logo'
import SocialLinks from '@/components/SocialLinks'
import { ThemeProvider } from '@/components/theme-provider'
import { BackgroundBeams } from '@/components/ui/background-beams'
import PureMarquee from '@/components/ui/pure-marquee'

import '@/app/globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className="antialiased scroll-smooth dark"
      suppressHydrationWarning
    >
      <body className="overscroll-none">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          forcedTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <BackgroundBeams>
            <div className="fixed top-8 w-full px-4 md:px-8 flex flex-col items-center">
              <div className="flex items-center justify-center gap-4">
                <Logo className="text-4xl md:text-6xl" />
                <SocialLinks />
              </div>
              <HeroText />
            </div>
            <main className="relative min-h-screen w-full">{children}</main>
            <PureMarquee className="fixed bottom-0 left-0 right-0" />
          </BackgroundBeams>
        </ThemeProvider>
      </body>
    </html>
  )
}
