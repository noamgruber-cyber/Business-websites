import type { Metadata } from 'next';
import './globals.css';
import { ViewTransitions } from 'next-view-transitions';
import { AuthProvider } from '@/context/AuthContext';
import { LanguageProvider } from '@/context/LanguageContext';
import CustomCursor from '@/components/ui/CustomCursor';

const DESCRIPTION =
  'The easiest way for small businesses to get online. Create a professional website for your barbershop, restaurant, or salon in minutes. No coding required.';

export const metadata: Metadata = {
  title: 'SiteForge — Build a Website for Your Business in 5 Minutes',
  description: DESCRIPTION,
  keywords: [
    'website builder', 'small business website', 'barbershop website',
    'restaurant website', 'Israel', 'no code', 'nail salon website',
  ],
  openGraph: {
    title: 'SiteForge — Your Business Deserves a Beautiful Website',
    description: DESCRIPTION,
    url: 'https://siteforge.vercel.app',
    siteName: 'SiteForge',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SiteForge',
    description: DESCRIPTION,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ViewTransitions>
      <html lang="en" className="scroll-smooth">
        <head>
          {/* Google Fonts loaded at runtime — no build-time network needed */}
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Assistant:wght@300;400;500;600;700;800&family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700;1,900&family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600;1,700&family=Oswald:wght@400;500;600;700&family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&family=DM+Sans:wght@300;400;500;600;700&family=Space+Grotesk:wght@300;400;500;600;700&family=Space+Mono:wght@400;700&display=swap"
          />
        </head>
        <body className="antialiased">
          <LanguageProvider>
            <AuthProvider>
              <CustomCursor />
              {children}
            </AuthProvider>
          </LanguageProvider>
        </body>
      </html>
    </ViewTransitions>
  );
}
