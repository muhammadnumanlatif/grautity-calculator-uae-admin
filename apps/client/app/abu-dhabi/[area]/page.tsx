import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import styles from './page.module.css';

// Abu Dhabi Areas data
const ABU_DHABI_AREAS = [
  {
    slug: 'city',
    name: 'Abu Dhabi City',
    description: 'Abu Dhabi City is the capital\'s urban center, home to government offices, major corporations, and cultural institutions. The area offers diverse employment opportunities across public and private sectors.',
    highlights: ['Government headquarters', 'Major corporate offices', 'Cultural institutions', 'Premium retail'],
    employmentSectors: ['Government', 'Finance', 'Corporate Services', 'Retail'],
    averageSalary: 'AED 10,000 - 30,000'
  },
  {
    slug: 'reem-island',
    name: 'Al Reem Island',
    description: 'Al Reem Island is a modern mixed-use development featuring residential towers, offices, and retail spaces. It\'s becoming a major business hub with numerous corporate tenants.',
    highlights: ['Modern business district', 'Waterfront living', 'Shopping destinations', 'Educational institutions'],
    employmentSectors: ['Real Estate', 'Finance', 'Retail', 'Education'],
    averageSalary: 'AED 8,000 - 25,000'
  },
  {
    slug: 'yas-island',
    name: 'Yas Island',
    description: 'Yas Island is Abu Dhabi\'s entertainment destination, featuring theme parks, hotels, and the Yas Marina Circuit. It\'s a major employer in hospitality and entertainment.',
    highlights: ['Ferrari World', 'Yas Waterworld', 'Warner Bros. World', 'Yas Marina Circuit'],
    employmentSectors: ['Entertainment', 'Hospitality', 'Events', 'Retail'],
    averageSalary: 'AED 5,000 - 18,000'
  },
  {
    slug: 'saadiyat-island',
    name: 'Saadiyat Island',
    description: 'Saadiyat Island is Abu Dhabi\'s cultural district, home to the Louvre Abu Dhabi and future Guggenheim. It offers employment in arts, culture, hospitality, and education.',
    highlights: ['Louvre Abu Dhabi', 'NYU Abu Dhabi', 'Luxury resorts', 'Cultural venues'],
    employmentSectors: ['Arts & Culture', 'Education', 'Hospitality', 'Tourism'],
    averageSalary: 'AED 8,000 - 25,000'
  },
  {
    slug: 'khalifa-city',
    name: 'Khalifa City',
    description: 'Khalifa City is a large residential community with growing commercial areas. It offers employment in retail, healthcare, and education sectors.',
    highlights: ['Residential community', 'Healthcare facilities', 'Schools', 'Retail centers'],
    employmentSectors: ['Healthcare', 'Education', 'Retail', 'Services'],
    averageSalary: 'AED 6,000 - 15,000'
  },
  {
    slug: 'mbz-city',
    name: 'Mohamed Bin Zayed City',
    description: 'MBZ City is a major residential area with commercial zones, schools, and healthcare facilities. It\'s one of the most populous areas of Abu Dhabi.',
    highlights: ['Large residential area', 'Shopping malls', 'Healthcare centers', 'Educational institutions'],
    employmentSectors: ['Retail', 'Healthcare', 'Education', 'Services'],
    averageSalary: 'AED 5,000 - 12,000'
  },
  {
    slug: 'mushrif',
    name: 'Al Mushrif',
    description: 'Al Mushrif is a prestigious residential area near the city center with upscale villas and amenities. Employment opportunities exist in household services and nearby businesses.',
    highlights: ['Upscale residential', 'Mushrif Mall', 'Parks and recreation', 'Close to city center'],
    employmentSectors: ['Retail', 'Hospitality', 'Services', 'Healthcare'],
    averageSalary: 'AED 5,000 - 15,000'
  },
  {
    slug: 'al-nahyan',
    name: 'Al Nahyan',
    description: 'Al Nahyan is a central Abu Dhabi district known for its sports facilities and residential areas. It hosts various sports events and related employment.',
    highlights: ['Al Nahyan Stadium', 'Sports facilities', 'Central location', 'Mixed-use development'],
    employmentSectors: ['Sports', 'Events', 'Retail', 'Services'],
    averageSalary: 'AED 5,000 - 14,000'
  },
  {
    slug: 'tourist-club',
    name: 'Tourist Club Area',
    description: 'Tourist Club Area (TCA) is a bustling commercial district with hotels, shopping, and dining. It\'s a major employment hub for hospitality and retail.',
    highlights: ['Abu Dhabi Mall', 'Hotels', 'Restaurants', 'Commercial offices'],
    employmentSectors: ['Hospitality', 'Retail', 'Food & Beverage', 'Tourism'],
    averageSalary: 'AED 4,000 - 12,000'
  },
  {
    slug: 'corniche',
    name: 'Corniche',
    description: 'The Corniche is Abu Dhabi\'s iconic waterfront promenade, lined with hotels, parks, and recreational facilities. It\'s a prime location for hospitality employment.',
    highlights: ['Waterfront promenade', 'Luxury hotels', 'Beach facilities', 'Parks and gardens'],
    employmentSectors: ['Hospitality', 'Tourism', 'Food & Beverage', 'Recreation'],
    averageSalary: 'AED 5,000 - 18,000'
  },
  {
    slug: 'mussafah',
    name: 'Mussafah',
    description: 'Mussafah is Abu Dhabi\'s industrial heartland, featuring manufacturing, logistics, and trading companies. It\'s the largest industrial area in the emirate.',
    highlights: ['Industrial zone', 'Logistics hub', 'Manufacturing', 'Trading companies'],
    employmentSectors: ['Manufacturing', 'Logistics', 'Trading', 'Construction'],
    averageSalary: 'AED 3,500 - 12,000'
  },
  {
    slug: 'al-ain',
    name: 'Al Ain',
    description: 'Al Ain is the UAE\'s second-largest city in Abu Dhabi Emirate, known as the Garden City. It offers diverse employment in education, healthcare, and agriculture.',
    highlights: ['UAE University', 'Al Ain Zoo', 'Heritage sites', 'Agricultural sector'],
    employmentSectors: ['Education', 'Healthcare', 'Agriculture', 'Tourism'],
    averageSalary: 'AED 5,000 - 15,000'
  },
  {
    slug: 'al-dhafra',
    name: 'Al Dhafra',
    description: 'Al Dhafra region covers the western part of Abu Dhabi Emirate, including oil and gas operations and renewable energy projects.',
    highlights: ['Oil & gas operations', 'Renewable energy', 'Desert tourism', 'Military facilities'],
    employmentSectors: ['Oil & Gas', 'Energy', 'Government', 'Services'],
    averageSalary: 'AED 8,000 - 25,000'
  },
  {
    slug: 'madinat-zayed',
    name: 'Madinat Zayed',
    description: 'Madinat Zayed is the main urban center of the Al Dhafra region, serving as a hub for the western region\'s administration and services.',
    highlights: ['Regional center', 'Government services', 'Shopping facilities', 'Healthcare'],
    employmentSectors: ['Government', 'Retail', 'Healthcare', 'Services'],
    averageSalary: 'AED 5,000 - 15,000'
  },
  {
    slug: 'al-shamkha',
    name: 'Al Shamkha',
    description: 'Al Shamkha is a developing residential area on the outskirts of Abu Dhabi city, with growing commercial and service infrastructure.',
    highlights: ['Developing community', 'Affordable housing', 'Growing infrastructure', 'Family-oriented'],
    employmentSectors: ['Retail', 'Services', 'Construction', 'Education'],
    averageSalary: 'AED 4,000 - 10,000'
  },
  {
    slug: 'baniyas',
    name: 'Baniyas',
    description: 'Baniyas is a suburban area northeast of Abu Dhabi city, with residential communities, schools, and shopping centers.',
    highlights: ['Residential area', 'Baniyas Mall', 'Schools', 'Community facilities'],
    employmentSectors: ['Retail', 'Education', 'Services', 'Healthcare'],
    averageSalary: 'AED 4,000 - 11,000'
  },
  {
    slug: 'al-wathba',
    name: 'Al Wathba',
    description: 'Al Wathba is known for its camel racing track and wetland reserve. The area is developing with residential and commercial projects.',
    highlights: ['Camel racing track', 'Wetland reserve', 'Developing area', 'Traditional activities'],
    employmentSectors: ['Sports', 'Tourism', 'Construction', 'Services'],
    averageSalary: 'AED 4,000 - 12,000'
  },
  {
    slug: 'al-raha-beach',
    name: 'Al Raha Beach',
    description: 'Al Raha Beach is a waterfront development near Abu Dhabi Airport, featuring residential, commercial, and hospitality establishments.',
    highlights: ['Waterfront living', 'Al Raha Mall', 'Hotels', 'Near airport'],
    employmentSectors: ['Hospitality', 'Retail', 'Real Estate', 'Food & Beverage'],
    averageSalary: 'AED 6,000 - 18,000'
  },
  {
    slug: 'al-maryah-island',
    name: 'Al Maryah Island',
    description: 'Al Maryah Island is home to Abu Dhabi Global Market (ADGM) and is a major financial and healthcare hub with premium retail.',
    highlights: ['ADGM headquarters', 'Cleveland Clinic', 'Galleria Mall', 'Financial district'],
    employmentSectors: ['Finance', 'Healthcare', 'Retail', 'Professional Services'],
    averageSalary: 'AED 12,000 - 40,000'
  }
];

