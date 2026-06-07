import MinimalNav from '../../components/MinimalNav';

const TAB_WIDTHS = ['w-12', 'w-14', 'w-12', 'w-16', 'w-16'];

export default function Loading() {
  return (
    <div className="min-h-screen bg-landing-bg">
      <MinimalNav currentPage="shortlist" />
      <main>
        <div className="max-w-2xl mx-auto px-8 pb-24">
          {/* tabs */}
          <div className="flex flex-wrap gap-x-5 gap-y-2 mb-6">
            {TAB_WIDTHS.map((w, i) => (
              <div key={i} className={`h-4 ${w} rounded bg-landing-muted/15 animate-pulse`} />
            ))}
          </div>

          {/* rows */}
          <div className="space-y-4">
            {Array.from({ length: 7 }).map((_, i) => (
              <div
                key={i}
                className="flex items-center justify-between py-2 border-b border-dashed border-landing-border"
              >
                <div className="h-4 w-40 rounded bg-landing-muted/15 animate-pulse" />
                <div className="h-4 w-16 rounded bg-landing-muted/10 animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
