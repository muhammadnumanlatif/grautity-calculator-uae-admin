import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import styles from './page.module.css';

const AJMAN_AREAS = [
  {
    slug: 'city',
    name: 'Ajman City',
    description: 'Ajman City is the capital and main urban center of Ajman emirate. It features the Corniche, Ajman Museum in the historic fort, and the main commercial districts. The city offers affordable living with growing employment opportunities.',
    highlights: ['Ajman Corniche', 'Ajman Museum', 'Commercial center', 'City Centre Ajman'],
    employmentSectors: ['Retail', 'Trading', 'Government', 'Services'],
    averageSalary: 'AED 4,000 - 12,000'
  },
  {
    slug: 'al-nuaimiya',
    name: 'Al Nuaimiya',
    description: 'Al Nuaimiya is a major residential and commercial area in Ajman, known for its shopping centers, restaurants, and vibrant community. It\'s one of the most populous areas with diverse employment options.',
    highlights: ['Shopping centers', 'Restaurants', 'Residential towers', 'Commercial hub'],
    employmentSectors: ['Retail', 'Food & Beverage', 'Services', 'Real Estate'],
    averageSalary: 'AED 3,500 - 10,000'
  },
  {
    slug: 'al-rashidiya',
    name: 'Al Rashidiya',
    description: 'Al Rashidiya is a well-established residential area in Ajman, featuring a mix of villas and apartments with local amenities. It offers a family-friendly environment with schools and parks.',
    highlights: ['Residential area', 'Schools', 'Parks', 'Local markets'],
    employmentSectors: ['Education', 'Retail', 'Healthcare', 'Services'],
    averageSalary: 'AED 3,500 - 10,000'
  },
  {
    slug: 'al-jurf',
    name: 'Al Jurf',
    description: 'Al Jurf is Ajman\'s main industrial area, hosting manufacturing facilities, warehouses, and trading companies. It\'s a key employment hub for industrial and logistics workers.',
    highlights: ['Industrial zone', 'Warehouses', 'Manufacturing', 'Trading companies'],
    employmentSectors: ['Manufacturing', 'Logistics', 'Trading', 'Industrial'],
    averageSalary: 'AED 3,000 - 9,000'
  },
  {
    slug: 'al-zahra',
    name: 'Al Zahra',
    description: 'Al Zahra is a developing residential area in Ajman with modern housing projects and community facilities. It represents Ajman\'s expansion with new infrastructure and amenities.',
    highlights: ['New developments', 'Modern housing', 'Community facilities', 'Growing area'],
    employmentSectors: ['Construction', 'Retail', 'Services', 'Real Estate'],
    averageSalary: 'AED 3,500 - 10,000'
  },
  {
    slug: 'musheiref',
    name: 'Musheiref',
    description: 'Musheiref is an inland area of Ajman featuring residential communities and agricultural land. It maintains a quieter lifestyle away from the coastal urban areas.',
    highlights: ['Inland location', 'Residential communities', 'Quieter lifestyle', 'Agricultural areas'],
    employmentSectors: ['Agriculture', 'Services', 'Retail', 'Education'],
    averageSalary: 'AED 3,000 - 8,000'
  },
  {
    slug: 'manama',
    name: 'Manama',
    description: 'Manama is a town in the mountainous eastern region of Ajman, bordering Ras Al Khaimah. It offers a cooler climate and scenic mountain views with a traditional community.',
    highlights: ['Mountain location', 'Cooler climate', 'Traditional town', 'Scenic views'],
    employmentSectors: ['Agriculture', 'Tourism', 'Services', 'Government'],
    averageSalary: 'AED 3,000 - 8,000'
  },
  {
    slug: 'masfout',
    name: 'Masfout',
    description: 'Masfout is Ajman\'s mountain enclave near Hatta, known for its natural beauty, farms, and cooler temperatures. It\'s popular for weekend getaways and eco-tourism.',
    highlights: ['Mountain enclave', 'Natural beauty', 'Farms', 'Eco-tourism'],
    employmentSectors: ['Tourism', 'Agriculture', 'Hospitality', 'Services'],
    averageSalary: 'AED 3,000 - 8,000'
  }
];

function getRelatedAreas(currentSlug: string) {
  return AJMAN_AREAS.filter(a => a.slug !== currentSlug).slice(0, 6);
}

interface PageProps {
  params: { area: string };
}

export function generateMetadata({ params }: PageProps): Metadata {
  const area = AJMAN_AREAS.find(a => a.slug === params.area);
  if (!area) {
    return { title: 'Area Not Found | Ajman' };
  }
  return {
    title: `${area.name} Gratuity Calculator | UAE Labour Law 2026`,
    description: `Calculate your end of service gratuity in ${area.name}, Ajman. ${area.description.slice(0, 120)}...`,
    keywords: [`${area.name} gratuity`, 'ajman gratuity calculator', 'uae labour law', ...area.employmentSectors.map(s => `${s.toLowerCase()} jobs ajman`)],
  };
}

export default function AjmanAreaPage({ params }: PageProps) {
  const area = AJMAN_AREAS.find(a => a.slug === params.area);
  if (!area) notFound();

  const relatedAreas = getRelatedAreas(area.slug);

  return (
    <>
      <section className={styles.pageHero}>
        <div className="container">
          <nav aria-label="breadcrumb" className="mb-3">
            <ol className={styles.breadcrumb}>
              <li><Link href="/">Home</Link></li>
              <li><Link href="/ajman">Ajman</Link></li>
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
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="#7b1fa2">
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
                <h3>Other Ajman Areas</h3>
                <div className={styles.relatedList}>
                  {relatedAreas.map((r) => (
                    <Link key={r.slug} href={`/ajman/${r.slug}`} className={styles.relatedItem}>
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
