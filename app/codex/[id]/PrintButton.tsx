'use client'

export default function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      className="border border-[#722F37] text-[#722F37] bg-transparent hover:bg-[#722F37] hover:text-[#FAFAF7] font-sans text-sm px-4 py-2 rounded transition-colors"
    >
      Print / Save PDF
    </button>
  )
}
