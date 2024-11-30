'use client'

import { AnimatePresence, motion } from 'framer-motion'

import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'

import { BeatLoader } from './BeatLoader'
import { EXPERTISE_CONTENT } from './constants'
import { useHighlightText } from './hooks/useHighlightText'
import { useTypewriter } from './hooks/useTypewriter'

export const ExpertiseTypewriter = () => {
  const { currentNiche, displayText, isTyping, currentIndex, showCursor } =
    useTypewriter()
  const { highlightText } = useHighlightText()

  return (
    <div className="flex min-h-[calc(100vh-4rem)] w-full items-center justify-center p-4 md:p-8">
      <Card className="w-full max-w-4xl border-muted bg-card/50 shadow-lg backdrop-blur-sm">
        <CardContent className="p-6 md:p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentNiche}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-start space-y-6"
            >
              <div className="flex w-full items-center justify-between">
                <Badge
                  variant="secondary"
                  className="px-4 py-2 text-lg capitalize"
                >
                  {currentNiche.replace(/-/g, ' ')}
                </Badge>

                <AnimatePresence>
                  {isTyping &&
                    currentIndex < EXPERTISE_CONTENT[currentNiche].length && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.3 }}
                      >
                        <BeatLoader />
                      </motion.div>
                    )}
                </AnimatePresence>
              </div>

              <p
                className="text-xl leading-relaxed text-foreground/90"
                dangerouslySetInnerHTML={{
                  __html:
                    highlightText(displayText) +
                    (showCursor
                      ? '<span class="inline-block w-0.5 h-6 bg-primary ml-1 align-middle"></span>'
                      : ''),
                }}
              />
            </motion.div>
          </AnimatePresence>
        </CardContent>
      </Card>
    </div>
  )
}
