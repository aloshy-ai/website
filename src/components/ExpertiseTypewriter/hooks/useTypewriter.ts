'use client'

import { useEffect, useState } from 'react'

import { EXPERTISE_CONTENT } from '../constants'
import type { NicheType } from '../types'

export const useTypewriter = () => {
  const [currentNiche, setCurrentNiche] = useState<NicheType>('frontend')
  const [displayText, setDisplayText] = useState('')
  const [isTyping, setIsTyping] = useState(true)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showCursor, setShowCursor] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor(prev => !prev)
    }, 530)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const text = EXPERTISE_CONTENT[currentNiche]
    let timeoutId: NodeJS.Timeout

    if (isTyping && currentIndex < text.length) {
      const randomDelay = Math.random() * 40 + 60
      const currentChar = text[currentIndex]
      const extraDelay = ['.', ',', '!', '?'].includes(currentChar)
        ? 400
        : [' '].includes(currentChar)
          ? 200
          : 0

      timeoutId = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex])
        setCurrentIndex(prev => prev + 1)
      }, randomDelay + extraDelay)
    } else if (isTyping && currentIndex >= text.length) {
      timeoutId = setTimeout(() => {
        const niches = Object.keys(EXPERTISE_CONTENT) as NicheType[]
        const currentNicheIndex = niches.indexOf(currentNiche)
        const nextNiche = niches[(currentNicheIndex + 1) % niches.length]

        setDisplayText('')
        setCurrentNiche(nextNiche)
        setCurrentIndex(0)
      }, 6000)
    } else if (displayText === '') {
      setIsTyping(true)
    }

    return () => clearTimeout(timeoutId)
  }, [currentNiche, displayText, isTyping, currentIndex])

  return {
    currentNiche,
    displayText,
    isTyping,
    currentIndex,
    showCursor,
  }
}
