import MinimalNav from '../../components/MinimalNav';
import songdata from './songdata.json';

export default function Favorites() {
  const songs = [...songdata].reverse();

  return (
    <div className="min-h-screen bg-landing-bg">
      <MinimalNav currentPage="favorites" />
      <main>
        <div className="max-w-2xl mx-auto px-8 pb-24">
          {/* Song of the Month */}
          <section>
            <p className="font-sans text-sm text-landing-muted mb-6">song of the month</p>
            <div className="space-y-4">
              {songs.map((song) => (
                <a
                  key={song.id}
                  href={song.spotify}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-baseline justify-between py-2 border-b border-dashed border-landing-border hover:border-landing-muted transition-colors"
                >
                  <div className="flex items-baseline gap-4 min-w-0">
                    <span className="font-sans font-medium text-landing-primary group-hover:text-landing-hover transition-colors shrink-0">
                      {song.title}
                    </span>
                    <span className="hidden sm:inline font-sans text-landing-muted text-sm truncate">
                      {song.artist}
                    </span>
                  </div>
                  <span className="font-mono text-sm text-landing-muted shrink-0 ml-4">
                    {song.month} {song.year}
                  </span>
                </a>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
