import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import styles from './page.module.css';

const SHARJAH_AREAS = [
  {
    slug: 'city-center',
    name: 'Sharjah City Center',
    description: 'Sharjah City Center is the commercial heart of the emirate, featuring the famous City Centre Sharjah mall, government offices, and bustling souks. It offers diverse employment in retail, government, and services.',
    highlights: ['City Centre Sharjah Mall', 'Central Souq', 'Government offices', 'Commercial district'],
    employmentSectors: ['Retail', 'Government', 'Trading', 'Services'],
    averageSalary: 'AED 5,000 - 15,000'
  },
  {
    slug: 'al-nahda',
    name: 'Al Nahda Sharjah',
    description: 'Al Nahda is a vibrant residential and commercial area bordering Dubai, known for its shopping centers, restaurants, and healthcare facilities. It\'s a popular area for Dubai workers.',
    highlights: ['Sahara Centre', 'Healthcare facilities', 'Dubai border location', 'Residential area'],
    employmentSectors: ['Retail', 'Healthcare', 'Food & Beverage', 'Services'],
    averageSalary: 'AED 4,000 - 12,000'
  },
  {
    slug: 'al-majaz',
    name: 'Al Majaz',
    description: 'Al Majaz is a prestigious waterfront area along the Khalid Lagoon, featuring Al Majaz Waterfront, hotels, and modern residential towers. It\'s a hub for hospitality and entertainment.',
    highlights: ['Al Majaz Waterfront', 'Khalid Lagoon views', 'Hotels', 'Entertainment venues'],
    employmentSectors: ['Hospitality', 'Entertainment', 'Food & Beverage', 'Real Estate'],
    averageSalary: 'AED 5,000 - 15,000'
  },
  {
    slug: 'al-khan',
    name: 'Al Khan',
    description: 'Al Khan is a coastal area known for Sharjah Aquarium and the Al Khan Lagoon. It offers employment in tourism, hospitality, and the fishing industry.',
    highlights: ['Sharjah Aquarium', 'Al Khan Lagoon', 'Fishing harbor', 'Beach area'],
    employmentSectors: ['Tourism', 'Hospitality', 'Maritime', 'Food & Beverage'],
    averageSalary: 'AED 4,000 - 12,000'
  },
  {
    slug: 'al-qasimia',
    name: 'Al Qasimia',
    description: 'Al Qasimia is a central residential and commercial district known for its diverse community and affordable housing. It features shopping centers and educational institutions.',
    highlights: ['Central location', 'Affordable housing', 'Shopping centers', 'Schools'],
    employmentSectors: ['Retail', 'Education', 'Services', 'Healthcare'],
    averageSalary: 'AED 3,500 - 10,000'
  },
  {
    slug: 'muwaileh',
    name: 'Muwaileh',
    description: 'Muwaileh is a developing area with University City nearby, featuring educational institutions, residential compounds, and growing commercial facilities.',
    highlights: ['Near University City', 'Residential compounds', 'Growing area', 'Educational hub'],
    employmentSectors: ['Education', 'Retail', 'Construction', 'Services'],
    averageSalary: 'AED 4,000 - 12,000'
  },
  {
    slug: 'al-taawun',
    name: 'Al Taawun',
    description: 'Al Taawun is an upscale residential area near Al Mamzar, known for its high-rise towers, shopping destinations, and proximity to Dubai.',
    highlights: ['High-rise residential', 'Al Taawun Mall', 'Dubai proximity', 'Modern infrastructure'],
    employmentSectors: ['Retail', 'Real Estate', 'Services', 'Hospitality'],
    averageSalary: 'AED 5,000 - 14,000'
  },
  {
    slug: 'industrial-area',
    name: 'Industrial Area',
    description: 'Sharjah Industrial Area is a major manufacturing and logistics hub, hosting factories, warehouses, and trading companies. It\'s one of the largest industrial zones in the UAE.',
    highlights: ['Manufacturing hub', 'Warehouses', 'Trading companies', 'Logistics'],
    employmentSectors: ['Manufacturing', 'Logistics', 'Trading', 'Construction'],
    averageSalary: 'AED 3,000 - 10,000'
  },
  {
    slug: 'university-city',
    name: 'University City',
    description: 'University City is Sharjah\'s educational hub, hosting multiple universities and research institutions. It offers employment in education, research, and student services.',
    highlights: ['Multiple universities', 'Research centers', 'Student facilities', 'Academic hub'],
    employmentSectors: ['Education', 'Research', 'Services', 'Food & Beverage'],
    averageSalary: 'AED 6,000 - 20,000'
  },
  {
    slug: 'al-mamzar',
    name: 'Al Mamzar',
    description: 'Al Mamzar Sharjah borders Dubai\'s Al Mamzar area, featuring residential buildings, retail outlets, and easy access to Al Mamzar Beach Park.',
    highlights: ['Dubai border', 'Beach proximity', 'Residential area', 'Retail outlets'],
    employmentSectors: ['Retail', 'Hospitality', 'Services', 'Real Estate'],
    averageSalary: 'AED 4,000 - 12,000'
  },
  {
    slug: 'kalba',
    name: 'Kalba',
    description: 'Kalba is a coastal city on the east coast of Sharjah, known for its fishing industry, mangrove reserves, and historic fort. It offers a quieter lifestyle with growing tourism.',
    highlights: ['East coast location', 'Fishing industry', 'Mangrove reserves', 'Historic sites'],
    employmentSectors: ['Fishing', 'Tourism', 'Government', 'Retail'],
    averageSalary: 'AED 3,500 - 10,000'
  },
  {
    slug: 'khor-fakkan',
    name: 'Khor Fakkan',
    description: 'Khor Fakkan is a major port city on Sharjah\'s east coast, featuring a deep-water port, beaches, and mountain backdrop. Employment focuses on port operations and tourism.',
    highlights: ['Container port', 'Beautiful beaches', 'Mountain scenery', 'Tourism destination'],
    employmentSectors: ['Port Operations', 'Logistics', 'Tourism', 'Hospitality'],
    averageSalary: 'AED 4,000 - 12,000'
  },
  {
    slug: 'dibba',
    name: 'Dibba Al-Hisn',
    description: 'Dibba Al-Hisn is the northernmost point of Sharjah on the east coast, bordering Oman and Fujairah. It\'s known for diving, fishing, and eco-tourism.',
    highlights: ['Border town', 'Diving destination', 'Fishing village', 'Eco-tourism'],
    employmentSectors: ['Tourism', 'Fishing', 'Hospitality', 'Services'],
    averageSalary: 'AED 3,500 - 10,000'
  }
];

