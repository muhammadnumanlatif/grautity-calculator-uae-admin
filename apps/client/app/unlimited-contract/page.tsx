import { Metadata } from 'next';
import Link from 'next/link';
import GratuityCalculator from '@/components/calculator/GratuityCalculator';
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
  title: 'How to Calculate Gratuity in the UAE for an Unlimited Contract | 2026 Guide',
  description:
    'Complete guide to calculating gratuity for unlimited contracts in UAE. Learn eligibility rules, calculation formula, resignation entitlements & forfeiture conditions. Free calculator included.',
  keywords: [
    'unlimited contract gratuity uae',
    'gratuity calculation unlimited contract',
    'uae labor law unlimited contract',
    'resignation gratuity uae',
    'unlimited contract notice period',
  ],
  alternates: {
    canonical: `${SITE_CONFIG.url}/unlimited-contract`,
  },
  robots: {
    index: true,
    follow: true,
  },
};

const unlimitedContractFAQs = [
  {
    question: 'What is an unlimited contract in UAE?',
    answer:
      'An unlimited contract in UAE is an employment agreement with no fixed end date. Either party can terminate it at any time with proper notice (typically 1-3 months). This is the most common contract type in the UAE private sector.',
  },
  {
    question: 'How much gratuity do I get if I resign from an unlimited contract?',
    answer:
      'If you resign from an unlimited contract: Less than 1 year = 0% gratuity, 1-3 years = 1/3 (33.33%) of gratuity, 3-5 years = 2/3 (66.67%) of gratuity, 5+ years = 100% full gratuity.',
  },
  {
    question: 'What is the notice period for unlimited contracts?',
    answer:
      'The notice period for unlimited contracts is typically 30-90 days as specified in your employment contract. Under the new UAE Labor Law 2022, the minimum notice period is 30 days and the maximum is 90 days.',
  },
  {
    question: 'Can my employer terminate my unlimited contract without notice?',
    answer:
      'Employers can only terminate without notice in cases of gross misconduct as specified in Article 44 of the UAE Labor Law. Otherwise, proper notice must be given, and you are entitled to full gratuity.',
  },
  {
    question: 'Do I lose my gratuity if I resign during probation?',
    answer:
      'Yes, if you resign during probation (before completing 1 year of service), you are not entitled to any gratuity. Gratuity eligibility begins only after completing one year of continuous service.',
  },
  {
    question: 'Is there a difference between resignation and termination for gratuity?',
    answer:
      'Yes, if your employer terminates you (not due to misconduct), you receive full gratuity. If you resign, the gratuity amount depends on your years of service as per the tiered system.',
  },
];

const howToSteps = [
  {
    name: 'Determine your basic salary',
    text: 'Only your basic salary is used for gratuity calculation. Exclude all allowances like housing, transport, and other benefits.',
  },
  {
    name: 'Calculate your years of service',
    text: 'Count the total years, months, and days from your joining date to your last working day.',
  },
  {
    name: 'Apply the gratuity formula',
    text: 'For 1-5 years: (Basic Salary / 30) x 21 x years. After 5 years: (Basic Salary / 30) x 30 x years.',
  },
  {
    name: 'Apply resignation deduction if applicable',
    text: 'If resigning: 1-3 years = 1/3 gratuity, 3-5 years = 2/3 gratuity, 5+ years = full gratuity.',
  },
  {
    name: 'Check maximum limit',
    text: 'Ensure your total gratuity does not exceed 2 years of your total salary.',
  },
];

