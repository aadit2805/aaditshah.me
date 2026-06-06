import Link from 'next/link';
import { notFound } from 'next/navigation';
import MinimalNav from '../../../components/MinimalNav';
import notesdata from '../notesdata.json';

export function generateStaticParams() {
  return notesdata.map((n) => ({ slug: n.slug }));
}

export function generateMetadata({ params }) {
  const note = notesdata.find((n) => n.slug === params.slug);
  if (!note) return {};
  return {
    title: note.title,
    description: note.summary || `${note.title} — a note by Aadit Shah.`,
    alternates: { canonical: `/notes/${note.slug}` },
  };
}

function formatDate(iso) {
  if (!iso) return '';
  const d = new Date(iso);
  if (isNaN(d)) return iso;
  return d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
}

export default function Note({ params }) {
  const note = notesdata.find((n) => n.slug === params.slug);
  if (!note) notFound();

  return (
    <div className="min-h-screen bg-landing-bg">
      <MinimalNav currentPage="notes" />
      <main>
        <article className="max-w-2xl mx-auto px-8 pb-24">
          <Link
            href="/notes"
            className="font-sans text-sm text-landing-muted hover:text-landing-primary transition-colors"
          >
            ← all notes
          </Link>
          <header className="mt-8 mb-10">
            <h1 className="font-serif text-3xl md:text-4xl text-landing-primary leading-tight mb-3">
              {note.title}
            </h1>
            <p className="font-mono text-xs text-landing-muted">
              {formatDate(note.date)}
            </p>
          </header>
          <div
            className="prose-aadit"
            dangerouslySetInnerHTML={{ __html: note.html }}
          />
        </article>
      </main>
    </div>
  );
}
