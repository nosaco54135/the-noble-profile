import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
  maxWidth?: 'prose' | 'wide'
  className?: string
}

export function Container({ children, maxWidth = 'prose', className = '' }: Props) {
  const widthClass = maxWidth === 'wide' ? 'max-w-wide' : 'max-w-prose'
  return (
    <div className={`${widthClass} mx-auto px-8 md:px-10 ${className}`}>
      {children}
    </div>
  )
}
