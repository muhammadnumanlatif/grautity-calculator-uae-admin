import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import GratuityCalculator from '@/components/calculator/GratuityCalculator';
import FAQSection from '@/components/sections/FAQSection';
import { SITE_CONFIG, DUBAI_AREAS, DUBAI_FREE_ZONES } from '@gratuity/shared';
import {
  generateBreadcrumbSchema,
  generateFAQSchema,
  generateLocalBusinessSchema,
  combineSchemas,
} from '@gratuity/seo-utils';
import styles from './page.module.css';

// Generate static params for all Dubai areas
export async function generateStaticParams() {
  return DUBAI_AREAS.map((area) => ({
    area: area.slug,
  }));
}

// Get area data by slug
function getAreaData(slug: string) {
  return DUBAI_AREAS.find((area) => area.slug === slug);
}

// Generate metadata for each area
export async function generateMetadata({
  params,
}: {
  params: Promise<{ area: string }>;
}): Promise<Metadata> {
  const { area } = await params;
  const areaData = getAreaData(area);

  if (!areaData) {
    return {
      title: 'Area Not Found',
    };
  }

  const title = `Gratuity Calculator ${areaData.name}, Dubai | End of Service 2026`;
  const description = `Calculate your gratuity in ${areaData.name}, Dubai with our free MOHRE-compliant calculator. Accurate end of service calculations for employees in ${areaData.name}.`;

  return {
    title,
    description,
    keywords: [
      `gratuity calculator ${areaData.name.toLowerCase()}`,
      `${areaData.name.toLowerCase()} dubai gratuity`,
      `end of service ${areaData.name.toLowerCase()}`,
      'dubai labor law gratuity',
      'gratuity calculation dubai 2026',
    ],
    openGraph: {
      title,
      description,
      url: `${SITE_CONFIG.url}/dubai/${area}`,
    },
  };
}

// Area-specific descriptions
const areaDescriptions: Record<string, string> = {
  downtown: 'Downtown Dubai is home to the iconic Burj Khalifa and Dubai Mall. The area hosts numerous corporate offices, hotels, and businesses, making it one of the major employment hubs in Dubai.',
  marina: 'Dubai Marina is a vibrant waterfront community with countless restaurants, hotels, and corporate offices. Many professionals in hospitality, real estate, and finance work in this area.',
  'business-bay': 'Business Bay is Dubai\'s commercial hub, featuring hundreds of office towers and businesses. It\'s one of the fastest-growing business districts in the UAE.',
  jumeirah: 'Jumeirah is an upscale residential area known for luxury hotels and beachfront properties. Many hospitality and service industry professionals work here.',
  deira: 'Deira is one of Dubai\'s oldest commercial districts, known for its traditional souks and trading businesses. Many wholesale, retail, and trading companies are based here.',
  'bur-dubai': 'Bur Dubai is a historic area with a mix of old and new businesses. It\'s home to textile shops, restaurants, and various service industries.',
  'al-barsha': 'Al Barsha is a mixed-use district home to Mall of the Emirates and numerous businesses. It has a diverse workforce across retail, hospitality, and services.',
  jlt: 'Jumeirah Lake Towers (JLT) is a large mixed-use development with residential and commercial towers. Many SMEs and startups operate from this free zone cluster.',
  difc: 'DIFC (Dubai International Financial Centre) has its own employment law. While technically a free zone, workers in this area follow DIFC Employment Law regulations.',
  'palm-jumeirah': 'Palm Jumeirah is an iconic man-made island with luxury hotels and residences. The hospitality sector is the primary employer in this area.',
  jbr: 'Jumeirah Beach Residence (JBR) is a beachfront community with hotels, restaurants, and retail. Tourism and hospitality are the main employment sectors.',
  'al-quoz': 'Al Quoz is an industrial area that has transformed into a creative hub with galleries and design studios. It hosts manufacturing, logistics, and creative industries.',
  'al-karama': 'Al Karama is a popular residential and commercial area known for shopping and dining. Retail and service industries are the main employers.',
  satwa: 'Satwa is a traditional neighborhood with shops, restaurants, and small businesses. Many workers in retail and food services are employed here.',
  mirdif: 'Mirdif is a family-oriented residential area with City Centre Mirdif mall. Retail, education, and healthcare are primary employment sectors.',
  'dubai-hills': 'Dubai Hills Estate is a newer master-planned community with Dubai Hills Mall. The area has growing employment in retail, healthcare, and education.',
  'arabian-ranches': 'Arabian Ranches is a residential community with schools and retail centers. Education and community services are key employers.',
  'silicon-oasis': 'Dubai Silicon Oasis is a tech-focused free zone with many IT and electronics companies. It follows UAE Labor Law despite being a free zone.',
  'international-city': 'International City is an affordable residential area with small businesses and retail. Many workers in logistics and retail are based here.',
  'discovery-gardens': 'Discovery Gardens is a residential community with local shops and services. Service industry workers frequently reside and work in this area.',
  'sports-city': 'Dubai Sports City hosts sports facilities, academies, and related businesses. Sports, events, and hospitality are key employment sectors.',
  'motor-city': 'Motor City is home to the Dubai Autodrome and automotive businesses. Events, sports, and automotive industries are the main employers.',
  'al-nahda': 'Al Nahda Dubai borders Sharjah and has a mix of residential and commercial properties. Many cross-border commuters work in this area.',
  'oud-metha': 'Oud Metha is a diverse district with hospitals, schools, and businesses. Healthcare and education are major employment sectors.',
  garhoud: 'Garhoud is located near Dubai Airport with many aviation, logistics, and hospitality businesses. The area is a major employment hub for airport-related services.',
};

