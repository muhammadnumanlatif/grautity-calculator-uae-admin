import type { Metadata } from 'next';
import { SITE_CONFIG } from '@gratuity/shared';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ErrorBoundary from '@/components/layout/ErrorBoundary';
import '@/styles/globals.scss';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: 'Online Mohre Gratuity Calculator UAE 2026 | Free End of Service Calculator',
    template: '%s | Gratuity Calculator UAE',
  },
  description: SITE_CONFIG.description,
  keywords: [
    'gratuity calculator uae',
    'mohre gratuity calculator',
    'end of service calculator uae',
    'uae labor law gratuity',
    'gratuity calculation uae 2026',
  ],
  authors: [{ name: SITE_CONFIG.name }],
  creator: SITE_CONFIG.name,
  publisher: SITE_CONFIG.name,
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
    title: 'Online Mohre Gratuity Calculator UAE 2026 | Free End of Service Calculator',
    description: SITE_CONFIG.description,
    siteName: SITE_CONFIG.name,
    images: [
      {
        url: '/images/og-default.jpg',
        width: 1200,
        height: 630,
        alt: 'Gratuity Calculator UAE',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Online Mohre Gratuity Calculator UAE 2026',
    description: SITE_CONFIG.description,
    images: ['/images/og-default.jpg'],
  },
  alternates: {
    canonical: SITE_CONFIG.url,
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#0066cc" />
      </head>
      <body>
        <ErrorBoundary>
          <Header />
          <main>{children}</main>
          <Footer />
        </ErrorBoundary>
      </body>
    </html>
  );
}
