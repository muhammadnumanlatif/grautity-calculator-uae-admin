import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import styles from './page.module.css';

const SHARJAH_FREE_ZONES = [
  {
    slug: 'saif',
    name: 'SAIF Zone',
    fullName: 'Sharjah Airport International Free Zone',
    description: 'SAIF Zone is one of the fastest-growing free zones in the UAE, located adjacent to Sharjah International Airport. It offers excellent logistics connectivity and business-friendly regulations.',
    gratuityRules: ['UAE Labour Law applies', '21 days per year (first 5 years)', '30 days per year (after 5 years)', 'Standard gratuity entitlements', 'Pro-rata calculations'],
    keyFeatures: ['Airport adjacent', 'Logistics hub', '100% foreign ownership', 'Tax benefits'],
    established: '1995',
    authority: 'SAIF Zone Authority',
    employees: '50,000+',
    companies: '8,000+'
  },
  {
    slug: 'hamriyah',
    name: 'Hamriyah Free Zone',
    fullName: 'Hamriyah Free Zone',
    description: 'Hamriyah Free Zone is a major industrial free zone with deep-water port access, ideal for manufacturing, oil & gas services, and heavy industries.',
    gratuityRules: ['Standard UAE Labour Law', '21/30 day formula', 'Industrial sector standards', 'Full gratuity after 1 year', 'Heavy industry provisions'],
    keyFeatures: ['Deep-water port', 'Heavy industries', 'Oil & gas services', 'Large land plots'],
    established: '1995',
    authority: 'Hamriyah Free Zone Authority',
    employees: '45,000+',
    companies: '6,500+'
  },
  {
    slug: 'shams',
    name: 'Shams',
    fullName: 'Sharjah Media City - Shams',
    description: 'Shams is Sharjah\'s media free zone, supporting creative industries including media, design, marketing, and technology companies with flexible licensing options.',
    gratuityRules: ['UAE Labour Law compliance', 'Standard 21/30 formula', 'Media industry contracts', 'Freelance provisions available', 'Full benefits after 1 year'],
    keyFeatures: ['Media & creative hub', 'Flexible licensing', 'Freelancer visas', 'Cost-effective'],
    established: '2017',
    authority: 'Shams Authority',
    employees: '15,000+',
    companies: '10,000+'
  },
  {
    slug: 'publishing-city',
    name: 'Publishing City',
    fullName: 'Sharjah Publishing City Free Zone',
    description: 'Sharjah Publishing City is the world\'s first free zone dedicated to publishing and printing, supporting the book industry and related creative services.',
    gratuityRules: ['UAE Labour Law applies', 'Standard gratuity formula', 'Publishing sector standards', '21/30 day calculation', 'Full entitlements'],
    keyFeatures: ['Publishing focused', 'Print facilities', 'Distribution hub', 'UNESCO heritage'],
    established: '2017',
    authority: 'Sharjah Book Authority',
    employees: '3,000+',
    companies: '500+'
  },
  {
    slug: 'srtp',
    name: 'SRTP',
    fullName: 'Sharjah Research Technology Park',
    description: 'SRTP supports technology, research, and innovation companies with links to academic institutions. It\'s ideal for tech startups and R&D operations.',
    gratuityRules: ['Standard UAE Labour Law', '21 days (first 5 years)', '30 days (after 5 years)', 'Tech sector standards', 'Research contracts'],
    keyFeatures: ['Tech & innovation hub', 'University links', 'R&D facilities', 'Startup support'],
    established: '2016',
    authority: 'SRTIP Authority',
    employees: '2,500+',
    companies: '300+'
  },
  {
    slug: 'aus',
    name: 'AUS Free Zone',
    fullName: 'American University of Sharjah Free Zone',
    description: 'AUS Free Zone is located within the American University of Sharjah campus, supporting education technology, training, and academic service companies.',
    gratuityRules: ['UAE Labour Law compliance', 'Education sector terms', 'Standard 21/30 formula', 'Academic contracts', 'Full gratuity rights'],
    keyFeatures: ['Academic environment', 'EdTech focus', 'Training services', 'Research collaboration'],
    established: '2018',
    authority: 'AUS',
    employees: '1,000+',
    companies: '100+'
  }
];

