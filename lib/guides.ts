export interface Guide {
  slug: string
  title: string
  metaDescription: string
  intro: string[]
  sections: { heading: string; paragraphs: string[] }[]
  bridgeHeading: string
  bridgeParagraphs: string[]
  relatedArchetypeSlug: string
  relatedArchetypeName: string
  ctaHeadline: string
  ctaBody: string
  ctaButton: string
}

export const guides: Guide[] = [
  {
    slug: 'trusted-advisor',
    title: 'The trusted advisor in sales: what it actually takes',
    metaDescription:
      'The most worn-out phrase in sales, explained as behavior. What a trusted advisor actually does, the two traits underneath it, and how to measure where you stand.',
    intro: [
      '"Trusted advisor" might be the most worn-out phrase in sales. Every rep wants to be one. Every training deck promises to make you one. Most of the advice on how to get there is the same recycled list: add value, listen more, stop pitching.',
      'None of it is wrong. All of it is useless, because it describes the destination and skips the wiring.',
      "A trusted advisor isn't a seller who memorized a better script. It's a seller whose default behavior earns the kind of trust that makes a buyer stop shopping. That behavior is specific, it's observable, and most people who chase the title never build it.",
    ],
    sections: [
      {
        heading: 'What a trusted advisor actually does',
        paragraphs: [
          'Forget the feel-good advice and watch the behavior. A trusted advisor does a few things consistently that ordinary sellers do only when it\'s convenient.',
          "They tell the buyer things the buyer doesn't want to hear. When the timing is wrong, they say so. When a competitor is the better fit, they admit it. The trust comes from the moments they had something to gain by shading the truth and didn't.",
          "They put the buyer's outcome ahead of the open deal. Not as a slogan, as a pattern the buyer can see across months. The advisor who talks a customer out of the bigger package this quarter is the one that customer calls first next quarter.",
          'They stay curious past the point most sellers quit. The average rep asks enough questions to qualify. The advisor asks enough to actually understand, then keeps a working map of the buyer\'s world in their head.',
          "None of that takes charisma. It takes a disposition: authenticity that won't let you fake it, and a customer focus that survives a bad month.",
        ],
      },
      {
        heading: 'The two things underneath it',
        paragraphs: [
          "In our framework, trusted-advisor behavior isn't a personality type. It's the meeting point of two measurable dimensions.",
          'Authenticity is the refusal to perform. The advisor says the true thing even when the polished thing would sell better. Buyers have a finely tuned detector for sellers who are managing them, and authenticity is what keeps that detector quiet.',
          "Customer-centricity is whose problem you're actually solving. The advisor optimizes for the buyer's result and trusts that the commission follows. Reverse the order and the buyer feels it inside one call.",
          'Score high on both and the trusted-advisor pattern shows up on its own, without anyone coaching you into it. Score high on one and low on the other and you get a familiar failure mode: the blunt seller nobody trusts to care, or the warm seller nobody trusts to be straight.',
        ],
      },
      {
        heading: 'Why most sellers who want it never get it',
        paragraphs: [
          'The gap is rarely effort. It\'s self-image.',
          'Most sellers believe they already are trusted advisors. They listen, they care, they\'d never mislead a buyer. Ask their buyers and a different picture shows up. The seller remembers every time they were straight. The buyer remembers the one deal that got oversold and the months that followed.',
          "Trust is scored by the other person, on their evidence, not yours. That's the part the listicles leave out, because it isn't flattering. You don't decide you're a trusted advisor. You behave in a way that lets a buyer decide it for you, again and again, until it holds.",
        ],
      },
    ],
    bridgeHeading: 'Where you actually stand',
    bridgeParagraphs: [
      'Whether this is your natural wiring or a skill you\'re still reaching for is a measurable thing, not a feeling. The seller whose authenticity and customer focus both run high earns the archetype we call the Devoted Advisor: trusted by default, not by effort.',
      'The Noble Quotient measures both dimensions and shows you where you actually stand, not where you\'d like to.',
    ],
    relatedArchetypeSlug: 'devoted-advisor',
    relatedArchetypeName: 'Devoted Advisor',
    ctaHeadline: 'See where you actually stand',
    ctaBody: '25 questions. 12 behavioral dimensions. Your natural selling identity, measured.',
    ctaButton: 'Take the free assessment',
  },
]

export function getGuide(slug: string): Guide | undefined {
  return guides.find((g) => g.slug === slug)
}

export function getAllGuideSlugs(): { slug: string }[] {
  return guides.map((g) => ({ slug: g.slug }))
}
