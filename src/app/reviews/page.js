import MinimalNav from '../../components/MinimalNav';
import MediaRatingSystem from '@/components/MediaRatingSystem';

export const metadata = {
  title: 'Reviews',
  description: 'Movie and TV reviews by Aadit Shah — ratings, takes, and recommendations across film and television.',
  alternates: { canonical: '/reviews' },
  openGraph: {
    title: 'Reviews | Aadit Shah',
    description: 'Movie and TV reviews — ratings, takes, recommendations.',
    url: 'https://aaditshah.me/reviews',
    type: 'website',
  },
};

export default function Reviews() {
  return (
    <div className="min-h-screen bg-landing-bg">
      <MinimalNav currentPage="reviews" />
      <main>
        <MediaRatingSystem />
      </main>
    </div>
  );
}
