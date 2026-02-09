import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import styles from './page.module.css';

// Abu Dhabi Free Zones data
const ABU_DHABI_FREE_ZONES = [
  {
    slug: 'adgm',
    name: 'ADGM',
    fullName: 'Abu Dhabi Global Market',
    description: 'ADGM is Abu Dhabi\'s international financial centre with its own civil and commercial laws based on English common law. It has specific employment regulations that differ from UAE Labour Law.',
    gratuityRules: [
      'ADGM Employment Regulations 2019 apply',
      '21 days basic wage per year for first 5 years',
      '30 days basic wage per year after 5 years',
      'Maximum cap of 2 years total basic wage',
      'Pro-rata for incomplete years',
      'No gratuity if less than 1 year service'
    ],
    keyFeatures: ['International financial centre', 'English common law', 'Own court system', 'Financial services hub'],
    established: '2013',
    authority: 'ADGM Registration Authority',
    employees: '5,000+',
    companies: '1,500+'
  },
  {
    slug: 'masdar',
    name: 'Masdar City',
    fullName: 'Masdar City Free Zone',
    description: 'Masdar City is a sustainable urban development and clean-tech cluster. The free zone focuses on renewable energy, sustainability, and advanced technology companies.',
    gratuityRules: [
      'UAE Labour Law applies',
      '21 days salary per year (first 5 years)',
      '30 days salary per year (after 5 years)',
      'Standard end of service calculation',
      'Full entitlement after 1 year'
    ],
    keyFeatures: ['Sustainability focus', 'Clean technology hub', 'Research institutions', 'Smart city infrastructure'],
    established: '2006',
    authority: 'Masdar Free Zone Authority',
    employees: '4,000+',
    companies: '800+'
  },
  {
    slug: 'kizad',
    name: 'KIZAD',
    fullName: 'Khalifa Industrial Zone Abu Dhabi',
    description: 'KIZAD is one of the largest industrial zones in the world, offering manufacturing, logistics, and trading facilities with excellent port connectivity.',
    gratuityRules: [
      'UAE Labour Law provisions apply',
      'Standard 21/30 day formula',
      'Industrial sector standards',
      'End of service per federal regulations',
      'Pro-rata calculations apply'
    ],
    keyFeatures: ['Largest industrial zone', 'Port connectivity', 'Manufacturing hub', 'Logistics facilities'],
    established: '2010',
    authority: 'AD Ports Group',
    employees: '25,000+',
    companies: '600+'
  },
  {
    slug: 'twofour54',
    name: 'twofour54',
    fullName: 'twofour54 Abu Dhabi',
    description: 'twofour54 is Abu Dhabi\'s media free zone, supporting the production of Arabic and international content across film, broadcast, music, and digital media.',
    gratuityRules: [
      'UAE Labour Law applies',
      '21 days per year (first 5 years)',
      '30 days per year thereafter',
      'Media industry contracts',
      'Standard gratuity entitlements'
    ],
    keyFeatures: ['Media production hub', 'Film studios', 'Broadcast facilities', 'Gaming sector'],
    established: '2008',
    authority: 'twofour54',
    employees: '3,500+',
    companies: '600+'
  },
  {
    slug: 'aafz',
    name: 'AAFZ',
    fullName: 'Abu Dhabi Airport Free Zone',
    description: 'Abu Dhabi Airport Free Zone offers strategic location adjacent to Abu Dhabi International Airport, ideal for logistics, trading, and aviation-related businesses.',
    gratuityRules: [
      'Standard UAE Labour Law',
      '21 days (first 5 years)',
      '30 days (after 5 years)',
      'Aviation sector standards',
      'Full gratuity after 1 year'
    ],
    keyFeatures: ['Airport proximity', 'Logistics hub', 'Aviation services', 'Trading facilities'],
    established: '2007',
    authority: 'Abu Dhabi Airports',
    employees: '8,000+',
    companies: '400+'
  },
  {
    slug: 'icad',
    name: 'ICAD',
    fullName: 'Industrial City of Abu Dhabi',
    description: 'ICAD is a major industrial zone in Mussafah, hosting manufacturing, heavy industries, and logistics operations. It\'s central to Abu Dhabi\'s industrial development.',
    gratuityRules: [
      'UAE Labour Law provisions',
      'Standard gratuity formula',
      'Manufacturing sector standards',
      '21/30 day calculation',
      'Industrial employment terms'
    ],
    keyFeatures: ['Heavy industries', 'Manufacturing facilities', 'Logistics operations', 'Industrial services'],
    established: '2004',
    authority: 'ZonesCorp',
    employees: '50,000+',
    companies: '1,200+'
  },
  {
    slug: 'zonescorp',
    name: 'ZonesCorp',
    fullName: 'Abu Dhabi Economic Zones Corporation',
    description: 'ZonesCorp manages multiple industrial and economic zones across Abu Dhabi, providing integrated solutions for manufacturing and logistics companies.',
    gratuityRules: [
      'UAE Labour Law compliance',
      'Standard 21/30 day formula',
      'Industrial employment standards',
      'End of service benefits apply',
      'Pro-rata for partial years'
    ],
    keyFeatures: ['Multiple zones', 'Integrated solutions', 'Manufacturing focus', 'Logistics support'],
    established: '2004',
    authority: 'ZonesCorp',
    employees: '70,000+',
    companies: '2,000+'
  },
  {
    slug: 'ad-ports',
    name: 'AD Ports Free Zone',
    fullName: 'Abu Dhabi Ports Free Zone',
    description: 'Abu Dhabi Ports Free Zone encompasses free zones at Khalifa Port and Zayed Port, offering maritime, logistics, and trading facilities.',
    gratuityRules: [
      'Standard UAE Labour Law',
      '21 days per year (years 1-5)',
      '30 days per year (5+ years)',
      'Maritime sector standards',
      'Full gratuity entitlements'
    ],
    keyFeatures: ['Port facilities', 'Maritime services', 'Trading hub', 'Logistics operations'],
    established: '2012',
    authority: 'AD Ports Group',
    employees: '15,000+',
    companies: '500+'
  },
  {
    slug: 'ghantoot',
    name: 'Ghantoot Free Zone',
    fullName: 'Ghantoot Free Zone',
    description: 'Ghantoot Free Zone is located on the border between Abu Dhabi and Dubai, offering strategic access to both emirates for trading and light industrial activities.',
    gratuityRules: [
      'UAE Labour Law applies',
      'Standard gratuity formula',
      '21/30 day calculation',
      'Trading sector standards',
      'Full benefits after 1 year'
    ],
    keyFeatures: ['Strategic location', 'Border area', 'Trading facilities', 'Light industry'],
    established: '2011',
    authority: 'Ghantoot FZ Authority',
    employees: '2,000+',
    companies: '300+'
  }
];

