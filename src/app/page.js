"use client";

import React from 'react';
import Navbar from '../components/nav';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../lib/fontAwesome';
import { useTheme } from '../hooks/useTheme';

const SocialLink = ({ icon, label, href }) => (
  <div className="flex items-center mb-4 w-full">
    <FontAwesomeIcon icon={icon} className="mr-2" aria-hidden="true" />
    <span className="text-medium font-semibold">{label}</span>
    <span 
      className="flex-grow border-t border-dotted border-gray-400 mx-4"
      aria-hidden="true"
    />
    <a 
      href={href}
      className="text-gray-400 hover:text-orange-500"
      aria-label={`Visit my ${label} profile`}
    >
      {label === 'Email' ? 'Send' : label === 'LinkedIn' ? 'Connect' : 'Follow'}
    </a>
  </div>
);

export default function Home() {
  const { mounted } = useTheme();

  if (!mounted) {
    return null;
  }

  const socialLinks = [
    { icon: 'envelope', label: 'Email', href: 'mailto:aadit2805@gmail.com' },
    { icon: ['fab', 'github'], label: 'GitHub', href: 'https://github.com/aadit2805' },
    { icon: ['fab', 'linkedin'], label: 'LinkedIn', href: 'https://linkedin.com/in/aadit2805' },
    { icon: ['fab', 'twitter'], label: 'Twitter', href: 'https://twitter.com/aadit2805' }
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="flex flex-col items-center justify-center text-center pt-24"> 
        <div className="w-full max-w-2xl px-4">
          <section className="mb-12" aria-labelledby="introduction">
            <h1 id="introduction" className="text-4xl font-semibold mb-2">
              Howdy, I'm <span className="neon-orange-gradient">Aadit</span>!
            </h1>
            <p className="text-lg">
              I study at <span className="neon-maroon-gradient-light">Texas A&M</span>, 
              majoring in <span className="neon-maroon-gradient-light">Computer Science</span> and{' '}
              <span className="neon-maroon-gradient-light">Mathematics</span>.
            </p>
            <p className="text-lg">
              Feel free to connect with me down below!
            </p>
          </section>
          <section className="mb-12" aria-labelledby="social-links">
            <h2 id="social-links" className="sr-only">Social Links</h2>
            <div className="flex flex-col items-start">
              {socialLinks.map((link) => (
                <SocialLink
                  key={link.label}
                  {...link}
                />
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
