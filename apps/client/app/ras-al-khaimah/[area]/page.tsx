import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import styles from './page.module.css';

const RAK_AREAS = [
  {
    slug: 'city',
    name: 'RAK City',
    description: 'RAK City is the capital and main urban center of Ras Al Khaimah emirate. It features the historic Old Town, modern commercial districts, and the RAK Corniche. The city offers diverse employment opportunities across government, retail, and services.',
    highlights: ['RAK Corniche', 'Old Town heritage', 'Commercial center', 'Government offices'],
    employmentSectors: ['Government', 'Retail', 'Trading', 'Services'],
    averageSalary: 'AED 4,500 - 12,000'
  },
  {
    slug: 'al-nakheel',
    name: 'Al Nakheel',
    description: 'Al Nakheel is a prime residential and commercial area in RAK City, known for its shopping centers, restaurants, and business establishments. It serves as the main commercial hub with excellent employment opportunities.',
    highlights: ['Shopping centers', 'Restaurants', 'Business district', 'Residential towers'],
    employmentSectors: ['Retail', 'Food & Beverage', 'Services', 'Real Estate'],
    averageSalary: 'AED 4,000 - 11,000'
  },
  {
    slug: 'al-hamra',
    name: 'Al Hamra',
    description: 'Al Hamra is a prestigious waterfront development featuring Al Hamra Village, golf courses, and luxury resorts. It\'s a major tourism and hospitality destination with growing employment in the leisure sector.',
    highlights: ['Al Hamra Village', 'Golf courses', 'Beach resorts', 'Marina'],
    employmentSectors: ['Hospitality', 'Tourism', 'Real Estate', 'Recreation'],
    averageSalary: 'AED 4,500 - 14,000'
  },
  {
    slug: 'mina-al-arab',
    name: 'Mina Al Arab',
    description: 'Mina Al Arab is a waterfront residential and leisure development featuring hotels, apartments, and recreational facilities. It offers employment in hospitality, retail, and property management.',
    highlights: ['Waterfront living', 'Hotels', 'Beach access', 'Retail outlets'],
    employmentSectors: ['Hospitality', 'Real Estate', 'Retail', 'Services'],
    averageSalary: 'AED 4,000 - 12,000'
  },
  {
    slug: 'al-marjan-island',
    name: 'Al Marjan Island',
    description: 'Al Marjan Island is a man-made archipelago featuring luxury hotels, resorts, and the upcoming Wynn Resort. It\'s a premier tourism destination with high-end hospitality employment opportunities.',
    highlights: ['Luxury resorts', 'Wynn Resort', 'Beaches', 'Entertainment'],
    employmentSectors: ['Hospitality', 'Tourism', 'Entertainment', 'F&B'],
    averageSalary: 'AED 5,000 - 15,000'
  },
  {
    slug: 'khuzam',
    name: 'Khuzam',
    description: 'Khuzam is a residential area in RAK City, home to the historic Khuzam Palace and local community facilities. It offers a quieter lifestyle with employment in education, healthcare, and retail.',
    highlights: ['Khuzam Palace', 'Residential area', 'Schools', 'Local markets'],
    employmentSectors: ['Education', 'Healthcare', 'Retail', 'Services'],
    averageSalary: 'AED 3,500 - 10,000'
  },
  {
    slug: 'al-dhait',
    name: 'Al Dhait',
    description: 'Al Dhait is a developing residential area south of RAK City, featuring modern housing communities and local amenities. It represents RAK\'s expansion with growing infrastructure and services.',
    highlights: ['New developments', 'Residential communities', 'Local amenities', 'Growing area'],
    employmentSectors: ['Construction', 'Retail', 'Services', 'Education'],
    averageSalary: 'AED 3,500 - 10,000'
  },
  {
    slug: 'jebel-jais',
    name: 'Jebel Jais Area',
    description: 'Jebel Jais is the UAE\'s highest mountain peak, featuring adventure tourism attractions including the world\'s longest zipline. The area offers employment in tourism, hospitality, and outdoor activities.',
    highlights: ['Highest UAE peak', 'Zipline adventure', 'Mountain tourism', 'Hiking trails'],
    employmentSectors: ['Tourism', 'Adventure Sports', 'Hospitality', 'Services'],
    averageSalary: 'AED 3,500 - 10,000'
  },
  {
    slug: 'jazirah-hamra',
    name: 'Al Jazirah Al Hamra',
    description: 'Al Jazirah Al Hamra is a historic fishing village and one of the last remaining traditional towns in the UAE. It attracts heritage tourism and offers unique cultural employment opportunities.',
    highlights: ['Historic village', 'Heritage site', 'Traditional architecture', 'Cultural tourism'],
    employmentSectors: ['Heritage', 'Tourism', 'Culture', 'Services'],
    averageSalary: 'AED 3,000 - 9,000'
  }
];

