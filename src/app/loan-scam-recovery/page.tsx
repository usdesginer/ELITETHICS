import { ServiceLandingPage, ServicePageData } from '@/components/templates/ServiceLandingPage';

export const metadata = {
  title: 'Loan Scam Recovery | Lost Money to a Fake Loan? | Elitethics',
  description: 'Scammers promise loans or approvals and demand upfront fees. Learn what happened, where your money went, and what recovery options may exist.',
};

const loanScamData: ServicePageData = {
  slug: 'loan-scam-recovery',
  emoji: '💳',
  title: 'Loan Scam Recovery',
  subtitle: 'Advance-Fee Fraud & Fake Lending Schemes',
  heroHeadline: 'Lost Money to a Fake Loan?',
  heroDescription: 'Scammers often promise loans, approvals or fast financing and then demand fees, deposits or other payments before releasing the supposed loan.',
  heroBulletIntro: 'We can help you understand:',
  heroBullets: [
    'What happened',
    'Where your money may have gone',
    'What information you should preserve',
    'What evidence may be useful',
    'What recovery options may exist'
  ],
  heroCtaText: 'Review My Loan Scam',
  categoryTag: 'Loan Fraud Investigation',
  intakeCategoryName: 'Loan Scam Recovery',
  defaultLossEstimate: '$5,000 - $25,000',

  scamTypeCards: {
    title: 'Common Loan Scams',
    subtitle: 'Fraudulent lending syndicates operate under several common variations. Identify the pattern used against you:',
    cards: [
      {
        title: 'Fake Loan Approval',
        desc: 'You receive an instant approval letter for a large personal or business loan without any standard underwriting, followed by an urgent demand for an "activation deposit".',
        tag: 'Instant Approval Trap'
      },
      {
        title: 'Advance-Fee Loan',
        desc: 'The lender promises guaranteed funding on the condition that you pay legal clearance, notary, or transfer fees upfront before any money can be released.',
        tag: 'Upfront Payment'
      },
      {
        title: 'Fake Lender',
        desc: 'Criminals set up counterfeit websites masquerading as legitimate banks, credit unions, or licensed peer-to-peer lending platforms using cloned logos and credentials.',
        tag: 'Impersonation'
      },
      {
        title: 'Fake Broker',
        desc: 'An intermediary claims they can shop your profile to exclusive institutional lenders for a non-refundable "finder\'s fee", then disappears once the fee is received.',
        tag: 'Broker Fraud'
      },
      {
        title: 'Processing-Fee Scam',
        desc: 'After paying an initial fee, you are told an unexpected "administrative processing bottleneck" requires an additional payment to finalize loan disbursement.',
        tag: 'Escalating Fees'
      },
      {
        title: 'Insurance-Fee Scam',
        desc: 'You are told that because of your credit score, national lending regulations require a mandatory "loan default insurance policy" paid in cash or cryptocurrency.',
        tag: 'Fake Insurance'
      },
      {
        title: 'Loan Repayment Impersonation',
        desc: 'Fraudsters impersonate your existing loan servicer and direct your monthly payments to a new fraudulent wire routing or crypto address.',
        tag: 'Payment Interception'
      }
    ]
  },

  recoverySteps: [
    {
      title: 'Payment Route & Account Tracing',
      desc: 'We trace the payment channels used (wire transfers, ACH, Zelle, or crypto transfers) to identify the receiving institution, account routing numbers, and payment processors.'
    },
    {
      title: 'Beneficiary & Shell Entity Profiling',
      desc: 'Fraudulent lenders typically route funds through money mule accounts or offshore shell corporations. We compile identity records to unmask the real beneficiaries.'
    },
    {
      title: 'Bank Recall & Law Enforcement Dossier',
      desc: 'We prepare an evidentiary fraud report detailing the deception, forged documents, and transaction path, formatted for bank fraud departments and enforcement agencies.'
    },
    {
      title: 'Clawback & Dispute Representation',
      desc: 'We coordinate with sending and receiving financial institutions to request fraud-based administrative freezes on accounts holding your stolen funds.'
    }
  ],

  evidenceToSave: [
    'All wire transfer slips, bank statements, or crypto transaction hashes (TxIDs)',
    'The original loan application, approval letters, and loan agreement contracts',
    'Email chains, SMS messages, and phone numbers used by the loan representative',
    'The website URL and any corporate address provided by the fake lending company'
  ],

  mistakesToAvoid: [
    'Do NOT pay any additional "activation fees" or "cancellation fees" to release funds.',
    'Do NOT delete communication threads or emails from the lender.',
    'Do NOT trust unverified social media "hackers" promising to get your money back in 1 hour.',
    'Do NOT confront the lender aggressively before securing all receipts and chat history.'
  ],

  faqs: [
    {
      q: 'Can funds paid to a fake lender be recovered?',
      a: 'Recovery depends on how quickly the fraud was discovered and the payment method used. Wire transfers and bank payments have a critical recall window if the receiving account has not been fully swept. If crypto was used, we trace the blockchain trail to destination exchange accounts.'
    },
    {
      q: 'Why did the fake lender demand payment in cryptocurrency or gift cards?',
      a: 'Legitimate banks and licensed lenders never accept crypto or gift cards for loan processing. Scammers use these methods because transactions are immediate and harder for an untrained individual to reverse.'
    },
    {
      q: 'Will paying one more fee finally release my loan?',
      a: 'No. There is no loan. The loan contract and approval letters were completely fabricated. Every additional fee you pay will only result in new demands until you stop.'
    },
    {
      q: 'How does Elitethics handle my case?',
      a: 'We review your evidence confidentially at no charge. We examine the payment trail to determine whether the destination account is reachable and provide you with an honest viability assessment before any formal engagement.'
    }
  ]
};

export default function LoanScamRecoveryPage() {
  return <ServiceLandingPage data={loanScamData} />;
}