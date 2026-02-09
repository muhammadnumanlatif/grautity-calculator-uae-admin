import { Metadata } from 'next';
import Link from 'next/link';
import GratuityCalculator from '@/components/calculator/GratuityCalculator';
import FAQSection from '@/components/sections/FAQSection';
import { SITE_CONFIG, UAE_EMIRATES } from '@gratuity/shared';
import {
  generateBreadcrumbSchema,
  generateFAQSchema,
  generateHowToSchema,
  generateCalculatorSchema,
  combineSchemas,
} from '@gratuity/seo-utils';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'MOHRE Calculator 2026 | Official UAE Gratuity Calculator Online',
  description:
    'Use our free MOHRE calculator to calculate your UAE gratuity online. MOHRE-compliant end of service calculator based on UAE Labor Law Federal Decree-Law No. 33 of 2021.',
  keywords: [
    'mohre calculator',
    'mohre gratuity calculator',
    'mohre end of service calculator',
    'uae labor law calculator',
    'ministry of human resources calculator',
    'mohre uae calculator',
    'gratuity calculator mohre',
    'mohre salary calculator',
    'end of service benefits mohre',
  ],
  alternates: {
    canonical: `${SITE_CONFIG.url}/mohre-calculator`,
  },
};

const mohreFAQs = [
  {
    question: 'What is MOHRE and why does it matter for gratuity?',
    answer:
      'MOHRE (Ministry of Human Resources and Emiratisation) is the UAE government body responsible for regulating labor relations. All mainland UAE employers must follow MOHRE guidelines for calculating and paying gratuity. MOHRE ensures that employees receive their end of service benefits according to Federal Decree-Law No. 33 of 2021.',
  },
  {
    question: 'Is this an official MOHRE calculator?',
    answer:
      'This is an independent calculator that follows the official MOHRE gratuity calculation guidelines and UAE Labor Law. While not directly operated by MOHRE, our calculator uses the exact same formula and rules mandated by the Ministry for calculating end of service benefits.',
  },
  {
    question: 'How does MOHRE calculate gratuity in UAE?',
    answer:
      'MOHRE follows the UAE Labor Law formula: 21 days of basic salary for each year of the first 5 years, and 30 days of basic salary for each additional year. The total gratuity cannot exceed 2 years of total salary. For resignations on unlimited contracts, reduced percentages apply based on years of service.',
  },
  {
    question: 'Can I verify my gratuity calculation with MOHRE?',
    answer:
      'Yes, you can contact MOHRE through their official channels: call 800-60 (toll-free), visit a MOHRE service center, or use the MOHRE mobile app to verify your gratuity entitlement and file complaints if your employer does not pay correctly.',
  },
  {
    question: 'What documents does MOHRE require for gratuity disputes?',
    answer:
      'For gratuity disputes with MOHRE, you typically need: your employment contract, Emirates ID, passport copy, salary certificates or bank statements showing salary deposits, and any termination or resignation letters. Having accurate documentation helps expedite your case.',
  },
  {
    question: 'Does MOHRE gratuity calculation apply to free zones?',
    answer:
      'Most UAE free zones follow the standard MOHRE gratuity calculation. However, DIFC and ADGM have their own employment laws with different gratuity rules. Our calculator supports both mainland (MOHRE) and free zone calculations.',
  },
  {
    question: 'When should employers pay gratuity according to MOHRE?',
    answer:
      'According to MOHRE regulations, employers must pay gratuity as part of the final settlement within 14 days of the employment end date. Failure to pay on time can result in penalties for the employer.',
  },
  {
    question: 'How do I file a gratuity complaint with MOHRE?',
    answer:
      'You can file a gratuity complaint through: 1) The MOHRE website (mohre.gov.ae), 2) The MOHRE mobile app, 3) Calling 800-60, or 4) Visiting a MOHRE service center. The complaint process is free and MOHRE will attempt to mediate before escalating to labor court.',
  },
];

const mohreHowToSteps = [
  {
    name: 'Enter Your Basic Salary',
    text: 'Input your monthly basic salary in AED. Only include the basic salary amount, not housing, transport, or other allowances.',
  },
  {
    name: 'Select Contract Type',
    text: 'Choose whether you have an unlimited or limited contract. This affects gratuity calculations if you resign.',
  },
  {
    name: 'Enter Years of Service',
    text: 'Input the total number of years and months you have worked with your employer.',
  },
  {
    name: 'Select Termination Reason',
    text: 'Choose whether you resigned, were terminated, or your contract ended to get accurate calculations.',
  },
  {
    name: 'Get Your MOHRE-Compliant Result',
    text: 'Click calculate to see your gratuity breakdown according to MOHRE guidelines and UAE Labor Law.',
  },
];

