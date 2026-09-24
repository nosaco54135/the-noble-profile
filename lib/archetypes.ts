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
      tell: "You spend the trust on a question. The Advisor banks it and waits for the buyer to come to them. If you leave most meetings having recommended something rather than requested a decision, the Advisor is probably the better fit.",
    },
    adjacent: ['empathic-architect', 'authentic-connector', 'empathic-hunter'],
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
    adjacent: ['empathic-closer', 'authentic-connector', 'devoted-architect'],
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
      "Senior, experienced buyers who respect a strong point of view and are tired of being sold to. Complex deals where the real problem is buried and reframing it is the actual value. You struggle more with buyers who've already sold this decision internally and can't afford to reopen it.",
    growthEdge:
      'Earn the right before you reframe. Your insight is real, but it only lands once the buyer trusts that you understand their world. Lead with enough listening that the challenge feels like it came from inside their business, not from your slide deck. The reframe is your weapon. Timing is what keeps it from backfiring.',
    tension:
      "Strategic sees the non-obvious answer. Challenger says it out loud. Neither half checks whether the room is ready for it. A seller with a softer style would stall on the delivery long enough to check, and that stall does real work even though it feels like cowardice. You skip it. The reframe arrives fully formed and correct, and you find out whether the buyer could take it only after it's already on the table.",
    mistakenFor: {
      slug: 'strategic-architect',
      name: 'Strategic Architect',
      tell: "You say the thing. The Architect works around it. Both of you saw the same flaw in the buyer's plan, and only one of you told them. If you tend to route past a bad assumption rather than name it, the Architect is likely the better read.",
    },
    adjacent: ['resilient-hunter', 'methodical-architect', 'adaptive-challenger'],
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
    adjacent: ['resilient-challenger', 'resilient-architect', 'empathic-hunter'],
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
    adjacent: ['methodical-challenger', 'curious-cultivator', 'methodical-student'],
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
      tell: "You protect the relationship. The Advisor spends it. If you've told a buyer not to buy, or pushed back hard on their plan, the Advisor fits better.",
    },
    adjacent: ['empathic-closer', 'authentic-student', 'authentic-cultivator'],
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
    adjacent: ['adaptive-challenger', 'adaptive-hunter', 'adaptive-architect'],
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
      'Buyers in over their heads on something consequential — new role, first time buying this category, a decision with career risk attached. People who want counsel more than they want a product. You struggle with buyers who arrive with a spec and want it quoted.',
    growthEdge:
      "Ask as directly as you advise. You've already done the hard part, which is earning the standing to tell a buyer something they didn't want to hear. Asking for the business is a smaller thing than that. Buyers aren't shocked when you ask. They're usually wondering why you haven't.",
    tension:
      "Empathy tells you exactly how much the buyer can take. Advising tells you to say the thing regardless. The conflict shows up on the ask. Empathy reads a request for business as self-interested, and advising has no opinion about it at all. Neither half of you ever says close. So the counsel keeps coming and the ask never does.",
    mistakenFor: {
      slug: 'empathic-closer',
      name: 'Empathic Closer',
      tell: "Both read the room and both earn the right to say hard things. You use that right to advise. The Closer uses it to ask. If you leave the meeting having asked for something, you're probably closer to the Closer.",
    },
    adjacent: ['empathic-closer', 'empathic-student', 'curious-advisor'],
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
    adjacent: ['empathic-closer', 'empathic-connector', 'empathic-advisor'],
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
      tell: "You navigate the org. The Challenger argues with it. The same read that tells you which stakeholder to avoid tells them which assumption to attack. If you find yourself naming the flawed assumption rather than working around it, the Challenger fits better.",
    },
    adjacent: ['strategic-student', 'strategic-closer', 'strategic-cultivator'],
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
    adjacent: ['devoted-advisor', 'devoted-challenger', 'devoted-hunter'],
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
    adjacent: ['resilient-challenger', 'empathic-closer', 'resilient-cultivator'],
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
      tell: "You're building toward a recommendation. The Cultivator is building toward next quarter. If your accounts grow without you ever having made a specific call, the Cultivator fits better.",
    },
    adjacent: ['curious-challenger', 'empathic-advisor', 'devoted-advisor'],
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
      tell: "You'll make the relationship uncomfortable to be useful. The Connector won't. Same absence of performance, opposite tolerance for a difficult meeting. If you'd rather stay close than be right, the Connector fits better.",
    },
    adjacent: ['authentic-challenger', 'authentic-architect', 'authentic-cultivator'],
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
      "Every quarter you change how you run this account, and every quarter you're still in it. Nothing in either half ever asks you to stop, so the account never reaches a state you'd call finished. A seller running a fixed play would eventually notice it stopped working. You change before it fails, so you never find out which version was the one the buyer responded to. Five years in this account and you still can't say what works here.",
    mistakenFor: {
      slug: 'adaptive-student',
      name: 'Adaptive Student',
      tell: "Both keep changing and both improve fast. You change to fit one account. The Student changes to get better at selling. If what improves is your technique rather than your accounts, the Student is closer.",
    },
    adjacent: ['adaptive-closer', 'adaptive-student', 'adaptive-architect'],
  },
  {
    slug: 'methodical-hunter',
    name: 'Methodical Hunter',
    trait: 'Methodical',
    style: 'Hunter',
    tagline: "You prospect like it's a process, because it is one.",
    metaDescription:
      'The Methodical Hunter runs outbound as a system rather than on energy. Strengths, blind spots, and how this selling style wins. Take the free assessment.',
    intro: [
      "The Methodical Hunter runs outbound as a system. The list is built before the week starts, the sequence has a reason for each touch, and the tracking is good enough that you know which of the four steps is actually producing the meetings.",
      "Most hunters run on energy and can tell you their dial count. You can tell your conversion rate by segment. The volume matters less than knowing why the volume is working, which is why your numbers hold in a bad quarter when everyone else is trying harder.",
    ],
    strengths: [
      'You can tell which part of your outreach is producing meetings, which almost no rep can.',
      "Your pipeline doesn't collapse when motivation does, because it was never running on motivation.",
      'You test one variable at a time, so what you learn in March still applies in June.',
      'You build lists that hold up, since you qualified before you dialed rather than after.',
    ],
    blindSpots: [
      "You can spend Monday building the system and Thursday realizing you haven't talked to anyone.",
      "The sequence still books meetings, just not enough of them, and you don't notice until the quarter is halfway gone.",
      "You can over-qualify a list until it's too small to hit the number.",
      "You can miss the buyer who needed a call right now because they weren't in this week's segment.",
    ],
    inTheDeal:
      "In a live deal, the Methodical Hunter knows the prospect opened the case study twice and called on the second one, not the first. The timing looks like instinct and it's a rule you wrote down in February. Nobody else in your org can tell you why their outbound works, which means nobody else can fix theirs when it stops — and you'll spend a full day rebuilding a system on a week you needed to be dialing.",
    sellsBestTo:
      'Segments big enough to pattern-match — repeatable buyer profiles, defined verticals, anywhere the same problem shows up at forty companies. You struggle with one-off opportunities that do not fit a segment, and in markets too small for the system to have anything to learn from.',
    growthEdge:
      "Every outbound system eventually consumes the time it was built to save. The dangerous week is the one where the CRM looks beautiful and nobody remembers hearing your voice. What you know about what works came from calls, and a week of building produces nothing to build from next week.",
    tension:
      "Methodical wants the process right before running it. Hunting wants to be in the market now. That conflict is live every Monday morning, and the process usually wins, because it's the half of you with a visible deliverable at the end of the day. A finished list feels like work. An unreturned call doesn't.",
    mistakenFor: {
      slug: 'methodical-architect',
      name: 'Methodical Architect',
      tell: "Both build systems and both trust process over instinct. Yours is aimed at getting into conversations. The Architect's is aimed at getting a deal through an org. If your best work happens after the first meeting rather than before it, the Architect is closer.",
    },
    adjacent: ['methodical-cultivator', 'adaptive-hunter', 'strategic-hunter'],
  },
  {
    slug: 'curious-hunter',
    name: 'Curious Hunter',
    trait: 'Curious',
    style: 'Hunter',
    tagline: "You research until the cold call isn't cold.",
    metaDescription:
      'The Curious Hunter shows up to the first conversation already knowing something real. Strengths, blind spots, and how this selling style wins. Take the free assessment.',
    intro: [
      "The Curious Hunter shows up to the first conversation already knowing something. Not the company boilerplate — the thing they said on a podcast in April, the role they've been trying to fill since January, the competitor they lost last year.",
      "Prospecting rewards volume, and you've never been able to do it that way. Something about a name on a list makes you want to know what's actually going on there, and by the time you call you've talked yourself into caring. Buyers hear that in the first ten seconds.",
    ],
    strengths: [
      'Your opener references something real, so you get past the first fifteen seconds far more than most.',
      'You find the trigger event other reps miss, because you read past the funding announcement.',
      'You can hold a conversation with a technical buyer on their own terms, having done the reading.',
      "You know which accounts aren't worth calling, and you knew before you dialed.",
    ],
    blindSpots: [
      'You can research four accounts in the time a decent hunter calls forty.',
      "By the time you call, you're rooting for the account.",
      'You can lead with the insight and lose the buyer before you ever get to a reason for the call.',
      'You can treat a research session as a productive morning when nothing was produced.',
    ],
    inTheDeal:
      "In a live deal, the Curious Hunter opens with a question about something the buyer thought nobody outside the company knew, and the call stops being a cold call by the second exchange. That access is worth more than fifty dials — and the research that produced it is time you can't spend twice, on an account that might not have budget until next year.",
    sellsBestTo:
      'Complex products, technical buyers, and markets where the buyer expects you to understand their world before you open your mouth. Senior people who screen out anyone generic. You struggle in high-velocity transactional segments where the winner is whoever called first.',
    growthEdge:
      "The research always feels productive because it leaves evidence behind. The calls disappear at the end of the day. One of those can fill a morning without risking rejection, and it's the one you reach for when the week starts badly.",
    tension:
      "Curiosity wants to understand the account. Hunting wants to be in the next conversation. They compete for the same hour, and curiosity wins most days because it's the one with something to show for itself. You end most weeks knowing more about your territory than anyone and having spoken to fewer people in it.",
    mistakenFor: {
      slug: 'curious-cultivator',
      name: 'Curious Cultivator',
      tell: "Your research gets you into the room. The Cultivator's keeps them there for three years. If your best work is in year two of an account rather than week one, the Cultivator fits.",
    },
    adjacent: ['curious-cultivator', 'resilient-hunter', 'methodical-hunter'],
  },
  {
    slug: 'authentic-hunter',
    name: 'Authentic Hunter',
    trait: 'Authentic',
    style: 'Hunter',
    tagline: 'You cold call like a person, which is why it works.',
    metaDescription:
      'The Authentic Hunter opens without a script voice and gets a beat of real attention. Strengths, blind spots, and how this selling style wins. Take the free assessment.',
    intro: [
      "The Authentic Hunter opens without a script voice. No manufactured energy, no borrowed urgency. You say why you're calling in the words you'd use to a colleague, and enough buyers stay on the line that you've never needed the script.",
      "Most prospecting fails because the buyer can hear a performance in the first three words. Yours doesn't sound like that, so you get a beat of genuine attention before they decide. What you do with that beat is the whole job.",
    ],
    strengths: [
      'You get more second sentences than rehearsed reps, because nothing in your first one triggers the reflex.',
      "You'll say \"you probably don't need this\" and mean it, which keeps people talking.",
      "You handle the hostile pickup without matching it, since you weren't performing to begin with.",
      'You leave voicemails people actually return.',
    ],
    blindSpots: [
      'You can be so unwilling to sound salesy that you never make the reason for the call clear.',
      'You can have a good human conversation that produces nothing and count it as a win.',
      "You've abandoned follow-up sequences that were working because you couldn't recognize yourself in them anymore.",
      'You can go quiet on a buyer rather than follow up a fourth time, reading persistence as performance.',
    ],
    inTheDeal:
      "In a live deal, the Authentic Hunter gets a prospect to admit on a first call that they've been putting off a decision for eight months, because nothing about the call made admitting it costly. That kind of first conversation is rare enough that it separates you from everyone else in the queue — and it costs you the buyers who needed a clear ask and got a nice chat instead.",
    sellsBestTo:
      "Skeptical buyers, technical evaluators, and anyone who screens out anything that smells like a pitch. Senior people who've heard every opener. You struggle in transactional segments where the fastest clearest offer wins and your conversational approach reads as unfocused.",
    growthEdge:
      "Some buyers aren't waiting for authenticity. They're waiting for clarity. The thing you're avoiding is manufactured urgency, and a direct ask isn't that — it's the most honest sentence available, since it's exactly what you want. The hesitation costs you buyers who were ready.",
    tension:
      "Authenticity refuses the tactic. Hunting is a numbers game built on tactics. Both halves are genuinely present, so every sequence, every follow-up cadence, every \"just circling back\" gets evaluated against whether it's really you. Most of them don't survive that test. The reps below you on the leaderboard are running plays you've already decided you're not willing to run.",
    mistakenFor: {
      slug: 'authentic-connector',
      name: 'Authentic Connector',
      tell: "Your realness works on strangers. The Connector's works over years. If your strongest relationships are old rather than new, the Connector fits better.",
    },
    adjacent: ['authentic-connector', 'resilient-hunter', 'authentic-challenger'],
  },
  {
    slug: 'strategic-hunter',
    name: 'Strategic Hunter',
    trait: 'Strategic',
    style: 'Hunter',
    tagline: 'You pick the account before you pick up the phone.',
    metaDescription:
      'The Strategic Hunter treats target selection as the real work. Strengths, blind spots, and how this selling style wins. Take the free assessment.',
    intro: [
      "The Strategic Hunter treats target selection as the real work. Which forty accounts, which person inside each, which reason now rather than in six months. By the time you're dialing, most of the thinking is already done.",
      "Other hunters get handed a territory and start at the top. You look at the same territory and see maybe twelve accounts that make sense this quarter, and you'd rather work those twelve properly than touch all four hundred.",
    ],
    strengths: [
      'You identify the accounts most likely to buy before making a single call.',
      'You enter at the right level, having figured out who owns the problem rather than who owns the budget line.',
      'You time outreach to something real — a hire, a filing, a competitor move — rather than to your own calendar.',
      "You know why an account isn't ready, which means you know what would make it ready.",
    ],
    blindSpots: [
      'You can narrow a territory to twelve accounts and miss the number when three of them stall.',
      'You can build a thesis about an account and hear the disconfirming evidence as an objection.',
      'You can spend the week deciding who to call and call almost nobody.',
      "You can pass on the account that didn't fit the thesis and would have closed in three weeks.",
    ],
    inTheDeal:
      "In a live deal, the Strategic Hunter calls a company two weeks after a VP hire everyone else saw and nobody connected to a buying window. The prospect asks how you knew to call now. Your hit rate per conversation is higher than anyone's on the floor — and you have fewer conversations than anyone on the floor, which means one bad read costs you a month.",
    sellsBestTo:
      'Considered purchases in defined markets where account selection genuinely predicts outcome. Complex orgs where entering at the wrong level kills the deal. You struggle in large undifferentiated markets where volume beats selection, and in territories too small to be selective in.',
    growthEdge:
      "Every Strategic Hunter has a list of accounts they never called because the timing looked wrong. Nobody ever finds out which of those would have closed. The thesis gets tested against more research, which can't disconfirm it — every new fact arrives already interpreted.",
    tension:
      "Strategic wants certainty about the target. Hunting wants activity now. They fight over the same morning and strategy usually wins, because selecting feels like the responsible version of prospecting. It's not obviously wrong — the accounts you pick really are better. It's just that a good list nobody called converts identically to a bad one.",
    mistakenFor: {
      slug: 'strategic-architect',
      name: 'Strategic Architect',
      tell: "Both work from a read of the org before engaging. You use it to choose who to approach. The Architect uses it to navigate once inside. If your real work starts after the first meeting, the Architect fits better.",
    },
    adjacent: ['strategic-architect', 'methodical-hunter', 'strategic-cultivator'],
  },
  {
    slug: 'devoted-closer',
    name: 'Devoted Closer',
    trait: 'Devoted',
    style: 'Closer',
    tagline: "You close because you're not going anywhere afterward.",
    metaDescription:
      'The Devoted Closer asks for the business with the next three years in view. Strengths, blind spots, and how this selling style wins. Take the free assessment.',
    intro: [
      "The Devoted Closer asks for the business with the next three years in view. The ask isn't aggressive because it doesn't have to be — you're not extracting a signature, you're proposing something you intend to be present for.",
      "Closing gets taught as a moment of pressure. Yours doesn't work that way. Buyers sign because it's obvious you'll still be around when something breaks, and that's a different kind of confidence than urgency.",
    ],
    strengths: [
      "You close without pressure, because the buyer can tell the relationship doesn't end at signature.",
      "You get the honest objection, since buyers don't feel they need to protect themselves from you.",
      'Your closed deals stay closed, and they expand.',
      "You'll walk away from a bad fit at the close, which makes every other deal you push more credible.",
    ],
    blindSpots: [
      'You can delay the ask to protect a relationship that would have survived it.',
      "You can close the deal that's good for the relationship rather than the one that's right for the quarter.",
      'You can under-price, because raising it feels like taking from someone you are committed to.',
      'You can stay in a stalled deal long past the point of a decision, since leaving feels like abandonment.',
    ],
    inTheDeal:
      "In a live deal, the Devoted Closer asks for the signature and then tells the buyer which part of implementation is going to be painful, before they've signed. They sign anyway, usually faster. The implementation warning earns trust. The six extra meetings after the deal died earn nothing.",
    sellsBestTo:
      'Buyers making a long-term commitment with real switching costs, and anyone burned by a vendor that disappeared after signature. Risk-averse committees. You struggle with transactional buyers who just want a price and read your investment as overhead.',
    growthEdge:
      "The relationship usually survives the ask. The delay usually doesn't. Buyers sit in decisions for weeks that one meeting would have resolved, and the commitment you're protecting is the same thing that would have made the ask land.",
    tension:
      "Devotion plays the long game. Closing wants the decision today. They don't argue often, because you've mostly resolved it by choosing the long game — which means the close happens when the relationship is ready rather than when the deal is. Your forecast is accurate about everything except dates.",
    mistakenFor: {
      slug: 'devoted-advisor',
      name: 'Devoted Advisor',
      tell: "You ask for the decision. The Advisor lets the buyer arrive at it, however long that takes. If your deals tend to close because the buyer eventually got there, you're nearer the Advisor than you think.",
    },
    adjacent: ['devoted-advisor', 'devoted-hunter', 'devoted-connector'],
  },
  {
    slug: 'curious-closer',
    name: 'Curious Closer',
    trait: 'Curious',
    style: 'Closer',
    tagline: 'You ask one more question, then you ask for the deal.',
    metaDescription:
      'The Curious Closer keeps digging right up to the ask, then builds the close around what they found. Strengths, blind spots, and how this selling style wins. Take the free assessment.',
    intro: [
      "The Curious Closer keeps digging right up to the ask. The last question before you close is usually the one that makes the close work, because you found the thing they hadn't said yet and built the ask around it.",
      "Most curious sellers never get to the ask. Most closers stopped asking questions two calls ago. Doing both in the same conversation is unusual, and it's why your close rate holds on deals that looked complicated.",
    ],
    strengths: [
      "Your close is built on something the buyer told you, so it rarely sounds like a pitch.",
      "You uncover the real objection before you ask, which means you're not closing into a surprise.",
      'You can shift the ask mid-conversation when the answer changes what you are selling.',
      "You ask the uncomfortable qualifying question, because you'd rather know now.",
    ],
    blindSpots: [
      'You can ask a question that reopens a decision the buyer had already made.',
      'You can find one more thing to understand and let a closable meeting end without an ask.',
      'You can qualify a good deal to death looking for the flaw.',
      "You can get so interested in the buyer's problem that you forget you're there to sell something.",
    ],
    inTheDeal:
      "In a live deal, the Curious Closer asks what happens if they do nothing, hears an answer nobody had said out loud, and closes on that instead of the original pitch. The deal moves because you were still listening when everyone else had started presenting — and the same instinct will reopen a closed deal with a question you didn't need to ask.",
    sellsBestTo:
      "Complex deals where the stated requirement isn't the real one, and buyers who haven't fully diagnosed their own problem. You struggle with buyers who know exactly what they want and experience further questions as a stall.",
    growthEdge:
      "There's a moment in most of your calls where the ask is available and you ask one more thing instead. It doesn't produce information. It produces delay. The question feels like diligence and arrives at exactly the moment closing got uncomfortable.",
    tension:
      "Curiosity wants the next answer. Closing wants the decision. This one actually fights, and the fight happens in the last five minutes of every call. What curiosity really wants is for nothing to be left unresolved, and a signature always leaves something unresolved — there's a version of this buyer's problem you never got to. So the question that delays the close isn't procrastination. It's the more comfortable of two open loops.",
    mistakenFor: {
      slug: 'curious-advisor',
      name: 'Curious Advisor',
      tell: "Both dig deep and both arrive somewhere. You arrive at an ask. The Advisor arrives at a recommendation. If you're more likely to tell a buyer what you'd do than to ask them to decide, the Advisor is closer.",
    },
    adjacent: ['curious-advisor', 'curious-cultivator', 'curious-challenger'],
  },
  {
    slug: 'empathic-cultivator',
    name: 'Empathic Cultivator',
    trait: 'Empathic',
    style: 'Cultivator',
    tagline: 'You can feel an account cooling before anything shows up in the data.',
    metaDescription:
      'The Empathic Cultivator reads account health through people rather than usage data. Strengths, blind spots, and how this selling style wins. Take the free assessment.',
    intro: [
      "The Empathic Cultivator notices the temperature change. A champion's replies get shorter. Someone stops being copied. The QBR has one fewer person in it than last quarter, and you knew what that meant before the renewal flag went up.",
      "Account management rewards attention, and most of it goes to the numbers. Yours goes to the people, which is why you see a problem two months before it becomes a number.",
    ],
    strengths: [
      "You know an account is at risk while there's still time to do something about it.",
      'You can tell which stakeholder actually likes you and which one is being polite, and you plan around the difference.',
      'You sense when a champion has lost internal standing, which the usage data will never show.',
      "You're the first call when something goes wrong, because people would rather tell you than the support queue.",
    ],
    blindSpots: [
      "You can absorb an account's anxiety and carry it into your own week.",
      'You can read a slow reply as a signal when the person was just on vacation.',
      'You can protect a relationship with someone who no longer has any influence over the renewal.',
      'You can spend your attention where the feelings are hardest, not where the revenue is.',
    ],
    inTheDeal:
      "In a live deal, the Empathic Cultivator hears something off in a check-in call and raises it internally before the account has filed a single complaint. Six weeks later the save looks like luck. Nobody else in your company gets that warning — and the same sensitivity means you'll escalate three accounts that were fine, and spend the political capital you needed for the fourth.",
    sellsBestTo:
      "Accounts where relationships determine renewal more than features do, and organizations going through change that people feel before they announce. You struggle in accounts run purely on procurement metrics, where nobody's feelings enter the decision.",
    growthEdge:
      "Every Empathic Cultivator has an account they knew was fine and worried about anyway. The signal you read is real and it's also noisy, and there's no way to tell a real cooling from a bad month without checking. The accounts that worry you most are rarely the biggest ones. They're the ones you care about.",
    tension:
      "Empathy reads the account. Cultivating keeps you in it long enough to read it well. Neither instinct includes a threshold — nothing tells you which reading is worth acting on. A seller with less range would only notice the obvious signals, which is a crude filter but a filter. By Friday you've got six things you're keeping an eye on and no idea which one deserves Monday.",
    mistakenFor: {
      slug: 'empathic-advisor',
      name: 'Empathic Advisor',
      tell: "Both read people well and both stay close. You use it to protect the account. The Advisor uses it to tell buyers things. If people come to you for your take rather than because you noticed something, the Advisor is closer.",
    },
    adjacent: ['empathic-closer', 'curious-cultivator', 'devoted-connector'],
  },
  {
    slug: 'devoted-cultivator',
    name: 'Devoted Cultivator',
    trait: 'Devoted',
    style: 'Cultivator',
    tagline: "You've been in this account longer than most of the people in it.",
    metaDescription:
      'The Devoted Cultivator outlasts everyone and becomes the institutional memory of the account. Strengths, blind spots, and how this selling style wins. Take the free assessment.',
    intro: [
      "The Devoted Cultivator outlasts everyone. The champion who signed the original deal left two years ago. The exec sponsor changed twice. You're still there, and at this point you're the institutional memory for a company you don't work at.",
      "Most reps rotate. You didn't, and the compounding is real — you know what was tried in 2022 and why it failed, which nobody currently in the building does.",
    ],
    strengths: [
      "You know the account's history, including the failures that shape what they'll consider now.",
      'You survive leadership changes, because you were never dependent on one relationship.',
      'New stakeholders inherit you as a fixture rather than evaluating you as a vendor.',
      'You can predict what this account will say no to, which saves months on every expansion.',
    ],
    blindSpots: [
      'You can know an account so well you stop asking what changed.',
      'You can be the reason a bad fit renews for the fourth year.',
      "You can hold onto the account after it's clear the growth is gone, because leaving feels wrong.",
      'You can protect a relationship instead of a number, and mean it as a virtue.',
    ],
    inTheDeal:
      "In a live deal, the Devoted Cultivator tells a new VP why the thing they're about to propose failed here in 2022, and saves them a quarter. That's worth more than anything in the product, and it only exists because you stayed — which also means you've now spent four years in a territory where a rep who moved on would have opened three new accounts.",
    sellsBestTo:
      'Large stable accounts with long horizons and high switching costs. Organizations that churn people but not vendors. You struggle where growth requires new logos rather than deeper penetration, and in fast markets where history stops being relevant.',
    growthEdge:
      "Every Devoted Cultivator has an account that stopped growing and never got dropped. The knowledge is real and it's also sunk — what you know about 2022 has no value anywhere else. The accounts that reward loyalty and the accounts that just receive it look identical from the inside.",
    tension:
      "Devotion stays. Cultivating deepens. Both get better with time and neither has a stopping rule, so the account never reaches a point where you'd reconsider it. A rep who felt restless would leave some accounts too early and learn something from the ones that turned out fine without them. You never run that experiment.",
    mistakenFor: {
      slug: 'devoted-connector',
      name: 'Devoted Connector',
      tell: "Both stay for years and both go deep. Yours is about the account. The Connector's is about the people, including things that have nothing to do with the business. If you'd help a buyer with a problem that isn't yours, the Connector is closer.",
    },
    adjacent: ['devoted-connector', 'resilient-cultivator', 'devoted-student'],
  },
  {
    slug: 'resilient-cultivator',
    name: 'Resilient Cultivator',
    trait: 'Resilient',
    style: 'Cultivator',
    tagline: 'You stayed after the account went badly.',
    metaDescription:
      'The Resilient Cultivator survives the bad year and rebuilds the account from the other side. Strengths, blind spots, and how this selling style wins. Take the free assessment.',
    intro: [
      "The Resilient Cultivator survives the bad year. A failed implementation, a missed SLA, an exec who blames you personally — most reps quietly rotate off after that, and the account churns eighteen months later. You stayed, and the relationship that came out the other side is stronger than it ever was before it broke.",
      "Nothing in account management is harder than showing up to a meeting where you're unwelcome. You do it, and buyers remember who was there during the bad quarter.",
    ],
    strengths: [
      'You stay present through a failure, which is the single rarest behavior in account management.',
      'You take the angry call without going defensive, so the anger has somewhere to go.',
      "You can rebuild a relationship that's already been damaged, which most reps won't attempt.",
      'You keep accounts other reps would have written off as unrecoverable.',
    ],
    blindSpots: [
      'You can rebuild an account that was never going to renew regardless.',
      'You can absorb blame that belonged to product or support, and quietly carry it.',
      'You can get used to conditions a new rep would flag immediately.',
      'You can stay through a second failure that should have ended it.',
    ],
    inTheDeal:
      "In a live deal, the Resilient Cultivator shows up to the post-mortem nobody wanted them at, takes the hit, and is still the vendor eighteen months later when the same company expands. Almost nobody stays through that — and staying means you're the last one to notice when an account has genuinely become unwinnable, because you've been absorbing the evidence for a year.",
    sellsBestTo:
      "Accounts recovering from a real failure, and buyers who've been abandoned by a vendor mid-crisis. Long implementations where something always goes wrong. You struggle in clean fast-moving accounts where your tolerance never gets tested and offers no advantage.",
    growthEdge:
      "Every Resilient Cultivator has an account they saved and one they should have let go. The account that needs one more quarter and the account that's already gone feel exactly the same while you're sitting in them.",
    tension:
      "Resilience absorbs the damage. Cultivating keeps you in place. Both instincts point at staying, and the thing that would normally end a bad account — the rep's own unwillingness to keep showing up — never arrives. Other people's patience runs out and that's information. Yours doesn't, so you get none.",
    mistakenFor: {
      slug: 'resilient-closer',
      name: 'Resilient Closer',
      tell: "Both stay in uncomfortable rooms. You stay for years, in an account. The Closer stays for the length of a conversation, to get a decision. If your endurance shows up in a single meeting rather than across quarters, the Closer is closer.",
    },
    adjacent: ['resilient-hunter', 'devoted-cultivator', 'resilient-student'],
  },
  {
    slug: 'authentic-cultivator',
    name: 'Authentic Cultivator',
    trait: 'Authentic',
    style: 'Cultivator',
    tagline: 'Your accounts know exactly where they stand with you.',
    metaDescription:
      'The Authentic Cultivator refuses to run the QBR as theater. Strengths, blind spots, and how this selling style wins. Take the free assessment.',
    intro: [
      "The Authentic Cultivator won't run the QBR as theater. When the quarter was bad, you say it was bad. When the roadmap slipped, the customer hears it from you rather than from a release note, and the meeting is shorter and more useful than anyone expected.",
      "Account management is full of managed optimism. Yours isn't, which costs you the comfortable meeting and buys you a customer who believes what you tell them.",
    ],
    strengths: [
      "You deliver bad news yourself, before the customer finds it, which is why they trust the good news.",
      "Your QBRs are short, because there's no performance in them.",
      "You'll tell a customer they're not using the product well, which nobody else in the relationship will.",
      "You say no to a request you can't deliver instead of taking it back to a roadmap that won't include it.",
    ],
    blindSpots: [
      'You can deliver bad news to a room that needed it framed, and lose the point to the delivery.',
      'You can be so allergic to spin that you undersell a genuine win.',
      "You can volunteer a product weakness the customer wasn't thinking about.",
      'You can skip the relationship-building meeting because it feels like theater, and lose access.',
    ],
    inTheDeal:
      "In a live deal, the Authentic Cultivator opens a renewal conversation by naming the two things that went wrong this year before the customer does. The renewal usually gets easier, not harder. Very few vendors will do that. The renewal gets signed. The executive stops taking your calls.",
    sellsBestTo:
      "Technical customers and operators who can detect spin and resent it. Accounts that have been managed by someone polished and got burned. You struggle with executive stakeholders who want the relationship to feel good, and in political organizations where candor gets repeated in rooms you're not in.",
    growthEdge:
      "Being right and being heard have never been the same thing. A true thing held for two weeks is still true, and two weeks is often the difference between a customer hearing it and a customer defending against it. Waiting feels like the beginning of the thing you refuse to do.",
    tension:
      "Authenticity says it now. Cultivating wants the account healthy long-term. Those almost never conflict, which is why you've never had to develop a sense of timing. Most of the time the blunt answer works. That's why the one time it doesn't is easy to miss.",
    mistakenFor: {
      slug: 'authentic-advisor',
      name: 'Authentic Advisor',
      tell: "Both refuse to manage the message. You apply it to an account over time. The Advisor applies it to a decision in front of them. If your honesty shows up most when a buyer is choosing something, the Advisor is closer.",
    },
    adjacent: ['authentic-closer', 'authentic-advisor', 'devoted-cultivator'],
  },
  {
    slug: 'strategic-closer',
    name: 'Strategic Closer',
    trait: 'Strategic',
    style: 'Closer',
    tagline: 'You close the person who decides, not the person in the room.',
    metaDescription:
      'The Strategic Closer designs the path to signature in week two. Strengths, blind spots, and how this selling style wins. Take the free assessment.',
    intro: [
      "The Strategic Closer knows who has to say yes before asking anyone. The close isn't a moment at the end — it's the last step in a sequence you designed in week two, and by the time you ask, everyone who could block it has already been handled.",
      "Most closers work the person in front of them. You work the path to the signature, which is why your deals rarely die in legal and occasionally die because you were managing a process while a competitor was building a relationship.",
    ],
    strengths: [
      'You ask the person who can actually say yes, because you found them early.',
      "Your deals don't die in procurement, since you engaged procurement before you needed them.",
      'You know which stakeholder is a real blocker and which one just talks a lot.',
      'You close on the buyer timeline rather than your quarter, and get better terms for it.',
    ],
    blindSpots: [
      "You can run a perfect process past a buyer who'd have signed in week two.",
      'You can treat a stakeholder as an obstacle to route around and create a real one.',
      'You can be so committed to the sequence that you miss the moment the deal was closable.',
      "You can win on process against a competitor who won on relationship, right up until you don't.",
    ],
    inTheDeal:
      "In a live deal, the Strategic Closer spends six weeks getting a CFO comfortable before the CFO knows there's a deal, so the ask takes four minutes. Your win rate on complex deals is higher than anyone's — and the same approach means you're still sequencing stakeholders on a deal a transactional rep would have closed and moved on from.",
    sellsBestTo:
      "Committee purchases, enterprise cycles, anything where the person in the room isn't the person deciding. Regulated buyers with real procurement. You struggle with founder-led companies and fast deals where one person decides and wants to decide today.",
    growthEdge:
      "Every Strategic Closer has a deal they sequenced carefully and lost to someone who just asked. The process is why the hard deals close, and it runs the same way whether this deal needs it or not. There's no step in the sequence for noticing the buyer is already ready.",
    tension:
      "Strategic wants the path complete. Closing wants the decision. They agree on the destination and disagree about when, and strategy usually wins because a premature ask has a visible cost and a delayed one doesn't. The deals you lose this way never announce themselves — the buyer just gets quieter and signs with someone else.",
    mistakenFor: {
      slug: 'strategic-architect',
      name: 'Strategic Architect',
      tell: "Both map the org and both sequence carefully. You're building toward an ask. The Architect is building a structure that survives without one. If you'd rather the deal be inevitable than ask for it, the Architect is closer.",
    },
    adjacent: ['strategic-architect', 'strategic-hunter', 'strategic-connector'],
  },
  {
    slug: 'methodical-closer',
    name: 'Methodical Closer',
    trait: 'Methodical',
    style: 'Closer',
    tagline: 'Nothing surprises you at the end, because you checked.',
    metaDescription:
      'The Methodical Closer runs a close like a checklist and never gets surprised. Strengths, blind spots, and how this selling style wins. Take the free assessment.',
    intro: [
      "The Methodical Closer runs a close like a checklist. Legal has seen it, security is cleared, the signer's name is confirmed, and the mutual action plan has dates attached that both sides agreed to out loud. When you ask, there's nothing left to discover.",
      "Deals die in the last two weeks more than anywhere else, almost always from something nobody checked. Yours don't, and the tradeoff is that you're still checking on deals that were closable a month ago.",
    ],
    strengths: [
      'Your forecast is accurate, because you verified rather than assumed.',
      'You find the unsigned dependency in week four instead of week twelve.',
      "You confirm the signer before building the close around someone who can't sign.",
      'Your deals close on the date you said, which is rare enough that management notices.',
    ],
    blindSpots: [
      'You can run a full process on a deal that needed one conversation.',
      'You can confirm a detail the buyer had already confirmed, which reads as distrust.',
      'You can hold an ask until the checklist is clean and lose the moment the buyer was ready.',
      'You can build a plan the buyer agreed to in principle and never actually adopted.',
    ],
    inTheDeal:
      "In a live deal, the Methodical Closer asks in week three who signs and what their review process looks like, and the answer changes the entire timeline. Everyone else finds that out in week eleven. Nobody on your team gets surprised at the end of a quarter — and the deal that was ready in week four waited until week nine for a checklist that had nothing left to find.",
    sellsBestTo:
      "Enterprise and regulated buyers where the process is genuinely complicated and someone has to hold it. Buyers who don't know their own procurement. You struggle with SMB and transactional deals where the process is one email and your rigor reads as friction.",
    growthEdge:
      "Every Methodical Closer has a deal that was ready before the checklist was. The process is why your quarter is predictable, and it's also a set of steps with no exit condition — there's always one more thing that could be confirmed. The buyer decided three weeks ago. The checklist didn't.",
    tension:
      "Methodical wants everything verified. Closing wants the ask now. The conflict is real but it's uneven — an unverified risk has a name and a story attached, and a delayed ask has neither. So the ask waits. You've never lost a deal to a surprise and you can't say how many you've lost to the wait.",
    mistakenFor: {
      slug: 'methodical-architect',
      name: 'Methodical Architect',
      tell: "Both build process and both hate surprises. Yours is aimed at a signature. The Architect's is aimed at a deal structure that holds. If your best work is the mutual action plan rather than the close itself, the Architect is closer.",
    },
    adjacent: ['methodical-challenger', 'methodical-hunter', 'strategic-closer'],
  },
  {
    slug: 'empathic-hunter',
    name: 'Empathic Hunter',
    trait: 'Empathic',
    style: 'Hunter',
    tagline: "You can hear in the first two words whether the call has a chance.",
    metaDescription:
      "The Empathic Hunter reads a stranger's mood in the first seconds of a cold call and adjusts before the buyer decides. Strengths, blind spots, and how this selling style wins. Take the free assessment.",
    intro: [
      "The Empathic Hunter hears the prospect's day before they hear the pitch. A clipped hello, background noise, the half-second pause of someone reading an email while they talk. You adjust to what you hear, and the buyer gets a call that seems to know they're busy.",
      "Most cold calls are built for an average buyer who never picks up. You call the one who actually answered. That makes your conversations better than your numbers, and it makes the calls themselves harder on you than on the reps who don't notice any of it.",
    ],
    strengths: [
      "You offer to call back at the exact moment the buyer was about to hang up, and they take the offer.",
      "Your second calls start warmer than most reps' third meetings, because the buyer remembers you noticed.",
      "You catch the hesitation behind a polite 'send me something' and ask about it instead of sending something.",
      "Gatekeepers tell you more than they tell most reps, because you're one of the few callers who pauses long enough to hear the answer.",
    ],
    blindSpots: [
      "You'll end a call early that was going fine because you heard irritation that wasn't there.",
      "You let a stressed prospect off the hook on their worst day and never find the good day to call back.",
      "Call blocks drain you faster than anyone on the floor, and the dial count shows it by Thursday.",
      "A curt 'not interested' stays with you for the next five dials.",
    ],
    inTheDeal:
      "In a live deal, the Empathic Hunter hears the director say 'we're fine with our current vendor' in a voice that is plainly not fine, and asks what happened last quarter. The buyer tells you, because nobody else asked. That ear gets you into conversations other reps never reach. The bill arrives as fatigue: every dial registers, including the forty that went nowhere, and an hour of calls that looks light on the report cost you more than anyone's heavy one.",
    sellsBestTo:
      "Mid-level managers carrying a problem they haven't admitted upward yet. Buyers in stressful roles who have learned to screen out cheerful strangers. High-volume, tightly scripted SDR floors are harder terrain, since the script leaves no room to use what you hear.",
    growthEdge:
      "Every Empathic Hunter keeps a private list of calls they didn't make because the timing felt wrong. The list never gets called. Nobody on the team knows it exists, and the prospects on it are buying from someone who called on a bad day anyway.",
    tension:
      "Empathy notices the interruption. Hunting is interruption. Every cold call asks a stranger to stop what they're doing for you, and you feel that cost on their behalf in real time. Reps who don't feel it dial through it. You dial through it too, but you pay for every one, and by the end of a long block you're spending more on the call than the call is worth.",
    mistakenFor: {
      slug: 'authentic-hunter',
      name: 'Authentic Hunter',
      tell: "You adjust to whoever picked up. The Authentic Hunter says the same honest thing to everyone and lets it land where it lands. If your opener sounds identical on every call, the Authentic Hunter is the better read.",
    },
    adjacent: ['empathic-closer', 'curious-hunter', 'empathic-cultivator'],
  },
  {
    slug: 'devoted-hunter',
    name: 'Devoted Hunter',
    trait: 'Devoted',
    style: 'Hunter',
    tagline: "You prospect like the buyer is already your customer.",
    metaDescription:
      "The Devoted Hunter opens new accounts by treating strangers like customers from the first call. Strengths, blind spots, and how this selling style wins. Take the free assessment.",
    intro: [
      "The Devoted Hunter treats a cold prospect the way most reps treat a renewal. You listen longer than the call needs, you bring back a detail from discovery three months later, and you send the useful article with no ask attached. A stranger gets the service most buyers only get after they sign.",
      "That's rare in prospecting, where most effort goes to whoever is likeliest to buy this quarter. You give it to whoever is on the line. Buyers notice, and a surprising number come back when the timing turns, already treating you as their rep.",
    ],
    strengths: [
      "Prospects who said no a year ago call you first when the budget opens.",
      "Prospects forward your emails to colleagues with a note saying you're the rep they mentioned.",
      "You follow up with something useful instead of 'just checking in,' so your follow-ups get opened.",
      "Referrals arrive from people who never bought from you.",
    ],
    blindSpots: [
      "You spend forty minutes on a first call with a prospect who was never going to have budget.",
      "Dropping a dead lead feels like abandoning a customer, so you keep nurturing it.",
      "Your pipeline is full of people who like you and very few with a date.",
      "When a new logo closes, you'd rather hand-hold the onboarding than go find the next one.",
    ],
    inTheDeal:
      "In a live deal, the Devoted Hunter remembers that the prospect's team was short two people in March and opens the October call by asking whether they filled the roles. The buyer realizes you were listening when no deal was on the table. That memory earns a trust most hunters never get from a cold account. It also means every prospect you open becomes a relationship you feel responsible for, and a territory built that way gets heavier with every name you add.",
    sellsBestTo:
      "Buyers who have been burned by a rep who disappeared after signature. Long-cycle categories where the prospect watches how you behave for a year before buying. Where speed is the whole game, in short transactional cycles with price-driven buyers, the care you put into each call rarely gets repaid.",
    growthEdge:
      "Somewhere in your pipeline is a prospect you've been helping for over a year. You've sent the articles, made the intro, answered the question about their other vendor. They're grateful. Nobody has ever asked them when they plan to buy.",
    tension:
      "Devotion looks after the customers you have. Hunting goes after the ones you don't. Each conversation you open creates someone else to look after, and your instinct is to give them the same attention as the last. The hunter half keeps adding names. The devoted half keeps treating every name as a promise. Something has to give, and usually it's the dial count.",
    mistakenFor: {
      slug: 'resilient-hunter',
      name: 'Resilient Hunter',
      tell: "You keep calling because you think the product would help them. The Resilient Hunter keeps calling because the last no didn't register. If your follow-ups would continue after you'd stopped believing in the fit, the Resilient Hunter fits better.",
    },
    adjacent: ['devoted-cultivator', 'authentic-hunter', 'devoted-closer'],
  },
  {
    slug: 'adaptive-hunter',
    name: 'Adaptive Hunter',
    trait: 'Adaptive',
    style: 'Hunter',
    tagline: "You rewrite the sequence before anyone else notices it stopped working.",
    metaDescription:
      "The Adaptive Hunter treats prospecting as a live experiment, changing openers and channels faster than buyers learn to ignore them. Strengths, blind spots, and how this selling style wins. Take the free assessment.",
    intro: [
      "The Adaptive Hunter runs prospecting as an ongoing experiment. A new opener on Monday, a different subject line on Wednesday, LinkedIn voice notes the week everyone else discovers them. When reply rates dip, you've usually already moved on.",
      "In a market where buyers learn to ignore every pattern within a quarter, that speed matters. You're rarely the rep running last year's playbook. You're also rarely the rep who can say, with numbers, which change actually worked.",
    ],
    strengths: [
      "You find the channel that's working this month while the team is still arguing about last month's.",
      "A territory change or a new ICP barely slows you down. Your outreach is rebuilt by Friday.",
      "Buyers rarely get the same template from you that they got from three other reps that morning.",
      "Other reps borrow your openers, usually about two months after you stopped using them.",
    ],
    blindSpots: [
      "You kill a sequence after two weeks that would have worked at six.",
      "Your CRM holds five versions of your outreach and no clean data on any of them.",
      "You chase the new tool before you've finished learning the last one.",
      "Managers can't coach what you're doing, because by the one-on-one it has changed.",
    ],
    inTheDeal:
      "In a live deal, the Adaptive Hunter notices the prospect ignored two emails and replied within minutes to a LinkedIn comment, and moves the whole conversation there by the afternoon. You go where the buyer is actually paying attention, which keeps you ahead of most prospects' filters. The cost shows up later, when your manager asks which part of your approach to roll out to the team and the honest answer is that you don't know.",
    sellsBestTo:
      "Fast-moving markets where buyer behavior shifts every few months, and new categories nobody has a proven playbook for yet. Startups that need a rep to find the motion rather than run one. Mature enterprise territories reward the rep who runs a known play patiently, and patience is exactly what you're short on.",
    growthEdge:
      "Every Adaptive Hunter has a sequence they abandoned in week two and later watched a teammate run successfully in month three. It was the same sequence. The teammate just kept sending it.",
    tension:
      "Adapting and hunting both point forward. One wants the next approach, the other wants the next conversation, and neither ever looks back at the last one. Nothing in your wiring asks for a result before the change. The rep who waits thirty days for the data is rarely excited, and usually right.",
    mistakenFor: {
      slug: 'methodical-hunter',
      name: 'Methodical Hunter',
      tell: "The Methodical Hunter changes a sequence when the numbers say to. You change it when it starts to feel stale, which is usually sooner. If you can show the reply-rate data behind your last three changes, the Methodical Hunter describes you more accurately.",
    },
    adjacent: ['adaptive-student', 'strategic-hunter', 'adaptive-cultivator'],
  },
  {
    slug: 'authentic-closer',
    name: 'Authentic Closer',
    trait: 'Authentic',
    style: 'Closer',
    tagline: "Your close sounds like a question, because it is one.",
    metaDescription:
      "The Authentic Closer asks for the decision plainly, with no technique a buyer can detect. Strengths, blind spots, and how this selling style wins. Take the free assessment.",
    intro: [
      "The Authentic Closer asks for the business the way you'd ask a colleague for a decision. No assumptive close, no deadline you invented, no discount held back for the final call. You say what you think they should do and ask if they're ready to do it.",
      "Buyers have been closed on by professionals. They know the moves. When the ask comes without any of them, they tend to answer it straight, including when the answer is no. That honesty is the whole engine, and it runs in both directions.",
    ],
    strengths: [
      "Buyers tell you the real objection, because nothing in your ask invited a polite fake one.",
      "Your forecast holds up, since a yes from your buyers was a real yes.",
      "When waiting a quarter is the right call, you say so, and the buyer comes back when it's time.",
      "Procurement has less to push on, because your pricing never had room built in for theater.",
    ],
    blindSpots: [
      "You refuse the end-of-quarter discount on principle even when it was the honest price to begin with.",
      "Some buyers needed a nudge and read your plainness as indifference.",
      "You'll name the product's weakness at the moment of close, which is honest and occasionally unnecessary.",
      "Deadlines feel manipulative to you, so real ones go unmentioned too.",
    ],
    inTheDeal:
      "In a live deal, the Authentic Closer tells the buyer the implementation will take longer than the slide says and asks for the signature in the same breath. The buyer signs, because the one person who delivered the bad news is the one they now believe about everything else. No technique produces that kind of credibility. You also walk into every close with one fewer tool than the rep across the table, and some deals go to whoever pushed harder.",
    sellsBestTo:
      "Experienced buyers who can smell a technique from the first slide. Technical evaluators and finance leaders who reward precision. Deals where a champion has to defend the purchase internally and your word becomes theirs. Buyers who use pressure as proof the decision matters find you harder to buy from.",
    growthEdge:
      "At some point you lose a deal to a rep who used a deadline you wouldn't have used. The buyer didn't need the pressure to be fake. They needed a reason to decide this month, and a real one existed that nobody mentioned.",
    tension:
      "Closing is where most of the tricks in sales live. Authenticity won't use any of them. You want the decision as much as any closer, but every tool built to get it feels like a small lie, so you reach for the plainest version or none at all. The deals you close are clean. The ones you lose went to someone willing to do the thing you'd call manipulative and they'd call follow-through.",
    mistakenFor: {
      slug: 'authentic-advisor',
      name: 'Authentic Advisor',
      tell: "You tell the buyer to buy, plainly. The Advisor is just as likely to tell them not to. If you've talked more buyers out of a purchase than into one this year, read the Advisor.",
    },
    adjacent: ['authentic-hunter', 'devoted-closer', 'empathic-closer'],
  },
  {
    slug: 'adaptive-closer',
    name: 'Adaptive Closer',
    trait: 'Adaptive',
    style: 'Closer',
    tagline: "You change the ask in the room, and the deal closes anyway.",
    metaDescription:
      "The Adaptive Closer rebuilds the offer mid-meeting to fit what the buyer just revealed. Strengths, blind spots, and how this selling style wins. Take the free assessment.",
    intro: [
      "The Adaptive Closer walks into the final meeting with one proposal and walks out with another. The CFO raises a concern nobody mentioned in discovery, and you restructure the term, the phasing, or the scope on the whiteboard before the meeting ends.",
      "Most closers defend the proposal they brought. You treat it as a first draft. That flexibility saves deals that would have died in the room. It also leaves some buyers unsure which version they're actually being asked to sign.",
    ],
    strengths: [
      "Late objections don't stall you, since you were never attached to the original structure.",
      "You find the phased deal that gets a nervous buyer to yes this quarter instead of maybe next year.",
      "Stakeholders who appear at the end get an offer built for them, not for someone who left the committee.",
      "A lost deal changes how you run the next close, often within the week.",
    ],
    blindSpots: [
      "You rework a proposal the buyer had already accepted and reopen a question that was closed.",
      "Buyers notice the offer moves and start wondering how far it will go.",
      "Your deal desk dreads you, because every deal you bring is custom.",
      "Your last three wins look nothing alike, which makes them hard to repeat.",
    ],
    inTheDeal:
      "In a live deal, the Adaptive Closer hears the COO say rollout timing is the real problem and splits the contract into two phases before the meeting ends. The buyer signs a smaller first phase that afternoon. Few sellers can rebuild an offer that fast under pressure. The cost comes later, when finance asks about the precedent and the next buyer in that segment asks for the same structure.",
    sellsBestTo:
      "Complex buying committees where the real decision-maker surfaces late. Deals that change shape during the cycle because the buyer's business is changing too. Fixed-price, standard-contract environments take away the one move you're best at, and procurement teams who want a single stable offer find you tiring.",
    growthEdge:
      "Every Adaptive Closer has a deal where the buyer was ready to sign the original proposal and got an improved one instead. The new version was better. It also needed another round of approvals, and the quarter ended while it was getting them.",
    tension:
      "You're asking the buyer to commit to something you're still willing to change, and some of them can hear it. Closing wants the terms fixed. Adapting keeps finding a better version of what they'd be signing, and the better version is always one meeting away.",
    mistakenFor: {
      slug: 'curious-closer',
      name: 'Curious Closer',
      tell: "The Curious Closer asks one more question and then asks for the deal as planned. You ask one more question and then change the deal. If your final proposal usually matches the one you walked in with, the Curious Closer is closer to you.",
    },
    adjacent: ['adaptive-advisor', 'resilient-closer', 'methodical-closer'],
  },
  {
    slug: 'methodical-cultivator',
    name: 'Methodical Cultivator',
    trait: 'Methodical',
    style: 'Cultivator',
    tagline: "Every account gets its review on the date you set a year ago.",
    metaDescription:
      "The Methodical Cultivator grows accounts through a planned cadence of reviews, check-ins, and expansion plays. Strengths, blind spots, and how this selling style wins. Take the free assessment.",
    intro: [
      "The Methodical Cultivator runs account management as a system. Every customer has a plan, every plan has dates, and the quarterly review happens on schedule whether the account is thriving or quiet. Nothing slips, because nothing depends on you remembering.",
      "Most account growth happens by accident, when a rep calls at the right moment. Yours happens on purpose. The catch is that a system runs every account on the same clock, and relationships don't always keep time.",
    ],
    strengths: [
      "Your renewals never arrive as a surprise, because the conversation started ninety days out.",
      "You spot the account that stopped expanding in the usage data before the customer mentions it.",
      "A new rep could take over your book on Monday and know exactly where each account stands.",
      "Small accounts don't disappear in your book, which is how some of them become big ones.",
    ],
    blindSpots: [
      "Your check-in lands the same week the customer's CEO resigned, because it was on the calendar.",
      "Customers can tell when a call exists because the plan said so.",
      "An account in trouble gets its next scheduled touch instead of an unscheduled one today.",
      "Relationship health lives in CRM fields that can't show how the champion feels about you.",
    ],
    inTheDeal:
      "In a live deal, the Methodical Cultivator opens the expansion conversation with a usage report showing which team adopted fastest and which never logged in. The buyer sees their own account more clearly than their internal team does. Discipline like that turns steady accounts into growing ones. What it costs is spontaneity: the customer who calls with a sudden problem reaches a rep whose week is already allocated, and gets the next open slot.",
    sellsBestTo:
      "Large books of business with more accounts than any rep can track from memory. Customers in regulated or process-heavy industries, who respect a vendor that runs to a plan. Founder-led companies where decisions happen over text at 9 p.m. are rougher going, since nothing about how they buy fits a quarterly cadence.",
    growthEdge:
      "Every Methodical Cultivator has a customer who churned with every scheduled touch completed. The QBRs happened, the check-ins were logged, the health score was green. The champion had been unhappy for six months and said so to someone who wasn't on the calendar.",
    tension:
      "Method runs on a schedule. Cultivating runs on timing, and the two rarely line up. The plan says the account is due for a review in March. The relationship needed you in January, when the champion's boss left, and nothing in the plan had a field for that.",
    mistakenFor: {
      slug: 'devoted-cultivator',
      name: 'Devoted Cultivator',
      tell: "Your accounts get a review on the date you scheduled. The Devoted Cultivator's get a call the day something goes wrong. If your best account moments came from unplanned calls, the Devoted Cultivator describes you more accurately.",
    },
    adjacent: ['methodical-closer', 'devoted-cultivator', 'methodical-architect'],
  },
  {
    slug: 'strategic-cultivator',
    name: 'Strategic Cultivator',
    trait: 'Strategic',
    style: 'Cultivator',
    tagline: "You know which account will be your biggest in three years, and you're already working it.",
    metaDescription:
      "The Strategic Cultivator grows accounts toward a plan, working the next expansion before the customer sees it coming. Strengths, blind spots, and how this selling style wins. Take the free assessment.",
    intro: [
      "The Strategic Cultivator runs an account like a map. You know which division has budget next year, which VP is about to be promoted, and which product line the customer will need once the current rollout lands. The small deal you closed last spring was chosen because of where it leads.",
      "Most account managers grow what's in front of them. You grow toward something. That's why your accounts compound. It's also why a customer occasionally senses they're a step in a plan rather than the point of it.",
    ],
    strengths: [
      "You can name the next three expansions in your biggest account and the person who'll sign each one.",
      "You spot the reorg in a customer's press release and meet the new owner before your competitor knows there is one.",
      "Your land deals are small on purpose, placed where the second deal will be easy.",
      "You know the customer's fiscal calendar better than some of their own managers do.",
    ],
    blindSpots: [
      "The champion who helped you land the account gets less of your time once the map says the budget is elsewhere.",
      "Accounts that won't grow get serviced, not cultivated, and they can tell.",
      "You invest a year in the department that's supposed to buy and miss the one that was ready.",
      "Your plan assumes the customer's strategy holds, and customer strategies rarely hold for three years.",
    ],
    inTheDeal:
      "In a live deal, the Strategic Cultivator uses a routine renewal call to ask about the acquisition the customer announced in March, and leaves with an introduction to the acquired company's head of sales. The renewal becomes the entry point to a second business. Few account managers think three moves ahead inside a customer. The same foresight rations your attention, and the contacts who don't feature in the next move feel the drop.",
    sellsBestTo:
      "Large, complex customers with several business units and a history of buying across them. Companies in growth or acquisition mode, where the org chart changes faster than the vendor list. A single-product customer with one buyer and no room to expand gives your planning nothing to work on, and those accounts get your least interesting quarters.",
    growthEdge:
      "Somewhere in your book is the person who championed you in year one. They still take your calls. They've also noticed the calls got shorter around the time their department stopped being where the budget was.",
    tension:
      "Strategy decides where your time goes. Cultivating assumes you'll stay with the people already there. The map tells you to move toward next year's budget, but the relationship was built with this year's champion, who is still sitting there. You move, because the plan is usually right, and the relationship you left behind is the part of the account nobody measures.",
    mistakenFor: {
      slug: 'strategic-hunter',
      name: 'Strategic Hunter',
      tell: "The Strategic Hunter's account map is covered in logos. Yours is covered in departments of a customer you already have. If most of your best deals were first deals, the Hunter page is the one to read.",
    },
    adjacent: ['strategic-architect', 'methodical-cultivator', 'strategic-student'],
  },
  {
    slug: 'curious-challenger',
    name: 'Curious Challenger',
    trait: 'Curious',
    style: 'Challenger',
    tagline: "Your questions lead somewhere, and the buyer arrives there thinking it was their idea.",
    metaDescription:
      "The Curious Challenger builds the reframe out of the buyer's own answers, so the insight feels like theirs. Strengths, blind spots, and how this selling style wins. Take the free assessment.",
    intro: [
      "The Curious Challenger builds the reframe out of the buyer's own answers. You ask how they measure the problem, what it cost last year, and who else feels it. By the fourth question the buyer is describing a different problem than the one they called you about.",
      "Most challengers bring the insight with them. You collect it in the room. Buyers trust a conclusion they reached out loud more than one they were shown, which is the whole advantage. The same patience means the challenge sometimes arrives after the meeting has run out of time.",
    ],
    strengths: [
      "Buyers defend your reframe to their own team, because they remember saying it first.",
      "You find the problem behind the stated problem without ever telling the buyer they got it wrong.",
      "Skeptical executives stay in the conversation longer, since every question is about their business.",
      "When a buyer pushes back, you answer with a question, and the objection usually weakens on its own.",
    ],
    blindSpots: [
      "Sharp buyers spot the destination three questions early and start answering defensively.",
      "You run out of meeting before you make the point the questions were building toward.",
      "Some buyers wanted your opinion and got a quiz.",
      "A reframe you collected can't be reused, so you rebuild it from scratch every deal.",
    ],
    inTheDeal:
      "In a live deal, the Curious Challenger asks a head of operations how many of last quarter's escalations traced back to one handoff, waits while they count, and watches them realize it was most of them. The buyer now owns the insight. No slide lands like that. The method is slow, though, and in a thirty-minute slot the counting sometimes uses the time the decision needed.",
    sellsBestTo:
      "Analytical buyers who distrust conclusions they didn't reach themselves. Operations and finance leaders who know their numbers and enjoy being made to use them. Executives who want the answer in the first five minutes get impatient with your method before it pays off.",
    growthEdge:
      "At least once a quarter you walk out of a meeting where the buyer was one question away from the reframe. You had the question ready. The meeting ended, the follow-up got pushed, and by the next call the buyer had moved on to a different problem.",
    tension:
      "Curiosity wants to hear what the buyer thinks. Challenging means telling them they're wrong about it. You manage the conflict by asking questions that lead where you'd have argued, which works until a buyer realizes you've been leading them to the same conclusion for fifteen minutes. At that point you either say the thing plainly or keep asking, and your instinct is to keep asking.",
    mistakenFor: {
      slug: 'curious-advisor',
      name: 'Curious Advisor',
      tell: "The Curious Advisor's questions end in a recommendation the buyer can take or leave. Yours end in an argument you intend to win. If you're comfortable when a buyer ignores your advice, the Curious Advisor is the better match.",
    },
    adjacent: ['strategic-challenger', 'curious-closer', 'curious-hunter'],
  },
  {
    slug: 'methodical-challenger',
    name: 'Methodical Challenger',
    trait: 'Methodical',
    style: 'Challenger',
    tagline: "You bring the buyer's own numbers, and they can't argue with them.",
    metaDescription:
      "The Methodical Challenger reframes the buyer's problem with their own numbers, benchmarked and sourced. Strengths, blind spots, and how this selling style wins. Take the free assessment.",
    intro: [
      "The Methodical Challenger reframes with evidence. Before the meeting you've benchmarked the buyer against their peers, rebuilt their funnel from public data, and found the stage where they lose the most. The challenge isn't an opinion. It's a spreadsheet with their name at the top.",
      "Buyers can dismiss a point of view. They have a harder time dismissing their own metrics laid out in order. That makes your reframes unusually durable. It also makes some meetings feel less like a conversation than an audit.",
    ],
    strengths: [
      "Your business cases survive the CFO, because every number in them has a source.",
      "You find the gap between the buyer's stated priority and where their money actually goes.",
      "The buyer's analyst asks for your spreadsheet after the meeting so they can check it against their own.",
      "Your reframe holds up weeks later, when the enthusiasm from the meeting has worn off and only the numbers are left.",
    ],
    blindSpots: [
      "You present forty slides of proof to a buyer who agreed on slide six.",
      "A buyer who feels audited defends their numbers instead of fixing them.",
      "When the data is incomplete, you wait for better data instead of making the argument.",
      "Your analysis answers the question you prepared for, not the one the executive walked in with.",
    ],
    inTheDeal:
      "In a live deal, the Methodical Challenger shows a sales VP that their win rate drops by half once a deal passes sixty days, using their own CRM export. The VP forwards the slide to the CEO before the meeting ends. Evidence that specific is hard to ignore and harder to forget. It takes weeks to build, though, and a competitor with a looser argument sometimes gets there first.",
    sellsBestTo:
      "Data-literate buyers in finance, operations, and revenue leadership. Companies that run on metrics and have enough history to analyze. Early-stage companies with thin data give you little to build with, and buyers who decide on instinct find the preparation slow.",
    growthEdge:
      "Most Methodical Challengers can recall a meeting where the buyer said yes and they kept presenting. The remaining slides were good. Two of them raised a question the buyer hadn't thought of, and the deal went back to legal for a month.",
    tension:
      "Method and challenge both run on proof. One wants the process documented, the other wants the argument airtight, and neither ever tells you the case is finished. There's always another benchmark, another cut of the data. The buyer was convinced two exhibits ago. Nothing in you registers that moment, so you keep building a case that's already won.",
    mistakenFor: {
      slug: 'methodical-architect',
      name: 'Methodical Architect',
      tell: "The Methodical Architect's analysis stays inside your company and becomes the playbook. Yours goes on the buyer's screen with their name on it. If your best spreadsheets were built for your own team, that's the Architect.",
    },
    adjacent: ['strategic-challenger', 'methodical-closer', 'methodical-hunter'],
  },
  {
    slug: 'resilient-challenger',
    name: 'Resilient Challenger',
    trait: 'Resilient',
    style: 'Challenger',
    tagline: "The buyer pushes back, and you make the argument again, better.",
    metaDescription:
      "The Resilient Challenger holds a reframe through senior pushback and brings it back with a sharper case. Strengths, blind spots, and how this selling style wins. Take the free assessment.",
    intro: [
      "The Resilient Challenger doesn't lose the thread when a senior buyer says no. You come back to the second meeting with the same reframe and a sharper case, and to a third if you need it. Pushback reads to you as the start of the conversation.",
      "Most sellers drop a challenge the first time an executive frowns at it. You're still standing behind yours a month later. Some buyers respect that more than anything else in the process. Others were right the first time, and you took a month to find out.",
    ],
    strengths: [
      "You hold your position when a C-level buyer leans back and crosses their arms.",
      "A rejected reframe comes back with better evidence instead of disappearing.",
      "You'll challenge the incumbent vendor's champion in the room they control.",
      "Your manager sends you into the accounts where the last rep got shouted out of the room.",
    ],
    blindSpots: [
      "A buyer's considered no sounds to you like a first objection.",
      "You win the argument in the third meeting and lose the relationship in the second.",
      "You keep pressing the same reframe after the buyer's circumstances have made it wrong.",
      "Colleagues stop warning you about hostile stakeholders, because the warning never changes what you do.",
    ],
    inTheDeal:
      "In a live deal, the Resilient Challenger hears a CFO call the business case 'optimistic' in front of the committee and asks for twenty minutes the following week to walk through the assumptions line by line. The CFO agrees, mostly out of surprise. Most sellers never get that second hearing because they never ask for it. The same persistence spends goodwill, and on the deals where the buyer's no was final, you spend it with nothing to show.",
    sellsBestTo:
      "Senior buyers who test vendors with early pushback and respect the ones who hold. Committees with a skeptic who has to be won over rather than routed around. Buyers who say no once and mean it, and read a second attempt as not listening, are where your persistence costs the most.",
    growthEdge:
      "Every Resilient Challenger has a deal they re-pitched three times to a buyer who had already made up their mind. The argument got better each time. The answer never changed, and the account you could have been prospecting that month sat untouched.",
    tension:
      "Resilience makes a no hurt less. Challenging invites no's on purpose. Together they remove the signal most sellers rely on to back off, which is the sting of rejection. Pushback doesn't cost you anything, so it doesn't tell you anything either. You can't easily separate the buyer testing your conviction from the buyer telling you the answer.",
    mistakenFor: {
      slug: 'resilient-closer',
      name: 'Resilient Closer',
      tell: "The Resilient Closer stays in the uncomfortable room to get a signature. You stay to win the point, and sometimes the point is all you walk out with. If the discomfort you push through is usually about price and timing rather than ideas, read the Closer.",
    },
    adjacent: ['resilient-hunter', 'strategic-challenger', 'empathic-challenger'],
  },
  {
    slug: 'authentic-challenger',
    name: 'Authentic Challenger',
    trait: 'Authentic',
    style: 'Challenger',
    tagline: "You tell the buyer what you'd tell your own company, and you don't dress it up.",
    metaDescription:
      "The Authentic Challenger delivers the uncomfortable truth in plain words, with no staging and no insight deck. Strengths, blind spots, and how this selling style wins. Take the free assessment.",
    intro: [
      "The Authentic Challenger says the uncomfortable thing in the words you'd use over a beer. No insight deck, no teaching sequence, no carefully staged moment. When you see that the buyer's plan won't work, you say so and explain why in plain language.",
      "Nothing about your challenge is choreographed, and that's why buyers believe it. The trade is that an unstaged challenge has no setup, so it sometimes arrives before the buyer has any reason to take it seriously.",
    ],
    strengths: [
      "Buyers take your challenge as a straight opinion rather than a sales move, because it has no packaging.",
      "You'll say the uncomfortable thing about the buyer's own team when nobody else in the process will.",
      "Executives call you before other vendors when they want an honest read on a decision.",
      "Your reframes don't collapse under a follow-up question, since nothing in them was performed.",
    ],
    blindSpots: [
      "You skip the groundwork and deliver the conclusion to a buyer who hasn't seen any of the evidence.",
      "Plain language lands as bluntness with a VP who needed the point made more carefully.",
      "You refuse to build the deck, and the champion has nothing to take to their boss.",
      "The truth you told the champion in private travels up the org without the context you gave it.",
    ],
    inTheDeal:
      "In a live deal, the Authentic Challenger tells a buyer that the vendor they're about to replace is fine and their real problem is the process around it, knowing the answer shrinks the deal. The buyer rescopes, buys less, and trusts you with the next decision entirely. Few sellers are believed that completely. What you give up is the staging that makes a reframe travel, and a truth with no deck behind it rarely reaches the people who sign.",
    sellsBestTo:
      "Executives surrounded by people who tell them what they want to hear. Founders and owners who make the decision themselves and value a straight answer. Large committees are harder, since your challenge has to be repeated by people who didn't hear how you said it.",
    growthEdge:
      "You've probably watched another challenger win a deal with an argument you made first. Theirs had a deck, a benchmark, and a story. Yours was a sentence in a hallway. The buyer remembered both, and could only forward one of them.",
    tension:
      "Challenging, done professionally, is staged. There's a setup, a teaching moment, a reveal. You deliver the reveal without the setup, the way you'd tell a friend. That makes the challenge believable and hard to carry, because the buyer has to reconstruct your reasoning to repeat it to anyone else.",
    mistakenFor: {
      slug: 'authentic-advisor',
      name: 'Authentic Advisor',
      tell: "The Advisor says the hard thing and leaves the buyer to decide what to do with it. You say it and then ask them to act. If your honest opinions usually end without a next step, start with the Advisor.",
    },
    adjacent: ['authentic-closer', 'authentic-hunter', 'strategic-challenger'],
  },
  {
    slug: 'adaptive-challenger',
    name: 'Adaptive Challenger',
    trait: 'Adaptive',
    style: 'Challenger',
    tagline: "You drop a wrong thesis faster than anyone, including in the middle of the meeting.",
    metaDescription:
      "The Adaptive Challenger rebuilds the reframe mid-meeting when the buyer's facts break it. Strengths, blind spots, and how this selling style wins. Take the free assessment.",
    intro: [
      "The Adaptive Challenger walks in with a point of view and holds it only as long as it survives the room. When the CFO produces a number that breaks your reframe, you acknowledge it, rebuild the argument on the new fact, and keep going. Your thesis at the end of the meeting is rarely the one you brought.",
      "Most challengers defend their insight past the point it's useful. You update, which keeps your reframes current and rarely leaves you embarrassed. Buyers also notice that your position moved once, and some of them start pushing to see if it moves again.",
    ],
    strengths: [
      "Your reframes reflect this quarter's market, not last year's pitch deck.",
      "A fact that breaks your argument makes it better instead of ending the meeting.",
      "You're the first on your team to notice a talk track has stopped landing, and the first to replace it.",
      "Buyers trust your challenge more after watching you concede a point you were wrong about.",
    ],
    blindSpots: [
      "You concede to a confident buyer who was wrong, because conceding comes easier to you than holding.",
      "Your position shifts often enough that the champion can't repeat it to their boss.",
      "The buyer who pushed once learns to push again.",
      "You keep refining the reframe after the committee needed one version to vote on.",
    ],
    inTheDeal:
      "In a live deal, the Adaptive Challenger opens with a thesis about the buyer's churn, hears the head of customer success explain that churn is fine and expansion is the real problem, and rebuilds the pitch around expansion before the hour is up. The buyer feels heard and challenged in the same meeting. That combination is rare. It also teaches the room that your conviction has give in it, and in a negotiation that's exactly what procurement goes looking for.",
    sellsBestTo:
      "Fast-changing markets where last year's insight is already stale. Buyers who respect a seller who can say they were wrong. Committees that need one fixed argument to rally around are harder, since the version you pitched in the first meeting is rarely the one you'd defend in the fourth.",
    growthEdge:
      "Every Adaptive Challenger has conceded a point in a meeting and found out a week later that their original read was correct. The buyer had sounded certain. The data, when someone finally pulled it, was on your side.",
    tension:
      "Challenging needs conviction. Adapting treats every conviction as provisional. You hold a thesis firmly enough to say it out loud and loosely enough to trade it for a better one, and buyers can't always tell which grip they're seeing. Neither can you, in the moment, which is why some concessions age well and some don't.",
    mistakenFor: {
      slug: 'strategic-challenger',
      name: 'Strategic Challenger',
      tell: "The Strategic Challenger's reframe usually leaves the meeting in the shape it arrived. Yours rarely does. If your thesis usually leaves the meeting intact even after it's taken damage, the Strategic Challenger is your page.",
    },
    adjacent: ['adaptive-closer', 'adaptive-student', 'empathic-challenger'],
  },
  {
    slug: 'devoted-challenger',
    name: 'Devoted Challenger',
    trait: 'Devoted',
    style: 'Challenger',
    tagline: "You argue with the buyer's plan because you'll be there when it fails.",
    metaDescription:
      "The Devoted Challenger pushes back on a buyer's plan out of loyalty to what happens after signature. Strengths, blind spots, and how this selling style wins. Take the free assessment.",
    intro: [
      "The Devoted Challenger argues with a buyer about the rollout, the scope, or the timeline, and the argument is never about winning the deal. You've watched what happens to customers who implement the plan they walked in with, and you'd rather have the fight now than the support tickets later.",
      "Buyers can tell the difference between a seller challenging them to close and a seller challenging them because they care how it goes. With you it's the second, which is why they listen. When they don't listen, you implement their version anyway and work to make it succeed.",
    ],
    strengths: [
      "You push back on a scope that will fail at implementation, even when the bigger scope is the bigger deal.",
      "Customers hear your challenge as advocacy, because it's always about what happens to them after signature.",
      "Your reframes come with a plan for getting through the first ninety days.",
      "Champions bring you into their internal arguments, since you'll say to their boss what they can't.",
    ],
    blindSpots: [
      "You lose the argument about the rollout plan, then spend weekends making the plan you opposed work.",
      "When the buyer's version succeeds with your help, nobody remembers you argued against it.",
      "You challenge the buyer's timeline and let your own deal slip a quarter to prove the point.",
      "A customer who rejects your advice gets the same effort as one who took it.",
    ],
    inTheDeal:
      "In a live deal, the Devoted Challenger tells a buyer that rolling out to all six regions at once will bury their support team, and proposes starting with two. The buyer's VP wants the big launch. You lose the argument, then build the six-region rollout plan yourself so it has a chance. That loyalty keeps customers for years. It also teaches some of them that your objections are optional, because you'll make their plan work either way.",
    sellsBestTo:
      "Buyers making a consequential purchase for the first time, who need someone to tell them what goes wrong in month three. Long-term customers who have seen you be right before. Buyers shopping for a vendor to execute a decision they've already made rarely want the argument, and you rarely win them.",
    growthEdge:
      "There's usually one customer where you argued against the plan, lost, and made it work anyway. It went well. At the renewal the buyer credited their own decision, and the next time you pushed back on something, they remembered you'd come around last time.",
    tension:
      "Devotion serves the customer's plan. Challenging tells them the plan is wrong. You do both, in sequence: argue hard, lose, then serve the plan you argued against as if it were yours. Buyers get your best objection and your best effort, which is generous. It also means the objection never costs them anything to ignore.",
    mistakenFor: {
      slug: 'empathic-challenger',
      name: 'Empathic Challenger',
      tell: "The Empathic Challenger pushes because they can tell the buyer can take it. You push because you've seen what happens to buyers who don't hear it. If your challenges come from reading the person rather than the rollout, start with the Empathic Challenger.",
    },
    adjacent: ['devoted-advisor', 'empathic-challenger', 'devoted-closer'],
  },
  {
    slug: 'methodical-advisor',
    name: 'Methodical Advisor',
    trait: 'Methodical',
    style: 'Advisor',
    tagline: "You give the buyer a way to decide, not just an answer.",
    metaDescription:
      "The Methodical Advisor turns a complex purchase into a decision the buyer can make, with criteria, scoring, and a sequence. Strengths, blind spots, and how this selling style wins. Take the free assessment.",
    intro: [
      "The Methodical Advisor turns a messy purchase into a decision the buyer can actually make. By the second meeting you've given them evaluation criteria, a scoring sheet, and a sequence for getting sign-off. The buyer stops feeling lost in the category, because you've handed them a way out of it.",
      "Buyers facing a complex decision are usually short on structure, not information. You supply the structure, and they trust you for it. The structure also has edges, and a buyer whose situation doesn't fit it sometimes gets a clean recommendation for the wrong problem.",
    ],
    strengths: [
      "Buyers send you the criteria doc they wrote from your framework and ask whether they got it right.",
      "Buyers stuck between three vendors leave your meeting knowing how they'll choose.",
      "Your recommendations come with an implementation sequence, so nobody has to invent the next step.",
      "Committees move faster with you, since every member is working from the same criteria.",
    ],
    blindSpots: [
      "The buyer's unusual constraint has no row in your scorecard, so it doesn't get weighed.",
      "You start the framework before you've heard what's different about this buyer.",
      "A buyer who decides on gut feel reads your process as homework.",
      "Your advice for a hospital and your advice for a software company look suspiciously alike.",
    ],
    inTheDeal:
      "In a live deal, the Methodical Advisor walks a buying committee through a weighted scoring model in the second meeting, and by the third the committee has adopted it as their own evaluation. The deal now runs on your structure. That is enormous influence, quietly held. It also means that when the buyer's real concern is something the model doesn't measure, like whether their team will actually use the thing, nobody in the room is looking for it.",
    sellsBestTo:
      "Committees that have never bought in this category and don't know how to compare vendors. Regulated buyers who need to document why they chose what they chose. Buyers who already know what they want and need a partner rather than a process tend to find your structure slows them down.",
    growthEdge:
      "At least one scorecard you built produced a clear winner that the customer churned from within a year. Every criterion was met. The one that mattered, whether the team actually liked using it, never had a row.",
    tension:
      "Method wants a process that works for every buyer. Advising means working out what this buyer needs. The framework makes you fast and consistent, and it arrives before you've finished listening. Each buyer gets a good version of the standard recommendation, and the ones whose situation isn't standard rarely notice what the process left out.",
    mistakenFor: {
      slug: 'methodical-cultivator',
      name: 'Methodical Cultivator',
      tell: "The Methodical Cultivator runs a plan for the account. You run a plan for the decision, and once it's made, your part is mostly done. If your calendar is full of scheduled reviews with existing customers, the Cultivator page is yours.",
    },
    adjacent: ['methodical-challenger', 'curious-advisor', 'methodical-closer'],
  },
  {
    slug: 'resilient-advisor',
    name: 'Resilient Advisor',
    trait: 'Resilient',
    style: 'Advisor',
    tagline: "Your advice gets ignored, and you're still there when they need it.",
    metaDescription:
      "The Resilient Advisor keeps advising buyers who ignore the advice, and is the first call when it goes wrong. Strengths, blind spots, and how this selling style wins. Take the free assessment.",
    intro: [
      "The Resilient Advisor gives a buyer advice, watches them ignore it, and keeps showing up. When the plan you warned against goes sideways six months later, you're the first call, and you arrive without a word about having said so.",
      "Most advisors take an ignored recommendation personally and drift away from the account. You don't. That makes you the vendor buyers trust after a failure, which is when trust is worth the most. It also means you spend a lot of time advising people who aren't going to listen.",
    ],
    strengths: [
      "Buyers who ignored your advice come back to you first when it goes wrong.",
      "You never say I told you so, and buyers notice you had every right to.",
      "A lost deal stays a live relationship, and some of them turn into the next deal.",
      "You give the same honest recommendation in the third meeting that you gave in the first, even after it was waved off twice.",
    ],
    blindSpots: [
      "You keep advising accounts that stopped taking your advice a year ago.",
      "Your best counsel gets used for cleanup more often than for planning.",
      "Free advice to a buyer who never buys feels productive, since nothing in it stings.",
      "The buyer is about to make a serious mistake and gets the same calm recommendation they ignored twice already.",
    ],
    inTheDeal:
      "In a live deal, the Resilient Advisor recommends a buyer delay their migration by a quarter, gets overruled, and loses the deal to a vendor who promised the faster date. Five months later the migration has stalled, and the buyer calls you. You take the call as if the earlier conversation never went badly. That steadiness wins deals other sellers would have written off. The price is time: you give real hours to accounts that only listen once something has broken.",
    sellsBestTo:
      "Buyers in high-stakes decisions who tend to learn the hard way, and remember who stayed. Categories where failed implementations are common and replacement vendors get their chance. Buyers who move fast and never look back don't give your patience anything to pay off on.",
    growthEdge:
      "Every Resilient Advisor has an account they've been advising for years without a purchase. Each piece of advice was good. Each one was ignored politely. The account is still on your list because nothing about being ignored has ever told you to take it off.",
    tension:
      "Advising only works when the buyer listens. Resilience makes it painless when they don't. Other advisors pull back after being ignored twice, and the sting is what tells them to. You don't feel it, so your advice keeps arriving at accounts where it has become background. Buyers value you in hindsight. They rarely act on you in advance.",
    mistakenFor: {
      slug: 'resilient-cultivator',
      name: 'Resilient Cultivator',
      tell: "The Resilient Cultivator stayed after the account went badly to repair the relationship. You stayed to repair the plan. If the thing you rebuild after a failure is usually trust rather than the implementation, the Cultivator page is the one to check.",
    },
    adjacent: ['resilient-cultivator', 'empathic-advisor', 'resilient-challenger'],
  },
  {
    slug: 'strategic-advisor',
    name: 'Strategic Advisor',
    trait: 'Strategic',
    style: 'Advisor',
    tagline: "The buyer asks a small question, and you answer the one they'll have next year.",
    metaDescription:
      "The Strategic Advisor answers the question behind the question, showing buyers where today's decision leads. Strengths, blind spots, and how this selling style wins. Take the free assessment.",
    intro: [
      "The Strategic Advisor hears the question behind the question. A buyer asks for pricing on fifty seats, and you come back with a view on how their team will be structured in eighteen months and what that structure will need. Your recommendations are about where the decision leads, not just the decision.",
      "Buyers rarely get that kind of thinking from a vendor. Some of them build their plans around it. Others only wanted the fifty seats, and leave with a project they didn't ask for.",
    ],
    strengths: [
      "You spot the second-order problem a purchase will create before the buyer signs.",
      "You can explain how this purchase affects a department the buyer hasn't mentioned.",
      "Your recommendation holds up when the buyer's CEO asks what happens in year two.",
      "You talk buyers out of solving a symptom and into the purchase that addresses the cause.",
    ],
    blindSpots: [
      "A buyer who wanted a quote gets a strategy session.",
      "Your recommendation depends on a future the buyer isn't sure they believe in.",
      "You scope past what the buyer can get approved this year.",
      "The simple question gets answered last, after the interesting one.",
    ],
    inTheDeal:
      "In a live deal, the Strategic Advisor listens to a buyer describe a reporting problem and points out that it comes from their two acquired teams still running separate systems. The purchase becomes a consolidation plan, and the buyer's CFO starts attending the meetings. That's how your deals get bigger and stickier. It's also how some of them stall, because a problem big enough for the CFO is a problem big enough for a steering committee.",
    sellsBestTo:
      "Senior buyers who own outcomes rather than line items. Companies at an inflection point, like after an acquisition or a reorg, where today's purchase shapes next year's structure. Buyers with a narrow brief and a fixed budget find the bigger picture uncomfortable, since they have no authority to act on it.",
    growthEdge:
      "Your closed-lost list has a deal that died in a steering committee. It started as a simple purchase. You showed the buyer why it was really a bigger decision, and you were right, and bigger decisions take longer than a buyer's budget cycle.",
    tension:
      "Strategy looks for the bigger problem. Advising looks for the real one. They usually agree, which is the trouble: nothing in you ever argues for the small answer. The buyer's question keeps growing because both halves find the larger version more interesting, and the version the buyer can buy this quarter gets less of your attention than it deserves.",
    mistakenFor: {
      slug: 'strategic-challenger',
      name: 'Strategic Challenger',
      tell: "The Strategic Challenger tells the buyer their thinking is wrong. You tell them where their thinking leads. If your meetings usually involve disagreement rather than extension, the Challenger is the one to read.",
    },
    adjacent: ['strategic-cultivator', 'curious-advisor', 'strategic-closer'],
  },
  {
    slug: 'adaptive-advisor',
    name: 'Adaptive Advisor',
    trait: 'Adaptive',
    style: 'Advisor',
    tagline: "Your recommendation is current, even when that means reversing it.",
    metaDescription:
      "The Adaptive Advisor updates a recommendation the moment the facts change, including their own earlier advice. Strengths, blind spots, and how this selling style wins. Take the free assessment.",
    intro: [
      "The Adaptive Advisor treats a recommendation as the best answer available today. When a new release, a pricing change, or a competitor's stumble changes the picture, you call the buyer and tell them your advice has changed, including when the old advice was yours.",
      "Buyers in fast-moving categories need exactly that. The trouble is that buyers act on advice. By the time you've updated yours, someone has built a budget, a timeline, or an internal pitch on the previous version.",
    ],
    strengths: [
      "Your recommendations account for things that changed last month.",
      "You're the first to call when a market shift affects a decision the buyer already made.",
      "You can explain what would change your recommendation, which makes it easier to trust now.",
      "You've read the competitor's release notes before the buyer has heard the release happened.",
    ],
    blindSpots: [
      "A champion who sold your March recommendation internally has to explain your June one.",
      "Buyers learn to wait for your next update before acting on this one.",
      "You revise advice the buyer had already acted on, and turn a settled decision into a doubtful one.",
      "Your recommendation history is a list of positions, each one correct at the time.",
    ],
    inTheDeal:
      "In a live deal, the Adaptive Advisor tells a buyer in the spring to wait for a product release, then calls in the summer to say the release is late and they should buy the current version now. The buyer appreciates the honesty and signs. Being current makes your advice worth having. Your champion pays for it, having told their boss in April that waiting was the plan.",
    sellsBestTo:
      "Buyers in categories that change every quarter, where last year's best practice is already wrong. Technical buyers who expect a recommendation to update when the facts do. Large organizations with long approval chains feel every revision twice, once when you make it and again when someone has to re-approve.",
    growthEdge:
      "Every Adaptive Advisor has a customer who stopped acting on their advice without ever disagreeing with it. The advice kept improving. The customer just started waiting a month to see whether it would change again.",
    tension:
      "Adapting says the answer changes when the facts do. Advising says the buyer needs an answer they can build on. You're right to update, the buyer is right to need stability, and you're the one deciding which matters more on a given Tuesday. Most of the time you update, and the buyer's plan absorbs the change.",
    mistakenFor: {
      slug: 'adaptive-cultivator',
      name: 'Adaptive Cultivator',
      tell: "The Adaptive Cultivator changes how they work an account. You change what you recommend to it. If the thing that keeps moving is your process rather than your advice, read the Cultivator.",
    },
    adjacent: ['adaptive-student', 'adaptive-closer', 'methodical-advisor'],
  },
  {
    slug: 'empathic-connector',
    name: 'Empathic Connector',
    trait: 'Empathic',
    style: 'Connector',
    tagline: "You know who's unhappy in the buyer's org before the buyer does.",
    metaDescription:
      "The Empathic Connector builds a network inside the buyer's organization by noticing the people nobody else does. Strengths, blind spots, and how this selling style wins. Take the free assessment.",
    intro: [
      "The Empathic Connector notices people. The analyst who seemed off on the last call, the director who got passed over, the assistant who runs the executive's calendar. You check in on them, and they tell you things. Within a few months you know more about how the buyer's organization actually feels than most of the people who work there.",
      "That network is a real asset. Relationships built on being noticed last longer than ones built on being sold to. They also pile up, because nothing about the way you build them asks whether each one will ever lead anywhere.",
    ],
    strengths: [
      "You hear about the reorg from someone three levels below the buyer, a week before the buyer does.",
      "People who change jobs keep calling you, and some of them bring their new company.",
      "You know which of the buyer's team is about to quit, usually because they told you before they told their manager.",
      "Relationships survive lost deals, because they were never really about the deal.",
    ],
    blindSpots: [
      "Your network is full of people you like and few who can sign.",
      "You carry the stress of people in accounts you'll never close.",
      "You know about the layoffs before your champion does, and there's nothing useful you can do with it.",
      "A warm relationship with the wrong person takes the hours a colder one with the right person needed.",
    ],
    inTheDeal:
      "In a live deal, the Empathic Connector hears from a regional manager that the buyer's CFO has been quietly asking about cost cuts, and brings a smaller phased option to the next meeting before anyone asks for it. The buyer is surprised you saw it coming. Nobody else in the cycle had that source. The same network takes real upkeep, and most of the people in it will never matter to a deal.",
    sellsBestTo:
      "Large organizations where decisions are shaped by people who never appear on the buying committee. Industries where careers move between the same companies and relationships follow the people. Fast transactional sales give your network no time to matter, and the deals close before anyone in it could help.",
    growthEdge:
      "Your phone holds dozens of people who would take your call tomorrow. A handful have bought anything or ever will. The rest are years of attention, every hour of which felt worthwhile at the time.",
    tension:
      "Empathy notices who needs attention. Connecting gives it. Both halves agree, so nothing in you asks whether the person you're checking in on has anything to do with a deal. The relationships are real and the time is real, and the commercial filter every other seller applies without thinking never switches on.",
    mistakenFor: {
      slug: 'empathic-cultivator',
      name: 'Empathic Cultivator',
      tell: "The Empathic Cultivator reads one account and keeps it growing. You read people, and they follow you from company to company. When a champion leaves, the Cultivator loses a contact and you often gain an account. If your relationships stay inside accounts you already own, the Cultivator is the closer match.",
    },
    adjacent: ['empathic-cultivator', 'devoted-connector', 'empathic-hunter'],
  },
  {
    slug: 'curious-connector',
    name: 'Curious Connector',
    trait: 'Curious',
    style: 'Connector',
    tagline: "You stay interested in people after there's nothing left to ask them about.",
    metaDescription:
      "The Curious Connector builds a network out of conversations that were never about a deal. Strengths, blind spots, and how this selling style wins. Take the free assessment.",
    intro: [
      "The Curious Connector keeps talking to people because they're interesting, not because they're in a deal. You want to know how someone got into the industry, what their old company did differently, why they think the market is heading where it is. Four years later, half the people you talk to regularly have nothing to do with your territory.",
      "Those conversations pay off in ways a pipeline can't show. You hear about vendor switches early, you get honest reads on competitors, and you're rarely more than one introduction from any room you need. The bill is time, and it's charged monthly.",
    ],
    strengths: [
      "You know why the buyer's last vendor was replaced, from the person who managed them.",
      "Introductions come easily to you, because you can tell each person why they'd find the other interesting.",
      "You spot a market shift in conversations months before it shows up in a report.",
      "People tell you things off the record, since nothing you ask them is ever about your quota.",
    ],
    blindSpots: [
      "Your best relationship at an account is with someone who has no role in the purchase.",
      "A thirty-minute catch-up regularly runs an hour, and you book the next one before hanging up.",
      "You gather context nobody asked for and no deal needed.",
      "A good conversation counts as a good day, even when your pipeline didn't move.",
    ],
    inTheDeal:
      "In a live deal, the Curious Connector already knows the buyer's head of engineering from a conference two years ago, and hears from them that the stated requirement was written around a competitor's feature. You reposition before the RFP closes. That kind of intelligence can't be bought. It's the residue of hundreds of conversations, most of which were about nothing in particular, and all of which took real hours out of a selling week.",
    sellsBestTo:
      "Industries where the same people cycle between a handful of companies, so every relationship keeps mattering. Complex accounts where the real story lives with people outside the committee. Short cycles and cold territories give your network no chance to exist, and you'll feel like you're starting from nothing, because you are.",
    growthEdge:
      "Look at the ten people you've spoken with most this year. Count how many sat in a deal.",
    tension:
      "Curiosity wants the next question. Connecting wants the next conversation. Both are satisfied by staying in touch, so nothing in you ever decides a relationship has served its purpose. Nobody has ever left the rotation, so it holds everyone useful in 2022 and everyone you've met since, on the same footing.",
    mistakenFor: {
      slug: 'curious-cultivator',
      name: 'Curious Cultivator',
      tell: "The Curious Cultivator's questions grow an account. Yours grow a network that spans companies. If the people you talk to most are inside accounts you're responsible for, the Cultivator is your page.",
    },
    adjacent: ['curious-cultivator', 'authentic-connector', 'curious-advisor'],
  },
  {
    slug: 'methodical-connector',
    name: 'Methodical Connector',
    trait: 'Methodical',
    style: 'Connector',
    tagline: "Nobody falls off your list, because your list doesn't let them.",
    metaDescription:
      "The Methodical Connector keeps a network alive by system, so no relationship decays by accident. Strengths, blind spots, and how this selling style wins. Take the free assessment.",
    intro: [
      "The Methodical Connector keeps relationships alive by system. Everyone you've worked with sits in a list with a date next to it. When someone changes jobs, you know within the week, and the note you send is genuinely about them, because you wrote down what mattered to them the last time you spoke.",
      "Most sellers lose their network to attrition. Yours compounds, because nobody drops out of it. What it can't do is tell you which of those people actually wants to hear from you this quarter.",
    ],
    strengths: [
      "You reach a former champion in their new role before your competitor knows they moved.",
      "Your notes let you open a call with the detail that matters, a year after the last conversation.",
      "A champion you last spoke to in 2021 answers the email, because it didn't read as a mass send.",
      "Nobody in your network goes dark by accident.",
    ],
    blindSpots: [
      "A quarterly touch arrives whether or not you have anything to say.",
      "Your contact record for a person is more detailed than your sense of them.",
      "Someone who should be a weekly conversation gets the same cadence as everyone else.",
      "When the system says you touched base last month, you don't reach out again, even though the last month is when everything changed for them.",
    ],
    inTheDeal:
      "In a live deal, the Methodical Connector gets a warm introduction into a new account because a champion from three companies ago is now the VP there, and you'd stayed in touch the whole time. The competitor arrives cold. A network that never decays is a rare and durable advantage. The upkeep is constant and invisible, and some of the people in the rotation are getting your messages on schedule rather than because you thought of them.",
    sellsBestTo:
      "Industries with high job mobility, where this year's contact is next year's buyer. Territories you'll hold long enough for the compounding to show. Fast-moving startup markets where companies disappear and reappear make the record harder to keep useful, and it ages faster than you can maintain it.",
    growthEdge:
      "Open your list and find the person you've contacted most reliably for the last three years. Ask yourself when they last replied with more than a line. The cadence held perfectly. The relationship quietly became a broadcast.",
    tension:
      "Method keeps the schedule. Connecting needs the moment. Your system guarantees the contact happens and guarantees nothing about whether it lands, so the message goes out in a quiet week and again in the week their company got acquired, in the same voice. The person who most needed to hear from you was in the rotation, at their turn.",
    mistakenFor: {
      slug: 'methodical-cultivator',
      name: 'Methodical Cultivator',
      tell: "The Methodical Cultivator's plan runs on accounts. Yours runs on people, most of whom aren't customers. If your schedule is organized by company rather than by person, read the Cultivator.",
    },
    adjacent: ['methodical-cultivator', 'curious-connector', 'methodical-advisor'],
  },
  {
    slug: 'resilient-connector',
    name: 'Resilient Connector',
    trait: 'Resilient',
    style: 'Connector',
    tagline: "The relationship survives the deal that went wrong.",
    metaDescription:
      "The Resilient Connector stays in touch after the failure, the cancellation, or the blame. Strengths, blind spots, and how this selling style wins. Take the free assessment.",
    intro: [
      "The Resilient Connector stays in touch after the implementation failed, the contract was cancelled, or the champion got blamed for choosing you. Most sellers go quiet when a relationship gets uncomfortable. You send the message anyway, and you send the next one too.",
      "What comes back is unusual: people who have seen you at your worst and still take your call. A relationship that has survived something is stronger than one that never got tested. Getting there means absorbing a lot of silence, and some of it never ends.",
    ],
    strengths: [
      "You call the customer whose project failed, in the same month it failed.",
      "A champion who was burned by your product still gives you an honest hearing at their next company.",
      "You keep reaching out through a year of no replies, and are still there when the situation changes.",
      "Buyers who have watched you take responsibility for something bad trust you with the next decision.",
    ],
    blindSpots: [
      "You maintain relationships with people who quietly decided years ago they'd never buy from you again.",
      "Silence carries no information for you, so a polite freeze-out and a busy stretch look identical.",
      "You spend the goodwill of your own team asking them to re-engage an account they wrote off.",
      "You stay close to a former champion whose new company is nothing like your market.",
    ],
    inTheDeal:
      "In a live deal, the Resilient Connector reconnects with a buyer whose last implementation with your company went badly, and gets a meeting because you never disappeared after it did. You start that conversation somewhere no competitor can reach. The same persistence keeps dozens of dead relationships technically alive, and the hours are real even when the outcomes never arrive.",
    sellsBestTo:
      "Accounts with a difficult history where a competitor thinks the door is shut. Industries where failure is common and forgiven, and endurance reads as integrity. Clean greenfield territories don't test anything, and your best quality goes unused.",
    growthEdge:
      "There's a name you've reached out to twice a year since the deal collapsed. The replies were polite and got shorter. You haven't stopped, because stopping would feel like admitting something, and the calendar reminder keeps firing.",
    tension:
      "Connecting reads the other person's signals. Resilience mutes the one signal that matters, which is the cost of being ignored. Other sellers feel a relationship go cold and back off. You feel almost nothing and keep sending, so the relationships that ended stay on your list beside the ones that are just dormant, and they look the same from where you're standing.",
    mistakenFor: {
      slug: 'resilient-cultivator',
      name: 'Resilient Cultivator',
      tell: "The Resilient Cultivator stayed inside the account and repaired it. You stayed with the person, often after they left the account entirely. If your repair work happens with the company rather than the individual, the Cultivator fits better.",
    },
    adjacent: ['resilient-cultivator', 'methodical-connector', 'resilient-advisor'],
  },
  {
    slug: 'strategic-connector',
    name: 'Strategic Connector',
    trait: 'Strategic',
    style: 'Connector',
    tagline: "You knew that VP when they were a manager, and you knew they wouldn't stay one.",
    metaDescription:
      "The Strategic Connector invests in people years before they have the authority to buy. Strengths, blind spots, and how this selling style wins. Take the free assessment.",
    intro: [
      "The Strategic Connector invests in people early. The analyst nobody is courting, the manager on the way up, the director at a company that's about to get acquired. You build those relationships years before they matter, and often before the person themselves knows where they're going.",
      "That patience creates a network that outperforms any prospecting list. It also means a good portion of your week goes to people who can't buy anything today, chosen on your read of where they'll be in three years.",
    ],
    strengths: [
      "You get a first meeting at a new logo because someone you've known for six years now runs the team.",
      "You can name who in the industry is about to move, and roughly where.",
      "Your relationships are weighted toward people whose authority is rising, not people who had it a decade ago.",
      "A competitor's champion talks to you anyway, because you knew them before they worked there.",
    ],
    blindSpots: [
      "You invest three years in someone who plateaus, and the calls get shorter once it's clear.",
      "People occasionally sense they're being invested in.",
      "Your network skews toward the ambitious, who are also the least loyal.",
      "You have almost nobody in the roles that don't lead anywhere, which is where a lot of the buying still happens.",
    ],
    inTheDeal:
      "In a live deal, the Strategic Connector gets a meeting inside a competitor's flagship account because the new head of operations there was a manager you kept in touch with for four years. You skip a procurement process everyone else is stuck in. That's the compounding return on relationships nobody else thought worth starting. The cost is spread across every quarter where your best hours went to people who couldn't buy anything.",
    sellsBestTo:
      "Industries with clear career ladders and predictable movement between a known set of companies. Long-horizon enterprise territories where a relationship has room to mature. High-churn markets where people leave the industry entirely make your reads worthless, since the person you backed isn't in the sector by the time it would have paid.",
    growthEdge:
      "There's someone you invested in for years who is still in the same role. Your contact with them thinned out around the time it became clear they weren't moving. They noticed before you did.",
    tension:
      "Strategy plays for the long return. Connecting plays for the long relationship. They want the same thing, so nothing in you ever asks what this quarter needs. The relationship you're building today is for a role the person doesn't have yet, and the deal on your forecast has a date on it.",
    mistakenFor: {
      slug: 'strategic-cultivator',
      name: 'Strategic Cultivator',
      tell: "The Strategic Cultivator maps a customer's org and grows inside it. You map an industry and grow across it. If your plan is drawn around one account's departments, that's the Cultivator.",
    },
    adjacent: ['strategic-cultivator', 'adaptive-connector', 'strategic-advisor'],
  },
  {
    slug: 'adaptive-connector',
    name: 'Adaptive Connector',
    trait: 'Adaptive',
    style: 'Connector',
    tagline: "Your network looks nothing like it did three years ago, and that's why it still works.",
    metaDescription:
      "The Adaptive Connector rebuilds their network as the buying center moves between functions. Strengths, blind spots, and how this selling style wins. Take the free assessment.",
    intro: [
      "The Adaptive Connector rebuilds their network as the market moves. When your category shifts and the decision moves from IT to revenue operations, you're already talking to revenue operations. The relationships you built for the old buying process get thinner while you're building the new ones.",
      "Most sellers' networks age with them. Yours stays aligned to who actually decides. The people you moved on from usually notice, and a few of them remember when your industry cycles back.",
    ],
    strengths: [
      "Your strongest relationships are with the function that decides now, not the one that decided in 2021.",
      "A new market or segment doesn't leave you starting from zero, because you rebuild fast.",
      "You meet the people around a new buying center before your competitor has updated their org chart.",
      "When a buying center moves, the people you already know there mean you're introduced rather than announced.",
    ],
    blindSpots: [
      "Relationships you spent years on go quiet once their function stops deciding.",
      "You have wide coverage of this year's buying center and thin history anywhere.",
      "People who are still in the same role notice how much less they hear from you.",
      "Nobody in your network has known you long enough to vouch for you in a room you're not in.",
    ],
    inTheDeal:
      "In a live deal, the Adaptive Connector already has relationships in the security team because you noticed six months ago that security had started vetoing purchases in your category. The buyer's process has a new gate, and you're through it. Seeing that shift early is genuinely rare. The trade is depth, and the ten-year relationship that gets a competitor an introduction is the one you don't have.",
    sellsBestTo:
      "Categories where the buying center keeps moving between functions. New markets where nobody has an established network and speed of rebuilding wins. Stable industries where the same people have bought the same way for twenty years reward the seller who stayed put, and that seller isn't you.",
    growthEdge:
      "Someone in your network was central to your business three years ago and now hears from you twice a year. Nothing went wrong. Their function stopped being the one that decides, and your attention followed the decision.",
    tension:
      "Connecting builds relationships that outlast the deal. Adapting keeps moving toward whoever decides next. The relationships are real while they're current, and your attention follows the market rather than the person. You end every year with a network that fits the market and almost nobody in it who has known you through more than one version of it.",
    mistakenFor: {
      slug: 'adaptive-cultivator',
      name: 'Adaptive Cultivator',
      tell: "The Adaptive Cultivator changes how they work the same account for years. You change who you're working with. If the constant in your week is a customer list rather than a market, the Cultivator is closer.",
    },
    adjacent: ['adaptive-cultivator', 'resilient-connector', 'adaptive-advisor'],
  },
  {
    slug: 'curious-architect',
    name: 'Curious Architect',
    trait: 'Curious',
    style: 'Architect',
    tagline: "You take your own sales process apart to see how it works.",
    metaDescription:
      "The Curious Architect investigates why a sales process works before rebuilding it. Strengths, blind spots, and how this selling style wins. Take the free assessment.",
    intro: [
      "The Curious Architect wants to know why the process works, not just that it does. You pull apart the stages, test whether the qualification criteria actually predict anything, and rebuild the sequence around what you find.",
      "Most system-builders optimize what exists. You investigate it first, which is why your systems fit the business instead of some generic template. Investigation takes time, and the question is always interesting whether or not the answer changes anything.",
    ],
    strengths: [
      "You find out which stage the team's deals actually die in, rather than where the CRM says they do.",
      "Your process changes are grounded in something you tested, not in a framework you read.",
      "You'll kill a stage that adds nothing, even one you built.",
      "You can explain why your system works, so other people can use it without you.",
    ],
    blindSpots: [
      "You analyze last quarter's funnel through the first three weeks of this one.",
      "A question that would take a day to answer and change nothing still gets the day.",
      "Your system gets rebuilt before the last version had run long enough to judge.",
      "Teammates get a diagnosis of a problem they'd rather just have fixed.",
    ],
    inTheDeal:
      "In a live deal, the Curious Architect notices that deals with a security review in the first thirty days close at twice the rate of the ones where it comes late, pulls the last two years of data to check, and rebuilds the team's sequence around an early security conversation. Nobody else on the team would have gone looking. The investigation took two weeks, and it happened during a quarter where your own pipeline needed the hours.",
    sellsBestTo:
      "Teams and companies that will act on what you find, and territories where your own deals can survive the weeks you spend on the system. Sales leaders who want a documented reason for a process change. Pure transactional roles where the process is fixed by someone else give your curiosity nothing to work on.",
    growthEdge:
      "You've built something that explains why your team wins, and the team is using version four of it. Versions two and three never ran long enough to produce a clean read. You were already curious about the next question.",
    tension:
      "Curiosity wants to understand the system. Architecting wants to ship it. Understanding has no natural end, so the build starts when the question runs out rather than when the answer is good enough. The version your team is using is always one revision behind the one you're interested in, and the difference is usually invisible to everyone but you.",
    mistakenFor: {
      slug: 'methodical-architect',
      name: 'Methodical Architect',
      tell: "The Methodical Architect builds the machine and runs it. You build it, then take it apart to see whether it was right. If you'd rather maintain a system that works than investigate one that already does, the Methodical Architect is your page.",
    },
    adjacent: ['curious-student', 'curious-challenger', 'strategic-architect'],
  },
  {
    slug: 'empathic-architect',
    name: 'Empathic Architect',
    trait: 'Empathic',
    style: 'Architect',
    tagline: "You build the process around how it feels to be on the other end of it.",
    metaDescription:
      "The Empathic Architect designs sales process from the buyer's side of the table, removing friction nobody measures. Strengths, blind spots, and how this selling style wins. Take the free assessment.",
    intro: [
      "The Empathic Architect designs sales process from the buyer's side of the table. You've sat through your own company's onboarding, read the renewal email a customer actually receives, and noticed which handoff leaves someone explaining their situation for the third time. Then you rebuild it.",
      "Most process design optimizes for the seller's efficiency and the CRM's reporting. Yours optimizes for the experience of being sold to, which almost nobody measures and every buyer notices. The trouble is that the things you improve don't show up in any dashboard your leadership reads.",
    ],
    strengths: [
      "You find the handoff where the customer has to repeat themselves, and remove it.",
      "Your templates sound like a person wrote them, because you read them aloud before shipping.",
      "You can predict which step in a process will make a buyer feel managed rather than helped.",
      "A rep tells you the new sequence is the first one they haven't felt weird sending.",
    ],
    blindSpots: [
      "You redesign a step that annoyed three buyers and cost the team nothing.",
      "Your improvements can't be defended with numbers, so they get cut in the next reorg.",
      "You resist a process change that works because of how it would land on customers.",
      "Every buyer gets the smooth version, including the one who wanted speed over care.",
    ],
    inTheDeal:
      "In a live deal, the Empathic Architect notices that the security questionnaire arrives the same week the buyer's team is closing their quarter, and moves it earlier in the sequence for everyone. Deals stop stalling in week six, and nobody can say exactly why. Your process improvements are felt rather than reported, so when someone asks what you contributed last quarter, the honest answer is hard to put in a slide.",
    sellsBestTo:
      "Companies where customer experience genuinely drives renewal, and long cycles with many touchpoints where friction accumulates. Buying groups with junior stakeholders who have no patience for a clumsy process. Metric-driven sales orgs where every change has to be justified by pipeline math give your best work nothing to stand on.",
    growthEdge:
      "You rebuilt something last year that made the process better for every customer who touched it. Your manager still thinks of you as the rep who has good quarters. The improvement has no owner and no number attached.",
    tension:
      "Empathy responds to the person in front of you. A system responds to everyone the same way. You build for the buyer you can picture, then watch it run for a thousand you can't, and some of them needed something else entirely. The system is kind and it is also fixed, and those two things pull against each other every time you ship a version.",
    mistakenFor: {
      slug: 'empathic-cultivator',
      name: 'Empathic Cultivator',
      tell: "The Empathic Cultivator reads one account and adjusts to it. You read a pattern and change the process for everyone. If your best work happens in a specific relationship rather than in a template, the Cultivator page is yours.",
    },
    adjacent: ['empathic-cultivator', 'empathic-student', 'empathic-connector'],
  },
  {
    slug: 'resilient-architect',
    name: 'Resilient Architect',
    trait: 'Resilient',
    style: 'Architect',
    tagline: "Your system has been through three bad quarters and it's still running.",
    metaDescription:
      "The Resilient Architect builds sales systems that survive bad quarters, reorgs, and turnover. Strengths, blind spots, and how this selling style wins. Take the free assessment.",
    intro: [
      "The Resilient Architect builds processes that survive contact with a bad year. Territory cuts, a broken product release, half the team leaving: the system bends and you rebuild the broken part rather than abandoning it. Five years in, the process still traces back to something you started.",
      "Most sales systems die the first quarter they underperform. Yours doesn't, because you don't read a bad result as a verdict. That durability is genuinely rare. So is the case where the thing you keep rebuilding stopped being right two years ago.",
    ],
    strengths: [
      "Your process survives the reorg, because you rebuild the broken pieces instead of starting over.",
      "A quarter where the system underperforms makes you fix it rather than doubt it.",
      "New reps inherit something stable while everything around them changes.",
      "You maintain the parts of the process nobody wants to own, for years.",
    ],
    blindSpots: [
      "You repair a stage four times instead of asking whether it should exist.",
      "A system's bad quarter and a system's death look the same to you from the inside.",
      "You defend a process the team stopped believing in, and they work around it rather than argue.",
      "You've rebuilt the same stage three times and never once proposed removing it.",
    ],
    inTheDeal:
      "In a live deal, the Resilient Architect's qualification framework flags a deal as weak, the team pushes ahead anyway and loses, and you go back and tighten the framework rather than dropping it. The next version catches two more. Very few people keep investing in a system that has publicly failed. The same instinct means some of your process is scar tissue from problems that stopped existing a while ago.",
    sellsBestTo:
      "Volatile companies where the strategy changes faster than the process can, and teams that need one stable thing. Long-tenure territories where the investment has time to return. Fast-pivoting startups that genuinely should throw out the old system every year find your maintenance instinct slows them down.",
    growthEdge:
      "Some part of your process exists because of a problem from three years ago. You've maintained it through two reorgs. The problem it solves hasn't come up since, and nothing in the last three years has prompted you to check.",
    tension:
      "Resilience keeps going. A system is meant to keep going. Both halves want the same thing, so nothing in your wiring ever proposes abandonment. A rep who hated a broken process would rip it out. You rebuild the broken part, which is usually right and is also the only move you reach for.",
    mistakenFor: {
      slug: 'methodical-architect',
      name: 'Methodical Architect',
      tell: "The Methodical Architect runs the machine because it works. You run yours because it hasn't beaten you yet. A system whose numbers stopped supporting it would be dropped by the Methodical Architect and rebuilt by you.",
    },
    adjacent: ['resilient-connector', 'resilient-student', 'resilient-challenger'],
  },
  {
    slug: 'devoted-architect',
    name: 'Devoted Architect',
    trait: 'Devoted',
    style: 'Architect',
    tagline: "You built the handoff nobody asked you to build.",
    metaDescription:
      "The Devoted Architect builds the parts of the customer experience that fall between job descriptions. Strengths, blind spots, and how this selling style wins. Take the free assessment.",
    intro: [
      "The Devoted Architect builds the parts of the customer's experience that fall between job descriptions. The handoff document from sales to implementation, the onboarding checklist, the thing that stops a new customer landing on a support queue that knows nothing about them. None of it is your job.",
      "You build it because you've watched what happens to customers when it doesn't exist. The work is real and the customers feel it. It's also work nobody assigned, nobody measures, and nobody will do if you stop.",
    ],
    strengths: [
      "Your customers arrive at implementation with context, because you wrote it down before the handoff.",
      "You build the thing the customer needs even when it belongs to another department.",
      "A rep from another team asks for your handoff doc six months after you shared it once.",
      "Your accounts have fewer early escalations, because the first thirty days were designed.",
    ],
    blindSpots: [
      "You spend a selling week building an onboarding process that isn't yours to own.",
      "Your systems only exist while you maintain them, and nobody else has been asked to.",
      "You fix the symptom for your customers instead of raising the gap with the team that owns it.",
      "Leadership sees a functioning handoff and concludes the process is fine.",
    ],
    inTheDeal:
      "In a live deal, the Devoted Architect writes a two-page context document for implementation, covering the customer's history, their actual concerns, and the promise made in week three. The customer's first call after signature sounds like a continuation rather than a restart. Almost nobody does this. It also means every account you close carries hours of work that appear nowhere in your comp plan, and the day you move teams, the document stops existing.",
    sellsBestTo:
      "Complex products where implementation makes or breaks the customer, and companies whose internal handoffs are genuinely broken. Long-term accounts where the first ninety days determine the next three years. Simple transactional products don't give your building instinct anywhere useful to go.",
    growthEdge:
      "Something you built is used weekly by people who don't know you built it. It has no owner and no maintainer. When you take a two-week holiday, someone notices it's out of date, and by the time you're back they've stopped mentioning it.",
    tension:
      "Devotion serves the customer in front of you. A system serves every customer at once, including the ones you'll never meet. You build the system anyway, for people who aren't yours, on time nobody allocated. Each thing you build makes the case for a real owner and quietly removes the pain that would have created one.",
    mistakenFor: {
      slug: 'devoted-cultivator',
      name: 'Devoted Cultivator',
      tell: "The Devoted Cultivator stays inside the account and gives it everything. You build the thing that serves the account whether or not you're in the room. If your care shows up as hours with a specific customer rather than as something you made, the Cultivator is closer.",
    },
    adjacent: ['devoted-cultivator', 'devoted-student', 'devoted-challenger'],
  },
  {
    slug: 'authentic-architect',
    name: 'Authentic Architect',
    trait: 'Authentic',
    style: 'Architect',
    tagline: "You only build a process you'd be willing to run yourself.",
    metaDescription:
      "The Authentic Architect refuses to build a sales process they wouldn't personally run. Strengths, blind spots, and how this selling style wins. Take the free assessment.",
    intro: [
      "The Authentic Architect refuses to build anything they wouldn't do. No sequence you'd be embarrassed to send, no qualification question designed to manufacture urgency, no template that pretends a mass email is personal.",
      "That makes your process unusually honest and unusually credible to the reps who run it. It also makes it yours in a way that resists becoming anyone else's, because the reason each part exists is that you believe in it.",
    ],
    strengths: [
      "Reps trust your process because you run it yourself, in front of them.",
      "You strip the manipulative step out of an inherited playbook, and the numbers usually hold.",
      "Nothing you build requires someone to say something they don't mean.",
      "You can defend every stage of your process to a skeptical buyer, out loud.",
    ],
    blindSpots: [
      "You refuse to build the thing the team needs, because you wouldn't personally run it.",
      "Your process reflects how you sell, so a rep with different strengths struggles inside it.",
      "A tactic you find distasteful gets dismissed before you test whether it works.",
      "You'd rather have no process than a process with a compromise in it.",
    ],
    inTheDeal:
      "In a live deal, the Authentic Architect rewrites the team's discovery script to remove three questions designed to create false urgency, and the meeting-to-opportunity rate holds. Reps stop dreading the call. Few people will delete a working tactic on principle. The cost is that your process is built to your own conscience, and the rep who needed more structure than you do gets a framework built by someone who never needed it.",
    sellsBestTo:
      "Teams selling to sophisticated buyers who can hear a manufactured line. Companies where rep turnover comes from discomfort with the playbook. High-velocity orgs that run on proven aggressive tactics find your standards expensive, and they may be right about the tradeoff.",
    growthEdge:
      "There's a tactic you removed from your team's process on principle. Someone at a competitor still runs it. Their number is better than yours in that stage.",
    tension:
      "A system's whole value is that it works without you. Authenticity means every part of it has to be something you'd personally stand behind. So you build something honest and non-transferable, and the reps who'd benefit most are the ones least able to run it in your voice.",
    mistakenFor: {
      slug: 'authentic-advisor',
      name: 'Authentic Advisor',
      tell: "The Authentic Advisor spends their honesty on buyers. You spend yours on your own company's process. If the uncomfortable truths you tell are mostly aimed at customers rather than at your own playbook, read the Advisor.",
    },
    adjacent: ['authentic-advisor', 'authentic-student', 'authentic-challenger'],
  },
  {
    slug: 'adaptive-architect',
    name: 'Adaptive Architect',
    trait: 'Adaptive',
    style: 'Architect',
    tagline: "You build systems meant to be replaced, which is why they never disappoint you.",
    metaDescription:
      "The Adaptive Architect builds sales systems with a deliberate shelf life, rewritten as the market moves. Strengths, blind spots, and how this selling style wins. Take the free assessment.",
    intro: [
      "The Adaptive Architect builds for a market that won't hold still. Your process has a shelf life, and you know it when you ship it: this qualification framework fits the current buying committee, this sequence fits the current channel, and both get rewritten when the ground moves.",
      "Teams that run a five-year-old playbook get beaten by the market. Yours never does. What yours also never does is compound, because a system that gets replaced every few quarters never gets old enough to be the thing everyone just knows how to run.",
    ],
    strengths: [
      "Your playbook reflects how buyers are actually buying this quarter.",
      "You notice when a stage stopped predicting anything and rebuild it within weeks.",
      "A new market doesn't strand you, since your systems were built to be rewritten.",
      "You'll delete your own framework the moment the evidence turns against it.",
    ],
    blindSpots: [
      "The team is learning version four while you're designing version five.",
      "Nothing runs long enough to produce a clean read on whether it worked.",
      "Your documentation is always slightly out of date, because the system is always slightly new.",
      "Reps hedge on adopting a process they suspect will change next quarter.",
    ],
    inTheDeal:
      "In a live deal, the Adaptive Architect notices that deals now die at legal rather than at procurement, and rebuilds the team's late-stage sequence around contract review inside a month. The team stops losing deals in week ten. Almost nobody adjusts that fast. What the team doesn't have is a single stage they've run the same way long enough to be genuinely excellent at.",
    sellsBestTo:
      "Fast-moving categories where the buying process itself changes yearly, and new markets with no established motion. Companies in a pivot who need a process built from scratch. Mature, stable enterprise sales reward the team that has run the same disciplined play for a decade, and that team is not yours.",
    growthEdge:
      "Your team has never run one version of your process for four consecutive quarters. Each version was better than the last, which you know from judgment rather than from data. The clean comparison would have needed a year of one thing.",
    tension:
      "A system earns its value by staying still long enough for everyone to learn it. Adapting will not let anything stay still. You're right that the old version is stale, and the team is right that they never got fluent in any of them, and both of those stay true at the same time.",
    mistakenFor: {
      slug: 'adaptive-student',
      name: 'Adaptive Student',
      tell: "The Adaptive Student rebuilds their own skills. You rebuild the system everyone else runs. If what keeps changing is how you personally sell rather than how the team does, the Student page fits better.",
    },
    adjacent: ['adaptive-connector', 'curious-architect', 'adaptive-challenger'],
  },
  {
    slug: 'curious-student',
    name: 'Curious Student',
    trait: 'Curious',
    style: 'Student',
    tagline: "You learn things nobody asked you to learn, and some of them turn out to matter.",
    metaDescription:
      "The Curious Student builds range by learning what interests them, assigned or not. Strengths, blind spots, and how this selling style wins. Take the free assessment.",
    intro: [
      "The Curious Student reads the competitor's documentation, sits in on the engineering standup, and asks the implementation team what actually goes wrong. None of it was assigned. Ask you a question about the product, the market, or the buyer's industry, and you usually have an answer that came from somewhere unusual.",
      "Over a few years this compounds into range that most sellers never build. It also means your learning has no curriculum. What you know is a function of what you found interesting, which is not the same as what your deals needed.",
    ],
    strengths: [
      "You answer a technical question in a meeting that the sales engineer was booked for.",
      "You know the buyer's industry well enough to catch what they left out.",
      "You learn from people nobody else on the team talks to, like support, implementation, and the product team.",
      "You've already read the release notes for the feature the team gets trained on next month.",
    ],
    blindSpots: [
      "You spend a week understanding something that would never have come up in a deal.",
      "Your knowledge is wide and uneven, so a gap sits next to real depth.",
      "You research the buyer's market instead of calling the buyer.",
      "You know more about why deals are lost than about how yours specifically are closing.",
    ],
    inTheDeal:
      "In a live deal, the Curious Student knows from an implementation engineer that a competitor's integration breaks under a specific configuration, mentions it as a question rather than a claim, and the buyer's technical lead confirms it on the spot. That credibility was built months before the deal existed. The hours that built it were unbudgeted, and most of what you learned that year still hasn't come up.",
    sellsBestTo:
      "Technical buyers who respect a seller who actually understands the thing, and complex categories where product knowledge is a real moat. Industries deep enough to reward years of study. Simple products in fast transactional cycles give you almost nothing worth learning, and the learning wouldn't pay before the deal closed.",
    growthEdge:
      "Think about what you learned last quarter. Some of it was fascinating. Then work out which part of it showed up in a deal.",
    tension:
      "Curiosity wants to know. Studying is how you find out. Both halves are satisfied by the next thing you didn't know, so nothing in you asks whether it's worth knowing. A seller who found learning tedious would only study what a deal demanded. You never have to make that decision, which means you never do.",
    mistakenFor: {
      slug: 'curious-architect',
      name: 'Curious Architect',
      tell: "The Curious Architect investigates the system and then rebuilds it. You investigate and keep the understanding. If what you learn usually turns into something the team runs, the Architect is your page.",
    },
    adjacent: ['curious-architect', 'curious-connector', 'curious-advisor'],
  },
  {
    slug: 'empathic-student',
    name: 'Empathic Student',
    trait: 'Empathic',
    style: 'Student',
    tagline: "You study the tape of your own calls, and it's uncomfortable every time.",
    metaDescription:
      "The Empathic Student reviews their own recordings to find what they missed about the buyer. Strengths, blind spots, and how this selling style wins. Take the free assessment.",
    intro: [
      "The Empathic Student learns from recordings. Not the calls that went well, the ones where the buyer went quiet in minute nine and you didn't notice. You go back, find the moment, and hear what you missed. Most sellers can't stand to do that. You do it weekly.",
      "What that builds is a read on people that improves instead of plateauing. It also means the thing you're best at is the thing you most doubt, because you've seen yourself get it wrong in high definition, dozens of times.",
    ],
    strengths: [
      "You can point to the exact second a call turned, on a recording from two months ago.",
      "Feedback about how you came across gets acted on, not defended.",
      "You notice a pattern in your own behavior across a dozen calls, not just in the bad one.",
      "Reps bring you their difficult recordings, because you'll watch properly.",
    ],
    blindSpots: [
      "You rewatch a call that went fine looking for the thing you got wrong.",
      "A read you'd have trusted a year ago gets second-guessed now, mid-call.",
      "You apologize for a tone the buyer never registered.",
      "You take a buyer's offhand tone as feedback and change something that was working.",
    ],
    inTheDeal:
      "In a live deal, the Empathic Student rewatches a stalled discovery call, catches the CFO's hesitation at the pricing slide, and opens the next meeting by addressing it directly. The buyer is surprised anyone noticed. That habit makes you better at reading rooms every quarter. It also puts you in front of buyers carrying a running tally of your own misreads, and the hesitation that costs you is your own.",
    sellsBestTo:
      "Relationship-driven sales with long cycles, where getting a person wrong in month one costs you in month six. Committees with hard-to-read stakeholders. Fast transactional sales give you nothing worth reviewing, and the review would cost more than the deal.",
    growthEdge:
      "You've studied more of your own bad calls than anyone on your team. Ask your manager what you're best at. They'll say reading people. That's the part you go back and check.",
    tension:
      "Empathy reads the room in real time. Studying means reviewing what you read after. Every review turns up something you missed, and you carry that into the next call, where you're now reading the buyer and monitoring the read at once.",
    mistakenFor: {
      slug: 'empathic-advisor',
      name: 'Empathic Advisor',
      tell: "The Empathic Advisor uses what they read to tell the buyer something true. You use it to get better at reading. If your best moments are honest conversations with buyers rather than quiet review afterward, the Advisor is your page.",
    },
    adjacent: ['empathic-advisor', 'empathic-architect', 'empathic-closer'],
  },
  {
    slug: 'methodical-student',
    name: 'Methodical Student',
    trait: 'Methodical',
    style: 'Student',
    tagline: "You practice the boring parts until they stop being hard.",
    metaDescription:
      "The Methodical Student drills sales fundamentals on a schedule, so the floor never drops. Strengths, blind spots, and how this selling style wins. Take the free assessment.",
    intro: [
      "The Methodical Student treats selling like a craft with fundamentals. You drill objection handling, rehearse the pricing conversation, and run the discovery framework until you don't have to think about it. Skills you learned three years ago are still sharp, because you never stopped maintaining them.",
      "Most sellers learn something once and let it decay. You don't, which is why your floor is high and your worst month is better than most people's average. The curriculum is fixed, though, and the market doesn't check what's on it.",
    ],
    strengths: [
      "You've run the same objection drill enough times that your voice doesn't change when a buyer raises it.",
      "You run the pricing conversation the same way every time, so you know what changes the outcome.",
      "You can teach anything you've learned, because you learned it in pieces.",
      "Skills you don't use often stay sharp, since they're still on the schedule.",
    ],
    blindSpots: [
      "You rehearse the objection you've heard fifty times and skip the one that's new this quarter.",
      "Your fundamentals are excellent and your read on where the market went is a year old.",
      "Practice time goes to the skill on the plan, not the skill this quarter's deals exposed.",
      "You'd rather run the framework properly than abandon it mid-call when it's clearly not working.",
    ],
    inTheDeal:
      "In a live deal, the Methodical Student handles a pricing challenge from a procurement lead without a flicker, because you've rehearsed that exact exchange more times than they've run it. The discount holds. Practice like that is why your floor never drops. The same schedule means the new objection, the one about the AI features every buyer started asking about this year, gets whatever time is left over.",
    sellsBestTo:
      "Categories with stable buying patterns, where mastery of the fundamentals compounds. Teams that run a consistent motion and reward execution over improvisation. Emerging categories where the questions change every quarter outpace a fixed curriculum.",
    growthEdge:
      "Your development plan for this year looks a lot like last year's. Both are good plans. Neither was written after a deal you lost.",
    tension:
      "Method wants a curriculum. Learning is supposed to follow the gaps. Your plan was written before this quarter's gaps existed, so you get better at the things you decided to get better at, and the market's new question waits for the next planning cycle.",
    mistakenFor: {
      slug: 'methodical-architect',
      name: 'Methodical Architect',
      tell: "The Methodical Architect builds a system for the team to run. You build a practice regimen for yourself. If what you're improving is everyone's process rather than your own skill, the Architect page fits.",
    },
    adjacent: ['methodical-connector', 'curious-student', 'methodical-closer'],
  },
  {
    slug: 'resilient-student',
    name: 'Resilient Student',
    trait: 'Resilient',
    style: 'Student',
    tagline: "Every deal you lose becomes something you know.",
    metaDescription:
      "The Resilient Student debriefs every loss honestly and turns it into something usable. Strengths, blind spots, and how this selling style wins. Take the free assessment.",
    intro: [
      "The Resilient Student debriefs their losses. Not the polite version for the forecast call, the real one, where you work out what you missed and what you'd do differently. The loss stings for an hour, then turns into something you can use.",
      "Most sellers protect themselves from that analysis, which is why they lose the same deal repeatedly. You don't, so your third year is genuinely better than your first. The same tolerance means you can absorb a long run of losses without anything in you calling it a pattern.",
    ],
    strengths: [
      "You run a real loss debrief, including your own part in it, the week the deal dies.",
      "A piece of hard feedback changes your behavior by the next call.",
      "You'll try the thing you're bad at in a live deal, because failing at it doesn't cost you much.",
      "Losses from two years ago still inform how you qualify.",
    ],
    blindSpots: [
      "You learn something from every lost deal and don't notice you've lost six in a row the same way.",
      "You take the blame for losses that were about budget, and learn a lesson from a deal that had none.",
      "You're on month four of trying a new approach in live deals, and the first month already told you.",
      "A run of losses gets analyzed rather than escalated, so nobody senior finds out in time.",
    ],
    inTheDeal:
      "In a live deal, the Resilient Student loses a competitive evaluation, calls the buyer a week later to ask what actually decided it, and hears something nobody on the team knew. The next three evaluations go differently. Almost nobody makes that call. The same steadiness means a quarter of losses feels like a quarter of material, and you'll be several months into the pattern before anyone, including you, treats it as one.",
    sellsBestTo:
      "Competitive categories with frequent head-to-head losses, which is where the learning is. Companies with enough deal volume that the lessons arrive fast. Low-volume enterprise sales where you might lose four deals in a year give your method almost nothing to work on.",
    growthEdge:
      "Pull up your last ten closed-lost deals and the notes you wrote on each. The notes are honest and specific. Read them in order and see how many name the same cause.",
    tension:
      "Studying works because failure teaches. Resilience makes failure cost nothing. So you get the lesson and none of the alarm, and the sixth loss arrives with the same weight as the first. The seller who takes losses badly reaches a point where they stop and ask for help. You're still learning.",
    mistakenFor: {
      slug: 'resilient-closer',
      name: 'Resilient Closer',
      tell: "The Resilient Closer stays in the uncomfortable room until it closes. You stay with the uncomfortable deal after it's lost. If your persistence shows up in live deals rather than in post-mortems, the Closer page fits better.",
    },
    adjacent: ['resilient-closer', 'resilient-architect', 'resilient-advisor'],
  },
  {
    slug: 'devoted-student',
    name: 'Devoted Student',
    trait: 'Devoted',
    style: 'Student',
    tagline: "You learned their business, and it took a year.",
    metaDescription:
      "The Devoted Student studies the customer's industry until they can speak it natively. Strengths, blind spots, and how this selling style wins. Take the free assessment.",
    intro: [
      "The Devoted Student studies the customer's world. Their industry's regulations, the metrics their CFO is judged on, the workflow your product sits inside. You read their trade press. You know what a bad quarter looks like in their sector, and why.",
      "That depth is why buyers treat you as one of them rather than as a vendor. Every hour of it went into their world, which is a large number of hours that didn't go into getting better at selling.",
    ],
    strengths: [
      "You use the buyer's industry vocabulary correctly, including the terms outsiders get subtly wrong.",
      "You know which regulation is about to change their budget, before their vendor list does.",
      "Buyers explain less to you, so meetings start further along.",
      "A customer's internal problem makes sense to you without a translation.",
    ],
    blindSpots: [
      "You know the customer's industry better than your own product roadmap.",
      "Your selling skills are the same as they were three years ago, and nobody has mentioned it.",
      "You'll spend a weekend on an industry report and skip the call review.",
      "Knowledge of one vertical doesn't transfer, and a territory change costs you most of it.",
    ],
    inTheDeal:
      "In a live deal, the Devoted Student knows that the buyer's compliance deadline moved and that half their sector is quietly behind, and frames the entire business case around the new date. The buyer stops treating you as a vendor. Very few sellers in the category can have that conversation. What it cost is the other kind of study: the way you handle a pricing objection is the way you handled it in year one.",
    sellsBestTo:
      "Regulated and specialized industries where outsiders can't fake fluency. Verticalized territories you'll hold for years. Horizontal products sold across twelve industries make the depth impossible, and you'll be shallow everywhere while trying.",
    growthEdge:
      "Count the hours you spent last year learning your customers' industry. Then count the hours you spent learning to sell. You know which number is larger.",
    tension:
      "Devotion studies the customer. Studying rewards whatever you put the hours into. Both point at the same place, and nothing in you ever argues for the hour spent on your own craft. You get deeper into their world every year and stay exactly where you were in yours.",
    mistakenFor: {
      slug: 'devoted-advisor',
      name: 'Devoted Advisor',
      tell: "The Devoted Advisor uses what they know to tell the buyer what to do. You use it to understand them. If your knowledge usually arrives as a recommendation, the Advisor is the better read.",
    },
    adjacent: ['devoted-advisor', 'devoted-architect', 'devoted-cultivator'],
  },
  {
    slug: 'strategic-student',
    name: 'Strategic Student',
    trait: 'Strategic',
    style: 'Student',
    tagline: "You're studying for the job you'll have in two years.",
    metaDescription:
      "The Strategic Student learns with a destination in mind, arriving at each level already fluent. Strengths, blind spots, and how this selling style wins. Take the free assessment.",
    intro: [
      "The Strategic Student learns with a destination in mind. You picked up pricing strategy because you intend to sell to CFOs, read about the category's consolidation because you plan to be the one who understands it, and learned the enterprise motion while you were still working mid-market. Nothing you study is accidental.",
      "That pays off in a way random learning doesn't: you arrive at each new level already fluent in it. Some of what you learned has been waiting two years for a deal that would use it.",
    ],
    strengths: [
      "You're fluent in the next segment up before you're promoted into it.",
      "Your learning has a thesis, so the pieces connect rather than sitting in isolation.",
      "You can hold a conversation with a buyer three levels above your usual contact.",
      "You were reading about multi-year contracts a year before you had a deal big enough to need one.",
    ],
    blindSpots: [
      "The skill your current deals need gets less time than the one your future ones will.",
      "You learn the enterprise motion while losing mid-market deals to someone who mastered mid-market.",
      "Your plan assumes a market that may not arrive, and the study time is spent either way.",
      "Knowledge with no deal to use it in decays, and you find out when you finally need it.",
    ],
    inTheDeal:
      "In a live deal, the Strategic Student handles a CFO's question about payback period without help, because you studied unit economics a year before you had any deals that reached a CFO. The deal clears a stage most reps at your level stall in. That's what the preparation was for. It also means the hours came out of quarters where your actual deals were mid-market and needed something else.",
    sellsBestTo:
      "Categories with a clear ladder, where the skills of the next segment are knowable in advance. Companies that promote from within and reward readiness. Volatile markets where the required skills change faster than you can prepare for them turn your preparation into a bet you lose quietly.",
    growthEdge:
      "There's something you studied two years ago for a role you expected to be in by now. You were right that it mattered. The timeline was the part you got wrong, and the knowledge has been sitting unused since.",
    tension:
      "Strategy studies for where you're going. Learning compounds where you apply it. You apply almost none of what you learn in the quarter you learn it, so the compounding is deferred and the current quarter runs on last year's skills. The bet is usually right. It's still a bet, placed with hours you only get once.",
    mistakenFor: {
      slug: 'strategic-architect',
      name: 'Strategic Architect',
      tell: "The Strategic Architect builds the path through a deal. You build the path through a career. If your planning shows up in account strategy rather than in what you study on a Sunday, the Architect page is yours.",
    },
    adjacent: ['strategic-connector', 'methodical-student', 'strategic-advisor'],
  },
  {
    slug: 'authentic-student',
    name: 'Authentic Student',
    trait: 'Authentic',
    style: 'Student',
    tagline: "You'll admit in a team meeting that you don't know how to do something.",
    metaDescription:
      "The Authentic Student learns out loud, naming their own gaps in front of everyone. Strengths, blind spots, and how this selling style wins. Take the free assessment.",
    intro: [
      "The Authentic Student learns out loud. You'll say in a pipeline review that you handled an objection badly, ask a junior rep to explain something everyone assumes you know, and tell a buyer plainly when a question is outside what you understand. None of it is performed humility. You just don't see the point of pretending.",
      "That honesty accelerates you. Nobody has to guess where your gaps are. The visibility is permanent, though, and people remember the gaps longer than they remember the fix.",
    ],
    strengths: [
      "You ask the question everyone else in the room was also unsure about.",
      "Your manager coaches you on real problems, because you told them what the problems were.",
      "A buyer's hard technical question gets an honest \"I don't know, I'll find out,\" and the trust survives.",
      "Junior reps teach you things, since you asked them directly.",
    ],
    blindSpots: [
      "You name a weakness in front of people who make decisions about your territory.",
      "Your development gets discussed openly while a quieter peer's stays invisible.",
      "You admit uncertainty to a buyer who needed confidence in that moment.",
      "The gap you named in three consecutive pipeline reviews is the same gap.",
    ],
    inTheDeal:
      "In a live deal, the Authentic Student tells a technical buyer they don't know whether the integration handles their edge case, comes back the next day with the real answer, and the buyer's trust goes up rather than down. Almost no seller risks that. In the same week, a director who sat in on the call carries a note about your product gaps that no correction ever quite erases.",
    sellsBestTo:
      "Technical buyers who punish bluffing and reward accuracy. Teams with a real coaching culture, where admitted gaps get closed rather than filed. Political organizations, internal or external, where visible weakness is used, take more from you than the honesty returns.",
    growthEdge:
      "Something you admitted not knowing eighteen months ago, you now do well. The person you admitted it to still brings it up. The learning finished a long time before the reputation did.",
    tension:
      "Learning needs the gap named. Authenticity names it without editing. Both want the same thing, so nothing in you weighs the room before it comes out. You say it to your manager, to the buyer, to the new rep, in the same words, and the ones who use it against you got it from the same sentence that got you the help.",
    mistakenFor: {
      slug: 'authentic-advisor',
      name: 'Authentic Advisor',
      tell: "The Authentic Advisor's honesty is pointed at the buyer's decision. Yours is pointed at yourself. If the uncomfortable thing you say is usually about their plan rather than your own gaps, the Advisor is closer.",
    },
    adjacent: ['authentic-advisor', 'authentic-architect', 'authentic-closer'],
  },
]

export function getArchetype(slug: string): Archetype | undefined {
  return archetypes.find((a) => a.slug === slug)
}

export function getAllArchetypeSlugs(): { slug: string }[] {
  return archetypes.map((a) => ({ slug: a.slug }))
}
