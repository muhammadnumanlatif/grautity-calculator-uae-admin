import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import styles from './page.module.css';

// Abu Dhabi Landmarks data
const ABU_DHABI_LANDMARKS = [
  {
    slug: 'louvre',
    name: 'Louvre Abu Dhabi Area',
    shortName: 'Louvre Abu Dhabi',
    description: 'The Louvre Abu Dhabi area on Saadiyat Island is a cultural hub featuring the renowned museum, luxury resorts, and educational institutions. Employment focuses on arts, culture, hospitality, and tourism.',
    gratuityInfo: 'Employees at Louvre Abu Dhabi and surrounding establishments follow UAE Labour Law for gratuity calculations. Cultural institutions may have specific contract terms.',
    keyEmployers: ['Louvre Abu Dhabi', 'Saadiyat Beach hotels', 'NYU Abu Dhabi', 'Cultural venues', 'Tourism operators'],
    nearbyAreas: ['Saadiyat Island', 'Al Maryah Island', 'Corniche'],
    employmentSectors: ['Arts & Culture', 'Tourism', 'Hospitality', 'Education'],
    averageSalary: 'AED 8,000 - 25,000',
    icon: '🏛️'
  },
  {
    slug: 'grand-mosque',
    name: 'Sheikh Zayed Grand Mosque Area',
    shortName: 'Grand Mosque',
    description: 'The Sheikh Zayed Grand Mosque is one of the world\'s largest mosques and a major tourist destination. The area offers employment in religious services, tourism, and hospitality.',
    gratuityInfo: 'Employment at the Grand Mosque and surrounding area follows UAE Labour Law. Government-operated facilities may have specific terms.',
    keyEmployers: ['Grand Mosque management', 'Tour operators', 'Nearby hotels', 'Transportation services', 'Retail outlets'],
    nearbyAreas: ['Al Mushrif', 'Khalifa City', 'MBZ City'],
    employmentSectors: ['Tourism', 'Hospitality', 'Religious Services', 'Retail'],
    averageSalary: 'AED 5,000 - 15,000',
    icon: '🕌'
  },
  {
    slug: 'yas-marina',
    name: 'Yas Marina Circuit Area',
    shortName: 'Yas Marina Circuit',
    description: 'Yas Marina Circuit is home to the Abu Dhabi Formula 1 Grand Prix. The area employs staff in motorsports, events, hospitality, and entertainment year-round.',
    gratuityInfo: 'Employees at Yas Marina Circuit and related facilities follow UAE Labour Law. Events staff may have seasonal or fixed-term contracts.',
    keyEmployers: ['Yas Marina Circuit', 'F1 event operations', 'Yas Marina hotels', 'W Hotel', 'Event management companies'],
    nearbyAreas: ['Yas Island', 'Saadiyat Island', 'Abu Dhabi City'],
    employmentSectors: ['Motorsports', 'Events', 'Hospitality', 'Entertainment'],
    averageSalary: 'AED 6,000 - 20,000',
    icon: '🏎️'
  },
  {
    slug: 'ferrari-world',
    name: 'Ferrari World Area',
    shortName: 'Ferrari World',
    description: 'Ferrari World Abu Dhabi on Yas Island is the world\'s first Ferrari-branded theme park. The area is a major employer in entertainment, hospitality, and retail.',
    gratuityInfo: 'Ferrari World employees follow UAE Labour Law. Theme park operations offer both permanent and seasonal employment.',
    keyEmployers: ['Ferrari World Abu Dhabi', 'Yas Waterworld', 'Warner Bros. World', 'Yas Mall', 'Hotels on Yas Island'],
    nearbyAreas: ['Yas Island', 'Yas Marina', 'Saadiyat Island'],
    employmentSectors: ['Entertainment', 'Theme Parks', 'Hospitality', 'Retail'],
    averageSalary: 'AED 4,000 - 15,000',
    icon: '🎢'
  },
  {
    slug: 'emirates-palace',
    name: 'Emirates Palace Area',
    shortName: 'Emirates Palace',
    description: 'Emirates Palace is one of the world\'s most luxurious hotels, located on the Abu Dhabi Corniche. It\'s a premier employer in luxury hospitality.',
    gratuityInfo: 'Emirates Palace employees are covered by UAE Labour Law with premium hospitality sector terms. Luxury hotels often provide additional benefits beyond statutory requirements.',
    keyEmployers: ['Emirates Palace', 'Nearby luxury hotels', 'High-end restaurants', 'Retail boutiques', 'Event services'],
    nearbyAreas: ['Corniche', 'Tourist Club Area', 'Abu Dhabi City'],
    employmentSectors: ['Luxury Hospitality', 'Food & Beverage', 'Events', 'Retail'],
    averageSalary: 'AED 5,000 - 20,000',
    icon: '🏨'
  }
];

