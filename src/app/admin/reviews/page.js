"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function AdminReviewsPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = async () => {
    setError('');
    setLoading(true);
    const res = await fetch('/api/reviews');
    if (res.ok) {
      const data = await res.json();
      setItems(data);
    } else {
      setError('Failed to load reviews');
    }
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const onDelete = async (id) => {
    if (!confirm('Delete this review?')) return;
    const res = await fetch(`/api/reviews/${id}`, { method: 'DELETE' });
    if (res.ok) {
      setItems((prev) => prev.filter((x) => x.id !== id));
    } else {
      alert('Delete failed');
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold">Manage Reviews</h1>
        <div className="flex gap-2">
          <Link className="button rounded-xl" href="/admin/reviews/new">New Review</Link>
          <form action="/api/admin/logout" method="POST">
            <button className="button rounded-xl" type="submit">Logout</button>
          </form>
        </div>
      </div>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}
      {!loading && !error && (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr>
                <th className="p-2 border-b">ID</th>
                <th className="p-2 border-b">Title</th>
                <th className="p-2 border-b">Type</th>
                <th className="p-2 border-b">Rating</th>
                <th className="p-2 border-b">Date</th>
                <th className="p-2 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((x) => (
                <tr key={x.id}>
                  <td className="p-2 border-b">{x.id}</td>
                  <td className="p-2 border-b">{x.title}</td>
                  <td className="p-2 border-b">{x.type}</td>
                  <td className="p-2 border-b">{x.rating}</td>
                  <td className="p-2 border-b">{new Date(x.reviewDate).toLocaleDateString('en-US', { timeZone: 'UTC' })}</td>
                  <td className="p-2 border-b space-x-2">
                    <Link className="button rounded-xl" href={`/admin/reviews/${x.id}`}>Edit</Link>
                    <button className="button rounded-xl" onClick={() => onDelete(x.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
