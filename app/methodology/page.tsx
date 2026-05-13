import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { LinkButton } from '@/components/ui/Button'

export const metadata = {
  title: 'The Methodology — The Noble Seller',
  description: 'How the Noble Quotient measures selling style across 12 behavioral dimensions, 8 traits, and 8 styles.',
}

// ─── Data ──────────────────────────────────────────────────────────────────

interface AxisEntry {
  name: string
  tagline: string
  dimensions: [string, string]
  definition: string
  best: string
  limit: string
}

const TRAITS: AxisEntry[] = [
  {
    name: 'Empathic',
    tagline: 'Reads the room — and makes the other person feel it.',
    dimensions: ['EQ / Trust', 'Curiosity'],
    definition: "The Empathic seller picks up emotional signal others miss. They notice the pause, the hedge, the tone shift, and they adjust the conversation in real time. They ask questions that surface what a prospect is feeling, not just what they're thinking.",
    best: 'Buyers trust them quickly. Discovery calls reveal more than buyers planned to share.',
    limit: 'Over-indexing on rapport at the expense of momentum. Calls that feel great but don\'t move.',
  },
  {
    name: 'Curious',
    tagline: 'Asks one more question than most people ask.',
    dimensions: ['Curiosity', 'Problem Solving'],
    definition: "The Curious seller stays in discovery longer than most. They follow threads other reps cut off, ask the second and third questions after an interesting answer, and synthesize the answers into solution paths the buyer didn't expect.",
    best: 'Finds the real problem behind the stated problem. Wins deals by understanding more completely.',
    limit: 'Curiosity can become wandering. Conversations that explore everything and close nothing.',
  },
  {
    name: 'Methodical',
    tagline: 'Runs a predictable, repeatable process.',
    dimensions: ['Process-Oriented', 'Data-Driven'],
    definition: "The Methodical seller treats sales like a system. They follow cadences, update the CRM, track conversion rates, and run a consistent process regardless of how a given week feels. Their pipeline is structured because their behavior is structured.",
    best: "Forecasts accurately. Doesn't get caught flat-footed at quarter end.",
    limit: "Process becomes the goal. Misses the human moments that don't fit the template.",
  },
  {
    name: 'Resilient',
    tagline: "Keeps dialing through the no's.",
    dimensions: ['Mindset / Resilience', 'Prospecting Comfort'],
    definition: "The Resilient seller maintains activity through rejection. They don't take individual no's personally and they don't slow down after a bad week. They protect their outreach numbers even when their motivation drops.",
    best: 'Out-prospects more talented sellers through sheer consistency. Compounds over time.',
    limit: 'Activity without reflection. Volume that masks a lack of skill development.',
  },
  {
    name: 'Devoted',
    tagline: 'Earns loyalty by putting the customer first.',
    dimensions: ['Customer-Centric', 'Active Listening'],
    definition: "The Devoted seller orients every conversation around what the buyer actually needs, not what would close the deal. They remember the specifics buyers shared months ago, they recommend smaller engagements when bigger ones don't fit, and they say no when a deal isn't right.",
    best: 'Long-term accounts. Customers who refer because they trust the relationship.',
    limit: "Slow to close. Over-serving prospects who won't reciprocate.",
  },
  {
    name: 'Strategic',
    tagline: 'Sees the non-obvious path to the outcome.',
    dimensions: ['Data-Driven', 'Problem Solving'],
    definition: "The Strategic seller treats every deal as a puzzle with knowable inputs. They build the business case in dollars and hours, find the angle other reps miss, and synthesize complex information into a clear path forward. They earn authority by being the smartest person in the room about the buyer's situation.",
    best: 'Wins complex enterprise deals. Reframes problems so the decision becomes obvious.',
    limit: "Over-engineers what should be simple. Loses buyers who want a story, not a spreadsheet.",
  },
  {
    name: 'Authentic',
    tagline: 'Tells the truth even when it costs the deal.',
    dimensions: ['Authenticity', 'EQ / Trust'],
    definition: "The Authentic seller names limitations of their solution unprompted, flags fit concerns early, and refuses to oversell. They build trust by telling buyers what they don't want to hear, and they earn long-term customers because of it.",
    best: "Repeat buyers. Referrals from prospects who didn't buy.",
    limit: 'Disqualifies too easily. Talks themselves out of deals that would have worked.',
  },
  {
    name: 'Adaptive',
    tagline: 'Learns faster than the market moves.',
    dimensions: ['Self-Improvement', 'Mindset / Resilience'],
    definition: "The Adaptive seller takes ownership of their own growth. They review their own calls, read outside sales, ask peers for feedback, and adjust their approach based on what they learn. They get measurably better every quarter — not because anyone made them, but because they wanted to.",
    best: 'Climbs faster than peers. Stays current as buying behavior changes.',
    limit: "Constant adjustment without depth. Mastery of nothing because they're always testing.",
  },
]

