'use client';

import Link from 'next/link';
import { notFound } from 'next/navigation';
import styles from './page.module.css';

// Free Zone data with special gratuity rules
const DUBAI_FREE_ZONES = [
  {
    slug: 'difc',
    name: 'DIFC',
    fullName: 'Dubai International Financial Centre',
    description: 'DIFC operates under its own employment law (DIFC Employment Law No. 2 of 2019) which differs from UAE Labour Law. Gratuity calculations follow DIFC-specific rules with different caps and calculations.',
    gratuityRules: [
      'Gratuity calculated at 21 days basic salary per year for first 5 years',
      'After 5 years: 30 days basic salary per year',
      'Maximum gratuity capped at 2 years total basic salary',
      'Pro-rata calculation for incomplete years',
      'No gratuity if employment less than 1 year'
    ],
    keyFeatures: [
      'Independent legal jurisdiction',
      'Common law framework',
      'Own employment tribunal',
      'Different visa categories'
    ],
    established: '2004',
    authority: 'DIFC Authority',
    employees: '30,000+',
    companies: '3,600+'
  },
  {
    slug: 'jafza',
    name: 'JAFZA',
    fullName: 'Jebel Ali Free Zone',
    description: 'JAFZA is one of the largest and oldest free zones in Dubai. Employment follows UAE Labour Law with standard gratuity calculations. Special provisions may apply for maritime and logistics workers.',
    gratuityRules: [
      '21 days basic salary per year for first 5 years',
      '30 days basic salary per year after 5 years',
      'Standard UAE Labour Law provisions apply',
      'End of service benefits per federal law',
      'Pro-rata for incomplete years'
    ],
    keyFeatures: [
      'Largest free zone in the region',
      '100% foreign ownership',
      'Strategic port location',
      'Integrated logistics hub'
    ],
    established: '1985',
    authority: 'JAFZA Authority',
    employees: '145,000+',
    companies: '8,000+'
  },
  {
    slug: 'dmcc',
    name: 'DMCC',
    fullName: 'Dubai Multi Commodities Centre',
    description: 'DMCC follows UAE Labour Law for employment and gratuity matters. As the world\'s flagship free zone, it provides comprehensive business services while maintaining standard employment regulations.',
    gratuityRules: [
      'Standard UAE Labour Law gratuity applies',
      '21 days per year for first 5 years',
      '30 days per year after 5 years',
      'Basic salary used for calculation',
      'Full entitlement after 1 year of service'
    ],
    keyFeatures: [
      'World\'s #1 Free Zone (9 years running)',
      'JLT location premium',
      'Commodity trading hub',
      'Flexi-desk options available'
    ],
    established: '2002',
    authority: 'DMCC Authority',
    employees: '100,000+',
    companies: '22,000+'
  },
  {
    slug: 'dic',
    name: 'Dubai Internet City',
    fullName: 'Dubai Internet City',
    description: 'Dubai Internet City is the Middle East\'s largest ICT hub. Employment follows standard UAE Labour Law provisions with gratuity calculated according to federal regulations.',
    gratuityRules: [
      'UAE Labour Law gratuity provisions',
      '21 days basic salary per year (first 5 years)',
      '30 days basic salary per year (after 5 years)',
      'Standard end of service calculations',
      'Pro-rata for partial years'
    ],
    keyFeatures: [
      'Tech industry cluster',
      'Home to global tech giants',
      'Innovation-focused ecosystem',
      'Part of TECOM Group'
    ],
    established: '1999',
    authority: 'TECOM Group',
    employees: '25,000+',
    companies: '1,600+'
  },
  {
    slug: 'dmc',
    name: 'Dubai Media City',
    fullName: 'Dubai Media City',
    description: 'Dubai Media City hosts regional headquarters of major media organizations. Standard UAE Labour Law applies for gratuity calculations with no special provisions.',
    gratuityRules: [
      'Standard UAE Labour Law applies',
      '21 days per year for first 5 years',
      '30 days per year thereafter',
      'Based on last drawn basic salary',
      'Minimum 1 year service required'
    ],
    keyFeatures: [
      'Media industry hub',
      'Broadcasting facilities',
      'Creative cluster',
      'Part of TECOM Group'
    ],
    established: '2001',
    authority: 'TECOM Group',
    employees: '15,000+',
    companies: '1,500+'
  },
  {
    slug: 'dkp',
    name: 'Dubai Knowledge Park',
    fullName: 'Dubai Knowledge Park',
    description: 'Dubai Knowledge Park focuses on human resource management, education, and training industries. Employment follows UAE Labour Law with standard gratuity provisions.',
    gratuityRules: [
      'UAE Labour Law gratuity rules',
      '21 days salary per year (years 1-5)',
      '30 days salary per year (5+ years)',
      'Basic salary basis for calculation',
      'Full benefits after 1 year'
    ],
    keyFeatures: [
      'Education sector focus',
      'HR & training hub',
      'Professional development center',
      'Part of TECOM Group'
    ],
    established: '2003',
    authority: 'TECOM Group',
    employees: '8,000+',
    companies: '500+'
  },
  {
    slug: 'dhcc',
    name: 'Dubai Healthcare City',
    fullName: 'Dubai Healthcare City',
    description: 'Dubai Healthcare City is a healthcare free zone with its own regulatory framework. While following UAE Labour Law for gratuity, healthcare professionals may have specific contract terms.',
    gratuityRules: [
      'UAE Labour Law provisions apply',
      'Standard 21/30 day calculation',
      'Healthcare sector contract variations possible',
      'End of service per federal regulations',
      'Professional licensing requirements'
    ],
    keyFeatures: [
      'Healthcare focused free zone',
      'Medical tourism hub',
      'Specialized facilities',
      'Regulatory excellence'
    ],
    established: '2002',
    authority: 'DHCC Authority',
    employees: '12,000+',
    companies: '400+'
  },
  {
    slug: 'd3',
    name: 'd3',
    fullName: 'Dubai Design District',
    description: 'Dubai Design District (d3) caters to the design, fashion, and creative industries. Standard UAE Labour Law applies for employment and gratuity calculations.',
    gratuityRules: [
      'Standard UAE Labour Law',
      '21 days per year (first 5 years)',
      '30 days per year (after 5 years)',
      'Creative industry standard contracts',
      'Pro-rata calculations apply'
    ],
    keyFeatures: [
      'Design & fashion hub',
      'Creative industries cluster',
      'Modern architecture',
      'Part of TECOM Group'
    ],
    established: '2013',
    authority: 'TECOM Group',
    employees: '5,000+',
    companies: '600+'
  },
  {
    slug: 'dafza',
    name: 'DAFZA',
    fullName: 'Dubai Airport Free Zone',
    description: 'DAFZA offers strategic location near Dubai International Airport. Employment follows UAE Labour Law with standard gratuity calculations for all employees.',
    gratuityRules: [
      'UAE Labour Law compliance',
      '21 days basic salary (years 1-5)',
      '30 days basic salary (5+ years)',
      'Aviation sector standards',
      'Standard end of service benefits'
    ],
    keyFeatures: [
      'Airport proximity',
      'Logistics advantage',
      'Trade hub',
      'Quick customs clearance'
    ],
    established: '1996',
    authority: 'DAFZA Authority',
    employees: '20,000+',
    companies: '1,800+'
  },
  {
    slug: 'dubai-south',
    name: 'Dubai South',
    fullName: 'Dubai South (formerly Dubai World Central)',
    description: 'Dubai South is a master-planned city development with multiple free zones. Standard UAE Labour Law applies, with logistics and aviation sectors following industry-specific guidelines.',
    gratuityRules: [
      'UAE Labour Law provisions',
      'Standard 21/30 day formula',
      'Aviation sector considerations',
      'Logistics industry standards',
      'Pro-rata for incomplete years'
    ],
    keyFeatures: [
      'Al Maktoum Airport location',
      'Expo 2020 legacy',
      'Residential & commercial',
      'Future city development'
    ],
    established: '2006',
    authority: 'Dubai South',
    employees: '30,000+',
    companies: '2,500+'
  },
  {
    slug: 'commercity',
    name: 'Dubai CommerCity',
    fullName: 'Dubai CommerCity',
    description: 'Dubai CommerCity is the region\'s first free zone dedicated to e-commerce. Employment follows UAE Labour Law with standard gratuity provisions.',
    gratuityRules: [
      'Standard UAE Labour Law',
      '21 days per year (first 5 years)',
      '30 days per year thereafter',
      'E-commerce sector focus',
      'Full gratuity after 1 year'
    ],
    keyFeatures: [
      'E-commerce dedicated zone',
      'Fulfillment centers',
      'Last-mile logistics',
      'Digital economy hub'
    ],
    established: '2018',
    authority: 'DAFZA Authority',
    employees: '3,000+',
    companies: '200+'
  },
  {
    slug: 'studio-city',
    name: 'Dubai Studio City',
    fullName: 'Dubai Studio City',
    description: 'Dubai Studio City serves the film, TV, and broadcasting industry. Standard UAE Labour Law applies for employment contracts and gratuity calculations.',
    gratuityRules: [
      'UAE Labour Law compliance',
      'Standard gratuity formula',
      'Entertainment industry contracts',
      '21/30 day calculation basis',
      'Pro-rata for partial service'
    ],
    keyFeatures: [
      'Film & TV production hub',
      'World-class studios',
      'Post-production facilities',
      'Part of TECOM Group'
    ],
    established: '2005',
    authority: 'TECOM Group',
    employees: '4,000+',
    companies: '300+'
  },
  {
    slug: 'outsource-city',
    name: 'Dubai Outsource City',
    fullName: 'Dubai Outsource City',
    description: 'Dubai Outsource City focuses on business process outsourcing services. Employment follows UAE Labour Law with standard gratuity provisions.',
    gratuityRules: [
      'Standard UAE Labour Law',
      '21 days (first 5 years)',
      '30 days (after 5 years)',
      'BPO industry standards',
      'Basic salary calculations'
    ],
    keyFeatures: [
      'BPO industry hub',
      'Customer service centers',
      'Shared services focus',
      'Part of TECOM Group'
    ],
    established: '2007',
    authority: 'TECOM Group',
    employees: '6,000+',
    companies: '150+'
  },
  {
    slug: 'science-park',
    name: 'Dubai Science Park',
    fullName: 'Dubai Science Park',
    description: 'Dubai Science Park supports life sciences, energy, and environment sectors. Standard UAE Labour Law applies with gratuity calculated per federal regulations.',
    gratuityRules: [
      'UAE Labour Law provisions',
      'Standard 21/30 day formula',
      'Scientific sector contracts',
      'Research facility standards',
      'Full benefits after 1 year'
    ],
    keyFeatures: [
      'Life sciences cluster',
      'R&D facilities',
      'Laboratory spaces',
      'Part of TECOM Group'
    ],
    established: '2005',
    authority: 'TECOM Group',
    employees: '3,500+',
    companies: '350+'
  },
  {
    slug: 'ihc',
    name: 'IHC',
    fullName: 'International Humanitarian City',
    description: 'International Humanitarian City hosts UN agencies and humanitarian organizations. Employment may follow specific international organization rules, but private sector follows UAE Labour Law.',
    gratuityRules: [
      'UAE Labour Law for private sector',
      'UN agencies: separate regulations',
      'NGO-specific contracts possible',
      'Standard formula for local hires',
      'International staff: varies'
    ],
    keyFeatures: [
      'Humanitarian hub',
      'UN agency presence',
      'Logistics center',
      'Emergency response base'
    ],
    established: '2003',
    authority: 'IHC Authority',
    employees: '2,000+',
    companies: '80+'
  },
  {
    slug: 'textile-city',
    name: 'Dubai Textile City',
    fullName: 'Dubai Textile City',
    description: 'Dubai Textile City is dedicated to the textile and garment industry. Employment follows UAE Labour Law with standard gratuity provisions for all workers.',
    gratuityRules: [
      'Standard UAE Labour Law',
      '21 days per year (years 1-5)',
      '30 days per year (5+ years)',
      'Manufacturing sector standards',
      'Full gratuity entitlements'
    ],
    keyFeatures: [
      'Textile industry focus',
      'Manufacturing facilities',
      'Garment production hub',
      'Trade center'
    ],
    established: '2007',
    authority: 'Dubai Textile City Authority',
    employees: '8,000+',
    companies: '400+'
  },
  {
    slug: 'gold-diamond-park',
    name: 'Gold & Diamond Park',
    fullName: 'Gold & Diamond Park',
    description: 'Gold & Diamond Park is a specialized free zone for gold and jewelry manufacturing. Standard UAE Labour Law applies for employment and gratuity.',
    gratuityRules: [
      'UAE Labour Law compliance',
      'Standard gratuity formula',
      '21/30 day calculation',
      'Manufacturing standards',
      'Pro-rata calculations'
    ],
    keyFeatures: [
      'Jewelry manufacturing hub',
      'Gold trading center',
      'Diamond processing',
      'Retail outlets'
    ],
    established: '2001',
    authority: 'DMCC oversight',
    employees: '3,000+',
    companies: '120+'
  },
  {
    slug: 'ducamz',
    name: 'DUCAMZ',
    fullName: 'Dubai Cars & Automotive Zone',
    description: 'Dubai Cars & Automotive Zone (DUCAMZ) serves the automotive industry. Employment follows UAE Labour Law with standard gratuity calculations.',
    gratuityRules: [
      'Standard UAE Labour Law',
      '21 days (first 5 years)',
      '30 days (after 5 years)',
      'Automotive sector standards',
      'Basic salary basis'
    ],
    keyFeatures: [
      'Automotive industry hub',
      'Vehicle trading center',
      'After-market services',
      'Auction facilities'
    ],
    established: '2000',
    authority: 'DUCAMZ Authority',
    employees: '5,000+',
    companies: '500+'
  }
];

