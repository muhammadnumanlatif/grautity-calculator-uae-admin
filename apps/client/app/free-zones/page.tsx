import { Metadata } from 'next';
import Link from 'next/link';
import { SITE_CONFIG } from '@gratuity/shared';
import {
  generateBreadcrumbSchema,
  generateFAQSchema,
  combineSchemas,
} from '@gratuity/seo-utils';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'UAE Free Zones Gratuity Calculator | DIFC, ADGM, JAFZA, DMCC 2026',
  description:
    'Calculate gratuity for all UAE free zones. Understand gratuity rules for DIFC, ADGM, JAFZA, DMCC, SAIF Zone, Hamriyah, and 40+ other free zones.',
  keywords: [
    'uae free zone gratuity',
    'difc gratuity calculator',
    'adgm gratuity',
    'jafza gratuity',
    'dmcc gratuity',
    'free zone end of service',
  ],
};

const FREE_ZONES = [
  {
    slug: 'difc',
    name: 'DIFC',
    fullName: 'Dubai International Financial Centre',
    emirate: 'Dubai',
    hasSpecialRules: true,
    description: 'DIFC has its own employment law with different gratuity calculations.',
  },
  {
    slug: 'adgm',
    name: 'ADGM',
    fullName: 'Abu Dhabi Global Market',
    emirate: 'Abu Dhabi',
    hasSpecialRules: true,
    description: 'ADGM follows its own employment regulations for financial services.',
  },
  {
    slug: 'jafza',
    name: 'JAFZA',
    fullName: 'Jebel Ali Free Zone',
    emirate: 'Dubai',
    hasSpecialRules: false,
    description: 'One of the largest free zones in the world, following UAE Labor Law.',
  },
  {
    slug: 'dmcc',
    name: 'DMCC',
    fullName: 'Dubai Multi Commodities Centre',
    emirate: 'Dubai',
    hasSpecialRules: false,
    description: 'Award-winning free zone for commodities trading.',
  },
  {
    slug: 'saif-zone',
    name: 'SAIF Zone',
    fullName: 'Sharjah Airport International Free Zone',
    emirate: 'Sharjah',
    hasSpecialRules: false,
    description: 'Strategic free zone near Sharjah International Airport.',
  },
  {
    slug: 'hamriyah',
    name: 'Hamriyah Free Zone',
    fullName: 'Hamriyah Free Zone Authority',
    emirate: 'Sharjah',
    hasSpecialRules: false,
    description: 'Industrial free zone with port facilities.',
  },
  {
    slug: 'dafza',
    name: 'DAFZA',
    fullName: 'Dubai Airport Free Zone',
    emirate: 'Dubai',
    hasSpecialRules: false,
    description: 'Free zone connected to Dubai International Airport.',
  },
  {
    slug: 'dso',
    name: 'DSO',
    fullName: 'Dubai Silicon Oasis',
    emirate: 'Dubai',
    hasSpecialRules: false,
    description: 'Technology park and free zone for tech companies.',
  },
  {
    slug: 'tecom',
    name: 'TECOM',
    fullName: 'Dubai Internet City & Media City',
    emirate: 'Dubai',
    hasSpecialRules: false,
    description: 'Hub for technology, media, and creative industries.',
  },
  {
    slug: 'rak-ftz',
    name: 'RAK FTZ',
    fullName: 'Ras Al Khaimah Free Trade Zone',
    emirate: 'Ras Al Khaimah',
    hasSpecialRules: false,
    description: 'Cost-effective free zone in Ras Al Khaimah.',
  },
  {
    slug: 'ajman-free-zone',
    name: 'Ajman Free Zone',
    fullName: 'Ajman Free Zone Authority',
    emirate: 'Ajman',
    hasSpecialRules: false,
    description: 'Affordable free zone for SMEs.',
  },
  {
    slug: 'fujairah-free-zone',
    name: 'Fujairah Free Zone',
    fullName: 'Fujairah Free Zone Authority',
    emirate: 'Fujairah',
    hasSpecialRules: false,
    description: 'Free zone on the east coast with port access.',
  },
];

const freeZoneFAQs = [
  {
    question: 'Do UAE free zones have different gratuity rules?',
    answer:
      'Most UAE free zones follow the standard UAE Labor Law for gratuity calculations. However, DIFC and ADGM have their own employment laws with different gratuity rules.',
  },
  {
    question: 'How is gratuity calculated in DIFC?',
    answer:
      'DIFC follows Employment Law No. 2 of 2019. Gratuity is calculated at 21 days per year regardless of service length, without the distinction between first 5 years and subsequent years.',
  },
  {
    question: 'Does ADGM have special gratuity rules?',
    answer:
      'Yes, ADGM has its own employment regulations. Gratuity calculation may differ from UAE Labor Law. Check your employment contract for specific terms.',
  },
  {
    question: 'What is the minimum service for gratuity in free zones?',
    answer:
      'In most free zones following UAE Labor Law, you need to complete at least 1 year of continuous service. DIFC requires 1 year of service as well.',
  },
];

