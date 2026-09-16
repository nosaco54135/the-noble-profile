export interface Archetype {
  slug: string
  name: string
  trait: string
  style: string
  tagline: string
  metaDescription: string
  intro: string[]
  strengths: string[]
  blindSpots: string[]
  inTheDeal: string
  sellsBestTo: string
  growthEdge: string
  /** The internal friction specific to this trait/style pairing. */
  tension?: string
  /** The archetype readers commonly self-select instead, with the distinguishing tell. */
  mistakenFor?: { slug: string; name: string; tell: string }
  adjacent: string[]
}

export const archetypes: Archetype[] = [
  {
    slug: 'empathic-closer',
    name: 'Empathic Closer',
    trait: 'Empathic',
    style: 'Closer',
    tagline: 'You read the room before you read the script.',
    metaDescription:
      'The Empathic Closer reads emotion in real time and uses it to close deals. Strengths, blind spots, and how this selling style wins. Take the free assessment.',
    intro: [
      "The Empathic Closer feels the deal before the data confirms it. You pick up the pause before the objection, the hesitation behind the yes, the thing the buyer is not saying out loud. And unlike most people who feel all that, you act on it.",
      "Empathy without a close is just therapy. What separates you is that you take everything you sense and point it at a decision. You are not waiting for the buyer to be ready. You are reading whether they are ready and moving them when they are.",
    ],
    strengths: [
      'You build trust fast because people can tell you actually hear them.',
      'You time your asks. You close when the buyer is ready, not when your sequence says to.',
      'You handle emotional objections that flatten other sellers, because you address the feeling, not just the words.',
      'You keep deals alive through tension that would make a transactional seller fold.',
    ],
    blindSpots: [
      'You can over-read hesitation and back off a buyer who actually wanted you to push.',
      "You carry the buyer's emotions home with you, which burns you out faster than it should.",
      'You can mistake rapport for progress. A buyer who likes you is not the same as a buyer who will sign.',
      'You may lean on the room and under-use the numbers that would back you up.',
    ],
    inTheDeal:
      "In a live deal, the Empathic Closer notices the CFO go quiet on the pricing slide and circles back before it becomes a silent no. You don't bulldoze. You name the tension and let the buyer feel understood, then you ask for the decision while the trust is still warm. Your risk is the deal that feels good but never closes, the relationship that stays a relationship. Your edge is knowing the difference and pushing anyway.",
    sellsBestTo:
      'Risk-averse, relationship-driven buyers, or anyone burned by a previous vendor. People who need to feel safe before they commit. You struggle more with purely transactional, spreadsheet-driven buyers who read warmth as a stall.',
    growthEdge:
      'Trust the close as much as you trust the connection. Your instinct to read the room is already elite. The instinct to act on it is the one to drill. When you sense readiness, ask. The empathy already earned you the right.',
    tension:
      "Empathy and closing want opposite things from the same moment. Empathy says wait, the buyer needs another beat. Closing says ask, the window is open right now. Both instincts fire at once. Which one wins is usually decided by how tired you are rather than by what the deal actually needs.",
    mistakenFor: {
      slug: 'empathic-advisor',
      name: 'Empathic Advisor',
      tell: "Both read people well and both earn real trust. The Advisor holds it and waits to be asked. You use it to ask. If you leave most meetings having recommended something rather than requested a decision, the Advisor is probably the better fit.",
    },
    adjacent: ['devoted-advisor', 'authentic-connector', 'curious-cultivator'],
  },
  {
    slug: 'devoted-advisor',
    name: 'Devoted Advisor',
    trait: 'Devoted',
    style: 'Advisor',
    tagline: 'The buyer stops shopping because they trust you to tell them the truth.',
    metaDescription:
      'The Devoted Advisor earns trust by putting the buyer\'s outcome first, consistently. Strengths, blind spots, and how this selling style wins. Take the free assessment.',
    intro: [
      "The Devoted Advisor is the seller a buyer keeps calling long after the deal closes. Not because of charm, and not because of a follow-up cadence. Because somewhere along the way the buyer decided this person tells them the truth and puts their outcome first, and that decision is hard to reverse.",
      "Most sellers want to be trusted. The Devoted Advisor is trusted because the behavior came first and the reputation followed. They optimize for the buyer's result and let the commission catch up. Over months, that pattern compounds into the kind of loyalty no discount can buy.",
    ],
    strengths: [
      'You earn repeat business and referrals without asking, because buyers route their network to people they trust.',
      'You say the hard true thing when a shadier seller would stay quiet, and the buyer remembers it.',
      'You hold a relationship through a bad quarter, a botched implementation, or a price increase that would end a transactional seller\'s account.',
      'You read what a buyer actually needs, not just what they asked to buy, and you steer them right even when it costs you the bigger order.',
    ],
    blindSpots: [
      'You can over-serve a buyer who was never going to grow into a real account, spending devotion where it won\'t return.',
      'You can be slow to ask for the close because pushing feels at odds with the trust you\'ve built.',
      'You may avoid the aggressive expansion play even when the buyer would genuinely benefit from it.',
      'Your loyalty can keep you in an account long after the smart move is to walk and reallocate the time.',
    ],
    inTheDeal:
      "In a live deal, the Devoted Advisor is the one who tells a buyer the cheaper package is the right fit this year, then watches that honesty turn into a three-year relationship and a stack of referrals. The risk is the mirror image: you under-ask, you under-expand, and you pour devotion into accounts that will never pay it back. Your edge is that buyers trust you by default. Your work is making sure that trust serves the deal, not just the relationship.",
    sellsBestTo:
      "High-consideration, long-cycle buyers who are choosing a partner, not a product. Anyone burned by a vendor who oversold them. People whose decision rides on whether they believe you. You struggle more with fast, transactional buyers who just want a price and read your care as friction.",
    growthEdge:
      'Let yourself close as hard as you serve. The trust is already built, which means you have earned the right to ask plainly and to push for the bigger outcome when it is genuinely right for the buyer. Devotion without the ask leaves deals, and buyer outcomes, on the table.',
    tension:
      "Devotion and advising both reward staying. Neither one has an expiration date built in. A seller wired to hunt gets restless when an account stops moving, and that restlessness is a useful signal even though it feels like impatience. You never feel it. So the account that stopped growing two quarters ago still gets your Thursday afternoons, and the thing that finally ends it is a territory change, not a decision.",
    mistakenFor: {
      slug: 'devoted-connector',
      name: 'Devoted Connector',
      tell: "Both stay close to buyers and both get told the real story. Yours turns into recommendations the buyer acts on. The Connector's stays a relationship, good on its own terms. If your buyers call you when something breaks but rarely when they're deciding, the Connector is closer to how you actually operate.",
    },
    adjacent: ['empathic-closer', 'authentic-connector', 'curious-cultivator'],
  },
  {
    slug: 'strategic-challenger',
    name: 'Strategic Challenger',
    trait: 'Strategic',
    style: 'Challenger',
    tagline: "You don't match the buyer's thinking. You change it.",
    metaDescription:
      "The Strategic Challenger reframes the buyer's problem and teaches them something new to win the deal. Strengths, blind spots, and how this selling style wins. Take the free assessment.",
    intro: [
      "The Strategic Challenger walks into a deal believing the buyer is wrong about something, and they're usually right. Not wrong about wanting a solution, wrong about which problem to solve first. Where most sellers ask what the buyer needs and then sell it back to them, the Challenger reframes the need itself, then shows a path the buyer hadn't considered.",
      "This only works because the reframe is earned, not performed. The Challenger does the homework, builds the case, and brings a point of view sharp enough that the buyer leans in instead of pushing back. Done well, it's the most valuable thing a seller can be: the person who changed how the buyer sees their own business.",
    ],
    strengths: [
      "You reframe the buyer's problem so your solution becomes the obvious answer, not one option among many.",
      'You earn respect from senior, skeptical buyers who are bored of sellers who just agree with them.',
      "You create urgency by exposing a cost the buyer wasn't accounting for.",
      "You differentiate on insight, so you're not competing on price or feature lists.",
    ],
    blindSpots: [
      "You can push a reframe the buyer isn't ready for and read as arrogant instead of insightful.",
      "You can fall in love with your own thesis and stop listening for the signal that you've got this buyer wrong.",
      'You can challenge where you should reassure, rattling a buyer who needed confidence, not a lesson.',
      'Your insight is only as good as your prep, and a thin reframe lands worse than no reframe at all.',
    ],
    inTheDeal:
      "In a live deal, the Strategic Challenger tells the VP that the initiative they're proud of is aimed at the wrong bottleneck, then shows the data that proves it. When the prep is real, the room goes quiet and the buyer starts taking notes. The risk is the reframe that's clever but wrong, or right but delivered to someone who hears it as an insult. Your edge is conviction backed by work. Your discipline is knowing the difference between a buyer who needs to be challenged and one who needs to be heard.",
    sellsBestTo:
      "Senior, experienced buyers who respect a strong point of view and are tired of being sold to. Complex deals where the real problem is buried and reframing it is the actual value. You struggle more with buyers who already know exactly what they want and read a challenge as friction.",
    growthEdge:
      'Earn the right before you reframe. Your insight is real, but it only lands once the buyer trusts that you understand their world. Lead with enough listening that the challenge feels like it came from inside their business, not from your slide deck. The reframe is your weapon. Timing is what keeps it from backfiring.',
    tension:
      "Strategic sees the non-obvious answer. Challenger says it out loud. Neither half checks whether the room is ready for it. A seller with a softer style would stall on the delivery long enough to check, and that stall does real work even though it feels like cowardice. You skip it. The reframe arrives fully formed and correct, and you find out whether the buyer could take it only after it's already on the table.",
    mistakenFor: {
      slug: 'strategic-architect',
      name: 'Strategic Architect',
      tell: "Both work from a thesis about the buyer's business. You put yours in front of the buyer and let it land. The Architect builds a path around it and never says it out loud. If you tend to route past a bad assumption rather than name it, the Architect is likely the better read.",
    },
    adjacent: ['resilient-hunter', 'methodical-architect', 'adaptive-student'],
  },
  {
    slug: 'resilient-hunter',
    name: 'Resilient Hunter',
    trait: 'Resilient',
    style: 'Hunter',
    tagline: 'You get told no more than anyone. It moves you less than anyone.',
    metaDescription:
      'The Resilient Hunter runs high-volume outreach and recovers from rejection fast. Strengths, blind spots, and how this selling style wins. Take the free assessment.',
    intro: [
      "The Resilient Hunter lives at the top of the funnel, where the rejection is. Where most sellers ration their outreach to protect their ego, the Hunter runs the numbers and works the volume, because they've made peace with the math: more attempts, more nos, more yeses. The no doesn't sting the way it should, and that's the whole edge.",
      "This isn't recklessness, it's stamina. The Hunter knows that pipeline is a function of activity and that the seller still dialing in the last hour of the day is the one who hits the number. They don't wait for warm leads. They make them.",
    ],
    strengths: [
      "You generate pipeline on demand, because you'll do the volume of outreach most sellers avoid.",
      'You recover from rejection fast enough that a bad morning doesn\'t cost you the afternoon.',
      'You thrive in the early, cold, unglamorous part of the deal where others stall.',
      'You bring relentless energy that fills a top-of-funnel other people let run dry.',
    ],
    blindSpots: [
      'You can mistake activity for progress, running volume when the smarter move is to slow down and qualify.',
      'You can burn good leads with a one-size pitch because the next dial is always calling.',
      "You can wear out your own engine, treating pace as the only lever until you're running on fumes.",
      'You can under-invest in the late-stage nuance that actually closes the deals your activity created.',
    ],
    inTheDeal:
      "In a live deal, the Resilient Hunter has three new conversations going before lunch while everyone else is still rewriting one email. The pipeline is always full because the activity never stops. The risk is the deal that needed a slower, more tailored touch and got a template instead, or the burnout that comes from treating every week like a sprint. Your edge is volume nobody can match. Your discipline is knowing which deals to slow down for.",
    sellsBestTo:
      "Transactional and mid-market buyers where speed and responsiveness win, and high-velocity sales motions that reward activity. You struggle more with complex, multi-stakeholder enterprise deals that punish a fast pitch and demand patience you'd rather spend dialing.",
    growthEdge:
      "Aim the engine, don't just run it. Your output is already your superpower, which means the leverage isn't more activity, it's better-targeted activity. Pick the deals worth slowing down for and give them the tailored touch your volume habit skips. Same energy, pointed at the right accounts, closes far more than the same energy sprayed wide.",
    tension:
      "Resilient absorbs the no. Hunter goes back out. Together they produce a seller who can run indefinitely, which means nothing ever tells you the approach is wrong. A rep who feels the rejection has to ask why it happened, and that question is worth something even though it comes wrapped in a bad week. You don't get the bad week. The same approach can fail forty times and still feel like a volume problem.",
    mistakenFor: {
      slug: 'resilient-closer',
      name: 'Resilient Closer',
      tell: "Both keep going when the deal gets uncomfortable. You spend it on new conversations. The Closer spends it inside one, staying in a hard room until the answer comes. If your durability shows up most in the late-stage grind rather than the top of funnel, look at the Closer.",
    },
    adjacent: ['strategic-challenger', 'adaptive-student', 'empathic-closer'],
  },
  {
    slug: 'methodical-architect',
    name: 'Methodical Architect',
    trait: 'Methodical',
    style: 'Architect',
    tagline: 'Other people work the deal. You build the machine that closes it.',
    metaDescription:
      'The Methodical Architect wins complex deals by mapping every stakeholder and sequencing the process. Strengths, blind spots, and how this selling style wins. Take the free assessment.',
    intro: [
      "The Methodical Architect treats a complex sale like a system to be designed, not a conversation to be improvised. While other sellers wing the multi-stakeholder deal and hope it holds together, the Architect maps it: who decides, who blocks, what each one needs, and in what order it has to happen. The plan is the product.",
      "This is the seller who never loses a deal to chaos. Every step is sequenced, every stakeholder accounted for, every next action defined before the call ends. It's not flashy, and it doesn't need to be. In long, complicated deals with a dozen moving parts, the seller with the clearest map wins, and the Architect always has the clearest map.",
    ],
    strengths: [
      'You navigate complex, multi-stakeholder deals that overwhelm sellers who work on instinct.',
      'You never drop a thread, because your process catches what improvisation misses.',
      "You build buyer confidence through sheer organization; the proposal and the plan signal you'll be just as reliable after the contract.",
      'You forecast accurately because you actually know where every deal stands.',
    ],
    blindSpots: [
      'You can over-engineer a simple deal that just needed a phone call and a close.',
      'You can rely on the process when the moment called for reading the room and adapting.',
      'You can mistake a tidy pipeline for a winning one, polishing the system instead of pushing the deal.',
      "You can struggle when a buyer breaks your sequence and the deal demands improvisation you'd rather avoid.",
    ],
    inTheDeal:
      "In a live deal, the Methodical Architect is the one with the mutual action plan the buyer's own team starts relying on to stay organized. Nothing slips, nothing surprises them, and the buyer trusts the process because they can see it working. The risk is the deal that didn't need all that machinery, or the curveball that no plan accounted for and you were slow to adapt to. Your edge is control in complexity. Your growth is flexibility when the plan meets a buyer who won't follow it.",
    sellsBestTo:
      'Enterprise and complex B2B buyers with multiple stakeholders and long cycles, and any deal where organization and reliability are the deciding factors. You struggle more with fast, simple, transactional sales where your process is friction the buyer didn\'t ask for.',
    growthEdge:
      "Hold the plan loosely. Your system is a genuine advantage in complex deals, but the best architects know when to set the blueprint down and just talk to the human in front of them. Build the machine, then stay willing to step outside it when a deal does something your process didn't predict. Structure wins complexity. Adaptability wins the exceptions.",
    tension:
      "Methodical and Architect pull the same direction, which is the problem. Both instincts reward adding another piece. A seller whose wiring argues with itself gets an internal interruption. You don't get one. The system keeps improving. The deal keeps not closing. Nothing in your instincts flags the gap. The interruption has to arrive from outside, usually a calendar date or a manager.",
    mistakenFor: {
      slug: 'strategic-architect',
      name: 'Strategic Architect',
      tell: "Both build structure. Yours is meant to run again, a process that works on this deal and the next one. The Strategic Architect's is built for one org and wouldn't transfer anywhere. If your best system is one you'd hand to a new rep, you're in the right place.",
    },
    adjacent: ['strategic-challenger', 'curious-cultivator', 'adaptive-student'],
  },
  {
    slug: 'curious-cultivator',
    name: 'Curious Cultivator',
    trait: 'Curious',
    style: 'Cultivator',
    tagline: 'You ask the questions that turn a small deal into a big account.',
    metaDescription:
      'The Curious Cultivator wins through deep discovery and patient account growth. Strengths, blind spots, and how this selling style wins. Take the free assessment.',
    intro: [
      "The Curious Cultivator wins the way a good gardener does, not by forcing anything but by understanding the soil. Where most sellers qualify just enough to pitch, the Cultivator keeps asking, genuinely interested in how the buyer's business actually works, and that curiosity surfaces needs the buyer didn't know they could name. The first deal is rarely the big one. It's the opening.",
      "This is the seller who turns a foothold into a footprint. They land a small account, learn it deeply, and expand because they understood the buyer's world well enough to see the next problem before the buyer did. Patience and real questions, not pressure. Over time the accounts they tend quietly become the biggest ones on the board.",
    ],
    strengths: [
      "You uncover needs other sellers miss, because you keep asking after they've stopped.",
      'You grow accounts, turning a first small deal into a relationship that compounds.',
      "You build deep knowledge of the buyer's business, so your recommendations land as insight, not pitch.",
      "You earn the access that comes from genuine interest; buyers tell you things they don't tell vendors.",
    ],
    blindSpots: [
      'You can explore so long you never move to the close.',
      "You can pour curiosity into an account that was never going to grow, mistaking interest for opportunity.",
      "You can undervalue the fast, simple deal because it doesn't feed your appetite to understand.",
      'You can let discovery become the comfort zone, hiding from the ask inside another good question.',
    ],
    inTheDeal:
      "In a live deal, the Curious Cultivator asks the question that makes the buyer pause and say nobody's ever asked them that. The discovery runs so deep the buyer treats them like an advisor before buying anything. The risk is the deal that dies in discovery, endlessly explored and never closed, or the patient account that never actually grows. Your edge is understanding the buyer better than the competition ever will. Your discipline is turning that understanding into a decision.",
    sellsBestTo:
      "Complex accounts with room to grow, and buyers who reward a seller who truly understands their business. Land-and-expand motions where the first deal is a beachhead, not the goal. You struggle more with one-and-done transactional buyers who want a fast quote and read your questions as a delay.",
    growthEdge:
      "Let the questions lead somewhere. Your curiosity uncovers what other sellers walk right past, but discovery is the setup, not the win. Once you understand the buyer's world, use what you found to make the case and ask for the decision. The best cultivators harvest. They don't just tend.",
    tension:
      "Curiosity wants the next question. Cultivating wants more time in the account. Both are satisfied by continuing, so you never hit the moment where the conversation feels finished. A seller who gets bored would leave the conversation there. You find another thread. The buyer eventually decides, or doesn't, and either way the decision comes from them rather than from you.",
    mistakenFor: {
      slug: 'curious-advisor',
      name: 'Curious Advisor',
      tell: "Both go deeper than the competition. At the end of discovery you keep learning. The Advisor stops and tells the buyer what to do about it. If people usually leave your calls with a recommendation, the Advisor is probably where you sit.",
    },
    adjacent: ['devoted-advisor', 'authentic-connector', 'methodical-architect'],
  },
  {
    slug: 'authentic-connector',
    name: 'Authentic Connector',
    trait: 'Authentic',
    style: 'Connector',
    tagline: "You're the same person on the call as off it, and buyers can feel the difference.",
    metaDescription:
      'The Authentic Connector wins through genuine connection and a network that trusts them. Strengths, blind spots, and how this selling style wins. Take the free assessment.',
    intro: [
      "The Authentic Connector never learned to wear the sales mask, and that turned out to be the whole advantage. Where most sellers perform a polished version of themselves, the Connector shows up as who they are, says what they actually think, and builds relationships that feel like relationships instead of transactions. Buyers have a radar for performance. With this seller, it stays quiet.",
      "This is the seller whose network does half the work. People remember them, refer them, and pick up the phone, not because of a clever follow-up cadence but because the connection was real. They build trust at human speed, one genuine conversation at a time, and the pipeline that comes from it is sturdier than anything a script could produce.",
    ],
    strengths: [
      "You build genuine rapport fast, because you're not performing and buyers can feel it.",
      'You generate referrals and repeat business from a network that actually likes you.',
      'You disarm guarded buyers by being real where they expected a pitch.',
      "You sustain relationships naturally, staying in people's corner long after the deal.",
    ],
    blindSpots: [
      'You can lean on rapport and under-build the business case a buyer needs to justify the purchase.',
      "You can avoid the hard ask because it feels at odds with the friendship you've built.",
      "You can mistake being liked for being trusted to deliver; warmth isn't a signed contract.",
      'You can spread yourself thin maintaining relationships that feel good but never convert.',
    ],
    inTheDeal:
      "In a live deal, the Authentic Connector is the one the buyer actually wants to grab coffee with, the seller who got the real story because they gave one first. Walls come down because nothing about them feels like a tactic. The risk is the warm relationship that never becomes a deal, the buyer who likes you enough to take your call but not enough to choose you, because you never made the case past the rapport. Your edge is trust that's real. Your discipline is converting it.",
    sellsBestTo:
      "Relationship-driven buyers and long-term partnerships where who you are matters as much as what you sell. Markets that run on referrals and reputation. You struggle more with purely rational, procurement-led buyers who don't care whether they like you and just want the lowest number on a spreadsheet.",
    growthEdge:
      "Turn the connection into a commitment. Your authenticity earns you something most sellers never get, a buyer who genuinely trusts you. Don't stop at the friendship. The same realness that built the relationship lets you ask plainly for the business; a real friend can be direct. Make the case, then make the ask. The trust is already yours.",
    tension:
      "Authenticity refuses the move that feels like a move. Connecting rewards the relationship for its own sake. Neither half will license a direct ask, because a direct ask feels like exactly the thing you built this on not being. A more transactional seller would just ask the question. You've spent two years earning a warmth that now works against you the one time you need to interrupt it.",
    mistakenFor: {
      slug: 'authentic-advisor',
      name: 'Authentic Advisor',
      tell: "Both are trusted because nothing about them reads as performance. You protect the relationship. The Advisor spends it telling buyers things they don't want to hear. If you've told a buyer not to buy, or pushed back hard on their plan, the Advisor fits better.",
    },
    adjacent: ['empathic-closer', 'devoted-advisor', 'curious-cultivator'],
  },
  {
    slug: 'adaptive-student',
    name: 'Adaptive Student',
    trait: 'Adaptive',
    style: 'Student',
    tagline: "You're not the best seller in the room. You're the one who'll be better next quarter.",
    metaDescription:
      'The Adaptive Student wins by learning and adjusting faster than anyone. Strengths, blind spots, and how this selling style wins. Take the free assessment.',
    intro: [
      "The Adaptive Student treats every deal as a lesson and every lesson as fuel. They might not have the most experience in the room, but they close the gap faster than anyone, because they actually absorb what happened on the last call instead of repeating it. Feedback that would bruise another seller's ego, they take notes on. The pitch that worked, they study. The one that failed, they study harder.",
      "This is the seller who's never running the same play twice. They read each buyer fresh, adjust on the fly, and improve on a curve steep enough that the rep who outsold them this quarter won't next year. Coachability is the superpower. Give them a better way and they'll have it integrated by Friday.",
    ],
    strengths: [
      'You improve faster than anyone, turning every deal into a lesson that sharpens the next.',
      'You adapt to each buyer and situation instead of forcing one script onto everyone.',
      'You take coaching without ego, so you compound what other sellers ignore.',
      'You stay current, picking up new methods and tools while others run on habit.',
    ],
    blindSpots: [
      'You can chase every new method and never master the fundamentals that actually close deals.',
      "You can second-guess an approach mid-deal that just needed conviction to see through.",
      "You can lean on others' playbooks before you've built the confidence to trust your own read.",
      'You can mistake learning for doing, studying the craft when you should be in the field practicing it.',
    ],
    inTheDeal:
      "In a live deal, the Adaptive Student tried something on Tuesday's call that bombed, figured out why by Wednesday, and ran the fixed version on Thursday to a yes. They get better inside a single quarter in ways that take other reps years. The risk is the seller who's always adjusting and never anchored, who knows ten methods at the surface and none in the bones. Your edge is a learning curve nobody can match. Your discipline is committing long enough to get good, not just informed.",
    sellsBestTo:
      "Evolving markets, new product categories, and fast-changing sales motions where yesterday's playbook is already stale. You struggle more in moments that reward deep, settled expertise, where your instinct to adjust can read as uncertainty to a buyer who wanted a steady hand.",
    growthEdge:
      'Commit long enough to master, not just learn. Your appetite for getting better will carry you past sellers who stopped growing years ago, but improvement compounds only when you practice one thing into instinct before chasing the next. Drill the fundamentals that matter until they\'re automatic, then keep learning on top of a foundation that holds. Range is your gift. Depth is the work.',
    tension:
      "Adaptive changes the approach. Student looks for the better one. Both instincts point toward the next method, so there's nothing in you that argues for staying put. A more rigid seller would resist the change, and that resistance would accidentally produce the repetition that turns a method into instinct. By the time other sellers have built an instinct, you've already moved on to the next idea.",
    mistakenFor: {
      slug: 'adaptive-cultivator',
      name: 'Adaptive Cultivator',
      tell: "Both improve steadily. You improve the method. The Cultivator improves the account, running the same approach longer and getting better at one relationship than at technique. If your growth shows up as deeper accounts rather than sharper skills, that's the Cultivator.",
    },
    adjacent: ['strategic-challenger', 'resilient-hunter', 'methodical-architect'],
  },
]

export function getArchetype(slug: string): Archetype | undefined {
  return archetypes.find((a) => a.slug === slug)
}

export function getAllArchetypeSlugs(): { slug: string }[] {
  return archetypes.map((a) => ({ slug: a.slug }))
}
