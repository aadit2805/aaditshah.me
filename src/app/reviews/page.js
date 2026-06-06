import MinimalNav from '../../components/MinimalNav';
import MediaRatingSystem from '@/components/MediaRatingSystem';

export const metadata = {
  title: 'reviews',
  description: 'Movie and TV reviews by Aadit Shah — ratings, takes, and recommendations across film and television.',
  alternates: { canonical: '/reviews' },
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
