import { Metadata } from 'next';
import Link from 'next/link';
import GratuityCalculator from '@/components/calculator/GratuityCalculator';
import FAQSection from '@/components/sections/FAQSection';
import { SITE_CONFIG, RAK_AREAS, RAK_FREE_ZONES } from '@gratuity/shared';
import {
  generateBreadcrumbSchema,
  generateFAQSchema,
  generateLocalBusinessSchema,
  combineSchemas,
} from '@gratuity/seo-utils';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Gratuity Calculator RAK | Ras Al Khaimah End of Service 2026',
  description:
    'Calculate your gratuity in Ras Al Khaimah with our free MOHRE-compliant calculator. Accurate end of service calculations for RAK mainland and RAK Free Trade Zone.',
  keywords: [
    'gratuity calculator rak',
    'ras al khaimah gratuity calculation',
    'rak labor law gratuity',
    'end of service rak',
    'rak free zone gratuity',
    'rakez gratuity',
  ],
};

const rakFAQs = [
  {
    question: 'How is gratuity calculated in Ras Al Khaimah?',
    answer:
      'Gratuity in Ras Al Khaimah is calculated based on UAE Federal Labor Law. You receive 21 days\' basic salary for each of the first 5 years and 30 days\' salary for each year after that. The maximum gratuity cannot exceed 2 years\' total salary.',
  },
  {
    question: 'Does RAK Free Zone have different gratuity rules?',
    answer:
      'RAK Free Trade Zone (RAKFTZ) and RAKEZ generally follow the standard UAE Labor Law for gratuity calculations. Always verify with your employer and check your employment contract.',
  },
  {
    question: 'Is RAK a good place to work in UAE?',
    answer:
      'RAK offers a lower cost of living compared to Dubai and Abu Dhabi, with growing tourism and industrial sectors. It has become popular for business setup due to affordable licensing.',
  },
  {
    question: 'Where can I file a labor complaint in RAK?',
    answer:
      'You can file labor complaints with MOHRE RAK office or through the MOHRE mobile app. The toll-free number 800 60 is also available.',
  },
];

export default function RasAlKhaimahPage() {
  const breadcrumbs = [
    { name: 'Home', url: SITE_CONFIG.url },
    { name: 'Ras Al Khaimah', url: `${SITE_CONFIG.url}/ras-al-khaimah` },
  ];

  const schemas = combineSchemas([
    generateBreadcrumbSchema(breadcrumbs),
    generateLocalBusinessSchema({
      name: 'Gratuity Calculator Ras Al Khaimah',
      description: 'Free gratuity calculator for RAK employees',
      address: {
        addressLocality: 'Ras Al Khaimah',
        addressRegion: 'Ras Al Khaimah',
        addressCountry: 'AE',
      },
      geo: {
        latitude: 25.7895,
        longitude: 55.9432,
      },
      url: `${SITE_CONFIG.url}/ras-al-khaimah`,
    }),
    generateFAQSchema(rakFAQs),
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
              <li className="breadcrumb-item active" aria-current="page">Ras Al Khaimah</li>
            </ol>
          </nav>

          <h1>Gratuity Calculator Ras Al Khaimah (RAK)</h1>
          <p className={styles.lead}>
            Calculate your end of service benefits in RAK - for mainland and RAK Free Trade Zone.
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
                <h3>RAK Employment Overview</h3>
                <p>
                  Ras Al Khaimah is the northernmost emirate with a growing tourism and
                  industrial sector. It offers affordable business setup through RAKEZ.
                </p>

                <div className={styles.infoBox}>
                  <h5>Key Facts</h5>
                  <ul>
                    <li>Northernmost emirate of UAE</li>
                    <li>Home to Jebel Jais (UAE&apos;s highest peak)</li>
                    <li>RAKEZ - popular free zone authority</li>
                    <li>Growing tourism and manufacturing</li>
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
          <h2 className="text-center mb-4">RAK Areas</h2>
          <div className="row g-3">
            {RAK_AREAS.map((area) => (
              <div key={area.slug} className="col-lg-3 col-md-4 col-6">
                <Link href={`/ras-al-khaimah/${area.slug}`} className={styles.areaCard}>
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
          <h2 className="text-center mb-4">RAK Free Zones</h2>
          <div className="row g-3 justify-content-center">
            {RAK_FREE_ZONES.map((zone) => (
              <div key={zone.slug} className="col-lg-4 col-md-6">
                <Link href={`/ras-al-khaimah/free-zones/${zone.slug}`} className={styles.freezoneCard}>
                  <span>{zone.name}</span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection faqs={rakFAQs} title="RAK Gratuity FAQ" />

      {/* Related Emirates */}
      <section className="section section-light">
        <div className="container">
          <h2 className="text-center mb-4">Other Emirates</h2>
          <div className="row g-3 justify-content-center">
            <div className="col-auto"><Link href="/dubai" className="btn btn-outline-primary">Dubai</Link></div>
            <div className="col-auto"><Link href="/abu-dhabi" className="btn btn-outline-primary">Abu Dhabi</Link></div>
            <div className="col-auto"><Link href="/sharjah" className="btn btn-outline-primary">Sharjah</Link></div>
            <div className="col-auto"><Link href="/ajman" className="btn btn-outline-primary">Ajman</Link></div>
            <div className="col-auto"><Link href="/fujairah" className="btn btn-outline-primary">Fujairah</Link></div>
            <div className="col-auto"><Link href="/umm-al-quwain" className="btn btn-outline-primary">Umm Al Quwain</Link></div>
          </div>
        </div>
      </section>

    </>
  );
}
