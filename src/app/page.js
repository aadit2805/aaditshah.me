"use client";

import React from 'react';
import Navbar from '../components/nav';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../lib/fontAwesome';

const SocialLink = ({ icon, label, href, action }) => (
  <a
    href={href}
    className="group flex items-center justify-between py-4 px-1 border-b border-bone-300 last:border-0 transition-colors hover:bg-bone-200/30"
    target={href.startsWith('mailto') ? undefined : '_blank'}
    rel={href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
    aria-label={`Visit my ${label} profile`}
  >
    <div className="flex items-center gap-4">
      <div className="w-10 h-10 rounded-full bg-bone-200 flex items-center justify-center group-hover:bg-terracotta-100 transition-colors">
        <FontAwesomeIcon
          icon={icon}
          className="w-4 h-4 text-espresso-600 group-hover:text-terracotta-600 transition-colors"
          aria-hidden="true"
        />
      </div>
      <span className="font-medium text-espresso-800">{label}</span>
    </div>
    <span className="text-sm text-espresso-400 group-hover:text-terracotta-500 transition-colors">
      {action}
    </span>
  </a>
);

export default function Home() {
  const socialLinks = [
    { icon: 'envelope', label: 'Email', href: 'mailto:aadit2805@gmail.com', action: 'Send' },
    { icon: ['fab', 'github'], label: 'GitHub', href: 'https://github.com/aadit2805', action: 'Follow' },
    { icon: ['fab', 'linkedin'], label: 'LinkedIn', href: 'https://linkedin.com/in/aadit2805', action: 'Connect' },
    { icon: ['fab', 'twitter'], label: 'Twitter', href: 'https://twitter.com/aadit2805', action: 'Follow' }
  ];

  return (
    <div className="min-h-screen bg-bone-100">
      <Navbar />

      <main className="max-w-2xl mx-auto px-6 pt-32 pb-20">
        {/* Hero Section */}
        <section className="mb-16 opacity-0 animate-fade-in-up">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-2 h-2 rounded-full bg-terracotta-400" />
            <span className="text-sm font-medium text-espresso-500 uppercase tracking-wider">
              Welcome
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-serif font-medium text-espresso-900 mb-6 leading-tight">
            Howdy, I'm{' '}
            <span className="text-terracotta-600">Aadit</span>.
          </h1>

          <p className="text-lg text-espresso-600 leading-relaxed mb-4">
            I'm a student at{' '}
            <span className="font-medium text-espresso-800">Texas A&M University</span>,
            pursuing degrees in{' '}
            <span className="font-medium text-espresso-800">Computer Science</span> and{' '}
            <span className="font-medium text-espresso-800">Mathematics</span>.
          </p>

          <p className="text-espresso-500">
            I enjoy building things, watching films, and exploring new ideas.
          </p>
        </section>

        {/* Decorative divider */}
        <div className="flex items-center gap-4 mb-12 opacity-0 animate-fade-in animate-delay-200">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-bone-400 to-transparent" />
          <div className="flex gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-bone-400" />
            <div className="w-1.5 h-1.5 rounded-full bg-terracotta-400" />
            <div className="w-1.5 h-1.5 rounded-full bg-bone-400" />
          </div>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-bone-400 to-transparent" />
        </div>

        {/* Connect Section */}
        <section className="opacity-0 animate-fade-in-up animate-delay-300">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-2 h-2 rounded-full bg-sage-400" />
            <span className="text-sm font-medium text-espresso-500 uppercase tracking-wider">
              Connect
            </span>
          </div>

          <Card className="bg-bone-50 border-bone-200 shadow-sm">
            <CardContent className="p-2">
              {socialLinks.map((link) => (
                <SocialLink key={link.label} {...link} />
              ))}
            </CardContent>
          </Card>
        </section>

        {/* Footer note */}
        <footer className="mt-20 text-center opacity-0 animate-fade-in animate-delay-400">
          <p className="text-sm text-espresso-400">
            Feel free to reach out anytime.
          </p>
        </footer>
      </main>
    </div>
  );
}
