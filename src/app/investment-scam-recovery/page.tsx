import { ServiceLandingPage, ServicePageData } from '@/components/templates/ServiceLandingPage';

export const metadata = {
  title: 'Investment Scam Recovery | Lost Money to a Fake Investment? | Elitethics',
  description: 'Were you promised guaranteed profits or high returns from a fake investment platform? Learn why you should never send more money to unlock funds and how we trace where your money went.',
};

const investmentScamData: ServicePageData = {
  slug: 'investment-scam-recovery',
  emoji: '📈',
  title: 'Investment Scam Recovery',
  subtitle: 'Fake Investment Platforms & Ponzi Schemes',
  heroHeadline: 'Lost Money to a Fake Investment?',
  heroDescription: 'If an investment website or platform showed you rapid profits but now refuses to let you withdraw your money, you are dealing with an organized investment scam. The numbers on your screen were not real; we trace where your actual money was sent.',
  heroBulletIntro: 'Did someone promise you:',
  heroBullets: [
    'Guaranteed profits?',
    'High monthly returns?',
    'Exclusive investment opportunities?',
    'A private trading account?',
    'A fake investment dashboard?',
    'Easy withdrawals after paying another fee?'
  ],
  heroCtaText: 'Assess My Investment Loss',
  categoryTag: 'Investment Fraud Investigation',
  intakeCategoryName: 'Investment Scam Recovery',
  defaultLossEstimate: '$25,000 - $100,000',

  adviceBanner: {
    heading: 'Important Advice For Victims',
    text: "Don't send more money just because someone promises to release your funds. Demanding fees, taxes, or verification deposits to withdraw your own money is the single most common sign of an investment scam. Paying more will not release your funds."
  },

  scamTypeCards: {
    title: 'How Fake Investment Platforms Work',
    subtitle: 'The vast majority of online investment fraud follows a predictable pattern:',
    cards: [
      {
        title: 'The Simulated Dashboard',
        desc: 'The website displays charts, balances, and daily returns that look real. In reality, the platform is not connected to any financial market; the numbers are typed in by the operators.',
        tag: 'Fake Software'
      },
      {
        title: 'The Small Initial Test',
        desc: 'To gain your trust, they often let you withdraw a small amount ($50 to $200) early on. This convinces you the platform is legitimate and encourages much larger deposits.',
        tag: 'Trust Building'
      },
      {
        title: 'The Demand for "Taxes" or "Fees"',
        desc: 'When you ask to withdraw your full principal or profits, they suddenly claim you owe 15% to 25% in taxes, gas fees, or AML audit charges that must be paid separately.',
        tag: 'The Extortion'
      },
      {
        title: 'The Threat of Account Deletion',
        desc: 'If you hesitate to pay the additional fee, they claim your account will be frozen or permanently deleted by regulatory authorities within 48 hours.',
        tag: 'Urgency Tactics'
      }
    ]
  },

  recoverySteps: [
    {
      title: 'Tracing the Initial Deposits',
      desc: 'We examine your wire transfers, payment receipts, or cryptocurrency transaction hashes to trace where your original funds were directed.'
    },
    {
      title: 'Mapping the Scammer\'s Wallets',
      desc: 'Investment syndicates pool funds into centralized treasury accounts. We trace your funds through these wallets to identify where the money moved.'
    },
    {
      title: 'Locating Destination Exchanges',
      desc: 'To cash out, scammers must route cryptocurrency through centralized exchanges. We pinpoint the exact accounts holding the funds.'
    },
    {
      title: 'Preparing Legal Evidence Packages',
      desc: 'We draft a comprehensive, plain-English investigative report detailing transaction records, server records, and exchange destinations for legal and regulatory action.'
    }
  ],

  evidenceToSave: [
    'Every deposit transaction hash (TxID), wallet address, or bank wire confirmation',
    'Screenshots of your platform account dashboard showing deposit records and balances',
    'All communication records with your "account manager" or platform support staff',
    'The platform website URL, referral links, and promotional materials provided to you'
  ],

  mistakesToAvoid: [
    'Do NOT pay any "tax", "gas fee", or "clearance deposit" to release your money.',
    'Do NOT allow the scammers to access your computer via AnyDesk or TeamViewer.',
    'Do NOT delete your messages or emails with the platform representatives.',
    'Do NOT hire unverified "hackers" on social media who claim they can retrieve funds in 1 hour.'
  ],

  faqs: [
    {
      q: 'Were the profits shown on my account real?',
      a: 'No. The numbers and charts on fake investment platforms are completely simulated. Your deposit was not invested in real stocks, crypto, or forex markets; it was transferred into the scammer’s accounts immediately after you sent it.'
    },
    {
      q: 'Why can\'t they just deduct the withdrawal tax from my balance?',
      a: 'In a real financial firm, taxes or fees are simply deducted from your existing balance. Scammers insist you must pay new money from your bank or wallet because the balance on their screen does not exist. Their goal is simply to extract more money from you.'
    },
    {
      q: 'Can money sent to an overseas investment site be traced?',
      a: 'Yes. Blockchain transactions are public, and wire transfers follow established banking networks. We follow the movement of funds until they reach services with identifiable account records.'
    },
    {
      q: 'How does Elitethics evaluate my case?',
      a: 'We review your documentation confidentially and for free. We tell you honestly whether your funds can be traced to an identifiable exchange or institution before you decide whether to proceed.'
    }
  ]
};

export default function InvestmentScamRecoveryPage() {
  return <ServiceLandingPage data={investmentScamData} />;
}