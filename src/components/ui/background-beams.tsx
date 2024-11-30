'use client'

import { motion } from 'framer-motion'

import { cn } from '@/lib/utils'

export const BackgroundBeams = ({ className }: { className?: string }) => {
  // Array of SVG paths that create the beam effect
  const paths = [
    'M-380 -189C-380 -189 -312 216 152 343C616 470 684 875 684 875',
    'M-373 -197C-373 -197 -305 208 159 335C623 462 691 867 691 867',
    'M-366 -205C-366 -205 -298 200 166 327C630 454 698 859 698 859',
    'M-359 -213C-359 -213 -291 192 173 319C637 446 705 851 705 851',
    'M-352 -221C-352 -221 -284 184 180 311C644 438 712 843 712 843',
    'M-345 -229C-345 -229 -277 176 187 303C651 430 719 835 719 835',
    'M-338 -237C-338 -237 -270 168 194 295C658 422 726 827 726 827',
    'M-331 -245C-331 -245 -263 160 201 287C665 414 733 819 733 819',
    'M-324 -253C-324 -253 -256 152 208 279C672 406 740 811 740 811',
  ]

  return (
    <div className={cn('h-full w-full relative overflow-hidden', className)}>
      {/* Dark background with subtle gradient */}
      <div className="bg-neutral-950 w-full h-full absolute inset-0">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 to-neutral-900 opacity-80" />

        {/* SVG container */}
        <svg
          className="absolute inset-0 w-full h-full z-0"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g>
            {paths.map((path, index) => (
              <motion.path
                key={index}
                d={path}
                stroke="currentColor"
                className="text-neutral-800/20"
                strokeWidth="1"
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{
                  pathLength: 1,
                  opacity: 0.3,
                  transition: {
                    duration: 4,
                    delay: index * 0.2,
                    repeat: Infinity,
                    repeatType: 'loop',
                    ease: 'linear',
                  },
                }}
              />
            ))}
          </g>
        </svg>

        {/* Radial gradient mask */}
        <div className="absolute inset-0 w-full h-full bg-neutral-950 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
      </div>

      {/* Content container */}
      <div className="relative z-10 w-full h-full">
        <div className="absolute top-1/2 h-48 w-full translate-y-12 scale-x-150 bg-neutral-950 blur-2xl" />
        <div className="absolute top-1/2 z-50 h-48 w-full bg-transparent opacity-10 backdrop-blur-md" />
      </div>
    </div>
  )
}
