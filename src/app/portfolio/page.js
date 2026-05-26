import MinimalNav from '../../components/MinimalNav';
import ProjectShowcase from '../../components/ProjectShowcase';

export const metadata = {
  title: 'portfolio',
  description: 'Projects by Aadit Shah — full-stack web apps, hackathon winners, and side experiments built with Next.js, TypeScript, Python, and Swift.',
  alternates: { canonical: '/portfolio' },
  openGraph: {
    title: 'Portfolio | Aadit Shah',
    description: 'Projects by Aadit Shah — full-stack web apps, hackathon winners, and side experiments.',
    url: 'https://aaditshah.me/portfolio',
    type: 'website',
  },
};

export default function Portfolio() {
  return (
    <div className="min-h-screen bg-landing-bg">
      <MinimalNav currentPage="projects" />
      <main>
        <ProjectShowcase />
      </main>
    </div>
  );
}
