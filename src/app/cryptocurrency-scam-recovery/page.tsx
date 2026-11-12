import { ServiceLandingPage, ServicePageData } from '@/components/templates/ServiceLandingPage';

export const metadata = {
  title: 'Cryptocurrency Scam Recovery | Lost Cryptocurrency to a Scam? | Elitethics',
  description: 'Cryptocurrency transactions leave a permanent record. We examine available transaction information to understand where funds moved and identify information that may help with the next steps.',
};

const cryptoScamData: ServicePageData = {
  slug: 'cryptocurrency-scam-recovery',
  emoji: '₿',
  title: 'Cryptocurrency Scam Recovery',
  subtitle: 'Tracing Stolen Bitcoin, Ethereum & Digital Assets',
  heroHeadline: 'Lost Cryptocurrency to a Scam?',
  heroDescription: 'Cryptocurrency transactions can leave a permanent record. We examine available transaction information to understand where funds moved and identify information that may help with the next steps.',
  heroBulletIntro: 'What our cryptocurrency review provides:',
  heroBullets: [
    'Mapping where your crypto went step-by-step',
    'Identifying destination exchange accounts',
    'Preparing evidence packets for compliance desks',
    'Explaining realistic next steps without false promises'
  ],
  heroCtaText: 'Review My Crypto Scam',
  categoryTag: 'Cryptocurrency Asset Investigation',
  intakeCategoryName: 'Cryptocurrency Scam Recovery',
  defaultLossEstimate: '$25,000 - $100,000',

  visualFlowchart: {
    title: 'How Crypto Tracing Actually Works',
    subtitle: 'Instead of complicated technical jargon, here is the clear path your funds follow and how we investigate:',
    steps: [
      {
        number: '1',
        label: 'Your Wallet',
        detail: 'The starting point where you initiated the transfer or where funds were taken.',
        iconName: 'wallet'
      },
      {
        number: '2',
        label: 'Transaction',
        detail: 'The public transfer recorded permanently on the digital blockchain ledger with a unique ID.',
        iconName: 'arrow'
      },
      {
        number: '3',
        label: 'Receiving Wallet',
        detail: 'The scammer’s initial address where your cryptocurrency first arrived.',
        iconName: 'layers'
      },
      {
        number: '4',
        label: 'Further Movement',
        detail: 'Scammers usually move funds across several intermediary wallets or swap services to obscure the trail.',
        iconName: 'fork'
      },
      {
        number: '5',
        label: 'Exchange / Service / Other Destination',
        detail: 'The point where funds enter a centralized exchange or regulated service requiring identity verification.',
        iconName: 'building'
      },
      {
        number: '6',
        label: 'Evidence & Recovery Options',
        detail: 'We compile the complete transaction history into a verified evidence package for exchange freezes and legal action.',
        iconName: 'file'
      }
    ]
  },

  scamTypeCards: {
    title: 'Common Situations We Review',
    subtitle: 'Cryptocurrency scams happen across a variety of platforms and methods:',
    cards: [
      {
        title: 'Sent to a Fraudulent Platform',
        desc: 'You deposited Bitcoin, USDT, or Ethereum into a trading or staking site that blocked withdrawals.',
        tag: 'Platform Deposit'
      },
      {
        title: 'Tricked by an Impersonator',
        desc: 'Someone pretending to be customer support from an exchange or wallet asked you to transfer funds for "security".',
        tag: 'Fake Support'
      },
      {
        title: 'Fake Token Presale or Giveaway',
        desc: 'You sent crypto to participate in an exclusive project or "giveaway" that never delivered promised tokens.',
        tag: 'Presale Fraud'
      },
      {
        title: 'Unauthorized Outgoing Transfer',
        desc: 'Funds were transferred out of your wallet without your consent after interacting with an unknown site.',
        tag: 'Unauthorized Access'
      }
    ]
  },

  recoverySteps: [
    {
      title: 'Tracing the Public Ledger',
      desc: 'We map every transaction ID (TxHash) starting from your wallet to trace the path the coins took across digital networks.'
    },
    {
      title: 'Following Intermediate Splits & Hops',
      desc: 'Even when scammers split assets into smaller amounts across dozens of addresses, the ledger records every branch.'
    },
    {
      title: 'Pinpointing Destination Exchanges',
      desc: 'To convert crypto into ordinary bank cash, scammers must use centralized exchanges. We identify the exact accounts where the trail ends.'
    },
    {
      title: 'Issuing Freeze Notifications & Evidence',
      desc: 'We draft a structured evidence package for the destination exchange’s fraud team and law enforcement to request administrative holds.'
    }
  ],

  evidenceToSave: [
    'All transaction hashes (TxIDs) or block explorer links for your outgoing transfers',
    'Your sending wallet public address and the exact receiving address provided by the scammer',
    'Screenshots of any exchange withdrawal confirmation emails or SMS verification records',
    'All communication records with the person or entity that instructed you to send cryptocurrency'
  ],

  mistakesToAvoid: [
    'Do NOT send additional cryptocurrency to "unfreeze" your original transaction; blockchains do not have freeze fees.',
    'Do NOT believe anonymous "hackers" on Twitter, Reddit, or Telegram claiming they can "reverse the blockchain".',
    'Do NOT delete withdrawal records or emails from your sending exchange.',
    'Do NOT delay: tracing within the first 48 hours offers the best opportunity to freeze funds before liquidation.'
  ],

  faqs: [
    {
      q: 'Can a cryptocurrency transaction be deleted or reversed directly?',
      a: 'No. Blockchain records cannot be edited, deleted, or rolled back. However, because the public ledger is permanent, we can trace where the coins went and identify the exchange accounts holding them.'
    },
    {
      q: 'Can scammers completely hide their tracks using privacy tools?',
      a: 'Not easily. Advanced tracking methods look at timing, fee structures, and amounts moving in and out of privacy tools, frequently allowing investigators to identify where funds re-emerge.'
    },
    {
      q: 'What do I need to provide for a review?',
      a: 'Only the public transaction hashes (TxIDs) and the wallet addresses you sent funds to. We never ask for your private keys, passwords, or recovery phrases.'
    },
    {
      q: 'How does Elitethics evaluate my crypto case?',
      a: 'We trace the public transaction trail free of charge during our initial review. If your funds lead to an identifiable institution with reachable legal channels, we explain the recovery roadmap clearly.'
    }
  ]
};

export default function CryptocurrencyScamRecoveryPage() {
  return <ServiceLandingPage data={cryptoScamData} />;
}