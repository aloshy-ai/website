'use client'

import { ExpertiseTypewriter } from '@/components/ExpertiseTypewriter'

export default function Page() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center p-4">
      <div className="relative w-full max-w-4xl">
        <ExpertiseTypewriter />
      </div>
    </section>
  )
}
