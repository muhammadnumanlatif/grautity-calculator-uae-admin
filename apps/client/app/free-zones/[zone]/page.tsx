import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import GratuityCalculator from '@/components/calculator/GratuityCalculator';
import styles from './page.module.css';

const FREE_ZONES = [
  {
    slug: 'difc',
    name: 'DIFC',
    fullName: 'Dubai International Financial Centre',
    emirate: 'Dubai',
    hasSpecialRules: true,
    description: 'DIFC is a leading global financial centre in the Middle East, Africa, and South Asia region. It has its own civil and commercial laws, including employment regulations that differ from UAE Federal Labor Law.',
    gratuityRules: [
      '21 days of basic salary for each year of service',
      'Same rate applies for all years (no distinction between first 5 years and after)',
      'Minimum 1 year of service required',
      'Pro-rata calculation for partial years',
      'Based on last drawn basic salary',
    ],
    keyFacts: [
      'Governed by DIFC Employment Law No. 2 of 2019',
      'Home to major financial institutions',
      'Over 3,000 registered companies',
      'Independent legal system (common law)',
    ],
    website: 'https://www.difc.ae',
  },
  {
    slug: 'adgm',
    name: 'ADGM',
    fullName: 'Abu Dhabi Global Market',
    emirate: 'Abu Dhabi',
    hasSpecialRules: true,
    description: 'ADGM is an international financial centre located on Al Maryah Island in Abu Dhabi. It operates under its own employment regulations based on common law principles.',
    gratuityRules: [
      'Gratuity based on employment contract terms',
      'ADGM Employment Regulations 2019 apply',
      'Minimum service period as per contract',
      'Check employment contract for specific terms',
      'May differ from UAE Labor Law calculations',
    ],
    keyFacts: [
      'Governed by ADGM Employment Regulations',
      'Based on English common law',
      'Financial services hub',
      'Independent regulatory framework',
    ],
    website: 'https://www.adgm.com',
  },
  {
    slug: 'jafza',
    name: 'JAFZA',
    fullName: 'Jebel Ali Free Zone',
    emirate: 'Dubai',
    hasSpecialRules: false,
    description: 'JAFZA is one of the world\'s largest free zones, strategically located near Jebel Ali Port. It follows UAE Federal Labor Law for employment and gratuity calculations.',
    gratuityRules: [
      '21 days basic salary for each of first 5 years',
      '30 days basic salary for each year after 5 years',
      'Maximum gratuity capped at 2 years\' total salary',
      'Minimum 1 year of continuous service required',
      'Based on last drawn basic salary',
    ],
    keyFacts: [
      'Follows UAE Federal Labor Law',
      'Over 8,000 companies registered',
      'Adjacent to Jebel Ali Port',
      'Manufacturing and logistics hub',
    ],
    website: 'https://www.jafza.ae',
  },
  {
    slug: 'dmcc',
    name: 'DMCC',
    fullName: 'Dubai Multi Commodities Centre',
    emirate: 'Dubai',
    hasSpecialRules: false,
    description: 'DMCC is an award-winning free zone and the largest in the UAE by number of companies. It follows standard UAE Labor Law for gratuity calculations.',
    gratuityRules: [
      '21 days basic salary for each of first 5 years',
      '30 days basic salary for each year after 5 years',
      'Maximum gratuity capped at 2 years\' total salary',
      'Minimum 1 year of continuous service required',
      'Based on last drawn basic salary',
    ],
    keyFacts: [
      'Follows UAE Federal Labor Law',
      'World\'s #1 free zone (multiple years)',
      'Located in JLT area',
      'Commodities and trading focus',
    ],
    website: 'https://www.dmcc.ae',
  },
  {
    slug: 'saif-zone',
    name: 'SAIF Zone',
    fullName: 'Sharjah Airport International Free Zone',
    emirate: 'Sharjah',
    hasSpecialRules: false,
    description: 'SAIF Zone is strategically located near Sharjah International Airport, offering businesses access to global markets. It follows UAE Federal Labor Law.',
    gratuityRules: [
      '21 days basic salary for each of first 5 years',
      '30 days basic salary for each year after 5 years',
      'Maximum gratuity capped at 2 years\' total salary',
      'Minimum 1 year of continuous service required',
      'Based on last drawn basic salary',
    ],
    keyFacts: [
      'Follows UAE Federal Labor Law',
      'Near Sharjah International Airport',
      'Cost-effective business setup',
      'Trading and logistics focus',
    ],
    website: 'https://www.saif-zone.com',
  },
  {
    slug: 'hamriyah',
    name: 'Hamriyah Free Zone',
    fullName: 'Hamriyah Free Zone Authority',
    emirate: 'Sharjah',
    hasSpecialRules: false,
    description: 'Hamriyah Free Zone is an industrial free zone with port facilities, ideal for manufacturing, oil & gas, and heavy industries. It follows UAE Federal Labor Law.',
    gratuityRules: [
      '21 days basic salary for each of first 5 years',
      '30 days basic salary for each year after 5 years',
      'Maximum gratuity capped at 2 years\' total salary',
      'Minimum 1 year of continuous service required',
      'Based on last drawn basic salary',
    ],
    keyFacts: [
      'Follows UAE Federal Labor Law',
      'Industrial and port facilities',
      'Oil & gas sector presence',
      'Manufacturing hub',
    ],
    website: 'https://www.hfza.ae',
  },
  {
    slug: 'dafza',
    name: 'DAFZA',
    fullName: 'Dubai Airport Free Zone',
    emirate: 'Dubai',
    hasSpecialRules: false,
    description: 'DAFZA is located adjacent to Dubai International Airport, making it ideal for aviation, logistics, and trading businesses. Follows UAE Federal Labor Law.',
    gratuityRules: [
      '21 days basic salary for each of first 5 years',
      '30 days basic salary for each year after 5 years',
      'Maximum gratuity capped at 2 years\' total salary',
      'Minimum 1 year of continuous service required',
      'Based on last drawn basic salary',
    ],
    keyFacts: [
      'Follows UAE Federal Labor Law',
      'Adjacent to Dubai International Airport',
      'Aviation and logistics hub',
      'Easy cargo movement',
    ],
    website: 'https://www.dafz.ae',
  },
  {
    slug: 'dso',
    name: 'DSO',
    fullName: 'Dubai Silicon Oasis',
    emirate: 'Dubai',
    hasSpecialRules: false,
    description: 'Dubai Silicon Oasis is a technology park and free zone designed for tech companies and startups. It follows UAE Federal Labor Law for employment.',
    gratuityRules: [
      '21 days basic salary for each of first 5 years',
      '30 days basic salary for each year after 5 years',
      'Maximum gratuity capped at 2 years\' total salary',
      'Minimum 1 year of continuous service required',
      'Based on last drawn basic salary',
    ],
    keyFacts: [
      'Follows UAE Federal Labor Law',
      'Technology and innovation hub',
      'Integrated tech ecosystem',
      'Startup friendly environment',
    ],
    website: 'https://www.dsoa.ae',
  },
  {
    slug: 'tecom',
    name: 'TECOM',
    fullName: 'Dubai Internet City & Media City',
    emirate: 'Dubai',
    hasSpecialRules: false,
    description: 'TECOM encompasses Dubai Internet City, Dubai Media City, and other specialized clusters for technology, media, and creative industries.',
    gratuityRules: [
      '21 days basic salary for each of first 5 years',
      '30 days basic salary for each year after 5 years',
      'Maximum gratuity capped at 2 years\' total salary',
      'Minimum 1 year of continuous service required',
      'Based on last drawn basic salary',
    ],
    keyFacts: [
      'Follows UAE Federal Labor Law',
      'Tech and media industries hub',
      'Home to global tech giants',
      'Creative industry cluster',
    ],
    website: 'https://www.tecom.ae',
  },
  {
    slug: 'rak-ftz',
    name: 'RAK FTZ',
    fullName: 'Ras Al Khaimah Free Trade Zone',
    emirate: 'Ras Al Khaimah',
    hasSpecialRules: false,
    description: 'RAK FTZ offers cost-effective business setup in Ras Al Khaimah with access to port facilities. Follows UAE Federal Labor Law.',
    gratuityRules: [
      '21 days basic salary for each of first 5 years',
      '30 days basic salary for each year after 5 years',
      'Maximum gratuity capped at 2 years\' total salary',
      'Minimum 1 year of continuous service required',
      'Based on last drawn basic salary',
    ],
    keyFacts: [
      'Follows UAE Federal Labor Law',
      'Cost-effective setup',
      'Port and airport access',
      'Growing industrial hub',
    ],
    website: 'https://www.rakftz.com',
  },
  {
    slug: 'ajman-free-zone',
    name: 'Ajman Free Zone',
    fullName: 'Ajman Free Zone Authority',
    emirate: 'Ajman',
    hasSpecialRules: false,
    description: 'Ajman Free Zone offers affordable business setup options, particularly attractive for SMEs and startups. Follows UAE Federal Labor Law.',
    gratuityRules: [
      '21 days basic salary for each of first 5 years',
      '30 days basic salary for each year after 5 years',
      'Maximum gratuity capped at 2 years\' total salary',
      'Minimum 1 year of continuous service required',
      'Based on last drawn basic salary',
    ],
    keyFacts: [
      'Follows UAE Federal Labor Law',
      'Most affordable free zone',
      'Ideal for SMEs',
      'Quick business setup',
    ],
    website: 'https://www.afz.gov.ae',
  },
  {
    slug: 'fujairah-free-zone',
    name: 'Fujairah Free Zone',
    fullName: 'Fujairah Free Zone Authority',
    emirate: 'Fujairah',
    hasSpecialRules: false,
    description: 'Fujairah Free Zone offers access to the east coast port and strategic location outside the Strait of Hormuz. Follows UAE Federal Labor Law.',
    gratuityRules: [
      '21 days basic salary for each of first 5 years',
      '30 days basic salary for each year after 5 years',
      'Maximum gratuity capped at 2 years\' total salary',
      'Minimum 1 year of continuous service required',
      'Based on last drawn basic salary',
    ],
    keyFacts: [
      'Follows UAE Federal Labor Law',
      'East coast port access',
      'Oil storage and bunkering',
      'Strategic location',
    ],
    website: 'https://www.fujairahfreezone.com',
  },
];

