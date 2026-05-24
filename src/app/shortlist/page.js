import { redirect } from 'next/navigation';

const TABS = ['songs', 'movies', 'summer-26'];

export default function Shortlist({ searchParams }) {
  const legacy = searchParams?.tab;
  const target = TABS.includes(legacy) ? legacy : 'songs';
  redirect(`/shortlist/${target}`);
}
