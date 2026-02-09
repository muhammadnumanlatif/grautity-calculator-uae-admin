import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import styles from './page.module.css';

const UAQ_FREE_ZONES = [
  {
    slug: 'uaq-ftz',
    name: 'UAQ FTZ',
    fullName: 'Umm Al Quwain Free Trade Zone',
    description: 'Umm Al Quwain Free Trade Zone is strategically located near the emirate\'s port and offers competitive business setup packages. It caters to trading, manufacturing, and service companies looking for cost-effective operations.',
    gratuityRules: ['UAE Labour Law applies', '21 days per year (first 5 years)', '30 days per year (after 5 years)', 'Standard gratuity entitlements', 'Pro-rata calculations'],
    keyFeatures: ['Cost-effective setup', 'Port proximity', '100% foreign ownership', 'No currency restrictions'],
    established: '1988',
    authority: 'UAQ FTZ Authority',
    employees: '8,000+',
    companies: '1,500+'
  },
  {
    slug: 'abrfz',
    name: 'ABRFZ',
    fullName: 'Ahmed Bin Rashid Free Zone',
    description: 'Ahmed Bin Rashid Free Zone is a modern free zone in Umm Al Quwain offering flexible business solutions for SMEs and entrepreneurs. It provides quick setup, affordable packages, and comprehensive support services.',
    gratuityRules: ['Standard UAE Labour Law', '21 days (first 5 years)', '30 days (after 5 years)', 'All sector standards apply', 'Full gratuity rights'],
    keyFeatures: ['SME friendly', 'Quick licensing', 'Affordable packages', 'Business support'],
    established: '2010',
    authority: 'ABRFZ Authority',
    employees: '5,000+',
    companies: '3,000+'
  }
];

function getRelatedZones(currentSlug: string) {
  return UAQ_FREE_ZONES.filter(z => z.slug !== currentSlug);
}

interface PageProps {
  params: { zone: string };
}

export function generateMetadata({ params }: PageProps): Metadata {
  const zone = UAQ_FREE_ZONES.find(z => z.slug === params.zone);
  if (!zone) {
    return { title: 'Free Zone Not Found | Umm Al Quwain' };
  }
  return {
    title: `${zone.fullName} Gratuity Guide | UAE Labour Law 2026`,
    description: `Gratuity calculator and employment guide for ${zone.fullName}. ${zone.description.slice(0, 100)}...`,
    keywords: [`${zone.name} gratuity`, `${zone.fullName} employment`, 'umm al quwain free zone', 'uae gratuity calculator'],
  };
}

export default function UAQFreeZonePage({ params }: PageProps) {
  const zone = UAQ_FREE_ZONES.find(z => z.slug === params.zone);
  if (!zone) notFound();

  const relatedZones = getRelatedZones(zone.slug);

  return (
    <>
      <section className={styles.pageHero}>
        <div className="container">
          <nav aria-label="breadcrumb" className="mb-3">
            <ol className={styles.breadcrumb}>
              <li><Link href="/">Home</Link></li>
              <li><Link href="/umm-al-quwain">Umm Al Quwain</Link></li>
              <li><Link href="/umm-al-quwain">Free Zones</Link></li>
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
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="#0097a7">
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
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="#0097a7">
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

              {relatedZones.length > 0 && (
                <div className={styles.sidebarCard}>
                  <h3>Other UAQ Free Zones</h3>
                  <div className={styles.relatedList}>
                    {relatedZones.map((r) => (
                      <Link key={r.slug} href={`/umm-al-quwain/free-zones/${r.slug}`} className={styles.relatedItem}>
                        <span>{r.name}</span>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
                        </svg>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
