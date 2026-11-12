import { ServiceLandingPage, ServicePageData } from '@/components/templates/ServiceLandingPage';

export const metadata = {
  title: 'Wallet Scam Recovery | Was Money Taken From Your Wallet? | Elitethics',
  description: 'Whether you were tricked into sending money or someone gained unauthorized access, the first step is understanding what happened. We examine the transaction history to understand where the money moved.',
};

const walletScamData: ServicePageData = {
  slug: 'wallet-scam-recovery',
  emoji: '👛',
  title: 'Wallet Scam Recovery',
  subtitle: 'Unauthorized Transfers & Compromised Wallets',
  heroHeadline: 'Was Money Taken From Your Wallet?',
  heroDescription: 'Whether you were tricked into sending money or someone gained unauthorized access, the first step is understanding what happened.',
  heroBulletIntro: 'How we help in your situation:',
  heroBullets: [
    'Identify how unauthorized access occurred',
    'Follow where your tokens were transferred',
    'Locate destination accounts on exchanges',
    'Explain your practical recovery options'
  ],
  heroCtaText: 'Review My Compromised Wallet',
  categoryTag: 'Wallet Asset Recovery',
  intakeCategoryName: 'Wallet Scam Recovery',
  defaultLossEstimate: '$10,000 - $50,000',

  trailExplainer: {
    badge: 'Simple, Honest Process',
    title: 'We Look at the Trail',
    tagline: 'We believe you deserve clear answers, not confusing jargon.',
    jargonReplaced: {
      technicalTerm: 'Blockchain transaction attribution and forensic wallet clustering',
      plainEnglish: 'We examine the transaction history to understand where the money moved.'
    },
    explanation: 'When crypto leaves your wallet without permission, it does not disappear into thin air. Every transfer is recorded on an open digital ledger. Our investigators follow that path step-by-step to see which wallets the funds passed through and which exchange accounts they landed in.'
  },

  scamTypeCards: {
    title: 'How Wallet Scams Typically Happen',
    subtitle: 'Most wallet losses happen in one of four ways. Knowing which one happened helps us investigate:',
    cards: [
      {
        title: 'Tricked Into Signing a Permission',
        desc: 'You connected your wallet to a website (e.g. fake airdrop, mint, or DEX) and approved a signature that quietly gave a scammer permission to withdraw your tokens.',
        tag: 'Malicious Signature'
      },
      {
        title: 'Shared Recovery Phrase',
        desc: 'Someone pretending to be tech support, a wallet helpdesk, or an exchange representative asked you to enter or verify your 12- or 24-word seed phrase.',
        tag: 'Phishing Support'
      },
      {
        title: 'Sent Money Under False Pretenses',
        desc: 'You manually transferred crypto to a person, an escrow service, or a "safe storage wallet" who promised to safeguard it or return it with a bonus.',
        tag: 'Deceptive Transfer'
      },
      {
        title: 'Compromised Device or Password',
        desc: 'Malware on your computer or phone captured your keystrokes, password, or private keys, allowing attackers to access your wallet remotely.',
        tag: 'Device Compromise'
      }
    ]
  },

  recoverySteps: [
    {
      title: 'Auditing the Outgoing Transfer',
      desc: 'We review the exact transaction that emptied your balance to identify whether it was signed with your private key or executed through a malicious smart contract approval.'
    },
    {
      title: 'Following the Movement of Funds',
      desc: 'Scammers usually move stolen tokens through several intermediate wallets and decentralized exchanges. We trace every hop along the path.'
    },
    {
      title: 'Identifying Destination Exchanges',
      desc: 'To turn stolen crypto into cash, scammers must send it to centralized exchanges. We pinpoint the exact deposit accounts holding your stolen funds.'
    },
    {
      title: 'Evidence Dossier & Freeze Notifications',
      desc: 'We compile an official record of the theft and deliver formatted evidence packages to the compliance desks of the exchanges holding the funds to request account holds.'
    }
  ],

  evidenceToSave: [
    'Your public wallet address (never share your private key or seed phrase)',
    'The transaction ID (TxHash) of the unauthorized outgoing transfer',
    'The website address where you connected your wallet or signed any approvals',
    'Screenshots of any chats, emails, or support tickets with the people involved'
  ],

  mistakesToAvoid: [
    'Do NOT send any more crypto into the compromised wallet; create a brand-new wallet instead.',
    'Do NOT give your seed phrase to anyone who offers to "fix your wallet" or "reverse the transaction".',
    'Do NOT pay self-proclaimed "hackers" on Instagram or Telegram who promise instant recovery.',
    'Do NOT delete your transaction history or wallet app before recording the transaction details.'
  ],

  faqs: [
    {
      q: 'Can a cryptocurrency transfer be reversed?',
      a: 'A transaction that is confirmed on the blockchain cannot be deleted or undone directly. However, the path of the money can be followed. If the stolen funds enter an exchange with customer identity verification (KYC), those accounts can be identified and targeted for freezing.'
    },
    {
      q: 'Will Elitethics ever ask for my seed phrase or private key?',
      a: 'Never. Legitimate investigators only need your public wallet address and the public transaction IDs. Anyone who asks for your seed phrase or password is trying to steal from you.'
    },
    {
      q: 'What should I do with my compromised wallet right now?',
      a: 'Assume the compromised wallet is permanently unsafe. Move any remaining assets to a completely fresh wallet created on a clean device, and revoke any active token allowances.'
    },
    {
      q: 'How do you check if my case can be investigated?',
      a: 'We review your transaction IDs and wallet address for free. We trace where the funds went and tell you clearly whether the trail leads to an identifiable service before you commit to anything.'
    }
  ]
};

export default function WalletScamRecoveryPage() {
  return <ServiceLandingPage data={walletScamData} />;
}