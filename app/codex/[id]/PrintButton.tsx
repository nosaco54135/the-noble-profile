'use client'

export default function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      className="btn-outline text-sm py-2 px-4"
    >
      Print / Save PDF
    </button>
  )
}
