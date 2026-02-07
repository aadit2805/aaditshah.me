"use client";

import Link from 'next/link';
import MinimalNav from '../components/MinimalNav';

export default function Home() {
  return (
    <div className="min-h-screen bg-landing-bg">
      <MinimalNav />

      <main className="max-w-2xl mx-auto px-8 pb-24">
        {/* Intro */}
        <p className="font-sans text-landing-secondary mb-16 leading-relaxed">
          Howdy, I&apos;m Aadit! I&apos;m studying Computer Science at Texas A&amp;M
          and enjoy building things for the web in my free time.
        </p>

        {/* Work */}
        <section className="mb-16">
          <div className="grid grid-cols-[100px_1fr] sm:grid-cols-[120px_1fr] gap-x-8">
            <span className="font-sans text-sm text-landing-muted pt-2">work</span>
            <div>
              <div className="flex items-baseline justify-between py-2">
                <span className="font-sans font-medium text-landing-primary">Texas A&amp;M Baseball</span>
                <span className="hidden sm:inline font-sans text-landing-muted text-sm">Analytics &amp; computer vision</span>
              </div>
              <div className="flex items-baseline justify-between py-2">
                <span className="font-sans font-medium text-landing-primary">Cox Automotive</span>
                <span className="hidden sm:inline font-sans text-landing-muted text-sm">Vehicle marketplace technology</span>
              </div>
            </div>
          </div>
        </section>

        {/* Online */}
        <section className="mb-16">
          <div className="grid grid-cols-[100px_1fr] sm:grid-cols-[120px_1fr] gap-x-8">
            <span className="font-sans text-sm text-landing-muted pt-1">online</span>
            <p className="font-sans text-landing-secondary leading-relaxed">
              Find me on{' '}
              <a href="https://github.com/aadit2805" target="_blank" rel="noopener noreferrer" className="text-landing-primary hover:text-landing-hover transition-colors underline underline-offset-2 decoration-landing-border hover:decoration-landing-muted">GitHub</a>,{' '}
              <a href="https://x.com/aadit2805" target="_blank" rel="noopener noreferrer" className="text-landing-primary hover:text-landing-hover transition-colors underline underline-offset-2 decoration-landing-border hover:decoration-landing-muted">Twitter</a>,{' '}
              <a href="https://linkedin.com/in/aadit2805" target="_blank" rel="noopener noreferrer" className="text-landing-primary hover:text-landing-hover transition-colors underline underline-offset-2 decoration-landing-border hover:decoration-landing-muted">LinkedIn</a>, or say{' '}
              <a href="mailto:aadit2805@gmail.com" className="text-landing-primary hover:text-landing-hover transition-colors underline underline-offset-2 decoration-landing-border hover:decoration-landing-muted">hello</a>.
            </p>
          </div>
        </section>

        {/* Terminal link */}
        <Link
          href="/terminal"
          className="inline-flex items-center font-mono text-sm text-landing-muted hover:text-landing-primary transition-colors"
        >
          <span>$ enter terminal</span>
          <span className="ml-1 animate-pulse">_</span>
        </Link>
      </main>
    </div>
  );
}
