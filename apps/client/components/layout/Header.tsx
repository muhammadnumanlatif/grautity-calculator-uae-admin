'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  UAE_EMIRATES,
  DUBAI_AREAS,
  DUBAI_FREE_ZONES,
  ABU_DHABI_AREAS,
  ABU_DHABI_FREE_ZONES,
  SHARJAH_AREAS,
  SHARJAH_FREE_ZONES,
} from '@gratuity/shared';
import styles from './Header.module.css';

// Featured areas/free zones for mega menu
const FEATURED_DATA = {
  dubai: {
    areas: DUBAI_AREAS.slice(0, 5),
    freeZones: DUBAI_FREE_ZONES.slice(0, 4),
  },
  'abu-dhabi': {
    areas: ABU_DHABI_AREAS.slice(0, 5),
    freeZones: ABU_DHABI_FREE_ZONES.slice(0, 4),
  },
  sharjah: {
    areas: SHARJAH_AREAS.slice(0, 5),
    freeZones: SHARJAH_FREE_ZONES.slice(0, 4),
  },
};

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [language, setLanguage] = useState<'en' | 'ar'>('en');
  const [mobileAccordion, setMobileAccordion] = useState<string | null>(null);
  const pathname = usePathname();
  const router = useRouter();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest(`.${styles.megaDropdown}`) && !target.closest(`.${styles.navLink}`)) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const isActive = (path: string) => pathname === path;

  const handleDropdownEnter = (dropdown: string) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    setActiveDropdown(dropdown);
  };

  const handleDropdownLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en');
  };

  return (
    <>
      <header className={`${styles.header} ${isScrolled ? styles.headerScrolled : ''}`}>
        {/* Top Bar */}
        <div className={styles.topBar}>
          <div className="container">
            <div className={styles.topBarContent}>
              <div className={styles.topBarLeft}>
                <span className={styles.updateBadge}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                  </svg>
                  Updated for 2026 UAE Labor Law
                </span>
              </div>
              <div className={styles.topBarRight}>
                <a href="tel:80060" className={styles.topLink}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20 15.5c-1.25 0-2.45-.2-3.57-.57-.35-.11-.74-.03-1.02.24l-2.2 2.2c-2.83-1.44-5.15-3.75-6.59-6.59l2.2-2.21c.28-.26.36-.65.25-1C8.7 6.45 8.5 5.25 8.5 4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.5c0-.55-.45-1-1-1z" />
                  </svg>
                  MOHRE: 800-60
                </a>
                <button onClick={toggleLanguage} className={styles.langToggle}>
                  {language === 'en' ? 'العربية' : 'English'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Navigation */}
        <nav className={styles.navbar}>
          <div className={`container ${styles.navbarContainer}`}>
            <Link href="/" className={styles.navbarBrand}>
              <span className={styles.brandText}>Gratuity Calculator</span>
              <span className={styles.brandBadge}>UAE</span>
            </Link>

            {/* Desktop Navigation */}
            <div className={styles.navDesktop}>
              <ul className={styles.navbarNav}>
                <li className={styles.navItem}>
                  <Link href="/" className={`${styles.navLink} ${isActive('/') ? styles.navLinkActive : ''}`}>
                    Home
                  </Link>
                </li>

                {/* Calculators Mega Menu */}
                <li
                  className={`${styles.navItem} ${styles.megaDropdown}`}
                  onMouseEnter={() => handleDropdownEnter('calculators')}
                  onMouseLeave={handleDropdownLeave}
                >
                  <button className={`${styles.navLink} ${activeDropdown === 'calculators' ? styles.navLinkActive : ''}`}>
                    Calculators
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="6,9 12,15 18,9" />
                    </svg>
                  </button>
                  <div className={`${styles.megaMenu} ${activeDropdown === 'calculators' ? styles.megaMenuShow : ''}`}>
                    <div className={styles.megaMenuInner}>
                      <div className={styles.megaCol}>
                        <h6 className={styles.megaTitle}>
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 14h-2v-4H8v-2h2V9h2v2h2v2h-2v4z" />
                          </svg>
                          MOHRE Calculators
                        </h6>
                        <Link href="/mohre-calculator" className={`${styles.megaLink} ${styles.megaLinkFeatured}`}>
                          <div className={`${styles.megaLinkIcon} ${styles.megaLinkIconMohre}`}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                            </svg>
                          </div>
                          <div className={styles.megaLinkContent}>
                            <span className={styles.megaLinkTitle}>MOHRE Calculator</span>
                            <span className={styles.megaLinkDesc}>Official MOHRE-compliant tool</span>
                          </div>
                        </Link>
                        <Link href="/mohre-gratuity-calculator" className={styles.megaLink}>
                          <div className={styles.megaLinkIcon}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14h-2V9h-2V7h4v10z" />
                            </svg>
                          </div>
                          <div className={styles.megaLinkContent}>
                            <span className={styles.megaLinkTitle}>MOHRE Gratuity Calculator</span>
                            <span className={styles.megaLinkDesc}>Step-by-step guide</span>
                          </div>
                        </Link>
                      </div>

                      <div className={styles.megaCol}>
                        <h6 className={styles.megaTitle}>
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm4 18H6V4h7v5h5v11z" />
                          </svg>
                          By Contract Type
                        </h6>
                        <Link href="/unlimited-contract" className={styles.megaLink}>
                          <div className={`${styles.megaLinkIcon} ${styles.megaLinkIconUnlimited}`}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M18.6 6.62c-1.44 0-2.8.56-3.77 1.53L12 10.66 10.48 12h.01L7.8 14.39c-.64.64-1.49.99-2.4.99-1.87 0-3.39-1.51-3.39-3.38S3.53 8.62 5.4 8.62c.91 0 1.76.35 2.44 1.03l1.13 1 1.51-1.34L9.22 8.2C8.2 7.18 6.84 6.62 5.4 6.62 2.42 6.62 0 9.04 0 12s2.42 5.38 5.4 5.38c1.44 0 2.8-.56 3.77-1.53l2.83-2.5.01.01L13.52 12h-.01l2.69-2.39c.64-.64 1.49-.99 2.4-.99 1.87 0 3.39 1.51 3.39 3.38s-1.52 3.38-3.39 3.38c-.9 0-1.76-.35-2.44-1.03l-1.14-1.01-1.51 1.34 1.27 1.12c1.02 1.01 2.37 1.57 3.82 1.57 2.98 0 5.4-2.41 5.4-5.38s-2.42-5.37-5.4-5.37z" />
                            </svg>
                          </div>
                          <div className={styles.megaLinkContent}>
                            <span className={styles.megaLinkTitle}>Unlimited Contract</span>
                            <span className={styles.megaLinkDesc}>Open-ended contracts</span>
                          </div>
                        </Link>
                        <Link href="/limited-contract" className={styles.megaLink}>
                          <div className={`${styles.megaLinkIcon} ${styles.megaLinkIconLimited}`}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
                            </svg>
                          </div>
                          <div className={styles.megaLinkContent}>
                            <span className={styles.megaLinkTitle}>Limited Contract</span>
                            <span className={styles.megaLinkDesc}>Fixed-term contracts</span>
                          </div>
                        </Link>
                      </div>

                      <div className={styles.megaCol}>
                        <h6 className={styles.megaTitle}>
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z" />
                          </svg>
                          MOHRE Services
                        </h6>
                        <Link href="/labor-card-check" className={styles.megaLink}>
                          <div className={styles.megaLinkIcon}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z" />
                            </svg>
                          </div>
                          <div className={styles.megaLinkContent}>
                            <span className={styles.megaLinkTitle}>Labor Card Check</span>
                            <span className={styles.megaLinkDesc}>Verify work permit status</span>
                          </div>
                        </Link>
                        <Link href="/e-signature-card" className={styles.megaLink}>
                          <div className={styles.megaLinkIcon}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2z" />
                            </svg>
                          </div>
                          <div className={styles.megaLinkContent}>
                            <span className={styles.megaLinkTitle}>E-Signature Card</span>
                            <span className={styles.megaLinkDesc}>UAE Pass & digital ID</span>
                          </div>
                        </Link>
                      </div>

                      <div className={`${styles.megaCol} ${styles.megaCta}`}>
                        <div className={styles.megaCtaBox}>
                          <h6>Calculate Now</h6>
                          <p>Get your gratuity estimate in seconds</p>
                          <Link href="/#calculator" className="btn btn-light btn-sm">
                            Start Calculator
                          </Link>
                        </div>
                        <div className={styles.megaFreeZones}>
                          <span className={styles.megaFreeZonesLabel}>Popular Free Zones</span>
                          <div className={styles.freeZoneTags}>
                            <Link href="/dubai/free-zones/difc">DIFC</Link>
                            <Link href="/abu-dhabi/free-zones/adgm">ADGM</Link>
                            <Link href="/dubai/free-zones/jafza">JAFZA</Link>
                            <Link href="/dubai/free-zones/dmcc">DMCC</Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>

                {/* Emirates Mega Menu */}
                <li
                  className={`${styles.navItem} ${styles.megaDropdown}`}
                  onMouseEnter={() => handleDropdownEnter('emirates')}
                  onMouseLeave={handleDropdownLeave}
                >
                  <button className={`${styles.navLink} ${activeDropdown === 'emirates' ? styles.navLinkActive : ''}`}>
                    Emirates
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="6,9 12,15 18,9" />
                    </svg>
                  </button>
                  <div className={`${styles.megaMenu} ${styles.emiratesMenu} ${activeDropdown === 'emirates' ? styles.megaMenuShow : ''}`}>
                    <div className={styles.megaMenuInner}>
                      {/* Dubai Column */}
                      <div className={`${styles.megaCol} ${styles.emirateCol}`}>
                        <Link href="/dubai" className={`${styles.emirateHeader} ${styles.emirateHeaderDubai}`}>
                          <span className={styles.emirateName}>Dubai</span>
                          <span className={styles.emirateLinkText}>View All →</span>
                        </Link>
                        <div className={styles.emirateLinks}>
                          <div className={styles.linkGroup}>
                            <span className={styles.linkLabel}>Popular Areas</span>
                            {FEATURED_DATA.dubai.areas.map((area) => (
                              <Link key={area.slug} href={`/dubai/${area.slug}`}>
                                {area.name}
                              </Link>
                            ))}
                          </div>
                          <div className={styles.linkGroup}>
                            <span className={styles.linkLabel}>Free Zones</span>
                            {FEATURED_DATA.dubai.freeZones.map((zone) => (
                              <Link key={zone.slug} href={`/dubai/free-zones/${zone.slug}`}>
                                {zone.name.split(' - ')[0]}
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Abu Dhabi Column */}
                      <div className={`${styles.megaCol} ${styles.emirateCol}`}>
                        <Link href="/abu-dhabi" className={`${styles.emirateHeader} ${styles.emirateHeaderAbuDhabi}`}>
                          <span className={styles.emirateName}>Abu Dhabi</span>
                          <span className={styles.emirateLinkText}>View All →</span>
                        </Link>
                        <div className={styles.emirateLinks}>
                          <div className={styles.linkGroup}>
                            <span className={styles.linkLabel}>Popular Areas</span>
                            {FEATURED_DATA['abu-dhabi'].areas.map((area) => (
                              <Link key={area.slug} href={`/abu-dhabi/${area.slug}`}>
                                {area.name}
                              </Link>
                            ))}
                          </div>
                          <div className={styles.linkGroup}>
                            <span className={styles.linkLabel}>Free Zones</span>
                            {FEATURED_DATA['abu-dhabi'].freeZones.map((zone) => (
                              <Link key={zone.slug} href={`/abu-dhabi/free-zones/${zone.slug}`}>
                                {zone.name.split(' - ')[0]}
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Sharjah Column */}
                      <div className={`${styles.megaCol} ${styles.emirateCol}`}>
                        <Link href="/sharjah" className={`${styles.emirateHeader} ${styles.emirateHeaderSharjah}`}>
                          <span className={styles.emirateName}>Sharjah</span>
                          <span className={styles.emirateLinkText}>View All →</span>
                        </Link>
                        <div className={styles.emirateLinks}>
                          <div className={styles.linkGroup}>
                            <span className={styles.linkLabel}>Popular Areas</span>
                            {FEATURED_DATA.sharjah.areas.map((area) => (
                              <Link key={area.slug} href={`/sharjah/${area.slug}`}>
                                {area.name}
                              </Link>
                            ))}
                          </div>
                          <div className={styles.linkGroup}>
                            <span className={styles.linkLabel}>Free Zones</span>
                            {FEATURED_DATA.sharjah.freeZones.map((zone) => (
                              <Link key={zone.slug} href={`/sharjah/free-zones/${zone.slug}`}>
                                {zone.name.split(' - ')[0]}
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Northern Emirates Column */}
                      <div className={`${styles.megaCol} ${styles.emirateCol}`}>
                        <div className={`${styles.emirateHeader} ${styles.emirateHeaderNorthern}`}>
                          <span className={styles.emirateName}>Northern Emirates</span>
                        </div>
                        <div className={`${styles.emirateLinks} ${styles.northernLinks}`}>
                          {Object.entries(UAE_EMIRATES)
                            .filter(([key]) => !['dubai', 'abu-dhabi', 'sharjah'].includes(key))
                            .map(([key, emirate]) => (
                              <Link key={key} href={`/${emirate.slug}`} className={styles.northernEmirateLink}>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                                </svg>
                                <span>{emirate.name}</span>
                              </Link>
                            ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </li>

                <li className={styles.navItem}>
                  <Link href="/blog" className={`${styles.navLink} ${isActive('/blog') ? styles.navLinkActive : ''}`}>
                    Blog
                  </Link>
                </li>
              </ul>

              {/* Search */}
              <div className={`${styles.searchContainer} ${isSearchOpen ? styles.searchContainerOpen : ''}`}>
                <form onSubmit={handleSearch} className={styles.searchForm}>
                  <svg className={styles.searchIcon} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="8" />
                    <path d="M21 21l-4.35-4.35" />
                  </svg>
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setIsSearchOpen(true)}
                    onBlur={() => setTimeout(() => setIsSearchOpen(false), 200)}
                    placeholder="Search areas, free zones..."
                    className={styles.searchInput}
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      className={styles.searchClear}
                      onClick={() => setSearchQuery('')}
                      aria-label="Clear search"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                      </svg>
                    </button>
                  )}
                </form>

                {/* Search Dropdown */}
                {isSearchOpen && (
                  <div className={styles.searchDropdown}>
                    <div className={styles.searchDropdownSection}>
                      <span className={styles.searchDropdownLabel}>Quick Links</span>
                      <Link href="/dubai" className={styles.searchDropdownItem} onClick={() => setIsSearchOpen(false)}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                        </svg>
                        Dubai Gratuity Calculator
                      </Link>
                      <Link href="/abu-dhabi" className={styles.searchDropdownItem} onClick={() => setIsSearchOpen(false)}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                        </svg>
                        Abu Dhabi Calculator
                      </Link>
                      <Link href="/dubai/free-zones/difc" className={styles.searchDropdownItem} onClick={() => setIsSearchOpen(false)}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10z" />
                        </svg>
                        DIFC Calculator
                      </Link>
                      <Link href="/abu-dhabi/free-zones/adgm" className={styles.searchDropdownItem} onClick={() => setIsSearchOpen(false)}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10z" />
                        </svg>
                        ADGM Calculator
                      </Link>
                    </div>
                    <div className={styles.searchDropdownSection}>
                      <span className={styles.searchDropdownLabel}>Contract Types</span>
                      <Link href="/unlimited-contract" className={styles.searchDropdownItem} onClick={() => setIsSearchOpen(false)}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M18.6 6.62c-1.44 0-2.8.56-3.77 1.53L12 10.66 10.48 12h.01L7.8 14.39c-.64.64-1.49.99-2.4.99-1.87 0-3.39-1.51-3.39-3.38S3.53 8.62 5.4 8.62c.91 0 1.76.35 2.44 1.03l1.13 1 1.51-1.34L9.22 8.2C8.2 7.18 6.84 6.62 5.4 6.62 2.42 6.62 0 9.04 0 12s2.42 5.38 5.4 5.38c1.44 0 2.8-.56 3.77-1.53l2.83-2.5.01.01L13.52 12h-.01l2.69-2.39c.64-.64 1.49-.99 2.4-.99 1.87 0 3.39 1.51 3.39 3.38s-1.52 3.38-3.39 3.38c-.9 0-1.76-.35-2.44-1.03l-1.14-1.01-1.51 1.34 1.27 1.12c1.02 1.01 2.37 1.57 3.82 1.57 2.98 0 5.4-2.41 5.4-5.38s-2.42-5.37-5.4-5.37z" />
                        </svg>
                        Unlimited Contract
                      </Link>
                      <Link href="/limited-contract" className={styles.searchDropdownItem} onClick={() => setIsSearchOpen(false)}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
                        </svg>
                        Limited Contract
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              <Link href="/#calculator" className={`btn btn-primary ${styles.navCta}`}>
                Calculate Now
              </Link>
            </div>

            {/* Mobile Toggle */}
            <button
              className={styles.navbarToggler}
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle navigation"
            >
              <span className={`${styles.hamburger} ${isMobileMenuOpen ? styles.hamburgerOpen : ''}`}>
                <span></span>
                <span></span>
                <span></span>
              </span>
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        <div className={`${styles.mobileMenu} ${isMobileMenuOpen ? styles.mobileMenuOpen : ''}`}>
          <div className={styles.mobileMenuContent}>
            {/* Mobile Menu Header with Close Button */}
            <div className={styles.mobileMenuHeader}>
              <span className={styles.mobileMenuTitle}>Menu</span>
              <button
                type="button"
                className={styles.mobileMenuClose}
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Mobile Search */}
            <div className={styles.mobileSearchWrapper}>
              <form onSubmit={handleSearch} className={styles.mobileSearch}>
                <div className={styles.mobileSearchIcon}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="8" />
                    <path d="M21 21l-4.35-4.35" />
                  </svg>
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search areas, free zones, calculators..."
                  className={styles.mobileSearchInput}
                />
                {searchQuery && (
                  <button
                    type="button"
                    className={styles.mobileSearchClear}
                    onClick={() => setSearchQuery('')}
                    aria-label="Clear search"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>
                )}
                <button type="submit" className={styles.mobileSearchSubmit}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="9,18 15,12 9,6" />
                  </svg>
                </button>
              </form>

              {/* Quick Search Tags */}
              <div className={styles.quickSearchTags}>
                <span className={styles.quickSearchLabel}>Popular:</span>
                <button
                  type="button"
                  className={styles.quickSearchTag}
                  onClick={() => {
                    router.push('/dubai');
                    setIsMobileMenuOpen(false);
                  }}
                >
                  Dubai
                </button>
                <button
                  type="button"
                  className={styles.quickSearchTag}
                  onClick={() => {
                    router.push('/dubai/free-zones/difc');
                    setIsMobileMenuOpen(false);
                  }}
                >
                  DIFC
                </button>
                <button
                  type="button"
                  className={styles.quickSearchTag}
                  onClick={() => {
                    router.push('/abu-dhabi/free-zones/adgm');
                    setIsMobileMenuOpen(false);
                  }}
                >
                  ADGM
                </button>
                <button
                  type="button"
                  className={styles.quickSearchTag}
                  onClick={() => {
                    router.push('/unlimited-contract');
                    setIsMobileMenuOpen(false);
                  }}
                >
                  Unlimited
                </button>
              </div>
            </div>

            <nav className={styles.mobileNav}>
              <Link href="/" className={styles.mobileNavLink} onClick={() => setIsMobileMenuOpen(false)}>
                Home
              </Link>

              {/* Calculators Accordion */}
              <div className={styles.mobileAccordion}>
                <button
                  className={`${styles.mobileAccordionToggle} ${mobileAccordion === 'calculators' ? styles.mobileAccordionToggleOpen : ''}`}
                  onClick={() => setMobileAccordion(mobileAccordion === 'calculators' ? null : 'calculators')}
                >
                  <span>Calculators</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="6,9 12,15 18,9" />
                  </svg>
                </button>
                <div className={`${styles.mobileAccordionContent} ${mobileAccordion === 'calculators' ? styles.mobileAccordionContentOpen : ''}`}>
                  <Link href="/mohre-calculator" onClick={() => setIsMobileMenuOpen(false)}>
                    MOHRE Calculator
                  </Link>
                  <Link href="/mohre-gratuity-calculator" onClick={() => setIsMobileMenuOpen(false)}>
                    MOHRE Gratuity Calculator
                  </Link>
                  <Link href="/unlimited-contract" onClick={() => setIsMobileMenuOpen(false)}>
                    Unlimited Contract
                  </Link>
                  <Link href="/limited-contract" onClick={() => setIsMobileMenuOpen(false)}>
                    Limited Contract
                  </Link>
                  <Link href="/labor-card-check" onClick={() => setIsMobileMenuOpen(false)}>
                    Labor Card Check
                  </Link>
                  <Link href="/e-signature-card" onClick={() => setIsMobileMenuOpen(false)}>
                    E-Signature Card
                  </Link>
                </div>
              </div>

              {/* Emirates Accordion */}
              <div className={styles.mobileAccordion}>
                <button
                  className={`${styles.mobileAccordionToggle} ${mobileAccordion === 'emirates' ? styles.mobileAccordionToggleOpen : ''}`}
                  onClick={() => setMobileAccordion(mobileAccordion === 'emirates' ? null : 'emirates')}
                >
                  <span>Emirates</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="6,9 12,15 18,9" />
                  </svg>
                </button>
                <div className={`${styles.mobileAccordionContent} ${mobileAccordion === 'emirates' ? styles.mobileAccordionContentOpen : ''}`}>
                  {Object.entries(UAE_EMIRATES).map(([key, emirate]) => (
                    <Link key={key} href={`/${emirate.slug}`} onClick={() => setIsMobileMenuOpen(false)}>
                      {emirate.name}
                    </Link>
                  ))}
                </div>
              </div>

              <Link href="/blog" className={styles.mobileNavLink} onClick={() => setIsMobileMenuOpen(false)}>
                Blog
              </Link>
            </nav>

            <Link href="/#calculator" className="btn btn-primary btn-block" onClick={() => setIsMobileMenuOpen(false)}>
              Calculate Now
            </Link>
          </div>
        </div>
      </header>

      {/* Sticky CTA Button */}
      <div className={`${styles.stickyCta} ${isScrolled ? styles.stickyCtaShow : ''}`}>
        <Link href="/#calculator" className={`btn btn-primary ${styles.stickyCtaBtn}`}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14h-2v-4H8v-2h4V7h2v4h4v2h-4v4z" />
          </svg>
          Calculate
        </Link>
      </div>
    </>
  );
}
