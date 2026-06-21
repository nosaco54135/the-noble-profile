import { readFileSync } from 'fs'
import { join } from 'path'
import { ImageResponse } from 'next/og'
import { serverStorage } from '@/lib/storage'
import { archetypes } from '@/lib/archetypes'

export const runtime = 'nodejs'
export const alt = 'The Noble Quotient — your sales archetype result'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'
export const revalidate = 86400 // cache for 24 hours

const OXBLOOD = '#722F37'
const CREAM = '#FAFAF7'
const CREAM_DIM = 'rgba(250,240,235,0.6)'
const INK = '#1a1a1a'
const MUTED = '#888888'
const RULE = '#E0D8D0'
const FOOTER_BG = '#F0EDE4'

export default async function Image({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  const fontsDir = join(process.cwd(), 'public/fonts')
  const cormorantBold = readFileSync(join(fontsDir, 'Cormorant-Bold.ttf'))
  const interRegular = readFileSync(join(fontsDir, 'Inter-Regular.ttf'))
  const interSemiBold = readFileSync(join(fontsDir, 'Inter-SemiBold.ttf'))

  const sealBuffer = readFileSync(join(process.cwd(), 'public/tns-seal.png'))
  const sealDataUrl = `data:image/png;base64,${sealBuffer.toString('base64')}`

  const fonts = [
    { name: 'Cormorant', data: cormorantBold, weight: 700 as const, style: 'normal' as const },
    { name: 'Inter', data: interRegular, weight: 400 as const, style: 'normal' as const },
    { name: 'Inter', data: interSemiBold, weight: 600 as const, style: 'normal' as const },
  ]

  const assessment = await serverStorage.loadAssessment(id).catch(() => null)
  const primary = assessment?.archetypeResult?.primary

  if (!primary) {
    return new ImageResponse(
      (
        <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%', backgroundColor: CREAM }}>
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: OXBLOOD, padding: '0 56px', height: 90 }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <p style={{ margin: 0, fontFamily: 'Inter', fontWeight: 600, fontSize: 10, letterSpacing: 2, color: CREAM_DIM, textTransform: 'uppercase' }}>Issued by</p>
              <p style={{ margin: 0, fontFamily: 'Cormorant', fontWeight: 700, fontSize: 22, color: CREAM }}>The Noble Seller</p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
              <p style={{ margin: 0, fontFamily: 'Inter', fontWeight: 600, fontSize: 10, letterSpacing: 2, color: CREAM_DIM, textTransform: 'uppercase' }}>Assessment</p>
              <p style={{ margin: 0, fontFamily: 'Cormorant', fontWeight: 700, fontSize: 22, color: CREAM }}>The Noble Quotient</p>
            </div>
          </div>
          <div style={{ display: 'flex', flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <p style={{ margin: 0, fontFamily: 'Cormorant', fontWeight: 700, fontSize: 72, color: INK, lineHeight: 1 }}>Know your selling identity.</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: FOOTER_BG, padding: '0 56px', height: 44 }}>
            <p style={{ margin: 0, fontFamily: 'Inter', fontWeight: 600, fontSize: 8, letterSpacing: 2, color: OXBLOOD, textTransform: 'uppercase' }}>B2B Sales Behavioral Assessment · Verified Result</p>
            <p style={{ margin: 0, fontFamily: 'Inter', fontWeight: 400, fontSize: 10, color: MUTED }}>thenobleseller.com</p>
          </div>
        </div>
      ),
      { width: 1200, height: 630, fonts },
    )
  }

  const archetypeName = primary.name as string
  const strengthLabel = (primary.trait?.label ?? primary.trait ?? 'Sales Excellence') as string
  const nameWithoutThe = archetypeName.startsWith('The ') ? archetypeName.slice(4) : archetypeName
  const nameFontSize = archetypeName.length > 22 ? 64 : 76

  const archetypeConfig = archetypes.find(
    (a) => a.name.toLowerCase() === archetypeName.toLowerCase() ||
           a.name.toLowerCase() === nameWithoutThe.toLowerCase()
  )
  const tagline = archetypeConfig?.tagline ?? 'B2B Sales Behavioral Assessment'

  return new ImageResponse(
    (
      <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%', backgroundColor: CREAM }}>

        {/* Header */}
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: OXBLOOD, padding: '0 56px', height: 90, flexShrink: 0 }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <p style={{ margin: 0, marginBottom: 4, fontFamily: 'Inter', fontWeight: 600, fontSize: 10, letterSpacing: 2, color: CREAM_DIM, textTransform: 'uppercase' }}>Issued by</p>
            <p style={{ margin: 0, fontFamily: 'Cormorant', fontWeight: 700, fontSize: 22, color: CREAM }}>The Noble Seller</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
            <p style={{ margin: 0, marginBottom: 4, fontFamily: 'Inter', fontWeight: 600, fontSize: 10, letterSpacing: 2, color: CREAM_DIM, textTransform: 'uppercase' }}>Assessment</p>
            <p style={{ margin: 0, fontFamily: 'Cormorant', fontWeight: 700, fontSize: 22, color: CREAM }}>The Noble Quotient</p>
          </div>
        </div>

        {/* Body */}
        <div style={{ display: 'flex', flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px 56px 16px', position: 'relative' }}>

          <p style={{ margin: 0, marginBottom: 12, fontFamily: 'Inter', fontWeight: 600, fontSize: 10, letterSpacing: 2, color: MUTED, textTransform: 'uppercase' }}>Sales Archetype Identified</p>
          <p style={{ margin: 0, marginBottom: 16, fontFamily: 'Cormorant', fontWeight: 700, fontSize: nameFontSize, color: INK, lineHeight: 1 }}>{archetypeName}</p>
          <p style={{ margin: 0, fontFamily: 'Inter', fontWeight: 400, fontSize: 16, color: MUTED, fontStyle: 'italic' }}>{tagline}</p>

          {/* Seal — pre-rendered PNG */}
          <img
            src={sealDataUrl}
            width={130}
            height={130}
            alt=""
            style={{ position: 'absolute', right: 48, bottom: 20 }}
          />

        </div>

        {/* Data strip */}
        <div style={{ display: 'flex', flexDirection: 'column', padding: '0 56px', flexShrink: 0 }}>
          <div style={{ display: 'flex', height: 1, backgroundColor: RULE, marginBottom: 18 }} />
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', marginBottom: 22 }}>
            <div style={{ display: 'flex', flexDirection: 'column', marginRight: 72 }}>
              <p style={{ margin: 0, marginBottom: 6, fontFamily: 'Inter', fontWeight: 600, fontSize: 8, letterSpacing: 2, color: OXBLOOD, textTransform: 'uppercase' }}>Primary Archetype</p>
              <p style={{ margin: 0, fontFamily: 'Cormorant', fontWeight: 700, fontSize: 30, color: INK, lineHeight: 1 }}>{nameWithoutThe}</p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', marginRight: 72 }}>
              <p style={{ margin: 0, marginBottom: 6, fontFamily: 'Inter', fontWeight: 600, fontSize: 8, letterSpacing: 2, color: OXBLOOD, textTransform: 'uppercase' }}>Dominant Trait</p>
              <p style={{ margin: 0, fontFamily: 'Cormorant', fontWeight: 700, fontSize: 30, color: INK, lineHeight: 1 }}>{strengthLabel}</p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <p style={{ margin: 0, marginBottom: 6, fontFamily: 'Inter', fontWeight: 600, fontSize: 8, letterSpacing: 2, color: OXBLOOD, textTransform: 'uppercase' }}>Dimensions Assessed</p>
              <p style={{ margin: 0, fontFamily: 'Cormorant', fontWeight: 700, fontSize: 30, color: INK, lineHeight: 1 }}>12</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: FOOTER_BG, padding: '0 56px', height: 44, flexShrink: 0 }}>
          <p style={{ margin: 0, fontFamily: 'Inter', fontWeight: 600, fontSize: 8, letterSpacing: 2, color: OXBLOOD, textTransform: 'uppercase' }}>B2B Sales Behavioral Assessment · Verified Result</p>
          <p style={{ margin: 0, fontFamily: 'Inter', fontWeight: 400, fontSize: 10, color: MUTED }}>thenobleseller.com</p>
        </div>

      </div>
    ),
    { width: 1200, height: 630, fonts },
  )
}
