import { Lora, Inter } from 'next/font/google';
import './globals.css';
import { Analytics } from '@vercel/analytics/react';
import sitedata from '../../content/site.json';

const lora = Lora({
  subsets: ['latin'],
  variable: '--font-lora',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const SITE_DESCRIPTION = 'building @ mintlify | cs @ texas a&m';

export const metadata = {
  title: {
    default: 'aadit shah',
    template: '%s | aadit shah',
  },
  description: SITE_DESCRIPTION,
  metadataBase: new URL('https://aaditshah.me'),
  keywords: [
    'Aadit Shah',
    'Texas A&M',
    'Computer Science',
    'software engineering intern',
    'Mintlify',
    'full-stack developer',
    'Next.js',
    'TypeScript',
    'AI',
  ],
  authors: [{ name: 'Aadit Shah', url: 'https://aaditshah.me' }],
  creator: 'Aadit Shah',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
    },
  },
};

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: sitedata.name,
  url: 'https://aaditshah.me',
  jobTitle: 'Software Engineering Intern',
  worksFor: { '@type': 'Organization', name: 'Mintlify', url: 'https://mintlify.com' },
  alumniOf: {
    '@type': 'CollegeOrUniversity',
    name: 'Texas A&M University',
    url: 'https://www.tamu.edu',
  },
  sameAs: [
    sitedata.socials.github.url,
    sitedata.socials.twitter.url,
    sitedata.socials.linkedin.url,
  ],
  email: `mailto:${sitedata.socials.email.address}`,
  knowsAbout: [
    'Software Engineering',
    'Full-stack Web Development',
    'Next.js',
    'TypeScript',
    'Python',
    'Machine Learning',
    'AI Applications',
  ],
  description: SITE_DESCRIPTION,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${lora.variable} ${inter.variable}`}>
      <body className="font-serif antialiased">
        {children}
        <Analytics />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </body>
    </html>
  );
}
