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
        variant="secondary"
        size="sm"
        className="relative text-xs font-bold text-muted-foreground hover:text-muted-foreground/90 uppercase"
        onClick={() => window.open('https://meet.aloshy.ai', '_blank')}
      >
        Tell me more
        <div className="absolute inset-0 ring-2 ring-foreground/20 rounded-sm animate-pulse-ring" />
      </Button>
    </motion.div>
  )
}
