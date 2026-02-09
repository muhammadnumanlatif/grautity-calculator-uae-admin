import { Metadata } from 'next';
import Link from 'next/link';
import GratuityCalculator from '@/components/calculator/GratuityCalculator';
import FAQSection from '@/components/sections/FAQSection';
import { UAE_EMIRATES, SITE_CONFIG } from '@gratuity/shared';
import {
  generateOrganizationSchema,
  generateWebsiteSchema,
  generateFAQSchema,
  generateCalculatorSchema,
  combineSchemas,
} from '@gratuity/seo-utils';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Online Mohre Gratuity Calculator UAE 2026 | Free End of Service Calculator',
  description:
    'Calculate your UAE gratuity instantly with our free MOHRE-compliant calculator. Get accurate end of service benefits for unlimited & limited contracts in Dubai, Abu Dhabi & all Emirates.',
  keywords: [
    'gratuity calculator uae',
    'mohre gratuity calculator',
    'end of service calculator uae',
    'uae labor law gratuity',
    'gratuity calculation uae 2026',
    'dubai gratuity calculator',
    'abu dhabi gratuity calculator',
  ],
  alternates: {
    canonical: SITE_CONFIG.url,
  },
  robots: {
    index: true,
    follow: true,
  },
};

import { getPageBySlug } from '@gratuity/firebase-config/firestore';
import type { Page } from '@gratuity/shared/types';

const defaultHomeFAQs = [
  {
    question: 'How is gratuity calculated in UAE 2026?',
    answer:
      'Gratuity in UAE is calculated based on your basic salary and years of service. For the first 5 years, you receive 21 days of basic salary per year. After 5 years, you receive 30 days of basic salary per year. The maximum gratuity cannot exceed 2 years of total salary.',
  },
  {
    question: 'Is gratuity taxable in UAE?',
    answer:
      'No, gratuity is not taxable in the UAE. The United Arab Emirates does not impose personal income tax, so your entire gratuity amount is yours to keep.',
  },
  {
    question: 'Can I get gratuity if I resign?',
    answer:
      'Yes, you can get gratuity if you resign, but for unlimited contracts, the amount depends on your years of service: Less than 1 year = no gratuity, 1-3 years = 1/3 of gratuity, 3-5 years = 2/3 of gratuity, 5+ years = full gratuity.',
  },
  {
    question: 'What is the maximum gratuity amount in UAE?',
    answer:
      'The maximum gratuity amount in UAE cannot exceed 2 years of your total salary. This cap applies regardless of how many years you have worked.',
  },
  {
    question: 'Do free zone employees get the same gratuity?',
    answer:
      'Most free zones follow the standard UAE Labor Law for gratuity. However, DIFC and ADGM have their own employment laws with different gratuity calculations. Our calculator supports all major free zones.',
  },
  {
    question: 'What is included in basic salary for gratuity?',
    answer:
      'Only your basic salary is used for gratuity calculation. Allowances such as housing, transport, utilities, and any other benefits are excluded from the calculation.',
  },
  {
    question: 'How long do I need to work to get gratuity?',
    answer:
      'You need to complete at least 1 year of continuous service to be eligible for gratuity under UAE Labor Law. Part-time workers may have different rules based on their contract.',
  },
  {
    question: 'When should my employer pay my gratuity?',
    answer:
      'According to UAE Labor Law, employers must pay gratuity within 14 days of the employment end date as part of the final settlement.',
  },
];

