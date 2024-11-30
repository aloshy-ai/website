import { EXPERTISE_CONTENT } from '@/components/ExpertiseTypewriter/constants'
import type { NicheType } from '@/components/ExpertiseTypewriter/types'

export async function GET() {
  try {
    const niches = Object.keys(EXPERTISE_CONTENT) as NicheType[]
    const randomNiche = niches[Math.floor(Math.random() * niches.length)]

    return Response.json({
      niche: randomNiche,
      content: EXPERTISE_CONTENT[randomNiche],
    })
  } catch (error) {
    return Response.json({ error: 'AI Agent seems busy!' }, { status: 500 })
  }
}
