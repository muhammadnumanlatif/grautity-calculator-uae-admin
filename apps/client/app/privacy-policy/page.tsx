import { Metadata } from 'next';
import Link from 'next/link';
import { SITE_CONFIG } from '@gratuity/shared';
import { generateBreadcrumbSchema, combineSchemas } from '@gratuity/seo-utils';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Privacy Policy | UAE Gratuity Calculator',
  description:
    'Learn how we collect, use, and protect your personal information when using our UAE gratuity calculator.',
  keywords: ['privacy policy', 'data protection', 'gratuity calculator privacy'],
};

export default function PrivacyPolicyPage() {
  const breadcrumbs = [
    { name: 'Home', url: SITE_CONFIG.url },
    { name: 'Privacy Policy', url: `${SITE_CONFIG.url}/privacy-policy` },
  ];

  const schemas = combineSchemas([
    generateBreadcrumbSchema(breadcrumbs),
  ]);

  const lastUpdated = 'January 1, 2026';

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
              <li className="breadcrumb-item active" aria-current="page">Privacy Policy</li>
            </ol>
          </nav>

          <h1>Privacy Policy</h1>
          <p className={styles.lead}>
            Your privacy is important to us. This policy explains how we handle your information.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="section">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className={styles.content}>
                <p className={styles.lastUpdated}>Last Updated: {lastUpdated}</p>

                <h2>1. Introduction</h2>
                <p>
                  Welcome to UAE Gratuity Calculator ("we," "our," or "us"). We are committed to protecting
                  your personal information and your right to privacy. This Privacy Policy explains how we
                  collect, use, disclose, and safeguard your information when you visit our website.
                </p>

                <h2>2. Information We Collect</h2>
                <h3>Information You Provide</h3>
                <p>We may collect information that you voluntarily provide when using our services:</p>
                <ul>
                  <li>Contact information (name, email) when using our contact form</li>
                  <li>Gratuity calculation inputs (salary, years of service) - this data is processed locally and not stored on our servers</li>
                </ul>

                <h3>Automatically Collected Information</h3>
                <p>When you visit our website, we may automatically collect certain information:</p>
                <ul>
                  <li>Browser type and version</li>
                  <li>Operating system</li>
                  <li>Pages visited and time spent</li>
                  <li>Referring website</li>
                  <li>IP address (anonymized)</li>
                </ul>

                <h2>3. How We Use Your Information</h2>
                <p>We use the information we collect to:</p>
                <ul>
                  <li>Provide and maintain our gratuity calculator service</li>
                  <li>Respond to your inquiries and provide customer support</li>
                  <li>Improve our website and user experience</li>
                  <li>Analyze usage patterns and trends</li>
                  <li>Comply with legal obligations</li>
                </ul>

                <h2>4. Calculator Data Privacy</h2>
                <p>
                  <strong>Important:</strong> All calculations performed using our gratuity calculator are
                  processed entirely in your browser. We do not collect, store, or transmit your salary
                  information or calculation results to our servers. Your financial data remains completely
                  private on your device.
                </p>

                <h2>5. Cookies and Tracking</h2>
                <p>
                  We use cookies and similar tracking technologies to enhance your browsing experience.
                  These may include:
                </p>
                <ul>
                  <li><strong>Essential Cookies:</strong> Required for basic website functionality</li>
                  <li><strong>Analytics Cookies:</strong> Help us understand how visitors use our site</li>
                  <li><strong>Preference Cookies:</strong> Remember your settings and preferences</li>
                </ul>
                <p>
                  You can control cookie settings through your browser. Disabling cookies may affect
                  some website functionality.
                </p>

                <h2>6. Third-Party Services</h2>
                <p>We may use third-party services that collect information:</p>
                <ul>
                  <li><strong>Google Analytics:</strong> For website analytics (with IP anonymization enabled)</li>
                  <li><strong>Hosting Provider:</strong> For website delivery and security</li>
                </ul>

                <h2>7. Data Security</h2>
                <p>
                  We implement appropriate technical and organizational security measures to protect your
                  information. However, no method of transmission over the Internet is 100% secure, and
                  we cannot guarantee absolute security.
                </p>

                <h2>8. Your Rights</h2>
                <p>Depending on your location, you may have the right to:</p>
                <ul>
                  <li>Access the personal information we hold about you</li>
                  <li>Request correction of inaccurate information</li>
                  <li>Request deletion of your information</li>
                  <li>Object to processing of your information</li>
                  <li>Request data portability</li>
                </ul>

                <h2>9. Children's Privacy</h2>
                <p>
                  Our website is not intended for children under 16 years of age. We do not knowingly
                  collect personal information from children.
                </p>

                <h2>10. Changes to This Policy</h2>
                <p>
                  We may update this Privacy Policy from time to time. We will notify you of any changes
                  by posting the new Privacy Policy on this page and updating the "Last Updated" date.
                </p>

                <h2>11. Contact Us</h2>
                <p>
                  If you have questions about this Privacy Policy or our privacy practices, please
                  contact us:
                </p>
                <ul>
                  <li>Email: privacy@gratuitycalculator.ae</li>
                  <li>Contact form: <Link href="/contact">Contact Page</Link></li>
                </ul>

                <div className={styles.disclaimer}>
                  <h3>Disclaimer</h3>
                  <p>
                    This website provides general information about UAE gratuity calculations for
                    educational purposes only. It does not constitute legal or financial advice.
                    Always consult with qualified professionals for specific advice.
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
