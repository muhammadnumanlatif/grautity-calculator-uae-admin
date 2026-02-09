'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { UAE_EMIRATES, SITE_CONFIG } from '@gratuity/shared';
import { SiteSettings, MenuConfig } from '@gratuity/shared/types';
import styles from './Footer.module.css';

// Popular free zones for footer
const POPULAR_FREE_ZONES = [
  { name: 'DIFC', slug: '/dubai/free-zones/difc' },
  { name: 'ADGM', slug: '/abu-dhabi/free-zones/adgm' },
  { name: 'JAFZA', slug: '/dubai/free-zones/jafza' },
  { name: 'DMCC', slug: '/dubai/free-zones/dmcc' },
  { name: 'SAIF Zone', slug: '/sharjah/free-zones/saif' },
  { name: 'Hamriyah', slug: '/sharjah/free-zones/hamriyah' },
];

interface FooterProps {
  settings: SiteSettings | null | undefined;
}

export default function Footer({ settings }: FooterProps) {
  const [email, setEmail] = useState('');
  const [subscribeStatus, setSubscribeStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [mobileAccordion, setMobileAccordion] = useState<string | null>(null);
  const [footerMenus, setFooterMenus] = useState<Record<string, MenuConfig | null>>({
    col1: null,
    col2: null,
    col3: null,
    col4: null,
  });

  useEffect(() => {
    async function fetchFooterMenus() {
      const locations = ['footer_col_1', 'footer_col_2', 'footer_col_3', 'footer_col_4'];
      const results: Record<string, MenuConfig | null> = {};

      await Promise.all(locations.map(async (loc, index) => {
        try {
          const res = await fetch(`/api/menus?location=${loc}`);
          if (res.ok) {
            results[`col${index + 1}`] = await res.json();
          }
        } catch (e) {
          console.error(`Failed to fetch ${loc}`, e);
        }
      }));

      setFooterMenus(results);
    }
    fetchFooterMenus();
  }, []);

  const currentYear = new Date().getFullYear();
  const siteName = settings?.general?.siteName || SITE_CONFIG.name;
  const description = settings?.general?.siteDescription || 'Calculate your UAE gratuity instantly with our free MOHRE-compliant calculator.';
  const contactEmail = settings?.general?.contactEmail || 'info@gratuitycalculator.ae';
  const phone = settings?.general?.contactPhone;
  const social = settings?.socialLinks;
  const copyright = settings?.footer?.copyrightText || `© ${currentYear} ${siteName}. All rights reserved.`;

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setSubscribeStatus('loading');

    try {
      const response = await fetch('https://formspree.io/f/mqeqbrzv', {
        method: 'POST',
        body: JSON.stringify({ email, _subject: 'Newsletter Subscription' }),
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });

      if (response.ok) {
        setSubscribeStatus('success');
        setEmail('');
        setTimeout(() => setSubscribeStatus('idle'), 3000);
      } else {
        setSubscribeStatus('error');
        setTimeout(() => setSubscribeStatus('idle'), 3000);
      }
    } catch {
      setSubscribeStatus('error');
      setTimeout(() => setSubscribeStatus('idle'), 3000);
    }
  };

  const toggleAccordion = (section: string) => {
    setMobileAccordion(mobileAccordion === section ? null : section);
  };

  return (
    <footer className={styles.footer}>
      {/* Newsletter Section */}
      <div className={styles.footerNewsletter}>
        <div className="container">
          <div className={styles.newsletterContent}>
            <div className={styles.newsletterText}>
              <h4>Stay Updated on UAE Labor Law</h4>
              <p>Get the latest gratuity calculation updates and labor law changes</p>
            </div>
            <form onSubmit={handleSubscribe} className={styles.newsletterForm}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                disabled={subscribeStatus === 'loading'}
              />
              <button type="submit" disabled={subscribeStatus === 'loading'} className={subscribeStatus === 'error' ? styles.errorBtn : ''}>
                {subscribeStatus === 'loading' ? (
                  <span className={styles.spinner}></span>
                ) : subscribeStatus === 'success' ? (
                  <>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                    </svg>
                    Subscribed
                  </>
                ) : subscribeStatus === 'error' ? (
                  'Try Again'
                ) : (
                  'Subscribe'
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className={styles.footerMain}>
        <div className="container">
          {/* Desktop Footer */}
          <div className={styles.footerDesktop}>
            <div className="row">
              {/* Brand Column */}
              <div className="col-lg-3 col-md-6 mb-4 mb-lg-0">
                <div className={styles.footerBrand}>
                  <Link href="/" className={styles.brandLink}>
                    <span className={styles.brandText}>{siteName}</span>
                    <span className={styles.brandBadge}>UAE</span>
                  </Link>
                  <p className={styles.footerDescription}>
                    {description}
                  </p>

                  {/* Contact Info */}
                  <div className={styles.footerContact}>
                    {phone && (
                      <a href={`https://wa.me/${phone.replace(/[^0-9]/g, '')}`} className={`${styles.contactItem} ${styles.contactItemWhatsapp}`} target="_blank" rel="noopener noreferrer">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                        </svg>
                        <span>WhatsApp Support</span>
                      </a>
                    )}
                    <a href={`mailto:${contactEmail}`} className={styles.contactItem}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                      </svg>
                      <span>{contactEmail}</span>
                    </a>
                  </div>

                  {/* Social Links */}
                  <div className={styles.socialLinks}>
                    {social?.facebook && (
                      <a href={social.facebook} aria-label="Facebook" className={styles.socialLink} target="_blank" rel="noopener noreferrer">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                        </svg>
                      </a>
                    )}
                    {social?.twitter && (
                      <a href={social.twitter} aria-label="Twitter" className={styles.socialLink} target="_blank" rel="noopener noreferrer">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
                        </svg>
                      </a>
                    )}
                    {social?.linkedin && (
                      <a href={social.linkedin} aria-label="LinkedIn" className={styles.socialLink} target="_blank" rel="noopener noreferrer">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2zM4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {/* Calculators Column */}
              <div className="col-lg-2 col-md-6 col-6 mb-4 mb-lg-0">
                <h5 className={styles.columnTitle}>{footerMenus.col1?.name || 'Calculators'}</h5>
                <ul className={styles.footerLinks}>
                  {footerMenus.col1 ? (
                    footerMenus.col1.items.map(item => (
                      <li key={item.id}><Link href={item.url || '#'}>{item.label}</Link></li>
                    ))
                  ) : (
                    <>
                      <li><Link href="/">Gratuity Calculator</Link></li>
                      <li><Link href="/mohre-calculator">MOHRE Calculator</Link></li>
                    </>
                  )}
                </ul>
              </div>

              {/* Emirates Column */}
              <div className="col-lg-2 col-md-6 col-6 mb-4 mb-lg-0">
                <h5 className={styles.columnTitle}>{footerMenus.col2?.name || 'Emirates'}</h5>
                <ul className={styles.footerLinks}>
                  {footerMenus.col2 ? (
                    footerMenus.col2.items.map(item => (
                      <li key={item.id}><Link href={item.url || '#'}>{item.label}</Link></li>
                    ))
                  ) : (
                    Object.entries(UAE_EMIRATES).map(([key, emirate]) => (
                      <li key={key}><Link href={`/${emirate.slug}`}>{emirate.name}</Link></li>
                    ))
                  )}
                </ul>
              </div>

              {/* Free Zones Column */}
              <div className="col-lg-2 col-md-6 col-6 mb-4 mb-lg-0">
                <h5 className={styles.columnTitle}>{footerMenus.col3?.name || 'Free Zones'}</h5>
                <ul className={styles.footerLinks}>
                  {footerMenus.col3 ? (
                    footerMenus.col3.items.map(item => (
                      <li key={item.id}><Link href={item.url || '#'}>{item.label}</Link></li>
                    ))
                  ) : (
                    POPULAR_FREE_ZONES.map((zone) => (
                      <li key={zone.slug}><Link href={zone.slug}>{zone.name}</Link></li>
                    ))
                  )}
                </ul>
              </div>

              {/* Support Column */}
              <div className="col-lg-3 col-md-6 col-6 mb-4 mb-lg-0">
                <h5 className={styles.columnTitle}>Support</h5>
                <ul className={styles.footerLinks}>
                  <li><Link href="/blog">Blog</Link></li>
                  <li><Link href="/faq">FAQ</Link></li>
                  <li><Link href="/contact">Contact Us</Link></li>
                  <li><Link href="/privacy-policy">Privacy Policy</Link></li>
                  <li><Link href="/terms-of-use">Terms of Use</Link></li>
                  <li><a href="https://grautity-calculator-uae-admin.vercel.app" target="_blank" rel="noopener noreferrer">Admin Login</a></li>
                </ul>

                {/* MOHRE App Download */}
                <div className={styles.appDownload}>
                  <span className={styles.appLabel}>Download MOHRE App</span>
                  <div className={styles.appButtons}>
                    <a href="https://apps.apple.com/ae/app/mohre-uae" target="_blank" rel="noopener noreferrer" className={styles.appBtn}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                      </svg>
                      App Store
                    </a>
                    <a href="https://play.google.com/store/apps/details?id=ae.mohre.app" target="_blank" rel="noopener noreferrer" className={styles.appBtn}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                      </svg>
                      Google Play
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Footer Accordions */}
          <div className={styles.footerMobile}>
            <div className={styles.footerBrandMobile}>
              <Link href="/" className={styles.brandLink}>
                <span className={styles.brandText}>{siteName}</span>
                <span className={styles.brandBadge}>UAE</span>
              </Link>
              <p>{description}</p>
            </div>

            <div className={styles.mobileAccordions}>
              {/* Calculators */}
              <div className={styles.mobileAccordion}>
                <button
                  className={`${styles.accordionToggle} ${mobileAccordion === 'calculators' ? styles.accordionToggleOpen : ''}`}
                  onClick={() => toggleAccordion('calculators')}
                >
                  <span>{footerMenus.col1?.name || 'Calculators'}</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="6,9 12,15 18,9" />
                  </svg>
                </button>
                <div className={`${styles.accordionContent} ${mobileAccordion === 'calculators' ? styles.accordionContentOpen : ''}`}>
                  {footerMenus.col1?.items.map(item => (
                    <Link key={item.id} href={item.url || '#'}>{item.label}</Link>
                  ))}
                </div>
              </div>

              {/* Emirates */}
              <div className={styles.mobileAccordion}>
                <button
                  className={`${styles.accordionToggle} ${mobileAccordion === 'emirates' ? styles.accordionToggleOpen : ''}`}
                  onClick={() => toggleAccordion('emirates')}
                >
                  <span>{footerMenus.col2?.name || 'Emirates'}</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="6,9 12,15 18,9" />
                  </svg>
                </button>
                <div className={`${styles.accordionContent} ${mobileAccordion === 'emirates' ? styles.accordionContentOpen : ''}`}>
                  {footerMenus.col2?.items.map(item => (
                    <Link key={item.id} href={item.url || '#'}>{item.label}</Link>
                  ))}
                </div>
              </div>

              {/* Support */}
              <div className={styles.mobileAccordion}>
                <button
                  className={`${styles.accordionToggle} ${mobileAccordion === 'support' ? styles.accordionToggleOpen : ''}`}
                  onClick={() => toggleAccordion('support')}
                >
                  <span>{footerMenus.col4?.name || 'Support'}</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="6,9 12,15 18,9" />
                  </svg>
                </button>
                <div className={`${styles.accordionContent} ${mobileAccordion === 'support' ? styles.accordionContentOpen : ''}`}>
                  {footerMenus.col4?.items.map(item => (
                    <Link key={item.id} href={item.url || '#'}>{item.label}</Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className={styles.mobileContact}>
            <a href="https://wa.me/971501234567" className={styles.whatsappBtn} target="_blank" rel="noopener noreferrer">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              WhatsApp Support
            </a>
          </div>

          <div className={styles.mobileSocial}>
            {social?.facebook && (
              <a href={social.facebook} aria-label="Facebook" target="_blank" rel="noopener noreferrer"><svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg></a>
            )}
            {social?.twitter && (
              <a href={social.twitter} aria-label="Twitter" target="_blank" rel="noopener noreferrer"><svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" /></svg></a>
            )}
            {social?.linkedin && (
              <a href={social.linkedin} aria-label="LinkedIn" target="_blank" rel="noopener noreferrer"><svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2zM4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" /></svg></a>
            )}
          </div>
        </div>
      </div>

      {/* Official Resources Section */}
      <div className={styles.footerResources}>
        <div className="container">
          <h6>Official Resources</h6>
          <div className={styles.resourceLinks}>
            <a href="https://www.mohre.gov.ae" target="_blank" rel="noopener noreferrer">MOHRE</a>
            <a href="https://www.difc.ae" target="_blank" rel="noopener noreferrer">DIFC</a>
            <a href="https://www.adgm.com" target="_blank" rel="noopener noreferrer">ADGM</a>
            <a href="https://u.ae" target="_blank" rel="noopener noreferrer">UAE Gov</a>
          </div>
        </div>
      </div>

      {/* Trust Badges Section */}
      <div className={styles.footerTrust}>
        <div className="container">
          <div className={styles.trustBadges}>
            <div className={styles.trustBadge}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
              </svg>
              <span>MOHRE Compliant</span>
            </div>
            <div className={styles.trustBadge}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z" />
              </svg>
              <span>Secure & Private</span>
            </div>
            <div className={styles.trustBadge}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17 1.01L7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14z" />
              </svg>
              <span>Mobile Friendly</span>
            </div>
            <div className={styles.trustBadge}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
              <span>Trusted by 100K+</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className={styles.footerBottom}>
        <div className="container">
          <div className={styles.footerBottomContent}>
            <div className={styles.footerBottomLeft}>
              <p>{copyright}</p>
              <p className={styles.legalNote}>Based on UAE Labor Law (Federal Decree-Law No. 33 of 2021)</p>
            </div>
            <div className={styles.footerBottomRight}>
              <div className={styles.langSelector}>
                <button className={styles.langSelectorActive}>English</button>
                <button>العربية</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer >
  );
}
