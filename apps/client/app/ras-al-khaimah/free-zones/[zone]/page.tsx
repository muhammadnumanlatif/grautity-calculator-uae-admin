import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import styles from './page.module.css';

const RAK_FREE_ZONES = [
  {
    slug: 'rak-ftz',
    name: 'RAK FTZ',
    fullName: 'RAK Free Trade Zone',
    description: 'RAK Free Trade Zone is one of the most cost-effective free zones in the UAE, offering quick business setup with competitive packages. It\'s strategically located near RAK Airport and seaport, making it ideal for trading and manufacturing companies.',
    gratuityRules: ['UAE Labour Law applies', '21 days per year (first 5 years)', '30 days per year (after 5 years)', 'Standard gratuity entitlements', 'Pro-rata calculations'],
    keyFeatures: ['Cost-effective setup', 'Quick licensing', '100% foreign ownership', 'Strategic location'],
    established: '2000',
    authority: 'RAK Free Trade Zone Authority',
    employees: '25,000+',
    companies: '15,000+'
  },
  {
    slug: 'rakia',
    name: 'RAKIA',
    fullName: 'RAK Investment Authority Free Zone',
    description: 'RAKIA Free Zone focuses on industrial and manufacturing businesses, offering large plots of land for factories and warehouses. It\'s ideal for companies in manufacturing, logistics, and industrial services.',
    gratuityRules: ['UAE Labour Law compliance', 'Standard 21/30 formula', 'Industrial sector terms', 'Full benefits after 1 year', 'Standard entitlements'],
    keyFeatures: ['Industrial focus', 'Large land plots', 'Manufacturing hub', 'Logistics support'],
    established: '2005',
    authority: 'RAK Investment Authority',
    employees: '30,000+',
    companies: '800+'
  },
  {
    slug: 'maritime',
    name: 'RAK Maritime City',
    fullName: 'RAK Maritime City Free Zone',
    description: 'RAK Maritime City is specialized for maritime and shipping businesses, located adjacent to the port. It offers facilities for ship repair, maritime services, and offshore support companies.',
    gratuityRules: ['UAE Labour Law applies', '21/30 day formula', 'Maritime sector rules', 'Offshore work provisions', 'Standard gratuity rights'],
    keyFeatures: ['Maritime focus', 'Port adjacent', 'Ship repair facilities', 'Offshore support'],
    established: '2010',
    authority: 'RAK Maritime City Authority',
    employees: '5,000+',
    companies: '200+'
  },
  {
    slug: 'media-city',
    name: 'RAK Media City',
    fullName: 'RAK Media City Free Zone',
    description: 'RAK Media City caters to media, creative, and technology businesses. It offers flexible licensing options for freelancers, startups, and established companies in the creative industries.',
    gratuityRules: ['UAE Labour Law compliance', 'Standard 21/30 formula', 'Media industry contracts', 'Freelance provisions', 'Full benefits after 1 year'],
    keyFeatures: ['Media & creative focus', 'Freelancer packages', 'Affordable licensing', 'Technology hub'],
    established: '2006',
    authority: 'RAK Media City Authority',
    employees: '8,000+',
    companies: '6,000+'
  },
  {
    slug: 'academic',
    name: 'Academic Zone',
    fullName: 'RAK Academic Zone',
    description: 'RAK Academic Zone hosts international universities and educational institutions. It provides a hub for higher education with employment opportunities in academia, research, and educational support services.',
    gratuityRules: ['UAE Labour Law applies', 'Education sector terms', '21/30 day formula', 'Academic contracts', 'Standard entitlements'],
    keyFeatures: ['Education hub', 'International universities', 'Research facilities', 'Student services'],
    established: '2008',
    authority: 'RAK Academic Zone Authority',
    employees: '3,000+',
    companies: '50+'
  }
];

function getRelatedZones(currentSlug: string) {
  return RAK_FREE_ZONES.filter(z => z.slug !== currentSlug);
}

interface PageProps {
  params: { zone: string };
}

export function generateMetadata({ params }: PageProps): Metadata {
  const zone = RAK_FREE_ZONES.find(z => z.slug === params.zone);
  if (!zone) {
    return { title: 'Free Zone Not Found | Ras Al Khaimah' };
  }
  return {
    title: `${zone.fullName} Gratuity Guide | UAE Labour Law 2026`,
    description: `Gratuity calculator and employment guide for ${zone.fullName}. ${zone.description.slice(0, 100)}...`,
    keywords: [`${zone.name} gratuity`, `${zone.fullName} employment`, 'ras al khaimah free zone', 'uae gratuity calculator'],
  };
}

export default function RAKFreeZonePage({ params }: PageProps) {
  const zone = RAK_FREE_ZONES.find(z => z.slug === params.zone);
  if (!zone) notFound();

  const relatedZones = getRelatedZones(zone.slug);

  return (
    <>
      <section className={styles.pageHero}>
        <div className="container">
          <nav aria-label="breadcrumb" className="mb-3">
            <ol className={styles.breadcrumb}>
              <li><Link href="/">Home</Link></li>
              <li><Link href="/ras-al-khaimah">Ras Al Khaimah</Link></li>
              <li><Link href="/ras-al-khaimah">Free Zones</Link></li>
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
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="#c62828">
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
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="#c62828">
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
                <h3>Other RAK Free Zones</h3>
                <div className={styles.relatedList}>
                  {relatedZones.map((r) => (
                    <Link key={r.slug} href={`/ras-al-khaimah/free-zones/${r.slug}`} className={styles.relatedItem}>
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
