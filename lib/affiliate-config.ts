export interface AffiliateEntry {
  slug: string            // internal identifier used in /go/[slug]
  displayName: string     // how it renders in the Codex
  matcher: string[]       // lowercase strings matched against generated text
  affiliateUrl: string | null  // real affiliate URL — null until program approved
  fallbackUrl: string     // where to send users if affiliateUrl is null
}

export const AFFILIATE_CONFIG: AffiliateEntry[] = [
  // ── Books (Amazon Associates) ──
  {
    slug: 'spin-selling',
    displayName: 'SPIN Selling',
    matcher: ['spin selling'],
    affiliateUrl: 'https://www.amazon.com/dp/0070511136?tag=thenobleselle-20',
    fallbackUrl: 'https://www.amazon.com/dp/0070511136',
  },
  {
    slug: 'challenger-sale',
    displayName: 'The Challenger Sale',
    matcher: ['the challenger sale', 'challenger sale'],
    affiliateUrl: 'https://www.amazon.com/dp/0670922854?tag=thenobleselle-20',
    fallbackUrl: 'https://www.amazon.com/dp/0670922854',
  },
  {
    slug: 'never-split-the-difference',
    displayName: 'Never Split the Difference',
    matcher: ['never split the difference', 'chris voss'],
    affiliateUrl: 'https://www.amazon.com/dp/1847941486?tag=thenobleselle-20',
    fallbackUrl: 'https://www.amazon.com/dp/1847941486',
  },
  {
    slug: 'sales-development-playbook',
    displayName: 'The Sales Development Playbook',
    matcher: ['sales development playbook'],
    affiliateUrl: 'https://www.amazon.com/dp/0692622039?tag=thenobleselle-20',
    fallbackUrl: 'https://www.amazon.com/dp/0692622039',
  },
  {
    slug: 'fanatical-prospecting',
    displayName: 'Fanatical Prospecting',
    matcher: ['fanatical prospecting', 'jeb blount'],
    affiliateUrl: 'https://www.amazon.com/dp/1119144752?tag=thenobleselle-20',
    fallbackUrl: 'https://www.amazon.com/dp/1119144752',
  },
  {
    slug: 'gap-selling',
    displayName: 'Gap Selling',
    matcher: ['gap selling'],
    affiliateUrl: 'https://www.amazon.com/dp/1732891028?tag=thenobleselle-20',
    fallbackUrl: 'https://www.amazon.com/dp/1732891028',
  },
  {
    slug: 'to-sell-is-human',
    displayName: 'To Sell Is Human',
    matcher: ['to sell is human', 'daniel pink'],
    affiliateUrl: 'https://www.amazon.com/dp/1594631905?tag=thenobleselle-20',
    fallbackUrl: 'https://www.amazon.com/dp/1594631905',
  },
  {
    slug: 'predictable-revenue',
    displayName: 'Predictable Revenue',
    matcher: ['predictable revenue', 'aaron ross'],
    affiliateUrl: 'https://www.amazon.com/dp/0984380213?tag=thenobleselle-20',
    fallbackUrl: 'https://www.amazon.com/dp/0984380213',
  },
  {
    slug: 'thinking-fast-and-slow',
    displayName: 'Thinking Fast and Slow',
    matcher: ['thinking fast and slow'],
    affiliateUrl: 'https://www.amazon.com/dp/0374533555?tag=thenobleselle-20',
    fallbackUrl: 'https://www.amazon.com/dp/0374533555',
  },
  {
    slug: 'meddicc',
    displayName: 'Meddicc',
    matcher: ['meddicc'],
    affiliateUrl: 'https://www.amazon.com/dp/1838239707?tag=thenobleselle-20',
    fallbackUrl: 'https://www.amazon.com/dp/1838239707',
  },
  {
    slug: 'atomic-habits',
    displayName: 'Atomic Habits',
    matcher: ['atomic habits', 'james clear'],
    affiliateUrl: 'https://www.amazon.com/dp/0735211299?tag=thenobleselle-20',
    fallbackUrl: 'https://www.amazon.com/dp/0735211299',
  },
  {
    slug: 'inner-game-of-tennis',
    displayName: 'The Inner Game of Tennis',
    matcher: ['inner game of tennis'],
    affiliateUrl: 'https://www.amazon.com/dp/0679778314?tag=thenobleselle-20',
    fallbackUrl: 'https://www.amazon.com/dp/0679778314',
  },
  {
    slug: 'extreme-ownership',
    displayName: 'Extreme Ownership',
    matcher: ['extreme ownership'],
    affiliateUrl: 'https://www.amazon.com/dp/1250183863?tag=thenobleselle-20',
    fallbackUrl: 'https://www.amazon.com/dp/1250183863',
  },
  {
    slug: 'psychology-of-selling',
    displayName: 'The Psychology of Selling',
    matcher: ['psychology of selling', 'brian tracy'],
    affiliateUrl: 'https://www.amazon.com/dp/0785288066?tag=thenobleselle-20',
    fallbackUrl: 'https://www.amazon.com/dp/0785288066',
  },
  {
    slug: 'trusted-advisor',
    displayName: 'The Trusted Advisor',
    matcher: ['the trusted advisor'],
    affiliateUrl: 'https://www.amazon.com/dp/1982157100?tag=thenobleselle-20',
    fallbackUrl: 'https://www.amazon.com/dp/1982157100',
  },
  {
    slug: 'emotional-intelligence',
    displayName: 'Emotional Intelligence',
    matcher: ['daniel goleman'],
    affiliateUrl: 'https://www.amazon.com/dp/055338371X?tag=thenobleselle-20',
    fallbackUrl: 'https://www.amazon.com/dp/055338371X',
  },
  {
    slug: 'emotional-intelligence-2',
    displayName: 'Emotional Intelligence 2.0',
    matcher: ['emotional intelligence 2.0', 'travis bradberry'],
    affiliateUrl: 'https://www.amazon.com/dp/0974320625?tag=thenobleselle-20',
    fallbackUrl: 'https://www.amazon.com/dp/0974320625',
  },
  {
    slug: 'influence',
    displayName: 'Influence',
    matcher: ['influence: the psychology of persuasion', 'robert cialdini'],
    affiliateUrl: 'https://www.amazon.com/dp/006124189X?tag=thenobleselle-20',
    fallbackUrl: 'https://www.amazon.com/dp/006124189X',
  },
  {
    slug: 'what-every-body-is-saying',
    displayName: 'What Every BODY Is Saying',
    matcher: ['what every body is saying', 'joe navarro'],
    affiliateUrl: 'https://www.amazon.com/dp/0061438294?tag=thenobleselle-20',
    fallbackUrl: 'https://www.amazon.com/dp/0061438294',
  },
  {
    slug: 'the-like-switch',
    displayName: 'The Like Switch',
    matcher: ['the like switch', 'jack schafer'],
    affiliateUrl: 'https://www.amazon.com/dp/1476754489?tag=thenobleselle-20',
    fallbackUrl: 'https://www.amazon.com/dp/1476754489',
  },
  {
    slug: 'talking-to-strangers',
    displayName: 'Talking to Strangers',
    matcher: ['talking to strangers', 'malcolm gladwell'],
    affiliateUrl: 'https://www.amazon.com/dp/0316299227?tag=thenobleselle-20',
    fallbackUrl: 'https://www.amazon.com/dp/0316299227',
  },
  {
    slug: 'nonviolent-communication',
    displayName: 'Nonviolent Communication',
    matcher: ['nonviolent communication', 'marshall rosenberg'],
    affiliateUrl: 'https://www.amazon.com/dp/189200528X?tag=thenobleselle-20',
    fallbackUrl: 'https://www.amazon.com/dp/189200528X',
  },
  {
    slug: 'youre-not-listening',
    displayName: 'You\'re Not Listening',
    matcher: ['you\'re not listening', 'kate murphy'],
    affiliateUrl: 'https://www.amazon.com/dp/1250779871?tag=thenobleselle-20',
    fallbackUrl: 'https://www.amazon.com/dp/1250779871',
  },
  {
    slug: 'just-listen',
    displayName: 'Just Listen',
    matcher: ['mark goulston'],
    affiliateUrl: 'https://www.amazon.com/dp/0814436471?tag=thenobleselle-20',
    fallbackUrl: 'https://www.amazon.com/dp/0814436471',
  },
  {
    slug: 'humble-inquiry',
    displayName: 'Humble Inquiry',
    matcher: ['humble inquiry', 'edgar schein'],
    affiliateUrl: 'https://www.amazon.com/dp/B0DJCSXNMK?tag=thenobleselle-20',
    fallbackUrl: 'https://www.amazon.com/dp/B0DJCSXNMK',
  },
  {
    slug: 'lost-art-of-listening',
    displayName: 'The Lost Art of Listening',
    matcher: ['the lost art of listening', 'michael nichols'],
    affiliateUrl: 'https://www.amazon.com/dp/1462542743?tag=thenobleselle-20',
    fallbackUrl: 'https://www.amazon.com/dp/1462542743',
  },
  {
    slug: 'the-coaching-habit',
    displayName: 'The Coaching Habit',
    matcher: ['the coaching habit', 'michael bungay stanier'],
    affiliateUrl: 'https://www.amazon.com/dp/0978440749?tag=thenobleselle-20',
    fallbackUrl: 'https://www.amazon.com/dp/0978440749',
  },
  {
    slug: 'a-more-beautiful-question',
    displayName: 'A More Beautiful Question',
    matcher: ['a more beautiful question', 'warren berger'],
    affiliateUrl: 'https://www.amazon.com/dp/1632861054?tag=thenobleselle-20',
    fallbackUrl: 'https://www.amazon.com/dp/1632861054',
  },
  {
    slug: 'questions-are-the-answer',
    displayName: 'Questions Are the Answer',
    matcher: ['questions are the answer', 'hal gregersen'],
    affiliateUrl: 'https://www.amazon.com/dp/0062844768?tag=thenobleselle-20',
    fallbackUrl: 'https://www.amazon.com/dp/0062844768',
  },
  {
    slug: 'curious',
    displayName: 'Curious',
    matcher: ['ian leslie'],
    affiliateUrl: 'https://www.amazon.com/dp/0465097626?tag=thenobleselle-20',
    fallbackUrl: 'https://www.amazon.com/dp/0465097626',
  },
  {
    slug: 'motivational-interviewing',
    displayName: 'Motivational Interviewing',
    matcher: ['motivational interviewing', 'miller and rollnick'],
    affiliateUrl: 'https://www.amazon.com/dp/146255279X?tag=thenobleselle-20',
    fallbackUrl: 'https://www.amazon.com/dp/146255279X',
  },
  {
    slug: 'a-curious-mind',
    displayName: 'A Curious Mind',
    matcher: ['a curious mind', 'brian grazer'],
    affiliateUrl: 'https://www.amazon.com/dp/1476730776?tag=thenobleselle-20',
    fallbackUrl: 'https://www.amazon.com/dp/1476730776',
  },
  {
    slug: 'wait-what',
    displayName: 'Wait, What?',
    matcher: ['wait, what?', 'james ryan'],
    affiliateUrl: 'https://www.amazon.com/dp/0062664573?tag=thenobleselle-20',
    fallbackUrl: 'https://www.amazon.com/dp/0062664573',
  },
  {
    slug: 'grit',
    displayName: 'Grit',
    matcher: ['angela duckworth'],
    affiliateUrl: 'https://www.amazon.com/dp/1501111116?tag=thenobleselle-20',
    fallbackUrl: 'https://www.amazon.com/dp/1501111116',
  },
  {
    slug: 'mindset',
    displayName: 'Mindset',
    matcher: ['carol dweck'],
    affiliateUrl: 'https://www.amazon.com/dp/0345472322?tag=thenobleselle-20',
    fallbackUrl: 'https://www.amazon.com/dp/0345472322',
  },
  {
    slug: 'mans-search-for-meaning',
    displayName: 'Man\'s Search for Meaning',
    matcher: ['man\'s search for meaning', 'viktor frankl'],
    affiliateUrl: 'https://www.amazon.com/dp/0807014273?tag=thenobleselle-20',
    fallbackUrl: 'https://www.amazon.com/dp/0807014273',
  },
  {
    slug: 'the-obstacle-is-the-way',
    displayName: 'The Obstacle Is the Way',
    matcher: ['the obstacle is the way', 'ryan holiday'],
    affiliateUrl: 'https://www.amazon.com/dp/0593949099?tag=thenobleselle-20',
    fallbackUrl: 'https://www.amazon.com/dp/0593949099',
  },
  {
    slug: 'rejection-proof',
    displayName: 'Rejection Proof',
    matcher: ['rejection proof', 'jia jiang'],
    affiliateUrl: 'https://www.amazon.com/dp/1847941451?tag=thenobleselle-20',
    fallbackUrl: 'https://www.amazon.com/dp/1847941451',
  },
  {
    slug: 'option-b',
    displayName: 'Option B',
    matcher: ['option b', 'sheryl sandberg'],
    affiliateUrl: 'https://www.amazon.com/dp/1524732680?tag=thenobleselle-20',
    fallbackUrl: 'https://www.amazon.com/dp/1524732680',
  },
  {
    slug: 'antifragile',
    displayName: 'Antifragile',
    matcher: ['antifragile', 'nassim taleb'],
    affiliateUrl: 'https://www.amazon.com/dp/0812979680?tag=thenobleselle-20',
    fallbackUrl: 'https://www.amazon.com/dp/0812979680',
  },
  {
    slug: 'meditations',
    displayName: 'Meditations',
    matcher: ['marcus aurelius'],
    affiliateUrl: 'https://www.amazon.com/dp/9354407269?tag=thenobleselle-20',
    fallbackUrl: 'https://www.amazon.com/dp/9354407269',
  },
  {
    slug: 'the-confident-mind',
    displayName: 'The Confident Mind',
    matcher: ['the confident mind', 'nate zinsser'],
    affiliateUrl: 'https://www.amazon.com/dp/1847942946?tag=thenobleselle-20',
    fallbackUrl: 'https://www.amazon.com/dp/1847942946',
  },
  {
    slug: 'the-alter-ego-effect',
    displayName: 'The Alter Ego Effect',
    matcher: ['the alter ego effect', 'todd herman'],
    affiliateUrl: 'https://www.amazon.com/dp/0062959735?tag=thenobleselle-20',
    fallbackUrl: 'https://www.amazon.com/dp/0062959735',
  },
  {
    slug: 'pitch-anything',
    displayName: 'Pitch Anything',
    matcher: ['pitch anything', 'oren klaff'],
    affiliateUrl: 'https://www.amazon.com/dp/0071752854?tag=thenobleselle-20',
    fallbackUrl: 'https://www.amazon.com/dp/0071752854',
  },
  {
    slug: 'lost-art-of-closing',
    displayName: 'The Lost Art of Closing',
    matcher: ['the lost art of closing', 'anthony iannarino'],
    affiliateUrl: 'https://www.amazon.com/dp/0735211698?tag=thenobleselle-20',
    fallbackUrl: 'https://www.amazon.com/dp/0735211698',
  },
  {
    slug: 'pre-suasion',
    displayName: 'Pre-Suasion',
    matcher: ['pre-suasion'],
    affiliateUrl: 'https://www.amazon.com/dp/1501109804?tag=thenobleselle-20',
    fallbackUrl: 'https://www.amazon.com/dp/1501109804',
  },
  {
    slug: 'paradox-of-choice',
    displayName: 'The Paradox of Choice',
    matcher: ['the paradox of choice', 'barry schwartz'],
    affiliateUrl: 'https://www.amazon.com/dp/0062449923?tag=thenobleselle-20',
    fallbackUrl: 'https://www.amazon.com/dp/0062449923',
  },
  {
    slug: 'the-charisma-myth',
    displayName: 'The Charisma Myth',
    matcher: ['the charisma myth', 'olivia fox cabane'],
    affiliateUrl: 'https://www.amazon.com/dp/1591845947?tag=thenobleselle-20',
    fallbackUrl: 'https://www.amazon.com/dp/1591845947',
  },
  {
    slug: 'secrets-of-closing-the-sale',
    displayName: 'Secrets of Closing the Sale',
    matcher: ['secrets of closing the sale', 'zig ziglar'],
    affiliateUrl: 'https://www.amazon.com/dp/0425081028?tag=thenobleselle-20',
    fallbackUrl: 'https://www.amazon.com/dp/0425081028',
  },
  {
    slug: 'new-sales-simplified',
    displayName: 'New Sales. Simplified.',
    matcher: ['new sales. simplified', 'new sales simplified', 'mike weinberg'],
    affiliateUrl: 'https://www.amazon.com/dp/0814431771?tag=thenobleselle-20',
    fallbackUrl: 'https://www.amazon.com/dp/0814431771',
  },
  {
    slug: 'smart-calling',
    displayName: 'Smart Calling',
    matcher: ['smart calling', 'art sobczak'],
    affiliateUrl: 'https://www.amazon.com/dp/111967672X?tag=thenobleselle-20',
    fallbackUrl: 'https://www.amazon.com/dp/111967672X',
  },
  {
    slug: 'feel-the-fear',
    displayName: 'Feel the Fear and Do It Anyway',
    matcher: ['feel the fear and do it anyway', 'susan jeffers'],
    affiliateUrl: 'https://www.amazon.com/dp/0091947448?tag=thenobleselle-20',
    fallbackUrl: 'https://www.amazon.com/dp/0091947448',
  },
  {
    slug: 'the-confidence-gap',
    displayName: 'The Confidence Gap',
    matcher: ['the confidence gap', 'russ harris'],
    affiliateUrl: 'https://www.amazon.com/dp/1590309235?tag=thenobleselle-20',
    fallbackUrl: 'https://www.amazon.com/dp/1590309235',
  },
  {
    slug: 'exactly-what-to-say',
    displayName: 'Exactly What to Say',
    matcher: ['exactly what to say', 'phil m. jones', 'phil jones'],
    affiliateUrl: 'https://www.amazon.com/dp/1989025005?tag=thenobleselle-20',
    fallbackUrl: 'https://www.amazon.com/dp/1989025005',
  },
  {
    slug: 'thinking-in-bets',
    displayName: 'Thinking in Bets',
    matcher: ['thinking in bets', 'annie duke'],
    affiliateUrl: 'https://www.amazon.com/dp/0735216371?tag=thenobleselle-20',
    fallbackUrl: 'https://www.amazon.com/dp/0735216371',
  },
  {
    slug: 'how-to-measure-anything',
    displayName: 'How to Measure Anything',
    matcher: ['how to measure anything', 'douglas hubbard'],
    affiliateUrl: 'https://www.amazon.com/dp/1118539273?tag=thenobleselle-20',
    fallbackUrl: 'https://www.amazon.com/dp/1118539273',
  },
  {
    slug: 'superforecasting',
    displayName: 'Superforecasting',
    matcher: ['superforecasting', 'philip tetlock'],
    affiliateUrl: 'https://www.amazon.com/dp/0804136718?tag=thenobleselle-20',
    fallbackUrl: 'https://www.amazon.com/dp/0804136718',
  },
  {
    slug: 'predictably-irrational',
    displayName: 'Predictably Irrational',
    matcher: ['predictably irrational', 'dan ariely'],
    affiliateUrl: 'https://www.amazon.com/dp/0061353248?tag=thenobleselle-20',
    fallbackUrl: 'https://www.amazon.com/dp/0061353248',
  },
  {
    slug: 'signal-and-the-noise',
    displayName: 'The Signal and the Noise',
    matcher: ['the signal and the noise', 'nate silver'],
    affiliateUrl: 'https://www.amazon.com/dp/0143125087?tag=thenobleselle-20',
    fallbackUrl: 'https://www.amazon.com/dp/0143125087',
  },
  {
    slug: 'speed-of-trust',
    displayName: 'The Speed of Trust',
    matcher: ['the speed of trust', 'stephen m.r. covey'],
    affiliateUrl: 'https://www.amazon.com/dp/1416549005?tag=thenobleselle-20',
    fallbackUrl: 'https://www.amazon.com/dp/1416549005',
  },
  {
    slug: 'daring-greatly',
    displayName: 'Daring Greatly',
    matcher: ['daring greatly', 'brene brown', 'brené brown'],
    affiliateUrl: 'https://www.amazon.com/dp/1592408419?tag=thenobleselle-20',
    fallbackUrl: 'https://www.amazon.com/dp/1592408419',
  },
  {
    slug: 'lets-get-real',
    displayName: 'Let\'s Get Real or Let\'s Not Play',
    matcher: ['let\'s get real or let\'s not play', 'mahan khalsa'],
    affiliateUrl: 'https://www.amazon.com/dp/B00N4IHJOU?tag=thenobleselle-20',
    fallbackUrl: 'https://www.amazon.com/dp/B00N4IHJOU',
  },
  {
    slug: 'integrity-cloud',
    displayName: 'Integrity',
    matcher: ['henry cloud'],
    affiliateUrl: 'https://www.amazon.com/dp/006084969X?tag=thenobleselle-20',
    fallbackUrl: 'https://www.amazon.com/dp/006084969X',
  },
  {
    slug: 'radical-candor',
    displayName: 'Radical Candor',
    matcher: ['radical candor', 'kim scott'],
    affiliateUrl: 'https://www.amazon.com/dp/1250235375?tag=thenobleselle-20',
    fallbackUrl: 'https://www.amazon.com/dp/1250235375',
  },
  {
    slug: 'checklist-manifesto',
    displayName: 'The Checklist Manifesto',
    matcher: ['the checklist manifesto', 'atul gawande'],
    affiliateUrl: 'https://www.amazon.com/dp/0312430000?tag=thenobleselle-20',
    fallbackUrl: 'https://www.amazon.com/dp/0312430000',
  },
  {
    slug: 'sales-acceleration-formula',
    displayName: 'The Sales Acceleration Formula',
    matcher: ['the sales acceleration formula', 'mark roberge'],
    affiliateUrl: 'https://www.amazon.com/dp/1119047072?tag=thenobleselle-20',
    fallbackUrl: 'https://www.amazon.com/dp/1119047072',
  },
  {
    slug: 'deep-work',
    displayName: 'Deep Work',
    matcher: ['deep work', 'cal newport'],
    affiliateUrl: 'https://www.amazon.com/dp/0349413681?tag=thenobleselle-20',
    fallbackUrl: 'https://www.amazon.com/dp/0349413681',
  },
  {
    slug: 'getting-things-done',
    displayName: 'Getting Things Done',
    matcher: ['getting things done', 'david allen'],
    affiliateUrl: 'https://www.amazon.com/dp/0143126563?tag=thenobleselle-20',
    fallbackUrl: 'https://www.amazon.com/dp/0143126563',
  },
  {
    slug: 'the-effective-executive',
    displayName: 'The Effective Executive',
    matcher: ['the effective executive', 'peter drucker'],
    affiliateUrl: 'https://www.amazon.com/dp/0060833459?tag=thenobleselle-20',
    fallbackUrl: 'https://www.amazon.com/dp/0060833459',
  },
  {
    slug: 'range',
    displayName: 'Range',
    matcher: ['david epstein'],
    affiliateUrl: 'https://www.amazon.com/dp/0735214506?tag=thenobleselle-20',
    fallbackUrl: 'https://www.amazon.com/dp/0735214506',
  },
  {
    slug: 'upstream',
    displayName: 'Upstream',
    matcher: ['dan heath'],
    affiliateUrl: 'https://www.amazon.com/dp/1982134720?tag=thenobleselle-20',
    fallbackUrl: 'https://www.amazon.com/dp/1982134720',
  },
  {
    slug: 'decisive',
    displayName: 'Decisive',
    matcher: ['chip and dan heath'],
    affiliateUrl: 'https://www.amazon.com/dp/1847940862?tag=thenobleselle-20',
    fallbackUrl: 'https://www.amazon.com/dp/1847940862',
  },
  {
    slug: 'art-of-thinking-clearly',
    displayName: 'The Art of Thinking Clearly',
    matcher: ['the art of thinking clearly', 'rolf dobelli'],
    affiliateUrl: 'https://www.amazon.com/dp/0062219693?tag=thenobleselle-20',
    fallbackUrl: 'https://www.amazon.com/dp/0062219693',
  },
  {
    slug: 'getting-to-yes',
    displayName: 'Getting to Yes',
    matcher: ['getting to yes', 'fisher and ury'],
    affiliateUrl: 'https://www.amazon.com/dp/0143118757?tag=thenobleselle-20',
    fallbackUrl: 'https://www.amazon.com/dp/0143118757',
  },
  {
    slug: 'insight-selling',
    displayName: 'Insight Selling',
    matcher: ['insight selling', 'mike schultz'],
    affiliateUrl: 'https://www.amazon.com/dp/1118875354?tag=thenobleselle-20',
    fallbackUrl: 'https://www.amazon.com/dp/1118875354',
  },
  {
    slug: 'effortless-experience',
    displayName: 'The Effortless Experience',
    matcher: ['the effortless experience'],
    affiliateUrl: 'https://www.amazon.com/dp/1591845815?tag=thenobleselle-20',
    fallbackUrl: 'https://www.amazon.com/dp/1591845815',
  },
  {
    slug: 'start-with-why',
    displayName: 'Start With Why',
    matcher: ['start with why', 'simon sinek'],
    affiliateUrl: 'https://www.amazon.com/dp/1591846447?tag=thenobleselle-20',
    fallbackUrl: 'https://www.amazon.com/dp/1591846447',
  },
  {
    slug: 'give-and-take',
    displayName: 'Give and Take',
    matcher: ['give and take', 'adam grant'],
    affiliateUrl: 'https://www.amazon.com/dp/0143124986?tag=thenobleselle-20',
    fallbackUrl: 'https://www.amazon.com/dp/0143124986',
  },
  {
    slug: 'peak',
    displayName: 'Peak',
    matcher: ['anders ericsson'],
    affiliateUrl: 'https://www.amazon.com/dp/0544947223?tag=thenobleselle-20',
    fallbackUrl: 'https://www.amazon.com/dp/0544947223',
  },
  {
    slug: 'think-again',
    displayName: 'Think Again',
    matcher: ['think again'],
    affiliateUrl: 'https://www.amazon.com/dp/1984878123?tag=thenobleselle-20',
    fallbackUrl: 'https://www.amazon.com/dp/1984878123',
  },
  {
    slug: 'ultralearning',
    displayName: 'Ultralearning',
    matcher: ['ultralearning', 'scott young'],
    affiliateUrl: 'https://www.amazon.com/dp/006285268X?tag=thenobleselle-20',
    fallbackUrl: 'https://www.amazon.com/dp/006285268X',
  },
  {
    slug: 'black-box-thinking',
    displayName: 'Black Box Thinking',
    matcher: ['black box thinking', 'matthew syed'],
    affiliateUrl: 'https://www.amazon.com/dp/1591848229?tag=thenobleselle-20',
    fallbackUrl: 'https://www.amazon.com/dp/1591848229',
  },
  {
    slug: 'make-it-stick',
    displayName: 'Make It Stick',
    matcher: ['make it stick', 'peter brown'],
    affiliateUrl: 'https://www.amazon.com/dp/0674729013?tag=thenobleselle-20',
    fallbackUrl: 'https://www.amazon.com/dp/0674729013',
  },
  {
    slug: 'crucial-conversations',
    displayName: 'Crucial Conversations',
    matcher: ['crucial conversations'],
    affiliateUrl: 'https://www.amazon.com/dp/0071401946?tag=thenobleselle-20',
    fallbackUrl: 'https://www.amazon.com/dp/0071401946',
  },
  {
    slug: 'time-to-think',
    displayName: 'Time to Think',
    matcher: ['nancy kline'],
    affiliateUrl: 'https://www.amazon.com/dp/9123799307?tag=thenobleselle-20',
    fallbackUrl: 'https://www.amazon.com/dp/9123799307',
  },
  {
    slug: 'i-hear-you',
    displayName: 'I Hear You',
    matcher: ['michael s. sorensen', 'michael sorensen'],
    affiliateUrl: 'https://www.amazon.com/dp/0999104004?tag=thenobleselle-20',
    fallbackUrl: 'https://www.amazon.com/dp/0999104004',
  },
  {
    slug: 'selling-from-the-heart',
    displayName: 'Selling from the Heart',
    matcher: ['selling from the heart', 'larry levine'],
    affiliateUrl: 'https://www.amazon.com/dp/B0HCYJ6YSH?tag=thenobleselle-20',
    fallbackUrl: 'https://www.amazon.com/dp/B0HCYJ6YSH',
  },
  {
    slug: 'leadership-and-self-deception',
    displayName: 'Leadership and Self-Deception',
    matcher: ['leadership and self-deception'],
    affiliateUrl: 'https://www.amazon.com/dp/1523006560?tag=thenobleselle-20',
    fallbackUrl: 'https://www.amazon.com/dp/1523006560',
  },
  {
    slug: 'courage-to-be-disliked',
    displayName: 'The Courage to Be Disliked',
    matcher: ['the courage to be disliked'],
    affiliateUrl: 'https://www.amazon.com/dp/9124372196?tag=thenobleselle-20',
    fallbackUrl: 'https://www.amazon.com/dp/9124372196',
  },
  {
    slug: 'clear-thinking',
    displayName: 'Clear Thinking',
    matcher: ['shane parrish'],
    affiliateUrl: 'https://www.amazon.com/dp/0593716213?tag=thenobleselle-20',
    fallbackUrl: 'https://www.amazon.com/dp/0593716213',
  },
  {
    slug: 'the-scout-mindset',
    displayName: 'The Scout Mindset',
    matcher: ['the scout mindset'],
    affiliateUrl: 'https://www.amazon.com/dp/0349427658?tag=thenobleselle-20',
    fallbackUrl: 'https://www.amazon.com/dp/0349427658',
  },
  {
    slug: 'thinking-in-systems',
    displayName: 'Thinking in Systems',
    matcher: ['thinking in systems', 'donella meadows'],
    affiliateUrl: 'https://www.amazon.com/dp/1603580557?tag=thenobleselle-20',
    fallbackUrl: 'https://www.amazon.com/dp/1603580557',
  },
  {
    slug: 'the-mom-test',
    displayName: 'The Mom Test',
    matcher: ['the mom test'],
    affiliateUrl: 'https://www.amazon.com/dp/1492180742?tag=thenobleselle-20',
    fallbackUrl: 'https://www.amazon.com/dp/1492180742',
  },
  {
    slug: 'demand-side-sales',
    displayName: 'Demand-Side Sales 101',
    matcher: ['demand-side sales 101', 'demand-side sales'],
    affiliateUrl: 'https://www.amazon.com/dp/1544509987?tag=thenobleselle-20',
    fallbackUrl: 'https://www.amazon.com/dp/1544509987',
  },
  {
    slug: 'obviously-awesome',
    displayName: 'Obviously Awesome',
    matcher: ['obviously awesome'],
    affiliateUrl: 'https://www.amazon.com/dp/1999023005?tag=thenobleselle-20',
    fallbackUrl: 'https://www.amazon.com/dp/1999023005',
  },
  {
    slug: 'thanks-for-the-feedback',
    displayName: 'Thanks for the Feedback',
    matcher: ['stone and heen'],
    affiliateUrl: 'https://www.amazon.com/dp/0143127136?tag=thenobleselle-20',
    fallbackUrl: 'https://www.amazon.com/dp/0143127136',
  },
  {
    slug: 'the-talent-code',
    displayName: 'The Talent Code',
    matcher: ['the talent code'],
    affiliateUrl: 'https://www.amazon.com/dp/1847943047?tag=thenobleselle-20',
    fallbackUrl: 'https://www.amazon.com/dp/1847943047',
  },
  {
    slug: 'mastery-greene',
    displayName: 'Mastery',
    matcher: ['robert greene'],
    affiliateUrl: 'https://www.amazon.com/dp/014312417X?tag=thenobleselle-20',
    fallbackUrl: 'https://www.amazon.com/dp/014312417X',
  },
  // ── Tools ──
  {
    slug: 'apollo',
    displayName: 'Apollo.io',
    matcher: ['apollo.io', 'apollo'],
    affiliateUrl: null,
    fallbackUrl: 'https://www.apollo.io',
  },
  {
    slug: 'hubspot',
    displayName: 'HubSpot Sales Hub',
    matcher: ['hubspot sales hub', 'hubspot', 'sales hub'],
    affiliateUrl: null,
    fallbackUrl: 'https://www.hubspot.com/products/sales',
  },
  {
    slug: 'lavender',
    displayName: 'Lavender',
    matcher: ['lavender'],
    affiliateUrl: null,
    fallbackUrl: 'https://www.lavender.ai',
  },
  {
    slug: 'lemlist',
    displayName: 'Lemlist',
    matcher: ['lemlist'],
    affiliateUrl: null,
    fallbackUrl: 'https://www.lemlist.com',
  },
  {
    slug: 'instantly',
    displayName: 'Instantly.ai',
    matcher: ['instantly.ai'],
    affiliateUrl: null,
    fallbackUrl: 'https://instantly.ai',
  },
  {
    slug: 'clay',
    displayName: 'Clay',
    matcher: ['clay'],
    affiliateUrl: null,
    fallbackUrl: 'https://clay.com',
  },
  {
    slug: 'fathom',
    displayName: 'Fathom',
    matcher: ['fathom'],
    affiliateUrl: null,
    fallbackUrl: 'https://fathom.video',
  },
  {
    slug: 'loom',
    displayName: 'Loom',
    matcher: ['loom'],
    affiliateUrl: null,
    fallbackUrl: 'https://www.loom.com',
  },
  {
    slug: 'linkedin-sales-navigator',
    displayName: 'LinkedIn Sales Navigator',
    matcher: ['sales navigator', 'linkedin sales navigator'],
    affiliateUrl: null,
    fallbackUrl: 'https://business.linkedin.com/sales-solutions',
  },
]

