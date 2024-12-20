'use client'

import { AnimatePresence, motion } from 'framer-motion'

import { BeatLoader } from '@/components/ExpertiseTypewriter/BeatLoader'
import { useHighlightText } from '@/components/ExpertiseTypewriter/hooks/useHighlightText'
import { useTechnologies } from '@/components/ExpertiseTypewriter/hooks/useTechnologies'
import { useTypewriter } from '@/components/ExpertiseTypewriter/hooks/useTypewriter'
import { TellMeMoreButton } from '@/components/TellMeMoreButton'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'

export const ExpertiseTypewriter = () => {
  const {
    currentNiche,
    displayText,
    isTyping,
    currentIndex,
    showCursor,
    isLoading: isLoadingContent,
    error: contentError,
    content,
    isComplete,
  } = useTypewriter()

  const {
    technologies,
    isLoading: isLoadingTech,
    error: techError,
  } = useTechnologies()

  const { highlightText } = useHighlightText(technologies)

  const error = contentError || techError
  const isLoading = isLoadingContent || isLoadingTech

  if (error) {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] w-full items-center justify-center p-4 md:p-8">
        <Card className="w-full max-w-4xl border-destructive shadow-lg backdrop-blur-sm">
          <CardContent className="p-6 md:p-8">
            <p className="text-xl text-destructive">{error}</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex min-h-[calc(100vh-4rem)] w-full items-center justify-center p-4 md:p-8">
      <motion.div
        className="w-full max-w-4xl"
        layout
        transition={{
          layout: { duration: 0.03, ease: 'easeOut' },
        }}
      >
        <Card className="relative border-0 bg-gray-950/60 backdrop-blur-md ring-1 ring-white/10 overflow-hidden shadow-2xl">
          <CardContent className="p-8 md:p-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentNiche}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-start space-y-8"
              >
                <div className="flex w-full items-start justify-between">
                  <Badge
                    variant="secondary"
                    className="px-5 py-2.5 text-lg capitalize bg-gray-950/60 animate-glow rounded-full"
                  >
                    {currentNiche.replace(/-/g, ' ')}
                  </Badge>

                  <AnimatePresence>
                    {(isTyping && currentIndex < content.length) ||
                    isLoading ? (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.3 }}
                        className="p-2"
                      >
                        <BeatLoader />
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <p
                    className="inline text-xl md:text-3xl leading-relaxed md:leading-[1.6] text-foreground"
                    dangerouslySetInnerHTML={{
                      __html:
                        highlightText(displayText) +
                        (showCursor
                          ? '<span class="inline-block w-0.5 h-8 bg-foreground ml-2 align-middle"></span>'
                          : ''),
                    }}
                  />

                  <AnimatePresence>
                    {isComplete && <TellMeMoreButton />}
                  </AnimatePresence>
                </div>
              </motion.div>
            </AnimatePresence>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
