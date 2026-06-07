"use client";

import dynamic from 'next/dynamic';

const Terminal = dynamic(() => import('../../components/Terminal'), {
  ssr: false,
  loading: () => <div className="min-h-screen bg-zinc-950" />,
});

export default function TerminalPage() {
  return <Terminal />;
}
