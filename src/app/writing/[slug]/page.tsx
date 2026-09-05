import Link from 'next/link';
import { notFound } from 'next/navigation';
import MinimalNav from '../../../components/MinimalNav';
import notesRaw from '../writingdata.json';
import type { Note as NoteEntry } from '@/types/content';

const notesdata = notesRaw as NoteEntry[];

export function generateStaticParams() {
  return notesdata.map((n) => ({ slug: n.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const note = notesdata.find((n) => n.slug === params.slug);
  if (!note) return {};
  return {
    title: note.title,
    description: note.summary || `${note.title} — a note by Aadit Shah.`,
    alternates: { canonical: `/writing/${note.slug}` },
  };
}

function formatDate(iso: string) {
  if (!iso) return '';
  const [y, m, d] = iso.split('-').map(Number);
  if (!y || !m || !d) return iso;
  return new Date(y, m - 1, d).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
}

export default function Note({ params }: { params: { slug: string } }) {
  const note = notesdata.find((n) => n.slug === params.slug);
  if (!note) notFound();

  return (
    <div className="min-h-screen bg-landing-bg">
      <MinimalNav currentPage="writing" />
      <main>
        <article className="max-w-2xl mx-auto px-8 pb-24">
          <header className="mb-10">
            <h1 className="font-sans font-semibold text-3xl md:text-4xl text-landing-primary leading-tight mb-3">
              {note.source ? (
                <a
                  href={note.source}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-landing-hover transition-colors"
                >
                  {note.title}
                </a>
              ) : (
                note.title
              )}
            </h1>
            <p className="font-sans text-sm text-landing-muted">
              {formatDate(note.date)}
            </p>
          </header>
          <div
            className="prose-aadit"
            dangerouslySetInnerHTML={{ __html: note.html }}
          />
          <footer className="mt-16 pt-8 border-t border-landing-border">
            <Link
              href="/writing"
              className="font-sans text-sm text-landing-muted hover:text-landing-primary transition-colors"
            >
              ← all writing
            </Link>
          </footer>
        </article>
      </main>
    </div>
  );
}
