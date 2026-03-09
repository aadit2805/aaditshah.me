import Link from 'next/link';
import MinimalNav from '../components/MinimalNav';
import sitedata from '../data/sitedata.json';

export default function Home() {
  return (
    <div className="min-h-screen bg-landing-bg">
      <MinimalNav />

      <main className="max-w-2xl mx-auto px-8 pb-24">
        {/* Intro */}
        <p className="font-sans text-landing-secondary mb-16 leading-relaxed">
          {sitedata.bio}
        </p>

        {/* Work */}
        <section className="mb-16">
          <div className="grid grid-cols-[100px_1fr] sm:grid-cols-[120px_1fr] gap-x-8">
            <span className="font-sans text-sm text-landing-muted pt-2">work</span>
            <div>
              {sitedata.work.map((job, i) => (
                <div key={i} className="flex items-baseline justify-between py-2">
                  <a href={job.url} target="_blank" rel="noopener noreferrer" className="font-sans font-medium text-landing-primary hover:text-landing-hover transition-colors">{job.company}</a>
                  <span className="hidden sm:inline font-sans text-landing-muted text-sm">{job.description}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Online */}
        <section className="mb-16">
          <div className="grid grid-cols-[100px_1fr] sm:grid-cols-[120px_1fr] gap-x-8">
            <span className="font-sans text-sm text-landing-muted pt-1">online</span>
            <p className="font-sans text-landing-secondary leading-relaxed">
              Find me on{' '}
              {Object.values(sitedata.socials).filter(s => s.label !== 'hello').map((social, i, arr) => (
                <span key={social.label}>
                  <a href={social.url} target="_blank" rel="noopener noreferrer" className="text-landing-primary hover:text-landing-hover transition-colors underline underline-offset-2 decoration-landing-border hover:decoration-landing-muted">{social.label}</a>
                  {i < arr.length - 1 ? ', ' : ''}
                </span>
              ))}
              , or say{' '}
              <a href={sitedata.socials.email.url} className="text-landing-primary hover:text-landing-hover transition-colors underline underline-offset-2 decoration-landing-border hover:decoration-landing-muted">{sitedata.socials.email.label}</a>.
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
