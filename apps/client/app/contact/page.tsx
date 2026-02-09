import { Metadata } from 'next';
import Link from 'next/link';
import { SITE_CONFIG } from '@gratuity/shared';
import { generateBreadcrumbSchema, combineSchemas } from '@gratuity/seo-utils';
import ContactForm from './ContactForm';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Contact Us | UAE Gratuity Calculator Support',
  description:
    'Get in touch with us for questions about UAE gratuity calculations, labor law, or technical support. We\'re here to help.',
  keywords: [
    'contact gratuity calculator',
    'uae labor law help',
    'gratuity questions',
    'employment support uae',
  ],
};

export default function ContactPage() {
  const breadcrumbs = [
    { name: 'Home', url: SITE_CONFIG.url },
    { name: 'Contact', url: `${SITE_CONFIG.url}/contact` },
  ];

  const schemas = combineSchemas([
    generateBreadcrumbSchema(breadcrumbs),
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: schemas }}
      />

      {/* Hero Section */}
      <section className={styles.pageHero}>
        <div className="container">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><Link href="/">Home</Link></li>
              <li className="breadcrumb-item active" aria-current="page">Contact</li>
            </ol>
          </nav>

          <h1>Contact Us</h1>
          <p className={styles.lead}>
            Have questions about UAE gratuity or labor law? We&apos;re here to help.
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="section">
        <div className="container">
          <div className="row g-4">
            <div className="col-lg-7">
              <ContactForm />
            </div>

            <div className="col-lg-5">
              <div className={styles.infoCard}>
                <h3>Other Ways to Reach Us</h3>

                <div className={styles.infoItem}>
                  <div className={styles.infoIcon}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                    </svg>
                  </div>
                  <div>
                    <h4>Email</h4>
                    <p>support@gratuitycalculator.ae</p>
                  </div>
                </div>

                <div className={styles.infoItem}>
                  <div className={styles.infoIcon}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
                    </svg>
                  </div>
                  <div>
                    <h4>Response Time</h4>
                    <p>We typically respond within 24-48 hours</p>
                  </div>
                </div>
              </div>

              <div className={styles.infoCard}>
                <h3>Official Resources</h3>
                <p className={styles.disclaimer}>
                  For official labor disputes or complaints, contact MOHRE directly:
                </p>
                <ul className={styles.resourceList}>
                  <li>
                    <strong>MOHRE Hotline:</strong> 800 60
                  </li>
                  <li>
                    <strong>MOHRE App:</strong> Available on iOS & Android
                  </li>
                  <li>
                    <strong>Website:</strong>{' '}
                    <a href="https://www.mohre.gov.ae" target="_blank" rel="noopener noreferrer">
                      www.mohre.gov.ae
                    </a>
                  </li>
                </ul>
              </div>

              <div className={styles.faqCard}>
                <h3>Common Questions?</h3>
                <p>Check our FAQ section for quick answers to frequently asked questions.</p>
                <Link href="/faq" className="btn btn-outline-primary w-100">
                  View FAQ
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
