'use client'

import { ExpertiseTypewriter } from '@/components/ExpertiseTypewriter'
import ParticleField from '@/components/ParticleField'

export default function Page() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center p-4">
      <div className="absolute inset-0 -z-20" />
      <ParticleField />
      <div className="relative w-full max-w-4xl">
        <ExpertiseTypewriter />
      </div>
    </main>
  )
}