function getRelatedZones(currentSlug: string) {
  return ABU_DHABI_FREE_ZONES.filter(z => z.slug !== currentSlug).slice(0, 5);
}

interface PageProps {
  params: { zone: string };
}

export function generateMetadata({ params }: PageProps): Metadata {
  const zone = ABU_DHABI_FREE_ZONES.find(z => z.slug === params.zone);
  if (!zone) {
    return { title: 'Free Zone Not Found | Abu Dhabi' };
  }
  return {
    title: `${zone.fullName} Gratuity Guide | UAE Labour Law 2026`,
    description: `Gratuity calculator and employment guide for ${zone.fullName}. ${zone.description.slice(0, 100)}...`,
    keywords: [`${zone.name} gratuity`, `${zone.fullName} employment`, 'abu dhabi free zone', 'uae gratuity calculator'],
  };
}

export default function AbuDhabiFreeZonePage({ params }: PageProps) {
  const zone = ABU_DHABI_FREE_ZONES.find(z => z.slug === params.zone);

  if (!zone) {
    notFound();
  }

  const relatedZones = getRelatedZones(zone.slug);

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: `${zone.fullName} Gratuity Calculator - End of Service Benefits`,
    description: zone.description,
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
              <li><Link href="/abu-dhabi">Free Zones</Link></li>
              <li>{zone.name}</li>
            </ol>
          </nav>
          <h1>{zone.fullName}</h1>
          <p className={styles.lead}>Gratuity Calculator & End of Service Benefits Guide</p>
          <div className={styles.heroBadges}>
            <span className={styles.heroBadge}>Est. {zone.established}</span>
            <span className={styles.heroBadge}>{zone.companies} Companies</span>
            <span className={styles.heroBadge}>{zone.employees} Employees</span>
          </div>
        </div>
      </section>

      <section className="py-5">
        <div className="container">
          <div className="row g-4">
            <div className="col-lg-8">
              <div className={styles.contentCard}>
                <h2>About {zone.name}</h2>
                <p>{zone.description}</p>
                <p>Governed by: <strong>{zone.authority}</strong></p>
              </div>

              <div className={styles.contentCard}>
                <h2>Gratuity Rules</h2>
                <ul className={styles.rulesList}>
                  {zone.gratuityRules.map((rule, index) => (
                    <li key={index}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="#28a745">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                      </svg>
                      {rule}
                    </li>
                  ))}
                </ul>
              </div>

              <div className={styles.contentCard}>
                <h2>Key Features</h2>
                <div className={styles.featuresGrid}>
                  {zone.keyFeatures.map((feature, index) => (
                    <div key={index} className={styles.featureItem}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="#0066cc">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      </svg>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className={styles.ctaCard}>
                <h3>Calculate Your {zone.name} Gratuity</h3>
                <p>Use our calculator to estimate your end of service benefits.</p>
                <Link href="/#calculator" className="btn btn-primary btn-lg">Calculate Now</Link>
              </div>
            </div>

            <div className="col-lg-4">
              <div className={styles.sidebarCard}>
                <h3>Quick Facts</h3>
                <div className={styles.statsList}>
                  <div className={styles.statItem}>
                    <span className={styles.statLabel}>Established</span>
                    <span className={styles.statValue}>{zone.established}</span>
                  </div>
                  <div className={styles.statItem}>
                    <span className={styles.statLabel}>Authority</span>
                    <span className={styles.statValue}>{zone.authority}</span>
                  </div>
                  <div className={styles.statItem}>
                    <span className={styles.statLabel}>Companies</span>
                    <span className={styles.statValue}>{zone.companies}</span>
                  </div>
                  <div className={styles.statItem}>
                    <span className={styles.statLabel}>Employees</span>
                    <span className={styles.statValue}>{zone.employees}</span>
                  </div>
                </div>
              </div>

              <div className={styles.sidebarCard}>
                <h3>Other Abu Dhabi Free Zones</h3>
                <div className={styles.relatedList}>
                  {relatedZones.map((related) => (
                    <Link key={related.slug} href={`/abu-dhabi/free-zones/${related.slug}`} className={styles.relatedItem}>
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
