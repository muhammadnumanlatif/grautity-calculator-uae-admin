import { Metadata } from 'next';
import Link from 'next/link';
import FAQSection from '@/components/sections/FAQSection';
import { SITE_CONFIG } from '@gratuity/shared';
import {
  generateBreadcrumbSchema,
  generateFAQSchema,
  generateHowToSchema,
  combineSchemas,
} from '@gratuity/seo-utils';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'E-Signature Card UAE | Digital Signature for UAE Documents 2026',
  description:
    'Complete guide to E-Signature Card in UAE. Learn how to obtain, use, and manage your digital signature for official UAE documents and government services.',
  keywords: [
    'e-signature card uae',
    'digital signature uae',
    'uae pass signature',
    'electronic signature',
    'uae digital id',
    'smart signature uae',
    'government services signature',
  ],
};

const eSignatureFAQs = [
  {
    question: 'What is an E-Signature Card in UAE?',
    answer:
      'An E-Signature Card (also known as Digital Signature) in UAE is a secure electronic identification that allows you to digitally sign documents and authenticate your identity for government and private sector services. It is legally equivalent to a handwritten signature.',
  },
  {
    question: 'How can I get an E-Signature in UAE?',
    answer:
      'You can obtain an E-Signature through UAE Pass, the national digital identity platform. Register for UAE Pass using your Emirates ID, verify your identity at a UAE Pass kiosk, and activate your digital signature through the app.',
  },
  {
    question: 'Is E-Signature legally valid in UAE?',
    answer:
      'Yes, E-Signatures are legally recognized in the UAE under Federal Decree-Law No. 46 of 2021 on Electronic Transactions and Trust Services. They have the same legal validity as handwritten signatures for most purposes.',
  },
  {
    question: 'What documents can I sign with E-Signature?',
    answer:
      'You can use E-Signature for most government services, contracts, banking documents, employment contracts, NOC letters, legal documents, and various private sector agreements. Some exceptions may apply for specific legal documents.',
  },
  {
    question: 'What is UAE Pass and how is it related to E-Signature?',
    answer:
      'UAE Pass is the UAE\'s national digital identity platform. It provides a unified digital identity for accessing government and private services, and it includes E-Signature functionality for digitally signing documents.',
  },
  {
    question: 'Is E-Signature free in UAE?',
    answer:
      'Basic E-Signature through UAE Pass is free. However, some advanced digital signature services or certificates may have associated fees depending on the service provider and use case.',
  },
  {
    question: 'Can I use E-Signature for employment contracts?',
    answer:
      'Yes, E-Signatures are widely accepted for employment contracts in the UAE. MOHRE and many free zone authorities accept digitally signed employment documents.',
  },
  {
    question: 'How secure is E-Signature in UAE?',
    answer:
      'E-Signatures in UAE use advanced encryption and multi-factor authentication. UAE Pass, for example, uses biometric verification and secure PKI (Public Key Infrastructure) to ensure the highest level of security.',
  },
];

const setupSteps = [
  {
    name: 'Download UAE Pass App',
    text: 'Download the UAE Pass app from the Apple App Store or Google Play Store on your smartphone.',
  },
  {
    name: 'Register with Emirates ID',
    text: 'Open the app and register using your Emirates ID. You will need to enter your Emirates ID number and personal details.',
  },
  {
    name: 'Verify Your Identity',
    text: 'Complete identity verification either through facial recognition in the app or by visiting a UAE Pass kiosk at authorized locations.',
  },
  {
    name: 'Set Up Your PIN',
    text: 'Create a secure 4-digit PIN that you will use to authenticate and authorize your digital signatures.',
  },
  {
    name: 'Activate Digital Signature',
    text: 'Once verified, your digital signature is automatically activated. You can now use it to sign documents through UAE Pass.',
  },
];

