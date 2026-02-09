import { Metadata } from 'next';
import Link from 'next/link';
import GratuityCalculator from '@/components/calculator/GratuityCalculator';
import FAQSection from '@/components/sections/FAQSection';
import { SITE_CONFIG } from '@gratuity/shared';
import {
  generateBreadcrumbSchema,
  generateFAQSchema,
  combineSchemas,
} from '@gratuity/seo-utils';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'How to Calculate Gratuity in UAE for a Limited Contract | 2026 Guide',
  description:
    'Complete guide to calculating gratuity for limited (fixed-term) contracts in UAE. Learn eligibility, calculation formula, early termination rules & full entitlements.',
  keywords: [
    'limited contract gratuity uae',
    'fixed term contract gratuity',
    'limited contract uae labor law',
    'contract end gratuity uae',
    'early termination gratuity',
  ],
  alternates: {
    canonical: `${SITE_CONFIG.url}/limited-contract`,
  },
  robots: {
    index: true,
    follow: true,
  },
};

const limitedContractFAQs = [
  {
    question: 'What is a limited contract in UAE?',
    answer:
      'A limited contract in UAE is a fixed-term employment agreement with a specific start and end date. The maximum duration is typically 2-3 years, after which it must be renewed or converted to unlimited.',
  },
  {
    question: 'Do I get full gratuity at the end of a limited contract?',
    answer:
      'Yes, when your limited contract ends naturally (on the specified date), you are entitled to full gratuity based on your years of service, without any deductions.',
  },
  {
    question: 'What happens if I resign before my limited contract ends?',
    answer:
      'If you resign before your contract ends, you may need to compensate your employer for early termination. However, you are still entitled to gratuity based on your service period.',
  },
  {
    question: 'Can my employer terminate a limited contract early?',
    answer:
      'Yes, but the employer must provide valid reasons and may need to compensate you. You are entitled to full gratuity plus potentially additional compensation depending on circumstances.',
  },
  {
    question: 'What is the maximum duration of a limited contract?',
    answer:
      'Under the new UAE Labor Law 2022, limited contracts can be for a maximum of 3 years and can be renewed by mutual agreement between the employer and employee.',
  },
  {
    question: 'Is the gratuity formula different for limited contracts?',
    answer:
      'No, the gratuity formula is the same: 21 days salary for each of the first 5 years and 30 days salary for each year after that. The difference is that limited contract employees get full gratuity at contract end without reduction.',
  },
];

