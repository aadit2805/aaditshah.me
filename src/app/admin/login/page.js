"use client";
import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function AdminLoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const next = searchParams.get('next') || '/admin/reviews';

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    if (res.ok) {
      router.push(next);
    } else {
      const data = await res.json().catch(() => ({}));
      setError(data?.error || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <form onSubmit={onSubmit} className="w-full max-w-sm space-y-4 p-6 rounded-xl border border-gray-300 dark:border-gray-700">
        <h1 className="text-2xl font-semibold">Admin Login</h1>
        {error ? <p className="text-red-600 text-sm">{error}</p> : null}
        <div>
          <label className="block mb-1">Username</label>
          <input className="w-full p-2 rounded border border-gray-300 dark:border-gray-700" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div>
          <label className="block mb-1">Password</label>
          <input type="password" className="w-full p-2 rounded border border-gray-300 dark:border-gray-700" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit" className="button rounded-xl w-full">Sign in</button>
      </form>
    </div>
  );
}
