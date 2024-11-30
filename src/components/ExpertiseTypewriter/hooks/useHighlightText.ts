'use client'

import { useMemo } from 'react'

import type { TechColor } from '@/components/ExpertiseTypewriter/types'

export const useHighlightText = (technologies: readonly string[]) => {
  const techColors = useMemo(() => {
    return technologies.reduce<TechColor>((acc, tech) => {
      const hue = Math.floor(Math.random() * 360)
      const saturation = 80 + Math.random() * 20
      const lightness = 65 + Math.random() * 10
      const alpha = 0.4
      acc[tech.toLowerCase()] =
        `hsla(${hue}, ${saturation}%, ${lightness}%, ${alpha})`
      return acc
    }, {})
  }, [technologies])

  const highlightText = (text: string) => {
    if (!technologies.length) return text

    let highlightedText = text
    const matches: Array<{
      text: string
      index: number
      length: number
      color: string
    }> = []

    technologies.forEach(tech => {
      const regex = new RegExp(`(${tech})`, 'gi')
      let match
      while ((match = regex.exec(text)) !== null) {
        matches.push({
          text: match[0],
          index: match.index,
          length: match[0].length,
          color: techColors[tech.toLowerCase()],
        })
      }
    })

    matches.sort((a, b) => b.index - a.index)

    matches.forEach(match => {
      const before = highlightedText.slice(0, match.index)
      const after = highlightedText.slice(match.index + match.length)
      highlightedText =
        before +
        `<span style="background-color: ${match.color}; border-radius: 0.2em; padding: 0.1em 0.3em; margin: 0 0.05em; font-weight: 500; text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);">${match.text}</span>` +
        after
    })

    return highlightedText
  }

  return { highlightText }
}
