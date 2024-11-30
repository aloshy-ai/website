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
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <BackgroundBeams>
            <main className="relative min-h-screen w-full">{children}</main>
          </BackgroundBeams>
        </ThemeProvider>
      </body>
    </html>
  )
}