const STYLES: AxisEntry[] = [
  {
    name: 'Hunter',
    tagline: 'Opens conversations other people avoid.',
    dimensions: ['Prospecting Comfort', 'Curiosity'],
    definition: 'The Hunter creates opportunity from nothing. They make the cold call, write the unsolicited email, send the LinkedIn message — and they enjoy it. They drive top-of-funnel activity that builds their own pipeline.',
    best: 'Never runs out of pipeline. Builds an audience even in down markets.',
    limit: "Strong opener, weaker closer. Conversations that don't convert.",
  },
  {
    name: 'Closer',
    tagline: 'Asks for the decision without flinching.',
    dimensions: ['Closing Confidence', 'Problem Solving'],
    definition: "The Closer drives toward commitment. They ask directly where a prospect stands, hold silence after the question, and push for a yes or no rather than accept ambiguity. They synthesize discovery into a clear ask that buyers can respond to.",
    best: "Higher close rates. Doesn't let deals drift.",
    limit: 'Pushing for close before the buyer is ready. Closing the wrong deals.',
  },
  {
    name: 'Architect',
    tagline: 'Builds systems that compound over time.',
    dimensions: ['Process-Oriented', 'Self-Improvement'],
    definition: "The Architect designs how they sell. They build templates, sequences, playbooks, and review rhythms — not because they were told to, but because they see how compounding small improvements wins over time.",
    best: 'Performance that scales. Outsells peers in year three through accumulated infrastructure.',
    limit: 'Spends more time building the system than using it. Process without practice.',
  },
  {
    name: 'Cultivator',
    tagline: 'Grows relationships that keep coming back.',
    dimensions: ['Prospecting Comfort', 'Active Listening'],
    definition: "The Cultivator builds wide networks of warm relationships. They remember birthdays, follow up without asking, and stay top of mind without pestering. Their best opportunities come from people they've known for years.",
    best: 'Pipeline that never runs cold. Referrals as a primary channel.',
    limit: 'Mistakes activity for progress. Lots of conversations, few deals.',
  },
  {
    name: 'Advisor',
    tagline: "Earns the right to recommend what's best.",
    dimensions: ['Customer-Centric', 'Problem Solving'],
    definition: "The Advisor positions themselves as a trusted expert. They build deep knowledge of their buyer's domain, propose solutions that may not include their product, and become the person buyers call before they call competitors.",
    best: "Sole-source deals. Buyers who don't shop their solution.",
    limit: 'Consults too much, sells too little. Becomes an unpaid advisor.',
  },
  {
    name: 'Challenger',
    tagline: 'Reframes the problem so the decision is clear.',
    dimensions: ['Data-Driven', 'Closing Confidence'],
    definition: "The Challenger teaches buyers something they didn't know about their own situation. They lead with insight, push back on flawed assumptions, and use data to make their case undeniable. They close hard because they've earned the right to.",
    best: 'Wins competitive deals. Disrupts incumbents.',
    limit: "Comes across as combative. Alienates buyers who wanted a conversation, not a lecture.",
  },
  {
    name: 'Connector',
    tagline: 'Builds relationships that outlast the deal.',
    dimensions: ['Authenticity', 'Customer-Centric'],
    definition: "The Connector wins by being someone buyers genuinely want to work with. They show up consistently, communicate honestly, and treat the relationship as the product. Their book of business grows through retention and word of mouth.",
    best: 'Long customer lifetimes. Buyers who follow them to their next company.',
    limit: 'Hard to scale. Too much depends on individual rapport.',
  },
  {
    name: 'Student',
    tagline: 'Gets measurably better every quarter.',
    dimensions: ['Self-Improvement', 'Mindset / Resilience'],
    definition: "The Student treats their career as a craft. They learn from every win, every loss, every call review. They don't plateau because they don't stop training. Their performance curve trends up over time, not up and down.",
    best: 'Long-term peak performance. Mentors the next generation.',
    limit: 'Improvement without urgency. Always learning, sometimes underperforming current quotas.',
  },
]

// ─── Sub-components ─────────────────────────────────────────────────────────

function AxisCard({ entry }: { entry: AxisEntry }) {
  return (
    <div className="bg-[#F2F0EB] rounded-lg p-6">
      <p className="font-display font-semibold text-xl text-[#0F0F0F] mb-1">{entry.name}</p>
      <p className="font-display italic text-base text-[#6B6B6B] mb-4">{entry.tagline}</p>

      <p className="font-sans text-[10px] uppercase tracking-[0.08em] text-[#6B6B6B] mb-2">Composed of</p>
      <div className="flex flex-wrap gap-1.5 mb-4">
        {entry.dimensions.map((dim) => (
          <span
            key={dim}
            className="bg-white text-[#6B6B6B] text-[11px] font-sans px-2.5 py-1 rounded-full"
          >
            {dim}
          </span>
        ))}
      </div>

      <p className="font-sans text-sm text-[#0F0F0F] leading-relaxed mb-4">{entry.definition}</p>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="font-sans text-[10px] uppercase tracking-[0.08em] text-[#722F37] mb-1">At its best</p>
          <p className="font-sans text-sm text-[#0F0F0F] leading-relaxed">{entry.best}</p>
        </div>
        <div>
          <p className="font-sans text-[10px] uppercase tracking-[0.08em] text-[#6B6B6B] mb-1">At its limit</p>
          <p className="font-sans text-sm text-[#0F0F0F] leading-relaxed">{entry.limit}</p>
        </div>
      </div>
    </div>
  )
}

