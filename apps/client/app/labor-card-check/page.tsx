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
  title: 'How to Check UAE Labor Card Online | MOHRE Labor Card Status 2026',
  description:
    'Learn how to check your UAE labor card status online through MOHRE. Step-by-step guide to verify labor card validity, renewal dates, and employment details in UAE.',
  keywords: [
    'uae labor card check',
    'mohre labor card',
    'check labor card online',
    'labor card status uae',
    'verify labor card',
    'labor card renewal',
    'mohre card check',
  ],
};

const laborCardFAQs = [
  {
    question: 'What is a UAE Labor Card?',
    answer:
      'A UAE Labor Card is an official document issued by the Ministry of Human Resources and Emiratisation (MOHRE) that proves your legal employment status in the UAE. It contains your personal details, employer information, and work permit validity.',
  },
  {
    question: 'How can I check my labor card status online?',
    answer:
      'You can check your labor card status through the MOHRE website (mohre.gov.ae), the MOHRE mobile app, or by sending an SMS. You will need your labor card number, passport number, or Emirates ID to check the status.',
  },
  {
    question: 'What information is shown on a UAE Labor Card?',
    answer:
      'A UAE Labor Card displays: Employee name, Nationality, Date of birth, Employer name and trade license number, Job title, Work permit number, Card issue and expiry dates, and a unique labor card number.',
  },
  {
    question: 'How often should I check my labor card status?',
    answer:
      'It is recommended to check your labor card status periodically, especially before it expires (usually every 2 years), before traveling, or when changing employers to ensure your employment status is valid.',
  },
  {
    question: 'What should I do if my labor card has expired?',
    answer:
      'If your labor card has expired, contact your employer immediately as they are responsible for renewal. Working with an expired labor card is illegal in the UAE and can result in fines for both the employee and employer.',
  },
  {
    question: 'Is the labor card the same as an Emirates ID?',
    answer:
      'No, they are different. The Emirates ID is a national identity card issued by the Federal Authority for Identity and Citizenship (ICA), while the Labor Card is specifically for employment purposes issued by MOHRE.',
  },
  {
    question: 'Can I check someone else\'s labor card status?',
    answer:
      'Yes, you can check anyone\'s labor card status if you have their labor card number and required identification details. This is often used by employers to verify employee information.',
  },
  {
    question: 'What is the validity period of a UAE Labor Card?',
    answer:
      'A UAE Labor Card is typically valid for 2 years from the date of issue. It must be renewed before expiry to maintain legal employment status in the UAE.',
  },
];

const checkSteps = [
  {
    name: 'Visit MOHRE Website or App',
    text: 'Go to mohre.gov.ae or download the MOHRE UAE mobile app from your app store.',
  },
  {
    name: 'Navigate to Labor Card Services',
    text: 'Find the "Labor Card Status" or "Work Permit Inquiry" option in the services menu.',
  },
  {
    name: 'Enter Your Details',
    text: 'Input your labor card number, passport number, or Emirates ID as required.',
  },
  {
    name: 'Verify with Captcha',
    text: 'Complete any security verification to prove you are not a robot.',
  },
  {
    name: 'View Your Status',
    text: 'Your labor card details including validity, employer information, and status will be displayed.',
  },
];

