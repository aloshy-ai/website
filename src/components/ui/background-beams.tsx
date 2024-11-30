'use client'

import { useEffect, useRef } from 'react'

// import ParticleField from '@/components/ParticleField'
import { useReducedMotion } from '@/hooks/useReducedMotion'

function CoverImage() {
  return (
    <div
      className="fixed inset-0 bg-cover bg-center bg-no-repeat animate-ken-burns opacity-10"
      style={{
        backgroundImage: 'url(/images/bg.png)',
        backgroundSize: 'cover',
        filter: 'brightness(0.5) contrast(2)',
        transformOrigin: 'center center',
      }}
    />
  )
}

function CoverMatte() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_800px_at_100%_200px,rgba(255,182,255,0.1),transparent_80%)]" />
  )
}

export const BackgroundBeams = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const mouseX = useRef(0)
  const mouseY = useRef(0)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    if (prefersReducedMotion) return

    const container = containerRef.current
    if (!container) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect()
      mouseX.current = e.clientX - rect.left
      mouseY.current = e.clientY - rect.top
      container.style.setProperty('--mouse-x', `${mouseX.current}px`)
      container.style.setProperty('--mouse-y', `${mouseY.current}px`)
    }

    container.addEventListener('mousemove', handleMouseMove)
    return () => container.removeEventListener('mousemove', handleMouseMove)
  }, [prefersReducedMotion])

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden rounded-md bg-slate-900 shadow-2xl before:pointer-events-none before:absolute before:inset-0 before:z-0 before:bg-[radial-gradient(circle_at_var(--mouse-x,_50%)_var(--mouse-y,_50%),rgba(255,182,255,0.1)_0%,rgba(255,182,255,0.05)_25%,transparent_50%)] before:opacity-0 before:transition-opacity before:duration-500 hover:before:opacity-100"
    >
      <CoverImage />
      {/* <ParticleField /> */}
      <CoverMatte />
      {children}
    </div>
  )
}
