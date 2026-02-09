import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import styles from './page.module.css';

const FUJAIRAH_AREAS = [
  {
    slug: 'city',
    name: 'Fujairah City',
    description: 'Fujairah City is the capital and largest city of Fujairah Emirate, featuring the historic Fujairah Fort, government offices, and the main commercial district. It offers diverse employment opportunities across multiple sectors.',
    highlights: ['Fujairah Fort', 'Government center', 'Commercial district', 'Port access'],
    employmentSectors: ['Government', 'Trading', 'Logistics', 'Services'],
    averageSalary: 'AED 5,000 - 15,000'
  },
  {
    slug: 'dibba',
    name: 'Dibba Al Fujairah',
    description: 'Dibba Al Fujairah is a coastal town at the northern tip of Fujairah, known for its fishing industry, diving spots, and tourism. It borders Oman and Sharjah\'s Dibba regions.',
    highlights: ['Fishing industry', 'Diving destination', 'Border town', 'Tourism hub'],
    employmentSectors: ['Tourism', 'Fishing', 'Hospitality', 'Retail'],
    averageSalary: 'AED 3,500 - 10,000'
  },
  {
    slug: 'al-faseel',
    name: 'Al Faseel',
    description: 'Al Faseel is a residential and commercial area in Fujairah City, known for its proximity to the corniche and waterfront developments. It offers employment in hospitality and retail.',
    highlights: ['Corniche proximity', 'Waterfront area', 'Hotels', 'Residential district'],
    employmentSectors: ['Hospitality', 'Retail', 'Real Estate', 'Services'],
    averageSalary: 'AED 4,000 - 12,000'
  },
  {
    slug: 'mirbah',
    name: 'Mirbah',
    description: 'Mirbah is a coastal village south of Fujairah City, known for its beaches, fishing community, and agricultural activities. It maintains a traditional lifestyle with growing tourism.',
    highlights: ['Coastal village', 'Fishing community', 'Beaches', 'Agriculture'],
    employmentSectors: ['Fishing', 'Agriculture', 'Tourism', 'Services'],
    averageSalary: 'AED 3,000 - 8,000'
  },
  {
    slug: 'qidfa',
    name: 'Qidfa',
    description: 'Qidfa is a town south of Fujairah City, featuring residential areas and local businesses. It serves as a quiet residential community with basic commercial services.',
    highlights: ['Residential area', 'Local businesses', 'Community services', 'Quiet lifestyle'],
    employmentSectors: ['Retail', 'Services', 'Education', 'Healthcare'],
    averageSalary: 'AED 3,500 - 9,000'
  },
  {
    slug: 'masafi',
    name: 'Masafi',
    description: 'Masafi is a mountainous town famous for its Friday Market and natural spring water. Located between Fujairah and the western UAE, it\'s a popular stopover for travelers.',
    highlights: ['Friday Market', 'Masafi Water', 'Mountain location', 'Tourist stopover'],
    employmentSectors: ['Retail', 'Tourism', 'Manufacturing', 'Services'],
    averageSalary: 'AED 3,000 - 8,000'
  },
  {
    slug: 'al-bidya',
    name: 'Al Bidya',
    description: 'Al Bidya is home to the oldest mosque in the UAE, the Al Bidya Mosque. This historic coastal village attracts tourists and researchers interested in UAE heritage.',
    highlights: ['Al Bidya Mosque', 'Historic site', 'Coastal village', 'Heritage tourism'],
    employmentSectors: ['Tourism', 'Heritage', 'Fishing', 'Services'],
    averageSalary: 'AED 3,000 - 8,000'
  }
];

function getRelatedAreas(currentSlug: string) {
  return FUJAIRAH_AREAS.filter(a => a.slug !== currentSlug).slice(0, 6);
}

interface PageProps {
  params: { area: string };
}

export function generateMetadata({ params }: PageProps): Metadata {
  const area = FUJAIRAH_AREAS.find(a => a.slug === params.area);
  if (!area) {
    return { title: 'Area Not Found | Fujairah' };
  }
  return {
    title: `${area.name} Gratuity Calculator | UAE Labour Law 2026`,
    description: `Calculate your end of service gratuity in ${area.name}, Fujairah. ${area.description.slice(0, 120)}...`,
    keywords: [`${area.name} gratuity`, 'fujairah gratuity calculator', 'uae labour law', ...area.employmentSectors.map(s => `${s.toLowerCase()} jobs fujairah`)],
  };
}

export default function FujairahAreaPage({ params }: PageProps) {
  const area = FUJAIRAH_AREAS.find(a => a.slug === params.area);
  if (!area) notFound();

  const relatedAreas = getRelatedAreas(area.slug);

  return (
    <>
      <section className={styles.pageHero}>
        <div className="container">
          <nav aria-label="breadcrumb" className="mb-3">
            <ol className={styles.breadcrumb}>
              <li><Link href="/">Home</Link></li>
              <li><Link href="/fujairah">Fujairah</Link></li>
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
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="#d35400">
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
                <h3>Other Fujairah Areas</h3>
                <div className={styles.relatedList}>
                  {relatedAreas.map((r) => (
                    <Link key={r.slug} href={`/fujairah/${r.slug}`} className={styles.relatedItem}>
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