export default function ESignatureCardPage() {
  const breadcrumbs = [
    { name: 'Home', url: SITE_CONFIG.url },
    { name: 'E-Signature Card', url: `${SITE_CONFIG.url}/e-signature-card` },
  ];

  const schemas = combineSchemas([
    generateBreadcrumbSchema(breadcrumbs),
    generateHowToSchema({
      name: 'How to Get E-Signature Card in UAE',
      description: 'Step-by-step guide to obtaining and setting up your digital signature in UAE',
      totalTime: 'PT15M',
      steps: setupSteps,
    }),
    generateFAQSchema(eSignatureFAQs),
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: schemas }}
      />

      {/* Hero Section */}
      <section className={styles.pageHero}>
        <div className="container">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link href="/">Home</Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                E-Signature Card
              </li>
            </ol>
          </nav>

          <h1>E-Signature Card UAE</h1>
          <p className={styles.lead}>
            Your complete guide to digital signatures in the UAE - secure, legal, and convenient
            way to sign documents electronically.
          </p>

          <div className={styles.metaInfo}>
            <span>Last Updated: February 2026</span>
            <span className={styles.separator}>•</span>
            <span>Reading Time: 6 mins</span>
          </div>
        </div>
      </section>

      {/* What is E-Signature Section */}
      <section className="section">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <h2>What is E-Signature?</h2>
              <p className="lead">
                An Electronic Signature (E-Signature) is a digital form of your signature that
                is legally binding and can be used to sign documents online.
              </p>
              <p>
                In the UAE, E-Signatures are governed by Federal Decree-Law No. 46 of 2021,
                which gives them the same legal validity as traditional handwritten signatures.
                This means you can sign contracts, agreements, and official documents from
                anywhere, at any time.
              </p>
              <p>
                The UAE government has made significant investments in digital infrastructure,
                with UAE Pass serving as the primary platform for digital identity and
                electronic signatures for residents.
              </p>
            </div>
            <div className="col-lg-6">
              <div className={styles.benefitsCard}>
                <h4>Benefits of E-Signature</h4>
                <div className={styles.benefitItem}>
                  <div className={styles.benefitIcon}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12,6 12,12 16,14" />
                    </svg>
                  </div>
                  <div>
                    <strong>Save Time</strong>
                    <p>Sign documents instantly without printing or scanning</p>
                  </div>
                </div>
                <div className={styles.benefitItem}>
                  <div className={styles.benefitIcon}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    </svg>
                  </div>
                  <div>
                    <strong>Secure</strong>
                    <p>Advanced encryption and authentication protocols</p>
                  </div>
                </div>
                <div className={styles.benefitItem}>
                  <div className={styles.benefitIcon}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                      <polyline points="22,4 12,14.01 9,11.01" />
                    </svg>
                  </div>
                  <div>
                    <strong>Legally Valid</strong>
                    <p>Recognized under UAE federal law</p>
                  </div>
                </div>
                <div className={styles.benefitItem}>
                  <div className={styles.benefitIcon}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                      <line x1="3" y1="9" x2="21" y2="9" />
                      <line x1="9" y1="21" x2="9" y2="9" />
                    </svg>
                  </div>
                  <div>
                    <strong>Eco-Friendly</strong>
                    <p>Reduce paper usage and environmental impact</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* UAE Pass Section */}
      <section className="section section-light">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 text-center">
              <div className={styles.uaePassBadge}>
                <span>Official Platform</span>
              </div>
              <h2>UAE Pass</h2>
              <p className="lead">
                UAE Pass is the national digital identity platform that provides secure
                access to government and private sector services, including E-Signature.
              </p>
            </div>
          </div>

          <div className="row g-4 mt-4">
            <div className="col-md-4">
              <div className={styles.featureCard}>
                <div className={styles.featureIcon}>
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </div>
                <h5>Digital Identity</h5>
                <p>Single digital identity for all UAE services</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className={styles.featureCard}>
                <div className={styles.featureIcon}>
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
                  </svg>
                </div>
                <h5>Digital Signature</h5>
                <p>Sign documents legally from your phone</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className={styles.featureCard}>
                <div className={styles.featureIcon}>
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                </div>
                <h5>Secure Access</h5>
                <p>Biometric and multi-factor authentication</p>
              </div>
            </div>
          </div>

          <div className="text-center mt-5">
            <a
              href="https://uaepass.ae"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary btn-lg"
            >
              Get UAE Pass
            </a>
            <p className="mt-3 text-muted">
              Available on iOS and Android
            </p>
          </div>
        </div>
      </section>

      {/* How to Get E-Signature */}
      <section className="section">
        <div className="container">
          <h2 className="text-center mb-4">How to Get Your E-Signature</h2>
          <p className="text-center text-muted mb-5">
            Follow these steps to set up your digital signature through UAE Pass
          </p>

          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className={styles.stepsContainer}>
                {setupSteps.map((step, index) => (
                  <div key={index} className={styles.stepItem}>
                    <div className={styles.stepNumber}>{index + 1}</div>
                    <div className={styles.stepContent}>
                      <h5>{step.name}</h5>
                      <p>{step.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="section section-light">
        <div className="container">
          <h2 className="text-center mb-4">Where Can You Use E-Signature?</h2>

          <div className="row g-4">
            <div className="col-md-6 col-lg-3">
              <div className={styles.usecaseCard}>
                <div className={styles.usecaseIcon}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                    <polyline points="9,22 9,12 15,12 15,22" />
                  </svg>
                </div>
                <h5>Government Services</h5>
                <p>Visa applications, permits, official requests</p>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className={styles.usecaseCard}>
                <div className={styles.usecaseIcon}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
                    <line x1="1" y1="10" x2="23" y2="10" />
                  </svg>
                </div>
                <h5>Banking</h5>
                <p>Account opening, loan applications, transfers</p>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className={styles.usecaseCard}>
                <div className={styles.usecaseIcon}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
                    <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
                  </svg>
                </div>
                <h5>Employment</h5>
                <p>Contracts, offer letters, NOC documents</p>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className={styles.usecaseCard}>
                <div className={styles.usecaseIcon}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14,2 14,8 20,8" />
                    <line x1="16" y1="13" x2="8" y2="13" />
                    <line x1="16" y1="17" x2="8" y2="17" />
                  </svg>
                </div>
                <h5>Legal Documents</h5>
                <p>Contracts, agreements, legal filings</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection
        faqs={eSignatureFAQs}
        title="Frequently Asked Questions"
        subtitle="Common questions about E-Signature in UAE"
      />

      {/* Related Links */}
      <section className="section section-light">
        <div className="container text-center">
          <h2 className="mb-4">Related Services</h2>
          <div className="d-flex flex-wrap justify-content-center gap-3">
            <Link href="/" className="btn btn-primary">
              Gratuity Calculator
            </Link>
            <Link href="/labor-card-check" className="btn btn-outline-primary">
              Labor Card Check
            </Link>
            <Link href="/unlimited-contract" className="btn btn-outline-primary">
              Unlimited Contract Guide
            </Link>
          </div>
        </div>
      </section>

    </>
  );
}
