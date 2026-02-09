import { Metadata } from 'next';
import Link from 'next/link';
import GratuityCalculator from '@/components/calculator/GratuityCalculator';
import FAQSection from '@/components/sections/FAQSection';
import { SITE_CONFIG, UAQ_AREAS, UAQ_FREE_ZONES } from '@gratuity/shared';
import {
  generateBreadcrumbSchema,
  generateFAQSchema,
  generateLocalBusinessSchema,
  combineSchemas,
} from '@gratuity/seo-utils';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Gratuity Calculator UAQ | Umm Al Quwain End of Service 2026',
  description:
    'Calculate your gratuity in Umm Al Quwain with our free MOHRE-compliant calculator. Accurate end of service calculations for UAQ mainland and UAQ Free Trade Zone.',
  keywords: [
    'gratuity calculator uaq',
    'umm al quwain gratuity calculation',
    'uaq labor law gratuity',
    'end of service uaq',
    'uaq free zone gratuity',
  ],
};

const uaqFAQs = [
  {
    question: 'How is gratuity calculated in Umm Al Quwain?',
    answer:
      'Gratuity in Umm Al Quwain is calculated based on UAE Federal Labor Law. You receive 21 days\' basic salary for each of the first 5 years and 30 days\' salary for each year after that. The maximum gratuity cannot exceed 2 years\' total salary.',
  },
  {
    question: 'Does UAQ Free Zone have different gratuity rules?',
    answer:
      'Umm Al Quwain Free Trade Zone generally follows the standard UAE Labor Law for gratuity calculations. Always verify with your employer and check your employment contract.',
  },
  {
    question: 'What industries are common in Umm Al Quwain?',
    answer:
      'UAQ has a growing tourism sector with attractions like Dreamland Aqua Park, along with fishing, agriculture, and small manufacturing industries.',
  },
  {
    question: 'Is UAQ a good place for business setup?',
    answer:
      'UAQ offers one of the most affordable business setup options in the UAE, making it attractive for small businesses and startups.',
  },
];

export default function UmmAlQuwainPage() {
  const breadcrumbs = [
    { name: 'Home', url: SITE_CONFIG.url },
    { name: 'Umm Al Quwain', url: `${SITE_CONFIG.url}/umm-al-quwain` },
  ];

  const schemas = combineSchemas([
    generateBreadcrumbSchema(breadcrumbs),
    generateLocalBusinessSchema({
      name: 'Gratuity Calculator Umm Al Quwain',
      description: 'Free gratuity calculator for UAQ employees',
      address: {
        addressLocality: 'Umm Al Quwain',
        addressRegion: 'Umm Al Quwain',
        addressCountry: 'AE',
      },
      geo: {
        latitude: 25.5647,
        longitude: 55.5553,
      },
      url: `${SITE_CONFIG.url}/umm-al-quwain`,
    }),
    generateFAQSchema(uaqFAQs),
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
              <li className="breadcrumb-item active" aria-current="page">Umm Al Quwain</li>
            </ol>
          </nav>

          <h1>Gratuity Calculator Umm Al Quwain (UAQ)</h1>
          <p className={styles.lead}>
            Calculate your end of service benefits in UAQ - for mainland and UAQ Free Trade Zone.
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
                <h3>UAQ Employment Overview</h3>
                <p>
                  Umm Al Quwain is the second smallest emirate and offers a quieter lifestyle
                  with affordable living and business setup costs.
                </p>

                <div className={styles.infoBox}>
                  <h5>Key Facts</h5>
                  <ul>
                    <li>Second smallest emirate by population</li>
                    <li>Affordable business licensing</li>
                    <li>Home to Dreamland Aqua Park</li>
                    <li>Growing tourism and fishing industry</li>
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
          <h2 className="text-center mb-4">UAQ Areas</h2>
          <div className="row g-3 justify-content-center">
            {UAQ_AREAS.map((area) => (
              <div key={area.slug} className="col-lg-3 col-md-4 col-6">
                <Link href={`/umm-al-quwain/${area.slug}`} className={styles.areaCard}>
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
          <h2 className="text-center mb-4">UAQ Free Zones</h2>
          <div className="row g-3 justify-content-center">
            {UAQ_FREE_ZONES.map((zone) => (
              <div key={zone.slug} className="col-lg-4 col-md-6">
                <Link href={`/umm-al-quwain/free-zones/${zone.slug}`} className={styles.freezoneCard}>
                  <span>{zone.name}</span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection faqs={uaqFAQs} title="UAQ Gratuity FAQ" />

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
            <div className="col-auto"><Link href="/fujairah" className="btn btn-outline-primary">Fujairah</Link></div>
          </div>
        </div>
      </section>

    </>
  );
}