export default function LaborCardCheckPage() {
  const breadcrumbs = [
    { name: 'Home', url: SITE_CONFIG.url },
    { name: 'Labor Card Check', url: `${SITE_CONFIG.url}/labor-card-check` },
  ];

  const schemas = combineSchemas([
    generateBreadcrumbSchema(breadcrumbs),
    generateHowToSchema({
      name: 'How to Check UAE Labor Card Online',
      description: 'Step-by-step guide to verify your UAE labor card status through MOHRE',
      totalTime: 'PT5M',
      steps: checkSteps,
    }),
    generateFAQSchema(laborCardFAQs),
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
                Labor Card Check
              </li>
            </ol>
          </nav>

          <h1>How to Check UAE Labor Card Online</h1>
          <p className={styles.lead}>
            Verify your UAE labor card status, validity, and employment details through MOHRE
            official channels.
          </p>

          <div className={styles.metaInfo}>
            <span>Last Updated: February 2026</span>
            <span className={styles.separator}>•</span>
            <span>Reading Time: 5 mins</span>
          </div>
        </div>
      </section>

      {/* What is Labor Card Section */}
      <section className="section">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 mx-auto">
              <h2>What is a UAE Labor Card?</h2>
              <p className="lead">
                A UAE Labor Card is your official proof of legal employment in the United Arab
                Emirates. Issued by the Ministry of Human Resources and Emiratisation (MOHRE),
                it contains essential information about your employment status.
              </p>

              <div className="mt-4">
                <div className="row g-4">
                  <div className="col-md-6">
                    <div className={styles.infoCard}>
                      <div className={styles.infoIcon}>
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect x="3" y="4" width="18" height="16" rx="2" />
                          <line x1="7" y1="8" x2="17" y2="8" />
                          <line x1="7" y1="12" x2="12" y2="12" />
                          <circle cx="15" cy="14" r="2" />
                        </svg>
                      </div>
                      <h5>Personal Details</h5>
                      <p>Name, nationality, date of birth, and photograph</p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className={styles.infoCard}>
                      <div className={styles.infoIcon}>
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                          <polyline points="9,22 9,12 15,12 15,22" />
                        </svg>
                      </div>
                      <h5>Employer Information</h5>
                      <p>Company name, trade license, and establishment details</p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className={styles.infoCard}>
                      <div className={styles.infoIcon}>
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                          <line x1="16" y1="2" x2="16" y2="6" />
                          <line x1="8" y1="2" x2="8" y2="6" />
                          <line x1="3" y1="10" x2="21" y2="10" />
                        </svg>
                      </div>
                      <h5>Validity Period</h5>
                      <p>Issue date, expiry date, and renewal status</p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className={styles.infoCard}>
                      <div className={styles.infoIcon}>
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                          <circle cx="8.5" cy="7" r="4" />
                          <line x1="20" y1="8" x2="20" y2="14" />
                          <line x1="23" y1="11" x2="17" y2="11" />
                        </svg>
                      </div>
                      <h5>Job Details</h5>
                      <p>Job title, work permit number, and occupation code</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How to Check Section */}
      <section className="section section-light">
        <div className="container">
          <h2 className="text-center mb-4">How to Check Your Labor Card Status</h2>
          <p className="text-center text-muted mb-5">
            Follow these simple steps to verify your labor card online
          </p>

          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className={styles.stepsContainer}>
                {checkSteps.map((step, index) => (
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

      {/* Methods to Check Section */}
      <section className="section">
        <div className="container">
          <h2 className="text-center mb-4">Ways to Check Your Labor Card</h2>

          <div className="row g-4">
            <div className="col-md-4">
              <div className={styles.methodCard}>
                <div className={`${styles.methodIcon} ${styles.methodIconWebsite}`}>
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="2" y1="12" x2="22" y2="12" />
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                  </svg>
                </div>
                <h4>MOHRE Website</h4>
                <p>Visit mohre.gov.ae and use the online inquiry service</p>
                <a
                  href="https://www.mohre.gov.ae"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline-primary"
                >
                  Visit Website
                </a>
              </div>
            </div>

            <div className="col-md-4">
              <div className={styles.methodCard}>
                <div className={`${styles.methodIcon} ${styles.methodIconApp}`}>
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
                    <line x1="12" y1="18" x2="12.01" y2="18" />
                  </svg>
                </div>
                <h4>MOHRE App</h4>
                <p>Download the official MOHRE UAE app from your app store</p>
                <div className={styles.appBadges}>
                  <span className="badge bg-dark">iOS</span>
                  <span className="badge bg-success">Android</span>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className={styles.methodCard}>
                <div className={`${styles.methodIcon} ${styles.methodIconSms}`}>
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                </div>
                <h4>SMS Service</h4>
                <p>Send an SMS with your details to MOHRE service number</p>
                <p className={styles.smsNumber}>Send to: <strong>5111</strong></p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Important Information */}
      <section className="section section-light">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 mx-auto">
              <h2 className="text-center mb-4">Important Information</h2>

              <div className="alert alert-warning">
                <strong>⚠️ Keep Your Labor Card Valid</strong>
                <p className="mb-0 mt-2">
                  Working with an expired labor card is illegal in the UAE. Both employees and
                  employers can face fines and penalties. Always ensure your labor card is renewed
                  before expiry.
                </p>
              </div>

              <div className={`${styles.infoBox} mt-4`}>
                <h5>Your Rights as an Employee</h5>
                <ul>
                  <li>Employers must provide a valid labor card within 60 days of joining</li>
                  <li>You have the right to hold your own labor card</li>
                  <li>Renewal is the employer&apos;s responsibility</li>
                  <li>You can verify your status anytime through official channels</li>
                </ul>
              </div>

              <div className={`${styles.infoBox} mt-3`}>
                <h5>Contact MOHRE</h5>
                <ul>
                  <li>Toll-free: 800 60</li>
                  <li>Email: info@mohre.gov.ae</li>
                  <li>Website: mohre.gov.ae</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection
        faqs={laborCardFAQs}
        title="Frequently Asked Questions"
        subtitle="Common questions about UAE Labor Card"
      />

      {/* Related Links */}
      <section className="section section-light">
        <div className="container text-center">
          <h2 className="mb-4">Related Services</h2>
          <div className="d-flex flex-wrap justify-content-center gap-3">
            <Link href="/" className="btn btn-primary">
              Gratuity Calculator
            </Link>
            <Link href="/e-signature-card" className="btn btn-outline-primary">
              E-Signature Card
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
