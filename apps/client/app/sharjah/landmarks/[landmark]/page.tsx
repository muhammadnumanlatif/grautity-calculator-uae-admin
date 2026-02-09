import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import styles from './page.module.css';

const SHARJAH_LANDMARKS = [
  {
    slug: 'corniche',
    name: 'Sharjah Corniche Area',
    shortName: 'Sharjah Corniche',
    description: 'Sharjah Corniche is a scenic waterfront promenade along the Khalid Lagoon, featuring parks, mosques, and cultural attractions. It\'s a popular area for hospitality and tourism employment.',
    gratuityInfo: 'Employees at Sharjah Corniche establishments follow UAE Labour Law with standard gratuity calculations for hospitality and tourism sectors.',
    keyEmployers: ['Hotels along Corniche', 'Restaurants & cafes', 'Parks management', 'Tour operators', 'Retail outlets'],
    nearbyAreas: ['Al Majaz', 'Al Khan', 'City Center'],
    employmentSectors: ['Hospitality', 'Tourism', 'Food & Beverage', 'Retail'],
    averageSalary: 'AED 4,000 - 12,000',
    icon: '🌊'
  },
  {
    slug: 'al-noor-island',
    name: 'Al Noor Island Area',
    shortName: 'Al Noor Island',
    description: 'Al Noor Island is an illuminated sanctuary in Khalid Lagoon featuring the Butterfly House, art installations, and nature trails. It offers employment in tourism and entertainment.',
    gratuityInfo: 'Al Noor Island employees are covered under UAE Labour Law. Tourism and entertainment sector terms apply with standard gratuity entitlements.',
    keyEmployers: ['Al Noor Island management', 'Butterfly House', 'Cafe operations', 'Event services', 'Maintenance teams'],
    nearbyAreas: ['Al Majaz', 'Corniche', 'Al Khan'],
    employmentSectors: ['Tourism', 'Entertainment', 'Hospitality', 'Maintenance'],
    averageSalary: 'AED 3,500 - 10,000',
    icon: '🦋'
  },
  {
    slug: 'aquarium',
    name: 'Sharjah Aquarium Area',
    shortName: 'Sharjah Aquarium',
    description: 'Sharjah Aquarium in Al Khan showcases marine life from the Arabian Gulf and Indian Ocean. The area includes the Maritime Museum and offers employment in education and tourism.',
    gratuityInfo: 'Employees at Sharjah Aquarium and surrounding attractions follow UAE Labour Law for gratuity. Educational and tourism sector terms apply.',
    keyEmployers: ['Sharjah Aquarium', 'Maritime Museum', 'Nearby restaurants', 'Gift shops', 'Educational programs'],
    nearbyAreas: ['Al Khan', 'Corniche', 'Al Mamzar'],
    employmentSectors: ['Education', 'Tourism', 'Retail', 'Food & Beverage'],
    averageSalary: 'AED 3,500 - 10,000',
    icon: '🐠'
  }
];

function getRelatedLandmarks(currentSlug: string) {
  return SHARJAH_LANDMARKS.filter(l => l.slug !== currentSlug);
}

interface PageProps {
  params: { landmark: string };
}

export function generateMetadata({ params }: PageProps): Metadata {
  const landmark = SHARJAH_LANDMARKS.find(l => l.slug === params.landmark);
  if (!landmark) {
    return { title: 'Landmark Not Found | Sharjah' };
  }
  return {
    title: `${landmark.name} Employment Guide | Gratuity Calculator 2026`,
    description: `Employment and gratuity information for ${landmark.shortName}, Sharjah. ${landmark.description.slice(0, 100)}...`,
    keywords: [`${landmark.shortName} jobs`, 'sharjah employment', 'uae gratuity', ...landmark.employmentSectors.map(s => s.toLowerCase())],
  };
}

export default function SharjahLandmarkPage({ params }: PageProps) {
  const landmark = SHARJAH_LANDMARKS.find(l => l.slug === params.landmark);
  if (!landmark) notFound();

  const relatedLandmarks = getRelatedLandmarks(landmark.slug);

  return (
    <>
      <section className={styles.pageHero}>
        <div className="container">
          <nav aria-label="breadcrumb" className="mb-3">
            <ol className={styles.breadcrumb}>
              <li><Link href="/">Home</Link></li>
              <li><Link href="/sharjah">Sharjah</Link></li>
              <li><Link href="/sharjah">Landmarks</Link></li>
              <li>{landmark.shortName}</li>
            </ol>
          </nav>
          <div className={styles.heroContent}>
            <span className={styles.heroIcon}>{landmark.icon}</span>
            <div>
              <h1>{landmark.name}</h1>
              <p className={styles.lead}>Employment & Gratuity Information</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-5">
        <div className="container">
          <div className="row g-4">
            <div className="col-lg-8">
              <div className={styles.contentCard}>
                <h2>About {landmark.shortName}</h2>
                <p>{landmark.description}</p>
              </div>

              <div className={styles.contentCard}>
                <h2>Gratuity Information</h2>
                <p>{landmark.gratuityInfo}</p>
                <div className={styles.infoBox}>
                  <h5>Key Points:</h5>
                  <ul>
                    <li>21 days basic salary per year for first 5 years</li>
                    <li>30 days basic salary per year after 5 years</li>
                    <li>Minimum 1 year service required</li>
                    <li>Based on last drawn basic salary</li>
                  </ul>
                </div>
              </div>

              <div className={styles.contentCard}>
                <h2>Major Employers</h2>
                <div className={styles.employersList}>
                  {landmark.keyEmployers.map((e, i) => (
                    <div key={i} className={styles.employerItem}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="#28a745">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                      </svg>
                      <span>{e}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className={styles.contentCard}>
                <h2>Employment Sectors</h2>
                <div className={styles.sectorsGrid}>
                  {landmark.employmentSectors.map((s, i) => (
                    <div key={i} className={styles.sectorTag}>{s}</div>
                  ))}
                </div>
              </div>

              <div className={styles.ctaCard}>
                <h3>Calculate Your Gratuity</h3>
                <p>Working near {landmark.shortName}? Estimate your benefits.</p>
                <Link href="/#calculator" className="btn btn-primary btn-lg">Calculate Now</Link>
              </div>
            </div>

            <div className="col-lg-4">
              <div className={styles.sidebarCard}>
                <h3>Quick Information</h3>
                <div className={styles.infoList}>
                  <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>Average Salary</span>
                    <span className={styles.infoValue}>{landmark.averageSalary}</span>
                  </div>
                  <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>Main Sectors</span>
                    <span className={styles.infoValue}>{landmark.employmentSectors.length} industries</span>
                  </div>
                </div>
              </div>

              <div className={styles.sidebarCard}>
                <h3>Nearby Areas</h3>
                <div className={styles.nearbyList}>
                  {landmark.nearbyAreas.map((a, i) => (
                    <Link key={i} href={`/sharjah/${a.toLowerCase().replace(/ /g, '-')}`} className={styles.nearbyItem}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
                      </svg>
                      <span>{a}</span>
                    </Link>
                  ))}
                </div>
              </div>

              <div className={styles.sidebarCard}>
                <h3>Other Landmarks</h3>
                <div className={styles.relatedList}>
                  {relatedLandmarks.map((r) => (
                    <Link key={r.slug} href={`/sharjah/landmarks/${r.slug}`} className={styles.relatedItem}>
                      <span className={styles.relatedIcon}>{r.icon}</span>
                      <span>{r.shortName}</span>
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
