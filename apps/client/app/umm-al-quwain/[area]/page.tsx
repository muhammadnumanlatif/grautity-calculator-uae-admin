import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import styles from './page.module.css';

const UAQ_AREAS = [
  {
    slug: 'city',
    name: 'UAQ City',
    description: 'UAQ City is the capital and main urban center of Umm Al Quwain emirate. It features the Corniche, government offices, and the main commercial areas. The city offers a relaxed lifestyle with growing employment opportunities.',
    highlights: ['UAQ Corniche', 'Government center', 'Commercial district', 'Fishing harbor'],
    employmentSectors: ['Government', 'Trading', 'Fishing', 'Services'],
    averageSalary: 'AED 4,000 - 12,000'
  },
  {
    slug: 'old-town',
    name: 'Old Town',
    description: 'UAQ Old Town is the historic heart of the emirate, featuring traditional architecture, the old fort, and heritage sites. It preserves the authentic Emirati culture and offers tourism-related employment.',
    highlights: ['UAQ Fort', 'Heritage sites', 'Traditional souks', 'Historic architecture'],
    employmentSectors: ['Tourism', 'Heritage', 'Retail', 'Services'],
    averageSalary: 'AED 3,500 - 10,000'
  },
  {
    slug: 'al-salamah',
    name: 'Al Salamah',
    description: 'Al Salamah is a residential and commercial area in Umm Al Quwain, featuring modern housing developments and local businesses. It serves as a growing community with affordable living options.',
    highlights: ['Residential area', 'Local businesses', 'Modern developments', 'Family-friendly'],
    employmentSectors: ['Retail', 'Services', 'Education', 'Healthcare'],
    averageSalary: 'AED 3,500 - 10,000'
  },
  {
    slug: 'al-raas',
    name: 'Al Raas',
    description: 'Al Raas is the peninsula area of Umm Al Quwain, known for its waterfront location and traditional fishing community. It offers scenic views and maintains the emirate\'s maritime heritage.',
    highlights: ['Peninsula location', 'Waterfront views', 'Fishing community', 'Traditional area'],
    employmentSectors: ['Fishing', 'Tourism', 'Hospitality', 'Services'],
    averageSalary: 'AED 3,000 - 9,000'
  },
  {
    slug: 'falaj-al-mualla',
    name: 'Falaj Al Mualla',
    description: 'Falaj Al Mualla is an inland area of Umm Al Quwain, featuring agricultural land, date palm farms, and quieter residential communities. It represents the traditional agricultural side of the emirate.',
    highlights: ['Agricultural area', 'Date palm farms', 'Quiet lifestyle', 'Inland location'],
    employmentSectors: ['Agriculture', 'Farming', 'Services', 'Retail'],
    averageSalary: 'AED 3,000 - 8,000'
  }
];

function getRelatedAreas(currentSlug: string) {
  return UAQ_AREAS.filter(a => a.slug !== currentSlug);
}

interface PageProps {
  params: { area: string };
}

export function generateMetadata({ params }: PageProps): Metadata {
  const area = UAQ_AREAS.find(a => a.slug === params.area);
  if (!area) {
    return { title: 'Area Not Found | Umm Al Quwain' };
  }
  return {
    title: `${area.name} Gratuity Calculator | UAE Labour Law 2026`,
    description: `Calculate your end of service gratuity in ${area.name}, Umm Al Quwain. ${area.description.slice(0, 120)}...`,
    keywords: [`${area.name} gratuity`, 'umm al quwain gratuity calculator', 'uae labour law', ...area.employmentSectors.map(s => `${s.toLowerCase()} jobs uaq`)],
  };
}

export default function UAQAreaPage({ params }: PageProps) {
  const area = UAQ_AREAS.find(a => a.slug === params.area);
  if (!area) notFound();

  const relatedAreas = getRelatedAreas(area.slug);

  return (
    <>
      <section className={styles.pageHero}>
        <div className="container">
          <nav aria-label="breadcrumb" className="mb-3">
            <ol className={styles.breadcrumb}>
              <li><Link href="/">Home</Link></li>
              <li><Link href="/umm-al-quwain">Umm Al Quwain</Link></li>
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
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="#0097a7">
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
                <h3>Other UAQ Areas</h3>
                <div className={styles.relatedList}>
                  {relatedAreas.map((r) => (
                    <Link key={r.slug} href={`/umm-al-quwain/${r.slug}`} className={styles.relatedItem}>
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
