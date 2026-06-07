import { redirect } from 'next/navigation';

const TABS = ['songs', 'movies', 'books', 'summer-26', 'ballparks'];

export default function Shortlist({
  searchParams,
}: {
  searchParams?: { tab?: string };
}) {
  const legacy = searchParams?.tab;
  const target = legacy && TABS.includes(legacy) ? legacy : 'songs';
  redirect(`/shortlist/${target}`);
}