function getRelatedZones(currentSlug: string) {
  return SHARJAH_FREE_ZONES.filter(z => z.slug !== currentSlug);
}

interface PageProps {
  params: { zone: string };
}

export function generateMetadata({ params }: PageProps): Metadata {
  const zone = SHARJAH_FREE_ZONES.find(z => z.slug === params.zone);
  if (!zone) {
    return { title: 'Free Zone Not Found | Sharjah' };
  }
  return {
    title: `${zone.fullName} Gratuity Guide | UAE Labour Law 2026`,
    description: `Gratuity calculator and employment guide for ${zone.fullName}. ${zone.description.slice(0, 100)}...`,
    keywords: [`${zone.name} gratuity`, `${zone.fullName} employment`, 'sharjah free zone', 'uae gratuity calculator'],
  };
}

export default function SharjahFreeZonePage({ params }: PageProps) {
  const zone = SHARJAH_FREE_ZONES.find(z => z.slug === params.zone);
  if (!zone) notFound();

  const relatedZones = getRelatedZones(zone.slug);

  return (
    <>
      <section className={styles.pageHero}>
        <div className="container">
          <nav aria-label="breadcrumb" className="mb-3">
            <ol className={styles.breadcrumb}>
              <li><Link href="/">Home</Link></li>
              <li><Link href="/sharjah">Sharjah</Link></li>
              <li><Link href="/sharjah">Free Zones</Link></li>
              <li>{zone.name}</li>
            </ol>
          </nav>
          <h1>{zone.fullName}</h1>
          <p className={styles.lead}>Gratuity Calculator & Employment Guide</p>
          <div className={styles.heroBadges}>
            <span className={styles.heroBadge}>Est. {zone.established}</span>
            <span className={styles.heroBadge}>{zone.companies} Companies</span>
            <span className={styles.heroBadge}>{zone.employees} Employees</span>
          </div>
        </div>
      </section>

      <section className="py-5">
        <div className="container">
          <div className="row g-4">
            <div className="col-lg-8">
              <div className={styles.contentCard}>
                <h2>About {zone.name}</h2>
                <p>{zone.description}</p>
                <p>Governed by: <strong>{zone.authority}</strong></p>
              </div>

              <div className={styles.contentCard}>
                <h2>Gratuity Rules</h2>
                <ul className={styles.rulesList}>
                  {zone.gratuityRules.map((rule, i) => (
                    <li key={i}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="#28a745">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                      </svg>
                      {rule}
                    </li>
                  ))}
                </ul>
              </div>

              <div className={styles.contentCard}>
                <h2>Key Features</h2>
                <div className={styles.featuresGrid}>
                  {zone.keyFeatures.map((f, i) => (
                    <div key={i} className={styles.featureItem}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="#2e7d32">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      </svg>
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className={styles.ctaCard}>
                <h3>Calculate Your {zone.name} Gratuity</h3>
                <p>Use our calculator to estimate your end of service benefits.</p>
                <Link href="/#calculator" className="btn btn-primary btn-lg">Calculate Now</Link>
              </div>
            </div>

            <div className="col-lg-4">
              <div className={styles.sidebarCard}>
                <h3>Quick Facts</h3>
                <div className={styles.statsList}>
                  <div className={styles.statItem}>
                    <span className={styles.statLabel}>Established</span>
                    <span className={styles.statValue}>{zone.established}</span>
                  </div>
                  <div className={styles.statItem}>
                    <span className={styles.statLabel}>Authority</span>
                    <span className={styles.statValue}>{zone.authority}</span>
                  </div>
                  <div className={styles.statItem}>
                    <span className={styles.statLabel}>Companies</span>
                    <span className={styles.statValue}>{zone.companies}</span>
                  </div>
                  <div className={styles.statItem}>
                    <span className={styles.statLabel}>Employees</span>
                    <span className={styles.statValue}>{zone.employees}</span>
                  </div>
                </div>
              </div>

              <div className={styles.sidebarCard}>
                <h3>Other Sharjah Free Zones</h3>
                <div className={styles.relatedList}>
                  {relatedZones.map((r) => (
                    <Link key={r.slug} href={`/sharjah/free-zones/${r.slug}`} className={styles.relatedItem}>
                      <span>{r.name}</span>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
                      </svg>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
