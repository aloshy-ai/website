import { FC } from 'react'

interface LogoProps {
  className?: string
}

export const Logo: FC<LogoProps> = ({ className }) => {
  return (
    <div
      className={`font-bold text-white flex items-center gap-1 z-50 backdrop-blur-lg ${className}`}
    >
      <span className="font-mono">aloshy.</span>
      <span className="flex items-center">
        <span className="text-red-500">🅰</span>
        <span className="text-white">🅸</span>
      </span>
    </div>
  )
}