function getRelatedZones(currentSlug: string) {
  return FREE_ZONES.filter(z => z.slug !== currentSlug).slice(0, 4);
}

interface PageProps {
  params: { zone: string };
}

export function generateMetadata({ params }: PageProps): Metadata {
  const zone = FREE_ZONES.find(z => z.slug === params.zone);
  if (!zone) {
    return { title: 'Free Zone Not Found' };
  }
  return {
    title: `${zone.name} Gratuity Calculator | ${zone.fullName} 2026`,
    description: `Calculate your gratuity in ${zone.name} (${zone.fullName}). ${zone.hasSpecialRules ? 'Special gratuity rules apply.' : 'Follows UAE Labor Law.'} ${zone.description.slice(0, 100)}...`,
    keywords: [
      `${zone.name.toLowerCase()} gratuity`,
      `${zone.name.toLowerCase()} gratuity calculator`,
      `${zone.fullName.toLowerCase()} end of service`,
      `${zone.emirate.toLowerCase()} free zone gratuity`,
    ],
  };
}

export function generateStaticParams() {
  return FREE_ZONES.map((zone) => ({
    zone: zone.slug,
  }));
}

export default function FreeZonePage({ params }: PageProps) {
  const zone = FREE_ZONES.find(z => z.slug === params.zone);
  if (!zone) notFound();

  const relatedZones = getRelatedZones(zone.slug);

  return (
    <>
      <section className={styles.pageHero}>
        <div className="container">
          <nav aria-label="breadcrumb" className="mb-3">
            <ol className={styles.breadcrumb}>
              <li><Link href="/">Home</Link></li>
              <li><Link href="/free-zones">Free Zones</Link></li>
              <li>{zone.name}</li>
            </ol>
          </nav>
          <div className={styles.heroContent}>
            <div>
              <h1>{zone.name} Gratuity Calculator</h1>
              <p className={styles.fullName}>{zone.fullName}</p>
              {zone.hasSpecialRules && (
                <span className={styles.specialBadge}>Special Gratuity Rules Apply</span>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="py-5">
        <div className="container">
          <div className="row g-4">
            <div className="col-lg-7">
              <div className={styles.contentCard}>
                <h2>About {zone.name}</h2>
                <p>{zone.description}</p>
                <p className={styles.emirateTag}>
                  <strong>Emirate:</strong> {zone.emirate}
                </p>
              </div>

              <div className={styles.contentCard}>
                <h2>Gratuity Rules in {zone.name}</h2>
                <ul className={styles.rulesList}>
                  {zone.gratuityRules.map((rule, i) => (
                    <li key={i}>{rule}</li>
                  ))}
                </ul>
                {zone.hasSpecialRules && (
                  <div className={styles.warningBox}>
                    <strong>Important:</strong> {zone.name} has its own employment regulations.
                    Always refer to your employment contract for specific terms.
                  </div>
                )}
              </div>

              <div className={styles.calculatorSection}>
                <h2>Calculate Your Gratuity</h2>
                <GratuityCalculator showFreeZone={zone.hasSpecialRules} />
              </div>
            </div>

            <div className="col-lg-5">
              <div className={styles.sidebarCard}>
                <h3>Key Facts</h3>
                <ul className={styles.factsList}>
                  {zone.keyFacts.map((fact, i) => (
                    <li key={i}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="#1565c0">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                      </svg>
                      <span>{fact}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className={styles.sidebarCard}>
                <h3>Official Website</h3>
                <a href={zone.website} target="_blank" rel="noopener noreferrer" className={styles.websiteLink}>
                  Visit {zone.name} Official Site
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"/>
                  </svg>
                </a>
              </div>

              <div className={styles.sidebarCard}>
                <h3>Other Free Zones</h3>
                <div className={styles.relatedList}>
                  {relatedZones.map((z) => (
                    <Link key={z.slug} href={`/free-zones/${z.slug}`} className={styles.relatedItem}>
                      <div>
                        <span className={styles.relatedName}>{z.name}</span>
                        <span className={styles.relatedEmirate}>{z.emirate}</span>
                      </div>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
                      </svg>
                    </Link>
                  ))}
                </div>
                <Link href="/free-zones" className={styles.viewAllLink}>
                  View All Free Zones →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
