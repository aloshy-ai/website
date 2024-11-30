import { TECHNOLOGIES } from '@/components/ExpertiseTypewriter/constants'

import { createResponse } from '@/lib/api-utils'

export type ExpertiseTagsResponse = {
  technologies: typeof TECHNOLOGIES
}

export async function GET() {
  return createResponse<ExpertiseTagsResponse>(async () => {
    return {
      technologies: TECHNOLOGIES,
    }
  })
}
