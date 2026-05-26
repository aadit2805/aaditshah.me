import Link from 'next/link';
import MinimalNav from '../../components/MinimalNav';
import notesdata from './notesdata.json';

export const metadata = {
  title: 'notes',
  description: 'Essays and short pieces by Aadit Shah on software engineering, AI, and the things he is thinking about.',
  alternates: { canonical: '/notes' },
  openGraph: {
    title: 'Notes | Aadit Shah',
    description: 'Essays and short pieces on software engineering, AI, and the things Aadit is thinking about.',
    url: 'https://aaditshah.me/notes',
    type: 'website',
  },
};

function formatDate(iso) {
  if (!iso) return '';
  const d = new Date(iso);
  if (isNaN(d)) return iso;
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export default function Notes() {
  return (
    <div className="min-h-screen bg-landing-bg">
      <MinimalNav currentPage="notes" />
      <main>
        <div className="max-w-2xl mx-auto px-8 pb-24">
          {notesdata.length === 0 && (
            <p className="font-sans text-sm text-landing-muted py-4">
              Nothing here yet — first piece is in the oven.
            </p>
          )}

          <div className="space-y-6">
            {notesdata.map((note) => (
              <Link
                key={note.slug}
                href={`/notes/${note.slug}`}
                className="group block py-4 border-b border-dashed border-landing-border hover:border-landing-muted transition-colors"
              >
                <div className="flex items-baseline justify-between gap-4 mb-1">
                  <h2 className="font-serif text-xl md:text-2xl text-landing-primary group-hover:text-landing-hover transition-colors">
                    {note.title}
                  </h2>
                  <span className="font-mono text-xs text-landing-muted shrink-0">
                    {formatDate(note.date)}
                  </span>
                </div>
                {note.summary && (
                  <p className="font-sans text-sm text-landing-secondary leading-relaxed">
                    {note.summary}
                  </p>
                )}
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
