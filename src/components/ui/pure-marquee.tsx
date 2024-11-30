'use client'

import React from 'react'

import { cn } from '@/lib/utils'

// import { useTechnologies } from '@/components/ExpertiseTypewriter/hooks/useTechnologies'

interface MarqueeProps extends React.HTMLAttributes<HTMLDivElement> {
  speed?: number
  className?: string
}

const PureMarquee = ({ speed = 100, className }: MarqueeProps) => {
  // const { technologies, isLoading } = useTechnologies()
  //
  // if (isLoading) {
  //   return <div className="animate-pulse h-12 bg-muted" />
  // }
  //
  // const text = technologies.join(' • ')

  const text =
    'A passionate Software Composer and AI/ML Research Scientist with 14 years of experience bridging Web3 and Web2 technologies, specializing in orchestrating AI-assisted development workflows, pioneering innovative approaches that combine traditional development expertise with cutting-edge AI capabilities, spanning blockchain technologies, cloud infrastructure, and distributed systems, with a focus on creating scalable secure software solutions, leading transformative projects including EVM-based protocols and blockchain-integrated applications, optimizing development workflows through AI integration, conceptualizing complex ideas into practical solutions while maintaining high code quality standards, implementing secure identity management solutions, modernizing legacy systems, ensuring compliance with industry standards, working extensively with various protocols and smart contract platforms, developing innovative solutions for decentralized applications, combining expertise in both AI and blockchain technologies to create unique solutions, and deeply committed to mentoring teams and sharing knowledge to help organizations adopt modern development practices and AI-enhanced workflows.'

  return (
    <div
      className={cn(
        className,
        'w-full h-fit py-2 bg-black/15 backdrop-blur-sm overflow-hidden'
      )}
    >
      <div className="flex whitespace-nowrap">
        <h1
          className="text-xs font-mono text-muted-foreground animate-slide px-1"
          style={{
            animationDuration: `${speed}s`,
            animationTimingFunction: 'linear',
            animationIterationCount: 'infinite',
            animationName: 'slide',
          }}
        >
          {text}
        </h1>
        <h1
          className="text-xs font-mono text-muted-foreground animate-slide px-1"
          style={{
            animationDuration: `${speed}s`,
            animationTimingFunction: 'linear',
            animationIterationCount: 'infinite',
            animationName: 'slide',
          }}
        >
          {text}
        </h1>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes slide {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-100%);
          }
        }
      `,
        }}
      />
    </div>
  )
}

export default PureMarquee