// Get all free zones except current one for related links
function getRelatedZones(currentSlug: string) {
  return DUBAI_FREE_ZONES.filter(zone => zone.slug !== currentSlug).slice(0, 6);
}

interface PageProps {
  params: { zone: string };
}

export default function FreeZonePage({ params }: PageProps) {
  const zone = DUBAI_FREE_ZONES.find(z => z.slug === params.zone);

  if (!zone) {
    notFound();
  }

  const relatedZones = getRelatedZones(zone.slug);

  // Structured data for SEO
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: `${zone.fullName} Gratuity Calculator - End of Service Benefits`,
    description: zone.description,
    author: {
      '@type': 'Organization',
      name: 'Gratuity.ae'
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Hero Section */}
      <section className={styles.pageHero}>
        <div className="container">
          <nav aria-label="breadcrumb" className="mb-3">
            <ol className={styles.breadcrumb}>
              <li><Link href="/">Home</Link></li>
              <li><Link href="/dubai">Dubai</Link></li>
              <li><Link href="/dubai">Free Zones</Link></li>
              <li>{zone.name}</li>
            </ol>
          </nav>
          <h1>{zone.fullName}</h1>
          <p className={styles.lead}>
            Gratuity Calculator & End of Service Benefits Guide
          </p>
          <div className={styles.heroBadges}>
            <span className={styles.heroBadge}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
              Established {zone.established}
            </span>
            <span className={styles.heroBadge}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10z"/>
              </svg>
              {zone.companies} Companies
            </span>
            <span className={styles.heroBadge}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
              </svg>
              {zone.employees} Employees
            </span>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-5">
        <div className="container">
          <div className="row g-4">
            {/* Left Column - Main Info */}
            <div className="col-lg-8">
              {/* About Section */}
              <div className={styles.contentCard}>
                <h2>About {zone.name}</h2>
                <p>{zone.description}</p>
                <p>Governed by: <strong>{zone.authority}</strong></p>
              </div>

              {/* Gratuity Rules */}
              <div className={styles.contentCard}>
                <h2>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="#0066cc">
                    <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"/>
                  </svg>
                  Gratuity Rules for {zone.name}
                </h2>
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

              {/* Key Features */}
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

              {/* Calculator CTA */}
              <div className={styles.ctaCard}>
                <h3>Calculate Your {zone.name} Gratuity</h3>
                <p>Use our free calculator to estimate your end of service benefits based on {zone.name} regulations.</p>
                <Link href="/#calculator" className="btn btn-primary btn-lg">
                  Calculate Now
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style={{ marginLeft: '0.5rem' }}>
                    <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/>
                  </svg>
                </Link>
              </div>
            </div>

            {/* Right Column - Sidebar */}
            <div className="col-lg-4">
              {/* Quick Stats */}
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

              {/* Related Free Zones */}
              <div className={styles.sidebarCard}>
                <h3>Other Dubai Free Zones</h3>
                <div className={styles.relatedList}>
                  {relatedZones.map((relatedZone) => (
                    <Link
                      key={relatedZone.slug}
                      href={`/dubai/free-zones/${relatedZone.slug}`}
                      className={styles.relatedItem}
                    >
                      <span>{relatedZone.name}</span>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
                      </svg>
                    </Link>
                  ))}
                </div>
                <Link href="/dubai" className={styles.viewAllLink}>
                  View All Dubai Areas
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
                  </svg>
                </Link>
              </div>

              {/* Need Help */}
              <div className={styles.helpCard}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="#0066cc">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"/>
                </svg>
                <h4>Need Help?</h4>
                <p>Have questions about {zone.name} gratuity calculations? Contact us for assistance.</p>
                <Link href="/contact" className={styles.helpLink}>
                  Contact Support
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-5 bg-light">
        <div className="container">
          <h2 className="text-center mb-4">Frequently Asked Questions</h2>
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className={styles.faqList}>
                <div className={styles.faqItem}>
                  <h3>How is gratuity calculated in {zone.name}?</h3>
                  <p>
                    {zone.slug === 'difc'
                      ? 'DIFC follows its own employment law with 21 days basic salary per year for the first 5 years, and 30 days per year thereafter, with a maximum cap of 2 years total basic salary.'
                      : `${zone.name} follows UAE Labour Law. Gratuity is calculated at 21 days of basic salary per year for the first 5 years, and 30 days per year for each additional year of service.`
                    }
                  </p>
                </div>
                <div className={styles.faqItem}>
                  <h3>What is the minimum service period for gratuity in {zone.name}?</h3>
                  <p>
                    Employees must complete at least 1 year of continuous service to be eligible for gratuity benefits in {zone.name}.
                  </p>
                </div>
                <div className={styles.faqItem}>
                  <h3>Is gratuity taxable in {zone.name}?</h3>
                  <p>
                    No, gratuity payments are not subject to income tax in the UAE, including {zone.name}. The UAE does not impose personal income tax on employment income.
                  </p>
                </div>
                <div className={styles.faqItem}>
                  <h3>Can I use the gratuity calculator for {zone.name}?</h3>
                  <p>
                    Yes, our calculator supports {zone.name} gratuity calculations.
                    {zone.slug === 'difc'
                      ? ' Select "DIFC" as your free zone to use the specific DIFC employment law calculations.'
                      : ' The standard UAE Labour Law formula applies to most free zone employees.'
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
