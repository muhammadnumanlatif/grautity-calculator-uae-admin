import { Metadata } from 'next';
import Link from 'next/link';
import GratuityCalculator from '@/components/calculator/GratuityCalculator';
import FAQSection from '@/components/sections/FAQSection';
import { SITE_CONFIG, AJMAN_AREAS, AJMAN_FREE_ZONES } from '@gratuity/shared';
import {
  generateBreadcrumbSchema,
  generateFAQSchema,
  generateLocalBusinessSchema,
  combineSchemas,
} from '@gratuity/seo-utils';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Gratuity Calculator Ajman | Calculate End of Service Benefits 2026',
  description:
    'Calculate your gratuity in Ajman with our free MOHRE-compliant calculator. Accurate end of service calculations for Ajman mainland and Ajman Free Zone.',
  keywords: [
    'gratuity calculator ajman',
    'ajman gratuity calculation',
    'ajman labor law gratuity',
    'end of service ajman',
    'ajman free zone gratuity',
  ],
};

const ajmanFAQs = [
  {
    question: 'How is gratuity calculated in Ajman?',
    answer:
      'Gratuity in Ajman is calculated based on UAE Federal Labor Law. You receive 21 days\' basic salary for each of the first 5 years and 30 days\' salary for each year after that. The maximum gratuity cannot exceed 2 years\' total salary.',
  },
  {
    question: 'Does Ajman Free Zone have different gratuity rules?',
    answer:
      'Ajman Free Zone generally follows the standard UAE Labor Law for gratuity calculations. Always verify with your employer and check your employment contract for specific terms.',
  },
  {
    question: 'What is the minimum service for gratuity in Ajman?',
    answer:
      'As with all UAE emirates, you must complete at least 1 year of continuous service to be eligible for gratuity in Ajman.',
  },
  {
    question: 'Where is the MOHRE office in Ajman?',
    answer:
      'MOHRE has an office in Ajman. You can also use the MOHRE mobile app for services or call the toll-free number 800 60.',
  },
];

export default function AjmanPage() {
  const breadcrumbs = [
    { name: 'Home', url: SITE_CONFIG.url },
    { name: 'Ajman', url: `${SITE_CONFIG.url}/ajman` },
  ];

  const schemas = combineSchemas([
    generateBreadcrumbSchema(breadcrumbs),
    generateLocalBusinessSchema({
      name: 'Gratuity Calculator Ajman',
      description: 'Free gratuity calculator for Ajman employees',
      address: {
        addressLocality: 'Ajman',
        addressRegion: 'Ajman',
        addressCountry: 'AE',
      },
      geo: {
        latitude: 25.4052,
        longitude: 55.5136,
      },
      url: `${SITE_CONFIG.url}/ajman`,
    }),
    generateFAQSchema(ajmanFAQs),
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
              <li className="breadcrumb-item active" aria-current="page">Ajman</li>
            </ol>
          </nav>

          <h1>Gratuity Calculator Ajman</h1>
          <p className={styles.lead}>
            Calculate your end of service benefits in Ajman - for mainland and Ajman Free Zone.
          </p>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="section">
        <div className="container">
          <div className="row">
            <div className="col-lg-7">
              <GratuityCalculator showFreeZone={true} />
            </div>
            <div className="col-lg-5">
              <div className={styles.locationInfo}>
                <h3>Ajman Employment Overview</h3>
                <p>
                  Ajman is the smallest emirate by area but offers affordable business setup
                  and cost-effective living. It has a growing economy with diverse industries.
                </p>

                <div className={styles.infoBox}>
                  <h5>Key Facts</h5>
                  <ul>
                    <li>Smallest emirate by land area</li>
                    <li>Affordable business setup costs</li>
                    <li>Ajman Free Zone for business licensing</li>
                    <li>Standard UAE Labor Law applies</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Areas Section */}
      <section className="section section-light">
        <div className="container">
          <h2 className="text-center mb-4">Ajman Areas</h2>
          <div className="row g-3">
            {AJMAN_AREAS.map((area) => (
              <div key={area.slug} className="col-lg-3 col-md-4 col-6">
                <Link href={`/ajman/${area.slug}`} className={styles.areaCard}>
                  <span>{area.name}</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="9,18 15,12 9,6" />
                  </svg>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Free Zones Section */}
      <section className="section">
        <div className="container">
          <h2 className="text-center mb-4">Ajman Free Zones</h2>
          <div className="row g-3 justify-content-center">
            {AJMAN_FREE_ZONES.map((zone) => (
              <div key={zone.slug} className="col-lg-4 col-md-6">
                <Link href={`/ajman/free-zones/${zone.slug}`} className={styles.freezoneCard}>
                  <span>{zone.name}</span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection faqs={ajmanFAQs} title="Ajman Gratuity FAQ" />

      {/* Related Emirates */}
      <section className="section section-light">
        <div className="container">
          <h2 className="text-center mb-4">Other Emirates</h2>
          <div className="row g-3 justify-content-center">
            <div className="col-auto"><Link href="/dubai" className="btn btn-outline-primary">Dubai</Link></div>
            <div className="col-auto"><Link href="/abu-dhabi" className="btn btn-outline-primary">Abu Dhabi</Link></div>
            <div className="col-auto"><Link href="/sharjah" className="btn btn-outline-primary">Sharjah</Link></div>
            <div className="col-auto"><Link href="/ras-al-khaimah" className="btn btn-outline-primary">Ras Al Khaimah</Link></div>
            <div className="col-auto"><Link href="/fujairah" className="btn btn-outline-primary">Fujairah</Link></div>
            <div className="col-auto"><Link href="/umm-al-quwain" className="btn btn-outline-primary">Umm Al Quwain</Link></div>
          </div>
        </div>
      </section>

    </>
  );
}