// Resolve the destination for a slug — affiliate URL if set, otherwise fallback
export function resolveAffiliateUrl(slug: string): string | null {
  const entry = AFFILIATE_CONFIG.find(e => e.slug === slug)
  if (!entry) return null
  return entry.affiliateUrl ?? entry.fallbackUrl
}

// Parse text into segments, linking matched resources to /go/[slug]
export function parseAffiliateSegments(
  text: string
): { text: string; slug?: string; displayName?: string }[] {
  const segments: { text: string; slug?: string; displayName?: string }[] = []
  let remaining = text
  const linkedSlugs = new Set<string>()

  while (remaining.length > 0) {
    let earliest: { index: number; entry: AffiliateEntry; matcher: string } | null = null

    for (const entry of AFFILIATE_CONFIG) {
      for (const matcher of entry.matcher) {
        if (!matcher) continue
        const escaped = matcher.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
        const leadingBoundary = /\w/.test(matcher[0]) ? '\\b' : ''
        const trailingBoundary = /\w/.test(matcher[matcher.length - 1]) ? '\\b' : ''
        const match = new RegExp(`${leadingBoundary}${escaped}${trailingBoundary}`, 'i').exec(remaining)
        if (match && (!earliest || match.index < earliest.index)) {
          earliest = { index: match.index, entry, matcher: match[0] }
        }
      }
    }

    if (!earliest) {
      segments.push({ text: remaining })
      break
    }

    if (earliest.index > 0) {
      segments.push({ text: remaining.slice(0, earliest.index) })
    }

    const matchedText = remaining.slice(earliest.index, earliest.index + earliest.matcher.length)
    if (linkedSlugs.has(earliest.entry.slug)) {
      segments.push({ text: matchedText })
    } else {
      linkedSlugs.add(earliest.entry.slug)
      segments.push({
        text: matchedText,
        slug: earliest.entry.slug,
        displayName: earliest.entry.displayName,
      })
    }

    remaining = remaining.slice(earliest.index + earliest.matcher.length)
  }

  return segments
}