// Generate FAQs for each area
function generateAreaFAQs(areaName: string) {
  return [
    {
      question: `How is gratuity calculated in ${areaName}, Dubai?`,
      answer: `Gratuity in ${areaName} follows the standard UAE Labor Law. You receive 21 days' basic salary for each of the first 5 years and 30 days' salary for each year after that. The maximum gratuity cannot exceed 2 years' total salary.`,
    },
    {
      question: `Do employees in ${areaName} get the same gratuity as other Dubai areas?`,
      answer: `Yes, ${areaName} is part of Dubai mainland, so all employees follow the same UAE Labor Law gratuity calculations. There are no special rules specific to this area.`,
    },
    {
      question: `What if I work for a company registered in a free zone but my office is in ${areaName}?`,
      answer: `Your gratuity calculation depends on where your company is registered, not where you physically work. If your company is registered in a free zone like DIFC or JAFZA, those rules apply even if your office is in ${areaName}.`,
    },
    {
      question: `How do I file a labor complaint if I work in ${areaName}?`,
      answer: `You can file a labor complaint with MOHRE through their mobile app, website, or by visiting any MOHRE service center in Dubai. The same process applies for all Dubai mainland areas including ${areaName}.`,
    },
    {
      question: `Is there a minimum service period to receive gratuity in ${areaName}?`,
      answer: `Yes, you need to complete at least one year of continuous service to be eligible for gratuity. This applies to all Dubai mainland areas including ${areaName}.`,
    },
  ];
}

import { getLocationBySlug } from '@gratuity/firebase-config/firestore';
import type { Location } from '@gratuity/shared/types';

