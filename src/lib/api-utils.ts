type ApiResponse<T> =
  | {
      data: T
      error: null
    }
  | {
      data: null
      error: string
    }

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number = 500
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

export async function createResponse<T>(
  handler: () => Promise<T>
): Promise<Response> {
  try {
    const data = await handler()
    return Response.json({ data, error: null })
  } catch (error) {
    const status = error instanceof ApiError ? error.status : 500
    const message =
      error instanceof Error ? error.message : 'Something went wrong'

    return Response.json({ data: null, error: message }, { status })
  }
}

export async function fetchApi<T>(url: string): Promise<T> {
  const response = await fetch(url)

  if (!response.ok) {
    throw new ApiError(
      `HTTP error! status: ${response.status}`,
      response.status
    )
  }

  const json = (await response.json()) as ApiResponse<T>

  if (json.error) {
    throw new ApiError(json.error)
  }

  if (!json.data) {
    throw new ApiError('No data received')
  }

  return json.data
}
