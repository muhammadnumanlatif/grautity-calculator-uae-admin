import { Metadata } from 'next';
import Link from 'next/link';
import GratuityCalculator from '@/components/calculator/GratuityCalculator';
import FAQSection from '@/components/sections/FAQSection';
import { SITE_CONFIG, SHARJAH_AREAS, SHARJAH_FREE_ZONES, SHARJAH_LANDMARKS } from '@gratuity/shared';
import {
  generateBreadcrumbSchema,
  generateFAQSchema,
  generateLocalBusinessSchema,
  combineSchemas,
} from '@gratuity/seo-utils';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Gratuity Calculator Sharjah | Calculate End of Service Benefits 2026',
  description:
    'Calculate your gratuity in Sharjah with our free MOHRE-compliant calculator. Accurate end of service calculations for Sharjah mainland and free zones including SAIF Zone, Hamriyah, Shams.',
  keywords: [
    'gratuity calculator sharjah',
    'sharjah gratuity calculation',
    'sharjah labor law gratuity',
    'end of service sharjah',
    'saif zone gratuity',
    'hamriyah gratuity',
    'shams media city gratuity',
  ],
};

const sharjahFAQs = [
  {
    question: 'How is gratuity calculated in Sharjah?',
    answer:
      'Gratuity in Sharjah is calculated based on UAE Federal Labor Law. You receive 21 days\' basic salary for each of the first 5 years and 30 days\' salary for each year after that. The maximum gratuity cannot exceed 2 years\' total salary.',
  },
  {
    question: 'Are gratuity rules different in Sharjah Free Zones?',
    answer:
      'Sharjah free zones like SAIF Zone, Hamriyah Free Zone, and Shams generally follow the standard UAE Labor Law for gratuity calculations. Always verify with your employer and check your employment contract.',
  },
  {
    question: 'I work in Sharjah but live in Dubai. Which law applies?',
    answer:
      'UAE Labor Law applies uniformly across all emirates. Your gratuity is calculated the same way regardless of where you live. What matters is your employment contract and employer location.',
  },
  {
    question: 'What is the gratuity for Khor Fakkan employees?',
    answer:
      'Khor Fakkan is part of Sharjah Emirate, so employees there follow the standard UAE Labor Law for gratuity calculations.',
  },
  {
    question: 'Where can I file a labor complaint in Sharjah?',
    answer:
      'You can file labor complaints with MOHRE Sharjah offices located in the Industrial Area or through the MOHRE mobile app.',
  },
];

export default function SharjahPage() {
  const breadcrumbs = [
    { name: 'Home', url: SITE_CONFIG.url },
    { name: 'Sharjah', url: `${SITE_CONFIG.url}/sharjah` },
  ];

  const schemas = combineSchemas([
    generateBreadcrumbSchema(breadcrumbs),
    generateLocalBusinessSchema({
      name: 'Gratuity Calculator Sharjah',
      description: 'Free gratuity calculator for Sharjah employees',
      address: {
        addressLocality: 'Sharjah',
        addressRegion: 'Sharjah',
        addressCountry: 'AE',
      },
      geo: {
        latitude: 25.3463,
        longitude: 55.4209,
      },
      url: `${SITE_CONFIG.url}/sharjah`,
    }),
    generateFAQSchema(sharjahFAQs),
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
                Sharjah
              </li>
            </ol>
          </nav>

          <h1>Gratuity Calculator Sharjah</h1>
          <p className={styles.lead}>
            Calculate your end of service benefits in Sharjah - for mainland and free zones
            including SAIF Zone, Hamriyah, and Shams Media City.
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
                <h3>Sharjah Employment Overview</h3>
                <p>
                  Sharjah is the cultural capital of the UAE and the third-largest emirate.
                  It offers affordable business setup and is home to major industrial zones
                  and media free zones.
                </p>

                <div className={styles.infoBox}>
                  <h5>Key Facts</h5>
                  <ul>
                    <li>Cultural capital of the UAE</li>
                    <li>Major free zones: SAIF, Hamriyah, Shams</li>
                    <li>Strong industrial and manufacturing sector</li>
                    <li>Standard UAE Labor Law applies</li>
                  </ul>
                </div>

                <div className={`${styles.infoBox} mt-3`}>
                  <h5>MOHRE Sharjah</h5>
                  <p className="mb-0 text-muted">
                    Industrial Area, Sharjah. Contact through MOHRE app or call 800 60.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Areas Section */}
      <section className="section section-light">
        <div className="container">
          <h2 className="text-center mb-4">Sharjah Areas</h2>
          <div className="row g-3">
            {SHARJAH_AREAS.map((area) => (
              <div key={area.slug} className="col-lg-3 col-md-4 col-6">
                <Link href={`/sharjah/${area.slug}`} className={styles.areaCard}>
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
          <h2 className="text-center mb-4">Sharjah Free Zones</h2>
          <div className="row g-3">
            {SHARJAH_FREE_ZONES.map((zone) => (
              <div key={zone.slug} className="col-lg-4 col-md-6">
                <Link href={`/sharjah/free-zones/${zone.slug}`} className={styles.freezoneCard}>
                  <span>{zone.name}</span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Landmarks Section */}
      <section className="section section-light">
        <div className="container">
          <h2 className="text-center mb-4">Sharjah Landmarks</h2>
          <div className="row g-3 justify-content-center">
            {SHARJAH_LANDMARKS.map((landmark) => (
              <div key={landmark.slug} className="col-lg-3 col-md-4 col-6">
                <Link href={`/sharjah/landmarks/${landmark.slug}`} className={styles.landmarkCard}>
                  <span>{landmark.name}</span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection faqs={sharjahFAQs} title="Sharjah Gratuity FAQ" />

      {/* Related Emirates */}
      <section className="section section-light">
        <div className="container">
          <h2 className="text-center mb-4">Other Emirates</h2>
          <div className="row g-3 justify-content-center">
            <div className="col-auto"><Link href="/dubai" className="btn btn-outline-primary">Dubai</Link></div>
            <div className="col-auto"><Link href="/abu-dhabi" className="btn btn-outline-primary">Abu Dhabi</Link></div>
            <div className="col-auto"><Link href="/ajman" className="btn btn-outline-primary">Ajman</Link></div>
            <div className="col-auto"><Link href="/ras-al-khaimah" className="btn btn-outline-primary">Ras Al Khaimah</Link></div>
            <div className="col-auto"><Link href="/fujairah" className="btn btn-outline-primary">Fujairah</Link></div>
            <div className="col-auto"><Link href="/umm-al-quwain" className="btn btn-outline-primary">Umm Al Quwain</Link></div>
          </div>
        </div>
      </section>

    </>
  );
}
