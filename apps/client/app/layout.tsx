import type { Metadata } from 'next';
import { SITE_CONFIG } from '@gratuity/shared';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ErrorBoundary from '@/components/layout/ErrorBoundary';
import { getDocument, COLLECTIONS } from '@gratuity/firebase-config/firestore';
import { SiteSettings } from '@gratuity/shared/types';
import '@/styles/globals.scss';

// Fetch settings helper
async function getSiteSettings() {
  try {
    const settings = await getDocument<SiteSettings>(COLLECTIONS.SITE_SETTINGS, 'global');
    return settings;
  } catch (error) {
    console.error('Failed to fetch site settings:', error);
    return null;
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();

  return {
    metadataBase: new URL(SITE_CONFIG.url),
    title: {
      default: settings?.general?.siteName || 'Online Mohre Gratuity Calculator UAE 2026 | Free End of Service Calculator',
      template: `%s | ${settings?.general?.siteName || 'Gratuity Calculator UAE'}`,
    },
    description: settings?.general?.siteDescription || SITE_CONFIG.description,
    keywords: [
      'gratuity calculator uae',
      'mohre gratuity calculator',
      'end of service calculator uae',
      'uae labor law gratuity',
      'gratuity calculation uae 2026',
    ],
    icons: {
      icon: settings?.general?.faviconUrl || '/favicon.ico',
      apple: settings?.general?.appleTouchIcon || '/apple-touch-icon.png',
    },
    authors: [{ name: settings?.general?.siteName || SITE_CONFIG.name }],
    creator: settings?.general?.siteName || SITE_CONFIG.name,
    publisher: settings?.general?.siteName || SITE_CONFIG.name,
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      type: 'website',
      locale: SITE_CONFIG.locale,
      url: SITE_CONFIG.url,
      title: settings?.general?.siteName || 'Online Mohre Gratuity Calculator UAE 2026 | Free End of Service Calculator',
      description: settings?.general?.siteDescription || SITE_CONFIG.description,
      siteName: settings?.general?.siteName || SITE_CONFIG.name,
      images: [
        {
          url: settings?.general?.logoUrl || '/images/og-default.jpg',
          width: 1200,
          height: 630,
          alt: settings?.general?.siteName || 'Gratuity Calculator UAE',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: settings?.general?.siteName || 'Online Mohre Gratuity Calculator UAE 2026',
      description: settings?.general?.siteDescription || SITE_CONFIG.description,
      images: [settings?.general?.logoUrl || '/images/og-default.jpg'],
    },
    alternates: {
      canonical: SITE_CONFIG.url,
    },
    verification: {
      google: 'your-google-verification-code',
    },
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getSiteSettings();

  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#0066cc" />
      </head>
      <body>
        <ErrorBoundary>
          <Header settings={settings} />
          <main>{children}</main>
          <Footer settings={settings} />
        </ErrorBoundary>
      </body>
    </html>
  );
}
