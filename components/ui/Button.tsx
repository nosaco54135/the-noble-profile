import type { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from 'react'
import Link from 'next/link'

type Variant = 'primary' | 'ghost' | 'link'

const base =
  'inline-flex items-center justify-center font-medium transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-tns-accent focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'

const variants: Record<Variant, string> = {
  primary:
    'bg-tns-accent text-tns-bg px-6 py-3 hover:bg-tns-accentDark',
  ghost:
    'bg-transparent text-tns-accent px-2 py-1 hover:underline underline-offset-4',
  link:
    'bg-transparent text-tns-accent underline underline-offset-4 hover:text-tns-accentDark p-0',
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant
  children: ReactNode
}

export function Button({ variant = 'primary', className = '', children, ...rest }: ButtonProps) {
  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...rest}>
      {children}
    </button>
  )
}

type LinkButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: Variant
  href: string
  children: ReactNode
}

export function LinkButton({ variant = 'primary', className = '', href, children, ...rest }: LinkButtonProps) {
  const isInternal = href.startsWith('/') && !href.startsWith('//')
  if (isInternal) {
    return (
      <Link href={href} className={`${base} ${variants[variant]} ${className}`} {...rest}>
        {children}
      </Link>
    )
  }
  return (
    <a href={href} className={`${base} ${variants[variant]} ${className}`} {...rest}>
      {children}
    </a>
  )
}