export default function MOHRECalculatorPage() {
  const breadcrumbs = [
    { name: 'Home', url: SITE_CONFIG.url },
    { name: 'MOHRE Calculator', url: `${SITE_CONFIG.url}/mohre-calculator` },
  ];

  const schemas = combineSchemas([
    generateBreadcrumbSchema(breadcrumbs),
    generateCalculatorSchema({
      name: 'MOHRE Gratuity Calculator UAE',
      description: 'Free online MOHRE-compliant calculator for UAE end of service gratuity',
      url: `${SITE_CONFIG.url}/mohre-calculator`,
    }),
    generateHowToSchema({
      name: 'How to Calculate Gratuity Using MOHRE Calculator',
      description: 'Step-by-step guide to calculate your UAE gratuity using our MOHRE-compliant calculator',
      steps: mohreHowToSteps,
    }),
    generateFAQSchema(mohreFAQs),
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
              <li className="breadcrumb-item active" aria-current="page">MOHRE Calculator</li>
            </ol>
          </nav>

          <div className={styles.mohreBadge}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="24" height="24">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22,4 12,14.01 9,11.01" />
            </svg>
            <span>MOHRE Compliant</span>
          </div>

          <h1>MOHRE Calculator - UAE Gratuity Calculator 2026</h1>
          <p className={styles.lead}>
            Calculate your end of service benefits using the official MOHRE formula.
            100% compliant with UAE Labor Law Federal Decree-Law No. 33 of 2021.
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
              <div className={styles.mohreInfo}>
                <div className={styles.mohreLogoBadge}>
                  <span className={styles.mohreText}>MOHRE</span>
                  <span className={styles.mohreSubtext}>Ministry of Human Resources<br />and Emiratisation</span>
                </div>

                <h3>What is MOHRE?</h3>
                <p>
                  MOHRE (Ministry of Human Resources and Emiratisation) is the UAE
                  government authority responsible for:
                </p>
                <ul className={styles.mohreList}>
                  <li>Regulating employment relationships</li>
                  <li>Setting labor law standards</li>
                  <li>Protecting workers&apos; rights</li>
                  <li>Resolving labor disputes</li>
                  <li>Issuing work permits</li>
                </ul>

                <div className={styles.mohreContact}>
                  <h5>Contact MOHRE</h5>
                  <ul className={styles.contactList}>
                    <li>
                      <strong>Toll-Free:</strong> 800-60
                    </li>
                    <li>
                      <strong>Website:</strong> mohre.gov.ae
                    </li>
                    <li>
                      <strong>App:</strong> MOHRE UAE Mobile App
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MOHRE Gratuity Formula Section */}
      <section className="section section-light">
        <div className="container">
          <div className="section-title">
            <h2>MOHRE Gratuity Calculation Formula</h2>
            <p>Official calculation method as per UAE Labor Law</p>
          </div>

          <div className="row">
            <div className="col-lg-10 mx-auto">
              <div className={styles.formulaCard}>
                <div className="row g-4">
                  <div className="col-md-6">
                    <div className={styles.formulaBox}>
                      <div className={styles.formulaHeader}>
                        <span className={styles.formulaYears}>Years 1-5</span>
                      </div>
                      <div className={styles.formulaContent}>
                        <code>21 days × (Basic Salary ÷ 30) × Years</code>
                      </div>
                      <p className={styles.formulaNote}>
                        21 days&apos; basic salary per year of service
                      </p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className={styles.formulaBox}>
                      <div className={styles.formulaHeader}>
                        <span className={styles.formulaYears}>Years 5+</span>
                      </div>
                      <div className={styles.formulaContent}>
                        <code>30 days × (Basic Salary ÷ 30) × Years</code>
                      </div>
                      <p className={styles.formulaNote}>
                        30 days&apos; basic salary per year of service
                      </p>
                    </div>
                  </div>
                </div>

                <div className={styles.formulaNotice}>
                  <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
                  </svg>
                  <p>
                    <strong>Maximum Cap:</strong> Total gratuity cannot exceed 2 years of total salary
                    as per MOHRE regulations.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Resignation Entitlements */}
      <section className="section">
        <div className="container">
          <div className="section-title">
            <h2>MOHRE Gratuity for Resignations</h2>
            <p>Entitlements for unlimited contracts under MOHRE rules</p>
          </div>

          <div className="row g-4">
            <div className="col-md-4">
              <div className={styles.entitlementCard}>
                <div className={styles.entitlementYears}>1-3 Years</div>
                <div className={styles.entitlementPercentage}>33%</div>
                <p>One-third of the calculated gratuity</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className={styles.entitlementCard}>
                <div className={styles.entitlementYears}>3-5 Years</div>
                <div className={styles.entitlementPercentage}>66%</div>
                <p>Two-thirds of the calculated gratuity</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className={`${styles.entitlementCard} ${styles.entitlementCardHighlight}`}>
                <div className={styles.entitlementYears}>5+ Years</div>
                <div className={styles.entitlementPercentage}>100%</div>
                <p>Full gratuity entitlement</p>
              </div>
            </div>
          </div>

          <div className="text-center mt-4">
            <p className="text-muted">
              For limited contracts and employer terminations, employees typically receive 100% gratuity
              regardless of service period.
            </p>
            <div className="mt-3">
              <Link href="/unlimited-contract" className="btn btn-outline-primary me-2">
                Unlimited Contract Guide
              </Link>
              <Link href="/limited-contract" className="btn btn-outline-primary">
                Limited Contract Guide
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* MOHRE Services Section */}
      <section className="section section-light">
        <div className="container">
          <div className="section-title">
            <h2>MOHRE Services for Employees</h2>
            <p>Official channels to verify and claim your gratuity</p>
          </div>

          <div className="row g-4">
            <div className="col-md-6 col-lg-3">
              <div className={styles.serviceCard}>
                <div className={styles.serviceIcon}>
                  <svg viewBox="0 0 24 24" fill="currentColor" width="32" height="32">
                    <path d="M20 15.5c-1.25 0-2.45-.2-3.57-.57-.35-.11-.74-.03-1.02.24l-2.2 2.2c-2.83-1.44-5.15-3.75-6.59-6.59l2.2-2.21c.28-.26.36-.65.25-1C8.7 6.45 8.5 5.25 8.5 4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.5c0-.55-.45-1-1-1z" />
                  </svg>
                </div>
                <h5>MOHRE Hotline</h5>
                <p>Call 800-60 for gratuity inquiries and complaints</p>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className={styles.serviceCard}>
                <div className={styles.serviceIcon}>
                  <svg viewBox="0 0 24 24" fill="currentColor" width="32" height="32">
                    <path d="M17 1.01L7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14z" />
                  </svg>
                </div>
                <h5>MOHRE App</h5>
                <p>Download the official MOHRE UAE mobile app</p>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className={styles.serviceCard}>
                <div className={styles.serviceIcon}>
                  <svg viewBox="0 0 24 24" fill="currentColor" width="32" height="32">
                    <path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z" />
                  </svg>
                </div>
                <h5>Service Centers</h5>
                <p>Visit a MOHRE center in your emirate</p>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className={styles.serviceCard}>
                <div className={styles.serviceIcon}>
                  <svg viewBox="0 0 24 24" fill="currentColor" width="32" height="32">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                  </svg>
                </div>
                <h5>Online Portal</h5>
                <p>mohre.gov.ae for e-services and complaints</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Calculator by Emirate */}
      <section className="section">
        <div className="container">
          <div className="section-title">
            <h2>MOHRE Calculator by Emirate</h2>
            <p>Location-specific gratuity calculators</p>
          </div>

          <div className="row g-3 justify-content-center">
            {Object.entries(UAE_EMIRATES).map(([key, emirate]) => (
              <div key={key} className="col-lg-3 col-md-4 col-6">
                <Link href={`/${emirate.slug}`} className={styles.emirateLinkCard}>
                  <span>{emirate.name}</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="9,18 15,12 9,6" />
                  </svg>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection faqs={mohreFAQs} title="MOHRE Calculator FAQ" />

      {/* Related Pages */}
      <section className="section section-light">
        <div className="container">
          <div className="section-title">
            <h2>Related MOHRE Resources</h2>
            <p>Learn more about UAE employment and labor law</p>
          </div>

          <div className="row g-3 justify-content-center">
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
              <Link href="/labor-card-check" className="btn btn-outline-primary">
                Labor Card Check
              </Link>
            </div>
            <div className="col-auto">
              <Link href="/e-signature-card" className="btn btn-outline-primary">
                E-Signature Card
              </Link>
            </div>
          </div>
        </div>
      </section>

    </>
  );
}