export default async function DubaiAreaPage({
  params,
}: {
  params: Promise<{ area: string }>;
}) {
  const { area } = await params;
  const areaData = getAreaData(area);

  if (!areaData) {
    notFound();
  }

  const locationData = await getLocationBySlug<Location>(area, 'dubai');
  const faqs = locationData?.faqs || generateAreaFAQs(areaData.name);
  const description = locationData?.description || areaDescriptions[area] || `${areaData.name} is a district in Dubai. Workers in this area follow standard UAE Labor Law for gratuity calculations.`;

  const breadcrumbs = [
    { name: 'Home', url: SITE_CONFIG.url },
    { name: 'Dubai', url: `${SITE_CONFIG.url}/dubai` },
    { name: areaData.name, url: `${SITE_CONFIG.url}/dubai/${area}` },
  ];

  const schemas = combineSchemas([
    generateBreadcrumbSchema(breadcrumbs),
    generateLocalBusinessSchema({
      name: `Gratuity Calculator ${areaData.name}`,
      description: `Free gratuity calculator for ${areaData.name}, Dubai employees`,
      address: {
        addressLocality: areaData.name,
        addressRegion: 'Dubai',
        addressCountry: 'AE',
      },
      geo: {
        latitude: 25.2048,
        longitude: 55.2708,
      },
      url: `${SITE_CONFIG.url}/dubai/${area}`,
    }),
    generateFAQSchema(faqs),
  ]);

  // Get nearby areas (excluding current area)
  const nearbyAreas = DUBAI_AREAS.filter((a) => a.slug !== area).slice(0, 6);

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
              <li className="breadcrumb-item">
                <Link href="/dubai">Dubai</Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                {areaData.name}
              </li>
            </ol>
          </nav>

          <h1>Gratuity Calculator {areaData.name}, Dubai</h1>
          <p className={styles.lead}>
            Calculate your end of service benefits if you work in {areaData.name}, Dubai.
            100% free and MOHRE compliant.
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
                <h3>About {areaData.name}</h3>
                <p>{description}</p>

                <div className={styles.infoBox}>
                  <h5>Gratuity Rules</h5>
                  <ul>
                    <li>Follows UAE Federal Labor Law</li>
                    <li>21 days salary per year (first 5 years)</li>
                    <li>30 days salary per year (after 5 years)</li>
                    <li>Maximum: 2 years&apos; total salary</li>
                    <li>Minimum: 1 year of service required</li>
                  </ul>
                </div>

                <div className={`${styles.infoBox} mt-3`}>
                  <h5>Important Note</h5>
                  <p className="mb-0 text-muted">
                    If your employer is registered in a Dubai free zone (like DIFC, JAFZA, or DMCC),
                    different rules may apply regardless of your office location in {areaData.name}.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Nearby Areas Section */}
      <section className="section section-light">
        <div className="container">
          <h2 className="text-center mb-4">Other Dubai Areas</h2>
          <p className="text-center text-muted mb-4">
            All Dubai mainland areas follow the same gratuity calculation rules.
          </p>

          <div className="row g-3">
            {nearbyAreas.map((nearbyArea) => (
              <div key={nearbyArea.slug} className="col-lg-4 col-md-6">
                <Link href={`/dubai/${nearbyArea.slug}`} className={styles.areaCard}>
                  <span>{nearbyArea.name}</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="9,18 15,12 9,6" />
                  </svg>
                </Link>
              </div>
            ))}
          </div>

          <div className="text-center mt-4">
            <Link href="/dubai" className="btn btn-outline-primary">
              View All Dubai Areas
            </Link>
          </div>
        </div>
      </section>

      {/* Free Zones Section */}
      <section className="section">
        <div className="container">
          <h2 className="text-center mb-4">Dubai Free Zones</h2>
          <p className="text-center text-muted mb-4">
            If your employer is registered in a free zone, select it for accurate calculations.
          </p>

          <div className="row g-3 justify-content-center">
            {DUBAI_FREE_ZONES.slice(0, 8).map((zone) => (
              <div key={zone.slug} className="col-lg-3 col-md-4 col-6">
                <Link href={`/dubai/free-zones/${zone.slug}`} className={styles.freeZoneCard}>
                  <span>{zone.name.split(' - ')[0]}</span>
                  {zone.code === 'difc' && (
                    <span className={styles.specialBadge}>Special Rules</span>
                  )}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection
        faqs={faqs}
        title={`${areaData.name} Gratuity FAQ`}
        subtitle={`Frequently asked questions about gratuity in ${areaData.name}, Dubai`}
      />

      {/* CTA Section */}
      <section className="section section-dark">
        <div className="container text-center">
          <h2 className="mb-4">Need Help with Your Gratuity?</h2>
          <p className="lead mb-4">
            Use our calculator above or contact MOHRE for official guidance.
          </p>
          <div className="d-flex gap-3 justify-content-center flex-wrap">
            <a href="tel:80060" className="btn btn-secondary btn-lg">
              Call MOHRE: 800-60
            </a>
            <Link href="/#calculator" className="btn btn-outline-light btn-lg">
              Calculate Now
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
