'use client'

import { motion } from 'framer-motion'

export const BeatLoader = () => {
  return (
    <div className="flex space-x-1">
      {[0, 1, 2].map(index => (
        <motion.div
          key={index}
          className="h-2 w-2 rounded-full bg-primary"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            delay: index * 0.25,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}
