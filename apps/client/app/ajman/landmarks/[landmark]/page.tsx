import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import styles from './page.module.css';

const AJMAN_LANDMARKS = [
  {
    slug: 'museum',
    name: 'Ajman Museum Area',
    shortName: 'Ajman Museum',
    description: 'Ajman Museum is housed in the historic 18th-century fort that once served as the ruler\'s palace. The museum showcases Ajman\'s heritage, traditional crafts, and archaeological finds from the region.',
    gratuityInfo: 'Employees at Ajman Museum and surrounding heritage area follow UAE Labour Law with standard gratuity calculations for cultural and tourism sectors.',
    keyEmployers: ['Ajman Museum', 'Heritage village', 'Tour operators', 'Souvenir shops', 'Local cafes'],
    nearbyAreas: ['Ajman City', 'Old Town', 'Corniche'],
    employmentSectors: ['Heritage', 'Tourism', 'Culture', 'Retail'],
    averageSalary: 'AED 3,500 - 10,000',
    icon: '🏛️'
  },
  {
    slug: 'corniche',
    name: 'Ajman Corniche Area',
    shortName: 'Ajman Corniche',
    description: 'Ajman Corniche is a scenic waterfront promenade stretching along the Arabian Gulf coast. It features parks, beaches, hotels, and restaurants, making it the emirate\'s primary leisure destination.',
    gratuityInfo: 'Employees at Ajman Corniche establishments follow UAE Labour Law for gratuity. Hospitality and tourism sector terms apply with standard entitlements.',
    keyEmployers: ['Beach hotels', 'Restaurants & cafes', 'Water sports operators', 'Beach clubs', 'Retail outlets'],
    nearbyAreas: ['Ajman City', 'Al Nuaimiya', 'Al Rashidiya'],
    employmentSectors: ['Hospitality', 'Tourism', 'Food & Beverage', 'Recreation'],
    averageSalary: 'AED 4,000 - 12,000',
    icon: '🏖️'
  },
  {
    slug: 'city-centre',
    name: 'City Centre Ajman Area',
    shortName: 'City Centre Ajman',
    description: 'City Centre Ajman is the emirate\'s largest shopping mall, featuring retail stores, entertainment facilities, a cinema, and dining options. It\'s a major employment hub for the retail sector.',
    gratuityInfo: 'Employees at City Centre Ajman follow UAE Labour Law with retail and hospitality sector terms. Standard gratuity calculations apply.',
    keyEmployers: ['Retail stores', 'Carrefour hypermarket', 'Restaurants', 'VOX Cinemas', 'Entertainment venues'],
    nearbyAreas: ['Ajman City', 'Al Nuaimiya', 'Al Jurf'],
    employmentSectors: ['Retail', 'Entertainment', 'Food & Beverage', 'Services'],
    averageSalary: 'AED 3,500 - 10,000',
    icon: '🛒'
  }
];

function getRelatedLandmarks(currentSlug: string) {
  return AJMAN_LANDMARKS.filter(l => l.slug !== currentSlug);
}

interface PageProps {
  params: { landmark: string };
}

export function generateMetadata({ params }: PageProps): Metadata {
  const landmark = AJMAN_LANDMARKS.find(l => l.slug === params.landmark);
  if (!landmark) {
    return { title: 'Landmark Not Found | Ajman' };
  }
  return {
    title: `${landmark.name} Employment Guide | Gratuity Calculator 2026`,
    description: `Employment and gratuity information for ${landmark.shortName}, Ajman. ${landmark.description.slice(0, 100)}...`,
    keywords: [`${landmark.shortName} jobs`, 'ajman employment', 'uae gratuity', ...landmark.employmentSectors.map(s => s.toLowerCase())],
  };
}

export default function AjmanLandmarkPage({ params }: PageProps) {
  const landmark = AJMAN_LANDMARKS.find(l => l.slug === params.landmark);
  if (!landmark) notFound();

  const relatedLandmarks = getRelatedLandmarks(landmark.slug);

  return (
    <>
      <section className={styles.pageHero}>
        <div className="container">
          <nav aria-label="breadcrumb" className="mb-3">
            <ol className={styles.breadcrumb}>
              <li><Link href="/">Home</Link></li>
              <li><Link href="/ajman">Ajman</Link></li>
              <li><Link href="/ajman">Landmarks</Link></li>
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
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="#7b1fa2">
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
                    <Link key={i} href={`/ajman/${a.toLowerCase().replace(/ /g, '-')}`} className={styles.nearbyItem}>
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
                    <Link key={r.slug} href={`/ajman/landmarks/${r.slug}`} className={styles.relatedItem}>
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
