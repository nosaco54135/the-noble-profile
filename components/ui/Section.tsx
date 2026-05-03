import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
  size?: 'md' | 'lg' | 'xl'
  as?: 'section' | 'header' | 'footer' | 'div'
  className?: string
  id?: string
}

const sizeMap: Record<NonNullable<Props['size']>, string> = {
  md: 'py-tns-sm',
  lg: 'py-tns-xl',
  xl: 'py-tns-3xl',
}

export function Section({ children, size = 'lg', as: Tag = 'section', className = '', id }: Props) {
  return (
    <Tag id={id} className={`${sizeMap[size]} ${className}`}>
      {children}
    </Tag>
  )
}