export default function UnlimitedContractPage() {
  const breadcrumbs = [
    { name: 'Home', url: SITE_CONFIG.url },
    { name: 'Unlimited Contract', url: `${SITE_CONFIG.url}/unlimited-contract` },
  ];

  const schemas = combineSchemas([
    generateBreadcrumbSchema(breadcrumbs),
    generateHowToSchema({
      name: 'How to Calculate Gratuity for Unlimited Contract in UAE',
      description: 'Step-by-step guide to calculate your end of service benefits for unlimited contracts',
      steps: howToSteps,
    }),
    generateFAQSchema(unlimitedContractFAQs),
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
                Unlimited Contract
              </li>
            </ol>
          </nav>

          <h1>How to Calculate Gratuity in the UAE for an Unlimited Contract</h1>
          <p className={styles.lead}>
            Complete guide to understanding and calculating your end of service benefits
            for unlimited employment contracts in UAE.
          </p>

          <div className={styles.metaInfo}>
            <span>Last Updated: February 2026</span>
            <span className={styles.separator}>•</span>
            <span>Reading Time: 8 mins</span>
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="section">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <GratuityCalculator defaultContractType="unlimited" />
            </div>
            <div className="col-lg-6">
              <div className={styles.contentBox}>
                <h2>Introduction</h2>
                <p>
                  Gratuity is the end of service benefit for employees in the UAE. Knowing your
                  gratuity amount helps you to plan your resignation or contract termination wisely.
                </p>
                <p>
                  This guide explains how to calculate your Gratuity for an unlimited contract.
                  Every employee needs to understand their entitlements based on their salary
                  and years of service.
                </p>
                <p>
                  Whether you&apos;re planning to resign, have been terminated, or simply want to know
                  your rights, this comprehensive guide covers everything about unlimited contract
                  gratuity in UAE for 2026.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What is Unlimited Contract */}
      <section className="section section-light">
        <div className="container">
          <h2>What is an Unlimited Contract?</h2>
          <p className={styles.lead}>
            For an unlimited contract, there is no fixed time of contract expiration, and you
            can end it anytime with one to three months&apos; notice.
          </p>

          <p>
            These types of contracts are very common in the private sector. Additionally, these
            contracts give flexibility to workers and employers compared to a limited contract.
          </p>

          <p>
            In an unlimited contract, you are eligible for gratuity if you resign or get terminated.
          </p>

          <div className="table-responsive mt-4">
            <table className="table table-bordered">
              <thead className="table-light">
                <tr>
                  <th>Feature</th>
                  <th>Unlimited Contract</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Duration</td>
                  <td>No fixed end date</td>
                </tr>
                <tr>
                  <td>Notice Period</td>
                  <td>1-3 months (as per contract)</td>
                </tr>
                <tr>
                  <td>Flexibility</td>
                  <td>High - resign anytime</td>
                </tr>
                <tr>
                  <td>Common In</td>
                  <td>Private sector companies</td>
                </tr>
                <tr>
                  <td>Gratuity Eligible</td>
                  <td>Yes (after 1 year)</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="mt-3">
            <Link href="/limited-contract">Compare with Limited Contract →</Link>
          </p>
        </div>
      </section>

      {/* Eligibility Section */}
      <section className="section">
        <div className="container">
          <h2>Eligibility for Gratuity in an Unlimited Contract</h2>
          <p>
            For the unlimited contract, here are the complete details on how you get eligible
            for gratuity:
          </p>

          <div className="row g-4 mt-3">
            <div className="col-md-6">
              <div className={styles.eligibilityCard}>
                <div className={`${styles.icon} ${styles.iconSuccess}`}>✓</div>
                <h5>Minimum Service</h5>
                <p>To be eligible, a worker must have completed <strong>ONE YEAR</strong> of continuous service.</p>
              </div>
            </div>

            <div className="col-md-6">
              <div className={styles.eligibilityCard}>
                <div className={`${styles.icon} ${styles.iconSuccess}`}>✓</div>
                <h5>Basic Salary Only</h5>
                <p>Gratuity is calculated only on <strong>BASIC SALARY</strong>. Housing, transport, and other allowances are excluded.</p>
              </div>
            </div>

            <div className="col-md-6">
              <div className={styles.eligibilityCard}>
                <div className={`${styles.icon} ${styles.iconSuccess}`}>✓</div>
                <h5>Termination by Employer</h5>
                <p>If the worker is <strong>TERMINATED</strong>, they will get <strong>FULL gratuity</strong>.</p>
              </div>
            </div>

            <div className="col-md-6">
              <div className={styles.eligibilityCard}>
                <div className={`${styles.icon} ${styles.iconWarning}`}>!</div>
                <h5>Resignation</h5>
                <p>If the worker <strong>RESIGNS</strong>, the amount depends on the number of years of service.</p>
              </div>
            </div>
          </div>

          {/* Resignation Table */}
          <div className="mt-5">
            <h4>Gratuity Entitlement for Resignation</h4>
            <div className="table-responsive">
              <table className="table table-bordered">
                <thead className="table-primary">
                  <tr>
                    <th>Scenario</th>
                    <th>Gratuity Entitlement</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Terminated (1+ year)</td>
                    <td><span className="badge bg-success">100% Full Gratuity</span></td>
                  </tr>
                  <tr>
                    <td>Resign &lt; 1 year</td>
                    <td><span className="badge bg-danger">0% No Gratuity</span></td>
                  </tr>
                  <tr>
                    <td>Resign 1-3 years</td>
                    <td><span className="badge bg-warning text-dark">33.33% (1/3 of gratuity)</span></td>
                  </tr>
                  <tr>
                    <td>Resign 3-5 years</td>
                    <td><span className="badge bg-info">66.67% (2/3 of gratuity)</span></td>
                  </tr>
                  <tr>
                    <td>Resign 5+ years</td>
                    <td><span className="badge bg-success">100% Full Gratuity</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Formula Section */}
      <section className="section section-light">
        <div className="container">
          <h2>Gratuity Calculation Formula</h2>
          <p>
            It is based on basic salary only, which means allowances are excluded from calculations.
          </p>

          <div className="row g-4 mt-3">
            <div className="col-md-6">
              <div className={styles.formulaCard}>
                <h5>For 1-5 Years of Service</h5>
                <div className={styles.formulaBox}>
                  Gratuity = (Basic Salary / 30) x 21 days x Years
                </div>
                <p className="mt-3 mb-0">21 days&apos; basic salary per year of service</p>
              </div>
            </div>

            <div className="col-md-6">
              <div className={styles.formulaCard}>
                <h5>After 5 Years of Service</h5>
                <div className={styles.formulaBox}>
                  Gratuity = (Basic Salary / 30) x 30 days x Years
                </div>
                <p className="mt-3 mb-0">30 days&apos; basic salary per year of service</p>
              </div>
            </div>
          </div>

          <div className="alert alert-warning mt-4">
            <strong>Maximum Limit:</strong> The gratuity amount must NOT exceed 2 years&apos; total
            salary of the employee.
          </div>

          {/* Example Calculation */}
          <div className={`${styles.exampleBox} mt-4`}>
            <h5>Calculation Example</h5>
            <p><strong>Employee:</strong> AED 15,000 basic salary | 8 years of service | Resigned</p>

            <div className={styles.calculationSteps}>
              <div className={styles.step}>
                <span>Step 1: First 5 years</span>
                <span>(15,000 / 30 x 21) x 5 = AED 52,500</span>
              </div>
              <div className={styles.step}>
                <span>Step 2: Next 3 years</span>
                <span>(15,000 / 30 x 30) x 3 = AED 45,000</span>
              </div>
              <div className={styles.step}>
                <span>Step 3: Total before deduction</span>
                <span>52,500 + 45,000 = AED 97,500</span>
              </div>
              <div className={styles.step}>
                <span>Step 4: Resignation (5+ years = 100%)</span>
                <span>AED 97,500 x 100% = AED 97,500</span>
              </div>
              <div className={`${styles.step} ${styles.stepTotal}`}>
                <span>Final Gratuity</span>
                <span>AED 97,500</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection
        faqs={unlimitedContractFAQs}
        title="Frequently Asked Questions"
        subtitle="Common questions about unlimited contract gratuity in UAE"
      />

      {/* Legal References */}
      <section className="section section-light">
        <div className="container">
          <h2>Legal References</h2>
          <p>This guide is based on the following UAE labor law provisions:</p>
          <ul>
            <li>UAE Labor Law (Federal Decree-Law No. 33 of 2021)</li>
            <li>Article 51 - End of Service Gratuity</li>
            <li>Article 52 - Calculation of Gratuity</li>
            <li>Article 53 - Gratuity Upon Resignation</li>
            <li>Ministerial Resolution No. 1 of 2022</li>
          </ul>
        </div>
      </section>

    </>
  );
}
