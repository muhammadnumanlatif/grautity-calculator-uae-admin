import { Metadata } from 'next';
import Link from 'next/link';
import GratuityCalculator from '@/components/calculator/GratuityCalculator';
import FAQSection from '@/components/sections/FAQSection';
import { SITE_CONFIG, ABU_DHABI_AREAS, ABU_DHABI_FREE_ZONES, ABU_DHABI_LANDMARKS } from '@gratuity/shared';
import {
  generateBreadcrumbSchema,
  generateFAQSchema,
  generateLocalBusinessSchema,
  combineSchemas,
} from '@gratuity/seo-utils';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Gratuity Calculator Abu Dhabi | Calculate End of Service Benefits 2026',
  description:
    'Calculate your gratuity in Abu Dhabi with our free MOHRE-compliant calculator. Accurate end of service calculations for Abu Dhabi mainland and free zones including ADGM, Masdar, KIZAD.',
  keywords: [
    'gratuity calculator abu dhabi',
    'abu dhabi gratuity calculation',
    'abu dhabi labor law gratuity',
    'end of service abu dhabi',
    'adgm gratuity',
    'masdar gratuity',
    'kizad gratuity',
  ],
};

const abuDhabiFAQs = [
  {
    question: 'How is gratuity calculated in Abu Dhabi?',
    answer:
      'Gratuity in Abu Dhabi is calculated based on UAE Federal Labor Law. You receive 21 days\' basic salary for each of the first 5 years and 30 days\' salary for each year after that. The maximum gratuity cannot exceed 2 years\' total salary.',
  },
  {
    question: 'Are gratuity rules different in Abu Dhabi Free Zones?',
    answer:
      'Most Abu Dhabi free zones follow standard UAE Labor Law. However, ADGM (Abu Dhabi Global Market) has its own employment regulations based on English common law, which may have different gratuity provisions.',
  },
  {
    question: 'How is gratuity calculated in ADGM?',
    answer:
      'ADGM follows its own Employment Regulations 2019. While similar to UAE Labor Law, ADGM has specific provisions. It\'s recommended to check your employment contract and ADGM regulations for exact calculations.',
  },
  {
    question: 'What is the gratuity for Al Ain employees?',
    answer:
      'Al Ain is part of Abu Dhabi Emirate, so employees in Al Ain follow the standard UAE Labor Law for gratuity calculations, same as Abu Dhabi city.',
  },
  {
    question: 'Where can I file a labor complaint in Abu Dhabi?',
    answer:
      'You can file labor complaints with MOHRE Abu Dhabi offices or through the MOHRE app. For ADGM employees, complaints are handled by ADGM Courts.',
  },
];

export default function AbuDhabiPage() {
  const breadcrumbs = [
    { name: 'Home', url: SITE_CONFIG.url },
    { name: 'Abu Dhabi', url: `${SITE_CONFIG.url}/abu-dhabi` },
  ];

  const schemas = combineSchemas([
    generateBreadcrumbSchema(breadcrumbs),
    generateLocalBusinessSchema({
      name: 'Gratuity Calculator Abu Dhabi',
      description: 'Free gratuity calculator for Abu Dhabi employees',
      address: {
        addressLocality: 'Abu Dhabi',
        addressRegion: 'Abu Dhabi',
        addressCountry: 'AE',
      },
      geo: {
        latitude: 24.4539,
        longitude: 54.3773,
      },
      url: `${SITE_CONFIG.url}/abu-dhabi`,
    }),
    generateFAQSchema(abuDhabiFAQs),
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
                Abu Dhabi
              </li>
            </ol>
          </nav>

          <h1>Gratuity Calculator Abu Dhabi</h1>
          <p className={styles.lead}>
            Calculate your end of service benefits in Abu Dhabi - for mainland and all free zones
            including ADGM, Masdar City, KIZAD, and more.
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
                <h3>Abu Dhabi Employment Overview</h3>
                <p>
                  Abu Dhabi is the capital of the UAE and a major economic center with diverse
                  employment opportunities across government, oil & gas, finance, and tourism sectors.
                </p>

                <div className={styles.infoBox}>
                  <h5>Key Facts</h5>
                  <ul>
                    <li>Capital city of the United Arab Emirates</li>
                    <li>ADGM has its own employment regulations</li>
                    <li>Multiple free zones including Masdar and KIZAD</li>
                    <li>Standard UAE Labor Law applies to mainland</li>
                  </ul>
                </div>

                <div className={`${styles.infoBox} mt-3`}>
                  <h5>MOHRE Abu Dhabi</h5>
                  <p className="mb-1">Ministry of Human Resources and Emiratisation</p>
                  <p className="mb-0 text-muted">
                    Multiple locations across Abu Dhabi. Use the MOHRE app for the nearest office.
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
          <h2 className="text-center mb-4">Abu Dhabi Areas</h2>
          <p className="text-center text-muted mb-4">
            All Abu Dhabi mainland areas follow the same gratuity calculation rules.
          </p>

          <div className="row g-3">
            {ABU_DHABI_AREAS.map((area) => (
              <div key={area.slug} className="col-lg-3 col-md-4 col-6">
                <Link href={`/abu-dhabi/${area.slug}`} className={styles.areaCard}>
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
          <h2 className="text-center mb-4">Abu Dhabi Free Zones</h2>
          <p className="text-center text-muted mb-4">
            Some free zones have special gratuity rules. Select your free zone for specific calculations.
          </p>

          <div className="row g-3">
            {ABU_DHABI_FREE_ZONES.map((zone) => (
              <div key={zone.slug} className="col-lg-3 col-md-4 col-6">
                <Link href={`/abu-dhabi/free-zones/${zone.slug}`} className={styles.freezoneCard}>
                  <span>{zone.name}</span>
                  {zone.code === 'adgm' && (
                    <span className={styles.specialBadge}>Special Rules</span>
                  )}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Landmarks Section */}
      <section className="section section-light">
        <div className="container">
          <h2 className="text-center mb-4">Abu Dhabi Landmarks</h2>
          <div className="row g-3 justify-content-center">
            {ABU_DHABI_LANDMARKS.map((landmark) => (
              <div key={landmark.slug} className="col-lg-2 col-md-3 col-4">
                <Link href={`/abu-dhabi/landmarks/${landmark.slug}`} className={styles.landmarkCard}>
                  <span>{landmark.name}</span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection
        faqs={abuDhabiFAQs}
        title="Abu Dhabi Gratuity FAQ"
        subtitle="Frequently asked questions about gratuity in Abu Dhabi"
      />

      {/* Related Emirates */}
      <section className="section section-light">
        <div className="container">
          <h2 className="text-center mb-4">Other Emirates</h2>
          <div className="row g-3 justify-content-center">
            <div className="col-auto">
              <Link href="/dubai" className="btn btn-outline-primary">Dubai</Link>
            </div>
            <div className="col-auto">
              <Link href="/sharjah" className="btn btn-outline-primary">Sharjah</Link>
            </div>
            <div className="col-auto">
              <Link href="/ajman" className="btn btn-outline-primary">Ajman</Link>
            </div>
            <div className="col-auto">
              <Link href="/ras-al-khaimah" className="btn btn-outline-primary">Ras Al Khaimah</Link>
            </div>
            <div className="col-auto">
              <Link href="/fujairah" className="btn btn-outline-primary">Fujairah</Link>
            </div>
            <div className="col-auto">
              <Link href="/umm-al-quwain" className="btn btn-outline-primary">Umm Al Quwain</Link>
            </div>
          </div>
        </div>
      </section>

    </>
  );
}
