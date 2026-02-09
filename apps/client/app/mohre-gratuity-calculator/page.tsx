import { Metadata } from 'next';
import Link from 'next/link';
import GratuityCalculator from '@/components/calculator/GratuityCalculator';
import FAQSection from '@/components/sections/FAQSection';
import { SITE_CONFIG } from '@gratuity/shared';
import {
  generateBreadcrumbSchema,
  generateFAQSchema,
  generateHowToSchema,
  generateCalculatorSchema,
  combineSchemas,
} from '@gratuity/seo-utils';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'MOHRE Gratuity Calculator UAE 2026 | Free End of Service Calculator',
  description:
    'Official MOHRE gratuity calculator for UAE employees. Calculate your end of service benefits instantly based on UAE Labor Law. Free, accurate, and MOHRE-compliant.',
  keywords: [
    'mohre gratuity calculator',
    'gratuity calculator mohre',
    'mohre end of service calculator uae',
    'uae gratuity calculator mohre',
    'ministry human resources gratuity calculator',
    'mohre gratuity calculation online',
    'end of service benefits calculator mohre',
    'gratuity calculation as per mohre',
  ],
  alternates: {
    canonical: `${SITE_CONFIG.url}/mohre-gratuity-calculator`,
  },
};

const gratuityFAQs = [
  {
    question: 'How does MOHRE gratuity calculator work?',
    answer:
      'The MOHRE gratuity calculator uses the official formula from UAE Labor Law: 21 days of basic salary per year for the first 5 years, and 30 days per year thereafter. Simply enter your basic salary, years of service, contract type, and termination reason to get your accurate gratuity amount.',
  },
  {
    question: 'Is MOHRE gratuity calculator accurate?',
    answer:
      'Yes, our calculator uses the exact formula mandated by MOHRE under Federal Decree-Law No. 33 of 2021. It accounts for all scenarios including resignations, terminations, and limited/unlimited contracts.',
  },
  {
    question: 'What is the MOHRE gratuity formula?',
    answer:
      'The MOHRE gratuity formula is: For the first 5 years: (Basic Salary / 30) x 21 days x Years. For years beyond 5: (Basic Salary / 30) x 30 days x Years. The maximum gratuity cannot exceed 2 years of total salary.',
  },
  {
    question: 'Does MOHRE gratuity include allowances?',
    answer:
      'No, MOHRE gratuity is calculated only on basic salary. Housing allowance, transport allowance, and other benefits are not included in the gratuity calculation.',
  },
  {
    question: 'How is MOHRE gratuity calculated for resignations?',
    answer:
      'For unlimited contracts: 1-3 years = 33% of gratuity, 3-5 years = 66% of gratuity, 5+ years = 100% of gratuity. For limited contracts, you generally receive full gratuity if you complete the contract term.',
  },
  {
    question: 'When does MOHRE require employers to pay gratuity?',
    answer:
      'According to MOHRE regulations, employers must pay gratuity within 14 days of the employment end date as part of the final settlement. Late payment can result in penalties.',
  },
  {
    question: 'Can I claim MOHRE gratuity if terminated?',
    answer:
      'Yes, employees terminated by the employer (except for gross misconduct under Article 44) are entitled to full gratuity based on their years of service. The MOHRE calculator accounts for this.',
  },
  {
    question: 'Is there a minimum service for MOHRE gratuity?',
    answer:
      'Yes, you must complete at least 1 year of continuous service to be eligible for gratuity under MOHRE regulations. Part of a year beyond the first year is calculated proportionately.',
  },
];

const calculationSteps = [
  {
    name: 'Gather Your Information',
    text: 'Collect your employment contract showing your basic salary (not total salary including allowances), start date, and contract type (limited or unlimited).',
  },
  {
    name: 'Enter Basic Salary',
    text: 'Input your monthly basic salary in AED. This is the amount before any allowances like housing, transport, or utilities are added.',
  },
  {
    name: 'Calculate Years of Service',
    text: 'Enter your total years and months of employment. The calculator will automatically apply the correct formula for each period.',
  },
  {
    name: 'Select Contract and Termination Type',
    text: 'Choose your contract type and how your employment ended (resignation, termination, or contract completion) for accurate MOHRE-compliant calculation.',
  },
  {
    name: 'Review Your Results',
    text: 'Get a detailed breakdown of your gratuity calculation showing the formula used, amounts for different periods, and any resignation entitlement adjustments.',
  },
];

