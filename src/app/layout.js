import { Lora } from 'next/font/google';
import './globals.css';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
import '../lib/fontAwesome';

config.autoAddCss = false;

const lora = Lora({ subsets: ['latin'] });

export const metadata = {
  title: 'Aadit Shah' ,
  description: 'CS & Math @ Texas A&M',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="light">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
        />
      </head>
      <body className={lora.className}>
        {children}
      </body>
    </html>
  );
}