// Get related areas
function getRelatedAreas(currentSlug: string) {
  return ABU_DHABI_AREAS.filter(a => a.slug !== currentSlug).slice(0, 6);
}

interface PageProps {
  params: { area: string };
}

export function generateMetadata({ params }: PageProps): Metadata {
  const area = ABU_DHABI_AREAS.find(a => a.slug === params.area);
  if (!area) {
    return { title: 'Area Not Found | Abu Dhabi' };
  }
  return {
    title: `${area.name} Gratuity Calculator | UAE Labour Law 2026`,
    description: `Calculate your end of service gratuity in ${area.name}, Abu Dhabi. ${area.description.slice(0, 120)}...`,
    keywords: [`${area.name} gratuity`, 'abu dhabi gratuity calculator', 'uae labour law', ...area.employmentSectors.map(s => `${s.toLowerCase()} jobs abu dhabi`)],
  };
}

export default function AbuDhabiAreaPage({ params }: PageProps) {
  const area = ABU_DHABI_AREAS.find(a => a.slug === params.area);

  if (!area) {
    notFound();
  }

  const relatedAreas = getRelatedAreas(area.slug);

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: `${area.name} Gratuity Calculator - End of Service Benefits`,
    description: area.description,
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
                  {area.highlights.map((highlight, index) => (
                    <div key={index} className={styles.highlightItem}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="#0066cc">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                      </svg>
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className={styles.contentCard}>
                <h2>Gratuity Information</h2>
                <p>Employees in {area.name} follow UAE Labour Law for gratuity calculations:</p>
                <ul className={styles.rulesList}>
                  <li>21 days basic salary per year for first 5 years</li>
                  <li>30 days basic salary per year after 5 years</li>
                  <li>Minimum 1 year service required</li>
                  <li>Based on last drawn basic salary</li>
                </ul>
              </div>

              <div className={styles.ctaCard}>
                <h3>Calculate Your Gratuity</h3>
                <p>Working in {area.name}? Estimate your end of service benefits now.</p>
                <Link href="/#calculator" className="btn btn-primary btn-lg">
                  Calculate Now
                </Link>
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
                  {area.employmentSectors.map((sector, index) => (
                    <span key={index} className={styles.sectorTag}>{sector}</span>
                  ))}
                </div>
              </div>

              <div className={styles.sidebarCard}>
                <h3>Other Abu Dhabi Areas</h3>
                <div className={styles.relatedList}>
                  {relatedAreas.map((related) => (
                    <Link key={related.slug} href={`/abu-dhabi/${related.slug}`} className={styles.relatedItem}>
                      <span>{related.name}</span>
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