export default function LimitedContractPage() {
  const breadcrumbs = [
    { name: 'Home', url: SITE_CONFIG.url },
    { name: 'Limited Contract', url: `${SITE_CONFIG.url}/limited-contract` },
  ];

  const schemas = combineSchemas([
    generateBreadcrumbSchema(breadcrumbs),
    generateFAQSchema(limitedContractFAQs),
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
                Limited Contract
              </li>
            </ol>
          </nav>

          <h1>How to Calculate Gratuity in UAE for a Limited Contract</h1>
          <p className={styles.lead}>
            Understanding your end of service benefits for fixed-term employment contracts in UAE.
          </p>

          <div className={styles.metaInfo}>
            <span>Last Updated: February 2026</span>
            <span className={styles.separator}>•</span>
            <span>Reading Time: 7 mins</span>
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="section">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <GratuityCalculator defaultContractType="limited" />
            </div>
            <div className="col-lg-6">
              <div className={styles.contentBox}>
                <h2>Introduction</h2>
                <p>
                  A limited contract (also known as a fixed-term contract) has a specific start
                  and end date. This type of contract provides certainty for both employers and
                  employees about the duration of employment.
                </p>
                <p>
                  When your limited contract reaches its natural end date, you are entitled to
                  full gratuity without any deductions—unlike unlimited contracts where resignation
                  may reduce your entitlement.
                </p>
                <p>
                  This guide explains everything you need to know about gratuity calculations
                  for limited contracts under the new UAE Labor Law.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What is Limited Contract */}
      <section className="section section-light">
        <div className="container">
          <h2>What is a Limited Contract?</h2>
          <p className="lead">
            A limited contract is a fixed-term employment agreement that specifies exact start
            and end dates for the employment relationship.
          </p>

          <div className="row g-4 mt-4">
            <div className="col-md-6">
              <div className={styles.featureCard}>
                <h5>Key Characteristics</h5>
                <ul>
                  <li>Fixed duration (typically 1-3 years)</li>
                  <li>Specific start and end dates</li>
                  <li>Automatically ends on the specified date</li>
                  <li>Can be renewed by mutual agreement</li>
                  <li>Early termination may require compensation</li>
                </ul>
              </div>
            </div>
            <div className="col-md-6">
              <div className={styles.featureCard}>
                <h5>Gratuity Benefits</h5>
                <ul>
                  <li>Full gratuity at contract end</li>
                  <li>No reduction for natural contract completion</li>
                  <li>Same calculation formula as unlimited</li>
                  <li>Entitled after completing 1 year</li>
                  <li>Maximum 2 years&apos; salary cap applies</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="table-responsive mt-4">
            <table className="table table-bordered">
              <thead className="table-light">
                <tr>
                  <th>Feature</th>
                  <th>Limited Contract</th>
                  <th>Unlimited Contract</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Duration</td>
                  <td>Fixed (1-3 years)</td>
                  <td>No fixed end date</td>
                </tr>
                <tr>
                  <td>Termination</td>
                  <td>Ends automatically</td>
                  <td>Requires notice</td>
                </tr>
                <tr>
                  <td>Gratuity at End</td>
                  <td>Full (100%)</td>
                  <td>Full (100%)</td>
                </tr>
                <tr>
                  <td>Gratuity on Resignation</td>
                  <td>Based on service</td>
                  <td>Reduced based on service</td>
                </tr>
                <tr>
                  <td>Early Termination</td>
                  <td>Compensation may apply</td>
                  <td>Notice period only</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Gratuity Calculation */}
      <section className="section">
        <div className="container">
          <h2>Gratuity Calculation for Limited Contracts</h2>
          <p>
            The gratuity calculation formula is the same for both limited and unlimited contracts.
            The main advantage of limited contracts is that you receive full gratuity when your
            contract ends naturally.
          </p>

          <div className="row g-4 mt-3">
            <div className="col-md-6">
              <div className={styles.formulaCard}>
                <h5>For 1-5 Years of Service</h5>
                <div className={styles.formulaBox}>
                  (Basic Salary ÷ 30) × 21 days × Years
                </div>
                <p className="mt-3 mb-0">21 days&apos; basic salary per year</p>
              </div>
            </div>

            <div className="col-md-6">
              <div className={styles.formulaCard}>
                <h5>After 5 Years of Service</h5>
                <div className={styles.formulaBox}>
                  (Basic Salary ÷ 30) × 30 days × Years
                </div>
                <p className="mt-3 mb-0">30 days&apos; basic salary per year</p>
              </div>
            </div>
          </div>

          {/* Scenarios */}
          <div className="mt-5">
            <h4>Gratuity Scenarios for Limited Contracts</h4>
            <div className="table-responsive">
              <table className="table table-bordered">
                <thead className="table-primary">
                  <tr>
                    <th>Scenario</th>
                    <th>Gratuity Entitlement</th>
                    <th>Additional Notes</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Contract ends naturally</td>
                    <td><span className="badge bg-success">100% Full Gratuity</span></td>
                    <td>No deductions apply</td>
                  </tr>
                  <tr>
                    <td>Contract renewed</td>
                    <td><span className="badge bg-info">Cumulative Service</span></td>
                    <td>Service years carry forward</td>
                  </tr>
                  <tr>
                    <td>Employer terminates early</td>
                    <td><span className="badge bg-success">100% + Compensation</span></td>
                    <td>May include remaining salary</td>
                  </tr>
                  <tr>
                    <td>Employee resigns early</td>
                    <td><span className="badge bg-warning text-dark">Based on Service</span></td>
                    <td>May need to compensate employer</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Example */}
          <div className={`${styles.exampleBox} mt-4`}>
            <h5>Calculation Example</h5>
            <p><strong>Employee:</strong> AED 12,000 basic salary | 3-year contract completed</p>

            <div className={styles.calculationSteps}>
              <div className={styles.step}>
                <span>Step 1: Calculate daily rate</span>
                <span>12,000 ÷ 30 = AED 400/day</span>
              </div>
              <div className={styles.step}>
                <span>Step 2: Apply formula (1-5 years)</span>
                <span>400 × 21 × 3 = AED 25,200</span>
              </div>
              <div className={styles.step}>
                <span>Step 3: Contract ended naturally</span>
                <span>100% entitlement (no deduction)</span>
              </div>
              <div className={`${styles.step} ${styles.total}`}>
                <span>Final Gratuity</span>
                <span>AED 25,200</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Early Termination */}
      <section className="section section-light">
        <div className="container">
          <h2>Early Termination of Limited Contracts</h2>
          <p>
            If either party wants to end the contract before the specified date, there are
            specific rules and potential compensation requirements.
          </p>

          <div className="row g-4 mt-3">
            <div className="col-md-6">
              <div className={styles.terminationCard}>
                <h5>If Employer Terminates Early</h5>
                <ul>
                  <li>Must have valid reason (Article 43 reasons excluded)</li>
                  <li>Employee entitled to full gratuity</li>
                  <li>May need to pay compensation</li>
                  <li>Compensation = remaining contract period salary (max 3 months)</li>
                </ul>
              </div>
            </div>
            <div className="col-md-6">
              <div className={styles.terminationCard}>
                <h5>If Employee Resigns Early</h5>
                <ul>
                  <li>Still entitled to gratuity based on service</li>
                  <li>May need to compensate employer</li>
                  <li>Compensation typically = 45 days salary or remaining period (lesser)</li>
                  <li>New job offer may require NOC or 6-month ban (case dependent)</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection
        faqs={limitedContractFAQs}
        title="Frequently Asked Questions"
        subtitle="Common questions about limited contract gratuity in UAE"
      />

      {/* CTA */}
      <section className="section section-dark">
        <div className="container text-center">
          <h2 className="mb-4">Calculate Your Limited Contract Gratuity</h2>
          <p className="lead mb-4">
            Use our calculator above to get an instant estimate of your end of service benefits.
          </p>
          <Link href="/unlimited-contract" className="btn btn-secondary btn-lg">
            Compare with Unlimited Contract
          </Link>
        </div>
      </section>

    </>
  );
}
