import Link from 'next/link'
import { Fragment } from 'react'

const LINK_CLASSNAME =
  'text-[#722F37] underline underline-offset-4 decoration-[#722F37]/40 hover:decoration-[#722F37] transition-colors'

// Matches [link text](href) — non-greedy, no nested brackets/parens inside either part.
const LINK_PATTERN = /\[([^\[\]]+)\]\(([^()\s]+)\)/g

export function InlineText({ text }: { text: string }) {
  const parts: React.ReactNode[] = []
  let lastIndex = 0
  let match: RegExpExecArray | null
  let key = 0

  LINK_PATTERN.lastIndex = 0
  while ((match = LINK_PATTERN.exec(text))) {
    const [full, linkText, href] = match
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index))
    }
    if (href.startsWith('/')) {
      parts.push(
        <Link key={key++} href={href} className={LINK_CLASSNAME}>
          {linkText}
        </Link>
      )
    } else {
      parts.push(
        <a key={key++} href={href} target="_blank" rel="noopener noreferrer" className={LINK_CLASSNAME}>
          {linkText}
        </a>
      )
    }
    lastIndex = match.index + full.length
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex))
  }

  if (parts.length === 0) {
    parts.push(text)
  }

  return <Fragment>{parts}</Fragment>
}