function getRelatedAreas(currentSlug: string) {
  return SHARJAH_AREAS.filter(a => a.slug !== currentSlug).slice(0, 6);
}

interface PageProps {
  params: { area: string };
}

export function generateMetadata({ params }: PageProps): Metadata {
  const area = SHARJAH_AREAS.find(a => a.slug === params.area);
  if (!area) {
    return { title: 'Area Not Found | Sharjah' };
  }
  return {
    title: `${area.name} Gratuity Calculator | UAE Labour Law 2026`,
    description: `Calculate your end of service gratuity in ${area.name}, Sharjah. ${area.description.slice(0, 120)}...`,
    keywords: [`${area.name} gratuity`, 'sharjah gratuity calculator', 'uae labour law', ...area.employmentSectors.map(s => `${s.toLowerCase()} jobs sharjah`)],
  };
}

export default function SharjahAreaPage({ params }: PageProps) {
  const area = SHARJAH_AREAS.find(a => a.slug === params.area);
  if (!area) notFound();

  const relatedAreas = getRelatedAreas(area.slug);

  return (
    <>
      <section className={styles.pageHero}>
        <div className="container">
          <nav aria-label="breadcrumb" className="mb-3">
            <ol className={styles.breadcrumb}>
              <li><Link href="/">Home</Link></li>
              <li><Link href="/sharjah">Sharjah</Link></li>
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
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="#2e7d32">
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
                <h3>Other Sharjah Areas</h3>
                <div className={styles.relatedList}>
                  {relatedAreas.map((r) => (
                    <Link key={r.slug} href={`/sharjah/${r.slug}`} className={styles.relatedItem}>
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
