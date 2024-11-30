'use client'

import { useMemo } from 'react'

import { TECHNOLOGIES } from '../constants'
import type { TechColor } from '../types'

export const useHighlightText = () => {
  const techColors = useMemo(() => {
    return TECHNOLOGIES.reduce<TechColor>((acc, tech) => {
      const hue = Math.floor(Math.random() * 360)
      const saturation = 60 + Math.random() * 20
      const lightness = 45 + Math.random() * 10
      const alpha = 0.3
      acc[tech.toLowerCase()] =
        `hsla(${hue}, ${saturation}%, ${lightness}%, ${alpha})`
      return acc
    }, {})
  }, [])

  const highlightText = (text: string) => {
    let highlightedText = text
    const matches: Array<{
      text: string
      index: number
      length: number
      color: string
    }> = []

    TECHNOLOGIES.forEach(tech => {
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
        `<span style="background-color: ${match.color}; border-radius: 0.2em; padding: 0.1em 0.3em; font-weight: 500; text-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);">${match.text}</span>` +
        after
    })

    return highlightedText
  }

  return { highlightText }
}
