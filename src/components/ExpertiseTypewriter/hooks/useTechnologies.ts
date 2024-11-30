'use client'

import { useEffect, useState } from 'react'

import { fetchApi } from '@/lib/api-utils'

import type { ExpertiseTagsResponse } from '@/app/api/expertise/tags/route'

export const useTechnologies = () => {
  const [technologies, setTechnologies] = useState<
    ExpertiseTagsResponse['technologies'] | []
  >([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchTechnologies = async () => {
      try {
        setIsLoading(true)
        setError(null)
        const data = await fetchApi<ExpertiseTagsResponse>(
          '/api/expertise/tags'
        )
        setTechnologies(data.technologies)
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Failed to fetch technologies'
        )
      } finally {
        setIsLoading(false)
      }
    }

    fetchTechnologies()
  }, [])

  return {
    technologies,
    isLoading,
    error,
  }
}