function getRelatedAreas(currentSlug: string) {
  return RAK_AREAS.filter(a => a.slug !== currentSlug).slice(0, 6);
}

interface PageProps {
  params: { area: string };
}

export function generateMetadata({ params }: PageProps): Metadata {
  const area = RAK_AREAS.find(a => a.slug === params.area);
  if (!area) {
    return { title: 'Area Not Found | Ras Al Khaimah' };
  }
  return {
    title: `${area.name} Gratuity Calculator | UAE Labour Law 2026`,
    description: `Calculate your end of service gratuity in ${area.name}, Ras Al Khaimah. ${area.description.slice(0, 120)}...`,
    keywords: [`${area.name} gratuity`, 'ras al khaimah gratuity calculator', 'uae labour law', ...area.employmentSectors.map(s => `${s.toLowerCase()} jobs rak`)],
  };
}

export default function RAKAreaPage({ params }: PageProps) {
  const area = RAK_AREAS.find(a => a.slug === params.area);
  if (!area) notFound();

  const relatedAreas = getRelatedAreas(area.slug);

  return (
    <>
      <section className={styles.pageHero}>
        <div className="container">
          <nav aria-label="breadcrumb" className="mb-3">
            <ol className={styles.breadcrumb}>
              <li><Link href="/">Home</Link></li>
              <li><Link href="/ras-al-khaimah">Ras Al Khaimah</Link></li>
              <li>{area.name}</li>
            </ol>
          </nav>
          <h1>{area.name}</h1>
          <p className={styles.lead}>Gratuity Calculator & Employment Guide</p>
        </div>
      </section>

      <section className="py-5">
        <div className="container">
          <div className="row g-4">
            <div className="col-lg-8">
              <div className={styles.contentCard}>
                <h2>About {area.name}</h2>
                <p>{area.description}</p>
              </div>

              <div className={styles.contentCard}>
                <h2>Area Highlights</h2>
                <div className={styles.highlightsGrid}>
                  {area.highlights.map((h, i) => (
                    <div key={i} className={styles.highlightItem}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="#c62828">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                      </svg>
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className={styles.contentCard}>
                <h2>Gratuity Information</h2>
                <p>Employees in {area.name} follow UAE Labour Law:</p>
                <ul className={styles.rulesList}>
                  <li>21 days basic salary per year for first 5 years</li>
                  <li>30 days basic salary per year after 5 years</li>
                  <li>Minimum 1 year service required</li>
                  <li>Based on last drawn basic salary</li>
                </ul>
              </div>

              <div className={styles.ctaCard}>
                <h3>Calculate Your Gratuity</h3>
                <p>Working in {area.name}? Estimate your end of service benefits.</p>
                <Link href="/#calculator" className="btn btn-primary btn-lg">Calculate Now</Link>
              </div>
            </div>

            <div className="col-lg-4">
              <div className={styles.sidebarCard}>
                <h3>Quick Facts</h3>
                <div className={styles.infoList}>
                  <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>Average Salary</span>
                    <span className={styles.infoValue}>{area.averageSalary}</span>
                  </div>
                  <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>Main Sectors</span>
                    <span className={styles.infoValue}>{area.employmentSectors.length} industries</span>
                  </div>
                </div>
              </div>

              <div className={styles.sidebarCard}>
                <h3>Employment Sectors</h3>
                <div className={styles.sectorTags}>
                  {area.employmentSectors.map((s, i) => (
                    <span key={i} className={styles.sectorTag}>{s}</span>
                  ))}
                </div>
              </div>

              <div className={styles.sidebarCard}>
                <h3>Other RAK Areas</h3>
                <div className={styles.relatedList}>
                  {relatedAreas.map((r) => (
                    <Link key={r.slug} href={`/ras-al-khaimah/${r.slug}`} className={styles.relatedItem}>
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
