'use client'

import { Component, type ErrorInfo, type ReactNode } from 'react'

import { Card, CardContent } from '@/components/ui/card'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo)
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-[calc(100vh-4rem)] w-full items-center justify-center p-4 md:p-8">
          <Card className="w-full max-w-4xl border-destructive shadow-lg backdrop-blur-sm">
            <CardContent className="p-6 md:p-8">
              <p className="text-xl text-destructive">
                {this.state.error?.message || 'Something went wrong'}
              </p>
            </CardContent>
          </Card>
        </div>
      )
    }

    return this.props.children
  }
}
