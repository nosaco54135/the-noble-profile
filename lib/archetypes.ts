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
      "In a live deal, the Empathic Closer notices the CFO go quiet on the pricing slide and circles back before it becomes a silent no. You don't bulldoze. You name the tension and let the buyer feel understood, then you ask for the decision while the trust is still warm. Your risk is the deal that feels good but never closes, the relationship that stays a relationship. Other sellers either feel the hesitation or push past it. You do both in the same breath, and the deals you lose are the ones where you only did the first.",
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
      "In a live deal, the Devoted Advisor is the one who tells a buyer the cheaper package is the right fit this year, then watches that honesty turn into a three-year relationship and a stack of referrals. The risk is the mirror image: you under-ask, you under-expand, and you pour devotion into accounts that will never pay it back. Trust arrives before you've done anything to earn it, which is a head start almost nobody gets. What you do with a head start is spend it, not protect it.",
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
      "In a live deal, the Strategic Challenger tells the VP that the initiative they're proud of is aimed at the wrong bottleneck, then shows the data that proves it. When the prep is real, the room goes quiet and the buyer starts taking notes. The risk is the reframe that's clever but wrong, or right but delivered to someone who hears it as an insult. You show up having done work the buyer's own team hasn't done. That's why the reframe works when it works — and why it costs you so much when you aim it at someone who only wanted to be heard.",
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
      "In a live deal, the Resilient Hunter has three new conversations going before lunch while everyone else is still rewriting one email. The pipeline is always full because the activity never stops. The risk is the deal that needed a slower, more tailored touch and got a template instead, or the burnout that comes from treating every week like a sprint. Nobody in your org generates conversations at your rate. The cost of that rate is that every deal gets the same eight minutes, including the ones that were worth an afternoon.",
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
      "In a live deal, the Methodical Architect is the one with the mutual action plan the buyer's own team starts relying on to stay organized. Nothing slips, nothing surprises them, and the buyer trusts the process because they can see it working. The risk is the deal that didn't need all that machinery, or the curveball that no plan accounted for and you were slow to adapt to. In a deal with nine stakeholders and a twelve-month cycle, you're the only person holding the whole plan. The plan is usually finished before you stop working on it, and the hours after that come out of the deal.",
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
      "In a live deal, the Curious Cultivator asks the question that makes the buyer pause and say nobody's ever asked them that. The discovery runs so deep the buyer treats them like an advisor before buying anything. The risk is the deal that dies in discovery, endlessly explored and never closed, or the patient account that never actually grows. By month three you know things about this account the incumbent vendor doesn't. The hard part isn't learning the answer. It's deciding you have enough of one.",
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
      "In a live deal, the Authentic Connector is the one the buyer actually wants to grab coffee with, the seller who got the real story because they gave one first. Walls come down because nothing about them feels like a tactic. The risk is the warm relationship that never becomes a deal, the buyer who likes you enough to take your call but not enough to choose you, because you never made the case past the rapport. Buyers tell you what's actually happening because you were never performing at them. What you've built is real. It still has to be pointed at something.",
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
      "In a live deal, the Adaptive Student tried something on Tuesday's call that bombed, figured out why by Wednesday, and ran the fixed version on Thursday to a yes. They get better inside a single quarter in ways that take other reps years. The risk is the seller who's always adjusting and never anchored, who knows ten methods at the surface and none in the bones. You'll be a materially better seller in ninety days than you are today, which is not true of most of your peers. The trap is that ninety days of one thing beats ninety days of nine.",
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
  {
    slug: 'empathic-advisor',
    name: 'Empathic Advisor',
    trait: 'Empathic',
    style: 'Advisor',
    tagline: "You tell buyers the truth they didn't ask for.",
    metaDescription:
      'The Empathic Advisor reads the room and says the hard thing anyway. Strengths, blind spots, and how this selling style wins. Take the free assessment.',
    intro: [
      "The Empathic Advisor knows what a buyer can hear and says the hard thing anyway. You read the room the same way every empathic seller does. The difference is what you do with the read — you use it to time the truth, not to avoid it.",
      "Warmth becomes the product for a lot of sellers. You went the other direction. You figured out that a buyer who trusts you can survive being told they're wrong, and that being the one willing to say it is worth more than being the one they enjoy.",
    ],
    strengths: [
      'You deliver bad news early, when the buyer can still do something about it.',
      'You know which buyers can take a direct challenge and which need it wrapped, and you adjust without softening the substance.',
      'Buyers call before they decide, because they want your read first.',
      'You can tell a buyer not to buy and keep the relationship, which almost no seller can do.',
    ],
    blindSpots: [
      'You can advise when the buyer had already decided and just needed you to process the order.',
      "You can position yourself as the counsel and forget you're also the vendor, waiting to be asked instead of asking.",
      'Your honesty can arrive before the trust that makes it land, and a true thing said too early reads as an attack.',
      'Some buyers are happy to borrow your judgment for free.',
    ],
    inTheDeal:
      "In a live deal, the Empathic Advisor is the one who tells a buyer the timeline they've committed to internally won't hold, three weeks before anyone else would have raised it. The buyer reshapes the plan and stops getting surprised. The risk is the deal where you counseled your way through six months of good conversations and never once asked for the business, or the moment you told the truth before you'd earned the right to. Nobody else in the cycle is going to tell this buyer something they don't want to hear. That standing is worth protecting, which means using it before the deal ends rather than after.",
    sellsBestTo:
      'Buyers in over their heads on something consequential — new role, first time buying this category, a decision with career risk attached. People who want counsel more than they want a product. You struggle with buyers who already know what they want and read advice as friction.',
    growthEdge:
      "Ask as directly as you advise. You've already done the hard part, which is earning the standing to tell a buyer something they didn't want to hear. Asking for the business is a smaller thing than that. Buyers aren't shocked when you ask. They're usually wondering why you haven't.",
    tension:
      "Empathy tells you exactly how much the buyer can take. Advising tells you to say the thing regardless. The conflict shows up on the ask. Empathy reads a request for business as self-interested, and advising has no opinion about it at all. Neither half of you ever says close. So the counsel keeps coming and the ask never does.",
    mistakenFor: {
      slug: 'empathic-closer',
      name: 'Empathic Closer',
      tell: "Both read the room and both earn the right to say hard things. You use that right to advise. The Closer uses it to ask. If you leave the meeting having asked for something, you're probably closer to the Closer.",
    },
    adjacent: ['empathic-closer', 'devoted-advisor', 'curious-advisor'],
  },
  {
    slug: 'empathic-challenger',
    name: 'Empathic Challenger',
    trait: 'Empathic',
    style: 'Challenger',
    tagline: 'You push hardest on the people you like most.',
    metaDescription:
      'The Empathic Challenger reads a buyer accurately and tells them they are wrong anyway. Strengths, blind spots, and how this selling style wins. Take the free assessment.',
    intro: [
      "The Empathic Challenger reads a buyer accurately and then tells them they're wrong. Those two things sit badly together, and you do them anyway. You know exactly how the reframe is going to land before you say it, which is different from not caring how it lands.",
      "Challengers who can't read a room deliver the same challenge to everyone and lose half of them. You lose fewer, because you know when to hold it. The problem is that knowing when to hold it means you also know exactly what it costs when you don't.",
    ],
    strengths: [
      "You challenge people who'd shut down on anyone else, because they can tell you're not enjoying it.",
      'You know within a minute whether the reframe is landing, and you adjust before the buyer goes cold.',
      "You take the buyer's side while disagreeing with them, which most challengers can't do at the same time.",
      "You surface the objection the buyer hasn't said out loud and argue with that one instead of the stated one.",
    ],
    blindSpots: [
      'You can hold the challenge back from the buyer you like most, which is usually the one who needed it.',
      "You can soften the reframe until the buyer agrees with a version of it that doesn't change anything.",
      "You read resistance as damage when it's often just the buyer thinking.",
      'You can spend the whole call earning the right to challenge and run out of call.',
    ],
    inTheDeal:
      "In a live deal, the Empathic Challenger watches a buyer describe a plan they're proud of, sees the flaw in it, and waits four minutes for the right opening rather than jumping in. When it lands, the buyer doesn't get defensive, because the timing told them it wasn't an attack. You get more chances than most challengers do, because you can tell when the buyer has recovered enough to hear the next one — and the cost of reading them that closely is that you feel every one you land.",
    sellsBestTo:
      "Buyers who are wrong and half-know it. People who've been sold to by someone aggressive and are braced for it. You struggle with buyers who want a pure vendor relationship and read any challenge, however well-timed, as overstepping.",
    growthEdge:
      "The buyer you've connected with most is not the buyer to go easiest on. That instinct runs backwards. Rapport is what makes a hard reframe survivable, so the warmest relationship in your pipeline is the one that can absorb the most. You're currently spending your best challenges on strangers and your patience on friends.",
    tension:
      "Empathy wants the buyer to feel understood. Challenging requires a moment where they don't. Both halves are live in the same sentence, so you spend every reframe monitoring damage while delivering it. Sellers with one instinct or the other get to be fully committed to what they're doing. You never are. The reframes you regret aren't the harsh ones — they're the ones you diluted while watching the buyer's face.",
    mistakenFor: {
      slug: 'empathic-advisor',
      name: 'Empathic Advisor',
      tell: "Both read people well and both say hard things. The Advisor tells the buyer what they'd do. You tell the buyer their thinking is wrong. If you tend to offer a better option rather than dismantle the current one, the Advisor is closer.",
    },
    adjacent: ['empathic-closer', 'strategic-challenger', 'empathic-advisor'],
  },
  {
    slug: 'strategic-architect',
    name: 'Strategic Architect',
    trait: 'Strategic',
    style: 'Architect',
    tagline: 'You build the path before you walk it.',
    metaDescription:
      'The Strategic Architect maps the org before working the deal. Strengths, blind spots, and how this selling style wins. Take the free assessment.',
    intro: [
      "The Strategic Architect maps the deal before working it. You know who signs, who blocks, who has to be brought in early and who can't be told yet. That map is built before the second call, and most of what happens afterward is executing it.",
      "Most sellers leave discovery with notes. You leave with a draft org chart. Where other sellers manage the conversation in front of them, you're working a structure — which is why you're often three moves ahead, and why a buyer who behaves unpredictably costs you more than it costs anyone else.",
    ],
    strengths: [
      'You find the real decision-maker early, usually before the buyer tells you who it is.',
      'You sequence stakeholders deliberately, bringing people in when they will help rather than when they ask.',
      'You can see which objection is going to surface in legal review two months out and defuse it in month one.',
      'You build a path that survives a champion leaving, because you never depended on one person.',
    ],
    blindSpots: [
      'You can commit to a map built on a first-call read and keep executing it after the org has changed underneath you.',
      'You can spend the discovery call gathering structure and miss what the buyer actually cares about.',
      'You can route around a difficult stakeholder instead of engaging them, and they surface later with more power than they had.',
      'Your plan can be right and slow, losing to a competitor who just called the CEO.',
    ],
    inTheDeal:
      "In a live deal, the Strategic Architect knows in week two that the VP everyone is courting doesn't control the budget, and quietly starts building the case for someone three doors down. Six weeks later that's the person who signs. By the time most sellers know who they're talking to, you've started worrying about who they're not talking to — and you'll have the map finished before you've met enough people to know whether it's right.",
    sellsBestTo:
      "Complex organizations with unclear authority — matrixed companies, committee purchases, anything where the org chart lies. Buyers who don't know their own process. You struggle in flat orgs and quick transactional deals, where there's no structure to work and the map is just one person.",
    growthEdge:
      "Everything you build the map from is early evidence, and early evidence is thin by definition. The org knows itself better in month six than it did in month one. The architects who lose deals aren't the ones who read the org wrong. They're the ones who read it wrong in week one and had no mechanism for finding out.",
    tension:
      "Strategic sees the structure. Architect commits to a design. Both instincts reward deciding early, and neither one contains a reason to revisit. What you build in week one is usually good enough to work with, which is the problem — a bad map reveals itself immediately, and a decent one carries you far enough to stop checking.",
    mistakenFor: {
      slug: 'strategic-challenger',
      name: 'Strategic Challenger',
      tell: "Both work from a thesis about the buyer's business. You build a path around what you see. The Challenger says it to the buyer's face. If you find yourself naming the flawed assumption rather than navigating past it, the Challenger fits better.",
    },
    adjacent: ['methodical-architect', 'strategic-challenger', 'devoted-advisor'],
  },
  {
    slug: 'devoted-connector',
    name: 'Devoted Connector',
    trait: 'Devoted',
    style: 'Connector',
    tagline: "Your buyers call you about things that aren't your job.",
    metaDescription:
      'The Devoted Connector ends up inside the account rather than selling to it. Strengths, blind spots, and how this selling style wins. Take the free assessment.',
    intro: [
      "The Devoted Connector ends up inside the account rather than selling to it. Buyers forward you internal threads. They ask what you'd do about a hire. Somewhere in the second year you stopped being a vendor and nobody announced it.",
      "Most sellers work an account for as long as it pays. You work it because you're in it now. The loyalty came first and the revenue followed, which is backwards from how anyone would design it and is exactly why buyers can tell it's real.",
    ],
    strengths: [
      "Buyers tell you about org changes before they're announced, because you're not on the announcement list.",
      'You keep an account through a champion leaving, because you knew four other people there.',
      'You find the expansion nobody asked for, since you hear the problem before it reaches procurement.',
      "You'll take the call that has nothing to do with your product, and that's the call they remember.",
    ],
    blindSpots: [
      'You can hear a real problem, help with it, and never connect it to something you sell.',
      'You can protect the relationship by not raising price, and the account underpays for years.',
      "You can stay close to people who've lost influence, because you liked them before they lost it.",
      "You can be the most trusted person in an account you're not growing.",
    ],
    inTheDeal:
      "In a live deal, the Devoted Connector gets a text from a director on a Sunday about something that hasn't become a problem yet. You help. Nine months later that director is the one arguing for renewal in a meeting you're not in. Access like that takes two years to build and can't be manufactured on a quarterly timeline — and the way you protect it is by never asking it for anything, which is the same as not having it.",
    sellsBestTo:
      "Long-cycle accounts with high switching costs and real continuity — the same people in the same seats for years. Buyers who've had a vendor churn through four reps. You struggle in fast transactional cycles where there's no time to become anything, and with buyers who'd rather keep it professional.",
    growthEdge:
      "Ask them for something. Not because you've earned it, though you have, but because a relationship that's never tested stays theoretical. The buyers closest to you are the ones who'd move something internally on your behalf, and almost none of them have ever been asked to.",
    tension:
      "Devotion and connecting both deepen with time, and neither one has any interest in a transaction. A seller who wanted something would create a moment where they asked for it. You never create that moment, so the relationship keeps getting better at being a relationship. Years in, you know more about this account than anyone at your company and have less to show for it than a rep who called cold last month.",
    mistakenFor: {
      slug: 'devoted-advisor',
      name: 'Devoted Advisor',
      tell: "Both stay long and both get trusted. You get the whole picture, including things that have nothing to do with buying. The Advisor gets brought in on decisions specifically. If buyers call you when they're deciding rather than when something breaks, look at the Advisor.",
    },
    adjacent: ['devoted-advisor', 'authentic-connector', 'empathic-closer'],
  },
  {
    slug: 'resilient-closer',
    name: 'Resilient Closer',
    trait: 'Resilient',
    style: 'Closer',
    tagline: 'You stay in the room after it gets uncomfortable.',
    metaDescription:
      'The Resilient Closer asks, hears something that is not yes, and asks again. Strengths, blind spots, and how this selling style wins. Take the free assessment.',
    intro: [
      "The Resilient Closer asks, hears something that isn't yes, and asks again. Not louder. The second ask is usually better than the first, because you spent the silence listening instead of recovering.",
      "Most deals die from the seller's discomfort rather than the buyer's. Someone asks, the room tightens, and they fill the gap with a discount or a follow-up date. You can sit in a tight room. That turns out to be most of the skill.",
    ],
    strengths: [
      'You hold silence after the ask, which is the single hardest thing in a sales conversation.',
      'You get told no and keep the relationship, because you never treated the no as personal.',
      "You'll ask a third time in the same meeting when the objection has actually changed.",
      "You're the person put on a deal that's already gone sideways, because you won't flinch at what's in there.",
    ],
    blindSpots: [
      'You can push through resistance that was information, closing a deal that should have been requalified.',
      "You can mistake your own tolerance for the buyer's, staying comfortable in a room they want out of.",
      "You can keep asking a buyer who can't say yes, because they never quite say no either.",
      'You can win the hard deal and spend a quarter on something a better-qualified rep closed in a week.',
    ],
    inTheDeal:
      "In a live deal, the Resilient Closer asks for the business, hears the timing objection, and doesn't move on. You ask what changes in Q3. Then what would have to be true. By the fourth question the buyer is describing the actual blocker, which was never timing. Almost nobody can stay in that conversation long enough to get there — and staying means you sometimes get there with a deal that was dead two questions ago.",
    sellsBestTo:
      "Buyers who stall rather than decline, and organizations where the real objection surfaces late. Anyone who's been given an easy out by every previous vendor. You struggle with buyers who need space to arrive on their own and read persistence as pressure.",
    growthEdge:
      "Learn the difference between a buyer who's uncomfortable and one who's disqualified. You can handle both, which is the problem — the discomfort you tolerate so well is also the signal other sellers use to walk away. They leave too early. You leave too late. The cost is the same.",
    tension:
      "Resilience absorbs the setback. Closing wants the decision now. Both instincts point at staying, so nothing in you ever votes to leave. A seller who felt the rejection would quit on some deals too early and get a useful false positive out of it. You get no signal at all. The deal you should have killed in March feels exactly like the deal you saved in April.",
    mistakenFor: {
      slug: 'resilient-hunter',
      name: 'Resilient Hunter',
      tell: "Both keep going when it's unpleasant. You spend it inside one deal. The Hunter spends it starting new ones. If your bad weeks show up as an empty pipeline rather than a stuck one, the Hunter is closer.",
    },
    adjacent: ['resilient-hunter', 'empathic-closer', 'strategic-challenger'],
  },
  {
    slug: 'curious-advisor',
    name: 'Curious Advisor',
    trait: 'Curious',
    style: 'Advisor',
    tagline: 'You ask until you actually know, then you say what you think.',
    metaDescription:
      'The Curious Advisor asks past the point where the answer was good enough, then makes a recommendation. Strengths, blind spots, and how this selling style wins. Take the free assessment.',
    intro: [
      "The Curious Advisor asks past the point where the answer was good enough. Then, unlike most people who ask that many questions, you stop and tell the buyer what to do.",
      "Discovery is where a lot of sellers hide. It feels productive and it's never wrong. You go further than they do and then do the thing they're avoiding, which is putting a recommendation on the table with your name on it.",
    ],
    strengths: [
      'You ask the question that changes what the buyer thought the problem was.',
      "You'll say \"I don't think you need this yet,\" which buys more credibility than any pitch.",
      'Your recommendations are specific, because they are built on things the buyer told you rather than a category assumption.',
      'You can advise against your own product and still be in the deal six months later.',
    ],
    blindSpots: [
      'You can keep asking after you have enough, because one more answer always seems like it might matter.',
      "You can recommend something so tailored the buyer can't get it approved internally.",
      'You can treat a simple purchase as a problem to understand, and the buyer just wanted a quote.',
      'You can be so committed to the honest recommendation that you talk yourself out of winnable deals.',
    ],
    inTheDeal:
      "In a live deal, the Curious Advisor spends forty minutes on discovery everyone else would have wrapped in fifteen, then says the thing the buyer has been circling for a month out loud. They go quiet. Then they start telling you what's really going on. The buyer will act on a recommendation built that way — and every recommendation costs you the forty minutes first, on deals that don't all justify it.",
    sellsBestTo:
      "Buyers with a badly defined problem and real budget. People who've been pitched at and never asked. You struggle with buyers who already know their spec and treat discovery as a delay tactic.",
    growthEdge:
      "You already know when you have enough. The question you ask next isn't for information, it's for confidence. There's a moment in most of your calls where the recommendation is fully formed and you ask three more things anyway. The buyer was ready at that moment. You weren't.",
    tension:
      "Curiosity wants more input. Advising wants a conclusion. Those look opposed and aren't — advising is happy to wait for better information, and curiosity is happy to keep supplying it. So they agree to continue. Nothing in you names the point where you know enough, and the recommendation arrives when the meeting ends rather than when you were ready.",
    mistakenFor: {
      slug: 'curious-cultivator',
      name: 'Curious Cultivator',
      tell: "Both go deep and both take time. You end with a recommendation. The Cultivator ends with a better relationship and comes back. If your accounts grow without you ever having made a specific call, the Cultivator fits better.",
    },
    adjacent: ['curious-cultivator', 'empathic-advisor', 'devoted-advisor'],
  },
  {
    slug: 'authentic-advisor',
    name: 'Authentic Advisor',
    trait: 'Authentic',
    style: 'Advisor',
    tagline: "You'd rather lose the deal than manage the message.",
    metaDescription:
      'The Authentic Advisor says the thing without deciding how to say it first. Strengths, blind spots, and how this selling style wins. Take the free assessment.',
    intro: [
      "The Authentic Advisor says the thing without deciding how to say it first. Buyers notice the absence of a beat before you answer. That gap is where most sellers do their calculating, and you skipped it.",
      "Advice is only worth something if the person giving it would tell you something you don't want to hear. You clear that bar constantly, sometimes carelessly. The trust you get isn't a technique and can't be copied by a rep who read about it.",
    ],
    strengths: [
      "You answer the hard question directly, including the one about your own product's weakness.",
      "Buyers believe your good news because they've heard you deliver bad news.",
      "You don't have a version of yourself for the executive meeting, so nothing slips when you're tired.",
      "You'll tell a buyer their internal plan is the real problem, not the vendor they're evaluating.",
    ],
    blindSpots: [
      'You can say the true thing in a room that needed it said differently, and lose the point to the delivery.',
      'You can undersell something good because overstating it feels like lying.',
      'You can volunteer a weakness the buyer never asked about and hand the competitor a line.',
      "You can mistake bluntness for honesty on a day when you're just tired.",
    ],
    inTheDeal:
      "In a live deal, the Authentic Advisor tells a buyer their own timeline is the risk, not the implementation, in a meeting where four people had agreed not to say that. Buyers who've been handled for a decade don't have a category for it, and some of them never get past the surprise. What you have is a buyer who believes you, which is rare enough to be worth real money — and it costs you the deals where the truth arrived before the relationship could hold it.",
    sellsBestTo:
      "Buyers who've been burned by overpromising, and technical evaluators who can detect a hedge. Senior people who are rarely told the truth. You struggle with buyers who need reassurance, and in competitive processes where your honesty gets read as weakness against a confident competitor.",
    growthEdge:
      "Honesty and timing aren't opposites. You can hold a true thing for twenty minutes without it becoming a lie, and twenty minutes is often the difference between a buyer hearing it and a buyer defending against it. You're not being asked to say less. You're being asked to wait, which you experience as the same thing.",
    tension:
      "Authenticity refuses to manage the message. Advising requires judgment about what to say. Both instincts are about being useful, so they never argue — which means nothing in you ever votes for delay. The true thing goes on the table at the moment you think it, and the buyers who couldn't take it yet are simply gone.",
    mistakenFor: {
      slug: 'authentic-connector',
      name: 'Authentic Connector',
      tell: "Both are trusted because nothing reads as performance. You spend it on advice buyers don't enjoy. The Connector keeps the relationship comfortable. If you'd rather stay close than be right, the Connector fits better.",
    },
    adjacent: ['authentic-connector', 'empathic-advisor', 'strategic-challenger'],
  },
  {
    slug: 'adaptive-cultivator',
    name: 'Adaptive Cultivator',
    trait: 'Adaptive',
    style: 'Cultivator',
    tagline: 'The account grows because you kept changing how you worked it.',
    metaDescription:
      'The Adaptive Cultivator stays in one account and keeps adjusting inside it. Strengths, blind spots, and how this selling style wins. Take the free assessment.',
    intro: [
      "The Adaptive Cultivator stays in one account and keeps adjusting inside it. The relationship in year three doesn't look like year one, not because the buyer changed but because you kept revising your read of them.",
      "Most people who stay in accounts settle into a rhythm. The QBR has a shape, the check-in has a cadence, and it works until it quietly doesn't. You don't settle. Something about the account always feels slightly unsolved, which is why yours keep growing when other reps' plateau.",
    ],
    strengths: [
      "You notice when an account's priorities have shifted and change your approach before the renewal conversation.",
      "You survive a new stakeholder arriving, because you'll rebuild the relationship rather than defend the old one.",
      'You run a different play in year two than year one, on the same account.',
      "You spot expansion in a direction nobody predicted, because you weren't working from last year's plan.",
    ],
    blindSpots: [
      "You can change an approach that was working, because working isn't the same as interesting.",
      'You can confuse the buyer by showing up differently than you did last quarter.',
      "You can keep optimizing an account that's already at its ceiling.",
      'You can spread attention across accounts that all seem worth another look.',
    ],
    inTheDeal:
      "In a live deal, the Adaptive Cultivator notices the buyer's questions have shifted from cost to risk and quietly changes the entire frame before anyone names it. The expansion that follows looks like luck to everyone watching. Nobody else is going to catch that shift, because catching it requires still paying close attention in year three — and the reps who don't pay that kind of attention also don't rework an account that was already growing.",
    sellsBestTo:
      "Accounts in genuine flux — reorgs, new leadership, changing priorities, anything where last year's approach has actually expired. You struggle with stable accounts that want consistency, where your adjusting reads as instability.",
    growthEdge:
      "Some accounts want last year's version of you. That's not stagnation, it's the thing they're paying for. The signal to watch isn't whether the relationship feels fresh to you. It's whether anything in the account actually changed. You're currently using your own restlessness as the trigger, and it fires on a schedule that has nothing to do with them.",
    tension:
      "Adaptive wants the new approach. Cultivating wants more time in the account. Both are satisfied by staying and adjusting, so the account never reaches a state you'd call finished. A seller running a fixed play would eventually notice it stopped working. You change before it fails, so you never find out which version was the one the buyer responded to. Five years in this account and you still can't say what works here.",
    mistakenFor: {
      slug: 'adaptive-student',
      name: 'Adaptive Student',
      tell: "Both keep changing and both improve fast. You change to fit one account. The Student changes to get better at selling. If what improves is your technique rather than your accounts, the Student is closer.",
    },
    adjacent: ['curious-cultivator', 'adaptive-student', 'devoted-connector'],
  },
]

export function getArchetype(slug: string): Archetype | undefined {
  return archetypes.find((a) => a.slug === slug)
}

export function getAllArchetypeSlugs(): { slug: string }[] {
  return archetypes.map((a) => ({ slug: a.slug }))
}
