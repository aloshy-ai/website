'use client'

import { motion } from 'framer-motion'

import { Button } from '@/components/ui/button'

export function TellMeMoreButton() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      className="inline-flex items-center"
    >
      <Button
        variant="default"
        size="sm"
        className="relative text-sm font-medium text-primary hover:text-primary/90"
        onClick={() => window.open('https://meet.aloshy.ai', '_blank')}
      >
        Tell me more about it!
        <div className="absolute inset-0 ring-2 ring-primary/50 rounded-sm animate-pulse-ring" />
      </Button>
    </motion.div>
  )
}
