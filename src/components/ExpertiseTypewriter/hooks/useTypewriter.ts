'use client'

import { useEffect, useState } from 'react'

import type { NicheType } from '@/components/ExpertiseTypewriter/types'

import { fetchApi } from '@/lib/api-utils'

import type { ExpertiseGenerateResponse } from '@/app/api/expertise/generate/route'

export const useTypewriter = () => {
  const [currentNiche, setCurrentNiche] = useState<NicheType>('frontend')
  const [displayText, setDisplayText] = useState('')
  const [isTyping, setIsTyping] = useState(true)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showCursor, setShowCursor] = useState(true)
  const [content, setContent] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isComplete, setIsComplete] = useState(false)

  const fetchNextExpertise = async () => {
    try {
      setIsLoading(true)
      setError(null)

      const data = await fetchApi<ExpertiseGenerateResponse>(
        '/api/expertise/generate'
      )
      setCurrentNiche(data.niche)
      setContent(data.content)
      setDisplayText('')
      setCurrentIndex(0)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    // Initial fetch
    fetchNextExpertise()
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor(prev => !prev)
    }, 530)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (!content || isLoading) return

    let timeoutId: NodeJS.Timeout

    if (isTyping && currentIndex < content.length) {
      const randomDelay = Math.random() * 40 + 60
      const currentChar = content[currentIndex]
      const extraDelay = ['.', ',', '!', '?'].includes(currentChar)
        ? 400
        : [' '].includes(currentChar)
          ? 200
          : 0

      timeoutId = setTimeout(() => {
        setDisplayText(prev => prev + content[currentIndex])
        setCurrentIndex(prev => prev + 1)
        if (currentIndex === content.length - 1) {
          setIsComplete(true)
        }
      }, randomDelay + extraDelay)
    } else if (isTyping && currentIndex >= content.length) {
      timeoutId = setTimeout(() => {
        setIsComplete(false)
        fetchNextExpertise()
      }, 6000)
    } else if (displayText === '') {
      setIsTyping(true)
    }

    return () => clearTimeout(timeoutId)
  }, [content, displayText, isTyping, currentIndex, isLoading])

  return {
    currentNiche,
    displayText,
    isTyping,
    currentIndex,
    showCursor,
    isLoading,
    error,
    content,
    isComplete,
  }
}
