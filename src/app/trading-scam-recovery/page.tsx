import { ServiceLandingPage, ServicePageData } from '@/components/templates/ServiceLandingPage';

export const metadata = {
  title: "Trading Scam Recovery | Can't Withdraw Your Trading Money? | Elitethics",
  description: 'You deposited money into a trading platform. Your account appeared to grow, but withdrawals are blocked by demands for taxes or fees. Learn why this is a major warning sign and how we help.',
};

const tradingScamData: ServicePageData = {
  slug: 'trading-scam-recovery',
  emoji: '📊',
  title: 'Trading Scam Recovery',
  subtitle: 'Blocked Withdrawals & Fake Trading Platforms',
  heroHeadline: "Can't Withdraw Your Trading Money?",
  heroDescription: 'You deposited money into a trading platform. Your account appeared to grow. When you tried to withdraw your money, you were asked to pay taxes, verification fees, clearance charges or additional deposits.',
  heroBulletIntro: 'How our investigators evaluate your trading case:',
  heroBullets: [
    'Verifying the legitimacy of the broker and platform',
    'Auditing the payment processors and receiving bank accounts',
    'Exposing fake trading charts and simulated transactions',
    'Preparing evidence dossiers for bank chargebacks and recalls'
  ],
  heroCtaText: 'Review My Trading Case',
  categoryTag: 'Trading Fraud Investigation',
  intakeCategoryName: 'Trading Scam Recovery',
  defaultLossEstimate: '$25,000 - $100,000',

  adviceBanner: {
    heading: 'This Is a Major Warning Sign',
    text: 'Do not send additional money simply because someone says it is required to release your existing funds. Legitimate, regulated brokers never require you to pay separate fees or "taxes" out of pocket to process a withdrawal. Demands for advance fees are the universal hallmark of a trading scam.'
  },

  scamTypeCards: {
    title: 'Common Excuses Used to Block Withdrawals',
    subtitle: 'If your broker or account manager has used any of these excuses, your funds are likely being withheld intentionally:',
    cards: [
      {
        title: '"You Must Pay Capital Gains Tax First"',
        desc: 'They claim national tax authorities require a 15% to 25% tax payment before funds can be released. Real brokers simply deduct taxes or report earnings; they never demand advance payments.',
        tag: 'Tax Excuse'
      },
      {
        title: '"Your Account Needs an Anti-Money Laundering Deposit"',
        desc: 'They claim that to comply with AML or international banking rules, you must mirror your balance or send a security deposit from an external bank account.',
        tag: 'AML Excuse'
      },
      {
        title: '"You Must Meet a Minimum Trading Volume"',
        desc: 'They tell you that you cannot withdraw your money until you trade dozens or hundreds of lots, forcing you to keep risking your capital until it is lost.',
        tag: 'Volume Traps'
      },
      {
        title: 'Sudden Account Wipeout After Withdrawal Request',
        desc: 'Shortly after you request your money, unexpected "losing trades" appear on your account, or high leverage is opened without your consent to wipe out your balance.',
        tag: 'Simulated Loss'
      }
    ]
  },

  recoverySteps: [
    {
      title: 'Auditing Payment Gateways & Accounts',
      desc: 'We trace the payment methods used to fund your account, including bank wires, credit card processors, and crypto gateways, to locate the receiving merchant entities.'
    },
    {
      title: 'Documenting Chart & Price Manipulation',
      desc: 'We compare the platform\'s price history against real interbank market data to prove that the broker operated a simulated, rigged platform designed to deceive.'
    },
    {
      title: 'Preparing Chargeback & Recall Dossiers',
      desc: 'For card and bank payments, we compile comprehensive evidence packages detailing broker fraud, breach of contract, and deceptive billing to support clawbacks.'
    },
    {
      title: 'Regulatory Reporting & Legal Escrow Notice',
      desc: 'We submit structured complaints to financial regulatory authorities (such as the CFTC, FCA, or ASIC) and deliver formal notices to merchant processing banks.'
    }
  ],

  evidenceToSave: [
    'All bank statements, wire transfer slips, and credit card statements showing deposits to the broker',
    'Screenshots of your account balance, transaction logs, open trades, and rejected withdrawal requests',
    'Recorded phone calls, WhatsApp messages, Telegram chats, and emails from your account manager',
    'The broker website URL, login portal address, terms and conditions, and client agreement contracts'
  ],

  mistakesToAvoid: [
    'Do NOT send any additional money for "taxes", "legal clearance", or "margin maintenance".',
    'Do NOT install remote desktop access software (AnyDesk, TeamViewer) allowing the broker to control your computer.',
    'Do NOT accept a "settlement agreement" or sign liability waivers without independent legal review.',
    'Do NOT hire unverified "hackers" on social media promising to hack the broker’s MT5 server.'
  ],

  faqs: [
    {
      q: 'Why can\'t the broker just deduct the withdrawal tax from my balance?',
      a: 'Because the balance shown on your screen is not real. It is a simulated number entered into a database. The broker cannot deduct taxes from funds they have already stolen and spent. That is why they demand fresh money from you.'
    },
    {
      q: 'Can money lost to an unregulated broker be recovered?',
      a: 'Yes, depending on how you deposited your funds. Credit card deposits can be disputed through formal bank chargeback procedures. Wire transfers and cryptocurrency payments can be traced to the payment processors and receiving bank accounts that facilitated the fraud.'
    },
    {
      q: 'Were the trades on my platform real?',
      a: 'In fraudulent brokerage operations, trades are almost never routed to real financial exchanges. The entire platform operates like a video game where the administrators control the charts and outcomes.'
    },
    {
      q: 'How does Elitethics review my trading case?',
      a: 'We review your deposit records and platform documentation free of charge. We identify which payment channels received your money and evaluate whether a viable dispute or recovery pathway exists.'
    }
  ]
};

export default function TradingScamRecoveryPage() {
  return <ServiceLandingPage data={tradingScamData} />;
}