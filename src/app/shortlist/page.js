import { redirect } from 'next/navigation';

const TABS = ['songs', 'movies', 'books', 'summer-26', 'ballparks'];

export default function Shortlist({ searchParams }) {
  const legacy = searchParams?.tab;
  const target = TABS.includes(legacy) ? legacy : 'songs';
  redirect(`/shortlist/${target}`);
}