export default function MOHREGratuityCalculatorPage() {
  const breadcrumbs = [
    { name: 'Home', url: SITE_CONFIG.url },
    { name: 'MOHRE Gratuity Calculator', url: `${SITE_CONFIG.url}/mohre-gratuity-calculator` },
  ];

  const schemas = combineSchemas([
    generateBreadcrumbSchema(breadcrumbs),
    generateCalculatorSchema({
      name: 'MOHRE Gratuity Calculator',
      description: 'Free online calculator for UAE gratuity based on MOHRE guidelines',
      url: `${SITE_CONFIG.url}/mohre-gratuity-calculator`,
    }),
    generateHowToSchema({
      name: 'How to Calculate Gratuity as per MOHRE',
      description: 'Step-by-step instructions for calculating your UAE gratuity using official MOHRE formula',
      steps: calculationSteps,
    }),
    generateFAQSchema(gratuityFAQs),
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
              <li className="breadcrumb-item"><Link href="/">Home</Link></li>
              <li className="breadcrumb-item active" aria-current="page">MOHRE Gratuity Calculator</li>
            </ol>
          </nav>

          <div className={styles.heroBadges}>
            <span className={styles.badgeItem}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22,4 12,14.01 9,11.01" />
              </svg>
              MOHRE Compliant
            </span>
            <span className={styles.badgeItem}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 6v6l4 2" />
              </svg>
              Instant Results
            </span>
            <span className={styles.badgeItem}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              100% Free
            </span>
          </div>

          <h1>MOHRE Gratuity Calculator UAE 2026</h1>
          <p className={styles.lead}>
            Calculate your end of service gratuity using the official MOHRE formula.
            Based on UAE Labor Law Federal Decree-Law No. 33 of 2021.
          </p>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="section" id="calculator">
        <div className="container">
          <div className="row">
            <div className="col-lg-7">
              <GratuityCalculator showFreeZone={true} />
            </div>
            <div className="col-lg-5">
              <div className={styles.infoSidebar}>
                <h3>MOHRE Gratuity Rules</h3>
                <p>
                  According to MOHRE (Ministry of Human Resources and Emiratisation),
                  gratuity is calculated as follows:
                </p>

                <div className={styles.ruleCard}>
                  <div className={styles.ruleHeader}>First 5 Years</div>
                  <div className={styles.ruleValue}>21 Days / Year</div>
                  <p>21 days&apos; basic salary for each year</p>
                </div>

                <div className={styles.ruleCard}>
                  <div className={styles.ruleHeader}>After 5 Years</div>
                  <div className={styles.ruleValue}>30 Days / Year</div>
                  <p>30 days&apos; basic salary for each year</p>
                </div>

                <div className={`${styles.ruleCard} ${styles.ruleCardMaxCap}`}>
                  <div className={styles.ruleHeader}>Maximum Cap</div>
                  <div className={styles.ruleValue}>2 Years Salary</div>
                  <p>Total gratuity cannot exceed this limit</p>
                </div>

                <div className={styles.moreInfo}>
                  <h5>Need more information?</h5>
                  <Link href="/mohre-calculator" className="btn btn-outline-primary btn-sm">
                    Complete MOHRE Guide
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How to Calculate Section */}
      <section className="section section-light">
        <div className="container">
          <div className={styles.sectionTitle}>
            <h2>How to Calculate MOHRE Gratuity</h2>
            <p>Step-by-step guide using the official formula</p>
          </div>

          <div className="row">
            <div className="col-lg-10 mx-auto">
              <div className={styles.stepsContainer}>
                {calculationSteps.map((step, index) => (
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

      {/* Example Calculations */}
      <section className="section">
        <div className="container">
          <div className={styles.sectionTitle}>
            <h2>MOHRE Gratuity Calculation Examples</h2>
            <p>Real-world examples using the official formula</p>
          </div>

          <div className="row g-4">
            <div className="col-lg-6">
              <div className={styles.exampleCard}>
                <h5>Example 1: 3 Years Service</h5>
                <div className={styles.exampleData}>
                  <p><strong>Basic Salary:</strong> AED 8,000/month</p>
                  <p><strong>Service:</strong> 3 years</p>
                  <p><strong>Contract:</strong> Unlimited</p>
                  <p><strong>Termination:</strong> By employer</p>
                </div>
                <div className={styles.calculation}>
                  <div className={styles.calcRow}>
                    <span>Daily Rate:</span>
                    <span>8,000 / 30 = AED 266.67</span>
                  </div>
                  <div className={styles.calcRow}>
                    <span>3 Years (21 days each):</span>
                    <span>266.67 x 21 x 3 = AED 16,800</span>
                  </div>
                  <div className={`${styles.calcRow} ${styles.calcRowTotal}`}>
                    <span>Total Gratuity:</span>
                    <span>AED 16,800</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-6">
              <div className={styles.exampleCard}>
                <h5>Example 2: 8 Years Service</h5>
                <div className={styles.exampleData}>
                  <p><strong>Basic Salary:</strong> AED 12,000/month</p>
                  <p><strong>Service:</strong> 8 years</p>
                  <p><strong>Contract:</strong> Unlimited</p>
                  <p><strong>Termination:</strong> Resignation</p>
                </div>
                <div className={styles.calculation}>
                  <div className={styles.calcRow}>
                    <span>Daily Rate:</span>
                    <span>12,000 / 30 = AED 400</span>
                  </div>
                  <div className={styles.calcRow}>
                    <span>First 5 years (21 days):</span>
                    <span>400 x 21 x 5 = AED 42,000</span>
                  </div>
                  <div className={styles.calcRow}>
                    <span>Next 3 years (30 days):</span>
                    <span>400 x 30 x 3 = AED 36,000</span>
                  </div>
                  <div className={styles.calcRow}>
                    <span>Full Gratuity (8+ years = 100%):</span>
                    <span>AED 78,000</span>
                  </div>
                  <div className={`${styles.calcRow} ${styles.calcRowTotal}`}>
                    <span>Total Gratuity:</span>
                    <span>AED 78,000</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Important Notes */}
      <section className="section section-light">
        <div className="container">
          <div className={styles.sectionTitle}>
            <h2>Important MOHRE Gratuity Notes</h2>
            <p>Key points to remember about your end of service benefits</p>
          </div>

          <div className="row g-4">
            <div className="col-md-6 col-lg-4">
              <div className={styles.noteCard}>
                <div className={styles.noteIcon}>
                  <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                    <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z" />
                  </svg>
                </div>
                <h5>Basic Salary Only</h5>
                <p>Only your basic salary is used. Allowances for housing, transport, and other benefits are excluded.</p>
              </div>
            </div>

            <div className="col-md-6 col-lg-4">
              <div className={styles.noteCard}>
                <div className={styles.noteIcon}>
                  <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                    <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
                  </svg>
                </div>
                <h5>Minimum 1 Year</h5>
                <p>You must complete at least one year of continuous service to be eligible for gratuity.</p>
              </div>
            </div>

            <div className="col-md-6 col-lg-4">
              <div className={styles.noteCard}>
                <div className={styles.noteIcon}>
                  <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                    <path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm0 4c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm6 12H6v-1.4c0-2 4-3.1 6-3.1s6 1.1 6 3.1V19z" />
                  </svg>
                </div>
                <h5>14-Day Payment</h5>
                <p>Employers must pay gratuity within 14 days of employment end date.</p>
              </div>
            </div>

            <div className="col-md-6 col-lg-4">
              <div className={styles.noteCard}>
                <div className={styles.noteIcon}>
                  <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                    <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z" />
                  </svg>
                </div>
                <h5>Tax-Free</h5>
                <p>Gratuity is completely tax-free in the UAE. You receive the full amount.</p>
              </div>
            </div>

            <div className="col-md-6 col-lg-4">
              <div className={styles.noteCard}>
                <div className={styles.noteIcon}>
                  <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                  </svg>
                </div>
                <h5>Pro-Rata Calculation</h5>
                <p>Partial years after the first year are calculated proportionately.</p>
              </div>
            </div>

            <div className="col-md-6 col-lg-4">
              <div className={styles.noteCard}>
                <div className={styles.noteIcon}>
                  <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
                  </svg>
                </div>
                <h5>Free Zone Rules</h5>
                <p>DIFC and ADGM have separate rules. Most other free zones follow MOHRE.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection faqs={gratuityFAQs} title="MOHRE Gratuity Calculator FAQ" />

      {/* Related Pages */}
      <section className="section section-light">
        <div className="container">
          <div className={styles.sectionTitle}>
            <h2>More Gratuity Resources</h2>
          </div>

          <div className="row g-3 justify-content-center">
            <div className="col-auto">
              <Link href="/mohre-calculator" className="btn btn-outline-primary">
                MOHRE Calculator Guide
              </Link>
            </div>
            <div className="col-auto">
              <Link href="/unlimited-contract" className="btn btn-outline-primary">
                Unlimited Contract
              </Link>
            </div>
            <div className="col-auto">
              <Link href="/limited-contract" className="btn btn-outline-primary">
                Limited Contract
              </Link>
            </div>
            <div className="col-auto">
              <Link href="/dubai" className="btn btn-outline-primary">
                Dubai Calculator
              </Link>
            </div>
            <div className="col-auto">
              <Link href="/abu-dhabi" className="btn btn-outline-primary">
                Abu Dhabi Calculator
              </Link>
            </div>
          </div>
        </div>
      </section>

    </>
  );
}
