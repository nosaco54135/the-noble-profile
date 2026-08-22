import Link from 'next/link'
import { TRAITS, STYLES } from '@/lib/scoring'
import { archetypes } from '@/lib/archetypes'

const builtArchetypes = new Map(archetypes.map((a) => [`${a.trait}|${a.style}`, a]))

export function ArchetypeGrid() {
  return (
    <div>
      <div className="overflow-x-auto border border-tns-border rounded-lg">
        <table className="border-collapse table-fixed">
          <colgroup>
            <col className="w-[100px]" />
            {STYLES.map((style) => (
              <col key={style.key} className="w-[112px]" />
            ))}
          </colgroup>
          <thead>
            <tr>
              <th className="sticky left-0 z-10 bg-tns-bgAlt border-b border-r border-tns-border px-3 py-3 align-bottom">
                <div className="font-sans text-[10px] uppercase tracking-[0.1em] text-tns-muted font-semibold leading-tight">
                  <div className="flex flex-col">
                    <span>TRAIT</span>
                    <span aria-hidden="true" className="normal-case tracking-normal">↓</span>
                  </div>
                  <div className="mt-1.5 flex items-center gap-1">
                    <span>STYLE</span>
                    <span aria-hidden="true" className="normal-case tracking-normal">→</span>
                  </div>
                </div>
              </th>
              {STYLES.map((style) => (
                <th
                  key={style.key}
                  scope="col"
                  className="bg-tns-bgAlt border-b border-tns-border px-3 py-3 text-left align-bottom font-sans text-[10px] uppercase tracking-[0.1em] text-tns-muted font-semibold"
                >
                  {style.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {TRAITS.map((trait) => (
              <tr key={trait.key}>
                <th
                  scope="row"
                  className="sticky left-0 z-10 bg-tns-bgAlt border-r border-b border-tns-border px-3 py-3 text-left align-top font-sans text-[10px] uppercase tracking-[0.1em] text-tns-muted font-semibold"
                >
                  {trait.label}
                </th>
                {STYLES.map((style) => {
                  const built = builtArchetypes.get(`${trait.label}|${style.label}`)
                  const name = `${trait.label} ${style.label}`
                  return (
                    <td key={style.key} className="border-b border-tns-border p-1.5 align-top">
                      {built ? (
                        <Link
                          href={`/archetypes/${built.slug}`}
                          className="block h-full rounded-md border border-tns-accent/30 bg-tns-accent/5 px-2.5 py-2 hover:bg-tns-accent/10 transition-colors"
                        >
                          <span className="block font-display font-semibold text-sm leading-snug text-tns-accent">
                            {name}
                          </span>
                          <span className="block mt-1 font-sans text-[11px] leading-snug text-tns-muted line-clamp-2">
                            {built.tagline}
                          </span>
                        </Link>
                      ) : (
                        <div className="block h-full rounded-md border border-transparent px-2.5 py-1">
                          <span className="block font-display font-semibold text-sm leading-snug text-tns-muted">
                            {name}
                          </span>
                        </div>
                      )}
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center gap-6 mt-5">
        <div className="flex items-center gap-2">
          <span className="inline-block h-3 w-3 rounded-sm border border-tns-accent/30 bg-tns-accent/5" />
          <span className="font-sans text-xs text-tns-muted">Full profile</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-block h-3 w-3 rounded-sm border border-tns-border bg-tns-bgAlt" />
          <span className="font-sans text-xs text-tns-muted">Coming soon</span>
        </div>
      </div>
    </div>
  )
}
