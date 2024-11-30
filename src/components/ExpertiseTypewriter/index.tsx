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
      <Card className="relative w-full max-w-4xl border-muted bg-black/75 backdrop-blur-sm">
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
              <div className="flex w-full items-start justify-between">
                <Badge
                  variant="secondary"
                  className="px-4 py-2 text-lg capitalize"
                >
                  {currentNiche.replace(/-/g, ' ')}
                </Badge>

                <AnimatePresence>
                  {(isTyping && currentIndex < content.length) || isLoading ? (
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

              <div className="flex flex-wrap items-center gap-2">
                <p
                  className="inline text-xl leading-relaxed text-foreground/90"
                  dangerouslySetInnerHTML={{
                    __html:
                      highlightText(displayText) +
                      (showCursor
                        ? '<span class="inline-block w-0.5 h-6 bg-primary ml-2 align-middle"></span>'
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
    </div>
  )
}
