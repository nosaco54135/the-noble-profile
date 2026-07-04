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
  relatedGuides?: { slug: string; name: string }[]
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
  {
    slug: 'hunter-vs-farmer',
    title: 'Hunter vs farmer in sales: which one are you?',
    metaDescription:
      "Hunter or farmer? The old sales binary is too crude to be useful. What each one really does, why most reps are a blend, and how to measure your true mix.",
    intro: [
      "Every sales org sorts reps into two piles. Hunters go get new logos. Farmers grow the accounts you already have. The labels show up in the job description, the comp plan, and the story a rep tells after a bad quarter.",
      "The split is useful shorthand for a hiring manager. It's a bad map for an actual career, because almost nobody is purely one or the other, and the reps who force themselves to be usually cap their own ceiling.",
      "The two labels are worth taking apart. Each one describes real behavior. The question that pairs them, 'which am I,' is where people go wrong.",
    ],
    sections: [
      {
        heading: 'What a hunter actually does',
        paragraphs: [
          "Strip the mythology and a hunter is a seller who is comfortable starting from nothing. An empty pipeline doesn't rattle them the way it rattles most people. They'll work a cold list, send the note that probably gets ignored, and do it again tomorrow without needing a win to refuel.",
          "The engine underneath it is tolerance for rejection. Hunting is mostly a rejection-management job. The seller who can hear no forty times and dial forty-one has an edge that has nothing to do with charm and everything to do with not taking the silence personally.",
          "The failure mode is the hunter who can open but not hold. They love the chase, land the logo, then lose interest the moment the deal turns into a relationship. Great in quarter one, expensive by quarter three when the churn shows up.",
        ],
      },
      {
        heading: 'What a farmer actually does',
        paragraphs: [
          "A farmer is a seller who compounds. Give them an account and they'll learn the org chart, the renewal date, the quiet frustration nobody has escalated yet, and the second team that could use the product before anyone asks. Their number grows because the relationship grows.",
          "The wiring underneath it is patience and a real interest in the customer's outcome. A farmer plays a longer game than the comp plan rewards in any single month, and trusts that depth pays out over a year. Buyers can feel the difference between a rep who is steering them toward a renewal and one who wants the thing to work.",
          "The failure mode is the farmer who never plants. Comfortable in the accounts they know, allergic to the cold start, slowly starving the pipeline of anything new. Safe, right up until the biggest account leaves and there is nothing behind it.",
        ],
      },
      {
        heading: "Why 'which one am I' is the wrong question",
        paragraphs: [
          "The binary breaks down as soon as you look at what drives it. Hunting and farming describe behaviors, not people, and the traits behind them are separate dials, not a single slider with your name fixed at one end.",
          "Prospecting comfort is one dial. The patience to grow an account over a year is a completely different one, and they do not trade off against each other. You can run hot on cold outreach and still be the rep who never lets a logo slip. Plenty of the strongest sellers are exactly that, which is the thing the two-bucket model cannot see.",
          "So the honest answer to 'am I a hunter or a farmer' is usually 'both, in a specific mix the label cannot capture.' That mix is the useful thing to know, because it tells you which roles will fit you and which will quietly grind you down.",
        ],
      },
    ],
    bridgeHeading: "Which way you're wired",
    bridgeParagraphs: [
      "Whether you lean hunter, lean farmer, or run high on both is a measurable thing, not a hunch. The Noble Quotient scores the dimensions underneath the binary, from prospecting comfort to how you carry a long relationship, and shows you the mix instead of forcing you into a bucket.",
      "The seller who runs high on prospecting comfort and stays steady through rejection tends to land on the archetype we call the Resilient Hunter. It is one of 64, and the point of measuring is to find yours, not to hand you another label to argue with.",
    ],
    relatedArchetypeSlug: 'resilient-hunter',
    relatedArchetypeName: 'Resilient Hunter',
    relatedGuides: [{ slug: 'consultative-selling', name: 'Consultative selling' }],
    ctaHeadline: 'Stop guessing from a two-word label',
    ctaBody: '25 questions. 12 behavioral dimensions. The mix under the label, measured in about five minutes.',
    ctaButton: 'Take the free assessment',
  },
  {
    slug: 'consultative-selling',
    title: 'What consultative selling actually is (and why most training misses it)',
    metaDescription:
      "Consultative selling explained as behavior, not technique. What it looks like in a real deal, why most training doesn't stick, and the two traits underneath it.",
    intro: [
      "Consultative selling is the approach where a rep behaves less like someone pitching a product and more like someone helping a buyer think through a problem. You ask about the situation before you recommend anything, and the recommendation is shaped by what you heard. Almost every sales methodology of the last thirty years is a version of this idea.",
      "The idea is sound, and hardly anyone argues with it. The trouble starts when it gets taught as a procedure. Run discovery, ask open questions, uncover the pain, present against it. Follow the steps and what you get is a rep performing consultation, which a buyer can feel by the second question.",
      "The strongest consultative sellers aren't working through a procedure at all. They behave this way by default, in every conversation, and that default is the exact thing the training keeps trying and failing to install.",
    ],
    sections: [
      {
        heading: 'What is consultative selling, exactly?',
        paragraphs: [
          "The quickest way to see it is against the thing it replaced. Transactional selling leads with the product and moves toward the price. Consultative selling leads with the buyer's situation and treats the product as one possible answer to a problem you've both taken the time to understand.",
          "In practice, the early conversations are mostly the buyer talking. The rep is diagnosing rather than presenting. By the time a recommendation arrives, it's specific to this buyer, and it lands with more weight because it was earned through understanding instead of read off a slide.",
          "Buyers give their attention to the seller who seems to grasp their problem better than they've managed to explain it themselves. That response is the entire mechanism, and everything else in the method exists to produce it.",
        ],
      },
      {
        heading: 'What consultative selling looks like in a real deal',
        paragraphs: [
          "Watch a consultative seller in a discovery call and the first thing you notice is restraint. They don't hurry to tie every answer back to the product. They ask something, take in the whole answer, and follow up on what the answer actually raised instead of the next line in their head.",
          "They're also willing to say the deal might not fit. When a prospect's problem is smaller than the solution, they name it, even when it costs them the quarter. Buyers read that as confidence, and it earns a kind of credibility that pushing for the close never does.",
          "And they carry a working model of the buyer's world that updates every call. When the recommendation finally comes, it references something the buyer mentioned three conversations ago. That memory is what makes the advice feel built for the buyer rather than pulled off a shelf.",
        ],
      },
      {
        heading: 'Why consultative selling training usually fails',
        paragraphs: [
          "Companies spend real money teaching this, and the effect mostly fades. Reps come out of the workshop, run the new questions for a week or two, then slide back to pitching once the quota pressure returns. The training wasn't wrong. It was aimed at the behavior, when the thing driving the behavior sits a layer underneath.",
          "Consultation grows out of two dispositions. The first is genuine curiosity, the pull to keep understanding a situation past the point where you already have enough to pitch. The second is customer focus, caring about the buyer's outcome enough to sometimes act against your own short-term number. A rep with both does consultative selling without ever needing the framework. A rep with neither can only perform it, and not for long.",
          "That's why the technique is everywhere and still uncommon. The discovery questions are public, and anyone can copy the framework. What doesn't copy is the disposition underneath, the part that makes a buyer trust the questions are sincere rather than staged.",
        ],
      },
    ],
    bridgeHeading: "Whether it's already how you sell",
    bridgeParagraphs: [
      "Whether consultative selling is your natural wiring or a mode you're still reaching for is a measurable thing, not a matter of self-image. The two dimensions underneath it, curiosity and customer focus, are exactly what the Noble Quotient scores.",
      "When both run high, the pattern shows up without anyone coaching it, and the seller tends to land on the archetype we call the Devoted Advisor.",
    ],
    relatedArchetypeSlug: 'devoted-advisor',
    relatedArchetypeName: 'Devoted Advisor',
    relatedGuides: [{ slug: 'trusted-advisor', name: 'The trusted advisor' }],
    ctaHeadline: "See if it's already how you sell",
    ctaBody: 'Twenty-five questions. Twelve behavioral dimensions. The two traits under consultative selling, measured in about five minutes.',
    ctaButton: 'Take the free assessment',
  },
]

export function getGuide(slug: string): Guide | undefined {
  return guides.find((g) => g.slug === slug)
}

export function getAllGuideSlugs(): { slug: string }[] {
  return guides.map((g) => ({ slug: g.slug }))
}
