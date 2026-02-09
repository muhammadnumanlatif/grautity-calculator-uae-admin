'use client';

import Link from 'next/link';
import { notFound } from 'next/navigation';
import styles from './page.module.css';

// Dubai Landmarks data
const DUBAI_LANDMARKS = [
  {
    slug: 'burj-khalifa',
    name: 'Burj Khalifa Area',
    shortName: 'Burj Khalifa',
    description: 'The Burj Khalifa area, home to the world\'s tallest building, is a premier business and residential district in Downtown Dubai. This iconic location hosts numerous corporate offices, luxury hotels, and high-end retail establishments, making it a significant employment hub.',
    gratuityInfo: 'Employees working in the Burj Khalifa area follow standard UAE Labour Law for gratuity calculations. Most employers in this prestigious location are private sector companies subject to federal employment regulations.',
    keyEmployers: [
      'Emaar Properties',
      'Armani Hotel Dubai',
      'At.mosphere Restaurant',
      'Corporate offices in Burj Khalifa',
      'Dubai Mall retail stores'
    ],
    nearbyAreas: ['Downtown Dubai', 'Business Bay', 'DIFC'],
    employmentSectors: ['Hospitality', 'Retail', 'Corporate Services', 'Tourism'],
    averageSalary: 'AED 8,000 - 25,000',
    icon: '🏗️'
  },
  {
    slug: 'dubai-mall',
    name: 'Dubai Mall Area',
    shortName: 'Dubai Mall',
    description: 'Dubai Mall, one of the largest shopping centers in the world, employs thousands of workers across retail, hospitality, entertainment, and support services. The area is a major employment destination for retail professionals.',
    gratuityInfo: 'Employees in Dubai Mall establishments are covered under UAE Labour Law. Retail sector workers typically have unlimited contracts with standard gratuity entitlements.',
    keyEmployers: [
      'Dubai Mall (Emaar Malls)',
      'International retail brands',
      'Food & beverage outlets',
      'Dubai Aquarium & Underwater Zoo',
      'VR Park and entertainment venues'
    ],
    nearbyAreas: ['Downtown Dubai', 'Burj Khalifa', 'Business Bay'],
    employmentSectors: ['Retail', 'Food & Beverage', 'Entertainment', 'Customer Service'],
    averageSalary: 'AED 4,000 - 15,000',
    icon: '🛍️'
  },
  {
    slug: 'mall-of-emirates',
    name: 'Mall of the Emirates Area',
    shortName: 'Mall of the Emirates',
    description: 'Mall of the Emirates in Al Barsha is home to Ski Dubai and hundreds of retail outlets. It\'s a major employment center for retail and hospitality workers in the western part of Dubai.',
    gratuityInfo: 'Workers at Mall of the Emirates follow UAE Labour Law. The mall\'s diverse employers offer various contract types, with gratuity calculated per federal regulations.',
    keyEmployers: [
      'Majid Al Futtaim (mall operator)',
      'Ski Dubai',
      'Kempinski Hotel',
      'International retail chains',
      'Cinema and entertainment venues'
    ],
    nearbyAreas: ['Al Barsha', 'Media City', 'Internet City'],
    employmentSectors: ['Retail', 'Hospitality', 'Entertainment', 'Sports & Recreation'],
    averageSalary: 'AED 4,000 - 12,000',
    icon: '⛷️'
  },
  {
    slug: 'dubai-creek',
    name: 'Dubai Creek Area',
    shortName: 'Dubai Creek',
    description: 'Dubai Creek is the historic heart of Dubai, featuring traditional souks, heritage areas, and the Dubai Creek Harbour development. The area combines traditional trading with modern business.',
    gratuityInfo: 'Employment in Dubai Creek area follows UAE Labour Law. Traditional trading businesses and modern developments alike must comply with federal gratuity requirements.',
    keyEmployers: [
      'Dubai Creek Harbour',
      'Gold Souk merchants',
      'Spice Souk traders',
      'Abra boat operators',
      'Heritage tourism operators'
    ],
    nearbyAreas: ['Deira', 'Bur Dubai', 'Al Ras'],
    employmentSectors: ['Trading', 'Tourism', 'Retail', 'Hospitality'],
    averageSalary: 'AED 3,500 - 10,000',
    icon: '⛵'
  },
  {
    slug: 'dubai-frame',
    name: 'Dubai Frame Area',
    shortName: 'Dubai Frame',
    description: 'The Dubai Frame in Zabeel Park is an iconic landmark offering panoramic views of old and new Dubai. The area includes the frame attraction and surrounding Zabeel Park facilities.',
    gratuityInfo: 'Employees at Dubai Frame and Zabeel Park facilities follow UAE Labour Law for gratuity. Government-operated facilities may have specific employment terms.',
    keyEmployers: [
      'Dubai Frame (Dubai Municipality)',
      'Zabeel Park management',
      'Food & beverage outlets',
      'Tour operators',
      'Event management companies'
    ],
    nearbyAreas: ['Zabeel', 'Karama', 'Trade Centre'],
    employmentSectors: ['Tourism', 'Hospitality', 'Events', 'Parks & Recreation'],
    averageSalary: 'AED 4,000 - 12,000',
    icon: '🖼️'
  },
  {
    slug: 'global-village',
    name: 'Global Village Area',
    shortName: 'Global Village',
    description: 'Global Village is a seasonal multicultural festival park featuring pavilions from around the world. It operates from October to April and employs thousands of seasonal workers.',
    gratuityInfo: 'Global Village employment is often seasonal. Workers with contracts of one year or more are entitled to gratuity under UAE Labour Law. Seasonal contracts may have different terms.',
    keyEmployers: [
      'Global Village LLC',
      'Country pavilion operators',
      'Food court vendors',
      'Entertainment providers',
      'Retail merchants'
    ],
    nearbyAreas: ['Dubailand', 'Arabian Ranches', 'Motor City'],
    employmentSectors: ['Entertainment', 'Retail', 'Food & Beverage', 'Events'],
    averageSalary: 'AED 3,000 - 8,000',
    icon: '🎡'
  },
  {
    slug: 'expo-city',
    name: 'Expo City Dubai',
    shortName: 'Expo City',
    description: 'Expo City Dubai is the legacy development of Expo 2020, now a permanent district for business, events, and innovation. It hosts corporate offices, event venues, and the Terra and Alif pavilions.',
    gratuityInfo: 'Expo City Dubai employers follow UAE Labour Law. As a modern business district, most companies offer standard employment terms with full gratuity benefits.',
    keyEmployers: [
      'Expo City Dubai Authority',
      'Terra - The Sustainability Pavilion',
      'Dubai Exhibition Centre',
      'Corporate tenants',
      'Hospitality operators'
    ],
    nearbyAreas: ['Dubai South', 'Al Maktoum Airport', 'Jebel Ali'],
    employmentSectors: ['Events', 'Technology', 'Sustainability', 'Corporate Services'],
    averageSalary: 'AED 6,000 - 20,000',
    icon: '🌐'
  }
];

