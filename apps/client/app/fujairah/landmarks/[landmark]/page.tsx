import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import styles from './page.module.css';

const FUJAIRAH_LANDMARKS = [
  {
    slug: 'fort',
    name: 'Fujairah Fort Area',
    shortName: 'Fujairah Fort',
    description: 'Fujairah Fort is one of the oldest and largest forts in the UAE, dating back over 500 years. The surrounding area includes Fujairah Museum, heritage village, and the old town with traditional souks.',
    gratuityInfo: 'Employees at Fujairah Fort area establishments follow UAE Labour Law with standard gratuity calculations for tourism, heritage, and hospitality sectors.',
    keyEmployers: ['Fujairah Museum', 'Heritage village operations', 'Tour operators', 'Local restaurants', 'Souk vendors'],
    nearbyAreas: ['Fujairah City', 'Al Faseel', 'Old Town'],
    employmentSectors: ['Tourism', 'Heritage', 'Hospitality', 'Retail'],
    averageSalary: 'AED 3,500 - 10,000',
    icon: '🏰'
  },
  {
    slug: 'bidya-mosque',
    name: 'Al Bidya Mosque Area',
    shortName: 'Al Bidya Mosque',
    description: 'Al Bidya Mosque is the oldest mosque in the UAE, built in the 15th century. This UNESCO-nominated site attracts historians, tourists, and pilgrims from around the world.',
    gratuityInfo: 'Employees near Al Bidya Mosque follow UAE Labour Law for gratuity. Heritage tourism and hospitality sector terms apply with standard entitlements.',
    keyEmployers: ['Heritage site management', 'Tour guides', 'Nearby restaurants', 'Gift shops', 'Archaeological research'],
    nearbyAreas: ['Al Bidya', 'Dibba', 'Khor Fakkan'],
    employmentSectors: ['Heritage', 'Tourism', 'Research', 'Hospitality'],
    averageSalary: 'AED 3,000 - 9,000',
    icon: '🕌'
  }
];

function getRelatedLandmarks(currentSlug: string) {
  return FUJAIRAH_LANDMARKS.filter(l => l.slug !== currentSlug);
}

interface PageProps {
  params: { landmark: string };
}

export function generateMetadata({ params }: PageProps): Metadata {
  const landmark = FUJAIRAH_LANDMARKS.find(l => l.slug === params.landmark);
  if (!landmark) {
    return { title: 'Landmark Not Found | Fujairah' };
  }
  return {
    title: `${landmark.name} Employment Guide | Gratuity Calculator 2026`,
    description: `Employment and gratuity information for ${landmark.shortName}, Fujairah. ${landmark.description.slice(0, 100)}...`,
    keywords: [`${landmark.shortName} jobs`, 'fujairah employment', 'uae gratuity', ...landmark.employmentSectors.map(s => s.toLowerCase())],
  };
}

export default function FujairahLandmarkPage({ params }: PageProps) {
  const landmark = FUJAIRAH_LANDMARKS.find(l => l.slug === params.landmark);
  if (!landmark) notFound();

  const relatedLandmarks = getRelatedLandmarks(landmark.slug);

  return (
    <>
      <section className={styles.pageHero}>
        <div className="container">
          <nav aria-label="breadcrumb" className="mb-3">
            <ol className={styles.breadcrumb}>
              <li><Link href="/">Home</Link></li>
              <li><Link href="/fujairah">Fujairah</Link></li>
              <li><Link href="/fujairah">Landmarks</Link></li>
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
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="#d35400">
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
                    <Link key={i} href={`/fujairah/${a.toLowerCase().replace(/ /g, '-')}`} className={styles.nearbyItem}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
                      </svg>
                      <span>{a}</span>
                    </Link>
                  ))}
                </div>
              </div>

              {relatedLandmarks.length > 0 && (
                <div className={styles.sidebarCard}>
                  <h3>Other Landmarks</h3>
                  <div className={styles.relatedList}>
                    {relatedLandmarks.map((r) => (
                      <Link key={r.slug} href={`/fujairah/landmarks/${r.slug}`} className={styles.relatedItem}>
                        <span className={styles.relatedIcon}>{r.icon}</span>
                        <span>{r.shortName}</span>
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
