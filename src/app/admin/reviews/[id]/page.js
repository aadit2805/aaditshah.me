"use client";
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

export default function EditReviewPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id;
  const [form, setForm] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      const res = await fetch(`/api/reviews/${id}`);
      if (res.ok) {
        const data = await res.json();
        setForm({
          title: data.title,
          artist: data.artist,
          type: data.type,
          rating: data.rating,
          reviewDate: new Date(data.reviewDate).toISOString().slice(0,10),
          image: data.image,
          review: data.review || '',
        });
      } else {
        setError('Failed to load');
      }
    };
    load();
  }, [id]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: name === 'rating' ? Number(value) : value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const payload = { ...form, reviewDate: new Date(form.reviewDate).toISOString() };
    const res = await fetch(`/api/reviews/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (res.ok) router.push('/admin/reviews');
    else {
      const data = await res.json().catch(() => ({}));
      setError(data?.error ? JSON.stringify(data.error) : 'Update failed');
    }
  };

  if (!form) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Edit Review #{id}</h1>
      {error && <p className="text-red-600 text-sm mb-2">{error}</p>}
      <form onSubmit={onSubmit} className="space-y-3">
        <Field label="Title"><input name="title" className="w-full p-2 rounded border" value={form.title} onChange={onChange} /></Field>
        <Field label="Artist"><input name="artist" className="w-full p-2 rounded border" value={form.artist} onChange={onChange} /></Field>
        <Field label="Type">
          <select name="type" className="w-full p-2 rounded border" value={form.type} onChange={onChange}>
            <option value="movie">movie</option>
            <option value="show">show</option>
          </select>
        </Field>
        <Field label="Rating"><input type="number" step="0.1" min="0" max="10" name="rating" className="w-full p-2 rounded border" value={form.rating} onChange={onChange} /></Field>
        <Field label="Review Date"><input type="date" name="reviewDate" className="w-full p-2 rounded border" value={form.reviewDate} onChange={onChange} /></Field>
        <Field label="Image path"><input name="image" className="w-full p-2 rounded border" value={form.image} onChange={onChange} /></Field>
        <Field label="Review"><textarea name="review" rows={8} className="w-full p-2 rounded border" value={form.review} onChange={onChange} /></Field>
        <div className="flex gap-2">
          <button className="button rounded-xl" type="submit">Save</button>
          <button className="button rounded-xl" type="button" onClick={() => router.back()}>Cancel</button>
        </div>
      </form>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <div>
      <label className="block mb-1 font-medium">{label}</label>
      {children}
    </div>
  );
}
