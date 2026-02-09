import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import styles from './page.module.css';

const FUJAIRAH_FREE_ZONES = [
  {
    slug: 'ffz',
    name: 'Fujairah Free Zone',
    fullName: 'Fujairah Free Zone',
    description: 'Fujairah Free Zone (FFZ) is the emirate\'s primary free zone, strategically located near the Port of Fujairah. It offers excellent connectivity for trading, logistics, and manufacturing businesses.',
    gratuityRules: ['UAE Labour Law applies', '21 days per year (first 5 years)', '30 days per year (after 5 years)', 'Standard gratuity entitlements', 'Pro-rata calculations'],
    keyFeatures: ['Port adjacent', 'Trading hub', '100% foreign ownership', 'Tax benefits'],
    established: '1987',
    authority: 'Fujairah Free Zone Authority',
    employees: '15,000+',
    companies: '2,500+'
  },
  {
    slug: 'creative-city',
    name: 'Creative City',
    fullName: 'Fujairah Creative City Free Zone',
    description: 'Fujairah Creative City is a media and creative industries free zone, offering flexible licensing for freelancers, media companies, and creative professionals at competitive rates.',
    gratuityRules: ['UAE Labour Law compliance', 'Standard 21/30 formula', 'Media industry contracts', 'Freelance provisions available', 'Full benefits after 1 year'],
    keyFeatures: ['Media & creative hub', 'Flexible licensing', 'Freelancer visas', 'Cost-effective'],
    established: '2007',
    authority: 'Creative City Authority',
    employees: '8,000+',
    companies: '5,000+'
  },
  {
    slug: 'ifza',
    name: 'IFZA',
    fullName: 'International Free Zone Authority Fujairah',
    description: 'IFZA is one of the fastest-growing free zones in the UAE, offering quick and affordable business setup for companies of all sizes. It provides comprehensive business solutions with minimal paperwork.',
    gratuityRules: ['Standard UAE Labour Law', '21 days (first 5 years)', '30 days (after 5 years)', 'All sector standards apply', 'Full gratuity rights'],
    keyFeatures: ['Quick setup', 'Affordable packages', 'Multiple visa options', 'Business support'],
    established: '2018',
    authority: 'IFZA Authority',
    employees: '20,000+',
    companies: '25,000+'
  }
];

function getRelatedZones(currentSlug: string) {
  return FUJAIRAH_FREE_ZONES.filter(z => z.slug !== currentSlug);
}

interface PageProps {
  params: { zone: string };
}

export function generateMetadata({ params }: PageProps): Metadata {
  const zone = FUJAIRAH_FREE_ZONES.find(z => z.slug === params.zone);
  if (!zone) {
    return { title: 'Free Zone Not Found | Fujairah' };
  }
  return {
    title: `${zone.fullName} Gratuity Guide | UAE Labour Law 2026`,
    description: `Gratuity calculator and employment guide for ${zone.fullName}. ${zone.description.slice(0, 100)}...`,
    keywords: [`${zone.name} gratuity`, `${zone.fullName} employment`, 'fujairah free zone', 'uae gratuity calculator'],
  };
}

export default function FujairahFreeZonePage({ params }: PageProps) {
  const zone = FUJAIRAH_FREE_ZONES.find(z => z.slug === params.zone);
  if (!zone) notFound();

  const relatedZones = getRelatedZones(zone.slug);

  return (
    <>
      <section className={styles.pageHero}>
        <div className="container">
          <nav aria-label="breadcrumb" className="mb-3">
            <ol className={styles.breadcrumb}>
              <li><Link href="/">Home</Link></li>
              <li><Link href="/fujairah">Fujairah</Link></li>
              <li><Link href="/fujairah">Free Zones</Link></li>
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
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="#d35400">
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
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="#d35400">
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
                <h3>Other Fujairah Free Zones</h3>
                <div className={styles.relatedList}>
                  {relatedZones.map((r) => (
                    <Link key={r.slug} href={`/fujairah/free-zones/${r.slug}`} className={styles.relatedItem}>
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
