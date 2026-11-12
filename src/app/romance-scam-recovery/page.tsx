import { ServiceLandingPage, ServicePageData } from '@/components/templates/ServiceLandingPage';

export const metadata = {
  title: 'Romance Scam Recovery | You Trusted Someone. They Took Your Money. | Elitethics',
  description: 'Romance scams are deeply personal and manipulative. Being deceived does not mean you were foolish. Learn what information can help and discuss your situation privately.',
};

const romanceScamData: ServicePageData = {
  slug: 'romance-scam-recovery',
  emoji: '❤️',
  title: 'Romance Scam Recovery',
  subtitle: 'Support for Victims of Relationship & Trust Fraud',
  heroHeadline: 'You Trusted Someone. They Took Your Money.',
  heroDescription: 'Romance scams can be deeply personal. You may have been manipulated over weeks or months before money was requested. Being deceived does not mean you were foolish.',
  heroCtaText: 'Discuss My Situation',
  categoryTag: 'Relationship Fraud Support',
  intakeCategoryName: 'Romance Scam Recovery',
  defaultLossEstimate: '$50,000 - $250,000',

  empathyCard: {
    heading: 'A Note to Anyone Going Through This',
    text: 'Romance scams are not simple tricks; they are organized psychological operations carried out by syndicates who specialize in building false intimacy. You were targeted because you are compassionate and trusting, not because you were foolish. There is no shame in seeking clarity and holding criminals accountable.'
  },

  scamTypeCards: {
    title: 'What Information Can Help Us Trace Your Funds',
    subtitle: 'Every conversation, payment, and website leaves digital clues. If you have any of the following, our team can review them:',
    cards: [
      {
        title: 'Messages & Chat Logs',
        desc: 'WhatsApp, Telegram, Signal, Tinder, or SMS conversation histories. Even ordinary daily chats help establish the timeline and psychological manipulation.',
        tag: 'Communication'
      },
      {
        title: 'Emails & Documents',
        desc: 'Any email addresses they wrote from, email headers, photos sent, contracts, or fake travel documents they provided.',
        tag: 'Written Records'
      },
      {
        title: 'Payment & Bank Records',
        desc: 'Bank wire receipts, Zelle, CashApp, or money transfer records showing sending details, account numbers, and routing information.',
        tag: 'Financial'
      },
      {
        title: 'Crypto Transactions',
        desc: 'Wallet addresses you sent money to, transaction IDs (TxIDs), and receipts from exchanges where you purchased cryptocurrency.',
        tag: 'Blockchain'
      },
      {
        title: 'Profiles & Photos',
        desc: 'Dating app profiles, Instagram accounts, photos they sent you, and any audio or video messages they shared.',
        tag: 'Identity'
      },
      {
        title: 'Phone Numbers & Names Used',
        desc: 'Every phone number they called or texted from, area codes, names they went by, and any aliases of supposed "relatives" or "financial mentors".',
        tag: 'Contact Info'
      },
      {
        title: 'Websites & Apps',
        desc: 'The link to the trading website, platform URL, or app store link they instructed you to download or deposit money into.',
        tag: 'Platform Links'
      },
      {
        title: 'Screenshots',
        desc: 'Screenshots of account balances, trading recommendations they gave you, error messages, or demands for fees to withdraw.',
        tag: 'Evidence'
      }
    ]
  },

  recoverySteps: [
    {
      title: 'Reviewing the Financial Path',
      desc: 'We follow the trail of your payments, whether through bank wires or crypto transactions, to map out which accounts received your funds.'
    },
    {
      title: 'Connecting Syndicate Trails',
      desc: 'Romance scams are run by organized groups using shared bank accounts and crypto laundering wallets. We cross-reference your scammer\'s details with known fraud networks.'
    },
    {
      title: 'Locating Destination Accounts',
      desc: 'We determine where the money was routed and identify the exchange or financial institution where funds entered.'
    },
    {
      title: 'Private & Confidential Evidence Package',
      desc: 'We prepare an evidentiary dossier designed for reporting to cybercrime authorities (e.g. FBI IC3, regional police) and exchange compliance teams.'
    }
  ],

  evidenceToSave: [
    'Complete chat transcripts (export chats from WhatsApp or Telegram before deleting anything)',
    'All crypto wallet addresses, transaction hashes (TxIDs), or bank wire confirmations',
    'Screenshots of the fake investment platform, profile pictures, and voice notes sent to you',
    'The website URL and app store links provided for the fraudulent trading platform'
  ],

  mistakesToAvoid: [
    'Do NOT confront the scammer or reveal that you suspect fraud before exporting your chat logs.',
    'Do NOT send any "tax", "fee", or "security deposit" to unlock your account balance.',
    'Do NOT blame yourself or suffer in silence; millions of people around the world have been targeted by this exact crime.',
    'Do NOT hire recovery "hackers" from social media comments who claim they can hack the scammer’s phone.'
  ],

  faqs: [
    {
      q: 'Will anyone find out that I reported this?',
      a: 'No. Your privacy and confidentiality are strictly protected. We operate under strict corporate privacy standards in the State of Delaware. We will never disclose your situation or details to anyone outside of our direct investigative team.'
    },
    {
      q: 'Was the person I was speaking with real?',
      a: 'The photos and identity were almost certainly stolen from innocent social media models or generated with artificial intelligence. The person messaging you was part of an organized fraud syndicate following a structured script.'
    },
    {
      q: 'Can money lost in a romance scam be recovered?',
      a: 'While recovery is never guaranteed, the money you sent left a permanent financial trail. By tracing bank wires and cryptocurrency ledgers to centralized institutions, we gather the evidence necessary for account freezes and law enforcement involvement.'
    },
    {
      q: 'How does Elitethics handle my situation?',
      a: 'We listen with empathy and treat you with complete respect. We offer a free, private case review to examine the financial trail and give you an honest appraisal of what steps can be taken.'
    }
  ]
};

export default function RomanceScamRecoveryPage() {
  return <ServiceLandingPage data={romanceScamData} />;
}