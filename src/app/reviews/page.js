import MinimalNav from '../../components/MinimalNav';
import MediaRatingSystem from '@/components/MediaRatingSystem';

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
