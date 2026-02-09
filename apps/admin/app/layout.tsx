import type { Metadata } from 'next';
import '@/styles/globals.scss';

export const metadata: Metadata = {
  title: {
    default: 'Admin Dashboard | Gratuity Calculator UAE',
    template: '%s | Admin Dashboard',
  },
  description: 'Admin dashboard for Gratuity Calculator UAE',
  robots: {
    index: false,
    follow: false,
  },
};

import { AuthProvider } from '@/context/AuthContext';

import { Toaster } from 'react-hot-toast';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          {children}
          <Toaster position="bottom-right" />
        </AuthProvider>
      </body>
    </html>
  );
}
