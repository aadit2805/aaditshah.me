import { redirect } from 'next/navigation';
import { SHORTLIST_TABS } from '@/lib/shortlist';

const TABS: readonly string[] = SHORTLIST_TABS;

export default function Shortlist({
  searchParams,
}: {
  searchParams?: { tab?: string };
}) {
  const legacy = searchParams?.tab;
  const target = legacy && TABS.includes(legacy) ? legacy : 'songs';
  redirect(`/shortlist/${target}`);
}
