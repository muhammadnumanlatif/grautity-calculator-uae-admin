import { Metadata } from 'next';
import Link from 'next/link';
import { SITE_CONFIG } from '@gratuity/shared';
import { generateBreadcrumbSchema, combineSchemas } from '@gratuity/seo-utils';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Terms of Use | UAE Gratuity Calculator',
  description:
    'Read the terms and conditions for using our UAE gratuity calculator website and services.',
  keywords: ['terms of use', 'terms and conditions', 'gratuity calculator terms'],
};

export default function TermsOfUsePage() {
  const breadcrumbs = [
    { name: 'Home', url: SITE_CONFIG.url },
    { name: 'Terms of Use', url: `${SITE_CONFIG.url}/terms-of-use` },
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
              <li className="breadcrumb-item active" aria-current="page">Terms of Use</li>
            </ol>
          </nav>

          <h1>Terms of Use</h1>
          <p className={styles.lead}>
            Please read these terms carefully before using our website.
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

                <h2>1. Acceptance of Terms</h2>
                <p>
                  By accessing and using UAE Gratuity Calculator ("Website"), you accept and agree to
                  be bound by these Terms of Use. If you do not agree to these terms, please do not
                  use our Website.
                </p>

                <h2>2. Description of Service</h2>
                <p>
                  UAE Gratuity Calculator provides a free online tool to help users estimate their
                  end of service gratuity benefits based on UAE Labor Law. The Website also provides
                  general information about employment law in the UAE.
                </p>

                <h2>3. Disclaimer</h2>
                <div className={styles.importantBox}>
                  <h3>Important Notice</h3>
                  <p>
                    <strong>This Website is for informational and educational purposes only.</strong>
                  </p>
                  <ul>
                    <li>
                      The gratuity calculations provided are estimates based on standard UAE Labor Law
                      and may not reflect your exact entitlements.
                    </li>
                    <li>
                      This Website does not provide legal, financial, or professional advice.
                    </li>
                    <li>
                      Always verify calculations with your employer, HR department, or MOHRE.
                    </li>
                    <li>
                      Consult qualified legal professionals for advice specific to your situation.
                    </li>
                  </ul>
                </div>

                <h2>4. Accuracy of Information</h2>
                <p>
                  While we strive to provide accurate and up-to-date information, we make no warranties
                  or representations about:
                </p>
                <ul>
                  <li>The accuracy, completeness, or reliability of any calculations</li>
                  <li>The applicability of information to your specific circumstances</li>
                  <li>The currency of labor law information, which may change</li>
                </ul>
                <p>
                  UAE Labor Law and free zone regulations may change. We recommend verifying all
                  information with official sources such as MOHRE.
                </p>

                <h2>5. User Responsibilities</h2>
                <p>When using our Website, you agree to:</p>
                <ul>
                  <li>Provide accurate information when using the calculator</li>
                  <li>Use the Website for lawful purposes only</li>
                  <li>Not attempt to interfere with the Website's operation</li>
                  <li>Not copy, reproduce, or distribute Website content without permission</li>
                  <li>Verify calculation results before making any decisions</li>
                </ul>

                <h2>6. Limitation of Liability</h2>
                <p>
                  To the fullest extent permitted by law, UAE Gratuity Calculator and its operators
                  shall not be liable for:
                </p>
                <ul>
                  <li>Any direct, indirect, incidental, or consequential damages</li>
                  <li>Loss of profits, data, or business opportunities</li>
                  <li>Errors or inaccuracies in calculations or information</li>
                  <li>Decisions made based on Website content</li>
                  <li>Any third-party claims arising from use of the Website</li>
                </ul>

                <h2>7. Intellectual Property</h2>
                <p>
                  All content on this Website, including text, graphics, logos, and software, is the
                  property of UAE Gratuity Calculator or its content suppliers and is protected by
                  intellectual property laws.
                </p>
                <p>You may not:</p>
                <ul>
                  <li>Reproduce or distribute Website content without permission</li>
                  <li>Modify or create derivative works</li>
                  <li>Use content for commercial purposes without authorization</li>
                </ul>

                <h2>8. Third-Party Links</h2>
                <p>
                  Our Website may contain links to third-party websites. We are not responsible for
                  the content, privacy practices, or terms of those websites. Accessing third-party
                  sites is at your own risk.
                </p>

                <h2>9. Modifications to Terms</h2>
                <p>
                  We reserve the right to modify these Terms of Use at any time. Changes will be
                  effective immediately upon posting. Your continued use of the Website after changes
                  constitutes acceptance of the modified terms.
                </p>

                <h2>10. Governing Law</h2>
                <p>
                  These Terms of Use shall be governed by and construed in accordance with the laws
                  of the United Arab Emirates. Any disputes shall be subject to the exclusive
                  jurisdiction of the courts of the UAE.
                </p>

                <h2>11. Severability</h2>
                <p>
                  If any provision of these Terms is found to be unenforceable, the remaining
                  provisions shall continue in full force and effect.
                </p>

                <h2>12. Contact Information</h2>
                <p>
                  For questions about these Terms of Use, please contact us:
                </p>
                <ul>
                  <li>Email: legal@gratuitycalculator.ae</li>
                  <li>Contact form: <Link href="/contact">Contact Page</Link></li>
                </ul>

                <div className={styles.agreementBox}>
                  <p>
                    By using this Website, you acknowledge that you have read, understood, and agree
                    to be bound by these Terms of Use.
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
