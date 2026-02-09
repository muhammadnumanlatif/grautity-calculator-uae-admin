import { Metadata } from 'next';
import Link from 'next/link';
import GratuityCalculator from '@/components/calculator/GratuityCalculator';
import FAQSection from '@/components/sections/FAQSection';
import { SITE_CONFIG, DUBAI_AREAS, DUBAI_FREE_ZONES, DUBAI_LANDMARKS } from '@gratuity/shared';
import {
  generateBreadcrumbSchema,
  generateFAQSchema,
  generateLocalBusinessSchema,
  combineSchemas,
} from '@gratuity/seo-utils';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Gratuity Calculator Dubai | Calculate End of Service Benefits 2026',
  description:
    'Calculate your gratuity in Dubai with our free MOHRE-compliant calculator. Accurate end of service calculations for Dubai mainland and free zones including DIFC, JAFZA, DMCC.',
  keywords: [
    'gratuity calculator dubai',
    'dubai gratuity calculation',
    'dubai labor law gratuity',
    'end of service dubai',
    'difc gratuity',
    'jafza gratuity',
    'dmcc gratuity',
  ],
  alternates: {
    canonical: `${SITE_CONFIG.url}/dubai`,
  },
  robots: {
    index: true,
    follow: true,
  },
};

import { getLocationBySlug } from '@gratuity/firebase-config/firestore';
import type { Location } from '@gratuity/shared/types';

const defaultDubaiFAQs = [
  {
    question: 'How is gratuity calculated in Dubai?',
    answer:
      'Gratuity in Dubai is calculated based on UAE Federal Labor Law. You receive 21 days\' basic salary for each of the first 5 years and 30 days\' salary for each year after that. The maximum gratuity cannot exceed 2 years\' total salary.',
  },
  {
    question: 'Are gratuity rules different in Dubai Free Zones?',
    answer:
      'Most Dubai free zones follow standard UAE Labor Law. However, DIFC (Dubai International Financial Centre) has its own employment law with different gratuity calculations. JAFZA, DMCC, and other free zones generally follow UAE Labor Law.',
  },
  {
    question: 'How is gratuity calculated in DIFC?',
    answer:
      'DIFC follows its own Employment Law No. 2 of 2019. Gratuity is calculated at 21 days per year regardless of length of service, and there is no distinction between the first 5 years and subsequent years.',
  },
  {
    question: 'Can I use this calculator for Dubai Marina or Business Bay?',
    answer:
      'Yes, all areas within Dubai mainland (including Dubai Marina, Business Bay, Downtown, JLT, etc.) follow the standard UAE Labor Law for gratuity calculations.',
  },
  {
    question: 'Where can I file a labor complaint in Dubai?',
    answer:
      'You can file labor complaints with the Ministry of Human Resources and Emiratisation (MOHRE) through their office in Dubai or via the MOHRE mobile app. For DIFC employees, complaints go to the DIFC Courts.',
  },
];

