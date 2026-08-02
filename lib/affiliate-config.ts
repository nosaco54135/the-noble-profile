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
    affiliateUrl: 'https://www.amazon.com/dp/0070522359?tag=thenobleselle-20',
    fallbackUrl: 'https://www.amazon.com/dp/0070522359',
  },
  {
    slug: 'challenger-sale',
    displayName: 'The Challenger Sale',
    matcher: ['the challenger sale', 'challenger sale'],
    affiliateUrl: 'https://www.amazon.com/dp/1591844355?tag=thenobleselle-20',
    fallbackUrl: 'https://www.amazon.com/dp/1591844355',
  },
  {
    slug: 'never-split-the-difference',
    displayName: 'Never Split the Difference',
    matcher: ['never split the difference', 'chris voss'],
    affiliateUrl: 'https://www.amazon.com/dp/0062407805?tag=thenobleselle-20',
    fallbackUrl: 'https://www.amazon.com/dp/0062407805',
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
    affiliateUrl: 'https://www.amazon.com/dp/1732891001?tag=thenobleselle-20',
    fallbackUrl: 'https://www.amazon.com/dp/1732891001',
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
    affiliateUrl: 'https://www.amazon.com/dp/1838281118?tag=thenobleselle-20',
    fallbackUrl: 'https://www.amazon.com/dp/1838281118',
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
    affiliateUrl: 'https://www.amazon.com/dp/1250067057?tag=thenobleselle-20',
    fallbackUrl: 'https://www.amazon.com/dp/1250067057',
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
    affiliateUrl: 'https://www.amazon.com/dp/0743212347?tag=thenobleselle-20',
    fallbackUrl: 'https://www.amazon.com/dp/0743212347',
  },
  {
    slug: 'emotional-intelligence',
    displayName: 'Emotional Intelligence',
    matcher: ['daniel goleman'],
    affiliateUrl: 'https://www.amazon.com/s?k=Emotional+Intelligence+Daniel+Goleman&tag=thenobleselle-20',
    fallbackUrl: 'https://www.amazon.com/s?k=Emotional+Intelligence+Daniel+Goleman',
  },
  {
    slug: 'emotional-intelligence-2',
    displayName: 'Emotional Intelligence 2.0',
    matcher: ['emotional intelligence 2.0', 'travis bradberry'],
    affiliateUrl: 'https://www.amazon.com/s?k=Emotional+Intelligence+2.0+Travis+Bradberry&tag=thenobleselle-20',
    fallbackUrl: 'https://www.amazon.com/s?k=Emotional+Intelligence+2.0+Travis+Bradberry',
  },
  {
    slug: 'influence',
    displayName: 'Influence',
    matcher: ['influence: the psychology of persuasion', 'robert cialdini'],
    affiliateUrl: 'https://www.amazon.com/s?k=Influence+Robert+Cialdini&tag=thenobleselle-20',
    fallbackUrl: 'https://www.amazon.com/s?k=Influence+Robert+Cialdini',
  },
  {
    slug: 'what-every-body-is-saying',
    displayName: 'What Every BODY Is Saying',
    matcher: ['what every body is saying', 'joe navarro'],
    affiliateUrl: 'https://www.amazon.com/s?k=What+Every+BODY+Is+Saying+Joe+Navarro&tag=thenobleselle-20',
    fallbackUrl: 'https://www.amazon.com/s?k=What+Every+BODY+Is+Saying+Joe+Navarro',
  },
  {
    slug: 'the-like-switch',
    displayName: 'The Like Switch',
    matcher: ['the like switch', 'jack schafer'],
    affiliateUrl: 'https://www.amazon.com/s?k=The+Like+Switch+Jack+Schafer&tag=thenobleselle-20',
    fallbackUrl: 'https://www.amazon.com/s?k=The+Like+Switch+Jack+Schafer',
  },
  {
    slug: 'talking-to-strangers',
    displayName: 'Talking to Strangers',
    matcher: ['talking to strangers', 'malcolm gladwell'],
    affiliateUrl: 'https://www.amazon.com/s?k=Talking+to+Strangers+Malcolm+Gladwell&tag=thenobleselle-20',
    fallbackUrl: 'https://www.amazon.com/s?k=Talking+to+Strangers+Malcolm+Gladwell',
  },
  {
    slug: 'nonviolent-communication',
    displayName: 'Nonviolent Communication',
    matcher: ['nonviolent communication', 'marshall rosenberg'],
    affiliateUrl: 'https://www.amazon.com/s?k=Nonviolent+Communication+Marshall+Rosenberg&tag=thenobleselle-20',
    fallbackUrl: 'https://www.amazon.com/s?k=Nonviolent+Communication+Marshall+Rosenberg',
  },
  {
    slug: 'youre-not-listening',
    displayName: 'You\'re Not Listening',
    matcher: ['you\'re not listening', 'kate murphy'],
    affiliateUrl: 'https://www.amazon.com/s?k=You%27re+Not+Listening+Kate+Murphy&tag=thenobleselle-20',
    fallbackUrl: 'https://www.amazon.com/s?k=You%27re+Not+Listening+Kate+Murphy',
  },
  {
    slug: 'just-listen',
    displayName: 'Just Listen',
    matcher: ['mark goulston'],
    affiliateUrl: 'https://www.amazon.com/s?k=Just+Listen+Mark+Goulston&tag=thenobleselle-20',
    fallbackUrl: 'https://www.amazon.com/s?k=Just+Listen+Mark+Goulston',
  },
  {
    slug: 'humble-inquiry',
    displayName: 'Humble Inquiry',
    matcher: ['humble inquiry', 'edgar schein'],
    affiliateUrl: 'https://www.amazon.com/s?k=Humble+Inquiry+Edgar+Schein&tag=thenobleselle-20',
    fallbackUrl: 'https://www.amazon.com/s?k=Humble+Inquiry+Edgar+Schein',
  },
  {
    slug: 'lost-art-of-listening',
    displayName: 'The Lost Art of Listening',
    matcher: ['the lost art of listening', 'michael nichols'],
    affiliateUrl: 'https://www.amazon.com/s?k=The+Lost+Art+of+Listening+Michael+Nichols&tag=thenobleselle-20',
    fallbackUrl: 'https://www.amazon.com/s?k=The+Lost+Art+of+Listening+Michael+Nichols',
  },
  {
    slug: 'the-coaching-habit',
    displayName: 'The Coaching Habit',
    matcher: ['the coaching habit', 'michael bungay stanier'],
    affiliateUrl: 'https://www.amazon.com/s?k=The+Coaching+Habit+Michael+Bungay+Stanier&tag=thenobleselle-20',
    fallbackUrl: 'https://www.amazon.com/s?k=The+Coaching+Habit+Michael+Bungay+Stanier',
  },
  {
    slug: 'a-more-beautiful-question',
    displayName: 'A More Beautiful Question',
    matcher: ['a more beautiful question', 'warren berger'],
    affiliateUrl: 'https://www.amazon.com/s?k=A+More+Beautiful+Question+Warren+Berger&tag=thenobleselle-20',
    fallbackUrl: 'https://www.amazon.com/s?k=A+More+Beautiful+Question+Warren+Berger',
  },
  {
    slug: 'questions-are-the-answer',
    displayName: 'Questions Are the Answer',
    matcher: ['questions are the answer', 'hal gregersen'],
    affiliateUrl: 'https://www.amazon.com/s?k=Questions+Are+the+Answer+Hal+Gregersen&tag=thenobleselle-20',
    fallbackUrl: 'https://www.amazon.com/s?k=Questions+Are+the+Answer+Hal+Gregersen',
  },
  {
    slug: 'curious',
    displayName: 'Curious',
    matcher: ['ian leslie'],
    affiliateUrl: 'https://www.amazon.com/s?k=Curious+Ian+Leslie&tag=thenobleselle-20',
    fallbackUrl: 'https://www.amazon.com/s?k=Curious+Ian+Leslie',
  },
  {
    slug: 'motivational-interviewing',
    displayName: 'Motivational Interviewing',
    matcher: ['motivational interviewing', 'miller and rollnick'],
    affiliateUrl: 'https://www.amazon.com/s?k=Motivational+Interviewing+Miller+Rollnick&tag=thenobleselle-20',
    fallbackUrl: 'https://www.amazon.com/s?k=Motivational+Interviewing+Miller+Rollnick',
  },
  {
    slug: 'a-curious-mind',
    displayName: 'A Curious Mind',
    matcher: ['a curious mind', 'brian grazer'],
    affiliateUrl: 'https://www.amazon.com/s?k=A+Curious+Mind+Brian+Grazer&tag=thenobleselle-20',
    fallbackUrl: 'https://www.amazon.com/s?k=A+Curious+Mind+Brian+Grazer',
  },
  {
    slug: 'wait-what',
    displayName: 'Wait, What?',
    matcher: ['wait, what?', 'james ryan'],
    affiliateUrl: 'https://www.amazon.com/s?k=Wait+What+James+Ryan&tag=thenobleselle-20',
    fallbackUrl: 'https://www.amazon.com/s?k=Wait+What+James+Ryan',
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
    affiliateUrl: 'https://www.amazon.com/s?k=Mindset+Carol+Dweck&tag=thenobleselle-20',
    fallbackUrl: 'https://www.amazon.com/s?k=Mindset+Carol+Dweck',
  },
  {
    slug: 'mans-search-for-meaning',
    displayName: 'Man\'s Search for Meaning',
    matcher: ['man\'s search for meaning', 'viktor frankl'],
    affiliateUrl: 'https://www.amazon.com/s?k=Man%27s+Search+for+Meaning+Viktor+Frankl&tag=thenobleselle-20',
    fallbackUrl: 'https://www.amazon.com/s?k=Man%27s+Search+for+Meaning+Viktor+Frankl',
  },
  {
    slug: 'the-obstacle-is-the-way',
    displayName: 'The Obstacle Is the Way',
    matcher: ['the obstacle is the way', 'ryan holiday'],
    affiliateUrl: 'https://www.amazon.com/s?k=The+Obstacle+Is+the+Way+Ryan+Holiday&tag=thenobleselle-20',
    fallbackUrl: 'https://www.amazon.com/s?k=The+Obstacle+Is+the+Way+Ryan+Holiday',
  },
  {
    slug: 'rejection-proof',
    displayName: 'Rejection Proof',
    matcher: ['rejection proof', 'jia jiang'],
    affiliateUrl: 'https://www.amazon.com/s?k=Rejection+Proof+Jia+Jiang&tag=thenobleselle-20',
    fallbackUrl: 'https://www.amazon.com/s?k=Rejection+Proof+Jia+Jiang',
  },
  {
    slug: 'option-b',
    displayName: 'Option B',
    matcher: ['option b', 'sheryl sandberg'],
    affiliateUrl: 'https://www.amazon.com/s?k=Option+B+Sheryl+Sandberg&tag=thenobleselle-20',
    fallbackUrl: 'https://www.amazon.com/s?k=Option+B+Sheryl+Sandberg',
  },
  {
    slug: 'antifragile',
    displayName: 'Antifragile',
    matcher: ['antifragile', 'nassim taleb'],
    affiliateUrl: 'https://www.amazon.com/s?k=Antifragile+Nassim+Taleb&tag=thenobleselle-20',
    fallbackUrl: 'https://www.amazon.com/s?k=Antifragile+Nassim+Taleb',
  },
  {
    slug: 'meditations',
    displayName: 'Meditations',
    matcher: ['marcus aurelius'],
    affiliateUrl: 'https://www.amazon.com/s?k=Meditations+Marcus+Aurelius&tag=thenobleselle-20',
    fallbackUrl: 'https://www.amazon.com/s?k=Meditations+Marcus+Aurelius',
  },
  {
    slug: 'the-confident-mind',
    displayName: 'The Confident Mind',
    matcher: ['the confident mind', 'nate zinsser'],
    affiliateUrl: 'https://www.amazon.com/s?k=The+Confident+Mind+Nate+Zinsser&tag=thenobleselle-20',
    fallbackUrl: 'https://www.amazon.com/s?k=The+Confident+Mind+Nate+Zinsser',
  },
  {
    slug: 'the-alter-ego-effect',
    displayName: 'The Alter Ego Effect',
    matcher: ['the alter ego effect', 'todd herman'],
    affiliateUrl: 'https://www.amazon.com/s?k=The+Alter+Ego+Effect+Todd+Herman&tag=thenobleselle-20',
    fallbackUrl: 'https://www.amazon.com/s?k=The+Alter+Ego+Effect+Todd+Herman',
  },
  {
    slug: 'pitch-anything',
    displayName: 'Pitch Anything',
    matcher: ['pitch anything', 'oren klaff'],
    affiliateUrl: 'https://www.amazon.com/s?k=Pitch+Anything+Oren+Klaff&tag=thenobleselle-20',
    fallbackUrl: 'https://www.amazon.com/s?k=Pitch+Anything+Oren+Klaff',
  },
  {
    slug: 'lost-art-of-closing',
    displayName: 'The Lost Art of Closing',
    matcher: ['the lost art of closing', 'anthony iannarino'],
    affiliateUrl: 'https://www.amazon.com/s?k=The+Lost+Art+of+Closing+Anthony+Iannarino&tag=thenobleselle-20',
    fallbackUrl: 'https://www.amazon.com/s?k=The+Lost+Art+of+Closing+Anthony+Iannarino',
  },
  {
    slug: 'pre-suasion',
    displayName: 'Pre-Suasion',
    matcher: ['pre-suasion'],
    affiliateUrl: 'https://www.amazon.com/s?k=Pre-Suasion+Robert+Cialdini&tag=thenobleselle-20',
    fallbackUrl: 'https://www.amazon.com/s?k=Pre-Suasion+Robert+Cialdini',
  },
  {
    slug: 'paradox-of-choice',
    displayName: 'The Paradox of Choice',
    matcher: ['the paradox of choice', 'barry schwartz'],
    affiliateUrl: 'https://www.amazon.com/s?k=The+Paradox+of+Choice+Barry+Schwartz&tag=thenobleselle-20',
    fallbackUrl: 'https://www.amazon.com/s?k=The+Paradox+of+Choice+Barry+Schwartz',
  },
  {
    slug: 'the-charisma-myth',
    displayName: 'The Charisma Myth',
    matcher: ['the charisma myth', 'olivia fox cabane'],
    affiliateUrl: 'https://www.amazon.com/s?k=The+Charisma+Myth+Olivia+Fox+Cabane&tag=thenobleselle-20',
    fallbackUrl: 'https://www.amazon.com/s?k=The+Charisma+Myth+Olivia+Fox+Cabane',
  },
  {
    slug: 'secrets-of-closing-the-sale',
    displayName: 'Secrets of Closing the Sale',
    matcher: ['secrets of closing the sale', 'zig ziglar'],
    affiliateUrl: 'https://www.amazon.com/s?k=Secrets+of+Closing+the+Sale+Zig+Ziglar&tag=thenobleselle-20',
    fallbackUrl: 'https://www.amazon.com/s?k=Secrets+of+Closing+the+Sale+Zig+Ziglar',
  },
  {
    slug: 'new-sales-simplified',
    displayName: 'New Sales. Simplified.',
    matcher: ['new sales. simplified', 'new sales simplified', 'mike weinberg'],
    affiliateUrl: 'https://www.amazon.com/s?k=New+Sales+Simplified+Mike+Weinberg&tag=thenobleselle-20',
    fallbackUrl: 'https://www.amazon.com/s?k=New+Sales+Simplified+Mike+Weinberg',
  },
  {
    slug: 'smart-calling',
    displayName: 'Smart Calling',
    matcher: ['smart calling', 'art sobczak'],
    affiliateUrl: 'https://www.amazon.com/s?k=Smart+Calling+Art+Sobczak&tag=thenobleselle-20',
    fallbackUrl: 'https://www.amazon.com/s?k=Smart+Calling+Art+Sobczak',
  },
  {
    slug: 'feel-the-fear',
    displayName: 'Feel the Fear and Do It Anyway',
    matcher: ['feel the fear and do it anyway', 'susan jeffers'],
    affiliateUrl: 'https://www.amazon.com/s?k=Feel+the+Fear+and+Do+It+Anyway+Susan+Jeffers&tag=thenobleselle-20',
    fallbackUrl: 'https://www.amazon.com/s?k=Feel+the+Fear+and+Do+It+Anyway+Susan+Jeffers',
  },
  {
    slug: 'the-confidence-gap',
    displayName: 'The Confidence Gap',
    matcher: ['the confidence gap', 'russ harris'],
    affiliateUrl: 'https://www.amazon.com/s?k=The+Confidence+Gap+Russ+Harris&tag=thenobleselle-20',
    fallbackUrl: 'https://www.amazon.com/s?k=The+Confidence+Gap+Russ+Harris',
  },
  {
    slug: 'exactly-what-to-say',
    displayName: 'Exactly What to Say',
    matcher: ['exactly what to say', 'phil m. jones', 'phil jones'],
    affiliateUrl: 'https://www.amazon.com/s?k=Exactly+What+to+Say+Phil+M+Jones&tag=thenobleselle-20',
    fallbackUrl: 'https://www.amazon.com/s?k=Exactly+What+to+Say+Phil+M+Jones',
  },
  {
    slug: 'thinking-in-bets',
    displayName: 'Thinking in Bets',
    matcher: ['thinking in bets', 'annie duke'],
    affiliateUrl: 'https://www.amazon.com/s?k=Thinking+in+Bets+Annie+Duke&tag=thenobleselle-20',
    fallbackUrl: 'https://www.amazon.com/s?k=Thinking+in+Bets+Annie+Duke',
  },
  {
    slug: 'how-to-measure-anything',
    displayName: 'How to Measure Anything',
    matcher: ['how to measure anything', 'douglas hubbard'],
    affiliateUrl: 'https://www.amazon.com/s?k=How+to+Measure+Anything+Douglas+Hubbard&tag=thenobleselle-20',
    fallbackUrl: 'https://www.amazon.com/s?k=How+to+Measure+Anything+Douglas+Hubbard',
  },
  {
    slug: 'superforecasting',
    displayName: 'Superforecasting',
    matcher: ['superforecasting', 'philip tetlock'],
    affiliateUrl: 'https://www.amazon.com/s?k=Superforecasting+Philip+Tetlock&tag=thenobleselle-20',
    fallbackUrl: 'https://www.amazon.com/s?k=Superforecasting+Philip+Tetlock',
  },
  {
    slug: 'predictably-irrational',
    displayName: 'Predictably Irrational',
    matcher: ['predictably irrational', 'dan ariely'],
    affiliateUrl: 'https://www.amazon.com/s?k=Predictably+Irrational+Dan+Ariely&tag=thenobleselle-20',
    fallbackUrl: 'https://www.amazon.com/s?k=Predictably+Irrational+Dan+Ariely',
  },
  {
    slug: 'signal-and-the-noise',
    displayName: 'The Signal and the Noise',
    matcher: ['the signal and the noise', 'nate silver'],
    affiliateUrl: 'https://www.amazon.com/s?k=The+Signal+and+the+Noise+Nate+Silver&tag=thenobleselle-20',
    fallbackUrl: 'https://www.amazon.com/s?k=The+Signal+and+the+Noise+Nate+Silver',
  },
  {
    slug: 'speed-of-trust',
    displayName: 'The Speed of Trust',
    matcher: ['the speed of trust', 'stephen m.r. covey'],
    affiliateUrl: 'https://www.amazon.com/s?k=The+Speed+of+Trust+Stephen+Covey&tag=thenobleselle-20',
    fallbackUrl: 'https://www.amazon.com/s?k=The+Speed+of+Trust+Stephen+Covey',
  },
  {
    slug: 'daring-greatly',
    displayName: 'Daring Greatly',
    matcher: ['daring greatly', 'brene brown', 'brené brown'],
    affiliateUrl: 'https://www.amazon.com/s?k=Daring+Greatly+Brene+Brown&tag=thenobleselle-20',
    fallbackUrl: 'https://www.amazon.com/s?k=Daring+Greatly+Brene+Brown',
  },
  {
    slug: 'lets-get-real',
    displayName: 'Let\'s Get Real or Let\'s Not Play',
    matcher: ['let\'s get real or let\'s not play', 'mahan khalsa'],
    affiliateUrl: 'https://www.amazon.com/s?k=Let%27s+Get+Real+or+Let%27s+Not+Play+Mahan+Khalsa&tag=thenobleselle-20',
    fallbackUrl: 'https://www.amazon.com/s?k=Let%27s+Get+Real+or+Let%27s+Not+Play+Mahan+Khalsa',
  },
  {
    slug: 'integrity-cloud',
    displayName: 'Integrity',
    matcher: ['henry cloud'],
    affiliateUrl: 'https://www.amazon.com/s?k=Integrity+Henry+Cloud&tag=thenobleselle-20',
    fallbackUrl: 'https://www.amazon.com/s?k=Integrity+Henry+Cloud',
  },
  {
    slug: 'radical-candor',
    displayName: 'Radical Candor',
    matcher: ['radical candor', 'kim scott'],
    affiliateUrl: 'https://www.amazon.com/s?k=Radical+Candor+Kim+Scott&tag=thenobleselle-20',
    fallbackUrl: 'https://www.amazon.com/s?k=Radical+Candor+Kim+Scott',
  },
  {
    slug: 'checklist-manifesto',
    displayName: 'The Checklist Manifesto',
    matcher: ['the checklist manifesto', 'atul gawande'],
    affiliateUrl: 'https://www.amazon.com/s?k=The+Checklist+Manifesto+Atul+Gawande&tag=thenobleselle-20',
    fallbackUrl: 'https://www.amazon.com/s?k=The+Checklist+Manifesto+Atul+Gawande',
  },
  {
    slug: 'sales-acceleration-formula',
    displayName: 'The Sales Acceleration Formula',
    matcher: ['the sales acceleration formula', 'mark roberge'],
    affiliateUrl: 'https://www.amazon.com/s?k=The+Sales+Acceleration+Formula+Mark+Roberge&tag=thenobleselle-20',
    fallbackUrl: 'https://www.amazon.com/s?k=The+Sales+Acceleration+Formula+Mark+Roberge',
  },
  {
    slug: 'deep-work',
    displayName: 'Deep Work',
    matcher: ['deep work', 'cal newport'],
    affiliateUrl: 'https://www.amazon.com/s?k=Deep+Work+Cal+Newport&tag=thenobleselle-20',
    fallbackUrl: 'https://www.amazon.com/s?k=Deep+Work+Cal+Newport',
  },
  {
    slug: 'getting-things-done',
    displayName: 'Getting Things Done',
    matcher: ['getting things done', 'david allen'],
    affiliateUrl: 'https://www.amazon.com/s?k=Getting+Things+Done+David+Allen&tag=thenobleselle-20',
    fallbackUrl: 'https://www.amazon.com/s?k=Getting+Things+Done+David+Allen',
  },
  {
    slug: 'the-effective-executive',
    displayName: 'The Effective Executive',
    matcher: ['the effective executive', 'peter drucker'],
    affiliateUrl: 'https://www.amazon.com/s?k=The+Effective+Executive+Peter+Drucker&tag=thenobleselle-20',
    fallbackUrl: 'https://www.amazon.com/s?k=The+Effective+Executive+Peter+Drucker',
  },
  {
    slug: 'range',
    displayName: 'Range',
    matcher: ['david epstein'],
    affiliateUrl: 'https://www.amazon.com/s?k=Range+David+Epstein&tag=thenobleselle-20',
    fallbackUrl: 'https://www.amazon.com/s?k=Range+David+Epstein',
  },
  {
    slug: 'upstream',
    displayName: 'Upstream',
    matcher: ['dan heath'],
    affiliateUrl: 'https://www.amazon.com/s?k=Upstream+Dan+Heath&tag=thenobleselle-20',
    fallbackUrl: 'https://www.amazon.com/s?k=Upstream+Dan+Heath',
  },
  {
    slug: 'decisive',
    displayName: 'Decisive',
    matcher: ['chip and dan heath'],
    affiliateUrl: 'https://www.amazon.com/s?k=Decisive+Chip+Heath+Dan+Heath&tag=thenobleselle-20',
    fallbackUrl: 'https://www.amazon.com/s?k=Decisive+Chip+Heath+Dan+Heath',
  },
  {
    slug: 'art-of-thinking-clearly',
    displayName: 'The Art of Thinking Clearly',
    matcher: ['the art of thinking clearly', 'rolf dobelli'],
    affiliateUrl: 'https://www.amazon.com/s?k=The+Art+of+Thinking+Clearly+Rolf+Dobelli&tag=thenobleselle-20',
    fallbackUrl: 'https://www.amazon.com/s?k=The+Art+of+Thinking+Clearly+Rolf+Dobelli',
  },
  {
    slug: 'getting-to-yes',
    displayName: 'Getting to Yes',
    matcher: ['getting to yes', 'fisher and ury'],
    affiliateUrl: 'https://www.amazon.com/s?k=Getting+to+Yes+Fisher+Ury&tag=thenobleselle-20',
    fallbackUrl: 'https://www.amazon.com/s?k=Getting+to+Yes+Fisher+Ury',
  },
  {
    slug: 'insight-selling',
    displayName: 'Insight Selling',
    matcher: ['insight selling', 'mike schultz'],
    affiliateUrl: 'https://www.amazon.com/s?k=Insight+Selling+Mike+Schultz&tag=thenobleselle-20',
    fallbackUrl: 'https://www.amazon.com/s?k=Insight+Selling+Mike+Schultz',
  },
  {
    slug: 'effortless-experience',
    displayName: 'The Effortless Experience',
    matcher: ['the effortless experience'],
    affiliateUrl: 'https://www.amazon.com/s?k=The+Effortless+Experience+Matthew+Dixon&tag=thenobleselle-20',
    fallbackUrl: 'https://www.amazon.com/s?k=The+Effortless+Experience+Matthew+Dixon',
  },
  {
    slug: 'start-with-why',
    displayName: 'Start With Why',
    matcher: ['start with why', 'simon sinek'],
    affiliateUrl: 'https://www.amazon.com/s?k=Start+With+Why+Simon+Sinek&tag=thenobleselle-20',
    fallbackUrl: 'https://www.amazon.com/s?k=Start+With+Why+Simon+Sinek',
  },
  {
    slug: 'give-and-take',
    displayName: 'Give and Take',
    matcher: ['give and take', 'adam grant'],
    affiliateUrl: 'https://www.amazon.com/s?k=Give+and+Take+Adam+Grant&tag=thenobleselle-20',
    fallbackUrl: 'https://www.amazon.com/s?k=Give+and+Take+Adam+Grant',
  },
  {
    slug: 'peak',
    displayName: 'Peak',
    matcher: ['anders ericsson'],
    affiliateUrl: 'https://www.amazon.com/s?k=Peak+Anders+Ericsson&tag=thenobleselle-20',
    fallbackUrl: 'https://www.amazon.com/s?k=Peak+Anders+Ericsson',
  },
  {
    slug: 'think-again',
    displayName: 'Think Again',
    matcher: ['think again'],
    affiliateUrl: 'https://www.amazon.com/s?k=Think+Again+Adam+Grant&tag=thenobleselle-20',
    fallbackUrl: 'https://www.amazon.com/s?k=Think+Again+Adam+Grant',
  },
  {
    slug: 'ultralearning',
    displayName: 'Ultralearning',
    matcher: ['ultralearning', 'scott young'],
    affiliateUrl: 'https://www.amazon.com/s?k=Ultralearning+Scott+Young&tag=thenobleselle-20',
    fallbackUrl: 'https://www.amazon.com/s?k=Ultralearning+Scott+Young',
  },
  {
    slug: 'black-box-thinking',
    displayName: 'Black Box Thinking',
    matcher: ['black box thinking', 'matthew syed'],
    affiliateUrl: 'https://www.amazon.com/s?k=Black+Box+Thinking+Matthew+Syed&tag=thenobleselle-20',
    fallbackUrl: 'https://www.amazon.com/s?k=Black+Box+Thinking+Matthew+Syed',
  },
  {
    slug: 'make-it-stick',
    displayName: 'Make It Stick',
    matcher: ['make it stick', 'peter brown'],
    affiliateUrl: 'https://www.amazon.com/s?k=Make+It+Stick+Peter+Brown&tag=thenobleselle-20',
    fallbackUrl: 'https://www.amazon.com/s?k=Make+It+Stick+Peter+Brown',
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
    matcher: [],
    affiliateUrl: null,
    fallbackUrl: 'https://fathom.video',
  },
  {
    slug: 'loom',
    displayName: 'Loom',
    matcher: [],
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
