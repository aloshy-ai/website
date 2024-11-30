import { EXPERTISE_CONTENT } from '@/components/ExpertiseTypewriter/constants'
import type { NicheType } from '@/components/ExpertiseTypewriter/types'

import { createResponse } from '@/lib/api-utils'

export type ExpertiseGenerateResponse = {
  niche: NicheType
  content: string
}

export async function GET() {
  return createResponse<ExpertiseGenerateResponse>(async () => {
    const niches = Object.keys(EXPERTISE_CONTENT) as NicheType[]
    const randomNiche = niches[Math.floor(Math.random() * niches.length)]

    return {
      niche: randomNiche,
      content: EXPERTISE_CONTENT[randomNiche],
    }
  })
}
