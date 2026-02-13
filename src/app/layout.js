import { Lora, Inter } from 'next/font/google';
import './globals.css';
import { Analytics } from '@vercel/analytics/react';

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

export const metadata = {
  title: {
    default: 'Aadit Shah',
    template: '%s | Aadit Shah',
  },
  description: 'Computer Science student at Texas A&M. Building things for the web.',
  metadataBase: new URL('https://aaditshah.me'),
  openGraph: {
    title: 'Aadit Shah',
    description: 'Computer Science student at Texas A&M. Building things for the web.',
    url: 'https://aaditshah.me',
    siteName: 'Aadit Shah',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Aadit Shah',
    description: 'Computer Science student at Texas A&M. Building things for the web.',
    creator: '@aadit2805',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${lora.variable} ${inter.variable}`}>
      <body className="font-serif antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