function AxisSection({
  eyebrow,
  heading,
  intro,
  entries,
}: {
  eyebrow: string
  heading: string
  intro: string
  entries: AxisEntry[]
}) {
  return (
    <Section size="xl">
      <Container maxWidth="prose">
        <p className="font-sans text-[10px] uppercase tracking-[0.12em] text-[#722F37] font-semibold mb-3">
          {eyebrow}
        </p>
        <h2 className="font-display font-semibold text-3xl md:text-4xl text-[#0F0F0F] tracking-tight leading-[1.1] mb-4">
          {heading}
        </h2>
        <p className="font-sans text-base text-[#6B6B6B] leading-relaxed mb-tns-2xl">{intro}</p>

        <div className="flex flex-col gap-4">
          {entries.map((entry) => (
            <AxisCard key={entry.name} entry={entry} />
          ))}
        </div>
      </Container>
    </Section>
  )
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function MethodologyPage() {
  return (
    <main className="bg-[#FAFAF7] min-h-screen">

      {/* SECTION 1 — Hero */}
      <section className="pt-tns-3xl pb-tns-lg">
        <Container maxWidth="prose">
          <p className="font-sans text-[10px] uppercase tracking-[0.12em] text-[#722F37] font-semibold mb-4">
            THE NOBLE QUOTIENT
          </p>
          <h1 className="font-display font-semibold text-4xl md:text-5xl text-[#0F0F0F] tracking-tight leading-[1.05] mb-6">
            The Methodology
          </h1>
          <p className="font-sans text-base md:text-lg text-[#6B6B6B] leading-relaxed max-w-[600px]">
            The Noble Quotient measures selling behavior across two axes — how you think, and how you act on it. Your archetype is the intersection of both.
          </p>
        </Container>
        <div className="border-b border-[#E8E6DF] mt-tns-2xl" />
      </section>

      {/* SECTION 2 — How it works */}
      <section className="pt-tns-lg pb-tns-xl">
        <Container maxWidth="prose">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                number: '12',
                label: 'Dimensions',
                description: 'Behavioral traits measured through 25 forced-choice questions. Each dimension captures a specific selling behavior.',
              },
              {
                number: '2',
                label: 'Axes',
                description: 'Dimensions group into a Trait axis (how you process) and a Style axis (how you act). Each axis ranks 8 types.',
              },
              {
                number: '64',
                label: 'Archetypes',
                description: 'Your primary archetype is the intersection of your top trait and top style. No two profiles are identical.',
              },
            ].map(({ number, label, description }) => (
              <div key={label}>
                <p className="font-display font-semibold text-4xl text-[#722F37] leading-none mb-1">
                  {number}
                </p>
                <p className="font-sans text-sm font-medium text-[#0F0F0F] mb-2">{label}</p>
                <p className="font-sans text-sm text-[#6B6B6B] leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Divider */}
      <div className="border-t border-[#E8E6DF]" />

      {/* SECTION 3 — The 8 Traits */}
      <AxisSection
        eyebrow="TRAIT AXIS"
        heading="How You Think"
        intro="Your trait is your internal operating system — how you read situations, process information, and approach problems."
        entries={TRAITS}
      />

      {/* Divider */}
      <div className="border-t border-[#E8E6DF]" />

      {/* SECTION 4 — The 8 Styles */}
      <AxisSection
        eyebrow="STYLE AXIS"
        heading="How You Act"
        intro="Your style is your external behavior pattern — how you generate pipeline, run conversations, and move deals forward."
        entries={STYLES}
      />

      {/* Divider */}
      <div className="border-t border-[#E8E6DF]" />

      {/* SECTION 5 — CTA */}
      <Section size="xl">
        <Container maxWidth="prose">
          <div className="text-center">
            <h2 className="font-display font-semibold text-3xl md:text-4xl text-[#0F0F0F] tracking-tight leading-[1.1] mb-4">
              Find out where you land.
            </h2>
            <p className="font-sans text-base text-[#6B6B6B] leading-relaxed mb-8">
              The Noble Quotient is a free 25-question assessment. Full results shown immediately.
            </p>
            <LinkButton href="/quotient" variant="primary">
              Take the Free Assessment →
            </LinkButton>
          </div>
        </Container>
      </Section>

    </main>
  )
}