// Get related landmarks
function getRelatedLandmarks(currentSlug: string) {
  return DUBAI_LANDMARKS.filter(l => l.slug !== currentSlug).slice(0, 4);
}

interface PageProps {
  params: { landmark: string };
}

export default function LandmarkPage({ params }: PageProps) {
  const landmark = DUBAI_LANDMARKS.find(l => l.slug === params.landmark);

  if (!landmark) {
    notFound();
  }

  const relatedLandmarks = getRelatedLandmarks(landmark.slug);

  // Structured data for SEO
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: `${landmark.name} Employment & Gratuity Guide`,
    description: landmark.description,
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
              <li><Link href="/dubai">Landmarks</Link></li>
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

      {/* Main Content */}
      <section className="py-5">
        <div className="container">
          <div className="row g-4">
            {/* Left Column - Main Info */}
            <div className="col-lg-8">
              {/* About Section */}
              <div className={styles.contentCard}>
                <h2>About {landmark.shortName}</h2>
                <p>{landmark.description}</p>
              </div>

              {/* Gratuity Information */}
              <div className={styles.contentCard}>
                <h2>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="#0066cc">
                    <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"/>
                  </svg>
                  Gratuity Information
                </h2>
                <p>{landmark.gratuityInfo}</p>
                <div className={styles.infoBox}>
                  <h5>Key Points:</h5>
                  <ul>
                    <li>21 days basic salary per year for first 5 years</li>
                    <li>30 days basic salary per year after 5 years</li>
                    <li>Minimum 1 year service required for gratuity</li>
                    <li>Based on last drawn basic salary</li>
                  </ul>
                </div>
              </div>

              {/* Key Employers */}
              <div className={styles.contentCard}>
                <h2>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="#0066cc">
                    <path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10z"/>
                  </svg>
                  Major Employers
                </h2>
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

              {/* Employment Sectors */}
              <div className={styles.contentCard}>
                <h2>Employment Sectors</h2>
                <div className={styles.sectorsGrid}>
                  {landmark.employmentSectors.map((sector, index) => (
                    <div key={index} className={styles.sectorTag}>
                      {sector}
                    </div>
                  ))}
                </div>
              </div>

              {/* Calculator CTA */}
              <div className={styles.ctaCard}>
                <h3>Calculate Your Gratuity</h3>
                <p>Working near {landmark.shortName}? Use our calculator to estimate your end of service benefits.</p>
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
              {/* Quick Info */}
              <div className={styles.sidebarCard}>
                <h3>Quick Information</h3>
                <div className={styles.infoList}>
                  <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>Average Salary Range</span>
                    <span className={styles.infoValue}>{landmark.averageSalary}</span>
                  </div>
                  <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>Main Sectors</span>
                    <span className={styles.infoValue}>{landmark.employmentSectors.length} industries</span>
                  </div>
                </div>
              </div>

              {/* Nearby Areas */}
              <div className={styles.sidebarCard}>
                <h3>Nearby Areas</h3>
                <div className={styles.nearbyList}>
                  {landmark.nearbyAreas.map((area, index) => (
                    <Link
                      key={index}
                      href={`/dubai/${area.toLowerCase().replace(/ /g, '-')}`}
                      className={styles.nearbyItem}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                      </svg>
                      <span>{area}</span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Other Landmarks */}
              <div className={styles.sidebarCard}>
                <h3>Other Dubai Landmarks</h3>
                <div className={styles.relatedList}>
                  {relatedLandmarks.map((related) => (
                    <Link
                      key={related.slug}
                      href={`/dubai/landmarks/${related.slug}`}
                      className={styles.relatedItem}
                    >
                      <span className={styles.relatedIcon}>{related.icon}</span>
                      <span>{related.shortName}</span>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
                      </svg>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Help Card */}
              <div className={styles.helpCard}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="#0066cc">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"/>
                </svg>
                <h4>Questions?</h4>
                <p>Need help understanding gratuity for {landmark.shortName} area employers?</p>
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
                  <h3>What is the gratuity calculation for {landmark.shortName} area employees?</h3>
                  <p>
                    Employees working in the {landmark.shortName} area follow standard UAE Labour Law. Gratuity is calculated at 21 days of basic salary per year for the first 5 years, and 30 days per year thereafter.
                  </p>
                </div>
                <div className={styles.faqItem}>
                  <h3>Do retail workers at {landmark.shortName} get gratuity?</h3>
                  <p>
                    Yes, all employees who complete at least one year of continuous service are entitled to gratuity, regardless of their role. This includes retail staff, hospitality workers, and all other positions.
                  </p>
                </div>
                <div className={styles.faqItem}>
                  <h3>What are the main employment sectors near {landmark.shortName}?</h3>
                  <p>
                    The main employment sectors include {landmark.employmentSectors.join(', ')}. These sectors offer various career opportunities with standard UAE employment benefits.
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