export default async function DubaiPage() {
  const locationData = await getLocationBySlug<Location>('dubai', 'dubai');
  const dubaiFAQs = locationData?.faqs || defaultDubaiFAQs;

  const breadcrumbs = [
    { name: 'Home', url: SITE_CONFIG.url },
    { name: 'Dubai', url: `${SITE_CONFIG.url}/dubai` },
  ];

  const schemas = combineSchemas([
    generateBreadcrumbSchema(breadcrumbs),
    generateLocalBusinessSchema({
      name: 'Gratuity Calculator Dubai',
      description: locationData?.description || 'Free gratuity calculator for Dubai employees',
      address: {
        addressLocality: 'Dubai',
        addressRegion: 'Dubai',
        addressCountry: 'AE',
      },
      geo: {
        latitude: 25.2048,
        longitude: 55.2708,
      },
      url: `${SITE_CONFIG.url}/dubai`,
    }),
    generateFAQSchema(dubaiFAQs),
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
                Dubai
              </li>
            </ol>
          </nav>

          <h1>Gratuity Calculator Dubai</h1>
          <p className={styles.lead}>
            Calculate your end of service benefits in Dubai - for mainland and all free zones
            including DIFC, JAFZA, DMCC, and more.
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
                <h3>Dubai Employment Overview</h3>
                <p>
                  Dubai is the business hub of the UAE, home to thousands of companies across
                  various industries. Whether you work in Dubai mainland or one of its many
                  free zones, understanding your gratuity entitlements is important.
                </p>

                <div className={styles.infoBox}>
                  <h5>Key Facts</h5>
                  <ul>
                    <li>Dubai has 25+ free zones with varying regulations</li>
                    <li>DIFC has its own employment law</li>
                    <li>Most free zones follow UAE Labor Law</li>
                    <li>Gratuity is mandatory for employees completing 1+ year</li>
                  </ul>
                </div>

                <div className={`${styles.infoBox} mt-3`}>
                  <h5>MOHRE Dubai Office</h5>
                  <p className="mb-1">Ministry of Human Resources and Emiratisation</p>
                  <p className="mb-0 text-muted">
                    Multiple locations across Dubai. Use the MOHRE app for the nearest office.
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
          <h2 className="text-center mb-4">Dubai Areas</h2>
          <p className="text-center text-muted mb-4">
            All Dubai mainland areas follow the same gratuity calculation rules.
          </p>

          <div className="row g-3">
            {DUBAI_AREAS.map((area) => (
              <div key={area.slug} className="col-lg-3 col-md-4 col-6">
                <Link href={`/dubai/${area.slug}`} className={styles.areaCard}>
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
          <h2 className="text-center mb-4">Dubai Free Zones</h2>
          <p className="text-center text-muted mb-4">
            Some free zones have special gratuity rules. Select your free zone for specific calculations.
          </p>

          <div className="row g-3">
            {DUBAI_FREE_ZONES.map((zone) => (
              <div key={zone.slug} className="col-lg-3 col-md-4 col-6">
                <Link href={`/dubai/free-zones/${zone.slug}`} className={styles.freeZoneCard}>
                  <span>{zone.name}</span>
                  {zone.code === 'difc' && (
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
          <h2 className="text-center mb-4">Dubai Landmarks</h2>
          <p className="text-center text-muted mb-4">
            Working near these landmarks? Your gratuity follows UAE Labor Law.
          </p>

          <div className="row g-3 justify-content-center">
            {DUBAI_LANDMARKS.map((landmark) => (
              <div key={landmark.slug} className="col-lg-2 col-md-3 col-4">
                <Link href={`/dubai/landmarks/${landmark.slug}`} className={styles.landmarkCard}>
                  <span>{landmark.name}</span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection
        faqs={dubaiFAQs}
        title="Dubai Gratuity FAQ"
        subtitle="Frequently asked questions about gratuity in Dubai"
      />

      {/* Related Emirates */}
      <section className="section section-light">
        <div className="container">
          <h2 className="text-center mb-4">Other Emirates</h2>
          <div className="row g-3 justify-content-center">
            <div className="col-auto">
              <Link href="/abu-dhabi" className="btn btn-outline-primary">
                Abu Dhabi
              </Link>
            </div>
            <div className="col-auto">
              <Link href="/sharjah" className="btn btn-outline-primary">
                Sharjah
              </Link>
            </div>
            <div className="col-auto">
              <Link href="/ajman" className="btn btn-outline-primary">
                Ajman
              </Link>
            </div>
            <div className="col-auto">
              <Link href="/ras-al-khaimah" className="btn btn-outline-primary">
                Ras Al Khaimah
              </Link>
            </div>
            <div className="col-auto">
              <Link href="/fujairah" className="btn btn-outline-primary">
                Fujairah
              </Link>
            </div>
            <div className="col-auto">
              <Link href="/umm-al-quwain" className="btn btn-outline-primary">
                Umm Al Quwain
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