export default function FreeZonesPage() {
  const breadcrumbs = [
    { name: 'Home', url: SITE_CONFIG.url },
    { name: 'Free Zones', url: `${SITE_CONFIG.url}/free-zones` },
  ];

  const schemas = combineSchemas([
    generateBreadcrumbSchema(breadcrumbs),
    generateFAQSchema(freeZoneFAQs),
  ]);

  const dubaiZones = FREE_ZONES.filter(z => z.emirate === 'Dubai');
  const abuDhabiZones = FREE_ZONES.filter(z => z.emirate === 'Abu Dhabi');
  const otherZones = FREE_ZONES.filter(z => !['Dubai', 'Abu Dhabi'].includes(z.emirate));

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
              <li className="breadcrumb-item active" aria-current="page">Free Zones</li>
            </ol>
          </nav>

          <h1>UAE Free Zones Gratuity Guide</h1>
          <p className={styles.lead}>
            Calculate your end of service benefits across all UAE free zones.
            Understand which zones follow UAE Labor Law and which have special rules.
          </p>
        </div>
      </section>

      {/* Overview Section */}
      <section className="section">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <h2>Understanding Free Zone Gratuity</h2>
              <p>
                The UAE has over 40 free zones, each offering unique benefits for businesses.
                When it comes to gratuity (end of service benefits), most free zones follow
                the standard UAE Federal Labor Law. However, some financial free zones like
                DIFC and ADGM have their own employment regulations.
              </p>

              <div className={styles.ruleComparison}>
                <div className={styles.ruleCard}>
                  <h4>Standard UAE Labor Law</h4>
                  <p>Applies to most free zones</p>
                  <ul>
                    <li>21 days salary for first 5 years</li>
                    <li>30 days salary after 5 years</li>
                    <li>Maximum 2 years&apos; total salary</li>
                  </ul>
                </div>
                <div className={`${styles.ruleCard} ${styles.special}`}>
                  <h4>DIFC Employment Law</h4>
                  <p>Special rules apply</p>
                  <ul>
                    <li>21 days salary per year</li>
                    <li>Same rate for all years</li>
                    <li>Different calculation method</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className={styles.ctaBox}>
                <h4>Calculate Your Gratuity</h4>
                <p>Use our calculator to estimate your end of service benefits.</p>
                <Link href="/#calculator" className="btn btn-primary btn-lg w-100">
                  Calculate Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dubai Free Zones */}
      <section className="section section-light">
        <div className="container">
          <h2 className="text-center mb-4">Dubai Free Zones</h2>
          <div className="row g-4">
            {dubaiZones.map((zone) => (
              <div key={zone.slug} className="col-lg-4 col-md-6">
                <Link href={`/free-zones/${zone.slug}`} className={styles.zoneCard}>
                  <div className={styles.zoneHeader}>
                    <h3>{zone.name}</h3>
                    {zone.hasSpecialRules && (
                      <span className={styles.specialBadge}>Special Rules</span>
                    )}
                  </div>
                  <p className={styles.zoneFull}>{zone.fullName}</p>
                  <p className={styles.zoneDesc}>{zone.description}</p>
                  <span className={styles.learnMore}>Learn more →</span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Abu Dhabi Free Zones */}
      <section className="section">
        <div className="container">
          <h2 className="text-center mb-4">Abu Dhabi Free Zones</h2>
          <div className="row g-4 justify-content-center">
            {abuDhabiZones.map((zone) => (
              <div key={zone.slug} className="col-lg-4 col-md-6">
                <Link href={`/free-zones/${zone.slug}`} className={styles.zoneCard}>
                  <div className={styles.zoneHeader}>
                    <h3>{zone.name}</h3>
                    {zone.hasSpecialRules && (
                      <span className={styles.specialBadge}>Special Rules</span>
                    )}
                  </div>
                  <p className={styles.zoneFull}>{zone.fullName}</p>
                  <p className={styles.zoneDesc}>{zone.description}</p>
                  <span className={styles.learnMore}>Learn more →</span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Other Emirates Free Zones */}
      <section className="section section-light">
        <div className="container">
          <h2 className="text-center mb-4">Other Emirates Free Zones</h2>
          <div className="row g-4">
            {otherZones.map((zone) => (
              <div key={zone.slug} className="col-lg-4 col-md-6">
                <Link href={`/free-zones/${zone.slug}`} className={styles.zoneCard}>
                  <div className={styles.zoneHeader}>
                    <h3>{zone.name}</h3>
                    <span className={styles.emirateBadge}>{zone.emirate}</span>
                  </div>
                  <p className={styles.zoneFull}>{zone.fullName}</p>
                  <p className={styles.zoneDesc}>{zone.description}</p>
                  <span className={styles.learnMore}>Learn more →</span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section">
        <div className="container">
          <h2 className="text-center mb-4">Free Zone Gratuity FAQ</h2>
          <div className="row justify-content-center">
            <div className="col-lg-8">
              {freeZoneFAQs.map((faq, index) => (
                <div key={index} className={styles.faqItem}>
                  <h4>{faq.question}</h4>
                  <p>{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section section-light">
        <div className="container text-center">
          <h2>Not Sure Which Rules Apply?</h2>
          <p className="lead mb-4">
            Check your employment contract or contact your HR department to confirm which
            labor law applies to your employment.
          </p>
          <div className="row g-3 justify-content-center">
            <div className="col-auto">
              <Link href="/#calculator" className="btn btn-primary btn-lg">
                Calculate Gratuity
              </Link>
            </div>
            <div className="col-auto">
              <Link href="/faq" className="btn btn-outline-primary btn-lg">
                View All FAQs
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