export default async function HomePage() {
  const pageData = await getPageBySlug<Page>('home');
  const homeFAQs = pageData?.faqs || defaultHomeFAQs;

  const schemas = combineSchemas([
    generateOrganizationSchema(),
    generateWebsiteSchema(),
    generateCalculatorSchema({
      name: 'UAE Gratuity Calculator',
      description: 'Free online calculator for UAE end of service gratuity',
      url: SITE_CONFIG.url,
    }),
    generateFAQSchema(homeFAQs),
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: schemas }}
      />

      {/* Hero Section */}
      <section className="hero">
        <div className="container position-relative">
          <div className="row align-items-center">
            <div className="col-lg-6 mb-4 mb-lg-0">
              <h1>Online Mohre Gratuity Calculator UAE - 2026</h1>
              <p className="lead">
                Calculate Your End of Service Benefits Instantly - 100% Free & MOHRE Compliant
              </p>
              <div className="trust-badges">
                <div className="badge-item">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22,4 12,14.01 9,11.01" />
                  </svg>
                  <span>MOHRE Compliant</span>
                </div>
                <div className="badge-item">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 6v6l4 2" />
                  </svg>
                  <span>Instant Results</span>
                </div>
                <div className="badge-item">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                  <span>Secure & Private</span>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <GratuityCalculator />
            </div>
          </div>
        </div>
      </section>

      {/* What is Gratuity Section */}
      <section className="section">
        <div className="container">
          <div className="section-title">
            <h2>What is Gratuity in UAE?</h2>
            <p>
              Understanding your end of service benefits under UAE Labor Law
            </p>
          </div>

          <div className="row">
            <div className="col-lg-8 mx-auto">
              <p className="lead text-center mb-4">
                Gratuity is the end-of-service benefit that every employee in the UAE is entitled
                to receive upon completion of their employment contract. It is a mandatory payment
                regulated by UAE Labor Law (Federal Decree-Law No. 33 of 2021).
              </p>

              <div className="row g-4">
                <div className="col-md-6">
                  <div className="card h-100">
                    <div className="card-body">
                      <div className={`${styles.featureIcon} mb-3`}>
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="#0066cc">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                        </svg>
                      </div>
                      <h5>Eligibility</h5>
                      <p className="text-muted mb-0">
                        Applies to all employees who complete 1+ year of continuous service
                      </p>
                    </div>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="card h-100">
                    <div className="card-body">
                      <div className={`${styles.featureIcon} mb-3`}>
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="#0066cc">
                          <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z" />
                        </svg>
                      </div>
                      <h5>Calculation Basis</h5>
                      <p className="text-muted mb-0">
                        Calculated based on basic salary only (allowances excluded)
                      </p>
                    </div>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="card h-100">
                    <div className="card-body">
                      <div className={`${styles.featureIcon} mb-3`}>
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="#0066cc">
                          <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 14H6v-2h6v2zm3-4H6v-2h9v2zm0-4H6V7h9v2z" />
                        </svg>
                      </div>
                      <h5>Maximum Limit</h5>
                      <p className="text-muted mb-0">
                        Maximum gratuity cannot exceed 2 years&apos; total salary
                      </p>
                    </div>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="card h-100">
                    <div className="card-body">
                      <div className={`${styles.featureIcon} mb-3`}>
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="#0066cc">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z" />
                        </svg>
                      </div>
                      <h5>Free Zone Rules</h5>
                      <p className="text-muted mb-0">
                        Different rules for DIFC, ADGM, and other financial free zones
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How Gratuity is Calculated */}
      <section className="section section-light">
        <div className="container">
          <div className="section-title">
            <h2>How to Calculate Gratuity in UAE</h2>
            <p>The official formula based on UAE Labor Law</p>
          </div>

          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="card">
                <div className="card-body p-4">
                  <div className="row">
                    <div className="col-md-6 mb-4 mb-md-0">
                      <div className={styles.formulaBox}>
                        <h5 className="text-primary mb-3">For 1-5 Years of Service</h5>
                        <div className={styles.formula}>
                          <span className={styles.formulaText}>
                            (Basic Salary ÷ 30) × 21 days × Years
                          </span>
                        </div>
                        <p className="text-muted mt-3 mb-0">
                          21 days&apos; basic salary per year of service
                        </p>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className={styles.formulaBox}>
                        <h5 className="text-primary mb-3">After 5 Years of Service</h5>
                        <div className={styles.formula}>
                          <span className={styles.formulaText}>
                            (Basic Salary ÷ 30) × 30 days × Years
                          </span>
                        </div>
                        <p className="text-muted mt-3 mb-0">
                          30 days&apos; basic salary per year of service
                        </p>
                      </div>
                    </div>
                  </div>

                  <hr className="my-4" />

                  <div className="example-calculation">
                    <h6 className="mb-3">Example Calculation</h6>
                    <p className="mb-2">
                      <strong>Employee:</strong> AED 10,000 basic salary | 7 years of service
                    </p>
                    <ul className={styles.calculationSteps}>
                      <li>
                        <span>First 5 years:</span>
                        <span>(10,000 ÷ 30 × 21) × 5 = AED 35,000</span>
                      </li>
                      <li>
                        <span>Next 2 years:</span>
                        <span>(10,000 ÷ 30 × 30) × 2 = AED 20,000</span>
                      </li>
                      <li className={styles.calculationStepsTotal}>
                        <span>Total Gratuity:</span>
                        <span>AED 55,000</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contract Types */}
      <section className="section">
        <div className="container">
          <div className="section-title">
            <h2>Gratuity for Different Contract Types</h2>
            <p>Understanding unlimited vs limited contracts</p>
          </div>

          <div className="row g-4">
            <div className="col-md-6">
              <div className={`card h-100 ${styles.contractCard}`}>
                <div className="card-body p-4">
                  <div className={`${styles.contractIcon} ${styles.contractIconUnlimited}`}>
                    <svg viewBox="0 0 24 24" fill="currentColor" width="32" height="32">
                      <path d="M18.6 6.62c-1.44 0-2.8.56-3.77 1.53L12 10.66 10.48 12h.01L7.8 14.39c-.64.64-1.49.99-2.4.99-1.87 0-3.39-1.51-3.39-3.38S3.53 8.62 5.4 8.62c.91 0 1.76.35 2.44 1.03l1.13 1 1.51-1.34L9.22 8.2C8.2 7.18 6.84 6.62 5.4 6.62 2.42 6.62 0 9.04 0 12s2.42 5.38 5.4 5.38c1.44 0 2.8-.56 3.77-1.53l2.83-2.5.01.01L13.52 12h-.01l2.69-2.39c.64-.64 1.49-.99 2.4-.99 1.87 0 3.39 1.51 3.39 3.38s-1.52 3.38-3.39 3.38c-.9 0-1.76-.35-2.44-1.03l-1.14-1.01-1.51 1.34 1.27 1.12c1.02 1.01 2.37 1.57 3.82 1.57 2.98 0 5.4-2.41 5.4-5.38s-2.42-5.37-5.4-5.37z" />
                    </svg>
                  </div>
                  <h4>Unlimited Contract</h4>
                  <ul className={styles.contractFeatures}>
                    <li>No fixed end date</li>
                    <li>1-3 month notice period</li>
                    <li>Can be terminated by either party</li>
                    <li>Gratuity depends on resignation or termination</li>
                  </ul>
                  <Link href="/unlimited-contract" className="btn btn-outline-primary">
                    Learn More
                  </Link>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className={`card h-100 ${styles.contractCard}`}>
                <div className="card-body p-4">
                  <div className={`${styles.contractIcon} ${styles.contractIconLimited}`}>
                    <svg viewBox="0 0 24 24" fill="currentColor" width="32" height="32">
                      <path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
                    </svg>
                  </div>
                  <h4>Limited Contract</h4>
                  <ul className={styles.contractFeatures}>
                    <li>Fixed duration (1-3 years)</li>
                    <li>Ends on specified date</li>
                    <li>Early termination may require compensation</li>
                    <li>Full gratuity at contract end</li>
                  </ul>
                  <Link href="/limited-contract" className="btn btn-outline-primary">
                    Learn More
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Emirates Section */}
      <section className="section section-light">
        <div className="container">
          <div className="section-title">
            <h2>Calculate Gratuity by Emirates</h2>
            <p>Location-specific calculators for all UAE Emirates</p>
          </div>

          <div className="row g-4">
            {Object.entries(UAE_EMIRATES).map(([key, emirate]) => (
              <div key={key} className="col-lg-3 col-md-4 col-6">
                <Link href={`/${emirate.slug}`} className={styles.emirateCard}>
                  <div className={styles.emirateIcon}>
                    <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                    </svg>
                  </div>
                  <h5>{emirate.name}</h5>
                  <span className={styles.emirateLink}>Calculate →</span>
                </Link>
              </div>
            ))}
          </div>

          <div className="text-center mt-5">
            <h5 className="mb-3">Free Zone Specific Calculators</h5>
            <div className={styles.freeZoneTags}>
              <Link href="/dubai/free-zones/difc" className={styles.freeZoneTag}>
                DIFC
              </Link>
              <Link href="/abu-dhabi/free-zones/adgm" className={styles.freeZoneTag}>
                ADGM
              </Link>
              <Link href="/dubai/free-zones/jafza" className={styles.freeZoneTag}>
                JAFZA
              </Link>
              <Link href="/dubai/free-zones/dmcc" className={styles.freeZoneTag}>
                DMCC
              </Link>
              <Link href="/dubai/free-zones" className={`${styles.freeZoneTag} ${styles.freeZoneTagViewAll}`}>
                View All 45+ Free Zones →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection faqs={homeFAQs} title="Frequently Asked Questions" />

      {/* CTA Section */}
      <section className="section section-dark">
        <div className="container text-center">
          <h2 className="mb-4">Ready to Calculate Your Gratuity?</h2>
          <p className="lead mb-4">
            Use our free, MOHRE-compliant calculator to get accurate results instantly.
          </p>
          <Link href="#calculator" className="btn btn-secondary btn-lg">
            Calculate Now
          </Link>
        </div>
      </section>
    </>
  );
}
