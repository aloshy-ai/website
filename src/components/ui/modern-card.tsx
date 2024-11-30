'use client'

import { HTMLMotionProps, motion } from 'framer-motion'

import { cn } from '@/lib/utils'

interface ModernCardProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode
  className?: string
  animate?: boolean
}

export const ModernCard = ({
  children,
  className,
  animate = true,
  ...props
}: ModernCardProps) => {
  return (
    <motion.div
      initial={animate ? { opacity: 0, y: 20 } : false}
      animate={animate ? { opacity: 1, y: 0 } : false}
      transition={{ duration: 0.5 }}
      className={cn(
        'relative overflow-hidden rounded-xl border border-white/10 bg-gradient-to-b from-white/5 to-white/10 shadow-2xl',
        'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent',
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  )
}
