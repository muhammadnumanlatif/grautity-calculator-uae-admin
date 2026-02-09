import { Metadata } from 'next';
import Link from 'next/link';
import GratuityCalculator from '@/components/calculator/GratuityCalculator';
import FAQSection from '@/components/sections/FAQSection';
import { SITE_CONFIG, FUJAIRAH_AREAS, FUJAIRAH_FREE_ZONES, FUJAIRAH_LANDMARKS } from '@gratuity/shared';
import {
  generateBreadcrumbSchema,
  generateFAQSchema,
  generateLocalBusinessSchema,
  combineSchemas,
} from '@gratuity/seo-utils';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Gratuity Calculator Fujairah | Calculate End of Service Benefits 2026',
  description:
    'Calculate your gratuity in Fujairah with our free MOHRE-compliant calculator. Accurate end of service calculations for Fujairah mainland and Fujairah Free Zone.',
  keywords: [
    'gratuity calculator fujairah',
    'fujairah gratuity calculation',
    'fujairah labor law gratuity',
    'end of service fujairah',
    'fujairah free zone gratuity',
    'ifza gratuity',
  ],
};

const fujairahFAQs = [
  {
    question: 'How is gratuity calculated in Fujairah?',
    answer:
      'Gratuity in Fujairah is calculated based on UAE Federal Labor Law. You receive 21 days\' basic salary for each of the first 5 years and 30 days\' salary for each year after that. The maximum gratuity cannot exceed 2 years\' total salary.',
  },
  {
    question: 'Does Fujairah Free Zone have different gratuity rules?',
    answer:
      'Fujairah Free Zone (FFZ) and IFZA generally follow the standard UAE Labor Law for gratuity calculations. Always verify with your employer and check your employment contract.',
  },
  {
    question: 'What industries are common in Fujairah?',
    answer:
      'Fujairah has a strong maritime and oil bunkering industry, along with growing tourism. The port is one of the largest bunkering hubs in the world.',
  },
  {
    question: 'Where can I file a labor complaint in Fujairah?',
    answer:
      'You can file labor complaints with MOHRE Fujairah office or through the MOHRE mobile app. The toll-free number 800 60 is also available.',
  },
];

export default function FujairahPage() {
  const breadcrumbs = [
    { name: 'Home', url: SITE_CONFIG.url },
    { name: 'Fujairah', url: `${SITE_CONFIG.url}/fujairah` },
  ];

  const schemas = combineSchemas([
    generateBreadcrumbSchema(breadcrumbs),
    generateLocalBusinessSchema({
      name: 'Gratuity Calculator Fujairah',
      description: 'Free gratuity calculator for Fujairah employees',
      address: {
        addressLocality: 'Fujairah',
        addressRegion: 'Fujairah',
        addressCountry: 'AE',
      },
      geo: {
        latitude: 25.1288,
        longitude: 56.3265,
      },
      url: `${SITE_CONFIG.url}/fujairah`,
    }),
    generateFAQSchema(fujairahFAQs),
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
              <li className="breadcrumb-item active" aria-current="page">Fujairah</li>
            </ol>
          </nav>

          <h1>Gratuity Calculator Fujairah</h1>
          <p className={styles.lead}>
            Calculate your end of service benefits in Fujairah - for mainland and Fujairah Free Zone.
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
                <h3>Fujairah Employment Overview</h3>
                <p>
                  Fujairah is the only emirate on the UAE&apos;s east coast with direct access
                  to the Gulf of Oman. It has a significant maritime and bunkering industry.
                </p>

                <div className={styles.infoBox}>
                  <h5>Key Facts</h5>
                  <ul>
                    <li>Only emirate on the east coast</li>
                    <li>Major bunkering and maritime hub</li>
                    <li>IFZA - International Free Zone Authority</li>
                    <li>Growing tourism sector</li>
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
          <h2 className="text-center mb-4">Fujairah Areas</h2>
          <div className="row g-3">
            {FUJAIRAH_AREAS.map((area) => (
              <div key={area.slug} className="col-lg-3 col-md-4 col-6">
                <Link href={`/fujairah/${area.slug}`} className={styles.areaCard}>
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
          <h2 className="text-center mb-4">Fujairah Free Zones</h2>
          <div className="row g-3 justify-content-center">
            {FUJAIRAH_FREE_ZONES.map((zone) => (
              <div key={zone.slug} className="col-lg-4 col-md-6">
                <Link href={`/fujairah/free-zones/${zone.slug}`} className={styles.freezoneCard}>
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
          <h2 className="text-center mb-4">Fujairah Landmarks</h2>
          <div className="row g-3 justify-content-center">
            {FUJAIRAH_LANDMARKS.map((landmark) => (
              <div key={landmark.slug} className="col-lg-3 col-md-4 col-6">
                <Link href={`/fujairah/landmarks/${landmark.slug}`} className={styles.landmarkCard}>
                  <span>{landmark.name}</span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection faqs={fujairahFAQs} title="Fujairah Gratuity FAQ" />

      {/* Related Emirates */}
      <section className="section section-light">
        <div className="container">
          <h2 className="text-center mb-4">Other Emirates</h2>
          <div className="row g-3 justify-content-center">
            <div className="col-auto"><Link href="/dubai" className="btn btn-outline-primary">Dubai</Link></div>
            <div className="col-auto"><Link href="/abu-dhabi" className="btn btn-outline-primary">Abu Dhabi</Link></div>
            <div className="col-auto"><Link href="/sharjah" className="btn btn-outline-primary">Sharjah</Link></div>
            <div className="col-auto"><Link href="/ajman" className="btn btn-outline-primary">Ajman</Link></div>
            <div className="col-auto"><Link href="/ras-al-khaimah" className="btn btn-outline-primary">Ras Al Khaimah</Link></div>
            <div className="col-auto"><Link href="/umm-al-quwain" className="btn btn-outline-primary">Umm Al Quwain</Link></div>
          </div>
        </div>
      </section>

    </>
  );
}
