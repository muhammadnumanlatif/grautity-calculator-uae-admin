import { Metadata } from 'next';
import Link from 'next/link';
import { SITE_CONFIG } from '@gratuity/shared';
import { generateBreadcrumbSchema, generateFAQSchema, combineSchemas } from '@gratuity/seo-utils';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Gratuity FAQ | UAE Labor Law Questions Answered 2026',
  description:
    'Get answers to frequently asked questions about UAE gratuity calculations, labor law, end of service benefits, and employee rights.',
  keywords: [
    'uae gratuity faq',
    'gratuity questions',
    'uae labor law faq',
    'end of service questions',
    'mohre gratuity',
  ],
};

const faqCategories = [
  {
    title: 'General Gratuity Questions',
    faqs: [
      {
        question: 'What is gratuity in the UAE?',
        answer: 'Gratuity (also called end of service benefits) is a lump sum payment that employers in the UAE must pay to employees who have completed at least one year of continuous service. It is calculated based on the employee\'s basic salary and years of service.',
      },
      {
        question: 'How is gratuity calculated in the UAE?',
        answer: 'Under UAE Labor Law, gratuity is calculated as: 21 days of basic salary for each of the first 5 years of service, and 30 days of basic salary for each year after 5 years. The total gratuity cannot exceed 2 years\' total salary.',
      },
      {
        question: 'What is the minimum service period for gratuity?',
        answer: 'You must complete at least 1 year of continuous service with the same employer to be eligible for gratuity in the UAE.',
      },
      {
        question: 'Is gratuity taxable in the UAE?',
        answer: 'No, the UAE does not have income tax. Your gratuity payment is received in full without any tax deductions.',
      },
      {
        question: 'What salary is used for gratuity calculation?',
        answer: 'Gratuity is calculated based on your last drawn basic salary only. Allowances such as housing, transport, and other benefits are not included in the calculation.',
      },
    ],
  },
  {
    title: 'Resignation & Termination',
    faqs: [
      {
        question: 'Do I get gratuity if I resign?',
        answer: 'Yes, you are entitled to gratuity if you resign after completing at least 1 year of service. Under the new UAE Labor Law (2022), there is no reduction in gratuity for resignation.',
      },
      {
        question: 'What if I am terminated?',
        answer: 'If your employment is terminated by the employer (except for gross misconduct under Article 44), you are entitled to full gratuity based on your years of service.',
      },
      {
        question: 'When should gratuity be paid after leaving a job?',
        answer: 'According to UAE Labor Law, all end of service dues including gratuity should be paid within 14 days of the employment end date.',
      },
      {
        question: 'What if my employer refuses to pay gratuity?',
        answer: 'You can file a complaint with the Ministry of Human Resources and Emiratisation (MOHRE). You can do this through the MOHRE app, website, or by visiting a MOHRE service center.',
      },
    ],
  },
  {
    title: 'Free Zone Questions',
    faqs: [
      {
        question: 'Do free zone employees get gratuity?',
        answer: 'Yes, most free zone employees are entitled to gratuity. Most free zones follow UAE Federal Labor Law. However, DIFC and ADGM have their own employment regulations.',
      },
      {
        question: 'How is gratuity calculated in DIFC?',
        answer: 'DIFC follows its own Employment Law. Gratuity is calculated at 21 days per year for all years of service (no distinction between first 5 years and after).',
      },
      {
        question: 'Does JAFZA have different gratuity rules?',
        answer: 'No, JAFZA follows standard UAE Federal Labor Law for gratuity calculations.',
      },
    ],
  },
  {
    title: 'Limited vs Unlimited Contracts',
    faqs: [
      {
        question: 'What is a limited contract?',
        answer: 'A limited (fixed-term) contract has a specific end date. Under the new UAE Labor Law (2022), all employment contracts are considered limited/fixed-term, with a maximum duration of 3 years (renewable).',
      },
      {
        question: 'Is gratuity different for limited contracts?',
        answer: 'Under the new UAE Labor Law, gratuity calculation is the same regardless of contract type. The old distinctions between limited and unlimited contracts have been removed.',
      },
      {
        question: 'What happened to unlimited contracts?',
        answer: 'The 2022 UAE Labor Law eliminated unlimited contracts. All existing unlimited contracts should have been converted to fixed-term contracts by February 2023.',
      },
    ],
  },
  {
    title: 'Other Common Questions',
    faqs: [
      {
        question: 'Is probation period included in gratuity calculation?',
        answer: 'Yes, probation period counts towards your total service period for gratuity calculation, as long as you continue employment beyond probation.',
      },
      {
        question: 'What about part-time employees?',
        answer: 'Part-time employees are entitled to gratuity on a pro-rata basis, calculated according to their actual working hours.',
      },
      {
        question: 'Can I get gratuity if I work for multiple employers?',
        answer: 'Each employment relationship is calculated separately. You would receive gratuity from each employer based on your service with them.',
      },
      {
        question: 'What is the maximum gratuity I can receive?',
        answer: 'The total gratuity amount cannot exceed 2 years\' worth of your total salary (basic + allowances for the cap calculation).',
      },
    ],
  },
];

const allFaqs = faqCategories.flatMap(cat => cat.faqs);

export default function FAQPage() {
  const breadcrumbs = [
    { name: 'Home', url: SITE_CONFIG.url },
    { name: 'FAQ', url: `${SITE_CONFIG.url}/faq` },
  ];

  const schemas = combineSchemas([
    generateBreadcrumbSchema(breadcrumbs),
    generateFAQSchema(allFaqs),
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
              <li className="breadcrumb-item active" aria-current="page">FAQ</li>
            </ol>
          </nav>

          <h1>Frequently Asked Questions</h1>
          <p className={styles.lead}>
            Get answers to common questions about UAE gratuity and labor law.
          </p>
        </div>
      </section>

      {/* Quick Links */}
      <section className="section">
        <div className="container">
          <div className={styles.quickLinks}>
            <span>Jump to:</span>
            {faqCategories.map((cat, i) => (
              <a key={i} href={`#${cat.title.toLowerCase().replace(/\s+/g, '-')}`}>
                {cat.title}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Categories */}
      {faqCategories.map((category, catIndex) => (
        <section
          key={catIndex}
          id={category.title.toLowerCase().replace(/\s+/g, '-')}
          className={catIndex % 2 === 0 ? 'section' : 'section section-light'}
        >
          <div className="container">
            <h2 className={styles.categoryTitle}>{category.title}</h2>
            <div className={styles.faqList}>
              {category.faqs.map((faq, faqIndex) => (
                <details key={faqIndex} className={styles.faqItem}>
                  <summary className={styles.faqQuestion}>
                    {faq.question}
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/>
                    </svg>
                  </summary>
                  <div className={styles.faqAnswer}>
                    <p>{faq.answer}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* CTA Section */}
      <section className="section">
        <div className="container text-center">
          <h2>Still Have Questions?</h2>
          <p className="lead mb-4">
            Contact us or use our gratuity calculator to estimate your end of service benefits.
          </p>
          <div className="row g-3 justify-content-center">
            <div className="col-auto">
              <Link href="/#calculator" className="btn btn-primary btn-lg">
                Calculate Gratuity
              </Link>
            </div>
            <div className="col-auto">
              <Link href="/contact" className="btn btn-outline-primary btn-lg">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