function getRelatedLandmarks(currentSlug: string) {
  return ABU_DHABI_LANDMARKS.filter(l => l.slug !== currentSlug);
}

interface PageProps {
  params: { landmark: string };
}

export function generateMetadata({ params }: PageProps): Metadata {
  const landmark = ABU_DHABI_LANDMARKS.find(l => l.slug === params.landmark);
  if (!landmark) {
    return { title: 'Landmark Not Found | Abu Dhabi' };
  }
  return {
    title: `${landmark.name} Employment Guide | Gratuity Calculator 2026`,
    description: `Employment and gratuity information for ${landmark.shortName}, Abu Dhabi. ${landmark.description.slice(0, 100)}...`,
    keywords: [`${landmark.shortName} jobs`, 'abu dhabi employment', 'uae gratuity', ...landmark.employmentSectors.map(s => s.toLowerCase())],
  };
}

export default function AbuDhabiLandmarkPage({ params }: PageProps) {
  const landmark = ABU_DHABI_LANDMARKS.find(l => l.slug === params.landmark);

  if (!landmark) {
    notFound();
  }

  const relatedLandmarks = getRelatedLandmarks(landmark.slug);

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: `${landmark.name} Employment & Gratuity Guide`,
    description: landmark.description,
    author: { '@type': 'Organization', name: 'Gratuity.ae' }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <section className={styles.pageHero}>
        <div className="container">
          <nav aria-label="breadcrumb" className="mb-3">
            <ol className={styles.breadcrumb}>
              <li><Link href="/">Home</Link></li>
              <li><Link href="/abu-dhabi">Abu Dhabi</Link></li>
              <li><Link href="/abu-dhabi">Landmarks</Link></li>
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
                  {landmark.keyEmployers.map((employer, index) => (
                    <div key={index} className={styles.employerItem}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="#28a745">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                      </svg>
                      <span>{employer}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className={styles.contentCard}>
                <h2>Employment Sectors</h2>
                <div className={styles.sectorsGrid}>
                  {landmark.employmentSectors.map((sector, index) => (
                    <div key={index} className={styles.sectorTag}>{sector}</div>
                  ))}
                </div>
              </div>

              <div className={styles.ctaCard}>
                <h3>Calculate Your Gratuity</h3>
                <p>Working near {landmark.shortName}? Estimate your end of service benefits.</p>
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
                  {landmark.nearbyAreas.map((area, index) => (
                    <Link key={index} href={`/abu-dhabi/${area.toLowerCase().replace(/ /g, '-')}`} className={styles.nearbyItem}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
                      </svg>
                      <span>{area}</span>
                    </Link>
                  ))}
                </div>
              </div>

              <div className={styles.sidebarCard}>
                <h3>Other Landmarks</h3>
                <div className={styles.relatedList}>
                  {relatedLandmarks.map((related) => (
                    <Link key={related.slug} href={`/abu-dhabi/landmarks/${related.slug}`} className={styles.relatedItem}>
                      <span className={styles.relatedIcon}>{related.icon}</span>
                      <span>{related.shortName}</span>
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
