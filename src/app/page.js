"use client";

import React from 'react';
import Link from 'next/link';
import Navbar from '../components/nav';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../lib/fontAwesome';

export default function Home() {
  const socialLinks = [
    { icon: 'envelope', label: 'Email', href: 'mailto:aadit2805@gmail.com' },
    { icon: ['fab', 'github'], label: 'GitHub', href: 'https://github.com/aadit2805' },
    { icon: ['fab', 'linkedin'], label: 'LinkedIn', href: 'https://linkedin.com/in/aadit2805' },
    { icon: ['fab', 'twitter'], label: 'Twitter', href: 'https://twitter.com/aadit2805' }
  ];

  return (
    <div className="min-h-screen bg-bone-100 overflow-hidden">
      {/* Grain overlay */}
      <div className="grain" />

      {/* Single subtle blob */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="blob blob-1 opacity-30" />
      </div>

      <Navbar />

      <main className="relative z-10 max-w-2xl mx-auto px-6 pt-32 pb-20 min-h-screen flex flex-col">

        {/* Main content */}
        <div className="flex-1 flex flex-col justify-center -mt-20">

          {/* Intro */}
          <div className="mb-16 stagger-children">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium text-espresso-900 mb-6 leading-[1.1]">
              Howdy, I'm Aadit.
            </h1>

            <p className="text-lg md:text-xl text-espresso-600 leading-relaxed max-w-lg">
              Computer Science and Mathematics student at Texas A&M.
              I build things for the web and think about problems worth solving.
            </p>
          </div>

          {/* Social links - simple, inline */}
          <div className="flex flex-wrap items-center gap-3 stagger-children">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith('mailto') ? undefined : '_blank'}
                rel={link.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                className="group inline-flex items-center gap-2 px-4 py-2 rounded-full bg-bone-200/50 hover:bg-bone-300/50 transition-all"
                aria-label={link.label}
              >
                <FontAwesomeIcon
                  icon={link.icon}
                  className="w-4 h-4 text-espresso-500 group-hover:text-terracotta-500 transition-colors"
                />
                <span className="text-sm text-espresso-700 group-hover:text-espresso-900 transition-colors">
                  {link.label}
                </span>
              </a>
            ))}
          </div>
        </div>

      </main>
    </div>
  );
}
